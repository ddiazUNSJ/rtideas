
Inscripcion = new Mongo.Collection('inscripcion');

Meteor.methods({
  inscripcionInsert:function(doc)
  {
    check( doc,{
      userId:String,
      sesioncId:String,
    });
    return Inscripcion.insert(datos);

  },
  /*InsertInscripcion: function(IAttributes) //se verifica q el ususario este autenticado
  {
    check(Meteor.userId(), String);
    check(IAttributes, {
      idgrupo: String,
      idrol: String,
      iduser:String,
    });

    
    var user = Meteor.user();
    var users_sesions = _.extend(IAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date(),
    estado: 'activa'
    });
    var IId = Users_sesions.insert(users_sesions);
    return {
      _id: IId
    };
  }*/
});
