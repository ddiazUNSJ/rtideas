GruposComp = new Mongo.Collection('grupos_comp');

GruposCompSchema=new SimpleSchema
({

  sesion_id: { 
        type: Number,
        label: "Id de la sesion",
      },
  gruposIds:{
        type: Number,
        label: "Id de grupo",
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

GruposBasicSchema=new SimpleSchema
({
  sesion_id: { 
        type: Number,
        label: "Id de la sesion",
      },
  gruposIds:{
        type: Number,
        label: "Id de grupo",
  },
});

GruposComp.attachSchema(GruposCompBasicSchema);
GruposComp.attachSchema(GruposCompSchema);

if (Meteor.isServer)
{
    Meteor.methods
    ({
      compartirGInsert: function(datos_grupo_comp) //se verifica q el ususario este autenticado
      {
            check(datoscomentarios,ComentariosBasicSchema); 
             
             var grupos=datos_grupo_comp.grupos;
             var idsesion=datos_grupo_comp.idsesion;

             var user = Meteor.user();    
        	   var data = 
              {
                sesion_id:datos_grupo_comp.idsesion,
                gruposIds:datos_grupo_comp.grupos,
        		    author: user.username,
                submitted: new Date(),        
                estado: true,
              };

      GruposComp.remove({sesion_id: idsesion}); 
      // Valida el documento , luego inserta nueva tematica   
      check(data,GruposCompSchema);

      return Comentarios.insert(data);               
         
       }// fin compartir GInsert
    });// fin de  Meteor.methods
},// fin if