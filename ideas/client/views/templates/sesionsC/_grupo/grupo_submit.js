Template.grupoSubmit.rendered = function()
{
   //$("#sesion").select2();
   //$( "#tematica" ).select2();
   //$('#s2id_sesion').css('min-width','50%');
   //$('#s2id_tematica').css('min-width','50%');  

}

Template.grupoSubmit.events({

  'change #tematica': function(e,t){
        // do whatever.......
    var idtematica = $(e.target).find('option:selected').val();
   
    if(idtematica)
    {
      Session.set('tematicaId', idtematica); 
      //alert(  Session.get('tematicaId')  );     
      $('#sesion_id').attr('disabled',false);  
    }
    else     
      $('#sesion_id').attr('disabled',true);  
  },

  'submit form': function(e) {
    e.preventDefault();

    var grup = {
        gr: $(e.target).find('[name=gr]').val(),
        descripcion: $(e.target).find('[name=descripcion]').val(),
        sesion_id: $(e.target).find('[name=sesion_id]').val(),  
    };
	
 	  //console.log(grup);
   
    Meteor.call('grupoInsert', grup, function(error, result) //se define un metodo para insertar
    {      
      if (error)
        return console.log(error.reason);
     
      bootbox.alert("Carga Exitosa", function() {               
            $(e.target).find('[name=gr]').val(''),
            $(e.target).find('[name=descripcion]').val(''),
            $(e.target).find('[name=sesion_id]').val(''), 

            Router.go('grupoSubmit', {});
      });
    });      

  }

});


Template.grupoSubmit.helpers({ 

  /*get_tematicas: function() {
    return Tematica.find({}, {sort: {submitted: -1}});	
  },

  get_sesiones2: function() {
     var tematicaid = Session.get('tematicaId');
    return Sesion.find({tematica_id: tematicaid, estado:"activa"}, {});  
    //return Sesion.find({}, {sort: {submitted: -1}});  
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

  sesiones_Opts() {
    var tematicaid = Session.get('tematicaId');
     console.log(tematicaid);
    var data = Sesion.find({tematica_id: tematicaid}, {sort: {nombre: 1}});  
    var options=new Array();
    data.forEach( function(myDoc) 
    { console.log("name: "+myDoc.nombre);
        var aux = { 'value':myDoc._id, 'label':myDoc.nombre };
        options.push(aux);
    });

    console.log(options);
    //return  { placeholder: 'foo', tags: true };
    return options;
  },


  
 });