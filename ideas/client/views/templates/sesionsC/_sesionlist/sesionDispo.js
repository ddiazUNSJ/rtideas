Template.sesionDispo.helpers({ 

 //el this corresponde a la coleccion usersesion y no a sesion
  sesionTodas: function() { 
    Meteor.subscribe('sesionesCreatividad'); 
    var sc= Sesion.find();
    //.map (function (doc){return doc;});
    return sc;
    

  },
  //el this corresponde a la coleccion usersesion y no a sesion
  dia_y_hora: function() { 
    var sesion = Sesion.findOne({_id: this._id});
    return sesion.fecha1 + ' ' +sesion.hora1;
  },
   nombre_sesion: function() { 
    var sesion = Sesion.findOne({_id: this._id});
    return sesion.nombre ;
  },

  
  tematicadelasesion: function(tematica_id) { 
  //  var sesion = Sesion.findOne({_id: sesionId});
   // var tematica = Tematica.findOne({_id: sesion.tematica_id});
        var tematica = Tematica.findOne({_id: this.tematica_id});

    return tematica.SC;
  },

  descripciondelatematica:function(){
   var tematica = Tematica.findOne({_id: this.tematica_id});
   return tematica.Des;
   },

  mostrame: function (){
    data= Sesion.findOne({_id:this._id});
    return data.nombre;
  },
 
   sid:function(){
    return this._id;
   },
   usuario_ID:function(){
    var usu=Meteor.userId();
    return usu;
   },
   
   // Inscripcion_ID:function(){
   //   Meteor.subscribe('inscripciones'); 
   //   var leyenda;
   //   var incluir;
   //  var inscriUsu=Inscripcion.findOne({sesion:this._id});
   //  if ((inscriUsu ==="")||(inscriUsu ===undefined)||(inscriUsu === null))
   //   {leyenda="No registrado";}
   //  else {leyenda="Registrado";}
   
   // },


    // Pregunta si el usuario esta como animador de la sesion a la que
    // intenta inscribirse
  

   
   incluirSesion:function(){
     
     // verifica si ya esta inscripto 
     var incluir=false;

     Meteor.subscribe('inscripciones'); 
     var inscriUsu=Inscripcion.findOne({sesion:this._id});
     if ((inscriUsu ==="")||(inscriUsu ===undefined)||(inscriUsu === null))
      {incluir= false;}
     else {incluir= true;}

     // verifica que el usuario no este como animador en la sesion
     Meteor.call('isAnimadorUserSesion', sesionId, function(error, result) //se define un metodo para insertar
        {      
          if (error)
            return alert(error.reason);
          else
              Session.set("isAnimatorS",result);
        });
     if (Session.get("isAnimatorS") ) { incluir=false} // NO lo incluya
     else {incluir=true } ; //incluyalo

     return incluir;

    
   }
});
 Template.sesionDispo.events
 ({
  

 });