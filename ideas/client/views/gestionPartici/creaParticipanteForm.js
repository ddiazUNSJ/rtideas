Template.creaParticipanteForm.helpers({

   isAdmin: function() {
         
       var rol=Session.get('rol')
        
         return  (rol==="Administrador"); 
    },
    inscriptoNoAceptado:function(){

      return Session.get('inscriptoNoA');
    },
     selector:function(){
      console.log("Session.get_sesionCActual:",Session.get("sesionCActual"));
      return{sesion:Session.get("sesionCActual")}
     }

    // selector:function() {

    //    // Muestra los inscriptos que aun no han sido aceptados
    //     Meteor.call('inscriptosNoAceptados',this.sesion, function (error, result){ 
    //            if (error){
    //             swal("Usted no es usuario del sistema now ")
    //            }
    //            else{
    //              console.log("entrando a buscar inscriptosNoAceptados:creaParticipanteForm.helpers.selector1:");
    //             Session.set('inscriptoNoA',result);
    //             }
    //     });
    //     return { _id:{$in: Session.get('inscriptoNoA')} };
    //    }
  
});

Template.creaParticipanteForm.onCreated(function () {
  
   // handleAllUsers.stop(); // para la suscripcion de todos los usuarios
	 // Meteor.subscribe('usersActivosNoAnimadores');
   // suscribir solo a los participantes de la sesion
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

Template.creaParticipanteForm.onRendered(function(){
  
   // this.autorun(function(){
   //  console.log("Aqui cambio Algo:Template.creaAnimadorForm.onRendered ");
   //   Template.currentData();
   // });

});
