VotacionI4 = new Mongo.Collection('votacionI4');

votosI4Schema=new SimpleSchema
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

votosI4BasicSchema=new SimpleSchema
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

VotacionI4.attachSchema(votosI4Schema);
VotacionI4.attachSchema(votosI4BasicSchema);


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
 
InsertVotI4: function(datos_votacionI4) //se verifica q el ususario este autenticado
{
    check(datos_votacionI4,votosI4BasicSchema);

    if (!this.userId) {
        throw new Meteor.Error('Acceso invalido',
        'Ustede no esta logeado');
    }

    var voto = datos_votacionI4.voto;
    var ideaId = datos_votacionI4.idea_id;
 
    var user = Meteor.user();
    var idea = Ideas.findOne( {_id:ideaId} );
    
   
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
       var aux =
        {
          idea_id: ideaId,
          user_id: user._id,
          voto: voto,
          submitted: new Date(),
        };

        check(aux,votosI4Schema);

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