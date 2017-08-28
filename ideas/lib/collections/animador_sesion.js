Animadores=new Mongo.Collection('animadores');
AnimadoresSchema=new SimpleSchema({
  iduser: {
        type: String,
        label: "userId",
        },
  nombre: {
        type: String,
        label: "nombre Animador",
      }, 
  author: { //persona quien gestiona ABM animador
        type: String,
        label: "idUser",
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

/*Animador_sesion = new Mongo.Collection('animador_sesion');

Meteor.methods({

  InsertAnimSesion: function(IAttributes) //se verifica q el ususario este autenticado
  {
    check(Meteor.userId(), String);

    //con estas lineas chequea todo el arreglo, de la otra manera nos daba error. 
    //este caso difiere de los demas porque grAttributes trae un arreglo de objetos (time_sesion)
    check(IAttributes, Match.Where(function(IAttributes){
        _.each(IAttributes, function (doc) {
          // do your checks and return false if there is a problem 
        });
        // return true if there is no problem
        return true;
    }));

    var user = Meteor.user();

    var animadores=IAttributes.animadores;
    var sesion_id=IAttributes.sesion_id;


    for (var i = 0; i < animadores.length; i++)
    {
        var datos = {
          sesion_id:sesion_id,
          user_id: animadores[i],
          userId: user._id,
          author: user.username,
          submitted: new Date(),
        };

        var IId = Animador_sesion.insert(datos);
    }

    return {
      _id: IId
    };
  }

});*/
