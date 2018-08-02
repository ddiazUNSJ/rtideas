
Template.modalesAnimGrupos.rendered = function()
{ 
    
}



Template.modalesAnimGrupos.helpers({ 

  /*grupos_Opts() { 

    var idsesion =  Session.get('sesionId');
    var data = Grupo.find({sesion_id: idsesion}, {sort: {gr: 1}}); 
   
    var options=new Array();
    data.forEach( function(myDoc) 
    {
        var aux = { 'value':myDoc._id, 'label':myDoc.gr };
        options.push(aux);  
    });

    return options;
  },*/


  get_grupos: function() {
    var idsesion =  Session.get('sesionId');
    return Grupo.find({sesion_id: idsesion}, {sort: {gr: 1}});  
  },
  
});

Template.modalesAnimGrupos.events ({

  //'submit #asignaAnimGrupos': function(e)
  'click .guardar': function(e)
  {  //e.preventDefault();
    if( e.target.checkValidity() )
    {       
        var idsesion =  Session.get('sesionId');
        //console.log(e.target);

        var data = {
            iduser:$('#asignaAnimGrupos #iduser').val(),
            grupoIds:$('#asignaAnimGrupos #grupoIds').val(),
            idsesion: idsesion, 
        };      
       
        //console.log(data);
        Meteor.call('UpdateGrupos_usersesion_anim', data, function(error, result) //se define un metodo para insertar
        {      
          if(error)
            return console.log(error.reason);
         
          //bootbox.alert("Carga Exitosa", function() { 
            Router.go('list_animGrupos', {});
          //});
        });     

        $('#modal_asigna_grupos').modal('hide');
    }
  },

  
});