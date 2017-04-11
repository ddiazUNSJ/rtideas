VotacionI4 = new Mongo.Collection('votacionI4');

function calculo_resultado2(A,R)
 {
  var total = A+R;
  var porcA = (A*100)/total;  
  var porcR = (R*100)/total;

  if(porcA >= 50)
    return 'Aceptado';
  else      
        return 'Rechazado';     
 }

Meteor.methods
({
 
InsertVotI4: function(grAttributes) //se verifica q el ususario este autenticado
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
    var voto = grAttributes.voto;
    var ideaId = grAttributes.idea_id;
    //console.log(ideaId);
    var user = Meteor.user();
    var idea = Ideas.findOne( {_id:ideaId} );
    
    //console.log(idea.votacionI2[0].cantA);
   // console.log(idea.votacionI4.cantA);  
    //console.log(idea.votacionI4.cantR);  
    var A = idea.votacionI4.cantA;    
    var R = idea.votacionI4.cantR;
    var res = idea.votacionI4.resultado;
         
    var votacion = VotacionI4.findOne( {user_id:user._id, idea_id:ideaId} ); 
    // console.log(votacion);
    if(votacion)
    {
       VotacionI4.update({_id : votacion._id },{$set:{voto : voto }});
       var vtId=votacion._id;
       var votoOld = votacion.voto;
       //resta
       switch(votoOld)
        {
          case 'A': A=A-1;
                    break;
          case 'R': R=R-1;
                    break;
        }        
        //contar
        switch(voto)
        {
          case 'A': A=A+1;
                    break;
          case 'R': R=R+1;
                    break;
        }
    }
    else
    {
        var aux = _.extend(grAttributes,
        {
          user_id: user._id,
          submitted: new Date(),
        });
        var vtId = VotacionI4.insert(aux);
        //contar
         switch(voto)
        {
          case 'A': A=A+1;
                    break;        
          case 'R': R=R+1;
                    break;
        }
    }
    res = calculo_resultado2(A,R);

    //console.log(A +'--'+ R);

    //console.log(res);
    var arre2 = {
                      'cantA':A,                      
                      'cantR':R,
                      'resultado':res
                    };
    Ideas.update({_id : ideaId },{$set:{votacionI4: arre2 }}); 
    return {
      _id: vtId
    };
  }
});

//-----------------------------------------------------------------
VotacionI4.allow({
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
  remove: function (userId, voto) {
    // can only delete your own posts
    //console.log('---'+userId);
    return voto.userId === userId ;
  }
  // since there is no update field, all updates
  // are automatically denied*/
 });