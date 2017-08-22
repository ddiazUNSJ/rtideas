import Tabular from 'meteor/aldeed:tabular';

Inscripcion = new Mongo.Collection('inscripcion');

var Schemas = {};

Schemas.InscripcionSchema = new SimpleSchema({
    nombre: {
        type: String,
        label: "Nombre",
       
    },
    userId: {
        type: String,
        label: "IdUsuario"
    },
    sesion: {
        type: String,
        label: "id sesion",
    },
    activa: {
        type: Boolean,
        label: "activa/noActiva", // indicada si la inscripcion esta activa o cerrada

    }

    ,
    estadoInscripcio: {
        type: String,
        label: "Estado de la inscripcion", // deberia tener  tres estados, (pendiente, aceptado, no aceptado)
        allowedValues: [
         'pendiente',
         'aceptado',
         'no_aceptado'
         ],
        optional: true  //Deberiamos poner una validacion que permita solo tres string los mencionados
    },

    estadoRazones: {
        type: String,
        label: "Describe las razones del Estado", // es para mostrar en la IU el porque del estado de la inscripcion (pendiente, aceptado, no aceptado)
        optional: true
    },
    
    grupo: {
        type: String,
        label: "Id Grupo",
        optional: true,
    },
    nombreGrupo: {
        type: String,
        label: "nombre Grupo",
        optional: true,
        
    }
});


Inscripcion.attachSchema(Schemas.InscripcionSchema);



Meteor.methods({
  inscripcionInsert:function(sesioncId)
  { 
    check(sesioncId,String);
   // check(doc, Inscripcion.simpleSchema());
  //  console.log("sesioncId: "+sesioncId);
    // check( doc,{dato1:String,dato2:String});
    //   console.log("dato1: "+doc.dato1+"  dato2:"+doc.dato2);
    // // check( doc,{
    //     sesioncId:String,
    // });
     var nombreU=Meteor.call('getUserNombre')
     var datos = {
                nombre:nombreU,
                userId:this.userId,
                sesion:sesioncId,
                activa:true,
                estadoInscripcio:"Pendiente",
                estadoRazones:"Procesando la Inscripcion"

        };
        Inscripcion.simpleSchema().validate(datos, {check});
     //check(datos, Inscripcion.simpleSchema());
    return Inscripcion.insert(datos);
 //return true;
  },
  /*InsertInscripcion: function(IAttributes) //se verifica q el ususario este autenticado
  {
    check(Meteor.userId(), String);
    check(IAttributes, {
      idgrupo: String,
      idrol: String,
      iduser:String,
    });

    
    var user = Meteor.user();
    var users_sesions = _.extend(IAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date(),
    estado: 'activa'
    });
    var IId = Users_sesions.insert(users_sesions);
    return {
      _id: IId
    };
  }*/
});

