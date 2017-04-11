Roles = new Mongo.Collection('roles');


Meteor.methods({
  rolInsert: function(rolAttributes) //se verifica q el ususario este autenticado
  {
    check(Meteor.userId(), String);
    check(rolAttributes, {
      descripcion: String,
      nombre: String
    });

    
    var user = Meteor.user();
    var roles = _.extend(rolAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });



    var rolId = Roles.insert(roles);
    return {
      _id: rolId
    };
  }
});
