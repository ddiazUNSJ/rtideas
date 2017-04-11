Template.list_grupo.helpers({ 

  Grupo: function() {
    return Grupo.find({}, {sort: {submitted: -1}}); 
    }  
});


Template.item_grupo.helpers({ 
  
  sesionG: function() { 
    var data = Grupo.findOne({_id: this._id});	
	var sesion = Creatividad.findOne({_id: data.sesion_id});
	return sesion.SC;
	}
  
});


