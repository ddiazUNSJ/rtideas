Template.TmplModalCreateAnimador.helpers({

  /*usuarios_Opts() { 
   
    var users = Meteor.users.find({rol: 'Estandar'}, {sort: {username: 1}});

    var options=new Array();
    users.forEach( function(myDoc) 
    {
        var aux = { 'value':myDoc._id, 'label':myDoc.username };
        options.push(aux);  
    });

    return options;
  },*/

  get_usuarios() { 
   
    var users = Meteor.users.find({rol: 'Estandar'}, {sort: {username: 1}});
    return users;
  }, 
  
  
});



Template.TmplModalCreateAnimador.events ({
 'click .guardar': function(e)
  { 
   
  // e.preventDefault();

    var idusers = $('#agregaAnimadores').find('[name=idusers]').val();

    if( idusers )
    {      
      
          var data = {
              idusers: idusers,
          };      
         
          //console.log(data);
          Meteor.call('InsertAnim', data, function(error, result) //se define un metodo para insertar
          {      
            if(error)
              return console.log(error.reason);
           
            //bootbox.alert("Carga Exitosa", function() { 
              Router.go('adminAnima', {});
            //});
          }); 
      //}   

      $('#modal_inserta_animadores').modal('hide');
    }//else alert('NO VALIDA');
  },
  
});
