Template.inscriActionBtns.events({
'click #inscribime': function()
    {
     bootbox.confirm("Desea inscribirse ?", function(res){
        if( res )
      {
        var datos = {
          usuario: Meteor.userId(),
          sesion:this._id
        };

        Meteor.call('inscripcionInsert', datos, function(error, result) //se define un metodo para insertar
        {      
          if (error)
            return alert(error.reason);
          //Router.go('chatPage', {idgrupo:Session.get('idgrupo')});
        }); 
      } 
      });
    
    }

	// 'click #btnUpdate': function(){
	// 	console.log("click btnUpdate");

	// 	if (Meteor.userId()) {

	// 		Session.set("usuarioId", this._id);

	// 	} else {

 //           swal("Actualizacion no permitida!", "Por favor, inicie como usuario");
	// 	}

	// },

	// 'click #btnRemove': function(){
 //          console.log("click btnRemove");
	// 	if (Meteor.userId()) {

	// 		Session.set("IdusuarioAEliminar", this._id);

	// 	} else {

 //           swal("No se le permite eliminar", "Por favor, inicie como usuario");
			

	// 	}


	// }

});
