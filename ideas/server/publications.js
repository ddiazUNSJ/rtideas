
//-------------------CODIGO SOLO PARA USUARIO COMUN--------------------------------


Meteor.publish('users_sesions', function() { //2 FILTROS 	

  var useractual=this.userId; 

  var datosUsu = Meteor.users.find({_id: useractual});

  datosUsu.forEach( function(myDoc) 
  {
     RolUsu = myDoc.rol; 
  });

  
  var Gactivos = Grupo.find({estado: 'activa'});
	 	
	//implementar rutina para actualizar estados de los grupos (activo -> vencido)
  
  var activosId = Gactivos.map(function(p) { return p._id });
  
  //var RolSesion = Gactivos.map(function(p) { return p.sesion_id });

  
  if(RolUsu == 'Animador')
  {  
    var sesionesAnim = Animador_sesion.find({user_id:useractual});
    
    var sesionesId = sesionesAnim.map(function(p) { return p.sesion_id });

    var GrupoRel = Grupo.find({sesion_id: {$in: sesionesId} });

    var SesionesRel = Sesion.find({_id: {$in: sesionesId} });

    //var grupoId = GrupoRel.map(function(p) { return p.idgrupo });
  }
  else
  {  
    if(RolUsu == 'Administrador')
      { 
        GrupoRel = Grupo.find({estado: 'activa'}); 
        SesionesRel = Sesion.find({estado: 'activa'});
      }
      else
      {
        var GrupoRel = Users_sesions.find({iduser:useractual, idgrupo: {$in: activosId} });
        grupoId = GrupoRel.map(function(p) { return p.idgrupo });
        GrupoRel = Grupo.find({_id: {$in: grupoId}});

        sesionesId = GrupoRel.map(function(p) { return p.sesion_id });
        var SesionesRel = Sesion.find({_id: {$in: sesionesId} });
      }
  }    
 //var rolId = GrupoRel.map(function(p) { return p.idrol });


 //publico todos los datos del usuario
  var usuarioD = Meteor.users.find({_id: useractual}); 
  
  return [
    GrupoRel,
    usuarioD,
    SesionesRel,
    //Grupo.find({_id: {$in: grupoId}}), //activos
	 //Roles.find({_id: {$in: rolId}}),
	  Tematica.find({ }) //estado:'activa',
  ];

});

//----------------

/*Meteor.publish('data_user', function() {
  var useractual=this.userId; 
  var data = Meteor.users.find({_id: useractual}); 
 return data;
});*/
//------------------------------------------------------------------------

/* **********Ficha de Idea************** */
Meteor.publish('ficha', function() {
  return  Ficha.find();      //publico todas

});

/* **********Tematica************** */
Meteor.publish('tematica', function() {
  return  Tematica.find();      //publico todas

});

/* **********Sesion de Creatividad************** */
Meteor.publish('sesionesCreatividad', function() {
  return  Sesion.find({estado:'activa'});      //publico las activas
});


/* **********GRUPOS************** */
Meteor.publish('grupos', function() {
  return  Grupo.find({estado:'activa'});      //publico todoS
});


Meteor.publish('users', function() {
return  Meteor.users.find();      //publico todoS
});

Meteor.publish('animadores', function() {
  //var rol = Roles.findOne({nombre: 'Animador' });
  //return Meteor.users.find({rol_id: rol._id}) //activos
  return Meteor.users.find({rol: 'Animador'}) //activos
});

Meteor.publish('animadores_sesion', function(sesionid) { //animadores de una sesion 
  check(sesionid, String);
  var animadores = Animador_sesion.find({ sesion_id:sesionid }); 
  var users = animadores.map(function(p) { return p.user_id }); 
  return [
   animadores,
    Meteor.users.find({_id: {$in: users}}, {sort: {username: 1}}) 
  ];
});

Meteor.publish('inscriptos', function(sesionid) {
    check(sesionid, String);

    //usuarios inscriptos a la sesion
    var inscriptos = Inscripcion.find({ sesion_id:sesionid });
    var users = inscriptos.map(function(p) { return p.user_id });

    //todos los grupos de la sesion
    var Grupos = Grupo.find({ sesion_id:sesionid });
    var GruposIds = Grupos.map(function(p) { return p._id });

    //usuarios ya asignados a algun grupo de la sesion
    var UserAsig = Users_sesions.find({ idgrupo: {$in: GruposIds} });
    var UserAsig = UserAsig.map(function(p) { return p.iduser });

    //no publico los usuarios que ya estan asignados a algun grupo
    var aux = Array();
    for (var i = 0; i < users.length; i++) {
      users[i];
      if( UserAsig.indexOf(users[i]) == -1)
        aux.push(users[i]);
    }

    return [
     Inscripcion.find({ user_id: {$in: aux} }),
      Meteor.users.find({_id: {$in: aux}, rol:'Participante'}, {sort: {username: 1}}) 
    ];  
});

Meteor.publish('rol', function() {
  return  Roles.find();      //publico todoS
});

Meteor.publish('compartir', function() {
  return  GruposComp.find();      //publico todoS
});

Meteor.publish('sesionCountdown', function() {
  return  SesionTime.find();      //publico todoS
});

Meteor.publish('instancias', function() {
  return  Instancia.find();      //publico todoS
});


// publico todas las ideas de un grupo en particular
Meteor.publish('ideas', function(grupoid) { 
  //var useractual=this.userId;   
  
  //var grupoid = 'YAbwJ9M7HbrC3dEd6';
  check(grupoid, String);
  var IdeasRel = Ideas.find({idgrupo:grupoid, estado: 'activa' });
  var usersId = IdeasRel.map(function(p) { return p.iduser });
  var ideasId = IdeasRel.map(function(p) { return p._id });
  return [
    IdeasRel,
    Meteor.users.find({_id: {$in: usersId}}),  //activos
    Comentarios.find({ididea: {$in: ideasId}, instancia:2})
  ];

});


Meteor.publish('votos_compartir', function(grupoid) { 
  var useractual=this.userId;   
  check(grupoid, String);
  
  return IdeasC.find({user_id:useractual, grupo_id:grupoid});
});



// publico todas los votos de un grupo en particular
/*Meteor.publish('votos', function(grupoid) { 
  
  check(grupoid, String);
  var IdeasRel = Ideas.find({idgrupo:grupoid, estado: 'activa' });
  var ideasId = IdeasRel.map(function(p) { return p._id });
  
  var arrevotos = Votos.find({id_idea: {$in: ideasId}}); 

  return [
    arrevotos
  ];

});*/



// publico todos los grupos compartidos con este
Meteor.publish('gruposComp', function(grupoid) { 
  //var useractual=this.userId;   
  
  //var grupoid = 'YAbwJ9M7HbrC3dEd6';
  console.log(grupoid);
  check(grupoid, String);
  //console.log(grupoid);

  var grupo = Grupo.findOne( {_id: grupoid} ); 
  //var sesion = Sesion.findOne( {_id:  grupo.sesion_id} ); 
  var grupC = GruposComp.findOne({sesion_id: grupo.sesion_id});
  

  if(grupC)
    grupC = grupC.gruposIds;
  else grupC = 0;

  //console.log(grupC);
	
  
  var IdeasComp = Ideas.find({idgrupo: {$in: grupC} }); 

  var todos=Array();

  IdeasComp.forEach( function(myDoc) 
  {
      if( myDoc.compartir.compartir == 1 )  
        todos.push( myDoc._id  );  

      //console.log(myDoc);
  });
  //console.log(todos);
  IdeasComp = Ideas.find({_id: {$in: todos} });
   
  //console.log(IdeasComp);

  var usersId = IdeasComp.map(function(p) { return p.iduser });

  //var idsGrupos = IdeasComp.map(function(p) { return p.idgrupo }); 
  var varGrupos = Grupo.find({_id: {$in: grupC} });

  var ideasId = IdeasComp.map(function(p) { return p._id });
  var coments = Comentarios.find({ididea: {$in: ideasId}, estado: 'activa',  instancia: 6}); 

  //console.log(idsGrupos);
  return [
    IdeasComp,
    varGrupos,
    coments,
    Meteor.users.find({_id: {$in: usersId}}), //activos
  ];
  
  //return arre;
  
});

// publico todas las ideas de los grupos compartidos
/*Meteor.publish('ideasComp', function(grupoid) { 
  //var useractual=this.userId;   
  
  //var grupoid = 'YAbwJ9M7HbrC3dEd6';
  check(grupoid, [String]);
  var IdeasComp = Ideas.find({idgrupo: {$in: grupoid}, compartido: 'si'});
  
  var usersId = IdeasComp.map(function(p) { return p.iduser });
  return [
    IdeasComp,
    Meteor.users.find({_id: {$in: usersId}}), //activos
  ];

});*/





