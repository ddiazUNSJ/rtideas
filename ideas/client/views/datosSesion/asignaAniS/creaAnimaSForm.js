Template.creaAnimaSForm.helpers({

   isAdmin: function() {
         
       var rolU=Session.get('rolU')
        
         return  (rolU==="Administrador"); 
    },
   

    //  selector:function(){



    //   //Buscar todos la animadores activos, al definir tabular agregue el selector que envia solo los activos
    //   // Buscar en solo los animadores que no estan no estan inscriptos en esta sesion
    //   // Esto asegura que el animador no sea a su vez participante



    // // Buscamos todos los animadores que estan activos
    // var AnimadoresOn = Animadores.find({active: true});

    // // listamos el userId de los animadores activos
    // var idUserAnimadoresOnArray = AnimadoresOn.map(function(p) { return p.iduser });
    // var animadorParticipante= Users_sesions.find({iduser:{$in:idUserAnimadoresOnArray},idsesion:Session.get("sesionCActual")});
    
    // var animadorParticipanteArray=animadorParticipante.map(function(p) { return p.iduser });

    // var animadorParticipanteNombreArray=animadorParticipante.map(function(p) { return p.nombre });
   

    //  console.log("animadorParticipanteArray from selector:");
    //  console.log(animadorParticipanteArray);
    //  console.log(animadorParticipanteNombreArray);
    // return { _id:{$nin: animadorParticipanteArray} }
     
      
    // },  

     selector:function(){



      //Buscar todos la animadores activos, al definir tabular agregue el selector que envia solo los activos
      // Buscar en solo los animadores que no estan no estan inscriptos en esta sesion
      // Esto asegura que el animador no sea a su vez participante

   Meteor.call("animadorNoInscriptoEnLaSesion",Session.get("sesionCActual"),function (error, result){
           if (error){
              swal("Usted no es usuario del sistema ")
             }
             else{
              Session.set('animadorNoInscriptoEnSesion',result);
              }

   });

    console.log("animadorNoInscriptoEnSesion: " + Session.get('animadorNoInscriptoEnSesion'));
    return { iduser:{$in: Session.get('animadorNoInscriptoEnSesion')} }
     
      
    },  

    
    
});

Template.creaAnimaSForm.onCreated(function () {
  
    //Obtiene rol
    Meteor.call('getUserRol',function (error, result){ 
             if (error){
              swal("Usted no es usuario del sistema ")
             }
             else{
              Session.set('rolU',result);
              }
    });
});



Template.creaAnimaSForm.onRendered(function(){
  
   
});
