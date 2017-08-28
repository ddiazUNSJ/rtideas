Template.creaAnimadorForm.helpers({

   isAdmin: function() {
         
       var rol=Session.get('rol')
        
         return  (rol==="Administrador"); 
    },

  
});

Template.creaAnimadorForm.onCreated(function () {
    // Trae Usuarios
   // handleAllUsers.stop(); // para la suscripcion de todos los usuarios
	 // Meteor.subscribe('usersActivosNoAnimadores');
    //Obtiene rol
    Meteor.call('getUserRol',function (error, result){ 
             if (error){
              swal("Usted no es usuario del sistema ")
             }
             else{
              Session.set('rol',result);
              }
    });
});
