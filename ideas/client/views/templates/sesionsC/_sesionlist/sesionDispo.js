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
 
  
});
 Template.sesionDispo.events
 ({
  

 });