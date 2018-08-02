

Template.gInsc_aceptar.helpers({ 
	checkeado: function() {
	    var idsesion =  Session.get('sesionId');
	    var user = this.user_id;
	    
	    var result = Users_sesions.findOne( {iduser: user, idsesion: idsesion} );
	   
	    if(result) 
	      return "checked";
	    else 
	      return "";
	},

});


Template.gInsc_aceptar.events({

	'click .aceptar': function(e)
	{
	    e.preventDefault();

	    //var radio = $(e.target);
	    //var rolselect= $(radio).parent('div').parent('td').parent('tr').find('[name="perfil"]');
	    //var rol = $(rolselect).val();

	    var arre = {
	      userId: this.user_id,
	      sesionId: Session.get('sesionId'),
	      grupoId: "",
	    };
	    //console.log(arre);

	   
	    Meteor.call('InsertUserSesion', arre, function(error, result) //se define un metodo para insertar
	    {      
	        if (error)
	          return console.log(error.reason);
	         //Router.go('chatPage', {_id: result._id}); 
	    });   
	},

});





//*********************SELECT GRUPO******************************/
Template.gInsc_selectgrupo.helpers({ 

	desactivado: function() {
	    var idsesion =  Session.get('sesionId');
	    var user = this.user_id;
	    
	    var result = Users_sesions.findOne( {iduser: user, idsesion: idsesion} );
	   
	    if(result) 
	      return "";
	    else 
	      return "disabled";
	},
	
	get_grupos: function() {
		var idsesion =  Session.get('sesionId');
		
	    return Grupo.find({sesion_id: idsesion}, {sort: {gr: 1}});	

	},

});

Template.gInsc_selectgrupo.events({

	'change .grupo': function(e,t)
	{
	    e.preventDefault();
	    //var idgrupo = new Array();
	    var idgrupo = $(e.target).find('option:selected').val();

	   
	    var arre = {
	      userId: this.user_id,
	      sesionId: Session.get('sesionId'),
	      grupoId: idgrupo
	    };	 
	   
	    Meteor.call('UpdateGrupo_usersesion', arre, function(error, result) //se define un metodo para insertar
	    {      
	        if (error)
	          return console.log(error.reason);
	         //Router.go('chatPage', {_id: result._id}); 
	    });  
	},

});
