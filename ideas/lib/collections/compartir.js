Compartir = new Mongo.Collection('compartir');


Meteor.methods
({
  compartirGInsert: function(CGAttributes) //se verifica q el ususario este autenticado
    {
      check(Meteor.userId(), String);
      
	 //for(var i=0; i < (CGAttributes.length) ; i++)
	   check(CGAttributes, [String]);

      
      var user = Meteor.user();
      /*var data = _.extend(CGAttributes,
       {
          author: user.username,
          submitted: new Date(),        
          estado: 'activa'
       });*/
	   
	   var data = 
       {
          gruposIds: [CGAttributes],
		  author: user.username,
          submitted: new Date(),        
          estado: 'activa'
       };
      
      var CGId = Compartir.insert(data);
      return
       {
        _id: CGId
       };
    }
});