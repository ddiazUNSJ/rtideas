Router.configure({
    layoutTemplate: 'mainLayout',
    loadingTemplate:'loading',
    notFoundTemplate: 'notFound',
     waitOn: function() { return  Meteor.subscribe('users_sesions'); }
});

//DD Define Home del sistema 
//DD Cambiar de ruta / a /sesion a definir segun pagina de inicio del sistema


//******************************************************************************
//====== sesionList
//

// Descripcion : Muestra el listado de sesiones activas para el usuario logeado
 
// DD  11/08/17 cambiado  
//Router.route('/', {name: 'sesionList'}); // muestra gr, rol, sesion a los q prtenece el usuario
Router.route('/sesionlist',{name: 'sesionList',
                            template:'sesionList',
                            layoutTemplate: 'iniciolayout'});


// verifica q este logeado de lo contrario no da permiso para inresar
var requireLogin2 = function() {
  if (! Meteor.user()) 
  {
    if (Meteor.loggingIn()) 
      this.render(this.loadingTemplate);
    else 
      this.render('inicio');
  } 
  else {


    

    //Meteor.subscribe('data_user'); //se suscribe al arrancar, en la publicacion users_sesions
    //Meteor.subscribe('users_sesions');

    this.render('sesionList');
  }
}
Router.onBeforeAction(requireLogin2, {only: 'sesionList'});
//------------------------------------------------------------------------------


//******************************************************************************
//====== rolSubmit
//
// Descripcion : Carga un nuevo rol (label)
Router.route('/submit', {name: 'rolSubmit'}); //cintia

//se verifica si el usuario esta logeado de lo contrario se muestra una plantilla de inicio-o avanza
//cintia
var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('inicio');
    }
  } else {
    this.next();
  }
}


Router.onBeforeAction(requireLogin, {only: 'rolSubmit'});//cintia

//------------------------------------------------------------------------------




// Router.route('/sesionsC/:_id', {
//   name: 'postPage',
//   data: function() { return sesionsC.findOne(this.params._id); }
// });

// Router.route('/sesionsC/:_id/edit', {
//   name: 'postEdit',
//   data: function() { return sesionsC.findOne(this.params._id); }
// });

//--------------------------------------------------------------------

Router.route('/tematicaCreate', {name: 'tematicaSubmit'});//cintia
Router.route('/submitG', {name: 'grupoSubmit'});//cintia
Router.route('/submitSesion', {name: 'sesionSubmit'});//cintia
Router.route('/submitCGR', {name: 'compartirSubmit'});//cintia
Router.route('/listCGR', {name: 'GcompList'});//cintia
Router.route('/inscriptos', {name: 'list_inscriptos'});

//listado de todos los rol
//Router.route('/rolList', {name: 'listadorol'});

//listado de todas las tematicas
Router.route('/tematicaList', {name: 'tematicaList'});
//listado de todos los grupos
Router.route('/groupList', {name: 'list_grupo'});
//listados de todas las asignaciones
Router.route('/asignarList', {name: 'listasignacion'});
//asigna grupo, asuario y rol
Router.route('/asigGrupo', {name: 'asignacion'});
//asigna grupos al animador
Router.route('/GruposAnim', {name: 'asignacion_anim'});
//muestra el chat de un grupo
//Router.route('/chatPage', {name: 'chatPage'});

Router.route('/chat/:_id', {  //los parametros siempre lo toma de la url. idgrupo pertenece al entorno
  //es el id de la coleccion user_sesion
  name: 'chatPage'
  //data: function() { return alert(this.params.idgrupo); }
});



//-----------------------------------------------------------------------



/*var requireLogin3 = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('inicio');
    }
  } else {

    //Meteor.subscribe('users_sesions');
    var dato = this.params._id;
    Session.set('idsesion', dato);
    
    var grupos = Grupo.find({sesion_id: dato}, {sort: {gr: 1}});
    var contGrupos=0;
    if(grupos)
      grupos.forEach( function(myDoc) 
      {
          if(contGrupos==0)
          {
            Session.set('idgrupo', myDoc._id);
          }
          Meteor.subscribe('ideas', myDoc._id);
          contGrupos++;
      });

    Meteor.subscribe('sesionCountdown');
    Meteor.subscribe('instancias');

    this.render('chatPage'); //cambia la ruta pero lo dirijo al mismo template
  }
}*/


var requireSubsc2 = function() {
	if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('inicio');
    }
  } else {
	Meteor.subscribe('tematica');
  Meteor.subscribe('sesionesCreatividad');// muestra las sesiones cargadas para el select
	this.render('grupoSubmit');//lo envia a la plantilla listado de grupo
  }
}

var requireSubsc3 = function() {
		if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('inicio');
    }
  } else {
    Meteor.subscribe('tematica');
	this.render('tematicaList');
  }
  
}

var requireSubsc4 = function() {
		if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('inicio');
    }
  } else {
    Meteor.subscribe('grupos');
	Meteor.subscribe('creatividad'); //consultar por cuestion de seguridad????????
	this.render('list_grupo');
  }
  
}

var requireSubsc5 = function() {
		if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('inicio');
    }
  } else {
    Meteor.subscribe('grupos');
  	Meteor.subscribe('tematica'); //consultar por cuestion de seguridad????????
  	Meteor.subscribe('sesionesCreatividad'); 
   
  	Meteor.subscribe('users');
  	this.render('asignacion');
  }
}

var requireSubsc6 = function() {
		if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('inicio');
    }
  } else {
   
  	var dato = this.params._id; //id de la coleccion user_sesion
  	
    var usersesion = Users_sesions.findOne( {_id: dato} );  

    Session.set('idsesion', usersesion.idsesion);
    Session.set('subrol', usersesion.rol);

    Meteor.subscribe('gruposUserEst', Session.get('idsesion') ); 


    if( Session.get('subrol') == 'Participante' )
    {
      Session.set('idgrupo', usersesion.idgrupo);

      Meteor.subscribe('ideas', Session.get('idgrupo') ); //le envio el id de grupo para que me publique solo las ideas del grupo.
      Meteor.subscribe('gruposComp', Session.get('idgrupo') );
      Meteor.subscribe('votos_compartir',  Session.get('idgrupo') );
    }
    else // si es ANIMADOR tiene un array de idgrupos
    {
      var grupos = Grupo.find( {},{sort: {gr: 1}} );
  
      var contGrupos=0;
      if(grupos)
        grupos.forEach( function(myDoc) 
        {   
            if(contGrupos==0)
            {
              Session.set('idgrupo', myDoc._id);
            }
            Meteor.subscribe('ideas', myDoc._id);
            Meteor.subscribe('gruposComp', myDoc._id);
            Meteor.subscribe('votos_compartir',  myDoc._id );
            contGrupos++;
        });
    }

    Meteor.subscribe('sesionCountdown');
    Meteor.subscribe('instancias');

    Meteor.subscribe("votos_I2");
    Meteor.subscribe("votos_I4");

   	
    this.render('chatPage');
  }
}

  var requireSubsc7 = function() 
  {
    if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('inicio');
    }
  } else {
		//alert(this.params.idgrupo);
	  //var dato = this.params.idgrupo;
	  //Session.set('idgrupo', dato);
	  //Meteor.subscribe('ideas',dato); //,this.params.idgrupo

    Meteor.subscribe('grupos');
    Meteor.subscribe('tematica'); //consultar por cuestion de seguridad????????
    Meteor.subscribe('sesionesCreatividad'); 
    
	  this.render('compartirSubmit');
	  //this.next();
	 } 
  }
  
 var requireSubsc8 = function() 
  {
    if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('inicio');
    }
  } else {  
	  Meteor.subscribe('compartir');
	  Meteor.subscribe('grupos');
	  this.render('GcompList');
	  //this.next();
	 } 
  }

   var requireSubsc9 = function() 
  {
    if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('inicio');
    }
  } else {  
   Meteor.subscribe('tematica'); 
   //Meteor.subscribe('animadores'); 
    Meteor.subscribe('instancias');

    this.render('sesionSubmit');
    //this.next();
   } 
  }


  var requireSubsc10 = function() {
    if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('inicio');
    }
  } else {
    Meteor.subscribe('grupos');
    Meteor.subscribe('tematica'); //consultar por cuestion de seguridad????????
    Meteor.subscribe('sesionesCreatividad'); 
   
    Meteor.subscribe('users');
    this.render('asignacion_anim');
  }
}
var requireSubsc11 = function() 
{
  if (! Meteor.user()) 
    {
      if (Meteor.loggingIn()) 
       {
        this.render(this.loadingTemplate);
       } 
      else
       {
        this.render('inicio');
       }
    }
  else
   {
    Meteor.subscribe('inscripciones');    
    Meteor.subscribe('subrol');  
    Meteor.subscribe('sesionesCreatividad');  
    Meteor.subscribe('usersesion');    

    this.render('list_inscriptos');//lo envia a la plantilla listado de grupo
   }
}
var requiresSesionList = function() 
  {
    if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('inicio');
    }
  } else {
       
    Meteor.subscribe('tematica'); //consultar por cuestion de seguridad????????
    Meteor.subscribe('sesionesCreatividad'); 
    this.next();
  
   } 
  }

//------------------------------------------------------------------

//Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'rolSubmit'});//cintia

Router.onBeforeAction(requireLogin, {only: 'tematicaSubmit'});//cintia
Router.onBeforeAction(requireSubsc2, {only: 'grupoSubmit'});
Router.onBeforeAction(requireSubsc3, {only: 'tematicaList'});
Router.onBeforeAction(requireSubsc4, {only: 'list_grupo'});

Router.onBeforeAction(requireSubsc5, {only: 'asignacion'});
Router.onBeforeAction(requireSubsc6, {only: 'chatPage'});
Router.onBeforeAction(requireSubsc7, {only: 'compartirSubmit'});
Router.onBeforeAction(requireSubsc8, {only: 'GcompList'});
Router.onBeforeAction(requireSubsc9, {only: 'sesionSubmit'});
Router.onBeforeAction(requireSubsc10, {only: 'asignacion_anim'});
Router.onBeforeAction(requireSubsc11, {only: 'list_inscriptos'});

Router.onBeforeAction(requiresSesionList, {only: 'sesionDispo'});

// DD  11/08/17 - Agregado para funcionar con accountTemplate
Router.route('/', {
    name: 'landing',
    template: 'landing',
    layoutTemplate: 'landingLayout',
});


Router.route('/sign-out', {
    name: 'signOut',
    onBeforeAction: function () {
        AccountsTemplates.logout();
        this.redirect('/');
    }
});

// DD  13/08/17
// rutas para pagina inicio usuario sistema


Router.route('/subirfoto',{name: 'subirfoto',
                            template:'subirfoto',
                            layoutTemplate: 'iniciolayout'
                           });
Router.route('/adminUsers',{name: 'adminUsers',
                            template:'adminUsers',
                            layoutTemplate: 'iniciolayout'
                           });
Router.route('/reg',{name: 'reg',
                            template:'Register2',
                            layoutTemplate: 'iniciolayout'
                           });
Router.route('/inicio', {
    name: 'inicio',
    template: 'inicio',
    layoutTemplate: 'mainLayout',
});

Router.route('/sesionDispo', {
    name: 'sesionDispo',
    template: 'sesionDispo',
    layoutTemplate: 'iniciolayout',
});


Router.route('/gi_AdminInscri', {
    name: 'gi_AdminInscri',
    template: 'gi_AdminInscri',
    layoutTemplate: 'mainLayout',
});