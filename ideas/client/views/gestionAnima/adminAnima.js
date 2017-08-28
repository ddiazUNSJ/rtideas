Template.adminAnima.helpers({

   isAdmin: function() {
         
       var rol=Session.get('rol')
        
         return  (rol==="Administrador"); 
    },
    selector:function(){
      return {active: true}
    },
  // isAnim: function() {
         
          
  //   var rol=Session.get('rol')

  //         return  (rol==="Animador"); 
  //   }


});

Template.adminAnima.onCreated(function () {
    // Trae Animadores
	  Meteor.subscribe('allAnimadores');
    //Obtiene rol
    Meteor.call('getUserRol',function (error, result){ 
             if (error){
              swal("Usted no es usuario del sistema ")
             }
             else{
              rol=result;
              console.log("rol en cliente: "+ rol)
              Session.set('rol',rol);
              }
    });
});
