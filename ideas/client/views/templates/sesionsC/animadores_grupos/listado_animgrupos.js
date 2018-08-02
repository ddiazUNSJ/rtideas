Template.list_animGrupos.rendered = function()
{ 
    $('[name="perfil"').select2();

    $('#sesion').select2();
    $('.select2-container').css('min-width','50%');
    $('.select2-container').css('width','auto');

    Session.set('sesionId', 0);
}

Template.list_animGrupos.onCreated(function(){
   this.dataState = new ReactiveVar();
   this.dataState.set(0);
});

Template.list_animGrupos.helpers({ 


  /*selector() {
    var idsesion =  Session.get('sesionId');

    if(idsesion){
      var animadores = Animadores.find();
      var idusers = animadores.map(function(p) { return p.iduser });

      if(animadores)
        return {_id: {$in: idusers}};
      else return {_id: -1};
    }
    else
      return {_id: -1};
  },*/

  selector() {
    return {idsesion: Template.instance().dataState.get() };
  },

  get_sesiones: function() {
    return Sesion.find({}, {sort: {fecha1: 1, hora1: 1}});  
  },

  get_tematica_name: function() {    
    var data = Tematica.findOne({_id:this.tematica_id});  
    return data.SC;
  },

});


Template.list_animGrupos.events({

  
  'change #sesion': function(e,t){

    var idsesion = $(e.target).find('option:selected').val();
    if(idsesion != -1)
    {
      num = 1;
      Session.set('sesionId', idsesion);
      t.dataState.set(Session.get('sesionId')); //variable de sesion para el datatable
    }
    else {Session.set('sesionId', 0);
         t.dataState.set(Session.get('sesionId'));
    }
  },


 });