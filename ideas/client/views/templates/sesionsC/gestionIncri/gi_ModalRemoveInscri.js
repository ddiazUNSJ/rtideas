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
