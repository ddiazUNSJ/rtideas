Template.gi_AdminInscri.helpers({

   isAdmin: function() {
         
       var rol=Session.get('rol')
        
         return  (rol==="Administrador"); 
    },

  isAnim: function() {
         
          
    var rol=Session.get('rol')

          return  (rol==="Animador"); 
    },

   selector() {
    return {activa: true}; // this could be pulled from a Session var or something that is reactive
    }
});

Template.gi_AdminInscri.onCreated(function () {
	
  // Trae todas las inscripciones que se le permiten ver
   
    Meteor.subscribe('allInscripciones');

  
    Meteor.call('getUserRol',function (error, result){ 
             if (error){
              swal("Usted no es usuario del sistema ")
             }
             else{

              rol=result;
               console.log("rol en cliente: "+ rol)
               Session.set('rol',rol);
        //      return  (rol==="Administrador");
             }
    });
         

});
