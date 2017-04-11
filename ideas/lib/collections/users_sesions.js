
Users_sesions = new Mongo.Collection('users_sesions');

Meteor.methods({
  Insert: function(IAttributes) //se verifica q el ususario este autenticado
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

    var animadores=IAttributes.animadores;
    var inscriptos=IAttributes.inscriptos;
    var idgrupo=IAttributes.idgrupo;

    if(IAttributes.animadores)
      for (var i = 0; i < animadores.length; i++)
      {
        var datos1 ={
          idgrupo:idgrupo,
          iduser: animadores[i],
          rol: "Animador",
          userId: user._id,
          author: user.username,
          submitted: new Date()
        };
        var IId = Users_sesions.insert(datos1);
      }

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
  } 

});
