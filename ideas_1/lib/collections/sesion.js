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
      case 7:
          var minutos=sesion.instancia7;
            break;  
       case 8:
            var minutos=sesion.instancia8;
             break;   
      default:  
            var minutos=-1;
                 break;
    }

    return minutos;
}

//sumar minutos
function summarMinutos(inicio, fin)
{  
    var arre, arre2 = new Array();
    arre = inicio.split(":");
    //arre2 = fin.split(":");
    arre2 = fin;


    inicioMinutos = parseInt(arre[1]);
    inicioHoras = parseInt(arre[0]); 

    if(arre2[1])
      finMinutos = parseInt(arre2[1]);
    else
      finMinutos=0;
    //finHoras = parseInt(arre2[0]);
    finHoras = parseInt(arre2);

    transcurridoMinutos = finMinutos + inicioMinutos;
    transcurridoHoras = finHoras + inicioHoras;
    
    if (transcurridoMinutos >= 60) {
      transcurridoHoras++;
      transcurridoMinutos = transcurridoMinutos - 60;
    }

    //if ( transcurridoHoras > 23 )
       // transcurridoHoras = transcurridoHoras - 24;
    
    horas = transcurridoHoras.toString();
    minutos = transcurridoMinutos.toString();
    
    if (horas.length < 2) {
      horas = "0"+horas;
    }
    
    if (minutos.length < 2) {
      minutos = "0"+minutos;
    }
    
    return horas+":"+minutos;
}


//Cuenta Regresiva
function set_timer(sesionId, minutos, segundos,instancia)
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
      case 6:
            newIns=7;
            newMin=sesion.instancia7;
             break; 
      case 7:
          newIns=8;
          newMin=sesion.instancia8;
           break;      
      default: newIns=9; //termina
                 break;
    }

      var countdown = new ReactiveCountdown(segundos, {
        // Value substracted every tick from the current countdown value
        steps: 1,  
        // Specify the countdown's interval in milliseconds
        interval: 1000,
        // Callback: Tick, called on every interval
        tick: function() {
            var seg = countdown.get();
            var min = parseInt(seg/60);
            
            //console.log(min+':'+seg%60); 
            var cuenta = min+':'+seg%60;
            //Sesion.update({_id : sesionId},{$set:{countdown: cuenta }});  

            SesionTime.update({sesion_id : sesionId, instancia: instancia, tiempoT:minutos},{$set:{countdown: cuenta }});  
        },
        // Callback: Complete, called when the countdown has reached 0
        completed: function() {},
      });

      countdown.start(function() {
          // do something when this is completed
          console.log('terminada: '+instancia);
          SesionTime.remove({sesion_id: sesionId, instancia: instancia, tiempoT:minutos});

          if(newIns < 9) //no existe la 9
          {
            var sesionaux = Sesion.findOne( {_id:  sesionId} ); 
            //interumpo la cuenta regresiva, debido a que el animador pasó de instancia, o agregó tiempo
             var sesionT = SesionTime.findOne( {sesion_id: sesionId, instancia: instancia},{ sort: {submitted: -1}} );
            
            if( (newIns > sesionaux.instActual) && (!sesionT) )
            {  
              var datos = {
                  sesion_id: sesionId,
                  instancia: newIns,
                  countdown:0,
                  tiempoT:newMin,
                  submitted: new Date(),
              };

              Sesion.update({_id : sesionId },{$set:{instActual: newIns }}); 

              SesionTime.remove({sesion_id: sesionId, instancia: newIns});
              SesionTime.insert(datos);

              set_timer(sesionId,newMin,newMin*60,newIns);

            }
            else //cuando corta debe eliminar la instancia que termina
               SesionTime.remove({sesion_id: sesionaux._id, instancia: instancia });

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


      if(instancia < 9) //no existe la 9
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
        set_timer(grupo.sesion_id,minutos,minutos*60,instancia);
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
      var instancia = sesion.instActual;

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
        case 6: Sesion.update({_id : grupo.sesion_id },{$set:{instancia6: ( parseInt(sesion.instancia6) ) + time}});
                break;
        case 7: Sesion.update({_id : grupo.sesion_id },{$set:{instancia7: ( parseInt(sesion.instancia7) ) + time}});
                break;
        case 8: Sesion.update({_id : grupo.sesion_id },{$set:{instancia8: ( parseInt(sesion.instancia8) ) + time}});
                break;
      }

     
    
      var sesiontime = SesionTime.findOne( {sesion_id:  grupo.sesion_id, instancia:instancia },{ sort: {submitted: -1}} );
      var tiemporestante  = sesiontime.countdown;

      var minutos = summarMinutos(tiemporestante, time);

      var aux = new Array();
      aux = minutos.split(":");
           
      var datos = {
            sesion_id: grupo.sesion_id,
            instancia: instancia,
            countdown: 0,
            tiempoT:minutos,
            submitted: new Date(),
        };
      //SesionTime.remove({sesion_id: grupo.sesion_id, instancia: instancia});
      SesionTime.insert(datos);
      set_timer(grupo.sesion_id,minutos,((aux[0]*60)+aux[1]),instancia);

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
        set_timer(grupo.sesion_id,minutos,minutos*60,instancia);
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




});*/
