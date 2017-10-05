Template.gi_ActionBtns.events({

	'click #giBtnUpdate': function(){
		console.log("click btnUpdate");

		if (Meteor.userId()) {

			Session.set("inscriID", this._id);
			Modal.show('gi_ModalUpdateInscri');


		} else {

           swal("Actualizacion no permitida!", "Por favor, inicie como usuario");
		}

	},

	'click #giBtnRemove': function(){
          console.log("click btnRemove");
		if (Meteor.userId()) {

			Session.set("inscriID", this._id);
			Modal.show('gi_ModalRemoveInscri');

		} else {

           swal("No se le permite eliminar", "Por favor, inicie como usuario");
			

		}


	}

});
