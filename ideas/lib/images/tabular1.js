
// import { Template } from 'meteor/templating';
// import moment from 'moment';
// import { Meteor } from 'meteor/meteor';
// import { Books } from './collections/Books';
import Tabular from 'meteor/aldeed:tabular';
import {dropboxF} from './usedropbox.js' 

TabularTables = {};

Meteor.isClient && Template.registerHelper('TabularTables', TabularTables);

  TabularTables.myFiles=new Tabular.Table({
  name: "myFiles",
  collection: dropboxF.collection,
  columns: [
    {data: "name", title: "nombre"},
    {data: "userId", title: "cod. Author"},
    {data: "_id", title: "cod. Imagen"},
    {data: "versions.original.meta.pipeFrom", title: "url"},
    {
      tmpl: Meteor.isClient && Template.eliminarActualizar
    }
    ]
  });

TabularTables.usuarios=new Tabular.Table({
  name: "usuarios",
  collection: Meteor.users,
  // selector:function() {
  //   var usuariosTodos= Meteor.users.find({}, {fields: {_id: 1, profile: 1, rol:1, active:1}});
  //   var usuariosTodosIds=usuariosTodos.map(function(p) { return p._id });
  //   var usuariosTodosIds=usuariosTodos.map(function(p) { return p._id });
  //   var usuariosTodosName=usuariosTodos.map(function(p) { return p.profile.nombre });
  //   console.log("usuariosTodos");
  //   console.log(usuariosTodosIds);
    
  //   return { _id:{$in: usuariosTodosIds} }
  // },
  allow(userId) {
    var usuario=Meteor.users.findOne({_id:userId});
   // console.log("usuario en allow-TabularTables.usuarios: "+usuario);
    var rol= usuario.rol;
    //console.log("rol en allow-TabularTables.usuarios: "+rol);
    var salida=false;
    if (rol==="Administrador") {salida=true};
    console.log("salida allow TabularTables.usuarios: "+salida);
    return salida; // don't allow this person to subscribe to the data
  },
  columns: [
     {data:"_id", title:"idUser"},
    {data: "profile.nombre", title: "nombre"},
    {data: "active", title: "Activo"},
    {data: "rol", title: "Rol"},
    {
      tmpl: Meteor.isClient && Template.usersActionBtns, class: "col-md-1"
    }
    ]
  });

TabularTables.inscripTab=new Tabular.Table({
  name: "inscripTab",
  collection: Inscripcion,
  allow(userId) {
    //Chequea que solo el usuario administrador tenga acceso a ver la tabla inscripTab
    var usuario=Meteor.users.findOne({_id:userId});
    var salida=false;
    if (usuario.rol==="Administrador") {salida=true};
    console.log("salida allow - TabularTables.inscripTab: "+salida);
    return salida; // don't allow this person to subscribe to the data
  },
  columns: [
    {data: "_id", title: "cod Inscri"},
    {data: "nombre", title: "nombre"},
    {data: "userId",title:"idusuario"},
    {data: "sesion", title: "sesion"},
    {data: "estadoInscripcio", title: "estado"},
   // {data: "active", title: "Activo"},
   
    {
      tmpl: Meteor.isClient && Template.gi_ActionBtns, class: "col-md-1"
    }
    ]
  });

//DD31/08/2017 
TabularTables.selInscripTab=new Tabular.Table({
  name: "selInscripTab",
  collection: Inscripcion,
  allow(userId) {
    //Chequea que solo el usuario administrador tenga acceso a ver la tabla inscripTab
    var usuario=Meteor.users.findOne({_id:userId});
    var salida=false;
    if (usuario.rol==="Administrador") {salida=true};
    console.log("salida allow - TabularTables.selInscripTab: "+salida);
    return salida; // don't allow this person to subscribe to the data
  },
  // selector:function(){
  //     console.log("Session.get_sesionCActual:",Session.get("sesionCActual"));
  //     return{sesion:Session.get("sesionCActual"), estadoInscripcio: { $in: ['pendiente', 'no_aceptado' ] } };
  //   },  
  columns: [
    {data: "_id", title: "cod Inscri", visible: false},
    {data: "userId",title:"idusuario",visible: false},
    {data: "nombre", title: "nombre"},
    {data: "sesion", title: "sesion",visible: false},
    {data: "estadoInscripcio", title: "estado"},
   
   
    {
      tmpl: Meteor.isClient && Template.gp_selInscriActionBtns, class: "col-md-1"
    }
    ]
  });

//DD 28/08/2017
// Datos para la tabla de gestion de animadores
TabularTables.animadorTab=new Tabular.Table({
  name: "animadorTab",
  collection: Animadores,

   allow(userId) {
    //Chequea que solo el usuario administrador tenga acceso a ver la tabla animadores
    var usuario=Meteor.users.findOne({_id:userId});
    var salida=false;
    if (usuario.rol==="Administrador") {salida=true};
    console.log("salida allow - TabularTables.animadorTab: "+salida);
    return salida; // don't allow this person to subscribe to the data
  },

  columns: [
    {data: "_id", title: "cod Animador"},
    {data: "iduser",title:"idusuario"},
    {data: "nombre", title: "nombre"},
    {data: "active", title: "Activos"},
   
    {
      tmpl: Meteor.isClient && Template.ga_ActionBtns, class: "col-md-1"
    }
    ]
  });

TabularTables.usuariosParaAni=new Tabular.Table({
  name: "usuariosParaAni",

  collection: Meteor.users,
  allow(userId) {
    //Chequea que solo el usuario administrador tenga acceso a ver la tabla usuariosParaAni
    var usuario=Meteor.users.findOne({_id:userId});
    var salida=false;
    if (usuario.rol==="Administrador") {salida=true};
    console.log("salida allow - TabularTables.usuariosParaAni: "+salida);
    return salida; // don't allow this person to subscribe to the data
  },
  
  selector:function() {

    // Buscamos todos los animadores que estan activos
    var AnimadoresOn = Animadores.find({active: true});

    // listamos el userId de los animadores activos
    var idUserAnimadoresOn = AnimadoresOn.map(function(p) { return p.iduser });

    var noAnimators= Meteor.users.find({ _id:{$nin: idUserAnimadoresOn}, active:true}, {fields: {_id: 1, profile: 1, rol:1, active:1}});
    var noAnimatorsArray=noAnimators.map(function(p) { return p._id });
    var noAnimatorsNameArray=noAnimators.map(function(p) { return p.profile.nombre });

    // console.log("noAnimators from selector:");
    // console.log(noAnimatorsArray);
    // console.log(noAnimatorsNameArray);
    return { _id:{$in: noAnimatorsArray} }
  },
  responsive: true,

  columns: [
    {data: "_id", title: "id Usuario"},
    {data: "profile.nombre", title: "nombre"},
    
    {
      tmpl: Meteor.isClient && Template.ga_usersActionBtns, class: "col-md-1"
    }
    ]
  });

//DD 29/08/2017
// Datos para la tabla de gestion de participantes
TabularTables.participantesTab=new Tabular.Table({
  name: "participantesTab",
  collection: Users_sesions,

   allow(userId) {
    //Chequea que solo el usuario administrador tenga acceso a ver la tabla animadores
    var usuario=Meteor.users.findOne({_id:userId});
    var salida=false;
    if (usuario.rol==="Administrador") {salida=true};
    console.log("salida allow - TabularTables.participantesTab: "+salida);
    return salida; // don't allow this person to subscribe to the data
  },

  columns: [
    {data: "_id", title: "cod user-sesion"},
    {data: "nombre", title: "nombre"},
    {data: "iduser",title:"idusuario"},
    {data: "idsesion", title: "SesionId"},
    {data: "rol", title: "Rol"},
   
    {
      tmpl: Meteor.isClient && Template.gp_ActionBtns, class: "col-md-1"
    }
    ]
  });

