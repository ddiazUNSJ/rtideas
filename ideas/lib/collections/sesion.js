Sesion = new Mongo.Collection('sesion');




//Cuenta Regresiva
function stop_timer(sesionId,minutos,instancia)
{ 
   var newIns = null;
    switch(instancia)
    {
      case 0:
            var sesion = Sesion.findOne( {_id:  sesionId} ); 
            newIns=1;
            newMin=sesion.instancia1;
          
          break;
      case 1:
            var sesion = Sesion.findOne( {_id:  sesionId} ); 
            newIns=2;
            newMin=sesion.instancia2;
            
          break;
      case 2:
            var sesion = Sesion.findOne( {_id:  sesionId} ); 
            newIns=3;
            newMin=sesion.instancia3;

          break;
      case 3:
            var sesion = Sesion.findOne( {_id:  sesionId} ); 
            newIns=4;
            newMin=sesion.instancia4;
             break;
      case 4:
            var sesion = Sesion.findOne( {_id:  sesionId} ); 
            newIns=5;
            newMin=sesion.instancia5;
             break;
      default: newIns=6; //termina
                 break;
    }

      var countdown = new ReactiveCountdown(minutos*60, {
        // Value substracted every tick from the current countdown value
        steps: 1,  
        // Specify the countdown's interval in milliseconds
        interval: 1000,
        // Callback: Tick, called on every interval
        tick: function() {
            var seg = countdown.get();
            var min = parseInt(seg/60);
            
            console.log(min+':'+seg%60); 
            var cuenta = min+':'+seg%60;
            //Sesion.update({_id : sesionId},{$set:{countdown: cuenta }});  

            SesionTime.update({sesion_id : sesionId},{$set:{countdown: cuenta }});  
        },
        // Callback: Complete, called when the countdown has reached 0
        completed: function() {},
      });

      countdown.start(function() {
          // do something when this is completed
          console.log('terminada: '+instancia);

          Sesion.update({_id : sesionId },{$set:{instActual: newIns }});

          if(newIns != 6) //no existe la 6
            stop_timer(sesionId,newMin,newIns);

      });

      var seg = countdown.get();
      var min = parseInt(seg/60);
      console.log(min+':'+seg%60);

          
}


Meteor.methods({
  sesionInsert: function(crAttributes) //se verifica q el ususario este autenticado
  {
    check(Meteor.userId(), String);
    // check(crAttributes, {
    //    SC: String
    // });
    check(crAttributes, Match.Where(function(crAttributes){
        _.each(crAttributes, function (doc) {
          // do your checks and return false if there is a problem 
        });
        // return true if there is no problem
        return true;

      }));

    var user = Meteor.user();
    var datos = _.extend(crAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date(),
	    estado: 'activa',
      instActual: -1
    });
    var crId = Sesion.insert(datos);
    return {
      _id: crId
    };
  },


  pasardeInstantcia: function(crAttributes) //se verifica q el ususario este autenticado
  {
    check(Meteor.userId(), String);
    // check(crAttributes, {
    //    SC: String
    // });
    check(crAttributes, Match.Where(function(crAttributes){
        _.each(crAttributes, function (doc) {
          // do your checks and return false if there is a problem 
        });
        // return true if there is no problem
        return true;

      }));

    var user = Meteor.user();
    var datosUsu = Meteor.users.find({_id: user});

    datosUsu.forEach( function(myDoc) 
    {
       RolUsu = myDoc.rol; 
    });

    if(RolUsu == 'Animador')
    {
      var grupo = Grupo.findOne( {_id: crAttributes.idgrupo} ); 
      var sesion = Sesion.findOne( {_id:  grupo.sesion_id} ); 
      var instancia = sesion.instActual + 1;

      Sesion.update({_id : grupo.sesion_id },{$set:{instActual: instancia }});

      return {
        _id: grupo.sesion_id
      };
    }
    else  return {
            _id: 0
          };
    
  },


  editTimeInst: function(crAttributes) //se verifica q el ususario este autenticado
  {
    check(Meteor.userId(), String);
    // check(crAttributes, {
    //    SC: String
    // });
    check(crAttributes, Match.Where(function(crAttributes){
        _.each(crAttributes, function (doc) {
          // do your checks and return false if there is a problem 
        });
        // return true if there is no problem
        return true;

      }));

    var time = parseInt(crAttributes.time);

    //console.log(time);

    var user = Meteor.user();
    var datosUsu = Meteor.users.find({_id: user});

    datosUsu.forEach( function(myDoc) 
    {
       RolUsu = myDoc.rol; 
    });

    if(RolUsu == 'Animador')
    {
      var grupo = Grupo.findOne( {_id: crAttributes.idgrupo} ); 
      var sesion = Sesion.findOne( {_id:  grupo.sesion_id} ); 
      //var instancia = sesion.instActual + 1;

      switch(sesion.instActual)
      {
        case 1: Sesion.update({_id : grupo.sesion_id },{$set:{instancia1: ( parseInt(sesion.instancia1) ) + time}});
                break;

        case 2: Sesion.update({_id : grupo.sesion_id },{$set:{instancia2: ( parseInt(sesion.instancia2) ) + time}});
                break;

        case 3: Sesion.update({_id : grupo.sesion_id },{$set:{instancia3: ( parseInt(sesion.instancia3) ) + time}});
                break;

        case 4: Sesion.update({_id : grupo.sesion_id },{$set:{instancia4: ( parseInt(sesion.instancia4) ) + time}});
                break;

        case 5: Sesion.update({_id : grupo.sesion_id },{$set:{instancia5: ( parseInt(sesion.instancia5) ) + time}});
                break;
      }

      return {
        _id: grupo.sesion_id
      };

    }
    else  return {
            _id: 0
          };
    
  },


  comenzarSesion: function(crAttributes) //se verifica q el ususario este autenticado
  {
    check(Meteor.userId(), String);
    // check(crAttributes, {
    //    SC: String
    // });
    check(crAttributes, Match.Where(function(crAttributes){
        _.each(crAttributes, function (doc) {
          // do your checks and return false if there is a problem 
        });
        // return true if there is no problem
        return true;

      }));

    var user = Meteor.user();
    var datosUsu = Meteor.users.find({_id: user});

    datosUsu.forEach( function(myDoc) 
    {
       RolUsu = myDoc.rol; 
    });

    if(RolUsu == 'Animador')
    {
      var minutos = crAttributes.minutos; //minutos para comenzar
      var grupo = Grupo.findOne( {_id: crAttributes.idgrupo} ); 
      //var sesion = Sesion.findOne( {_id:  grupo.sesion_id} ); 
      var instancia = 0;

      Sesion.update({_id : grupo.sesion_id },{$set:{instActual: instancia }});

      var datos = {
          sesion_id: grupo.sesion_id,
          countdown:0
      };
      SesionTime.remove({sesion_id: grupo.sesion_id });
      SesionTime.insert(datos);

      var sesionT = SesionTime.findOne( {sesion_id:  grupo.sesion_id} ); 

      console.log(sesionT);

      stop_timer(grupo.sesion_id,minutos,instancia);
        

      return {
        _id: grupo.sesion_id
      };
    }
    else  return {
            _id: 0
          };
    
  },


  getFechaA: function(crAttributes) //se verifica q el ususario este autenticado
  {
     check(Meteor.userId(), String);

     check(crAttributes, Match.Where(function(crAttributes){
        _.each(crAttributes, function (doc) {
          // do your checks and return false if there is a problem 
        });
        // return true if there is no problem
        return true;
      }));
   
    return new Date();
    
  },




});
