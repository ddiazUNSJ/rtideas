Sesion = new Mongo.Collection('sesion');


// "_id" : "PaAdymb5DTTYtZ3cd",
//     "tematica_id" : "t58p2YhAZecscBXCY",
//     "nombre" : "Diciembre2017",
//     "fecha1" : "12/01/2017",
//     "fecha2" : "12/04/2017",
//     "hora1" : "12:00",
//     "hora2" : "12:00",
//     "instancia1" : "1",
//     "instancia2" : "1",
//     "instancia3" : "1",
//     "instancia4" : "1",
//     "instancia5" : "1",
//     "instancia6" : "1",
//     "instancia7" : "1",
//     "instancia8" : "1",
//     "userId" : "z5L5gBYKCtuyjzhg3",
//     "author" : "ddiaz",
//     "submitted" : ISODate("2017-08-31T11:39:10.444Z"),
//     "estado" : "activa",
//     "instActual" : -1
SesionSchema = new SimpleSchema({
 
  tematica_id: {
        type: String,
        label: "IdTematica",
      },

  nombre: {
        type: String,
        label: "nombre",
      },
  fecha1: {
        type: String,
        label: "fecha1",
      },

  fecha2: {
        type: String,
        label: "fecha2",
      },
  hora1: {
        type: String,
        label: "hora1",
      },
  hora2: {
        type: String,
        label: "hora2",
      },
  instancia1: {
        type: String,
        label: "instancia1",
      },    
  instancia2: {
        type: String,
        label: "instancia2",
      }, 
  instancia3: {
        type: String,
        label: "instancia3",
      },    
  instancia4: {
        type: String,
        label: "instancia4",
      },
   instancia5: {
        type: String,
        label: "instancia5",
      },    
  instancia6: {
        type: String,
        label: "instancia6",
      }, 
  instancia7: {
        type: String,
        label: "instancia7",
      },    
  instancia8: {
        type: String,
        label: "instancia8",
      }, 
  userId: {
        type: String,
        label: "userId",
      },  
  author: {
        type: String,
        label: "author",
      }, 
   
  submitted: {
        type: Date,
        label: "submitted",
      },  
   
  estado: {
        type: String,
        label: "estado",
      },  
  instActual: {
        type: Number,
        label: "instanciaActual",
      },                             
});


SesionBasicSchema = new SimpleSchema({
 
  tematica_id: {
        type: String,
        label: "IdTematica",
      },
  nombre: {
        type: String,
        label: "nombre",
      },
  fecha1: {
        type: String,
        label: "fecha1",
      },
  fecha2: {
        type: String,
        label: "fecha2",
      },
  hora1: {
        type: String,
        label: "hora1",
      },
  hora2: {
        type: String,
        label: "hora2",
      },
  instancia1: {
        type: String,
        label: "instancia1",
      },    
  instancia2: {
        type: String,
        label: "instancia2",
      }, 
  instancia3: {
        type: String,
        label: "instancia3",
      },    
  instancia4: {
        type: String,
        label: "instancia4",
      },
   instancia5: {
        type: String,
        label: "instancia5",
      },    
  instancia6: {
        type: String,
        label: "instancia6",
      }, 
  instancia7: {
        type: String,
        label: "instancia7",
      },    
  instancia8: {
        type: String,
        label: "instancia8",
      }, 
});

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
function stop_timer(sesionId,minutos,segundos,instancia,fechaA)
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
            //SesionTime.update({sesion_id : sesionId, instancia: instancia},{$set:{countdown: cuenta }});  
            SesionTime.update({sesion_id : sesionId, instancia: instancia, tiempoT:minutos},{$set:{countdown: cuenta }});  

        },
        // Callback: Complete, called when the countdown has reached 0
        completed: function() {},
      });

      countdown.start(function() {
          // do something when this is completed
          console.log('terminada: '+instancia);
          //SesionTime.remove({sesion_id: sesionId, instancia: instancia});
          SesionTime.remove({sesion_id: sesionId, instancia: instancia, submitted:fechaA});


          if(newIns < 9) //no existe la 9
          {
            //var sesionaux = Sesion.findOne( {_id:  sesionId} ); 
            //interumpo la cuenta regresiva, debido a que el animador pasó de instancia o agregó tiempo
            //Importante: si hay una cuenta regresiva de la misma instancia y mas actual, entonces la cuenta que termina es antigua: no seguir.
            //var sesionT = SesionTime.findOne( {sesion_id: sesionId, instancia: instancia},{ sort: {submitted: -1}} );
            var sesionT = SesionTime.findOne( {sesion_id: sesionId},{ sort: {submitted: -1}} );
            //var sesionT = SesionTime.findOne({ sesion_id:sesionId, instancia:instancia, submitted:{$gt:fechaA} });

            /*if(sesionT)
            {  
              console.log(fechaA);
              console.log(sesionT.submitted);
              if(sesionT.submitted <= fechaA)
                var ban=1;                
              else var ban=0;
            }
            else var ban=1;*/
            


            //if(newIns > sesionaux.instActual) 
            //if( (newIns > sesionaux.instActual) && (ban) )
            //solo continúo si la cuenta regresiva que termina (ésta) es la mas actual
            if( (!sesionT) || ( sesionT && sesionT.submitted <= fechaA ) )
            {  
              var fechaAnew = new Date();
              var datos = {
                  sesion_id: sesionId,
                  instancia: newIns,
                  countdown:0,
                  tiempoT:newMin,
                  submitted:fechaAnew,
              };

              Sesion.update({_id : sesionId },{$set:{instActual: newIns }}); 

              SesionTime.remove({sesion_id: sesionId, instancia: newIns});
              SesionTime.insert(datos);

              stop_timer(sesionId,newMin,newMin*60,newIns,fechaAnew);

            }
            else //cuando corta debe eliminar la instancia anterior en la coleccion
               SesionTime.remove({sesion_id: sesionId, instancia: instancia, submitted:fechaA});

          }
          else  console.log('fin');

      });

      var seg = countdown.get();
      var min = parseInt(seg/60);
      console.log(min+':'+seg%60);

          
}


Meteor.methods({

      sesionInsert: function(datosSesion) //se verifica q el ususario este autenticado
        {
           // validacion 
          check(datosSesion,SesionBasicSchema);

          console.log("pase validacion datos sesion");
          //Verifica Identidad y autorizacion para crear sesion
              if (!this.userId) {
                   throw new Meteor.Error('Acceso invalido',
                  'Ustede no esta logeado');
                 }
              else // verifica si tiene privilegios de administrador
               { 
                usuario= Meteor.users.findOne({_id: this.userId});
                rol=usuario.rol;
                if  (rol!="Administrador") 
                {
                    console.log("error no es administrador");
                    throw new Meteor.Error('Acceso invalido',
                    ' Para acceder a esta funcionalidad necesita ser Administrador');
                }
               }
                // Si esta autorizado comienza proceso
          
          var user = Meteor.user(); // Estoy servidor 
          var docSesion={
            tematica_id:datosSesion.tematica_id,
            nombre:datosSesion.nombre,
            fecha1:datosSesion.fecha1,
            fecha2:datosSesion.fecha2,
            hora1:datosSesion.hora1,
            hora2:datosSesion.hora2,
            instancia1:datosSesion.instancia1,
            instancia2:datosSesion.instancia2,
            instancia3:datosSesion.instancia3,
            instancia4:datosSesion.instancia4,
            instancia5:datosSesion.instancia5,
            instancia6:datosSesion.instancia6,
            instancia7:datosSesion.instancia7,
            instancia8:datosSesion.instancia8,
            userId: user._id,
            author: user.username,
            submitted: new Date(),
            estado: 'activa',
            instActual: -1
            }       
                // Valida el documento , luego inserta nueva sesion   
                check(docSesion, SesionSchema)
        return Sesion.insert(docSesion);
        },   


//----Old---Eliminar
  // sesionInsert: function(crAttributes) //se verifica q el ususario este autenticado
  // {
  //   check(Meteor.userId(), String);
  //   // check(crAttributes, {
  //   //    SC: String
  //   // });
  //   check(crAttributes, Match.Where(function(crAttributes){
  //       _.each(crAttributes, function (doc) {
  //         // do your checks and return false if there is a problem 
  //       });
  //       // return true if there is no problem
  //       return true;

  //     }));

  //   var user = Meteor.user();
  //   var datos = _.extend(crAttributes, {
  //     userId: user._id,
  //     author: user.username,
  //     submitted: new Date(),
	 //    estado: 'activa',
  //     instActual: -1
  //   });
  //   var crId = Sesion.insert(datos);
  //   return {
  //     _id: crId
  //   };
  // },


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
    var SesionUser = Users_sesions.findOne({iduser:user._id, idsesion:crAttributes.idsesion });

    if(SesionUser.rol == 'Animador')
    {
      //var grupo = Grupo.findOne( {_id: crAttributes.idgrupo} ); 
      var sesion = Sesion.findOne( {_id:  crAttributes.idsesion} ); 
      var instancia = sesion.instActual + 1;
      var minutos = tpo_instancia(sesion._id, instancia);


      if(instancia < 9) //no existe la 9
      {
        Sesion.update({_id : sesion._id },{$set:{instActual: instancia }});

        //creo una nueva cuenta regresiva
        var fechaAnew = new Date();
        var datos = {
            sesion_id: sesion._id,
            instancia: instancia,
            tiempoT:minutos,
            countdown:0,
            submitted: fechaAnew,
        };
        SesionTime.remove({sesion_id: sesion._id, instancia: instancia});
        SesionTime.insert(datos);
        stop_timer(sesion._id,minutos,minutos*60,instancia,fechaAnew);
      }

      return {
        _id: sesion._id
      };
    }
    else  return {
            _id: 0
          };
    
  },

  irInstantciaX: function(crAttributes) //se verifica q el ususario este autenticado
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
    /*var datosUsu = Meteor.users.find({_id: user._id});
    var RolUsu='';
    datosUsu.forEach( function(myDoc) 
    {
       RolUsu = myDoc.rol; 
    });*/
    var SesionUser = Users_sesions.findOne({iduser:user._id, idsesion:crAttributes.idsesion });

    if(SesionUser.rol == 'Animador')
    {
      //var grupo = Grupo.findOne( {_id: crAttributes.idgrupo} ); 
      var sesion = Sesion.findOne( {_id:  crAttributes.idsesion} ); 
      var instancia = crAttributes.instanciaX;
      var minutos = tpo_instancia(sesion._id, instancia);


      if(instancia < 9) //no existe la 9
      {
        Sesion.update({_id : sesion._id },{$set:{instActual: instancia }});

        //creo una nueva cuenta regresiva
        var fechaAnew = new Date();
        var datos = {
            sesion_id: sesion._id,
            instancia: instancia,
            tiempoT:minutos,
            countdown:0,
            submitted: fechaAnew,
        };
        //SesionTime.remove({sesion_id: sesion._id, instancia: instancia});
        SesionTime.insert(datos);
        stop_timer(sesion._id,minutos,minutos*60,instancia,fechaAnew);
      }

      return {
        _id: sesion._id
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
    
    var SesionUser = Users_sesions.findOne({iduser:user._id, idsesion:crAttributes.idsesion });

    if(SesionUser.rol == 'Animador')
    {
      //var grupo = Grupo.findOne( {_id: crAttributes.idgrupo} ); 
      var sesion = Sesion.findOne( {_id:  crAttributes.idsesion} ); 
      var instancia = sesion.instActual;

      switch(sesion.instActual)
      {
        case 1: Sesion.update({_id : sesion._id },{$set:{instancia1: ( parseInt(sesion.instancia1) ) + time}});
                break;
        case 2: Sesion.update({_id : sesion._id },{$set:{instancia2: ( parseInt(sesion.instancia2) ) + time}});
                break;
        case 3: Sesion.update({_id : sesion._id },{$set:{instancia3: ( parseInt(sesion.instancia3) ) + time}});
                break;
        case 4: Sesion.update({_id : sesion._id },{$set:{instancia4: ( parseInt(sesion.instancia4) ) + time}});
                break;
        case 5: Sesion.update({_id : sesion._id },{$set:{instancia5: ( parseInt(sesion.instancia5) ) + time}});
                break;
        case 6: Sesion.update({_id : sesion._id },{$set:{instancia6: ( parseInt(sesion.instancia6) ) + time}});
                break;
        case 7: Sesion.update({_id :sesion._id },{$set:{instancia7: ( parseInt(sesion.instancia7) ) + time}});
                break;
        case 8: Sesion.update({_id : sesion._id },{$set:{instancia8: ( parseInt(sesion.instancia8) ) + time}});
                break;
      }

     
    
      var sesiontime = SesionTime.findOne( {sesion_id:  sesion._id, instancia:instancia },{ sort: {submitted: -1}} );
      var tiemporestante  = sesiontime.countdown;

      var minutos = summarMinutos(tiemporestante, time);

      var aux = new Array();
      aux = minutos.split(":");
      
      var fechaAnew = new Date();
      var datos = {
            sesion_id: sesion._id,
            instancia: instancia,
            countdown: 0,
            tiempoT:minutos,
            submitted: fechaAnew,
        };
      //SesionTime.remove({sesion_id:sesion._id, instancia: instancia});
      SesionTime.insert(datos);
      var segundos = parseInt(aux[0]*60)+parseInt(aux[1]);
      stop_timer(sesion._id,minutos,segundos,instancia, fechaAnew);

      return {
        _id: sesion._id
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
    var SesionUser = Users_sesions.findOne({iduser:user._id, idsesion:crAttributes.idsesion });

    if(SesionUser.rol == 'Animador')
    {
      var minutos = crAttributes.minutos; //minutos para comenzar
      //var grupo = Grupo.findOne( {_id: crAttributes.idgrupo} ); 
      var sesion = Sesion.findOne( {_id:  crAttributes.idsesion} ); 
      var instancia = 0;

      if(sesion.instActual == -1)
      {  
        Sesion.update({_id : sesion._id },{$set:{instActual: instancia }});
        
        var fechaAnew = new Date();
        var datos = {
            sesion_id: sesion._id,
            instancia: instancia,
            tiempoT:minutos,
            countdown:0,
            submitted: fechaAnew,
        };
        SesionTime.remove({sesion_id: sesion._id, instancia: instancia});
        SesionTime.insert(datos);
        //var sesionT = SesionTime.findOne( {sesion_id:  grupo.sesion_id} ); 
        //console.log(sesionT);
        stop_timer(sesion._id,minutos,minutos*60,instancia,fechaAnew);
      }
        

      return {
        _id: sesion._id
      };
    }
    else  return {
            _id: 0
          };
    
  },



});
