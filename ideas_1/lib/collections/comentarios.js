Comentarios = new Mongo.Collection('comentarios');


Meteor.methods
({
 
comentInsert: function(grAttributes) //se verifica q el ususario este autenticado
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

    var grupo = Grupo.findOne( {_id: grAttributes.idgrupo} ); 
    var sesion = Sesion.findOne( {_id:  grupo.sesion_id} ); 
    var instancia = sesion.instActual;
	
    var user = Meteor.user();
    var comentario = _.extend(grAttributes,
    {
      instancia: instancia,
      userId: user._id,
      author: user.username,
      submitted: new Date(),
	   estado: 'activa',       
    });
	
   
      
    var cmId = Comentarios.insert(comentario);
    return {
      _id: cmId
    };
  }
});