logIdeas = new Mongo.Collection('logideas');

logIdeasSchema=new SimpleSchema
({

  idea_id: { 
        type: String,
        label: "Id de la Idea",
      },
  idea_old: { 
        type: String,
        label: "Id de la Idea vieja",
      },
  idea_new: { 
        type: String,
        label: "Id de la Idea nueva",
      },

  instancia: { 
        type: Number,
        label: "Instancia en la que estamos trabajando",
      },
  submitted: {// fecha de alta animador
        type: Date,
        label: "fechayhora Creacion",
       },
});

logIdeas.attachSchema(logIdeasSchema);

if (Meteor.isServer)
{
  Meteor.methods
  ({

    //llevamos un historial de las modificaciones realizadas a una idea. 
    //una modificacion (update) de una idea implica un insert en logideas
    editIdea: function(datosIdea) 
    {
      check(datosIdea,UpdateIdeaSchema);
     
      //Verifica Identidad y autorizacion para crear sesion
      if (!this.userId) {
          throw new Meteor.Error('Acceso invalido',
          'Usted no esta logeado');
      }

      var ididea = datosIdea.ididea;
      var newidea = datosIdea.editar;

      var idea = Ideas.findOne( {_id: ididea} );    
      var oldidea = idea.messageBox;

      //chequeo que sea el autor de la idea
      var user = Meteor.user();
      if (user._id != idea.iduser) {
          throw new Meteor.Error('Acceso invalido',
          'Usted no puede editar esta idea');
      }

      Ideas.update({_id : ididea },{$set:{messageBox : newidea }});

      var grupo = Grupo.findOne( {_id: datosIdea.idgrupo} ); 
      var sesion = Sesion.findOne( {_id:  grupo.sesion_id} ); 
      var instancia = sesion.instActual;
     

      var ideas = 
      {
        idea_id: ididea,
        idea_old: oldidea,
        idea_new: newidea,
        instancia: instancia,
        submitted: new Date()        
      };
      
      check(ideas,logIdeasSchema);
      var logId = logIdeas.insert(ideas);
      
      return
       {
        _id: logId
       };
    },

    llenarFicha: function(ideasAttributes) 
    {
      check(Meteor.userId(), String);
      check(ideasAttributes, 
      {
        descripcion: String,
        nombre: String,
        escenario: String,
        ididea: String,
        idgrupo: String,

      });

      var ididea = ideasAttributes.ididea;
      var newidea = ideasAttributes.descripcion;
      var nombre = ideasAttributes.nombre;
      var escenario = ideasAttributes.escenario;


      var idea = Ideas.findOne( {_id: ididea} );    
      var oldidea = idea.messageBox;

      Ideas.update({_id : ididea },{$set:{messageBox : newidea, nombre : nombre, escenario : escenario }});

      var grupo = Grupo.findOne( {_id: ideasAttributes.idgrupo} ); 
      var sesion = Sesion.findOne( {_id:  grupo.sesion_id} ); 
      var instancia = sesion.instActual;
     

      var ideas = 
       {
          idea_id: ididea,
          idea_old: oldidea,
          idea_new: newidea,
          instancia: instancia,
          submitted: new Date()        
       };
      
      var logId = logIdeas.insert(ideas);
      return
       {
        _id: logId
       };
    }
      
  });
}

//-----------------------------------------------------------------
