Template.gp_AdminPartici.helpers({

   isAdmin: function() {
         
       var rol=Session.get('rol')
        
         return  (rol==="Administrador"); 
    },

  isAnim: function() {
         
          
    var rol=Session.get('rol')

          return  (rol==="Animador"); 
    },

   sesion: function(){
    return Session.get("sesionCActual");
   },
   

   selector: function(){


 // var aver=Session.get("sesionCActual")
 var sesionId=Session.get("sesionCActual");
 console.log("sesion Id en selector en gp_AdminPartici ", sesionId );
    return {rol:"Participante", idsesion:sesionId};
   }
});

Template.gp_AdminPartici.onCreated(function () {
	
  // Trae todas las Participciones que estan en la coleccion users-sesion  
   
   // Meteor.subscribe('users_sesions');

    //Session.set("sesionCActual","iGySuLtgibA4J3T9r") //a piñon fijo luego este debe ser la entrada al modulo
   
  //  Session.set("sesionCActual","9BKdcZajxeB3o5MkE") //a piñon fijo luego este debe ser la entrada al modulo

    console.log("sesionCActual- en gp_AdminPartici :",Session.get("sesionCActual"));
    var sesionId=Session.get("sesionCActual");

 Meteor.subscribe('sesion_de_userSesion', sesionId);
    

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
