





// Luego de crear un nuevo usuario asignele el rol de participante, esta funcion solo puede llamarse desde el servidor
//segun API

//=======Luego de agregar un nuevo usuario
      var myPostSubmitFunc = function(userId, info) {
        // // Asignar como participante
        // var getUser = Meteor.users.findOne({'_id': user}, {fields: {"rol": 1}}),
         console.log("update a usuario id: "+userId);
         Meteor.users.update({ _id: userId }, { $set: {'rol' : "Participante" ,'active' : true }});
         console.log("nuevo usuario agregado " + userId);
      }

      AccountsTemplates.configure({
        postSignUpHook: myPostSubmitFunc 
      });


//====Luego de salir del sistema regrese a la pagina landing
      var myPostLogout = function(){
          //example redirect after logout
           console.log("saliendo , Chauuuuuuu " );
          Router.go('/');
      };

      AccountsTemplates.configure({
          onLogoutHook: myPostLogout
      });



//=========Usuario habilitado

// Valida si el usuario esta o no habilitado para ingresar al sistema
// es decir esta funcion me permite habilitar o deshabilitar un usuario
Accounts.validateLoginAttempt(function(info) {
    var user = info.user;
 console.log("validando login");
// if (AccountsTemplates.getState() == "signIn"){
 if(!user.active) console.log("usuario inhabilitado para operar con el sistema");
    if(!user.active) throw new Meteor.Error(403, "User enabled");
//}
return true;
});


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
    //console.log(  Meteor.settings.private.email.username );
    console.log(  Meteor.settings.private );

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
       console.log('seteando MAIL_URL1');   
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




//====Funciones
    function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds){
                break;
            }
        }
    }
//====Metodos de At_config    

Meteor.methods({
        "userExists": function(username){
            check(username, String);
            sleep(1000);
            var user = Meteor.users.findOne({username: username});

            if (user) {
                       console.log("existe usuario- validando en server");
                       throw new Meteor.Error(403, "Username already exists.");
                        return true;
                       } // usuario existe

            console.log("No existe usuario- validando en server")

            return false; //usuario no existe
        },

        // "setParticipante": function (idUser,info){
        //     if (!this.userId) {
        //       console.log( "error participante")
        //      throw new Meteor.Error('Acceso invalido','Usted no esta logeado');
        //       }
        //     else{
        //       Meteor.users.update({ _id: this.userId }, { $set: { rol: "Participante" }});
        //       console.log( "agregamos como participante al usuario")
        //       return true;
        //     }
           
        // },
    });
