Template.list_inscriptos.rendered = function()
{ 
    $('[name="perfil"').select2();

    $('#sesion').select2();
    $('.select2-container').css('min-width','50%');
    $('.select2-container').css('width','auto');

    //num = 1;
    Session.set('sesionId', 0);
    //userId = 0;
}

Template.list_inscriptos.onCreated(function(){
   this.dataState = new ReactiveVar();
   this.dataState.set(0);
});

Template.list_inscriptos.helpers({ 

  /*get_subroles: function() {
    return SubRoles.find({}, {sort: {nombre: -1}});	
  },

  get_inscriptos: function() {
    var idsesion = Session.get('sesionId');
    return Inscripcion.find({sesion_id: idsesion});  
  },*/
  selector() {
    return {sesion_id: Template.instance().dataState.get()};
  },

  /*get_nombre: function() {
    var User = Meteor.users.findOne({_id: this.user_id});
    return User.nombre;  
  },

  get_apellido: function() {
    var User = Meteor.users.findOne({_id: this.user_id});
    return User.apellido;  
  },*/

  get_sesiones: function() {
    //return Sesion.find({estado:"activa"}, {});  
    return Sesion.find({}, {sort: {fecha1: 1, hora1: 1}});  
  },

  get_tematica_name: function() {    
    var data = Tematica.findOne({_id:this.tematica_id});  
    return data.SC;
  },

  /*setiduser:function() {
     //Session.set('userId', this.user_id);
     userId = this.user_id;
  },*/
  
  /*seleccionado: function() {
    var idsesion =  Session.get('sesionId');
    var user = userId;
   
    var result = Users_sesions.findOne( {iduser: user, idsesion: idsesion} );
    
    console.log(result.rol+'--'+this.nombre);

    if(result) 
      if(result.rol==this.nombre)
        return "selected";
    else 
      return "";
    
  },*/

  /*email: function() {
    //var user = Meteor.users.findOne({_id: this.userId});
    //return user && user.emails[0].address;
    return "algo";
  },*/

  
});


Template.list_inscriptos.events({

  'change #sesion': function(e,t){
        // do whatever.......

    var idsesion = $(e.target).find('option:selected').val();
    if(idsesion != -1)
    {
      num = 1;
      Session.set('sesionId', idsesion);
      t.dataState.set(Session.get('sesionId')); //variable de sesion para el datatable
    }
    else {Session.set('sesionId', 0);
     t.dataState.set(Session.get('sesionId'));}
  },


 });