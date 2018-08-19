Template.ga_ActionBtns.events({

	
	
	'click #btnRemove': function(e){
        //var idsesion = $(this).val();
        var iduser = $(e.target).attr('value');
        
        //console.log(iduser);
		if (Meteor.userId()) {
			bootbox.confirm("Eliminar Usuario de la lista de Animadores?", function(res){
	    		if(res)
				{
			        Meteor.call('DeleteAnim',iduser,function (error, result){ 
			            if (error){
			              swal("Accion no permitida!",error);
			            }
			            else swal("OK", "Aniamdor Eliminado");
			             
			        });
			    }
			});
		}
		else {

           swal("Accion no permitida!", "Por favor, inicie como usuario");
		}
	},



});
