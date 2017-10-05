Grupo = new Mongo.Collection('grupo');

GrupoSchema=new SimpleSchema({
  gr: {
        type: String,
        label: "Nombre",
        minCount: 1,
        maxCount: 20,
        },
  descripcion: {
        type: String,
        label: "Descripción",
      }, 
  sesion_id: {
        type: String,
        label: "Sesión",
      },
  userId: {
    type: String,
    label: "Id Usuario",
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

GrupoBasicSchema=new SimpleSchema({
  gr: {
        type: String,
        label: "Nombre",
        minCount: 1,
        maxCount: 20,
        },
  descripcion: {
        type: String,
        label: "Descripción",
      }, 

  // sesion_id: {
  //       type: String,
  //       label: "Id de la Sesion",
  //     },
  
  /*sesion_id: {
      type: String,
      label: "Sesion",
      //optional: true,
      autoform: {
         type: 'select2',
         options: function (){return[{label:"2013",value:2013},{label:"2014",value:2014},{label:"2015",value:2015}]}
      }
  }*/

  tematica: {
      type: String,
      label: "Temática",
      optional: true,
  },

  sesion_id: {
      type: String,
      label: "Sesión",
      //optional: true     
  },
  
});
Grupo.attachSchema(GrupoBasicSchema);
Grupo.attachSchema(GrupoSchema);




if (Meteor.isServer)
{
    Meteor.methods
    ({
     
    grupoInsert: function(datosGrupo) //se verifica q el ususario este autenticado
      {
        //console.log(grAttributes['time_sesion'][0]);

        check(datosGrupo,GrupoBasicSchema);

       /* check(grAttributes, {
      descripcion: String,
      gr: String,
	  sesion_id: String,
    
    });*/
     

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
      var user = Meteor.user(); // Estoy servidor 
      var docGrupo={
        gr: datosGrupo.gr,
        descripcion: datosGrupo.descripcion,
        sesion_id: datosGrupo.sesion_id,
        userId: user._id,
        author: user.username,
        submitted: new Date(),
        estado: true,
        }       
      // Valida el documento , luego inserta nueva tematica   
      check(docGrupo, GrupoSchema)

    return Grupo.insert(docGrupo);  
	}
})
  };