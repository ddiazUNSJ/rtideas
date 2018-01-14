VotacionI2 = new Mongo.Collection('votacionI2');

votosI2Schema=new SimpleSchema
({

  idea_id: { 
        type: String,
        label: "Id idea",
      },

  user_id: { //persona quien gestiona ABM animador
    type: String,
    label: "id User",
   },

  voto:{
    type:String,
    label:"voto",
  },

  submitted: {// fecha de alta animador
        type: Date,
        label: "fechayhora Creacion",
       },
});

votosI2BasicSchema=new SimpleSchema
({
  idea_id: { 
        type: String,
        label: "Id idea",
      },

  voto:{
    type:String,
    label:"voto",
  },
});

VotacionI2.attachSchema(votosI2Schema);
VotacionI2.attachSchema(votosI2BasicSchema);



function calculo_resultado(A,D,R){

  var total = A+D+R;

  var porcA = (A*100)/total;
  var porcD = (D*100)/total;
  var porcR = (R*100)/total;

  if(porcA > 50)
    return 'Aceptado';
  else
      if (porcR > 50)
        return 'Rechazado';
      else
        return 'Debate';
}


Meteor.methods
({
 
InsertVotI2: function(datos_votacionI2) //se verifica q el ususario este autenticado
  {
      check(datos_votacionI2,votosI2BasicSchema);
    //console.log(gcomenrAttributes['time_sesion'][0]);

      if (!this.userId) {
        throw new Meteor.Error('Acceso invalido',
        'Ustede no esta logeado');
      }


    var voto = datos_votacionI2.voto;
    var ideaId = datos_votacionI2.idea_id;
     // console.log(ideaId);
    var user = Meteor.user();

    var idea = Ideas.findOne( {_id:ideaId} ); 
    
    //console.log(idea.votacionI2[0].cantA);
    //console.log(idea.votacionI2.cantA);
    
    var A = idea.votacionI2.cantA;
    var D = idea.votacionI2.cantD ;
    var R = idea.votacionI2.cantR;
    var res = idea.votacionI2.resultado;
   
   
    
    var votacion = VotacionI2.findOne( {user_id:user._id, idea_id:ideaId} ); 
    if(votacion)
    {
       VotacionI2.update({_id : votacion._id },{$set:{voto : voto }});
       var vtId=votacion._id;

        var votoOld = votacion.voto;
        //resta
        switch(votoOld)
        {
          case 'A': A=A-1;
                    break;

          case 'D': D=D-1;
                    break;

          case 'R': R=R-1;
                    break;
        }
        
        //contar
        switch(voto)
        {
          case 'A': A=A+1;
                    break;

          case 'D': D=D+1;
                    break;

          case 'R': R=R+1;
                    break;
        }

    }
    else
    {
        var aux =
        {
          idea_id: ideaId,
          user_id: user._id,
          voto: voto,
          submitted: new Date(),
        };

        check(aux,votosI2Schema);
        var vtId = VotacionI2.insert(aux);
        //contar
         switch(voto)
        {
          case 'A': A=A+1;
                    break;

          case 'D': D=D+1;
                    break;

          case 'R': R=R+1;
                    break;
        }

    }


    res = calculo_resultado(A,D,R);

    //console.log(res);

     var arre1 = {
                      'cantA': A,
                      'cantD': D,
                      'cantR':R,
                      'resultado':res
                    };

      Ideas.update({_id : ideaId },{$set:{votacionI2: arre1 }});

    
    return {
      _id: vtId
    };
  }
});

//-----------------------------------------------------------------
VotacionI2.allow({
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