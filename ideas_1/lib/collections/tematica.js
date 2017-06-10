Tematica = new Mongo.Collection('tematica');


Meteor.methods({
  tematicaInsert: function(crAttributes) //se verifica q el ususario este autenticado
  {
    check(Meteor.userId(), String);
    check(crAttributes, {
      Des: String,
      SC: String
    });

    
    var user = Meteor.user();
    var datos = _.extend(crAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date(),
	  estado: 'activa'
    });
    var crId = Tematica.insert(datos);
    return {
      _id: crId
    };
  }
});
