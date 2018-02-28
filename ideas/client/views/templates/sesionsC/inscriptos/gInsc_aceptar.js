

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
	      rol: "Participante",
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

