Template.grupoSubmit.rendered = function()
{
   $("#sesion").select2();
   $( "#tematica" ).select2();
   $('#s2id_sesion').css('min-width','50%');
   $('#s2id_tematica').css('min-width','50%');
}

Template.grupoSubmit.events({

  'change #tematica': function(e,t){
        // do whatever.......
    var idtematica = $(e.target).find('option:selected').val();
    if(idtematica != -1)
    {
      Session.set('tematicaId', idtematica);
      //alert(Session.get('tematicaId'));
      $('#sesion').attr('disabled',false);
      
    }
    else 
    { 
      $('#sesion').attr('disabled',true);
     
    }

  },

  'submit form': function(e) {
    e.preventDefault();

  var grup = {
      gr: $(e.target).find('[name=gr]').val(),
      descripcion: $(e.target).find('[name=descripcion]').val(),
     sesion_id: $(e.target).find('[name=sesion]').val(),  
    // time_sesion: timeSesion 
    };

	
// 	//console.log(grup);

    if(grup.sesion_id != -1)
      Meteor.call('grupoInsert', grup, function(error, result) //se define un metodo para insertar
      {      
        if (error)
          return console.log(error.reason);
       
         bootbox.alert("Carga Exitosa", function() { 
              $('#gr').val('');
              $('#descripcion').val('');
              $('#sesion').val('');
              // $('#fecha1').val('');
              // $('#fecha2').val('');

              Router.go('grupoSubmit', {});
        });
      });  
    else
      bootbox.alert("Seleccione la Temática", function() { 
              Router.go('grupoSubmit', {});
        });

  }

 });


Template.grupoSubmit.helpers({ 

  get_sesiones: function() {
    return Tematica.find({}, {sort: {submitted: -1}});	
  },

  get_sesiones2: function() {
     var tematicaid = Session.get('tematicaId');
    return Sesion.find({tematica_id: tematicaid, estado:"activa"}, {});  
    //return Sesion.find({}, {sort: {submitted: -1}});  
  },

//   /*dateAct: function() {
//      var today = new Date();
//     var dd = today.getDate();
//     var mm = today.getMonth()+1; //January is 0!

//     var yyyy = today.getFullYear();
//     if(dd<10){
//         dd='0'+dd
//     } 
//     if(mm<10){
//         mm='0'+mm
//     } 
//     var today = dd+'/'+mm+'/'+yyyy;
//     //alert(today);
//     return  today;
//   }*/
  
 });