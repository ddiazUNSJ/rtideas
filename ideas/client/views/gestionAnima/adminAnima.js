Template.adminAnima.helpers({

  
    selector:function(){
      return {active: true}
    },  


});

Template.adminAnima.events({

  'click #addanim': function(e)
  {
    e.preventDefault();
    
    //$('#altaSesion input').val('');

	$('#agregaAnimadores #idusers option').prop('selected',false);

    var data = Animadores.find();
	data.forEach( function(myDoc) 
	{	
		//var values = Array();
		var value = myDoc.iduser;
		
		//for (var i = 0; i < values.length; i++) {
			$('#agregaAnimadores #idusers option[value="'+value+'"]').prop('selected',true);
		//}
	});
    
    
    $('#modal_inserta_animadores').modal('show');
  },

 });



