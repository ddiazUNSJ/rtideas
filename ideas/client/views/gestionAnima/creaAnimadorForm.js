Template.creaAnimadorForm.helpers({

   isAdmin: function() {
         
       var rol=Session.get('rol')
        
         return  (rol==="Administrador"); 
    },
   selector1:function() {
     return {active: true}; // this could be pulled from a Session var or something that is reactive
    }
  
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

Template.creaAnimadorForm.onRendered(function(){
  
   this.autorun(function(){
    console.log("Aqui cambio Algo:Template.creaAnimadorForm.onRendered ");
     Template.currentData();
   });

});
