//DD 26/08/2017
//usuarios de la Sesion de Creatvidad

Users_sesions = new Mongo.Collection('users_sesions');

Users_sesionsSchema = new SimpleSchema({
  iduser: {
        type: String,
        label: "userId insert",
      },
  idsesion: {
        type: String,
        label: "idsesion insert",
      },
      
  idgrupo: {
        type: [String],
        label: "grupo",  
    },
  rol: {
        type: String,
        label: "rol",  
    },  
  author: { //persona quien gestiona inscripcion
        type: String,
        label: "idUser",
      },
  submitted: {
        type: Date,
        label: "fechayhora",
       },
  
});


Users_sesionsSchemaBasic=new SimpleSchema({
  userId:{
        type: String,
        label: "userId",
      },
  sesionId: {
        type: String,
        label: "sesionId",
      },
  grupoId: {
      type:  String,
      label: "grupoIds",
    },
})


Users_sesionsSchemaBasic_anim=new SimpleSchema({
 
  idsesion: {
        type: String,
        label: "sesionId",
      },
  /*grupoIds: {
      type:  [String],
      label: "Grupos: ",
    },*/
   idusers:{
        type: [String],
        label: "userId basic",
      },
})

Users_sesionsSchemaBasic_anim_grupos=new SimpleSchema({
 
  idsesion: {
        type: String,
        label: "sesionId",
      },
  grupoIds: {
      type:  [String],
      label: "Grupos: ",
    },
  iduser:{
        type: String,
        label: "userId basic",
      },
})


Users_sesions.attachSchema(Users_sesionsSchema);
//Users_sesions.attachSchema(Users_sesionsSchemaBasic_anim_grupos_form);


if (Meteor.isServer)
{
  Meteor.methods({
    
    //Determina si el actual usuario es animador
    // Se utiliza para 
    isAnimadorUserSesion:function(sesionId){
        check(sesionId,String);
        // Verifica Identidad 
        if (!this.userId) {
            throw new Meteor.Error('Acceso invalido',
              'Ustede no esta logeado');
          }
      var usuarioEnUserSesion=Users_sesions.findOne({iduser: this.userId},idsesion:sesionId);
      if (usuarioEnUserSesion.rol==="Animador"){
        return true;
        }
      else{
        return false;
      }
    },
  
   /*agregarAnimadorSesion:function(datos){
     
     check(datos, datosPartici);
     console.log("datos en agregarAnimadorSesion:",datos);
     var usuario, nombreU, rolU;
    
      if (!this.userId) {
          throw new Meteor.Error('Acceso invalido',
            'Ustede no esta logeado');
        }
      else // verifica si tiene privilegios de administrador
       { 
        usuario= Meteor.users.findOne({_id: this.userId});
        
        rolU=usuario.rol;
        if  (rolU!="Administrador") 
        {
            console.log("error no es administrador");
            throw new Meteor.Error('Acceso invalido',
            ' Para acceder a esta funcionalidad necesita ser Administrador');
        }
       }
      
      // Verifica que no tenga un pedido de inscripcion para la sesion que pretende ser animador
       var usuarioEnUserSesion=Inscripcion.findOne({userId: datos.userId,sesion:datos.sesionId});
        if (usuarioEnUserSesion){
          console.log("error el animador no puede tener un pedido de inscripcion a la sesion que intenta animar");
            throw new Meteor.Error('Acceso invalido',
            ' Animador solicito antes ser Participante');
          }
        

     // //Habilitado para registrar animador
     nombreU=Meteor.users.findOne({_id: datos.userId}).profile.nombre;
     // //El participante ya esta acentado en user-sesion 
     var estaEnUserSesion=Users_sesions.findOne( {iduser:datos.userId, idsesion: datos.sesionId} ); 
     if  (estaEnUserSesion){
         return estaEnUserSesion;
      }
     // //No esta registrado , creamos participante en usersesion 
     else
     {
      var animadorSesionNuevo={iduser: datos.userId,
                     idsesion:datos.sesionId,
                     idgrupo:"notiene",
                     rol:"Animador",
                     nombre:nombreU,
                     author:this.userId,
                     submitted:new Date(),
                           };

      check(animadorSesionNuevo,Users_sesionsSchema);
      var animadorSesionAgregado=Users_sesions.insert(animadorSesionNuevo);
     
          
      }
    
    },*/


    //--------------
  InsertUserSesion:function(datos){
      check(datos,Users_sesionsSchemaBasic);

      var usuario, nombreU, rolU;

      if (!this.userId) {
          throw new Meteor.Error('Acceso invalido',
            'Usted no esta logeado');
      }
      else // verifica si tiene privilegios de administrador
      { 
          usuario= Meteor.users.findOne({_id: this.userId});
          
          rolU=usuario.rol;
          if  (rolU!="Administrador") 
          {
              console.log("error no es administrador");
              throw new Meteor.Error('Acceso invalido',
              ' Para acceder a esta funcionalidad necesita ser Administrador');
          }
      }
      
    var userId = datos.userId;
    var sesionId = datos.sesionId;

    //var usu = Meteor.users.findOne({_id: datos.userId});
    var estainscrito = Inscripcion.findOne({user_id: userId, sesion_id: sesionId});
   

    if(estainscrito){

        
       var estaEnUserSesion=Users_sesions.findOne( {iduser:userId, idsesion: sesionId} ); 
       if  (estaEnUserSesion){ //El participante ya esta acentado en user-sesion
            
            if(estaEnUserSesion.rol === 'Animador'){
              console.log("error el participante no puede tener un pedido de animador a la sesion");
              throw new Meteor.Error('Acceso invalido',
              ' Participante solicito antes ser Animador');
            }
            else
              var srId = Users_sesions.remove({iduser:datos.userId, idsesion: datos.sesionId});
        }
       else // No esta registrado , creamos participante en usersesion 
       {  
        var grupos = new Array();
        grupos[0]= datos.grupoId;


        var participanteNuevo={
            iduser: userId,
            idsesion: sesionId,
            idgrupo: grupos,
            rol: 'Participante',
            author:this.userId,
            submitted:new Date(),
        };

        check(participanteNuevo,Users_sesionsSchema);
        var participanteAgregado=Users_sesions.insert(participanteNuevo);

        // Actualizar coleccion de inscriptos
        //Inscripcion.update( {_id:datos.inscriId}, { $set: { estadoInscripcio: 'aceptado' } } );
           
        }
    }
    else
       throw new Meteor.Error('Acceso invalido','Solo inscriptos');

  },


  UpdateGrupo_usersesion: function(datos) 
  {
    check(datos,Users_sesionsSchemaBasic);

   
    if (!this.userId) {
          throw new Meteor.Error('Acceso invalido',
            'Usted no esta logeado');
      }
      else // verifica si tiene privilegios de administrador
      { 
          usuario= Meteor.users.findOne({_id: this.userId});
          
          rolU=usuario.rol;
          if  (rolU!="Administrador") 
          {
              console.log("error no es administrador");
              throw new Meteor.Error('Acceso invalido',
              ' Para acceder a esta funcionalidad necesita ser Administrador');
          }
      }
    
    //var user = Meteor.user();
     //var rolusu = Meteor.users.findOne({_id: datos.userId}).rol;

    var userId = datos.userId;
    var sesionId = datos.sesionId;
    var grupoId = datos.grupoId;


    var estainscrito = Inscripcion.findOne({user_id: userId, sesion_id: sesionId});
   
    if(estainscrito){

         var estaEnUserSesion=Users_sesions.findOne( {iduser:userId, idsesion: sesionId} ); 
         if (estaEnUserSesion){ //El participante ya esta acentado en user-sesion

            if(estaEnUserSesion.rol === 'Animador'){
              console.log("error el participante no puede tener un pedido de animador a la sesion");
              throw new Meteor.Error('Acceso invalido',
              ' Participante solicito antes ser Animador');
              return false;
            }
            else{
               var valor = new Array();
                if(grupoId!=-1)
                    valor[0] = grupoId;

                Users_sesions.update({idsesion: sesionId, iduser:userId },{$set:{idgrupo: valor }});

                return true;
            }

        }
         else return false;
    }
    else
       throw new Meteor.Error('Acceso invalido','Solo inscriptos');
     
  },


  UpdateGrupos_usersesion_anim: function(datos) 
  {
    check(datos,Users_sesionsSchemaBasic_anim_grupos);

   
    if (!this.userId) {
          throw new Meteor.Error('Acceso invalido',
            'Usted no esta logeado');
      }
      else // verifica si tiene privilegios de administrador
      { 
          usuario= Meteor.users.findOne({_id: this.userId});
          
          rolU=usuario.rol;
          if  (rolU!="Administrador") 
          {
              console.log("error no es administrador");
              throw new Meteor.Error('Acceso invalido',
              ' Para acceder a esta funcionalidad necesita ser Administrador');
          }
      }
    
    //var user = Meteor.user();

    var iduser = datos.iduser;
    var idsesion = datos.idsesion;
    var grupoIds = datos.grupoIds;

    var usersession = Users_sesions.findOne({iduser: iduser, idsesion:idsesion});

    if  (usersession){

        if(usersession.rol=='Animador'){
          
            var valor = new Array();
            if(grupoIds!=-1)
               valor = grupoIds;

            Users_sesions.update({idsesion:idsesion , iduser:iduser },{$set:{idgrupo: valor }});

            return true;
          }
        else {
            throw new Meteor.Error('Acceso invalido',
                    ' Solo Animador');
        }
    }
    else{
          throw new Meteor.Error('Acceso invalido',
                    'No existe registro');
      }
     
  },


  InsertUserSesion_anim:function(datos){
      //console.log(datos);
      check(datos,Users_sesionsSchemaBasic_anim);

      var usuario, nombreU, rolU;

      if (!this.userId) {
          throw new Meteor.Error('Acceso invalido',
            'Usted no esta logeado');
      }
      else // verifica si tiene privilegios de administrador
      { 
          usuario= Meteor.users.findOne({_id: this.userId});
          
          rolU=usuario.rol;
          if  (rolU!="Administrador") 
          {
              console.log("error no es administrador");
              throw new Meteor.Error('Acceso invalido',
              ' Para acceder a esta funcionalidad necesita ser Administrador');
          }
      }


    var sesionId = datos.idsesion;
    Users_sesions.remove({idsesion: sesionId, rol:'Animador'});

    for (var i = 0; i < datos.idusers.length; i++) {    

      var userId = datos.idusers[i];
     
       //nombreU=Meteor.users.findOne({_id: datos.userId}).profile.nombre;
      var rolusu = Meteor.users.findOne({_id: userId}).rol;
      var animadorData = Animadores.findOne({iduser: userId});


     // if(rolusu == 'Animador'){
         // Verifica que no tenga un pedido de inscripcion para la sesion que pretende ser animador
          var usuarioEnInsc=Inscripcion.findOne({user_id: userId,sesion_id:sesionId});
          if (usuarioEnInsc){
            console.log("error el animador no puede tener un pedido de inscripcion a la sesion que intenta animar");
              throw new Meteor.Error('Acceso invalido',
              ' Animador solicito antes ser Participante');
            }
            //UPDATE ROL!
      //}
      /*else
          if(rolusu == 'Participante'){          
              var usuarioEnAnimSesion = AnimSesion.findOne({idusers: datos.userId,idsesion: datos.sesionId});
              if (usuarioEnAnimSesion){
                console.log("error el participante no puede tener un pedido de animador a la sesion");
                  throw new Meteor.Error('Acceso invalido',
                  ' Animador solicito antes ser Participante');
                }
          }*/


      //if(rolusu == 'Animador'){
      if(animadorData){
         //El participante ya esta acentado en user_sesion 
        var estaEnUserSesion = Users_sesions.findOne( {iduser:userId, idsesion: sesionId} ); 
        if  (estaEnUserSesion){
              //var valor = datos.grupoIds;
              //Users_sesions.update({idsesion: datos.sesionId, iduser:datos.userId },{$set:{idgrupo: valor }});
        }
        else
        {  
            var grupos = new Array();
            //grupos= datos.grupoIds;

            var animadorNuevo={
                iduser: userId,
                idsesion: sesionId,
                idgrupo: grupos,
                rol: 'Animador',
                author:this.userId,
                submitted:new Date(),
            };

            console.log(animadorNuevo);

            check(animadorNuevo,Users_sesionsSchema);
            result=Users_sesions.insert(animadorNuevo);
        }
      }
      else{
          console.log(' Solo Animador');
            throw new Meteor.Error('Acceso invalido',
                  ' Solo Animador');
          }
    }

    return result;
  },


  //31/08/2017
  // Lo que Estaba--------------------
  /*participantesAlGrupo: function(IAttributes) //se verifica q el ususario este autenticado
  {
    check(Meteor.userId(), String);
   
    check(IAttributes, Match.Where(function(IAttributes){
        _.each(IAttributes, function (doc) {
          // do your checks and return false if there is a problem 
        });
        // return true if there is no problem
        return true;
    }));
    
    var user = Meteor.user();

    var inscriptos=IAttributes.inscriptos;
    var idgrupo=IAttributes.idgrupo;
    var idsesion=IAttributes.idsesion;

    Users_sesions.update( {idgrupo:idgrupo, rol:'Participante'}, {$set:{idgrupo: ''}}, {multi: true} );



    if(IAttributes.inscriptos)  
      for (var i = 0; i < inscriptos.length; i++)
      {
      
        Users_sesions.update({idsesion:idsesion, iduser:inscriptos[i] },{$set:{idgrupo: idgrupo }});
    
      }

    return {
        _id: true
      };
  },*/

  /*gruposAlAnimador: function(IAttributes) //se verifica q el ususario este autenticado
  {
    check(Meteor.userId(), String);
   
    check(IAttributes, Match.Where(function(IAttributes){
        _.each(IAttributes, function (doc) {
          // do your checks and return false if there is a problem 
        });
        // return true if there is no problem
        return true;
    }));
    
    var user = Meteor.user();

    var grupos=IAttributes.grupos;
    var idanimador=IAttributes.animador;
    var idsesion=IAttributes.sesion;

   
    Users_sesions.update( {idsesion:idsesion, iduser:idanimador, rol:'Animador'}, {$set:{idgrupo: grupos}} );

    return {
        _id: true
      };
  },*/

  /*InsertUserSesion copia: function(grAttributes) //se verifica q el ususario este autenticado
  {
    check(Meteor.userId(), String);
   
    check(grAttributes, Match.Where(function(grAttributes){
        _.each(grAttributes, function (doc) {          
        });
        return true;
    }));      
  
    var user = Meteor.user();
    var datos = _.extend(grAttributes,
    {
      idgrupo:"",
      userId: user._id,
      author: user.username,
      submitted: new Date(),  
    });   
    
    var result = Users_sesions.findOne( {iduser:datos.iduser, idsesion: datos.idsesion} ); 
    
    if(result)
        var grId = Users_sesions.remove({iduser:datos.iduser, idsesion: datos.idsesion});
    else  
        var grId = Users_sesions.insert(datos);

    return {
      _id: grId
    };
  }*/

});

} //fin if (Meteor.isServer)
