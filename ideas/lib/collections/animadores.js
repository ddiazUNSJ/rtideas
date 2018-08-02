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


//Animadores.attachSchema(AnimSchema);
Animadores.attachSchema(AnimSchemaBasic);


if (Meteor.isServer)
{

  Meteor.methods({
        
    /*InsertAnimSesion: function(data) //se verifica q el ususario este autenticado
    {
      check(data,AnimSchemaBasic);    

      var user = Meteor.user();

      var users_id=data.idusers;
      var sesion_id=data.idsesion;

      var datos = {
            idsesion:sesion_id,
            idusers: users_id,
            userId: user._id,
            author: user.username,
            submitted: new Date(),
            active: true
      };

      //console.log(sesion_id);
      var animSesion = AnimSesion.findOne({idsesion:sesion_id});
      if(!animSesion)
      {
        check(datos,AnimSesionSchema); 
        var IId = AnimSesion.insert(datos);
      }
      else{ console.log(animSesion._id);
        var IId = AnimSesion.update( {_id:animSesion._id}, { $set: { idusers: users_id } } );
      }   

      return {
        _id: IId
      };
    }*/
    
  });
}

