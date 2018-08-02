

Template.modalesGruposComp.helpers({ 

  grupos_Opts() { 
    var idsesion =  Session.get('sesionId');
  
    data = Grupo.find({sesion_id: idsesion}, {sort: {gr: 1}});  

    var options=new Array();
    data.forEach( function(myDoc) 
    {
        var aux = { 'value':myDoc._id, 'label':myDoc.gr };
        options.push(aux);  
    });

    return options;
  },



});

Template.modalesGruposComp.events ({

   //submit alta grupo
  'submit #altacompGrupos': function(e)
  {
    if( e.target.checkValidity() )
    {       
        var sesionid = $(e.target).find('[name=sesion_id]').val();
        var gruposId = $(e.target).find('[name=gruposIds]').val();

    
      if( (gruposId) && (sesionid!=0) )
      {  
        var datos = {
          sesion_id: sesionid,
          gruposIds: gruposId
        };

        Meteor.call('compartirGInsert', datos, function(error, result) 
        {      
            if (error)
              return alert(error.reason);
            
            $('#modal_alta_gruposcomp').modal('hide');   
        }); 
      }
      //else alert("cero");

      }
  },

  
});