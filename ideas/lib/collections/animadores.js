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


Animadores.attachSchema(AnimadoresSchema);

if (Meteor.isServer)
{

  Meteor.methods({

      isActiveAnimador:function(animadorId){

      check(animadorId,String);
      var isActive;
      //Verifica Identidad 
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
      //Pregunta si animador esta activo
        isActive=Animadores.findOne({_id:animadorId}).active;
        //console.log("isActive: "+ isActive);
      return isActive;
    },

   animadorOn:function(animadorId){
    check(animadorId,String);
      var isActive;
      //Verifica Identidad 
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
       //Verifica que exista animador
       animador=Animadores.findOne({_id:animadorId});
       if (animador==undefined) {
          throw new Meteor.Error('No existe animador',
            'Animador que se intenta modificar no existe en la coleccion animadores ');
        }
       Animadores.update({ _id: animadorId }, { $set: {'active' : true }});
       return animadorId;
     },

  animadorOff:function(animadorId){
    check(animadorId,String);
      var isActive;
      //Verifica Identidad 
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
       //Verifica que exista animador
       animador=Animadores.findOne({_id:animadorId});
       if (animador==undefined) {
          throw new Meteor.Error('No existe animador',
            'Animador que se intenta modificar no existe en la coleccion animadores ');
        }
       Animadores.update({ _id: animadorId }, { $set: {'active' : false }});
       return animadorId;
     },
   //Pregunta si el usuario es animador, si este es animador, entonces devuelve el id de animador sino
   //devuelve undefined  
   usuarioEsAnimador:function(usuarioId){
      check(usuarioId,String);
      var isActive;
      //Verifica Identidad 
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
       //Buscar el usuario en la coleccion animadores y retornar su id de animador
       var Animador=Animadores.findOne({iduser:usuarioId});
       if (Animador==undefined){
        console.log("este usuario no esta registrado como animador:usuarioEsAnimador");
        return undefined;
       }
       else{
        console.log("este usuario  es animador:usuarioEsAnimador");
        return Animador._id;
       }
       
   },

   // Agrega un nuevo animador
   agregarAnimador:function(usuarioId,usuarioNombre){
    check(usuarioId,String);
     check(usuarioNombre,String);
     
      //Verifica Identidad 
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
     //Habilitado para agregar animador
     //Si el usuario existe como animador lo activamos 
     var estaEnAnimadores=Meteor.call('usuarioEsAnimador',usuarioId);
     if   (estaEnAnimadores){
         return Meteor.call('animadorOn',estaEnAnimadores);
      }
     //No existe como animador, lo creamos 
     else
     {
      animadorNuevo={iduser: usuarioId,
                     nombre:usuarioNombre,
                     author:this.userId,
                     submitted:new Date(),
                     active:true};
      check(animadorNuevo,AnimadoresSchema);
      return Animadores.insert(animadorNuevo);               
     }
      
    
    },
  });
}
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
