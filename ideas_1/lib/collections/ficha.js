Ficha = new Mongo.Collection('ficha');


Meteor.methods({
  fichaInsert: function(fAttributes) //se verifica q el ususario este autenticado
  {
    check(Meteor.userId(), String);
    check(fAttributes, {
      grupo: String,
      nombreId: String,
      des: String,
      esc: String
    });

    
    var user = Meteor.user();
    var datos = _.extend(fAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date(),
	  estado: 'activa'
    });
    var fId = Ficha.insert(datos);
    return {
      _id: fId
    };
  }
});