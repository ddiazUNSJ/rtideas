Template.gp_selInscriActionBtns.events({

	'click #btnAgregar': function(){

		 console.log("click btnAgregar");
		 console.log(this.sesion);
         console.log(this.userId);
         console.log(this._id);
          datos={inscriId:this._id,
         	        userId:this.userId,
         	        sesionId:this.sesion,
                   };
         //   if (Template.instance().subscriptionsReady()) {
	        
	     
	//	if (Meteor.userId()) {
		  if ( (datos.inscriId!=undefined) &&(datos.userId!=undefined)&&(datos.sesionId!=undefined))
			{
				//console.log("datosInscri en cliente:"+datos.inscriId);
				Meteor.call('agregarParticipante',datos,function (error, result)
				{ 
		             if (error){
		              swal("No esta autorizado para agregar participantes")
		             }
		             else{
		              swal("Participante Agregado ")
		              }
		           });
  
				// Meteor.call('agregarParticipante',datos,function (error, result)
				// { 
		  //            if (error){
		  //             swal("No esta habilitado para esta accion bolas")
		  //            }
		  //            else{
		  //             swal("Animador Agregado ")
		  //             }
		  //          });
		      }
                //Aqui this apunta a la fila actualmente seleccionada

	        // console.log("refresco de tabla :ga_usersActionBtns");
	        // Meteor.call('usuariosNoAnime',function (error, result){ 
         //     if (error){
         //      swal("Usted no es usuario del sistema ")
         //     }
         //     else{
              
         //      Session.set('usuarioNA',result);
         //      }
         //    });
		
		   // else {

     //           swal("Accion no permitida!", "Por favor, inicie como usuario");
		   //   }
         
	},

	


});
