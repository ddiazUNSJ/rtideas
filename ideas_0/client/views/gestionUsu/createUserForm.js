import {Schemas} from '/lib/images/image.collection.js';
import './createUserForm.html';

AutoForm.addHooks('afCreateUser', {

 // LLamado despues que autoform actualiza un usuario
	onSuccess: function(formType, result) {

		$('#createUserModal').modal('hide');
		

		swal("El sistema ha creado el usuario");
		
		Modal.hide('TmplModalCreateUser');
	}

});





Template.createUserForm.helpers({

	selectedUserDoc: function(){

		return Meteor.users.findOne({_id: Session.get('usuarioId')});

	},
	traeSchema:function(){
		return Schemas.NuevoUsuario;
	},
    idUsuario:function(){
		return Session.get('usuarioId');
	},
   
});
