Template.inscriActionBtns.events({
'click #inscribime': function(e)
    {
    	idg=this._id;
     bootbox.confirm("Desea inscribirse ?", function(res){
        if( res )
      {
        var sesionId = e.target.value;
      
        Meteor.call('inscripcionInsert', sesionId, function(error, result) //se define un metodo para insertar
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
Template.inscriActionBtns.helpers({ 

 // A continuacion no funciona la reactividad pues como el contenido a imprimir coloca lo que esta 
 // cuando pasa por la funcion siempre va a colocar primeraImpresion pues es lo que ve

 // leyenda:function(){
 //    Session.set('leyenda1', "primeraImpresion");
 // 	var idSes=this.sesion_ID;
 //    Meteor.call('estaInscripto',idSes,function (error, result){ 
             
 //     if (result==false)
 //        { Session.set('leyenda1', "Inscribirse");}
 //     else 	 
 // 	 { Session.set('leyenda1', "Ya te Inscribirse");}	
 //    });
 // 	return Session.get('leyenda1');
 // },

leyenda:function(){
	// //var idSes=;
	// var toy=Inscripcion.findOne({userId:this.usuario,sesion:this.sesion_ID})
	// console.log(toy._id);
	// var respuesta="indefinida"
	// if (toy_id!=undefined)
	// 	{ respuesta="Se ha Inscribido"}
	// else {respuesta="Inscribirse"}
   
        
 	
 	// Meteor.subscribe('inscripciones'); 
  //   var data =this.sesion_ID;
  //   var deme=data;
  //   Meteor.call('estaInscripto',data,function (error, result){ 
             
  //    if (result===false) { 
  //    	return "Inscribirse"}
  //    if (result===true) { 
  //    	return "Ya te Inscribirse"}
    
  //   });

 },
	
});

// Template.inscriActionBtns.onCreated(function() {

//   Meteor.subscribe('inscripciones'); 
//   var data =this.data.sesion_ID;
//  // var deme=data;
//  // Meteor.call('estaInscripto',data,function (error, result){ 
             
//  //     if (result===false) { 
//  //     	return'leyenda1', "Inscribirse");}
//  //     if (result===true) { 
//  //     	Session.set('leyenda1', "Ya te Inscribirse");}
    
//  //    });
//  //Meteor.apply('chartData', [prodName], true, function(err, result){
//  Meteor.apply ("contarInscriptos",[data],true,function (error, result){
//  	 Session.set( "contando",result);
//  });








   //var contar=Inscripcion.find({}).count();

   //Session.set( "contando",contar);
  
// });

