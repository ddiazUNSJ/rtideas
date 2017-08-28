 import { Schemas } from '/lib/images/image.collection.js';
 import './createUsuarioForm.html';

AutoForm.addHooks('afCreateUsuario', {

 // LLamado despues que autoform actualiza un usuario
	onSuccess: function(formType, result) {

		
		

		swal("El sistema ha creado el usuario");
		
	
	}

});





Template.createUsuarioForm.helpers({

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
