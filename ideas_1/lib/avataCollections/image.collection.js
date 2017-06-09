
// import {Mongo} from 'meteor/mongo';
// import {SimpleSchema} from 'meteor/aldeed:simple-schema';
// import {Meteor} from 'meteor/meteor';
// import { FilesCollection } from 'meteor/ostrio:files';




//export var Images = new FilesCollection({
  Images = new FilesCollection({
  storagePath:'/home/daniel/fotos',
  collectionName: 'Images',
 // allowClientCode: true, // Required to let you remove uploaded file
  onBeforeUpload: function (file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.ext)) {
      return true;
    } else {
      return 'Please pp  upload image, with size equal or less than 10MB';
    }
  }
})

if (Meteor.isClient) {
  Meteor.subscribe('files.images.all');
}

if (Meteor.isServer) {
  Meteor.publish('files.images.all', function () {
    return Images.collection.find({});
  });
}

Schemas = {};
Posts   = new Meteor.Collection('posts');
Schemas.Posts = new SimpleSchema({
  title: {
    type: String,
    max: 60
  },
  picture: {
    type: String,
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'Images',
        uploadTemplate: 'uploadField', // <- Optional
        previewTemplate: 'uploadPreview' // <- Optional
      }
    }
  }
});


Posts.attachSchema(Schemas.Posts);