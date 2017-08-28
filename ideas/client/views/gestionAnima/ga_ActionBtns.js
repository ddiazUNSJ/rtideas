Template.ga_ActionBtns.events({

	'click #btnActivar': function(){
		console.log("click btnActivar");

		if (Meteor.userId()) {
             // this contiene datos de la fila seleccionada, this._id contiene el cod del animador
	         Meteor.call('animadorOn',this._id,function (error, result){ 
	             if (error){
	              swal("No esta habilitado para esta accion ")
	             }
	             else{
	              swal("Animador Activado ")
	              }
	          });
		 }
		else {

           swal("Accion no permitida!", "Por favor, inicie como usuario");
		}

	},

	'click #btnRemove': function(){
          console.log("click btnRemove");
		if (Meteor.userId()) {
             // this contiene datos de la fila seleccionada, this._id contiene el cod del animador
	         Meteor.call('animadorOff',this._id,function (error, result){ 
	             if (error){
	              swal("No esta habilitado para esta accion ")
	             }
	             else{
	              swal("Animador inhabilitado ")
	              }
	          });
		 }
		else {

           swal("Accion no permitida!", "Por favor, inicie como usuario");
		}


	},
	
	


});
