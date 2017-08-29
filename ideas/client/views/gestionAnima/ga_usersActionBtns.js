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
	        console.log("refresco de tabla :ga_usersActionBtns");
	        Meteor.call('usuariosNoAnime',function (error, result){ 
             if (error){
              swal("Usted no es usuario del sistema ")
             }
             else{
              
              Session.set('usuarioNA',result);
              }
            });
		 }
		else {

           swal("Accion no permitida!", "Por favor, inicie como usuario");
		}

	},

	


});
