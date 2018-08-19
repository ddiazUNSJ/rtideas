Animadores=new Mongo.Collection('animadores');

AnimSchema=new SimpleSchema({
  iduser: { //id animador
        type: String,
        label: "Usuarios:",
        },
  userId: { //persona quien gestiona ABM animador
        type: String,
        label: "idUser",
      },
  author: { //persona quien gestiona ABM animador
        type: String,
        label: "NameUser",
      },
  submitted: {// fecha de alta animador
        type: Date,
        label: "fechayhora",
       },
  active: {
        type: Boolean,
        label: "on/off", // indicada si el animador esta activa o no, para poner inactivo 
                         // un animador no tiene que tener sesiones abiertas
       },
});


AnimSchemaBasic=new SimpleSchema({ //solo para el formulario
    idusers: {
      type: [String],
      label: "Usuarios:",
    },
    idsesion: { 
      type: String,
      label: "idSesion:",
    },
    
});

UserSchemaBasic=new SimpleSchema({ //solo para el formulario
    idusers: {
      type: [String],
      label: "Usuarios",
    },
});


//Animadores.attachSchema(AnimSchemaBasic);
//Animadores.attachSchema(UserSchemaBasic);

Animadores.attachSchema(AnimSchema);



if (Meteor.isServer)
{

  Meteor.methods({
        
    InsertAnim: function(datos) //se verifica q el ususario este autenticado
    {
        //console.log(grAttributes['time_sesion'][0]);

        check(datos,UserSchemaBasic);
     

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

      var idusers = datos.idusers;
      var user = Meteor.user(); // Estoy servidor 
      for (var i = 0; i < idusers.length; i++) {

            var existe=Animadores.findOne( {iduser:idusers[i]} ); 
       		if  (!existe){

	            var doc={
	              iduser: idusers[i],
	              userId: user._id,
	              author: user.username,
	              submitted: new Date(),
	              active: true,
	            }     

	            //console.log(doc); 
	            check(doc, AnimSchema)

	            Animadores.insert(doc); 
	        } 
      }

      return true;
  	},

  	DeleteAnim: function(iduser) //se verifica q el ususario este autenticado
	{
	    //console.log(idsesion);
	    check(iduser,String);
	   
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

	    var user = Meteor.user(); //Estoy en el Servidor
	    
	    var animador = Animadores.findOne({iduser:iduser});

	    if(animador)
	      return Animadores.remove({iduser:iduser});
	    else
	       throw new Meteor.Error('',
	        "El animador no existe");
	},

    
  });
}

