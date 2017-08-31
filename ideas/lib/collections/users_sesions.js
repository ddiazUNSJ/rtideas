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
        type: String,
        label: "rol",  
    },
  rol: {
        type: String,
        label: "Nombre",  
    },  
  author: { //persona quien gestiona inscripcion
        type: String,
        label: "idUser",
      },
  submitted: {
        type: Date,
        label: "fechayhora",
       },
  
});

Users_sesions.attachSchema(Users_sesionsSchema);

Meteor.methods({

   // Agrega un nuevo participante a la sesion de creatividad
   // Parametros
   // inscriId : id de documento de inscripcion
   // usuarioId: id del usuario inscripto
   // sesionId: id de la sesion en la que esta inscripto

   agregarParticipante:function(datos){
      var inscriId=datos.inscriId;
      var usuarioId=datos.usuarioId;
      var sesionId=datos.sesionId;

      console.log("agregarParticipante users_sesions.js");
      console.log(this.sesion);
      console.log(this.userId);
      console.log(this._id);
     check(inscriId,String);
     check(usuarioId,String);
     check(sesionId,String);
     
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
      
     //Habilitado para registrar participante
     //El participante ya esta acentado en user-sesion 
     var estaEnUserSesion=Users_sesions.findOne( {iduser:usuarioId, idsesion: sesionId} ); 
     if  (estaEnUserSesion){
         return estaEnUserSesion;
      }
     //No esta registrado , creamos participante en usersesion 
     else
     {
      var participanteNuevo={iduser: usuarioId,
                     idsesion:sesionId,
                     idgrupo:"notiene",
                     rol:"Participante",
                     author:this.userId,
                     submitted:new Date(),
                           };

      check(participanteNuevo,Users_sesionsSchema);
      var participanteAgregado=Users_sesions.insert(participanteNuevo);
      // Actualizar coleccion de inscriptos
      // llamo al metodo UpdateEstadoInscripcion: function (modifier, objID)
      // el modifier es el mongo modifier y objID es el id de inscripcion
       Meteor.call ("UpdateEstadoInscripcion","{ '$set': { estadoInscripcio: 'aceptado' } }", inscriId); 
  

      return     participanteAgregado           
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

  InsertUserSesion: function(grAttributes) //se verifica q el ususario este autenticado
  {
    check(Meteor.userId(), String);

    //con estas lineas chequea todo el arreglo, de la otra manera nos daba error. 
    //este caso difiere de los demas porque grAttributes trae un arreglo de objetos (time_sesion)
    check(grAttributes, Match.Where(function(grAttributes){
        _.each(grAttributes, function (doc) {
          // do your checks and return false if there is a problem 
        });
        // return true if there is no problem
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
  }

});
