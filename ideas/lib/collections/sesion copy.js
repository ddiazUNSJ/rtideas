/*Sesion = new Mongo.Collection('sesion');


//Cuenta Regresiva
function tpo_instancia(sesionId,instancia)
{   
    var sesion = Sesion.findOne( {_id:  sesionId} ); 
    switch(instancia)
    {
      case 0:            
            var minutos=sesion.instancia0;
          break;
      case 1:
           var minutos=sesion.instancia1;
          break;
      case 2:
            var minutos=sesion.instancia2;
          break;
      case 3:
            var minutos=sesion.instancia3;
             break;
      case 4:
            var minutos=sesion.instancia4;
             break;
      case 5:
            var minutos=sesion.instancia5;
             break;       
       case 6:
            var minutos=sesion.instancia6;
             break;  
      default:  
            var minutos=-1;
                 break;
    }

    return minutos;
}

//Cuenta Regresiva
function stop_timer(sesionId,minutos,instancia)
{ 
    var newIns = null;
    var sesion = Sesion.findOne( {_id:  sesionId} ); 
    switch(instancia)
    {
      case 0:
            newIns=1;
            newMin=sesion.instancia1;
          break;
      case 1:
            newIns=2;
            newMin=sesion.instancia2;
          break;
      case 2:
            newIns=3;
            newMin=sesion.instancia3;
          break;
      case 3:
            newIns=4;
            newMin=sesion.instancia4;
             break;
      case 4:
            newIns=5;
            newMin=sesion.instancia5;
             break;
      case 5:
            newIns=6;
            newMin=sesion.instancia6;
             break;       
      default: newIns=7; //termina
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

            SesionTime.update({sesion_id : sesionId, instancia: instancia},{$set:{countdown: cuenta }});  
        },
        // Callback: Complete, called when the countdown has reached 0
        completed: function() {},
      });

      countdown.start(function() {
          // do something when this is completed
          console.log('terminada: '+instancia);
          SesionTime.remove({sesion_id: sesionId, instancia: instancia});

          if(newIns < 7) //no existe la 7
          {
            var sesionaux = Sesion.findOne( {_id:  sesionId} ); 
            //interumpo la cuenta regresiva, debido a que el animador pasó de instancia
            if(newIns > sesionaux.instActual) 
            {  
              var datos = {
                  sesion_id: sesionId,
                  instancia: newIns,
                  countdown:0,
                  tiempoT:newMin,
                  submitted: new Date(),
              };
              SesionTime.remove({sesion_id: sesionId, instancia: newIns});
              SesionTime.insert(datos);

              stop_timer(sesionId,newMin,newIns);
            }
            else //cuando corta debe eliminar la instancia anterior en la coleccion
               SesionTime.remove({sesion_id: sesionaux._id, instancia: instancia});

            Sesion.update({_id : sesionId },{$set:{instActual: newIns }}); 
          }
          else  console.log('fin');

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
      var minutos = tpo_instancia(grupo.sesion_id, instancia);


      if(instancia < 7) //no existe la 7
      {
        Sesion.update({_id : grupo.sesion_id },{$set:{instActual: instancia }});

        //creo una nueva cuenta regresiva
        var datos = {
            sesion_id: grupo.sesion_id,
            instancia: instancia,
            countdown:0,
            tiempoT:minutos,
            submitted: new Date(),
        };
        SesionTime.remove({sesion_id: grupo.sesion_id, instancia: instancia});
        SesionTime.insert(datos);
        stop_timer(grupo.sesion_id,minutos,instancia);
      }

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
        case 1:
                var tiempoNew =  ( parseInt(sesion.instancia1) ) + time;
                Sesion.update({_id : grupo.sesion_id },{$set:{instancia1: tiempoNew }});
                break;
        case 2: 
                var tiempoNew =  ( parseInt(sesion.instancia2) ) + time;
                Sesion.update({_id : grupo.sesion_id },{$set:{instancia2: tiempoNew}});
                break;

        case 3: var tiempoNew =  ( parseInt(sesion.instancia3) ) + time;
                Sesion.update({_id : grupo.sesion_id },{$set:{instancia3: tiempoNew}})
                break;

        case 4: var tiempoNew =  ( parseInt(sesion.instancia4) ) + time;
                Sesion.update({_id : grupo.sesion_id },{$set:{instancia4: tiempoNew}})
                break;

        case 5: var tiempoNew =  ( parseInt(sesion.instancia5) ) + time;
                Sesion.update({_id : grupo.sesion_id },{$set:{instancia5: tiempoNew}})
                break;

        case 6: var tiempoNew =  ( parseInt(sesion.instancia6) ) + time;
                Sesion.update({_id : grupo.sesion_id },{$set:{instancia6: tiempoNew}})
                break;
      }

      var instancia = sesion.instActual;
      var minutos = time ; //SUMARLE EL TIEMPO RESTANTE

      //creo una nueva cuenta regresiva
      var datos = {
          sesion_id: grupo.sesion_id,
          instancia: instancia,
          countdown:0,
          tiempoT:minutos,
          submitted: new Date(),
      };
      //SesionTime.remove({sesion_id: grupo.sesion_id, instancia: instancia});
      SesionTime.insert(datos);
      stop_timer(grupo.sesion_id,minutos,instancia);
    

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
      var sesion = Sesion.findOne( {_id:  grupo.sesion_id} ); 
      var instancia = 0;

      if(sesion.instActual == -1)
      {  
        Sesion.update({_id : grupo.sesion_id },{$set:{instActual: instancia }});
        var datos = {
            sesion_id: grupo.sesion_id,
            instancia: instancia,
            countdown:0,
            tiempoT:minutos,
            submitted: new Date(),
        };
        SesionTime.remove({sesion_id: grupo.sesion_id, instancia: instancia});
        SesionTime.insert(datos);
        //var sesionT = SesionTime.findOne( {sesion_id:  grupo.sesion_id} ); 
        //console.log(sesionT);
        stop_timer(grupo.sesion_id,minutos,instancia);
      }
        

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
*/