Template.compartirSubmit.rendered = function()
{

   $("#tematica").select2();
   
   $( "#grupo" ).select2({
      theme: "classic",
    });
   $('.select2').css('width','auto');
   $('.select2').css('min-width','30%');

}

Template.compartirSubmit.events
({

	'change #tematica': function(e,t){
        // do whatever.......
		var idtematica = $(e.target).find('option:selected').val();
		Session.set('tematicaId', idtematica);
     },
	
	
  'submit form': function(e) { 
    e.preventDefault();
	
	var valores = $('#grupo').val();
	
	//console.log(valores);


    Meteor.call('compartirGInsert', valores, function(error, result) //se define un metodo para insertar
     {      
      if (error)
        return alert(error.reason);
      Router.go('GcompList', {});
    });  
  }
 });


Template.compartirSubmit.helpers({ 

  get_user: function() {
    return Meteor.users.find({}, {sort: {submitted: -1}});	
  },
  
  get_roles: function() {
    return Roles.find({}, {sort: {submitted: -1}});	
  },
  
   get_grupo: function() {
   var tematicaid = Session.get('tematicaId');
   return Grupo.find({sesion_id: tematicaid}, {sort: {submitted: -1}});	
  },
  
  get_creatividad: function() {
    return Creatividad.find({}, {sort: {submitted: -1}});	
  }
  
  
  
});