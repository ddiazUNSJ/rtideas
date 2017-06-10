//import { Accounts } from 'meteor/accounts-base'
// import {Meteor} from 'meteor/meteor';
// import {Session} from 'meteor/session';
// import {Router, RouteController} from 'meteor/iron:router';
// import { Mongo } from 'meteor/mongo';
// import { Email } from 'meteor/email';
// Options
AccountsTemplates.configure({

  //******************************************
    // Home default
    homeRoutePath: '/',

    // Behavior
    confirmPassword: true,
    enablePasswordChange: true,
    forbidClientAccountCreation: false,
    overrideLoginErrors: true,
    sendVerificationEmail: true,
    enforceEmailVerification: true,
    lowercaseUsername: false,
    focusFirstInput: true,

    // Appearance
    showAddRemoveServices: false,
    showForgotPasswordLink: true,
    showLabels: false,
    //showTitle:false,
   // showDisplayName:true,
    showPlaceholders: true,
    showResendVerificationEmailLink: false,

    // Client-side Validation
    continuousValidation: false,
    negativeFeedback: false,
    negativeValidation: true,
    positiveValidation: true,
    positiveFeedback: true,
    showValidating: true,
  
    //Template configuration
      // defaultTemplate: 'Auth_page',
     defaultLayout: 'blankLayout',
      // defaultContentRegion: 'main',
      // defaultLayoutRegions: {}

    // Privacy Policy and Terms of Use
     //privacyUrl: 'privacy',
     //termsUrl: 'terms-of-use',
     // displayFormLabels: false,
     // formValidationFeedback: true,

//No muestra el titulo de atForm
    texts: {
      title: {
           signUp: "",signIn: "",
      }
    }
/*
El cambio de colores de los botones u otro elemento decorativo se hace en /stylesheets/globals/landing.import.less
Por ejemplo para cambiar el boton de registrarse en atForm en el estado signUp , lo que hice fue agregar la clase at-btn
como copia de la clase  .btn-primary, la cual tiene los atributos que necesito, no solo el color, la forma, color de fondo,etc,.
La informacion sobre el nombre de la clase la saque de
- packages/useraccounts_bootstrap
- https://github.com/meteor-useraccounts/core/blob/master/Guide.md#css-rules
- packages/useraccounts_core
-https://www.youtube.com/watch?v=X6EodWQBDG8

Se agrego
   //Pinta boton account de color boton de inspinia
  .at-btn {
    .btn;
    .btn-primary;
  }

*/
});

/*AccountsTemplates.addField({
    _id: 'username',
    type: 'text',
    required: true,
    func: function(value){
        if (Meteor.isClient) {
            console.log("Validating username...");
            var self = this;
            Meteor.call("userExists", value, function(err, userExists){
                if (!userExists)
                    self.setSuccess();
                else
                    self.setError(userExists);
                self.setValidating(false);
            });
            return;
        }
        // Server
        return Meteor.call("userExists", value);
    },
});*/
if (Meteor.isServer){
    // function sleep(milliseconds) {
    //     var start = new Date().getTime();
    //     for (var i = 0; i < 1e7; i++) {
    //         if ((new Date().getTime() - start) > milliseconds){
    //             break;
    //         }
    //     }
    // }

    // Meteor.methods({
    //     "userExists": function(username){
    //         sleep(1000);
    //         check(Meteor.userId(), String);
    //         var user = Meteor.users.findOne({username: username});
    //         if (user)
    //              {
    //                console.log('usuario registrado'); 
    //                return "Username already in use!" 
    //              }
    //             console.log('nombre de usuario ok'); 
    //         return false;
    //     },
    // });

     Meteor.methods({
        "userExists": function(username){
           check(username,String);
            return !!Meteor.users.findOne({username: username});
        },
    });
}


AccountsTemplates.addField({
    _id: 'username',
    type: 'text',
    required: true,
    func: function(value){
        if (Meteor.isClient) {
            console.log("Validating username...");
            var self = this;
            Meteor.call("userExists", value, function(err, userExists){
                if (!userExists)
                    self.setSuccess();
                else
                    self.setError(userExists);
                self.setValidating(false);
            });
            return;
        }
        // Server
        return Meteor.call("userExists", value);
    },
});

// AccountsTemplates.addField({
//     _id: 'username',
//     type: 'text',
//     required: true,
//     func: function(value){
//         if (Meteor.isClient) {
//             var self = this;
//             Meteor.call("userExists", value, function(err, userExists){
//                 self.setStatus(userExists);
//                 self.setValidating(false);
//             });
//             return false;
//         }
//         // Server
//         var result = Meteor.call("userExists", value);
//         return result;
//     },
// });


AccountsTemplates.addField({
    _id: 'nombre',
    type: 'text',
    placeholder: {
        signUp: "Nombre y Apellido"
    },
    required: true,
    minLength: 3,
    maxLength:50,
    errStr: 'Debe ingresar un nombre entre 3 y 50 caracteres',
});


// router configuracion
      var myPostLogout = function(){
          //example redirect after logout
          Router.go('/');
      };

      AccountsTemplates.configure({
          onLogoutHook: myPostLogout
      });

var myPostSubmitFunc = function(userId, info) {
  console.log("nuevo usuario agregado " + userId);
  Meteor.users.update({ _id: userId }, { $set: { rol: "Participante" }});
}

AccountsTemplates.configure({
  postSignUpHook: myPostSubmitFunc 
});



      //Routeo a modulos de autentificacion
      // AccountsTemplates.configureRoute('signIn', {
      //   name: 'singin',
      //   path: '/sign-in',
      // });
    //funca
      AccountsTemplates.configureRoute('signIn', {
          name: 'singin',
          path: '/sign-in',
          template: 'login',
          layoutTemplate: 'blankLayout',
          redirect: '/sesionlist',
      });

      AccountsTemplates.configureRoute('signUp', {
          name: 'singup',
          path: '/sign-up',
          template: 'registrar',
          layoutTemplate: 'blankLayout',
          redirect: '/sesionlist',
      });
      

    //  AccountsTemplates.configureRoute('signIn');
      AccountsTemplates.configureRoute('changePwd');
      AccountsTemplates.configureRoute('enrollAccount');
      AccountsTemplates.configureRoute('forgotPwd');
      AccountsTemplates.configureRoute('resetPwd');
    // AccountsTemplates.configureRoute('signUp');
      AccountsTemplates.configureRoute('verifyEmail');




//**** Configuracion de cuentas de email

EmailConfig = {};

var EmailConfig;

Meteor.startup(function() {
 
  EmailConfig = {
    settings: {
      receiver: Meteor.settings && Meteor.settings.private && Meteor.settings.private.email && Meteor.settings.private.email.receiver || ''
    },
    hasValidStringProperty: function(property) {
      return _.isString(property) && !_.isEmpty(property)
    }  
   }

  this.EmailConfig = EmailConfig;

  if(Meteor.isServer) {
    console.log('preparando el setting de MAIL_URL');  
    console.log(  Meteor.settings.private.email.username );
    var email = {
      username: Meteor.settings && Meteor.settings.private && Meteor.settings.private.email && Meteor.settings.private.email.username || '',
      password: Meteor.settings && Meteor.settings.private && Meteor.settings.private.email && Meteor.settings.private.email.password || '',
      server: Meteor.settings && Meteor.settings.private && Meteor.settings.private.email && Meteor.settings.private.email.server || '',
      port: Meteor.settings && Meteor.settings.private && Meteor.settings.private.email && Meteor.settings.private.email.port || '',
    };      
    if(EmailConfig.hasValidStringProperty(email.username) && 
       EmailConfig.hasValidStringProperty(email.password) &&
       EmailConfig.hasValidStringProperty(email.server) &&
       EmailConfig.hasValidStringProperty(email.port)
      ) 
      { 
       console.log('seteando MAIL_URL');   
       process.env.MAIL_URL = 'smtp://' + encodeURIComponent(email.username) + ':' + encodeURIComponent(email.password) + '@' + encodeURIComponent(email.server) + ':' + email.port;
       } 
  
//configura account






//*******************************
// configura mensajes de email

//mensajes para reset password 


          Accounts.emailTemplates.siteName = "IdeasEnTiempoReal";
          
          Accounts.emailTemplates.from = "IdeTR <inscripciones@rtideas.tk>";
          Accounts.emailTemplates.resetPassword.subject = function (usuario) {
              return "Solicitud de cambio de password ";
           };
          Accounts.emailTemplates.resetPassword.text = function (usuario, url) {
           var newUrl = url.replace('/#','');
           return "Hola,  muchas gracias por ponerte en contacto con el equipo del taller de Ideas en Tiempo Real. Has solicitado un cambio de password, simplemente "
           +" para efectuar el cambio hace click en el link que se muestra a continuación "
           + newUrl;
           };
          

//mensajes para registracion
           
          Accounts.emailTemplates.enrollAccount.subject = function (user) {
            return "Hola "+ user.profile.nombre+ " le damos la bienvenida a nuestro primer taller de impresion  3D " ;
            };
      Accounts.emailTemplates.enrollAccount.text = function (user, url) {
        var newUrl = url.replace('/#','');
       return "Antes que nada le agradecemos el interes por este taller. Le comunicamos que el cupo disponible "
        +"para el taller ha sido ampliamente superado. Este suceso nos llena de satisfaccion, debido a  este " 
        +"hecho hemos decidido agregar (3) tres instancias mas  del taller. Estas instancias seran dictadas "  
        +"con fecha tentativa en los meses de marzo-abril. Por lo tanto para mantenerle informado de las fechas "
        +"reales del dictado y de otras gestiones administrativas le hemos creado una cuenta en nuestro sitio web. "
        +"Para activar la misma, simplemente haga click en el link que se muestra a continuación "
        + newUrl;

      };

      //mensajes para registracion
          
          Accounts.emailTemplates.verifyEmail.subject = function (user) {

            return "Hola "+ user.profile.nombre+ " le damos la bienvenida a nuestro primer taller de impresion  3D " ;
            };
      Accounts.emailTemplates.verifyEmail.text = function (user, url) {
         var newUrl = url.replace('/#','');
       return "Antes que nada le agradecemos el interes por este taller. "
        +"Para activar la misma, simplemente haga click en el link que se muestra a continuación "
        + newUrl;

       };

     }//from ifServer
   });