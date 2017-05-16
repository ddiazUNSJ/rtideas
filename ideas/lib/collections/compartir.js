GruposComp = new Mongo.Collection('grupos_comp');


Meteor.methods
({
  compartirGInsert: function(IAttributes) //se verifica q el ususario este autenticado
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

    //var animadores=IAttributes.animadores;
    var grupos=IAttributes.grupos;
    var idsesion=IAttributes.idsesion;

      
      var user = Meteor.user();
      /*var data = _.extend(CGAttributes,
       {
          author: user.username,
          submitted: new Date(),        
          estado: 'activa'
       });*/
	   
	    var data = 
      {
        sesion_id: idsesion,
        gruposIds: grupos,
		    author: user.username,
        submitted: new Date(),        
        estado: 'activa'
      };

      GruposComp.remove({sesion_id: idsesion});
      
      var CGId = GruposComp.insert(data);
      return
       {
        _id: CGId
       };
    }

  /*compartirGInsert: function(IAttributes) //se verifica q el ususario este autenticado
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

    //var animadores=IAttributes.animadores;
    var inscriptos=IAttributes.inscriptos;
    var idgrupo=IAttributes.idgrupo;


    if(IAttributes.inscriptos)  
    for (var i = 0; i < inscriptos.length; i++)
    {
      var datos2 ={
        idgrupo:idgrupo,
        iduser: inscriptos[i],
        rol: "Participante",
        userId: user._id,
        author: user.username,
        submitted: new Date()
      };
      var IId = Users_sesions.insert(datos2);
    }

    return {
        _id: IId
      };
  } */


});