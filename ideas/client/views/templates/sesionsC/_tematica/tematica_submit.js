Template.tematicaSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var scre = {
      SC: $(e.target).find('[name=SC]').val(),
      Des: $(e.target).find('[name=Des]').val()
    };


    Meteor.call('tematicaInsert', scre, function(error, result) {
      // display the error to the user and abort
      if (error)
        return alert(error.reason);

      bootbox.alert("Carga Exitosa", function() { 
            $(e.target).find('[name=SC]').val('');
            $(e.target).find('[name=Des]').val('');
            Router.go('tematicaSubmit', {});
      });
      
    });

   }
});