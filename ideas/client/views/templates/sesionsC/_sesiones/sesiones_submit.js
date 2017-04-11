Template.sesionSubmit.rendered = function()
{
    $(function () {
        $('#datetimepicker1').datetimepicker();
        $('#datetimepicker2').datetimepicker();               
    });

    $('#fecha1').val("");

   $("#sesion").select2();
   $('#s2id_sesion').css('min-width','50%');

    $("#animador").select2();
   $('#s2id_animador').css('min-width','50%');
}

Template.sesionSubmit.events({

  'submit form': function(e) {
    e.preventDefault();

  function summarHoras(inicio, fin)
  {  
        var arre, arre2 = new Array();
        arre = inicio.split(":");
        arre2 = fin.split(":");

        inicioMinutos = parseInt(arre[1]);
        inicioHoras = parseInt(arre[0]); 

        finMinutos = parseInt(arre2[1]);
        finHoras = parseInt(arre2[0]);

        transcurridoMinutos = finMinutos + inicioMinutos;
        transcurridoHoras = finHoras + inicioHoras;
        
        if (transcurridoMinutos >= 60) {
          transcurridoHoras++;
          transcurridoMinutos = transcurridoMinutos - 60;
        }

        if ( transcurridoHoras > 23 )
            transcurridoHoras = transcurridoHoras - 24;
        
        horas = transcurridoHoras.toString();
        minutos = transcurridoMinutos.toString();
        
        if (horas.length < 2) {
          horas = "0"+horas;
        }
        
        if (minutos.length < 2) {
          minutos = "0"+minutos;
        }
        
        return horas+":"+minutos;
  }
	

  var fecha1 = $(e.target).find('[name=fecha1]').val();
  var fecha2 = $(e.target).find('[name=fecha2]').val();
  var animadores = $(e.target).find('[name=animador]').val();

  var arre=Array();
   arre=fecha1.split(' ');
   fecha1 = arre[0];
   var hora1=arre[1];
   var ampm1=arre[2];
    if(ampm1 == 'PM')
    {//si es PM le sumo 12 horas, porque el plugins trabaja hasta 12 horas :)
         hora1 = summarHoras(hora1,'12:00');
    }


   var arre2=Array();
   arre2=fecha2.split(' ');
   fecha2 = arre2[0];
   var hora2=arre2[1];
   var ampm2=arre2[2];
    if(ampm2 == 'PM')
    {//si es PM le sumo 12 horas, porque el plugins trabaja hasta 12 horas :)
         hora2 = summarHoras(hora2,'12:00');
    }
   


     var ses = {
      
	     tematica_id: $(e.target).find('[name=sesion]').val(),  
	     //time_sesion: timeSesion 
       fecha1:fecha1,
       fecha2:fecha2,
       hora1:hora1,
       hora2:hora2,

       instancia1: $(e.target).find('[name=instancia1]').val(),  
       instancia2: $(e.target).find('[name=instancia2]').val()  

     };

	
  //console.log(ses);

    if(ses.sesion_id != -1)
      Meteor.call('sesionInsert', ses, function(error, result) //se define un metodo para insertar
      {      
        if (error)
          return console.log(error.reason);
        else
          if(animadores)
          { 
              var datos = {
                sesion_id: result._id,
                animadores:animadores
              };

              Meteor.call('InsertAnimSesion', datos, function(error2, result2) 
              {      
                  if (error2)
                    return alert(error.reason);
                  else
                      bootbox.alert("Carga Exitosa", function() {

                             $("#sesion").select2();
                             $('#s2id_sesion').css('min-width','50%');

                             $("#animador").select2();
                             $('#s2id_animador').css('min-width','50%'); 
                            
                            $('#sesion').val('-1');
                            $('#animador').val('-1');
                            $('#fecha1').val('');
                            $('#fecha2').val('');
                            $('#instancia1').val(0);
                            $('#instancia2').val(0);

                            Router.go('sesionSubmit', {});
                      });
              }); 
            
          }
      });  
    else
      bootbox.alert("Seleccione la Temática", function() { 
              Router.go('sesionSubmit', {});
        });




  }

});


Template.sesionSubmit.helpers({ 


  get_tematicas: function() {
    return Tematica.find({}, {sort: {SC: 1}});	

  },

  get_animadores: function() {
    return Meteor.users.find({}, {sort: {username: 1}}); 
  },

 dateAct: function() {
     var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 
    var today = dd+'/'+mm+'/'+yyyy;
    //alert(today);
    return  today;
  }
  
});