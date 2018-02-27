//PARA TABULAR
Meteor.publishComposite("tabular_inscriptos", function (tableName, ids, fields) {
  check(tableName, String);
  check(ids, Array);
  check(fields, Match.Optional(Object));

  this.unblock(); // requires meteorhacks:unblock package

  return {
    find: function () {
      this.unblock(); // requires meteorhacks:unblock package

      // check for admin role with alanning:roles package
      /*if (!Roles.userIsInRole(this.userId, 'admin')) {
        return [];
      }*/
      var useractual=this.userId; 
      var usuario=Meteor.users.findOne({_id:useractual});
      if (usuario.rol!="Administrador") { console.log("No es admin! "); return [];};

      return Inscripcion.find({_id: {$in: ids}}, {fields: fields});
      //return Inscripcion.find({_id: {$in: ids}});

    },
    children: [
      {
        find: function(inscrip) {  //console.log("user: "+inscrip.user_id);
          this.unblock(); // requires meteorhacks:unblock package
          // Publish the related user
          //return Meteor.users.find({_id: inscrip.user_id}, {limit: 1, fields: {rol: "Participante"}, sort: {username: 1}});
          return Meteor.users.find({_id: inscrip.user_id});

        }
      }
    ]
  };
});