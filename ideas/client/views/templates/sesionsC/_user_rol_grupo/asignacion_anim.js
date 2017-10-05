Template.asignacion_anim.rendered = function()
{
   $( "#tematica" ).select2();
   $( "#sesion" ).select2();
   $( "#grupos" ).select2();
   $( "#animadores" ).select2();

   $('.select2').css('width','auto');
   
   $('#s2id_tematica').css('min-width','50%');
   $('#s2id_sesion').css('min-width','50%');
   $('#s2id_grupos').css('min-width','50%');
   $('#s2id_animadores').css('min-width','50%');


}

Template.asignacion_anim.events
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

      Meteor.subscribe('animadores_sesion', Session.get('sesionId'));

      $('#grupos').attr('disabled',false);
      $('#animadores').attr('disabled',false);

    }
    else 
    { 
      $('#grupos').attr('disabled',true);
      $('#animadores').attr('disabled',true);
    }

  },
	
	
  'submit form': function(e)
  { 
    e.preventDefault();

    var grupos = $(e.target).find('[name=gr]').val();
    var sesion = $(e.target).find('[name=sesion]').val();
    var animador = $(e.target).find('[name=animadores]').val();

    
    if(animador!=-1) 
    {  
        var datos = {
          grupos: grupos,
          sesion:sesion,
          animador: animador
        };

        Meteor.call('gruposAlAnimador', datos, function(error, result) 
        {      
            if (error)
              return alert(error.reason);
            else
                bootbox.alert("Carga Exitosa", function() { 
                    $('#tematica').val(-1);
                    $('#sesion').val(-1);
                    $('#grupo').val('-1');
                    $('#animadores').val('-1');

                    //Meteor._reload.reload();
                    $("#animadores").select2();
                    $( "#tematica" ).select2();
                    $( "#sesion" ).select2();
                    $( "#grupo" ).select2();

                    $('#sesion').attr('disabled',true);
                    $('#animadores').attr('disabled',true);
                    $('#grupo').attr('disabled',true);

                    Router.go('asignacion_anim', {});
                });
        }); 
    }
    else
       bootbox.alert("Selecicone un animador", function(){});

  }//fin submit

});


Template.asignacion_anim.helpers({ 

  get_animadores: function() {
    var sesionid = Session.get('sesionId'); 
    //var animadores = Animador_sesion.find({ sesion_id:sesionid });
    var animadores = Users_sesions.find({ idsesion:sesionid, rol:'Animador' }); 
    var users = animadores.map(function(p) { return p.iduser });  
    return Meteor.users.find({_id: {$in: users}}, {sort: {username: 1}}); 
  },
  
  
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