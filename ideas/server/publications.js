

Meteor.publish('users_sesions', function() { 

  var useractual=this.userId; 
  var datosUsu = Meteor.users.find({_id: useractual});

 //DD 11/08/17 cambiar no entiendo que se quiere hacer s
  // datosUsu.forEach( function(myDoc) 
  // {
  //    RolUsu = myDoc.rol; 
  // });
  var RolUsu=datosUsu.rol;

  
  var Gactivos = Grupo.find({estado: true});
	//implementar rutina para actualizar estados de los grupos (activo -> vencido)
  var activosId = Gactivos.map(function(p) { return p._id });

  
 if(RolUsu == 'Administrador')
  {
    var SesionUser = Users_sesions.find({iduser:useractual, idgrupo: {$in: activosId} }); 
  }
  else
    var SesionUser = Users_sesions.find({iduser:useractual, idgrupo: {$in: activosId} });
    
  var sesionesId = SesionUser.map(function(p) { return p.idsesion });
 
  var SesionesRel = Sesion.find({_id: {$in: sesionesId}, estado:  {$ne: 'Terminado'} });
  
 //publico todos los datos del usuario
  var usuarioD = Meteor.users.find({_id: useractual}); 
  
  return [
    //GruposRel,
    SesionUser,
    usuarioD,
    SesionesRel,
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
  return  Sesion.find({estado: {$ne: 'Terminado'}});      //publico las activas
});


/* **********GRUPOS************** */
Meteor.publish('grupos', function() {
  return  Grupo.find({estado:true});      //publico todoS
});


Meteor.publish('gruposUserEst', function(idsesion) {

  check(idsesion, String);

  var useractual=this.userId;

  var SesionUser = Users_sesions.findOne({iduser:useractual, idsesion:idsesion });


  if(SesionUser.rol == 'Participante')
     GruposRel = Grupo.find({_id: SesionUser.idgrupo }); 
  else //animador
     //GruposRel = Grupo.find({_id: SesionUser.idgrupo }); 
      GruposRel = Grupo.find({_id: {$in: SesionUser.idgrupo} }); 

  return GruposRel; 
});


Meteor.publish('users', function() {
return  Meteor.users.find();      //publico todoS
});


Meteor.publish('participantes_sesion', function(sesionid) {
    check(sesionid, String);

    //usuarios inscriptos a la sesion
    //var inscriptos = Users_sesions.find({ idsesion:sesionid });
    var inscriptos = Users_sesions.find({ idsesion:sesionid, rol:'Participante', idgrupo:'' });
    //DD 23708/2017
     //aplica la funcion a cada componente del cursor y lo devuelve en un array
     //ver https://docs.mongodb.com/manual/reference/method/cursor.map/#example
     // a continuacion extrae todos los id de los usuarios del cursor inscriptos y lo coloca en el arreglo users

    var users = inscriptos.map(function(p) { return p.iduser });

    /*//todos los grupos de la sesion
    var Grupos = Grupo.find({ sesion_id:sesionid });
    var GruposIds = Grupos.map(function(p) { return p._id });
    //usuarios ya asignados a algun grupo de la sesion
    var UserAsig = Users_sesions.find({ idgrupo: {$in: GruposIds} });
    var UserAsig = UserAsig.map(function(p) { return p.iduser });
    //no publico los usuarios que ya estan asignados a algun grupo
    var aux = Array();
    for (var i = 0; i < users.length; i++) {
      if( UserAsig.indexOf(users[i]) == -1)
        aux.push(users[i]);
    }*/
    
    return [
     //Users_sesions.find({ iduser: {$in: aux} }),
      inscriptos,
      Meteor.users.find({_id: {$in: users}, rol:'Estandar'}, {sort: {username: 1}}) 
    ];  
});

Meteor.publish('animadores_sesion', function(sesionid) {
    check(sesionid, String);

    //usuarios inscriptos a la sesion
    var animadores = Users_sesions.find({ idsesion:sesionid, rol:'Animador' });
    
    var users = animadores.map(function(p) { return p.iduser });
    
    return [
      animadores,
      Meteor.users.find({_id: {$in: users}, rol:'Estandar'}, {sort: {username: 1}}) 
    ];  
});

Meteor.publish('animadores_sesion2', function() {
  return  AnimSesion.find();      //publico todoS
});

Meteor.publish('rol', function() {
  return  Roles.find();      //publico todoS
});

Meteor.publish('subrol', function() {
  return  SubRoles.find();      //publico todoS
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

Meteor.publish('usersesion', function() {
  return  Users_sesions.find();      //publico todoS
});


// publico todas las ideas de un grupo en particular
Meteor.publish('ideas', function(grupoid) { 
  //var useractual=this.userId;   
  
  //var grupoid = 'YAbwJ9M7HbrC3dEd6';
  check(grupoid, String);

  var IdeasRel = Ideas.find({idgrupo:grupoid, estado: true });
  var usersId = IdeasRel.map(function(p) { return p.iduser });
  var ideasId = IdeasRel.map(function(p) { return p._id });
  return [
    IdeasRel,
    Meteor.users.find({_id: {$in: usersId}}),  //activos
    //Comentarios.find({ididea: {$in: ideasId}, instancia:2})
    Comentarios.find({ididea: {$in: ideasId}, estado: true })

  ];

});

Meteor.publish('votos_I2', function() { 
  var useractual=this.userId;   
  return VotacionI2.find({user_id:useractual});
});

Meteor.publish('votos_I4', function() { 
  var useractual=this.userId;   
  return VotacionI4.find({user_id:useractual});
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
  
  check(grupoid, String);

  var grupo = Grupo.findOne( {_id: grupoid} ); 
  //var sesion = Sesion.findOne( {_id:  grupo.sesion_id} ); 
  var grupC = GruposComp.findOne({sesion_id: grupo.sesion_id});
  
  console.log(grupC);
  if(grupC)
  {  
    grupC = grupC.gruposIds;
    var busq = grupC.indexOf(grupoid);
  }
  else {grupC = 0; busq = -1;}

  //los grupos que no estan en grupC no pueden ver las ideas compartidas
  
  if(busq == -1)
  { //console.log("ENTRA2");
    var IdeasComp = Ideas.find({idgrupo: grupoid });
  }
  else  
    var IdeasComp = Ideas.find({idgrupo: {$in: grupC} }); 

  var todos=Array();

  IdeasComp.forEach(function(myDoc) 
  {
      if( myDoc.compartir.compartir == true )  
        todos.push( myDoc._id  );  
  });


  
  IdeasComp = Ideas.find({_id: {$in: todos} });
  


  var usersId = IdeasComp.map(function(p) { return p.iduser });

  //var idsGrupos = IdeasComp.map(function(p) { return p.idgrupo }); 
  if(grupC)
    var varGrupos = Grupo.find({_id: {$in: grupC} });
  else 
    var varGrupos = Grupo.find({_id: grupoid });


  var ideasId = IdeasComp.map(function(p) { return p._id });
  //var coments = Comentarios.find({ididea: {$in: ideasId}, estado: true,  instancia: 6}); 

  //console.log(idsGrupos);
  return [
    IdeasComp,
    varGrupos,
    //coments,
    GruposComp.find({sesion_id: grupo.sesion_id}),
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


// DD 22/08/2017 Nuevas publicaciones para coleccion de inscripciones que valida por usuario comun o administrador

Meteor.publish('inscripciones', function() {
    if (!this.userId) {
      throw new Meteor.Error('Acceso invalido',
        'Usted no esta logeado');
      }

    var usuario= Meteor.users.findOne({_id: this.userId});
    nombre = usuario.profile.nombre;
 console.log(nombre+ " esta publicando los datos de sus inscripciones");
 // Ojo se publican todas las inscripciones del usuario, las activas y las no activas
 return Inscripcion.find({'userId': this.userId}, {fields:{_id:1,_nombre:1,userId:1,sesion:1,activa:1, estadoInscripcio:1, 
                                            estadoRazones:1,  grupo:1, nombreGrupo:1}});
});


// --- Publica todos los inscripciones, pero solo a los administradores

Meteor.publish('allInscripciones', function() {
    var usuario, nombre, rol;
    if (!this.userId) {
      throw new Meteor.Error('Acceso invalido',
        'Usted no esta logeado');
      }
    else // verifica si tiene privilegios de administrador
      { 
        usuario= Meteor.users.findOne({_id: this.userId});
        nombre = usuario.profile.nombre;
        rol=usuario.rol;
        if  (rol!="Administrador") 
        {
            console.log("error no es administrador");
            throw new Meteor.Error('Acceso invalido',
            ' Para acceder a esta funcionalidad necesita ser Administrador');
        }
       }
    console.log(nombre+ " esta publicando todos las inscripciones");
    return Inscripcion.find({}, {fields: { _id:1,_nombre:1,userId:1,sesion:1,activa:1, estadoInscripcio:1, 
                                            estadoRazones:1,  grupo:1, nombreGrupo:1}});

});

//DD 28/08/2017
//--- Publica todos la lista de animadores posibles pero al administrador


Meteor.publish('allAnimadores', function() {
    var usuario, nombre, rol;
    if (!this.userId) {
      throw new Meteor.Error('Acceso invalido',
        'Usted no esta logeado');
      }
    else // verifica si tiene privilegios de administrador
      { 
        usuario= Meteor.users.findOne({_id: this.userId});
        nombre = usuario.profile.nombre;
        rol=usuario.rol;
        if  (rol!="Administrador") 
        {
            console.log("error no es administrador");
            throw new Meteor.Error('Acceso invalido',
            ' Para acceder a esta funcionalidad necesita ser Administrador');
        }
       }

    return Meteor.users.find({rol:"Animador"});


});


//DD 31/08/2017
//--- publica todos los datos de user_sesion pero para determinada sesion
//--- usada al aceptar como participante de una sesion a un inscripto de esa sesion de creatividsa
Meteor.publish('sesion_de_userSesion', function(sesionCActual) { 

  check(sesionCActual,String);
   // Chequeos de Seguridad 
   var usuario, nombre, rol;
    if (!this.userId) {
      throw new Meteor.Error('Acceso invalido',
        'Usted no esta logeado');
      }
    else // verifica si tiene privilegios de administrador
      { 
        usuario= Meteor.users.findOne({_id: this.userId});
        nombre = usuario.profile.nombre;
        rol=usuario.rol;
        if  (rol!="Administrador") 
        {
            console.log("error no es administrador");
            throw new Meteor.Error('Acceso invalido',
            ' Para acceder a esta funcionalidad necesita ser Administrador');
        }
       }
    // Verifica si la sesion esta activa
    console.log("sesion en actual 'sesion_de_userSesion': "+sesionCActual);
       var sesion= Sesion.findOne({_id:sesionCActual})
       console.log("sesion en 'sesion_de_userSesion': "+sesion);
       var sesionEstado=sesion.estado;
       
      console.log("sesionEstado en 'sesion_de_userSesion': "+sesionEstado);
      
      if (sesionEstado!=true)
      {
          console.log("Error en publicacion sesion_de_userSesion,sesion no activa");
          throw new Meteor.Error('Acceso invalido',
          ' Esta intentando publicar usersesion de sesion no activa');
      }
     // Enviar datos de user_sesion para la sesion solicitada
     return Users_sesions.find({sesion:sesionCActual});

   

});



