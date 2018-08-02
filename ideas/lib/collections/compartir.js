GruposComp = new Mongo.Collection('grupos_comp');

GruposCompSchema=new SimpleSchema
({

  sesion_id: { 
        type: String,
        label: "Id de la sesion",
      },
  gruposIds:{
        type: [String],
        label: "Ids de grupos",
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

GruposCompBasicSchema=new SimpleSchema
({
  sesion_id: { 
        type: String,
        label: "Id de la sesion",
      },
  gruposIds:{
        type: [String],
        label: "Ids de grupos",
  },
});

GruposComp.attachSchema(GruposCompSchema);

if (Meteor.isServer)
{
    Meteor.methods
    ({
      compartirGInsert: function(datos_grupo_comp) //se verifica q el ususario este autenticado
      {
            check(datos_grupo_comp,GruposCompBasicSchema); 

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


            var grupos=datos_grupo_comp.gruposIds;
            var idsesion=datos_grupo_comp.sesion_id;

            /*var grupocomp = GruposComp.findOne({sesion_id: idsesion});
            if(grupocomp)
            {
               return GruposComp.update( {_id:grupocomp._id}, { $set: { gruposIds: grupos } } );
            }   
            else {*/

                  var user = Meteor.user();    
              	  var data = 
                  {
                    sesion_id: idsesion,
                    gruposIds: grupos,
            		    author: user.username,
                    submitted: new Date(),        
                    estado: true,
                  };

                  var sesion = Sesion.findOne({_id:idsesion});
                  if( (sesion.estado != 'Cerrado') && (sesion.estado != 'Ejecucion') ) // O TERMINADO
                  {
                     // Valida el documento , luego inserta   
                    check(data,GruposCompSchema);

                    return GruposComp.insert(data); 
                  }
                  else
                     throw new Meteor.Error('',
                      "no se puede insertar en esta instancia");
              
                //}              
         
      },// fin compartir GInsert

      gruposCompRemove: function(idregistro) //se verifica q el ususario este autenticado
      {
        //console.log(idsesion);
        check(idregistro,String);
       
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
        var user = Meteor.user(); 
        var registro = GruposComp.findOne({_id:idregistro});
        var sesion = Sesion.findOne({_id:registro.sesion_id});
        if( (sesion.estado != 'Cerrado') && (sesion.estado != 'Ejecucion') ) // O TERMINADO
          return GruposComp.remove(idregistro);
        else
           throw new Meteor.Error('',
            "no se puede eliminar en esta instancia");
     },



    });// fin de  Meteor.methods
}// fin if