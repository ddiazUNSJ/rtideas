/*Router.configure({
    layoutTemplate: 'mainLayout',
    loadingTemplate:'loading',
    notFoundTemplate: 'notFound',
     waitOn: function() { return  Meteor.subscribe('users_sesions'); }
});*/

Router.configure({
    layoutTemplate: 'landing',
    loadingTemplate:'loading',
    notFoundTemplate: 'notFound',
     waitOn: function() { //return  Meteor.subscribe('users_sesions');
      }
});

// DD  11/08/17 - Agregado para funcionar con accountTemplate
Router.route('/', {
    name: 'landing',
    template: 'landing',
    layoutTemplate: 'landing',
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
                            //layoutTemplate: 'iniciolayout'
                            layoutTemplate: 'mainLayout'});


// verifica q este logeado de lo contrario no da permiso para inresar
var requireLogin2 = function() {
  if (! Meteor.user()) 
  {
    if (Meteor.loggingIn()) 
      this.render(this.loadingTemplate);
    else 
     //Router.go('landing');
      Router.go('landing'); 
  } 
  else {
   
    Meteor.subscribe('users_sesions');

    this.render('sesionList');
  }
}
Router.onBeforeAction(requireLogin2, {only: 'sesionList'});
//------------------------------------------------------------------------------


//******************************************************************************
//====== rolSubmit
//
// Descripcion : Carga un nuevo rol (label)
Router.route('/submit', {name: 'rolSubmit', layoutTemplate: 'mainLayout'}); //cintia

//se verifica si el usuario esta logeado de lo contrario se muestra una plantilla de inicio-o avanza
//cintia
var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
     Router.go('landing');
    }
  } else {
    this.next();
  }
}


Router.onBeforeAction(requireLogin, {only: 'rolSubmit'});//cintia

//------------------------------------------------------------------------------




Router.route('/submitCGR', {name: 'compartirSubmit', layoutTemplate: 'mainLayout'});//cintia

Router.route('/inscriptos', {name: 'list_inscriptos', layoutTemplate: 'mainLayout'});

Router.route('/animgrupos', {name: 'list_animGrupos', layoutTemplate: 'mainLayout'});

Router.route('/adminSesiones', {name: 'adminSesion', layoutTemplate: 'mainLayout'});

//listado de todos los rol
//Router.route('/rolList', {name: 'listadorol'});


Router.route('/asignarList', {name: 'listasignacion', layoutTemplate: 'mainLayout'});


Router.route('/chat/:_id', {  //los parametros siempre lo toma de la url. idgrupo pertenece al entorno
  //es el id de la coleccion user_sesion
  name: 'chatPage',
  layoutTemplate: 'mainLayout'
  //data: function() { return alert(this.params.idgrupo); }
});



//-----------------------------------------------------------------------

var requireSubsc5 = function() {
		if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      Router.go('landing');
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
      Router.go('landing');
    }
  } else {
   
  	var dato = this.params._id; //id de la coleccion user_sesion
  	
    var usersesion = Users_sesions.findOne( {_id: dato} );  

    Session.set('idsesion', usersesion.idsesion);
    Session.set('subrol', usersesion.rol);

    Meteor.subscribe('gruposUserEst', Session.get('idsesion') ); 


    if( Session.get('subrol') == 'Participante' )
    {   
      
      Session.set('idgrupo', usersesion.idgrupo[0]);

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
    Meteor.subscribe("ficha");


   	
    this.render('chatPage');
  }
}

  var requireSubsc7 = function() 
  {
    if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      Router.go('landing');
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
  


  var requireSubsc10 = function() {
    if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      Router.go('landing');
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
        Router.go('landing');
       }
    }
  else
   {
    Meteor.subscribe('allInscripciones');    
    Meteor.subscribe('tematica');        
    //Meteor.subscribe('subrol');  
    Meteor.subscribe('sesionesCreatividad');  
    Meteor.subscribe('usersesion');  
     Meteor.subscribe('grupos');    

    this.render('list_inscriptos');//lo envia a la plantilla listado de grupo
   }
}

var requiresSesionList = function() 
  {
    if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      Router.go('landing');
    }
  } else {
       
    Meteor.subscribe('tematica'); //
    Meteor.subscribe('sesiones_pub'); //sesionesCreatividad
    this.next();
  
   } 
  }


  var requireSubsc12 = function() 
  {
    if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      Router.go('landing');
    }
  } else {  
   Meteor.subscribe('tematica'); 
   Meteor.subscribe('sesionesCreatividad');
   Meteor.subscribe('grupos');
   Meteor.subscribe('users'); 
   Meteor.subscribe('allAnimadores'); 
   Meteor.subscribe('instancias');
   Meteor.subscribe('usersesion');

    this.render('adminSesion');
    //this.next();
   } 
  }


var requireSubsc13 = function() 
{
  if (! Meteor.user()) 
    {
      if (Meteor.loggingIn()) 
       {
        this.render(this.loadingTemplate);
       } 
      else
       {
        Router.go('landing');
       }
    }
  else
   {
    
    Meteor.subscribe('tematica');        
    //Meteor.subscribe('subrol');  
    Meteor.subscribe('sesionesCreatividad');  
    Meteor.subscribe('usersesion');  
    Meteor.subscribe('grupos');    

    Meteor.subscribe('animadores_sesion2');
    Meteor.subscribe('users'); 

    this.render('list_animGrupos');//lo envia a la plantilla listado de grupo
   }
}

var requireSubsc14 = function() 
{
  if (! Meteor.user()) 
    {
      if (Meteor.loggingIn()) 
       {
        this.render(this.loadingTemplate);
       } 
      else
       {
        Router.go('landing');
       }
    }
  else
   {
    
    Meteor.subscribe('users'); 

    this.render('adminAnima');//lo envia a la plantilla listado de grupo
   }
}

//------------------------------------------------------------------

//Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'rolSubmit'});//cintia

Router.onBeforeAction(requireSubsc5, {only: 'asignacion'});
Router.onBeforeAction(requireSubsc6, {only: 'chatPage'});
Router.onBeforeAction(requireSubsc7, {only: 'compartirSubmit'});
Router.onBeforeAction(requireSubsc10, {only: 'asignacion_anim'});
Router.onBeforeAction(requireSubsc11, {only: 'list_inscriptos'});
Router.onBeforeAction(requireSubsc13, {only: 'list_animGrupos'});

Router.onBeforeAction(requiresSesionList, {only: 'sesionDispo'});
Router.onBeforeAction(requireSubsc12, {only: 'adminSesion'});

Router.onBeforeAction(requireSubsc14, {only: 'adminAnima'});


Router.route('/sign-out', {
    name: 'signOut',
    onBeforeAction: function () {
        AccountsTemplates.logout();
        swal("Saliendo del sistema");
        this.redirect('/');
    }
});

// DD  13/08/17
// rutas para pagina inicio usuario sistema


Router.route('/subirfoto',{name: 'subirfoto',
                            template:'subirfoto',
                            layoutTemplate: 'mainLayout'
                           });

Router.route('/reg',{name: 'reg',
                            template:'Register2',
                            layoutTemplate: 'mainLayout'
                           });
Router.route('/inicio', {
    name: 'inicio',
    template: 'inicio',
    layoutTemplate: 'mainLayout',
});

Router.route('/sesionDispo', {
    name: 'sesionDispo',
    template: 'sesionDispo',
    layoutTemplate: 'mainLayout',
});


/*Router.route('/gi_AdminInscri', {
    name: 'gi_AdminInscri',
    template: 'gi_AdminInscri',
    layoutTemplate: 'mainLayout',
});*/


Router.route('/adminAnima',{name: 'adminAnima',
                            template:'adminAnima',
                            layoutTemplate: 'mainLayout'
                           });
Router.route('/adminUsers',{name: 'adminUsers',
                            template:'adminUsers',
                            layoutTemplate: 'mainLayout'
                           });

// Datos Sesion - Gestionar Participantes
Router.route('/gp_AdminPartici', {
    name: 'gp_AdminPartici',
    template: 'gp_AdminPartici',
    layoutTemplate: 'mainLayout',
});

//Datos Sesion - Gestionar Animadores de Sesion
Router.route('/as_AdminAnimaS', {
    name: 'as_AdminAnimaS',
    template: 'as_AdminAnimaS',
    layoutTemplate: 'mainLayout',
});