Template.asignacion.rendered = function()
{
  
}

Template.creaSSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var scre = {
      SC: $(e.target).find('[name=SC]').val(),
      Des: $(e.target).find('[name=Des]').val()
    };


    Meteor.call('creatividadInsert', scre, function(error, result) {
      // display the error to the user and abort
     // if (error)
        //return alert(error.reason);
       bootbox.alert("LA CARGA FUE EXITOSA");  
        $("#SC").val('');   
         $("#Des").val('');  
      Router.go('creaSSubmit', {_id: result._id});
    });

   }
});