 Template.sesionList.rendered = function (){ 

  
 };

Template.sesionList.helpers({ 

  /*gruposU: function() {
    return Grupo.find({}, {sort: {submitted: -1}});	
  },*/

  sesionsUser: function() {
    
    /*if(Session.get('rol') == 'Administrador')
      var SesionGrup = Users_sesions.find({  $group: {_id: "$_id",} });
    else
    {  
      var useractual = Meteor.userId(); 
      var SesionGrup = Users_sesions.find({ iduser:useractual});
    }*/
    var useractual = Meteor.userId(); 
    var SesionGrup = Users_sesions.find({ iduser:useractual});

    return SesionGrup;
  },

  
});



/*Template.grupoItem.helpers({   
  gruponame: function() { 
    var data = Grupo.findOne({_id: this._id});	
	return data.gr;
  }, 
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

});*/


Template.sesionItem.helpers({ 

  //el this corresponde a la coleccion usersesion y no a sesion
  sesionnameA: function() { 
    var sesion = Sesion.findOne({_id: this.idsesion});
    return sesion.nombre + ' - ' + sesion.fecha1 + ' ' +sesion.hora1;
  },

  tematicanameA: function() { 
    var sesion = Sesion.findOne({_id: this.idsesion});
    var tematica = Tematica.findOne({_id: sesion.tematica_id});
    return tematica.SC;
  },

  IsEstandar: function() { 
      return Session.get('rol') != 'Administrador';
  },

  /*rolsesion: function() { 
    //var sesion = Sesion.findOne({_id: this._id});
    var useractual = Meteor.userId(); 
    var SesionGrup = Users_sesions.findOne({ iduser:useractual, idsesion:this._id });
    return SesionGrup.rol;
  },*/
  
});