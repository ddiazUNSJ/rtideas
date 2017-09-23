Tematica = new Mongo.Collection('tematica');

TematicaSchema=new SimpleSchema({
  SC: {
        type: String,
        label: "Nombre Tematica",
        minCount: 1,
        maxCount: 50,
        },
  Des: {
        type: String,
        label: "Descripcion",
      }, 
  userId: { //persona quien gestiona ABM animador
        type: String,
        label: "id User Creador",
      },
  author: { //persona quien gestiona ABM animador
        type: String,
        label: "Nombre User Creador",
      },
  submitted: {// fecha de alta animador
        type: Date,
        label: "fechayhora Creacion",
       },
  estado: {
        type: Boolean,
        label: "on/off", // indicada si la tematica esta activa o no, 
       },
});

TematicaBasicSchema=new SimpleSchema({
  SC: {
        type: String,
        label: "Nombre Tematica",
        minCount: 1,
        maxCount: 50,
        },
  Des: {
        type: String,
        label: "Descripcion",
      }, 
});

Tematica.attachSchema(TematicaBasicSchema);
Tematica.attachSchema(TematicaSchema);



if (Meteor.isServer)
{
  Meteor.methods({

    tematicaInsert: function(datosTematica) //se verifica q el ususario este autenticado
    { 

      check(datosTematica,TematicaBasicSchema);


      /*check(Meteor.userId(), String);
      check(crAttributes, {
        Des: String,
        SC: String
      });*/

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
      var docTematica={
        SC:datosTematica.SC,
        Des:datosTematica.Des,
        userId: user._id,
        author: user.username,
        submitted: new Date(),
        estado: true,
        }       
      // Valida el documento , luego inserta nueva tematica   
      check(docTematica, TematicaSchema)
      
      /*var user = Meteor.user();
      var datos = _.extend(crAttributes, {
        userId: user._id,
        author: user.username,
        submitted: new Date(),
  	  estado: 'activa'
      });
      var crId = Tematica.insert(datos);
      return {
        _id: crId
      };*/

       return Tematica.insert(docTematica);
    }

  });

}
