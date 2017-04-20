Template.compartirSubmit.rendered = function()
{
  
   $( "#tematica" ).select2();
   $( "#sesion" ).select2();
   $( "#grupo" ).select2();
   //$( "#animadores" ).select2();

   $('.select2').css('width','auto');
   
   $('#s2id_tematica').css('min-width','50%');
   $('#s2id_sesion').css('min-width','50%');
   $('#s2id_grupo').css('min-width','50%');

}

Template.compartirSubmit.events
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
        // do whatever.......
    var idsesion = $(e.target).find('option:selected').val();
    if(idsesion != -1)
    {
      Session.set('sesionId', idsesion);

      $('#grupo').attr('disabled',false);
      
    }
    else 
    { 
      $('#grupo').attr('disabled',true);
     
    }

  },   
	
  

  'submit form': function(e)
  { 
    e.preventDefault();

    var sesionId = $(e.target).find('[name=sesion]').val();
    var gruposId = $(e.target).find('[name=gr]').val();

    
    if( (gruposId) && (sesionId!=-1) )
    {  
        var datos = {
          idsesion: sesionId,
          //animadores: animadores,
          grupos: gruposId
        };

        Meteor.call('compartirGInsert', datos, function(error, result) 
        {      
            if (error)
              return alert(error.reason);
            else
                bootbox.alert("Carga Exitosa", function() { 
                    $('#tematica').val(-1);
                    $('#sesion').val(-1);
                    $('#grupo').val(-1);
                                     
                     $( "#tematica" ).select2();
                     $( "#sesion" ).select2();
                     $( "#grupo" ).select2();
                     //$( "#animadores" ).select2();

                     $('.select2').css('width','auto');
                     
                     $('#s2id_tematica').css('min-width','50%');
                     $('#s2id_sesion').css('min-width','50%');
                     $('#s2id_grupo').css('min-width','50%');

                    //Router.go('GcompList', {});
                    Router.go('compartirSubmit', {});
                    
                });
        }); 
  }
  else
    bootbox.alert("Complete todos los campos", function() { 
  
      });

  }//fin submit


 });


Template.compartirSubmit.helpers({ 

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