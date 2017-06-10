IdeasC = new Mongo.Collection('ideasComp'); //vptacion compartir


function calculo_compartir(ideaId, grupoId){ 
    
    var cant_a_compartir = 3;

    var ideas = Ideas.find({idgrupo: grupoId}, { sort: {submitted: 1} });
    var todos=Array();

    ideas.forEach( function(myDoc) 
    {   
        if( (myDoc.votacionI2.resultado == 'Aceptado')  || (myDoc.votacionI4.resultado == 'Aceptado')  ) 
        {   
            var arre = {
              'idea': myDoc._id,
              'cant': myDoc.compartir.cant,
            }  
            todos.push(arre); 

            var aux = {
                'cant': myDoc.compartir.cant,
                'compartir': 0,
            };
            Ideas.update({_id : myDoc._id },{$set:{compartir: aux}}); 
            
        }
    });

    //ordeno por cantidad de votos
    todos.sort(function (a, b){
      return (b.cant - a.cant)
    })

    var lon = todos.length;
    if(lon >= cant_a_compartir)
      var cota = todos[cant_a_compartir-1].cant;
    else var cota =  todos[lon-1].cant; //cuando el areglo tiene menos componentes que "cant_a_compartir"

    if(cota > 0) //me aseguro que no traiga ideas con 0 votos
      var mayorigual=1;
    else 
      var mayorigual=0;


    /*console.log(todos);
    console.log('sub2');
    console.log(cota);

    console.log('recorre');*/
    var i=0; var corta1=0; var retornar=0;
    while(  (i < lon)  && (corta1==0) ) 
    { 
     
      if(mayorigual == 1 )
      {  if(todos[i].cant >= cota)
          corta1 = 0;
        else
           corta1 = 1;
      }
      else
      {
        if(todos[i].cant > cota)
          corta1 = 0;
        else
           corta1 = 1;
      }

      if(corta1==0)
      {  
        //console.log(todos[i]);
        var aux = {
            'cant': todos[i].cant,
            'compartir': 1,
        };
        Ideas.update({_id : todos[i].idea },{$set:{compartir: aux}}); 
      }
      
      /*if(todos[i].idea == ideaId) 
      {  
        retornar=1;
      }*/

      i++;
    }  

    //return retornar;
}


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
    var grupoId = grAttributes.grupo_id;
    //console.log(ideaId);
    var user = Meteor.user();
    var idea = Ideas.findOne( {_id:ideaId} );
    
    //console.log(idea.votacionI2[0].cantA);
   // console.log(idea.votacionI4.cantA);  
    //console.log(idea.votacionI4.cantR);  
     
         
    var votacion = IdeasC.findOne( {user_id:user._id, idea_id:ideaId} ); 
    
    if(votacion)
    {
        if (votacion.comp==1)
        {  
          var res = 0;
          var newCant = idea.compartir.cant - 1;
          var newResult = idea.compartir.compartir; 
        }
        else
        {  
          var res = 1;
          var newCant = idea.compartir.cant + 1;
          var newResult = idea.compartir.compartir;
        }
      
        IdeasC.update({_id : votacion._id },{$set:{comp : res }}); 

       //contar
        var aux = {
            'cant': newCant,
            'compartir': newResult,
        };
        Ideas.update({_id : ideaId },{$set:{compartir: aux}}); 

        calculo_compartir(ideaId, grupoId);
        /*var aux = {
                'cant':newCant,
                'compartir':resul
              };
        Ideas.update({_id : ideaId },{$set:{compartir: aux}});  */ 
   
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
        var newCant = idea.compartir.cant + 1;
        var newResult = idea.compartir.compartir;
        var aux = {
            'cant': newCant,
            'compartir': newResult,
        };
        Ideas.update({_id : ideaId },{$set:{compartir: aux}}); 

        calculo_compartir(ideaId, grupoId);
        /*var aux = {
                'cant':newCant,
                'compartir':res
              };
        Ideas.update({_id : ideaId },{$set:{compartir: aux}});*/
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