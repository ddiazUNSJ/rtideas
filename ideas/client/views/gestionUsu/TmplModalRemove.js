Template.TmplModalRemove.helpers({

	data: function(){

		return Meteor.users.findOne({_id: Session.get('usuarioId')});
	}

});





Template.TmplModalRemove.events({

	"click  #confirmTrue": function(){

		if (Meteor.userId()) {


			var data = Meteor.users.findOne({_id: Session.get('IdusuarioAEliminar')});

			swal("Se eliminaran los datos de", data.profile.nombre);
			
			// NO se elimina se marca como eliminado y en publicar se filtra por eliminados
		//	Meteor.users.remove({_id: Session.get('usuarioId')});
	        Meteor.users.update({ _id: Session.get('usuarioId') }, { $set: {'active' : false }});
      


		}
		else {swal("no esta autorizado para eliminar usuarios");}
	}

});
