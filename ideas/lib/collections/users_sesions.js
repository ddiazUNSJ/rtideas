
Users_sesions = new Mongo.Collection('users_sesions');

Meteor.methods({
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
