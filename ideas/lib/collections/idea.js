Ideas = new Mongo.Collection('ideas');


IdeasSchema=new SimpleSchema
({
  messageBox: { 
        type: String,
        label: "La idea",
      },
  idgrupo:{
    type: Number,
    label: "Id del grupo",
  },
  iduser:{
    type: Number,
    label:"Id usuario",
  },

});

Meteor.methods
({
  ideasInsert: function(ideasAttributes) //se verifica q el ususario este autenticado
    {
      check(Meteor.userId(), String);
      check(ideasAttributes, 
      {
        messageBox: String,
       idgrupo: String,
       iduser: String,
       compartir: String,        
      });
      var arre1 = {
        'cantA':0,
        'cantD':0,
        'cantR':0,
        'resultado':''
      };

      var arre2 = {
        'cantA':0,
        'cantR':0,
        'resultado':''
      };

      var arre3 = {
        'cant':0,
        'compartir':0
      };
     
      var user = Meteor.user();
      var ideas = _.extend(ideasAttributes,
       {
          votacionI2: arre1,
          votacionI4: arre2,
          author: user.username,
          submitted: new Date(),        
          estado: 'activa',
          compartir:arre3,
       }); 

      // console.log(ideas);     
      var ideasId = Ideas.insert(ideas);
      return
       {
        _id: ideasId
       };
    }
});

//-----------------------------------------------------------------
Ideas.allow({
  //insert: function (userId) {
    // controlar que el usuario pertenezca a ese grupo.
	//y controlar que no se haya vencido el tiempo para intruducir ideas.
    //return post.createdBy === userId;
    //console.log(Session.get('idgrupo'));
	//return true;
  //},
  update: function(ideaId, data, fieldNames) {
    // may only edit the following two fields:
    //return (_.without(fieldNames, 'compartido').length > 0);
	return true;
	//data.compartido!='';
  //data.compartido.length == 2			
  },
  /*remove: function (userId, post) {
    // can only delete your own posts
    return post.createdBy === userId;
  }
  // since there is no update field, all updates
  // are automatically denied*/
 });
