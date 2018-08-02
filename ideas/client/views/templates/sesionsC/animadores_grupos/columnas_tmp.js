
Template.gAnim_selectGrupos.renderer = function (){


  $('#grupoIds').select2();
   // $('.select2-selection').css('min-width','50%');
  
 };
 
Template.gAnim_selectGrupos.helpers({ 


});


Template.gAnim_selectGrupos.events({

	
/*	'change .animador': function(e,t)
	{
	    e.preventDefault();
	    var grupos = $(e.target).find('option:selected').val();

	    
	    var arre = {
	      userId: this._id,
	      sesionId: Session.get('sesionId'),
	      grupoIds: grupos,
	    };	 
	    console.log(arre);
	    Meteor.call('InsertUserSesion_anim', arre, function(error, result) //se define un metodo para insertar
	    {      
	        if (error)
	          return console.log(error.reason);
	         //Router.go('chatPage', {_id: result._id}); 
	    });  
	},*/

	'click #btnGrupos': function(e,t)
    {
	    e.preventDefault();

	    var idanim = $(e.target).attr('value');
	  	Session.set('animId', idanim);
	  	var idsesion =  Session.get('sesionId');
	    
		$('#asignaAnimGrupos #grupoIds option').prop('selected',false);

	    
      	var UserSesion=Users_sesions.find( {iduser:idanim, idsesion: idsesion} ); 
      	if(UserSesion)
			UserSesion.forEach( function(myDoc) 
			{	
				var values = Array();
				values = myDoc.idgrupo;
				for (var i = 0; i < values.length; i++) {
					$('#asignaAnimGrupos #grupoIds option[value="'+values[i]+'"]').prop('selected',true);
				}
			});

	    $('#asignaAnimGrupos #iduser').val( idanim );
	    $('#modal_asigna_grupos').modal('show');
    },


});



