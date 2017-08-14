Meteor.methods({

getRol:function(){
	var rol;
	if (!this.userId) {
      throw new Meteor.Error('Acceso invalido',
        'Ustede no esta logeado');
    };
    rol=Meteor.users.findOne({_id:this.userId}).rol;
    console.log("getRol: "+ rol);
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


})