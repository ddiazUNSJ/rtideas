// import { Template } from 'meteor/templating';
// import { ReactiveVar } from 'meteor/reactive-var';
// import { Images } from '/both/lib/image.collection.js';
// //import { Schema } from '/both/collections/inscripcion.js';

// import './uploadfiles.html';

Template.uploadedFiles.helpers({
  uploadedFiles: function () {
    return Images.find();
  }
});

