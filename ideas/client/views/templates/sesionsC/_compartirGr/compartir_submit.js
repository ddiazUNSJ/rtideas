Template.compartirSubmit.rendered = function()
{ 
    $('[name="perfil"').select2();

    $('#sesion').select2();
    $('.select2-container').css('min-width','50%');
    $('.select2-container').css('width','auto');

    //num = 1;
    Session.set('sesionId', 0);
    //userId = 0;
}

Template.compartirSubmit.onCreated(function(){
   this.dataState = new ReactiveVar();
   this.dataState.set(0);
});

Template.compartirSubmit.helpers({ 

  selector() {
    return {sesion_id: Template.instance().dataState.get()};
  },

  get_sesiones: function() {
    //return Sesion.find({estado:"activa"}, {});  
    return Sesion.find({}, {sort: {fecha1: 1, hora1: 1}});  
  },

  get_tematica_name: function() {    
    var data = Tematica.findOne({_id:this.tematica_id});  
    return data.SC;
  },
  
});

Template.compartirSubmit.events
({
	
  'change #sesion': function(e,t){
        // do whatever.......

    var idsesion = $(e.target).find('option:selected').val();
    if(idsesion != -1)
    {
      num = 1;
      Session.set('sesionId', idsesion);
      t.dataState.set(Session.get('sesionId')); //variable de sesion para el datatable
    }
    else {Session.set('sesionId', 0);
     t.dataState.set(Session.get('sesionId'));}
  },


  'click #newgruposcomp': function(e)
  {
    e.preventDefault();
    
    $('#altacompGrupos #sesion_id').val( Session.get('sesionId') );
    $('#modal_alta_gruposcomp').modal('show');
  },



 });





