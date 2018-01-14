

Template.gs_ActionBtns.helpers({ 
	estadoInicio: function() {
	    if(this.estado=='Inicio')
	    	return true;
	    else return false;	
	},
});


Template.gs_ActionBtns.events({

	// 'click #btnActivar': function(){
	// 	console.log("click btnActivar");

	// 	if (Meteor.userId()) {
 //             // this contiene datos de la fila seleccionada, this._id contiene el cod del animador
	//          Meteor.call('animadorOn',this._id,function (error, result){ 
	//              if (error){
	//               swal("No esta habilitado para esta accion ")
	//              }
	//              else{
	//               swal("Animador Activado ")
	//               }
	//           });
	// 	 }
	// 	else {

 //           swal("Accion no permitida!", "Por favor, inicie como usuario");
	// 	}

	// },

	'click #btnRemove': function(e){
        //var idsesion = $(this).val();
        var idsesion = $(e.target).attr('value');
        
		if (Meteor.userId()) {
			bootbox.confirm("Eliminar Sesion?", function(res){
	    		if(res)
				{
			        Meteor.call('sesionRemove',idsesion,function (error, result){ 
			            if (error){
			              swal("Accion no permitida!",error);
			            }
			            else swal("OK", "Sesion Eliminada");
			             
			        });
			    }
			});
		}
		else {

           swal("Accion no permitida!", "Por favor, inicie como usuario");
		}
	},

	'click #btnPublicar': function(e){
        //var idsesion = $(this).val();
        var idsesion = $(e.target).attr('value');
        
		if (Meteor.userId()) {
			bootbox.confirm("Publicar Sesion?", function(res){
	    		if(res)
				{
			        Meteor.call('sesionPublicar',idsesion,function (error, result){ 
			            if (error){
			              swal("Accion no permitida!",error);
			            }
			            else swal("OK", "Sesion Publicada");
			             
			        });
			    }
			});
		}
		else {

           swal("Accion no permitida!", "Por favor, inicie como usuario");
		}
	},

	'click #btnEdit': function(e){
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
	},
	
	
	'click #btnGrupos': function(e,t)
    {
	    e.preventDefault();
	    var idsesion = $(e.target).attr('value');
	  	Session.set('sesionId', idsesion);
	    //$('#altaSesion input').val('');
	    //$('#altaSesion #tematica_id').val( Session.get('tematicaId') );
	    $('#modal_admin_grupos').modal('show');
   },

   'click #btnAnimadores': function(e,t)
    {
	    e.preventDefault();
	    var idsesion = $(e.target).attr('value');
	  	Session.set('sesionId', idsesion);
	    
		$('#asignaAnimSes #idusers option').prop('selected',false);


	    var animSesion = AnimSesion.find({idsesion:idsesion});
		animSesion.forEach( function(myDoc) 
		{	
			var values = Array();
			values = myDoc.idusers;
			for (var i = 0; i < values.length; i++) {
				$('#asignaAnimSes #idusers option[value="'+values[i]+'"]').prop('selected',true);
			}
		});

	    $('#asignaAnimSes #idsesion').val( idsesion );
	    $('#modal_asigna_animadores').modal('show');
    },

});


Template.gs_ActionBtnsGrupos.events({
 	'click #btnRemoveGru': function(e){
        //var idsesion = $(this).val();
        var idsesion = $(e.target).attr('value');
        
		if (Meteor.userId()) {
			bootbox.confirm("Eliminar Grupo?", function(res){
	    		if(res)
				{
			        Meteor.call('gruponRemove',idsesion,function (error, result){ 
			            if (error){
			              swal("Accion no permitida!",error);
			            }
			            else swal("OK", "Grupo Eliminada");
			             
			        });
			    }
			});
		}
		else {
           swal("Accion no permitida!", "Por favor, inicie como usuario");
		}
	},
});
