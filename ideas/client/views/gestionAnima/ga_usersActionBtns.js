Template.ga_usersActionBtns.events({

	'click #btnAgregar': function(){
		console.log("click btnAgregar");

		if (Meteor.userId()) {
               //Aqui this apunta a la fila actualmente seleccionada
	         Meteor.call('agregarAnimador',this._id,this.profile.nombre,function (error, result){ 
	             if (error){
	              swal("No esta habilitado para esta accion ")
	             }
	             else{
	              swal("Animador Agregado ")
	              }
	          });
		 }
		else {

           swal("Accion no permitida!", "Por favor, inicie como usuario");
		}

	},

	


});
