Template.asignacion.rendered = function()
{
   $("#inscriptos").select2();
   $( "#tematica" ).select2();
   $( "#sesion" ).select2();
   $( "#grupo" ).select2();
   //$( "#animadores" ).select2();

   $('.select2').css('width','auto');
   
   $('#s2id_inscriptos').css('min-width','50%');
   $('#s2id_tematica').css('min-width','50%');
   $('#s2id_sesion').css('min-width','50%');
   $('#s2id_grupo').css('min-width','50%');
   //$('#s2id_animadores').css('min-width','50%');


}

Template.asignacion.events
({

	'change #tematica': function(e,t){
        // do whatever.......
		var idtematica = $(e.target).find('option:selected').val();
		if(idtematica != -1)
    {
      Session.set('tematicaId', idtematica);
      $('#sesion').attr('disabled',false);
    }
    else 
    { 
      $('#sesion').attr('disabled',true);
    }

  },

  'change #sesion': function(e,t){
    var idsesion = $(e.target).find('option:selected').val();
    if(idsesion != -1)
    {
      Session.set('sesionId', idsesion);

      Meteor.subscribe('participantes_sesion', Session.get('sesionId'));

      $('#grupo').attr('disabled',false);
      //$('#animadores').attr('disabled',false);
      $('#inscriptos').attr('disabled',false);

    }
    else 
    { 
      $('#grupo').attr('disabled',true);
      $('#inscriptos').attr('disabled',true);
    }

  },
	
	
  'submit form': function(e)
  { 
    e.preventDefault();

    var grupo = $(e.target).find('[name=gr]').val();
    var sesion = $(e.target).find('[name=sesion]').val();

    var inscriptos = $(e.target).find('[name=inscriptos]').val();

    
    //if( (inscriptos||animadores) && (grupo!=-1) )
    if(grupo!=-1) 
    {  
        var datos = {
          idgrupo: grupo,
          idsesion:sesion,
          inscriptos: inscriptos
        };

        Meteor.call('participantesAlGrupo', datos, function(error, result) 
        {      
            if (error)
              return alert(error.reason);
            else
                bootbox.alert("Carga Exitosa", function() { 
                    $('#tematica').val(-1);
                    $('#sesion').val(-1);
                    
                    $('#grupo').val(-1);
                    $('#inscriptos').val('-1');

                    //Meteor._reload.reload();
                    $("#inscriptos").select2();
                    $( "#tematica" ).select2();
                    $( "#sesion" ).select2();
                    $( "#grupo" ).select2();

                    Router.go('asignacion', {});
                });
        }); 
    }
    else
    bootbox.alert("Selecicone un grupo", function() { 
  
      });

  }//fin submit
});


Template.asignacion.helpers({ 
 //DD 23/08/2017
  get_inscriptos_estaba: function() { 

    var sesionid = Session.get('sesionId'); //obtiene idsesion 
  //  var inscriptos = Users_sesions.find({ idsesion:sesionid, rol:'Participante' });
   
    var users = inscriptos.map(function(p) { return p.iduser });
    return Meteor.users.find({_id: {$in: users}}, {sort: {username: 1}});	
  },

 //DD 23/08/2017
  get_inscriptos: function() { 
 // Trae todas las inscripciones que se le permiten ver
    Meteor.subscribe('allInscripciones');

    var sesionid = Session.get('sesionId'); //obtiene idsesion 
  //  var inscriptos = Inscripcion.find({ idsesion:sesionid, estadoInscripcio:'Aceptado', activa:true })
     var inscriptos = Inscripcion.find({});
    var users = inscriptos.map(function(p) { return p.userId });
 //   return users;
   return Meteor.users.find({_id: {$in: users}}, {sort: {username: 1}}); 
  },
  /*get_animadores: function() {
    var sesionid = Session.get('sesionId'); 
    //var animadores = Animador_sesion.find({ sesion_id:sesionid });
    var animadores = Users_sesions.find({ idsesion:sesionid, rol:'Animador' }); 
    var users = animadores.map(function(p) { return p.iduser });  
    return Meteor.users.find({_id: {$in: users}}, {sort: {username: 1}}); 
  },*/
  
  
  get_grupos: function() {
   var sesionid = Session.get('sesionId');
   return Grupo.find({sesion_id: sesionid, estado:"activa"}, {sort: {submitted: -1}});	
  },
  
  get_tematicas: function() {

    return  Tematica.find({}, {sort: {submitted: -1}});	

  },

  get_sesiones: function() {
    var tematicaid = Session.get('tematicaId');
    return Sesion.find({tematica_id: tematicaid, estado:"activa"}, {});  
  }
  
  
});