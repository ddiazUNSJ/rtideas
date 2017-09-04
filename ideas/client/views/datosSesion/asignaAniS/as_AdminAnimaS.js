Template.as_AdminAnimaS.helpers({

   isAdmin: function() {
         
       var rolU=Session.get('rolU')
        
         return  (rolU==="Administrador"); 
    },

  isAnim: function() {
         
          
    var rolU=Session.get('rolU')

          return  (rolU==="Animador"); 
    },

   sesion: function(){
    return Session.get("sesionCActual");
    },

    selector:function(){
      
      //filtra el datatable por el campo rol definido con ese nombre en tabular y en la coleccion users_sesion
      return{rol:"Animador" };
    },
  
});

Template.as_AdminAnimaS.onCreated(function () {
	
  // Trae todas las Participciones que estan en la coleccion users-sesion  
   
   // Meteor.subscribe('users_sesions');
    Session.set("sesionCActual","9BKdcZajxeB3o5MkE") //a piñon fijo luego este debe ser la entrada al modulo
    console.log("sesionCActual- en as_AdminAnimaS :",Session.get("sesionCActual"));

   // Meteor.subscribe('sesion_de_userSesion', Session.get('sesionCActual') );
  
    Meteor.call('getUserRol',function (error, result){ 
             if (error){
              swal("Usted no es usuario del sistema ")
             }
             else{

              var userRol=result;
               console.log("rol en cliente: "+ userRol)
               Session.set('rolU',userRol);
        //      return  (rol==="Administrador");
             }
    });
         

});
