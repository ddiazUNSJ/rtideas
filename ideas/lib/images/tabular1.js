
// import { Template } from 'meteor/templating';
// import moment from 'moment';
// import { Meteor } from 'meteor/meteor';
// import { Books } from './collections/Books';
import Tabular from 'meteor/aldeed:tabular';

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
      tmpl: Meteor.isClient && Template.inscriActionBtns, class: "col-md-1"
    }
    ]
  });


