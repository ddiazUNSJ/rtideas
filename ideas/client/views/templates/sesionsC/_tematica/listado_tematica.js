Template.tematicaList.helpers({ 

  Tematica: function() {
    return Tematica.find({}, {sort: {submitted: -1}}); 
  
  }
  
});


