Router.configure({
    layoutTemplate: 'mainLayout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
     waitOn: function() { return Meteor.subscribe('users_sesions');  }
});

Router.route('/', {name: 'sesionList'}); // muestra gr, rol, sesion a los q prtenece el usuario

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

    //creo una variable de session con el rol del usuario
    //Meteor.subscribe('data_user'); //se suscribe al arrancar, en la publicacion users_sesions
    var useractual = Meteor.userId(); 
    var data = Meteor.users.findOne({_id: useractual}); 
    Session.set('rol', data.rol);

    this.render('sesionList');
  }
}
Router.onBeforeAction(requireLogin2, {only: 'sesionList'});

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
Router.route('/submit', {name: 'rolSubmit'}); //cintia
Router.route('/tematicaCreate', {name: 'tematicaSubmit'});//cintia
Router.route('/submitG', {name: 'grupoSubmit'});//cintia
Router.route('/submitSesion', {name: 'sesionSubmit'});//cintia
Router.route('/submitCGR', {name: 'compartirSubmit'});//cintia
Router.route('/listCGR', {name: 'GcompList'});//cintia

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
//muestra el chat de un grupo
//Router.route('/chatPage', {name: 'chatPage'});

Router.route('/chat/:_id', {  //los parametros siempre lo toma de la url. idgrupo pertenece al entorno
  name: 'chatPage'
  //data: function() { return alert(this.params.idgrupo); }
});

Router.route('/chat/', {  //los parametros siempre lo toma de la url. idgrupo pertenece al entorno
  name: 'chatPage2'
  //data: function() { return alert(this.params.idgrupo); }
});


//-----------------------------------------------------------------------

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


var requireLogin3 = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('inicio');
    }
  } else {

    Meteor.subscribe('users_sesions');

    Meteor.subscribe('sesionCountdown');

    Meteor.subscribe('instancias');


    this.render('chatPage'); //cambia la ruta pero lo dirijo al mismo template
  }
}


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
    //Meteor.subscribe('rol');
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
    //alert(this.params.idgrupo);
  	var dato = this.params._id;
  	Session.set('idgrupo', dato);

    //alert( Session.get('idgrupo') );
    //Meteor.subscribe('grupos');

    //Meteor.subscribe('sesionesCreatividad');

    //Meteor.subscribe('users_sesions');

  	Meteor.subscribe('ideas',dato); //le envio el id de grupo para que me publique solo las ideas del grupo.
    
    Meteor.subscribe('sesionCountdown');
    
    Meteor.subscribe('instancias');
   	
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
   Meteor.subscribe('animadores'); 
    Meteor.subscribe('instancias');

    this.render('sesionSubmit');
    //this.next();
   } 
  }


//------------------------------------------------------------------

//Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'rolSubmit'});//cintia
Router.onBeforeAction(requireLogin3, {only: 'chatPage2'}); //para el animador, no se subscribe por el momento

Router.onBeforeAction(requireLogin, {only: 'tematicaSubmit'});//cintia
Router.onBeforeAction(requireSubsc2, {only: 'grupoSubmit'});
Router.onBeforeAction(requireSubsc3, {only: 'tematicaList'});
Router.onBeforeAction(requireSubsc4, {only: 'list_grupo'});

Router.onBeforeAction(requireSubsc5, {only: 'asignacion'});
Router.onBeforeAction(requireSubsc6, {only: 'chatPage'});
Router.onBeforeAction(requireSubsc7, {only: 'compartirSubmit'});
Router.onBeforeAction(requireSubsc8, {only: 'GcompList'});
Router.onBeforeAction(requireSubsc9, {only: 'sesionSubmit'});

