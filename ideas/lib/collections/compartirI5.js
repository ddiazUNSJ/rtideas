IdeasC = new Mongo.Collection('ideasComp'); //vptacion compartir


Meteor.methods
({
 
InsertVotI5: function(grAttributes) //se verifica q el ususario este autenticado
  {
    //console.log(gcomenrAttributes['time_sesion'][0]);

    check(Meteor.userId(), String);
   /* check(grAttributes, {
      descripcion: String,
      gr: String,
	  sesion_id: String,    
    });*/

    //con estas lineas chequea todo el arreglo, de la otra manera nos daba error. 
    //este caso difiere de los demas porque grAttributes trae un arreglo de objetos (time_sesion)
    check(grAttributes, Match.Where(function(grAttributes){
        _.each(grAttributes, function (doc) {
          // do your checks and return false if there is a problem 
        });
        // return true if there is no problem
        return true;
    }));
    //var voto = grAttributes.voto;
    var ideaId = grAttributes.idea_id;
    console.log(ideaId);
    var user = Meteor.user();
    var idea = Ideas.findOne( {_id:ideaId} );
    
    //console.log(idea.votacionI2[0].cantA);
   // console.log(idea.votacionI4.cantA);  
    //console.log(idea.votacionI4.cantR);  
    
    var idea = Ideas.findOne( {_id:ideaId} ); 

    //console.log(idea);
    
         
    var votacion = IdeasC.findOne( {user_id:user._id, idea_id:ideaId} ); 
    
    if(votacion)
    {
        if (votacion.comp==1)
        {  
           var res = 0;
           Ideas.update({_id : ideaId },{$set:{compartir: idea.compartir-1 }});
           
        }
        else
        {  
           var res = 1;
           Ideas.update({_id : ideaId },{$set:{compartir: idea.compartir+1 }}); 
        }
      

      IdeasC.update({_id : votacion._id },{$set:{comp : res }});    
        

       var vtId = votacion._id;
    }
    else
    {
        var aux = _.extend(grAttributes,
        {
          user_id: user._id,
          comp: 1,
          submitted: new Date(),
        });

        var vtId = IdeasC.insert(aux);
        
        //contar
        Ideas.update({_id : ideaId },{$set:{compartir: idea.compartir+1 }}); 
    }



    
 
    return {
      _id: vtId
    };
  }

});

//-----------------------------------------------------------------
IdeasC.allow({
  //insert: function (userId) {
    // controlar que el usuario pertenezca a ese grupo.
  //y controlar que no se haya vencido el tiempo para intruducir ideas.
    //return post.createdBy === userId;
    //console.log(Session.get('idgrupo'));
  //return true;
  //},
  /*update: function(ideaId, data, fieldNames) {
    // may only edit the following two fields:
    //return (_.without(fieldNames, 'compartido').length > 0);
  return true;
  //data.compartido!='';
      //data.compartido.length == 2
      
  },*/
  
 });