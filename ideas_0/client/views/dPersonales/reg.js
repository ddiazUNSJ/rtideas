// import './Register2.html';
// import {Meteor} from 'meteor/meteor';
// import {Session} from 'meteor/session';
// import {Router, RouteController} from 'meteor/iron:router';
// /*****************************************************************************/
// /* Register2: Event Handlers and Helpersss .js*/
// /*****************************************************************************/
// Template.Register2.events({
//   /*
//    * Example:
//    *  'click .selector': function (e, tmpl) {
//    *
//    *  }
//    */
  
  
//   'submit form': function(event, template) {
//     event.preventDefault();
    
//     var inputName = $(event.target).find('#inputName').val().trim();
//     var inputPassword = $(event.target).find('#inputPassword').val().trim();
    
//      Accounts.createUser({username:inputName, password:inputPassword}, function(err){
//      if (err)
//      {
//        console.log(err);
//        Router.go('ErrorReg');
//       }
//      else
//        console.log('success!');
//        Session.set('userOk', true)
//     //    Router.go("Overlog");
     
//     //   var currentRoute = Router.current();
//     //     Session.set('errorl', true);
//     //    currentRoute.render('Errorlog');
//     //    currentRoute.next();
//      });
    
//   }  

// });

AutoForm.addHooks('actDatosUsu', {

onError: function(formType, error) {
  
    if ((error.errorType && error.errorType === 'Meteor.Error') &&(formType==="update")){
      swal(error.reason, error.message);
    }
  },


});


Template.Register2.helpers({
    dirFile: function () {
      avatarEs=Session.get('avatarUrl');
      console.log(avatarEs);
    return Session.get('avatarUrl');
  },
 

   firstName: function() {
    var user = Meteor.users.findOne(Meteor.userId());
      if (user) {
           console.log(user.profile.nombre);
           return user.profile.nombre;
      } else {
          console.log('No user with id', user);
          return "";
        }
    
  }



  
});

// /*****************************************************************************/
// /* Register2: Lifecycle Hooks */
// /*****************************************************************************/
Template.Register2.created = function () {
  Meteor.subscribe('datosUsuario');
};

// Template.Register2.rendered = function () {
// };

// Template.Register2.destroyed = function () {
// };
Template.Register2.events({

// 'click #irAAvatar': function(){

//     Router.go("subirfoto");
// 	},


});