Template.gp_ActionBtns.events({

	'click #giBtnUpdate': function(){
		console.log("click btnUpdate");

		if (Meteor.userId()) {

			Session.set("ParticiID", this._id);
			Modal.show('gi_ModalUpdatePartici');


		} else {

           swal("Actualizacion no permitida!", "Por favor, inicie como usuario");
		}

	},

	'click #giBtnRemove': function(){
          console.log("click btnRemove");
		if (Meteor.userId()) {

			Session.set("ParticiID", this._id);
			Modal.show('gi_ModalRemovePartici');

		} else {

           swal("No se le permite eliminar", "Por favor, inicie como usuario");
			

		}


	}

});