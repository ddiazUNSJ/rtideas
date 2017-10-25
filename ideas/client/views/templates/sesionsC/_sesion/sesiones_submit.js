Template.sesionSubmit.rendered = function()
{
    $(function () {
        //$('#datetimepicker1').datetimepicker();
        //$('#datetimepicker2').datetimepicker();               
    });
      
}


 /*function summarHoras(inicio, fin)
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
  }*/

Template.sesionSubmit.events({

  'submit form': function(e) {

    e.preventDefault();


    var fecha1 = $(e.target).find('[name=fecha1]').val();
    var fecha2 = $(e.target).find('[name=fecha2]').val();
    

    var arre=Array();
    arre=fecha1.split(' ');
    fecha1 = arre[0];
    var hora1=arre[1];
    /*var ampm1=arre[2];
    if(ampm1 == 'PM')
    {//si es PM le sumo 12 horas, porque el plugins trabaja hasta 12 horas :)
        hora1 = summarHoras(hora1,'12:00');
    }*/


    var arre2=Array();
    arre2=fecha2.split(' ');
    fecha2 = arre2[0];
    var hora2=arre2[1];
    /*var ampm2=arre2[2];
    if(ampm2 == 'PM')
    {//si es PM le sumo 12 horas, porque el plugins trabaja hasta 12 horas :)
        hora2 = summarHoras(hora2,'12:00');
    }*/
     


    var ses = {
      tematica_id: $(e.target).find('[name=tematica_id]').val(),  
      nombre: $(e.target).find('[name=nombre]').val(),  
      fecha1:fecha1,
      fecha2:fecha2,
      hora1:hora1,
      hora2:hora2,
    };

    var instancias = $(e.target).find('.numInst'); 
    for (var i = 0; i < instancias.length; i++)
    {
      var id = $(instancias[i]).attr('id');
      var valor = parseInt( $(instancias[i]).val() );
     
      var arre = {
        [id]:valor,
      };

      //ses.push(arre);
      ses = _.extend(ses,
      {
        [id]: valor,
      });
    }
  	
    //console.log(ses);

    Meteor.call('sesionInsert', ses, function(error, result) //se define un metodo para insertar
    {      
      if (error)
          return console.log(error.reason);
      else
          bootbox.alert("Carga Exitosa", function() {
                $('#nombre').val('');               
                $('#tematica').val('');   
                $('#fecha1').val('');
                $('#fecha2').val('');
                $('.numInst').val(1);
                Router.go('sesionSubmit', {});
          });
        
    });

  }

});


Template.sesionSubmit.helpers({ 

  /*get_tematicas: function() {
    return Tematica.find({}, {sort: {SC: 1}});	
  },*/

  tematicas_Opts() {
    var data = Tematica.find({}, {sort: {SC: 1}});
    var options=new Array();
    data.forEach( function(myDoc) 
    {
        var aux = { 'value':myDoc._id, 'label':myDoc.SC };
        options.push(aux);  
    });

    return options;
  },

  get_instancias: function() {
    return Instancia.find({}, {sort: {numero: 1}}); 
  },

 
  
});