SubRoles = new Mongo.Collection('subroles');


Meteor.methods({
  subRolInsert: function(rolAttributes) //se verifica q el ususario este autenticado
  {
    check(Meteor.userId(), String);
    check(rolAttributes, {
      descripcion: String,
      nombre: String,
      rol: String
    });

    
    var user = Meteor.user();
    var roles = _.extend(rolAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });



    var rolId = SubRoles.insert(roles);
    return {
      _id: rolId
    };
  }
});
