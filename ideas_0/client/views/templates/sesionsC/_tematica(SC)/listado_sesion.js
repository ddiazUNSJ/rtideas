Template.list_sesion.helpers({ 

  Creatividad: function() {
    return Creatividad.find({}, {sort: {submitted: -1}}); 
  
  }
  
});


