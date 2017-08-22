AutoForm.addHooks('afUpdateIncripto', {

 // LLamado despues que autoform actualiza un usuario
	onSuccess: function(formType, result) {

	    var data = Inscripcion.findOne({_id: Session.get('inscriID')});


		swal("Se actualizaron los datos de", data.nombre);
		
		Modal.hide('gi_ModalUpdateInscri');
	}

});





Template.gi_UpdateInscriForm.helpers({

// Selecciona el documento del usuario y lo pone autoform
	selectedInscriDoc: function(){

		return Inscripcion.findOne({_id: Session.get('inscriID')});

	}

});
