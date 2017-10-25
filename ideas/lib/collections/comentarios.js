Comentarios = new Mongo.Collection('comentarios');

ComentariosSchema=new SimpleSchema
({
  comentario: { 
        type: String,
        label: "Comentario a la idea",
      },
  ididea: {
        type: String,
        label: "Id de la Idea",
        },
  idgrupo: {
        type: String,
        label: "Id del Grupo",
        },
  instancia: { 
        type: Number,
        label: "Instancia",
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

  estado: {
    type: Boolean,
    label: "estado", // indicada si la tematica esta activa o no, 
  },

});

ComentariosBasicSchema=new SimpleSchema
({
  comentario: { 
    type: String,
    label: "ComentarioIdea",
  },
  ididea: {
    type: String,
    label: "Id de la Idea",
  },
  idgrupo: {
    type: String,
    label: "Id del Grupo",
  },
  instancia: { 
    type: Number,
    label: "Instancia",
  },
});

Comentarios.attachSchema(ComentariosBasicSchema);
Comentarios.attachSchema(ComentariosSchema);

if (Meteor.isServer)
{
  Meteor.methods
  ({

    comentInsert: function(datoscomentarios) //se verifica q el ususario este autenticado
    {
      check(datoscomentarios,ComentariosBasicSchema);

      //Verifica Identidad y autorizacion para crear sesion
      if (!this.userId) {
        throw new Meteor.Error('Acceso invalido',
        'Ustede no esta logeado');
      }
      

      var grupo = Grupo.findOne( {_id: datoscomentarios.idgrupo} ); 
      var sesion = Sesion.findOne( {_id:  grupo.sesion_id} ); 
      var instancia = sesion.instActual;

      var user = Meteor.user();

      console.log(datoscomentarios);
      
      var datos ={
        comentario: datoscomentarios.comentario,        
        ididea: datoscomentarios.ididea,
        idgrupo: datoscomentarios.idgrupo,        
        instancia:datoscomentarios.instancia,
        userId:user._id,
        author: user.username,
        submitted: new Date(),
        estado: true,      
      };

      // Valida el documento , luego inserta nueva tematica   
      check(datos,ComentariosSchema);

      return Comentarios.insert(datos);

    }// fin comentInsert
  });// fin  Meteor.methods
}// fin