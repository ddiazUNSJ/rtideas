import {Schemas} from '/lib/images/image.collection.js';
AutoForm.addHooks('afChangePass', {

 // LLamado despues que autoform actualiza un usuario
	onSuccess: function(formType, result) {

		$('#changePassModal').modal('hide')

		var data = Meteor.users.findOne({_id: Session.get('usuarioId')});

		swal("Se actualizaron los datos de", data.profile.name);
		
		Modal.hide('TmplModalChangePass');
	}

});





Template.changePassForm.helpers({

// Selecciona el documento del usuario y lo pone autoform
	selectedUserDoc: function(){

		return Meteor.users.findOne({_id: Session.get('usuarioId')});

	},
	traeSchema:function(){
		return Schemas.GimePassword;
	},
    idUsuario:function(){
		return Session.get('usuarioId');
	},
   
});
