 Template.sesionList.rendered = function (){ 

    var useractual = Meteor.userId(); 
    var data = Meteor.users.findOne({_id: useractual}); 
    Session.set('rol',data.rol);
 };

Template.sesionList.helpers({ 

  gruposU: function() {
    return Grupo.find({}, {sort: {submitted: -1}});	
  },

  sesionsU: function() {
    return Sesion.find({}, {sort: {submitted: -1}}); 
  },


  IsAnimador: function() { 
    //alert(Session.get('rol'));
      return Session.get('rol') == 'Animador';
  },
  
});



Template.grupoItem.helpers({ 

  /*ownSesion: function() {
    return this.userId == Meteor.userId();
  },
  
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  }*/
  
  
  gruponame: function() { 
    var data = Grupo.findOne({_id: this._id});	
	return data.gr;
  },
  
  /*rolname: function(idrol) { 
    var data = Roles.findOne({_id: this._id});	
	return data.role;
  },*/
  
  sesionname: function() { 
    var data = Grupo.findOne({_id:  this._id});	
	  var sesion = Sesion.findOne({_id: data.sesion_id});
	  return sesion.nombre + ' - ' + sesion.fecha1 + ' ' +sesion.hora1;
  },
  
  tematicaname: function() { 
    var data = Grupo.findOne({_id:  this._id}); 
    var sesion = Sesion.findOne({_id: data.sesion_id});
    var tematica = Tematica.findOne({_id: sesion.tematica_id});

    return tematica.SC;
  },

  
});


Template.sesionItem.helpers({ 

  sesionnameA: function() { 
    var sesion = Sesion.findOne({_id: this._id});
    return sesion.nombre + ' - ' + sesion.fecha1 + ' ' +sesion.hora1;
  },

  tematicanameA: function() { 
    var sesion = Sesion.findOne({_id: this._id});
    var tematica = Tematica.findOne({_id: sesion.tematica_id});
    return tematica.SC;
  },
  
});