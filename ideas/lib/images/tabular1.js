
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
  columns: [
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
  columns: [
    {data: "_id", title: "cod Inscri"},
    {data: "nombre", title: "nombre"},
    {data: "sesion", title: "sesion"},
    {data: "estadoInscripcio", title: "estado"},
    {data: "active", title: "Activo"},
   
    {
      tmpl: Meteor.isClient && Template.gi_ActionBtns, class: "col-md-1"
    }
    ]
  });

//DD 28/08/2017
// Datos para la tabla de gestion de animadores
TabularTables.animadorTab=new Tabular.Table({
  name: "animadorTab",
  collection: Animadores,
  columns: [
    {data: "_id", title: "cod Animador"},
    {data: "nombre", title: "nombre"},
    {data: "iduser", title: "cod Usuario"},
   
    {
      tmpl: Meteor.isClient && Template.ga_ActionBtns, class: "col-md-1"
    }
    ]
  });

TabularTables.usuariosParaAni=new Tabular.Table({
  name: "usuarios",
  collection: Meteor.users,
  columns: [
    {data: "_id", title: "id Usuario"},
    {data: "profile.nombre", title: "nombre"},
    
    {
      tmpl: Meteor.isClient && Template.ga_usersActionBtns, class: "col-md-1"
    }
    ]
  });

