Comentarios = new Mongo.Collection('comentarios');

ComentariosSchema=new SimpleSchema
({

  comentario: { 
        type: String,
        label: "Comentario a la idea",
      },
  ididea: {
        type: Number,
        label: "Id de la Idea",
        },
  idgrupo: {
        type: Number,
        label: "Id del Grupo",
        },
  instancia: { 
        type: String,
        label: "Instancia en la que estamos trabajando",
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
        label: "on/off", // indicada si la tematica esta activa o no, 
       },
});

ComentariosBasicSchema=new SimpleSchema
({
   comentario: { 
        type: String,
        label: "Comentario a la idea",
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
    //console.log(gcomenrAttributes['time_sesion'][0]);

    check(datoscomentarios,ComentariosBasicSchema);

    //Verifica Identidad y autorizacion para crear sesion
      if (!this.userId) {
           throw new Meteor.Error('Acceso invalido',
          'Ustede no esta logeado');
         }
      else // verifica si tiene privilegios de administrador
      { 
        usuario= Meteor.users.findOne({_id: this.userId});
        rol=usuario.rol;
        if  (rol!="Administrador") 
        {
            console.log("error no es administrador");
            throw new Meteor.Error('Acceso invalido',
            ' Para acceder a esta funcionalidad necesita ser Administrador');
        }
      }
      // Si esta autorizado comienza proceso


    var grupo = Grupo.findOne( {_id: datoscomentarios.idgrupo} ); 
    var sesion = Sesion.findOne( {_id:  grupo.sesion_id} ); 
    var instancia = sesion.instActual;

    var user = Meteor.user();
    var comentario = 
    {
    instancia:datoscomentarios.instancia,
    userId:user._id,
    author: user.username,
    submitted: new Date(),
    estado: true,     
    };

      // Valida el documento , luego inserta nueva tematica   
      check(comentario,ComentariosSchema);

      return Comentarios.insert(comentario);

    
    }// fin comentInsert
});// fin  Meteor.methods
}// fin