/*isEmailExisting: function(emailToCheck) {
    console.log("emailToCheck; " + emailToCheck );
     // var count = Meteor.users.find({'email': emailToCheck}).count();
      var count = Meteor.users.find({ emails: { $elemMatch: { address: emailToCheck} } }).count();
      console.log("Encontre " + count+ " emails");
      return count > 0;
   },
*/
 

Meteor.methods({


//Carga un nuevo id  de avatar (idAvatar) en la colleccion usuarios
setIdAvatarEnUsers: function(idAvatar){
var idUser=this.userId;
if (!this.userId) {
      throw new Meteor.Error('Acceso invalido',
        'Ustede no esta logeado');
    };
console.log('cargando avatar en server');
	return Meteor.users.update({ _id: idUser }, { $set: { 'profile.avatarID': idAvatar }});
},

getNombre: function(){
console.log('obteniendo nombre de usuario');
	return Meteor.users.find({ _id: this.userId  }, { $set: { 'profile.avatarID': idAvatar }});
},

demeAvatarUrl:function(){
	
	var Usuario,avatarId,avatar,avatarUrl,idUser;
	idUser=this.userId;

	if (!this.userId) {
      throw new Meteor.Error('Acceso invalido',
        'Ustede no esta logeado');
    };
	console.log('carga url del avatar ');
	Usuario =Meteor.users.findOne({ _id: idUser });
	avatarId=Usuario.profile.avatarID;
	if ((avatarId ==="")||(avatarId ===undefined)||(avatarId === null)){
       avatarUrl= "img/p3.jpg";
       }
    else
      {
        avatar=dropboxF.collection.findOne({ _id: avatarId });
	    avatarUrl=avatar.versions.original.meta.pipeFrom;
     }   
	console.log(avatarUrl);
	return avatarUrl;
},

//preguntamos si hay nombre repetido
hayNombreRepetido: function(nameArg){
    if (!this.userId) {
      throw new Meteor.Error('Acceso invalido',
        'Ustede no esta logeado');
    };
   
	var count = dropboxF.collection.find({ name: nameArg }).count();
      console.log("Encontre " + count+ " nombre");
      if (count>0) {return true;}
      else {return false;}
      

	}



})