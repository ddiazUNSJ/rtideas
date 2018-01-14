Template.adminSesion.rendered = function()
{
    $('#tematica').select2();
   // $('.select2-selection').css('min-width','50%');
    Session.set('tematicaId', 0);
}


Template.adminSesion.onCreated(function(){
   this.dataState = new ReactiveVar();
   this.dataState.set(0);
});


Template.adminSesion.helpers({ 


  tematicas_Opts() {
    var data = Tematica.find({}, {sort: {SC: 1}});
    /*var options=new Array();
    data.forEach( function(myDoc) 
    {
        var aux = { 'value':myDoc._id, 'label':myDoc.SC };
        options.push(aux);  
    });*/
    return data;
  },

  get_sesiones: function() {
    var idtematica = Session.get('tematicaId');
    console.log(idtematica);

    return Sesion.find({tematica_id: idtematica});  
  },

  selector() {
    return {tematica_id: Template.instance().dataState.get(),  estado: {$ne: 'Terminado'}};
  }
  
});


Template.adminSesion.events({

  'change #tematica': function(e,t){
        // do whatever.......

    var idtematica = $(e.target).find('option:selected').val();
    if(idtematica != -1)
    {
      num = 1;
      Session.set('tematicaId', idtematica);
      t.dataState.set(Session.get('tematicaId')); //variable de sesion para el datatable
    }
    else {Session.set('tematicaId', 0);
     t.dataState.set(Session.get('tematicaId'));}

  },

  'click #newsesion': function(e)
  {
    e.preventDefault();
    
    $('#altaSesion input').val('');
    $('.numInst').val(1);
    $('#altaSesion #tematica_id').val( Session.get('tematicaId') );
    $('#modal_alta_sesion').modal('show');
  },

  'click #newtematica': function(e)
  {
    e.preventDefault();
    
    $('#altaTematica input').val('');
    $('#modal_alta_tematica').modal('show');
  },

 

 });




