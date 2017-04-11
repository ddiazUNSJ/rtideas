logIdeas = new Mongo.Collection('logideas');

Meteor.methods
({

    //llevamos un historial de las modificaciones realizadas a una idea. 
    //una modificacion (update) de una idea implica un insert en logideas
    editIdea: function(ideasAttributes) 
    {
      check(Meteor.userId(), String);
      check(ideasAttributes, 
      {
        editar: String,
        ididea: String,
      });

      var ididea = ideasAttributes.ididea;
      var newidea = ideasAttributes.editar;

      var idea = Ideas.findOne( {_id: ididea} );    
      var oldidea = idea.messageBox;

      Ideas.update({_id : ididea },{$set:{messageBox : newidea }});


      var ideas = 
       {
          idea_id: ididea,
          idea_old: oldidea,
          idea_new: newidea,
          submitted: new Date()        
       };
      
      var logId = logIdeas.insert(ideas);
      return
       {
        _id: logId
       };
    }
});


//-----------------------------------------------------------------
