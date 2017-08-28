Template.usersActionBtns.events({

	'click #btnUpdate': function(){
		console.log("click btnUpdate");

		if (Meteor.userId()) {

			Session.set("usuarioId", this._id);
			  Modal.show('TmplModalUpdate');


		} else {

           swal("Actualizacion no permitida!", "Por favor, inicie como usuario");
		}

	},

	'click #btnRemove': function(){
          console.log("click btnRemove");
		if (Meteor.userId()) {

			Session.set("IdusuarioAEliminar", this._id);

		} else {

           swal("No se le permite eliminar", "Por favor, inicie como usuario");
			

		}


	},
	'click #btnChangePass': function(){
		console.log("click btnChangePass");

		if (Meteor.userId()) {

			Session.set("usuarioId", this._id);
			  Modal.show('TmplModalChangePass');


		} else {

           swal("Actualizacion no permitida!", "Por favor, inicie como usuario");
		}

	},
	
	'click #btnNewUser': function(){
		console.log("click btnChangePass");

		if (Meteor.userId()) {

			Session.set("usuarioId", this._id);
			  Modal.show('TmplModalCreateUser');


		} else {

           swal("Actualizacion no permitida!", "Por favor, inicie como usuario");
		}

	},


});
