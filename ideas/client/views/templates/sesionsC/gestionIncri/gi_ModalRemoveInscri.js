Template.giModalRemoveInscri.helpers({

	data: function(){

		return Inscripcion.findOne({_id: Session.get('inscriID')});
	}

});





Template.giModalRemoveInscri.events({

	"click  #confirmTrue": function(){

		if (Meteor.userId()) {


			var data = Inscripcion.findOne({_id: Session.get('inscriID')});

			swal("Se eliminaran la inscripcion de", data.nombre);
			
			// NO se elimina se marca como eliminado y en publicar se filtra por eliminados
		
	        Inscripcion.update({ _id: Session.get('inscriID') }, { $set: {'activa' : false }});
      


		}
		else {swal("no esta autorizado para eliminar inscripciones");}
	}

});
