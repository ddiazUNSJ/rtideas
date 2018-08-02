Template.as_ActionBtns.events({

	'click #giBtnUpdate': function(){
		console.log("click btnUpdate");

		if (Meteor.userId()) {

			swal("falta implementar, hay que considerar efectos colaterales");


		} else {

           swal("Actualizacion no permitida!", "Por favor, inicie como usuario");
		}

	},

	'click #giBtnRemove': function(){
          console.log("click btnRemove");
		if (Meteor.userId()) {

			
			swal("falta implementar, hay que considerar efectos colaterales");

		} else {

           swal("No se le permite eliminar", "Por favor, inicie como usuario");
			

		}


	}

});