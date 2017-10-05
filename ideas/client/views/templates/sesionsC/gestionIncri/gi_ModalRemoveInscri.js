Template.gi_ModalRemoveInscri.helpers({

	data: function(){

		return Inscripcion.findOne({_id: Session.get('inscriID')});
	}

});





Template.gi_ModalRemoveInscri.events({


	"click  #confirmTrue": function(){
        var idInscripcion=Session.get('inscriID');
		if (Meteor.userId()) {


			var data = Inscripcion.findOne({_id:idInscripcion });

			swal("Se eliminará la inscripcion de", data.nombre);
			// Aqui en realidad EL CONTROl DE ELIMINACION solo deberia estar disponible
			// si la sesion esta en estado de preparacion sino no deberia poder eliminar nada
			
			// OJO ---pero deberiamos sacarlo de user_sesion si el mismo ha sido agregado como participante

			// NO se elimina se marca como eliminado y en publicar se filtra por eliminados
			Meteor.call('inhabilitarinscripcion', idInscripcion, function(error, result) 
        	{      
         		if (error) return alert(error.reason);
         		 //Router.go('chatPage', {idgrupo:Session.get('idgrupo')});
      		  }); 
	       
      


		}
		else {swal("no esta autorizado para eliminar inscripciones");}
	}

});
