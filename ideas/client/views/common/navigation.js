Template.navigation.rendered = function(){

    // Initialize metisMenu
    $('#side-menu').metisMenu();

     console.log( Meteor.user() );

     
     Meteor.call("getUserRol", function(err, salida){  
     if (salida=="Administrador")
     {
       Session.set('rol', "Administrador");
      
      }   
     
     });
};

// Used only on OffCanvas layout
Template.navigation.events({

    'click .close-canvas-menu' : function(){
        $('body').toggleClass("mini-navbar");
    }

});


Template.navigation.helpers({

  isAdmin: function() {
    	//var iduser = Meteor.userId();
    	
    	//var data = Meteor.users.findOne({_id: iduser});	
    //console.log("ROL: "+Session.get('rol'));

    console.log(Session.get('rol')==='Administrador');
		return Session.get('rol')==='Administrador';	

  },

 
  nombre:function(){
    var name="Desconocido"
    Meteor.call('getUserNombre', function (error, result){
     Session.set("nombreAmostrar",result);
    });
  
    return Session.get("nombreAmostrar");
  },

   dataUriAvatar: function () {
    return Session.get('avatarDataUri');
  },

  nombre:function(){
    var name="Desconocido"
    Meteor.call('getUserNombre', function (error, result){
     Session.set("nombreAmostrar",result);
    });
  
    return Session.get("nombreAmostrar");
  },
  
   dataUriAvatar: function () {
    return Session.get('avatarDataUri');
  }


});