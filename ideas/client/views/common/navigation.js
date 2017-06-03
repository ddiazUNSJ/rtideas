Template.navigation.rendered = function(){

    // Initialize metisMenu
    $('#side-menu').metisMenu();

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
  
		return Session.get('rol')=='Administrador';	

  },

   isAnim: function() {  

        return Session.get('rol')=='Animador'; 
  },


});