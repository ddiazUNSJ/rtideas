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
   incluirSesion:function(){
     //var q2=Inscripcion.findOne({_id:"udBZd9o8PKPaBXtZQ"});
     Meteor.subscribe('inscripciones'); 
    
    var inscriUsu=Inscripcion.findOne({sesion:this._id});
   if ((inscriUsu ==="")||(inscriUsu ===undefined)||(inscriUsu === null))
     {return false;}
    else {return true;}

    
   }
});
 Template.sesionDispo.events
 ({
  

 });