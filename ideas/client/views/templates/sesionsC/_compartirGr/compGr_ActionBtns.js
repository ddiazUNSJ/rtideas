

Template.compGr_ActionBtns.helpers({ 
	estadoInicio: function() {
	    if(this.estado=='Inicio')
	    	return true;
	    else return false;	
	},
});


Template.compGr_ActionBtns.events({


	'click #btnRemove': function(e){
        //var idsesion = $(this).val();
        var idsesion = $(e.target).attr('value');
        
		if (Meteor.userId()) {
			bootbox.confirm("Eliminar Registro?", function(res){
	    		if(res)
				{
			        Meteor.call('gruposCompRemove',idsesion,function (error, result){ 
			            if (error){
			              swal("Accion no permitida!",error);
			            }
			            else swal("OK", "Registro Eliminado");
			             
			        });
			    }
			});
		}
		else {

           swal("Accion no permitida!", "Por favor, inicie como usuario");
		}
	},


	/*'click #btnEdit': function(e){
        //var idsesion = $(this).val();
        var idsesion = $(e.target).attr('value');
        
		if (Meteor.userId()) {
			e.preventDefault();
			
			var sesion = Sesion.findOne({_id:idsesion});
			var instancias = Instancia.find({});


    		$('#altaSesion input').val('');
    		$('#altaSesion #nombre').val(sesion.nombre);
    		$('#altaSesion #tematicaAlta').val(sesion.tematica_id);
    		$('#altaSesion #fecha1').val(sesion.fecha1);
    		$('#altaSesion #fecha2').val(sesion.fecha2);
    		$('#altaSesion #hora1').val(sesion.hora1);
    		$('#altaSesion #hora2').val(sesion.hora2);

    		instancias.forEach( function(myDoc) 
			{	
				var value = 'instancia'+myDoc.numero;
				//alert(sesion['instancia1']);
    			$('#altaSesion #instancia'+myDoc.numero).val(sesion[value]);
			});

    		$('#altaSesion input').attr('disabled', true);
    		$('#altaSesion select').attr('disabled', true);
    		$('#title_modal_sesion').text("Detalles Sesion");
    		$('#altaSesion #btn_altaSesion').attr('disabled', true);
    		$('#altaSesion #btn_altaSesion').css('display', 'none');

    		$('#modal_alta_sesion').modal('show');
		}
		else {
           swal("Accion no permitida!", "Por favor, inicie como usuario");
		}
	},*/
	

});

