Ficha = new Mongo.Collection('ficha');

FichaSchema=new SimpleSchema
({
    gruponame: { 
      type: String,
      label: "Nombre Grupo",
      optional: true,
      autoform: {
          afFieldInput: {
             disabled: true
         } 
      }
    },
    numidea: { 
      type: String,
      label: "Número Idea",
      optional: true,
      autoform: {
          afFieldInput: {
             disabled: true
         } 
      }
    },

    nombre: { 
      type: String,
      label: "Nombre idea",
    },
    des: { 
      type: String,
      label: "Descripcion",
    },
    esc: { 
      type: String,
      label: "Escenario",
    },
    ididea: { 
      type: String,
      label: "Id idea",
    },
    idgrupo: { 
      type: String,
      label: "Id grupo",
    },

    userId: { //persona quien gestiona ABM animador
    type: String,
    label: "id User Creador",
     },

  author: { //persona quien gestiona ABM animador
        type: String,
        label: "Nombre User Creador",
      },

  submitted: {// fecha de alta animador
        type: Date,
        label: "fechayhora Creacion",
       },

});

FichaBasicSchema=new SimpleSchema
({
    gruponame: { 
      type: String,
      label: "Nombre Grupo",
      optional: true,
      autoform: {
          afFieldInput: {
             disabled: true
         } 
      }
    },
    numidea: { 
      type: String,
      label: "Número Idea",
      optional: true,
      autoform: {
          afFieldInput: {
             disabled: true
         } 
      }
    },

    nombre: { 
      type: String,
      label: "Nombre idea",
    },
    des: { 
      type: String,
      label: "Descripcion",
    },
    esc: { 
      type: String,
      label: "Escenario",
    },
    ididea: { 
      type: String,
      label: "Id idea",
    },
    idgrupo: { 
      type: String,
      label: "Id grupo",
    },
});

Ficha.attachSchema(FichaBasicSchema);
Ficha.attachSchema(FichaSchema);

if (Meteor.isServer)
  {
  
  Meteor.methods
  ({
    fichaInsert: function(datos_ficha) //se verifica q el ususario este autenticado
    {

      check(datos_ficha,FichaBasicSchema);
      
      //Verifica Identidad y autorizacion para crear sesion
      if (!this.userId)
         {
           throw new Meteor.Error('Acceso invalido',
          'Ustede no esta logeado');
         }
    
    var user = Meteor.user();
    var datos ={
      nombre: datos_ficha.nombre,
      des: datos_ficha.des,
      esc: datos_ficha.esc,
      ididea: datos_ficha.ididea,
      idgrupo: datos_ficha.idgrupo,
      
      userId:user._id,
      author: user.username,
      submitted: new Date(),
    };

    check(datos, FichaSchema)
    
    var ficha = Ficha.findOne( {ididea: datos_ficha.ididea} );
    if(ficha)
    {
      var datos ={
        nombre: datos_ficha.nombre,
        des: datos_ficha.des,
        esc: datos_ficha.esc,
      };
      return Ficha.update({_id : ficha._id },{$set:datos});
    }
    else
      return Ficha.insert(datos);
   }// fin fichaInsert

  }); //fin meteor.methods
}//fin if