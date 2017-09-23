// Template.rolSubmit.rendered = function()
// {
               
// }

// Template.rolSubmit.events({
//   'submit form': function(e) {
//     e.preventDefault();

//     var rol = {
//       nombre: $(e.target).find('[name=role]').val(),
//       descripcion: $(e.target).find('[name=descripcion]').val()
//     };

//     Meteor.call('rolInsert', rol, function(error, result) //se define un metodo para insertar
//      {      
//       if (error)
//         return alert(error.reason);

//       bootbox.alert("Carga Exitosa", function() { 
//             $('#role').val('');
//             $('#descripcion').val('');
//             Router.go('rolSubmit', {});
//       });
//     });   
//   }
// });