Meteor.methods({

getUserRol:function(){
	var rol;
	if (!this.userId) {
      throw new Meteor.Error('Acceso invalido',
        'Ustede no esta logeado');
    };
    rol=Meteor.users.findOne({_id:this.userId}).rol;
    console.log("getUserRol: "+ rol);
	return rol;
},
isActiveUser:function(){
	var isActive;
	if (!this.userId) {
      throw new Meteor.Error('Acceso invalido',
        'Ustede no esta logeado');
    };
    isActive=Meteor.users.findOne({_id:this.userId}).active;
    console.log("isActive: "+ isActive);
	return isActive;
},

getUserNombre:function(){
    var rol;
    if (!this.userId) {
      throw new Meteor.Error('Acceso invalido',
        'Ustede no esta logeado');
    };
    nombre=Meteor.users.findOne({_id:this.userId}).profile.nombre;
    console.log("getUserNombre: "+ nombre);
    return nombre;
},

})