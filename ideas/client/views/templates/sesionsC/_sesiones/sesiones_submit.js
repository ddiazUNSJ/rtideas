Template.sesionSubmit.rendered = function()
{
    $(function () {
      //ver https://eonasdan.github.io/bootstrap-datetimepicker/
        
       $('#datetimepicker1').datetimepicker({format : "DD/MMM/YYYY HH:mm "});
       $('#datetimepicker2').datetimepicker({format : "DD/MMM/YYYY HH:mm "});  
       
       // $("#datetimepicker1").on("dp.change", function (e) {
       //          $('#datetimepicker2').data("DateTimePicker").minDate(e.date);
       //      });   
       $("#datetimepicker2").on("dp.change", function (e) {
                $('#datetimepicker1').data("DateTimePicker").maxDate(e.date);
            });


           
    });

    $('#fecha1').val("");

    $("#sesion").select2();
    //$('#s2id_sesion').css('min-width','50%');

    $("#animador").select2();
    //$('#s2id_animador').css('min-width','50%');

    $('.select2').css('min-width','50%');
}

Template.sesionSubmit.events({

  'submit form': function(e) {
    e.preventDefault();

  /* DD 10 /09/2017  configurando datapicker ya no es necesario
  sumar horaas
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
       
*/

        var inicioDate = new Date($(e.target).find('[name=fecha1]').val());
        var finDate=new Date( $(e.target).find('[name=fecha2]').val());
        var fecha1=inicioDate.toLocaleDateString("en-GB");
        var hora1=inicioDate.getHours();
        var fecha2=finDate.toLocaleDateString("en-GB");

        var hora2=finDate.getHours();
         // console.log("fecha1: "+ fecha1);
         // console.log("fecha2: "+ fecha2);


        var ses = {
    	    tematica_id: $(e.target).find('[name=sesion]').val(),  
    	    nombre: $(e.target).find('[name=nombre]').val(),  
          fecha1:fecha1,
          fecha2:fecha2,
          hora1:hora1,
          hora2:hora2,
        };

        var instancias = $(e.target).find('.numInst'); 
        console.log ("instancias: "+instancias);
        for (var i = 0; i < instancias.length; i++)
        {

            var id = $(instancias[i]).attr('id');
            var valor = $(instancias[i]).val();
           

            var arre = {
              [id]:valor,
             };

            //ses.push(arre);
            ses = _.extend(ses,
            {
              [id]: valor,
            });
        }
    	
      console.log(ses);

        if(ses.sesion_id != -1)
          Meteor.call('sesionInsert', ses, function(error, result) //se define un metodo para insertar
          {      
            if (error)
              return console.log(error.reason);
            else
              swal("Carga Exitosa");
              //if(animadores)
              // { 
              //     var datos = {
              //       sesion_id: result._id,
              //       animadores:animadores
              //     };

              //     Meteor.call('InsertAnimSesion', datos, function(error2, result2) 
              //     {      
              //         if (error2)
              //           return alert(error.reason);
              //         else
              //             bootbox.alert("Carga Exitosa", function() {

              //                   $("#sesion").select2();
              //                   //$('#s2id_sesion').css('min-width','50%');

              //                   $("#animador").select2();
              //                   //$('#s2id_animador').css('min-width','50%');
              //                   $('.select2').css('min-width','50%'); 
                                
              //                   $('#sesion').val('-1');
              //                   $('#animador').val('');
              //                   $('#fecha1').val('');
              //                   $('#fecha2').val('');
              //                   $('.numInst').val(1);
                                

              //                   Router.go('sesionSubmit', {});
              //             });
              //     }); 
                
              // }
          });  
        else
          bootbox.alert("Seleccione la Temática", function() { 
                  Router.go('sesionSubmit', {});
            });




      },

});


Template.sesionSubmit.helpers({ 


  get_tematicas: function() {
    return Tematica.find({}, {sort: {SC: 1}});	

  },

  /*get_animadores: function() {
    return Meteor.users.find({rol:'Animador'}, {sort: {username: 1}}); 
  },*/

  get_instancias: function() {
    return Instancia.find({}, {sort: {numero: 1}}); 
  },

 /*dateAct: function() {
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
  }*/
  
});

