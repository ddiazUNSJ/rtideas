Grupo = new Mongo.Collection('grupo');

GrupoSchema=new SimpleSchema({
  gr: {
        type: String,
        label: "Nombre Grupo",
        minCount: 1,
        maxCount: 20,
        },
  descripcion: {
        type: String,
        label: "Descripcion Grupo",
      }, 
  sesion_id: {
        type: String,
        label: "Id de la Sesion",
      },
  userId: {
    type: String,
    label: "Id del Usuario",
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
        label: "Nombre Grupo",
        minCount: 1,
        maxCount: 20,
        },
  descripcion: {
        type: String,
        label: "Descripcion del Grupo",
      }, 

  sesion_id: {
        type: String,
        label: "Id de la Sesion",
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

        check(datosGrupoo,GrupoBasicSchema);

       /* check(grAttributes, {
      descripcion: String,
      gr: String,
	  sesion_id: String,
    
    });*/


    //con estas lineas chequea todo el arreglo, de la otra manera nos daba error. 
    //este caso difiere de los demas porque grAttributes trae un arreglo de objetos (time_sesion)
    check(datosGrupo, Match.Where(function(datosGrupo){
        _.each(datosGrupo, function (doc) {
          // do your checks and return false if there is a problem 
        });
        // return true if there is no problem
        return true;
    }));
     

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
        gr:datosGrupo.gr,
        descripcion:datosGrupo.descaripcion,
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