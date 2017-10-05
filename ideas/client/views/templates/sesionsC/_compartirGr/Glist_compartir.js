Template.GcompList.events
({

	
 });


Template.GcompList.helpers
({ 

  
    get_gruposComp: function() 
    {
        return Compartir.find({}, {sort: {submitted: 1}});	
	
     },
  
   get_grupos: function() 
    {
		var arre=new Array();
        for(var i=0; i < (this.gruposIds[0].length); i++)
         {
		 //arre.push(this.gruposIds[0][i]); 
		 var grupo=Grupo.findOne({_id: this.gruposIds[0][i]}, {});
		 arre.push( grupo.gr );
         } 
		 //console.log(arre);
		 return arre;
    }, 
  
});