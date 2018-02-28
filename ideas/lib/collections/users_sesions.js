//DD 26/08/2017
//usuarios de la Sesion de Creatvidad

Users_sesions = new Mongo.Collection('users_sesions');

Users_sesionsSchema = new SimpleSchema({
  iduser: {
        type: String,
        label: "userId",
      },
  idsesion: {
        type: String,
        label: "userId",
      },
      
  idgrupo: {
        type: [String],
        label: "grupo",  
    },
  rol: {
        type: String,
        label: "rol",  
    },  
  /*nombre: {
        type: String,
        label: "nombre",  
    }, */
  author: { //persona quien gestiona inscripcion
        type: String,
        label: "idUser",
      },
  submitted: {
        type: Date,
        label: "fechayhora",
       },
  
});

Users_sesionsSchemaBasic=new SimpleSchema({
  userId:{
        type: String,
        label: "userId",
      },
  sesionId: {
        type: String,
        label: "sesionId",
      },
  rol: {
        type: String,
        label: "rol",
      },
})

Users_sesions.attachSchema(Users_sesionsSchema);

if (Meteor.isServer)
{
  Meteor.methods({
    
    //Determina si el actual usuario es animador
    // Se utiliza para 
    isAnimadorUserSesion:function(sesionId){
        check(sesionId,String);
        // Verifica Identidad 
        if (!this.userId) {
            throw new Meteor.Error('Acceso invalido',
              'Ustede no esta logeado');
          }
      var usuarioEnUserSesion=Users_sesions.findOne({iduser: this.userId},idsesion:sesionId);
      if (usuarioEnUserSesion.rol==="Animador"){
        return true;
        }
      else{
        return false;
      }
    },
  
   /*agregarAnimadorSesion:function(datos){
     
     check(datos, datosPartici);
     console.log("datos en agregarAnimadorSesion:",datos);
     var usuario, nombreU, rolU;
    
      if (!this.userId) {
          throw new Meteor.Error('Acceso invalido',
            'Ustede no esta logeado');
        }
      else // verifica si tiene privilegios de administrador
       { 
        usuario= Meteor.users.findOne({_id: this.userId});
        
        rolU=usuario.rol;
        if  (rolU!="Administrador") 
        {
            console.log("error no es administrador");
            throw new Meteor.Error('Acceso invalido',
            ' Para acceder a esta funcionalidad necesita ser Administrador');
        }
       }
      
      // Verifica que no tenga un pedido de inscripcion para la sesion que pretende ser animador
       var usuarioEnUserSesion=Inscripcion.findOne({userId: datos.userId,sesion:datos.sesionId});
        if (usuarioEnUserSesion){
          console.log("error el animador no puede tener un pedido de inscripcion a la sesion que intenta animar");
            throw new Meteor.Error('Acceso invalido',
            ' Animador solicito antes ser Participante');
          }
        

     // //Habilitado para registrar animador
     nombreU=Meteor.users.findOne({_id: datos.userId}).profile.nombre;
     // //El participante ya esta acentado en user-sesion 
     var estaEnUserSesion=Users_sesions.findOne( {iduser:datos.userId, idsesion: datos.sesionId} ); 
     if  (estaEnUserSesion){
         return estaEnUserSesion;
      }
     // //No esta registrado , creamos participante en usersesion 
     else
     {
      var animadorSesionNuevo={iduser: datos.userId,
                     idsesion:datos.sesionId,
                     idgrupo:"notiene",
                     rol:"Animador",
                     nombre:nombreU,
                     author:this.userId,
                     submitted:new Date(),
                           };

      check(animadorSesionNuevo,Users_sesionsSchema);
      var animadorSesionAgregado=Users_sesions.insert(animadorSesionNuevo);
     
          
      }
    
    },*/


    //--------------
    InsertUserSesion:function(datos){
      check(datos,Users_sesionsSchemaBasic);

      var usuario, nombreU, rolU;

      if (!this.userId) {
          throw new Meteor.Error('Acceso invalido',
            'Usted no esta logeado');
      }
      else // verifica si tiene privilegios de administrador
      { 
          usuario= Meteor.users.findOne({_id: this.userId});
          
          rolU=usuario.rol;
          if  (rolU!="Administrador") 
          {
              console.log("error no es administrador");
              throw new Meteor.Error('Acceso invalido',
              ' Para acceder a esta funcionalidad necesita ser Administrador');
          }
      }
      

     //nombreU=Meteor.users.findOne({_id: datos.userId}).profile.nombre;

     // //El participante ya esta acentado en user-sesion 
     var estaEnUserSesion=Users_sesions.findOne( {iduser:datos.userId, idsesion: datos.sesionId} ); 
     if  (estaEnUserSesion){
         //return estaEnUserSesion;
          var srId = Users_sesions.remove({iduser:datos.userId, idsesion: datos.sesionId});
      }
     // //No esta registrado , creamos participante en usersesion 
     else
     {  
      var grupos = new Array();

      var participanteNuevo={
          iduser: datos.userId,
          idsesion: datos.sesionId,
          idgrupo: grupos,
          rol: datos.rol,
          //nombre:nombreU,
          author:this.userId,
          submitted:new Date(),
      };

      check(participanteNuevo,Users_sesionsSchema);
      var participanteAgregado=Users_sesions.insert(participanteNuevo);
      // Actualizar coleccion de inscriptos
      Inscripcion.update( {_id:datos.inscriId}, { $set: { estadoInscripcio: 'aceptado' } } );
         
      }
    
    },

  //31/08/2017
  // Lo que Estaba--------------------
  participantesAlGrupo: function(IAttributes) //se verifica q el ususario este autenticado
  {
    check(Meteor.userId(), String);
   
    check(IAttributes, Match.Where(function(IAttributes){
        _.each(IAttributes, function (doc) {
          // do your checks and return false if there is a problem 
        });
        // return true if there is no problem
        return true;
    }));
    
    var user = Meteor.user();

    var inscriptos=IAttributes.inscriptos;
    var idgrupo=IAttributes.idgrupo;
    var idsesion=IAttributes.idsesion;

    Users_sesions.update( {idgrupo:idgrupo, rol:'Participante'}, {$set:{idgrupo: ''}}, {multi: true} );



    if(IAttributes.inscriptos)  
      for (var i = 0; i < inscriptos.length; i++)
      {
        /*var datos2 ={
          idgrupo:idgrupo,
          iduser: inscriptos[i],
          rol: "Participante",
          userId: user._id,
          author: user.username,
          submitted: new Date()
        };
        var IId = Users_sesions.insert(datos2);*/

        Users_sesions.update({idsesion:idsesion, iduser:inscriptos[i] },{$set:{idgrupo: idgrupo }});
    
      }

    return {
        _id: true
      };
  },

  gruposAlAnimador: function(IAttributes) //se verifica q el ususario este autenticado
  {
    check(Meteor.userId(), String);
   
    check(IAttributes, Match.Where(function(IAttributes){
        _.each(IAttributes, function (doc) {
          // do your checks and return false if there is a problem 
        });
        // return true if there is no problem
        return true;
    }));
    
    var user = Meteor.user();

    var grupos=IAttributes.grupos;
    var idanimador=IAttributes.animador;
    var idsesion=IAttributes.sesion;

   
    Users_sesions.update( {idsesion:idsesion, iduser:idanimador, rol:'Animador'}, {$set:{idgrupo: grupos}} );

    return {
        _id: true
      };
  },

  /*InsertUserSesion copia: function(grAttributes) //se verifica q el ususario este autenticado
  {
    check(Meteor.userId(), String);
   
    check(grAttributes, Match.Where(function(grAttributes){
        _.each(grAttributes, function (doc) {          
        });
        return true;
    }));      
  
    var user = Meteor.user();
    var datos = _.extend(grAttributes,
    {
      idgrupo:"",
      userId: user._id,
      author: user.username,
      submitted: new Date(),  
    });   
    
    var result = Users_sesions.findOne( {iduser:datos.iduser, idsesion: datos.idsesion} ); 
    
    if(result)
        var grId = Users_sesions.remove({iduser:datos.iduser, idsesion: datos.idsesion});
    else  
        var grId = Users_sesions.insert(datos);

    return {
      _id: grId
    };
  }*/

});

} //fin if (Meteor.isServer)
