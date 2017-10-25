Ideas = new Mongo.Collection('ideas');

IdeasBasicSchema=new SimpleSchema
({

  messageBox: { 
    type: String,
    label: "Idea",   
  },

  idgrupo:{
    type: String,
    label: "Id grupo",
  },
 
});


compSchema=new SimpleSchema
({
  cant: { 
    type: Number,
    label: "cant",
  },
  compartir: { 
    type: Boolean,
    label: "compartir",
  },
});

vot2Schema=new SimpleSchema
({
  cantA: { 
    type: Number,
    label: "cantA_V2",
  },
  cantD: { 
    type: Number,
    label: "cantD_V2",
  },
  cantR: { 
    type: Number,
    label: "cantR_V2",
  },
  resultado: { 
    type: String,
    label: "resultadoV2",   
  },
});

vot4Schema=new SimpleSchema
({
  cantA: { 
    type: Number,
    label: "cantA",
  },  
  cantR: { 
    type: Number,
    label: "cantR",
  },
  resultado: { 
    type: String,
    label: "resultado",   
  },
});


IdeasSchema=new SimpleSchema
({
  messageBox: { 
    type: String,
     label: "Idea",
  },
 
  idgrupo:{
    type: String,
    label: "Id grupo",
  },

  iduser: { 
    type: String,
     label: "idUser",
  },
 
  votacionI2:{
    type: vot2Schema,
    label: "votacionI2",
  },

  votacionI4: { 
    type: vot4Schema,
     label: "votacionI4",
  },
 
  compartir:{
    type: compSchema,
    label: "compartir",
  },
 
  author: { //persona quien gestiona ABM animador
        type: String,
        label: "Nombre User Creador",
      },

  submitted: {// fecha de alta animador
        type: Date,
        label: "fechayhora Creacion",
       },

  estado: {
        type: Boolean,
        label: "Estado", // indicada si la tematica esta activa o no, 
       },
 
});


UpdateIdeaSchema=new SimpleSchema
({
  ididea: { 
        type: String,
        label: "IdIdea",
      },
  idgrupo: { 
        type: String,
        label: "IdGrupo ",
      },
  editar: { 
        type: String,
        label: "idea new",
      },
});

Ideas.attachSchema(UpdateIdeaSchema);
Ideas.attachSchema(IdeasBasicSchema);
Ideas.attachSchema(IdeasSchema);

if (Meteor.isServer)
{
  Meteor.methods
  ({
    ideasInsert: function(datosIdea) //se verifica q el ususario este autenticado
    {  

        //console.log(datosIdea);
        check(datosIdea,IdeasBasicSchema);
     
        //Verifica Identidad y autorizacion para crear sesion
        if (!this.userId) {
           throw new Meteor.Error('Acceso invalido',
          'Ustede no esta logeado');
         }
        

        var arre1 = {
          'cantA':0,
          'cantD':0,
          'cantR':0,
          'resultado':'R'
        };

        var arre2 = {
          'cantA':0,
          'cantR':0,
          'resultado':'R'
        };

        var arre3 = {
          'cant':0,
          'compartir':false
        };
       
        var user = Meteor.user();
       

        var datos ={
          messageBox: datosIdea.messageBox,
          idgrupo: datosIdea.idgrupo,
          
          iduser: user._id,
          votacionI2: arre1,
          votacionI4: arre2,
          compartir:arre3,
          author: user.username,
          submitted: new Date(),        
          estado: true,         
        };

        //console.log(datos); 
        check(datos,IdeasSchema);
        return Ideas.insert(datos);
      }
  });

}  

