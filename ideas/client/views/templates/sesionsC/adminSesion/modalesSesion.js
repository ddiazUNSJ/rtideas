

Template.modalesSesion.helpers({ 

  tematicas_Opts2() { 
    var data = Tematica.find({}, {sort: {SC: 1}});
    var options=new Array();
    data.forEach( function(myDoc) 
    {
        var aux = { 'value':myDoc._id, 'label':myDoc.SC };
        options.push(aux);  
    });

    return options;
  },

  checkedValue: function() {
    return Session.get('tematicaId'); 
  },

  animadores_Opts() { 
   
    var animadores =Animadores.find();
    var ids = animadores.map(function(p) { return p.iduser });
    var users = Meteor.users.find({_id: {$in: ids} }, {sort: {username: 1}});

    var options=new Array();
    users.forEach( function(myDoc) 
    {
        var aux = { 'value':myDoc._id, 'label':myDoc.username };
        options.push(aux);  
    });

    return options;
  },

  get_instancias: function() {
    return Instancia.find({}, {sort: {numero: 1}}); 
  },


  selector() {
    return {sesion_id: Session.get('sesionId')};
  }
 
  
});

Template.modalesSesion.events ({
  'submit #altaSesion': function(e)
  {
    //e.preventDefault();

    if( e.target.checkValidity() )
      {       
        var fecha1 = $(e.target).find('[name=fecha1]').val();
        var fecha2 = $(e.target).find('[name=fecha2]').val();
        

        var arre=Array();
        arre=fecha1.split(' ');
        fecha1 = arre[0];
        var hora1=arre[1];


        var arre2=Array();
        arre2=fecha2.split(' ');
        fecha2 = arre2[0];
        var hora2=arre2[1];


        var ses = {
          tematica_id: $(e.target).find('[name=tematica_id]').val(),  
          nombre: $(e.target).find('[name=nombre]').val(),  
          fecha1:fecha1,
          fecha2:fecha2,
          hora1:hora1,
          hora2:hora2,
          estadoSesion:'en_construccion',
        };

        var instancias = $(e.target).find('.numInst'); 
        for (var i = 0; i < instancias.length; i++)
        {
          var id = $(instancias[i]).attr('id');
          var valor = parseInt( $(instancias[i]).val() );
         
          var arre = {
            [id]:valor,
          };

          //ses.push(arre);
          ses = _.extend(ses,
          {
            [id]: valor,
          });
        }
        
        //console.log(ses);

        Meteor.call('sesionInsert', ses, function(error, result) //se define un metodo para insertar
        {      
          if (error)
              return console.log(error.reason);
          else
              bootbox.alert("Carga Exitosa", function() {
                    
                    Router.go('adminSesion', {});
              });
            
        });
         
        //bootbox.hideAll();
        $('#modal_alta_sesion').modal('hide');
      }
  },


  'submit #altaTematica': function(e,t)
  {
    //e.preventDefault();

    if( e.target.checkValidity() )
    {       
        var scre = {
          SC: $(e.target).find('[name=SC]').val(),
          Des: $(e.target).find('[name=Des]').val()
        };


        Meteor.call('tematicaInsert', scre, function(error, result) {
          // display the error to the user and abort
          if (error)
            return alert(error.reason);

          //bootbox.alert("Carga Exitosa", function() { 
                Router.go('adminSesion', {});
          //});
          
        });
         
        //bootbox.hideAll();
        $('#modal_alta_tematica').modal('hide');
      }
  },

  //abre modal alta grupo
  'click #newgrupo': function(e,t)
  {
      e.preventDefault();
      var idsesion=Session.get('sesionId');

      $('#altaGrupo input').val('');
      $('#altaGrupo #sesion_id').val(idsesion);
      $('#modal_alta_grupo').modal('show');
   },

   //submit alta grupo
  'submit #altaGrupo': function(e)
  {
    if( e.target.checkValidity() )
    {       
        var grup = {
            gr: $(e.target).find('[name=gr]').val(),
            descripcion: $(e.target).find('[name=descripcion]').val(),
            sesion_id: $(e.target).find('[name=sesion_id]').val(),  
        };
      
        //console.log(grup);
       
        Meteor.call('grupoInsert', grup, function(error, result) //se define un metodo para insertar
        {      
          if (error)
            return console.log(error.reason);
         
          //bootbox.alert("Carga Exitosa", function() { 
            Router.go('adminSesion', {});
          //});
        });     

        //bootbox.hideAll();
        $('#modal_alta_grupo').modal('hide');
      }
  },

  'submit #asignaAnimSes': function(e)
  {  e.preventDefault();
    if( e.target.checkValidity() )
    {    

      var idusers = $(e.target).find('[name=idusers]').val();

     // for (var i = 0; i < idusers.length; i++) {
      
          var data = {
              idusers: idusers,
              idsesion: $(e.target).find('[name=idsesion]').val(),  
          };      
         
          Meteor.call('InsertUserSesion_anim', data, function(error, result) //se define un metodo para insertar
          {      
            if(error)
              return console.log(error.reason);
           
            //bootbox.alert("Carga Exitosa", function() { 
              Router.go('adminSesion', {});
            //});
          }); 
     // }    

      $('#modal_asigna_animadores').modal('hide');
    }//else alert('NO VALIDA');
  },
  
});

