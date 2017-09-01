

Inscripcion = new Mongo.Collection('inscripcion');

//var Schemas = {};

InscripcionSchema = new SimpleSchema({
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

modifierEstadoInscripcioSchema = new SimpleSchema({
  estadoInscripcio: {
        type: String,
        label: "Estado de la inscripcion", // deberia tener  tres estados, (pendiente, aceptado, no aceptado)
        allowedValues: [
         'pendiente',
         'aceptado',
         'no_aceptado'
         ]
    }
});

Inscripcion.attachSchema(InscripcionSchema);


if (Meteor.isServer)
{

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
                    estadoInscripcio:"pendiente",
                    estadoRazones:"Procesando la Inscripcion"

            };
            Inscripcion.simpleSchema().validate(datos, {check});
         //check(datos, Inscripcion.simpleSchema());
        return Inscripcion.insert(datos);
     //return true;
      },
      //DD 23/08/2017
      // Pone deshabilita la inscripcion, es como eliminar la inscripcion 
     inhabilitarinscripcion:function(inscriId)
     {
      check(inscriId,String);
      return Inscripcion.update({ _id: inscriId }, { $set: {'activa' : false }});

     },



      //DD 23/08/2017
      // Procesando la inscripcion comunmente pasamos estado pendiente a aceptada o no aceptada
      // Los parametos son
      // modifier :para este caso  es el  Mongo modifier { '$set': { estadoInscripcio: 'aceptado' } }
      // objID: es el identificador de documento de inscripcion ( el _id de Inscripcion)InscriId
      // en el caso de ser llamada desd autoform estos parametros los carga autoform directamente al 
      // hacer submit.

     updateEstadoInscripcion: function (modifier, objID) {

      console.log
      //Chequeo de seguridad - Verifica Identidad 
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

      //Mostrando lo que trae modifier
      console.log(modifier);
      //Validando mediante contexto al contenido de modifier es decir al estadoInscripcio
       var esvalido=modifierEstadoInscripcioSchema.namedContext().validate(modifier, {modifier: true});
       console.log("esvalido: ",esvalido);


      check(objID,String);
      check(modifier,modifierEstadoInscripcioSchema);
     //  return Inscripcion.update({ _id: inscriId }, { $set: {'activa' : false }});
      return Inscripcion.update(objID, modifier);
      },

      //DD 29/08/2017 
   //--- Busca en la coleccion inscriptos de la sesion de creatividad
   //--- todos aquellos inscriptos no aceptados y retorna una arreglo con 
   //--- el id de inscriptos que aun no han sido aceptados, es decir aun no han sido procesados 

   inscriptosNoAceptados:function(idSesion){
    check( idSesion,String);
   var inscriNoAceptados=Inscripcion.find({estadoInscripcio:{$nin:"aceptado"}});
   var inscriNoAceptadosArray=inscriNoAceptados.map(function(p) { return p._id });
   console.log("inscriNoAceptadosArray: "+inscriNoAceptadosArray);
   return inscriNoAceptadosArray
   },



          });



};

