
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
  } 

});
