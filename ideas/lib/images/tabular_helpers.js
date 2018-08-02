// Define an email helper on AppFeedback documents using dburles:collection-helpers package.
// We'll reference this in our table columns with "email()"


Inscripcion.helpers({
  rol() {
    var user = Meteor.users.findOne({_id: this.user_id});
    return user && user.rol;
    //return user.rol;
  },

  username() {
    var user = Meteor.users.findOne({_id: this.user_id});
    return user && user.username;
    //return user.username;
  },

  nombre() {
    //console.log(this.user_id);
    var user = Meteor.users.findOne({_id: this.user_id});
    //console.log(user.username);
    return user && user.profile.nombre;
    //return user.profile.nombre;
  },

});


Animadores.helpers({
  rol() {
    var user = Meteor.users.findOne({_id: this.iduser});
    return user && user.rol;
    //return user.rol;
  },

  username() {
    var user = Meteor.users.findOne({_id: this.iduser});
    return user && user.username;
    //return user.username;
  },

  nombre() {
    //console.log(this.user_id);
    var user = Meteor.users.findOne({_id: this.iduser});
    //console.log(user.username);
    return user && user.profile.nombre;
    //return user.profile.nombre;
  },

});


Users_sesions.helpers({
  rol() {
    var user = Meteor.users.findOne({_id: this.iduser});
    return user && user.rol;
    //return user.rol;
  },

  username() {
    var user = Meteor.users.findOne({_id: this.iduser});
    return user && user.username;
    //return user.username;
  },

  nombre() {
    //console.log(this.user_id);
    var user = Meteor.users.findOne({_id: this.iduser});
    //console.log(user.username);
    return user && user.profile.nombre;
    //return user.profile.nombre;
  },

});


GruposComp.helpers({ //CLIENTE!

  nombregrupos() {
    var grupos = Grupo.find({_id: {$in: this.gruposIds} });

    var nombres = grupos.map(function(p) { return p.gr });
    
    //return  "<b>" + nombres.join(' - ') + "<b>";
    return  nombres.join(' - ') ;
  },

});
