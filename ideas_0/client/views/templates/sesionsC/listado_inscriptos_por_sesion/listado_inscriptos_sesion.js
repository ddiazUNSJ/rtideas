Template.list_inscriptos.rendered = function()
{
  
    $('[name="perfil"').select2();

    $('#sesion').select2();


    //$("#tabla1").DataTable({}); 

    num = 1;

    Session.set('sesionId', 0);

    userId = 0;
}



Template.list_inscriptos.helpers({ 


  get_subroles: function() {
    return SubRoles.find({}, {sort: {nombre: -1}});	
  },

  get_inscriptos: function() {
    var idsesion = Session.get('sesionId');
    return Inscripcion.find({sesion_id: idsesion});  
  },

  get_nombre: function() {
    var User = Meteor.users.findOne({_id: this.user_id});
    return User.nombre;  
  },

  get_apellido: function() {
    var User = Meteor.users.findOne({_id: this.user_id});
    return User.apellido;  
  },

  get_num: function() {
    var aux = num;
    num++
    return aux; 
  },

  get_sesiones: function() {
    return Sesion.find({estado:"activa"}, {});  
  },


  setiduser:function() {
     //Session.set('userId', this.user_id);
     userId = this.user_id;
  },


  checkeado: function() {
    var idsesion =  Session.get('sesionId');
    var user = this.user_id;
    
    var result = Users_sesions.findOne( {iduser: user, idsesion: idsesion} );
   
    if(result) 
      return "checked";
    else 
      return "";
  },

  seleccionado: function() {
    var idsesion =  Session.get('sesionId');
    var user = userId;
   
    var result = Users_sesions.findOne( {iduser: user, idsesion: idsesion} );
    
    console.log(result.rol+'--'+this.nombre);

    if(result) 
      if(result.rol==this.nombre)
        return "selected";
    else 
      return "";
    
  },

  
});


Template.list_inscriptos.events({

  'change #sesion': function(e,t){
        // do whatever.......

    var idsesion = $(e.target).find('option:selected').val();
    if(idsesion != -1)
    {
      num = 1;
      Session.set('sesionId', idsesion);
    }
    else Session.set('sesionId', 0);

  },

  'click .aceptar': function(e)
  {
    //e.preventDefault();

    var radio = $(e.target);
     
    /*id = $(radio[0]).attr('id');
    var aux = new Array();
    aux=id.split('_');
    //var voto = aux[0];
    var ididea = aux[1];*/


    var rolselect= $(radio).parent('div').parent('td').parent('tr').find('[name="perfil"]');
    var rol = $(rolselect).val();



    var arre = {
      iduser: this.user_id,
      idsesion: Session.get('sesionId'),
      rol: rol,
    };
    //console.log(arre);

   
    Meteor.call('InsertUserSesion', arre, function(error, result) //se define un metodo para insertar
    {      
        if (error)
          return console.log(error.reason);
         //Router.go('chatPage', {_id: result._id}); 
    });     
  },
  

 });