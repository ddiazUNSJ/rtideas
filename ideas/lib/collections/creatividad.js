// Creatividad = new Mongo.Collection('creatividad');


// Meteor.methods({
//   creatividadInsert: function(crAttributes) //se verifica q el ususario este autenticado
//   {
//     check(Meteor.userId(), String);
//     check(crAttributes, {
//       Des: String,
//       SC: String
//     });

    
//     var user = Meteor.user();
//     var creatividad = _.extend(crAttributes, {
//       userId: user._id,
//       author: user.username,
//       submitted: new Date(),
// 	  estado: 'activa'
//     });
//     var crId = Creatividad.insert(creatividad);
//     return {
//       _id: crId
//     };
//   }
// });
