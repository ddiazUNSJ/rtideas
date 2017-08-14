import {toDataURL} from  '/client/utilidades/utilities.js';

Template.navigationinicio.rendered = function(){
  // Initialize metisMenu
     $('#side-menu').metisMenu();
 };

// Used only on OffCanvas layout
Template.navigationinicio.events({

    'click .close-canvas-menu' : function(){
        $('body').toggleClass("mini-navbar");
    }

});

Template.navigationinicio.onCreated(function () {
 
  Meteor.call('demeAvatarUrl', function (error, result){

   Session.set('avatarUrl', result);
  });

  Meteor.call('demeAvatarUrl',function (error, result){
    
    var dataUri;  
    if (result!=""){
      toDataURL(result, function(dataUri) {
        Session.set('avatarDataUri', dataUri); 
      //        console.log('Data:', dataUri)
      });
    }
    
    });

    Session.set('rol',"Administrador");

});

Template.navigationinicio.helpers({
  urlAvatar: function () {
    return Session.get('avatarUrl');
  },

  dataUriAvatar: function () {
    return Session.get('avatarDataUri');
  }

});


function getDataUri(url, callback) {
    var image = new Image();

    image.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
        canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size

        canvas.getContext('2d').drawImage(this, 0, 0);

        // Get raw image data
        callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));

        // ... or get as Data URI
        callback(canvas.toDataURL('image/png'));
    };

    image.src = url;
}



// Template.navigationinicio.rendered = function(){

//     // Initialize metisMenu
//     $('#side-menu').metisMenu();
   
//     

//  console.log(Session.get('avatarImg'));
// };

