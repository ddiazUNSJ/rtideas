function rezisePantalla()
{
	var elemento = $("#piechat");
    var elemento2 = $("#chat");
	var posicion = elemento.position();
	var posicion2 = elemento2.position();
	var posY = (posicion.top - posicion2.top) - 10;
	$("#chat").css('min-height', posY);
	$("#chat").css('max-height', posY);
}


//contGrupos=0;

Template.chatPage.renderer = function (){

	//opciones de Reloj Circular
	//Session.set('progressPercent', 100);	//Sets the progress bar to 30%
	//Session.set('progressText', "");

	var useractual = Meteor.userId(); 
	var data = Meteor.users.findOne({_id: useractual}); 
	Session.set('rol',data.rol);


	$('h3[rel=tooltip]').tooltip();



	/*rezisePantalla();
	$(window).resize(function() {
	  rezisePantalla();
	});*/
	
 };

 Template.contenidoChat.rendered = function (){ //alert('entra');

	rezisePantalla();
	$(window).resize(function() {
	  rezisePantalla();
	});



 };



Template.chatPage.helpers({ 

	/*temporizador: function()
	{
		return Session.get('cuentaR') ; 
	}, */
  
    /*Hestado: function() { 
		return  Session.get('rango') ;
    },*/
    
    getCountdown: function() {

		var sesionId = Session.get('idsesion');	    
		//var grupo = Grupo.findOne( {_id: idgrupo} );		
		//var sesionId = grupo.sesion_id;
		//var sesionaux = Sesion.findOne( {_id:  sesionId} ); 

		//var sesionT = SesionTime.findOne( {sesion_id: sesionId, instancia: sesionaux.instActual},{ sort: {submitted: -1}} );
		var sesionT = SesionTime.findOne( {sesion_id: sesionId},{ sort: {submitted: -1}} );

		return sesionT.countdown;
	},

    getTituloInt: function() {
		//var idgrupo = Session.get('idgrupo');	    
		//var grupo = Grupo.findOne( {_id: idgrupo} );		
		//var sesionId = grupo.sesion_id;
		var sesionId = Session.get('idsesion');
		var sesion = Sesion.findOne( {_id: sesionId} );

		var actual = sesion.instActual;

		var resul = Instancia.findOne( {numero: actual} );	

		return resul.nombre;
	},

	 getDescInt: function() {
		//var idgrupo = Session.get('idgrupo');	    
		//var grupo = Grupo.findOne( {_id: idgrupo} );		
		//var sesionId = grupo.sesion_id;
		var sesionId = Session.get('idsesion');
		var sesion = Sesion.findOne( {_id: sesionId} );

		var actual = sesion.instActual;

		var resul = Instancia.findOne( {numero: actual} );	

		return resul.descripcion;
	},

    getInstancia: function() { 
		//var idgrupo = Session.get('idgrupo');	    
		//var grupo = Grupo.findOne( {_id: idgrupo} );		
		//var sesionId = grupo.sesion_id;
		var sesionId = Session.get('idsesion');
		var sesion = Sesion.findOne( {_id: ''+sesionId+''} );

		 bootbox.hideAll();

		switch( sesion.instActual)
		{
			case 0:
					
					$('#div_instancia1').css('display','none');
					$('#div_instancia2').css('display','none');
					$('#div_instancia3').css('display','none');
					$('#div_instancia4').css('display','none');
					$('#div_instancia5').css('display','none');
					$('#div_instancia6').css('display','none');
					$('#div_instancia7').css('display','none');
					$('#div_instancia8').css('display','none');

					break;
			case 1:
					$('#div_instancia0').animate({width: '100%'}, 150, function() {
		                $(this).hide();              
		                $('#div_instancia1').animate({width: '100%'}, 100
		                	, function() {
		                  
		                   //$('#div_instancia0').css('display','none');
						   $('#div_instancia1').css('display','block');   
						   $('#div_instancia3').css('display','none');
						   $('#div_instancia4').css('display','none');
						   $('#div_instancia5').css('display','none');
						   $('#div_instancia6').css('display','none');
		                   $('#div_instancia7').css('display','none');
		                   $('#div_instancia8').css('display','none');
		                    $(this).show();
		                });
		            });

		    case 2:
					$('#div_instancia1').animate({width: '100%'}, 150, function() {
		                $(this).hide();              
		                $('#div_instancia1').animate({width: '100%'}, 100
		                	, function() {
		                  
		                   //$('#div_instancia0').css('display','none');
						   $('#div_instancia1').css('display','block');  
						   $('#div_instancia3').css('display','none'); 
						   $('#div_instancia4').css('display','none');
						   $('#div_instancia5').css('display','none');
				           $('#div_instancia6').css('display','none');
		                   $('#div_instancia7').css('display','none');
		                   $('#div_instancia8').css('display','none');
							
		                    $(this).show();
		                });
		            });
		    case 3:

		    		 //Meteor.subscribe("ideas2",idgrupo); 

					$('#div_instancia1').animate({width: '100%'}, 150, function() {
		                $(this).hide();              
		                $('#div_instancia3').animate({width: '100%'}, 100
		                	, function() {
		                  
		                   //$('#div_instancia0').css('display','none');
		                   $('#div_instancia1').css('display','none');
						   $('#div_instancia3').css('display','block');
						   $('#div_instancia4').css('display','none');  
						   $('#div_instancia5').css('display','none');
				           $('#div_instancia6').css('display','none'); 
		                   $('#div_instancia7').css('display','none');
		                   $('#div_instancia8').css('display','none'); 
		                    $(this).show();
		                });
		            });

					//$('#div_instancia0').css('display','none');
					//$('#div_instancia1').css('display','block');
					break;
			case 4:
					$('#div_instancia3').animate({width: '100%'}, 150, function() {
		                $(this).hide();              
		                $('#div_instancia4').animate({width: '100%'}, 100
		                	, function() {
		                  
		                   //$('#div_instancia0').css('display','none');
						   $('#div_instancia1').css('display','none'); 
						   $('#div_instancia3').css('display','none');
						   $('#div_instancia4').css('display','block'); 
						   $('#div_instancia5').css('display','none');
				           $('#div_instancia6').css('display','none'); 
		                   $('#div_instancia7').css('display','none');
		                   $('#div_instancia8').css('display','none');
		                   $(this).show();
		                });
		            });

					//$('#div_instancia0').css('display','none');
					//$('#div_instancia1').css('display','block');
					break;
			case 5:
					$('#div_instancia4').animate({width: '100%'}, 150, function() {
		                $(this).hide();              
		                $('#div_instancia5').animate({width: '100%'}, 100
		                	, function() {
		                  
		                   //$('#div_instancia0').css('display','none');
						   $('#div_instancia1').css('display','none'); 
						   $('#div_instancia3').css('display','none'); 
						   $('#div_instancia4').css('display','none');  
						   $('#div_instancia5').css('display','block'); 
						   $('#div_instancia6').css('display','none');
		                   $('#div_instancia7').css('display','none');
		                   $('#div_instancia8').css('display','none');
		                    $(this).show();
		                });
		            });

					//$('#div_instancia0').css('display','none');
					//$('#div_instancia1').css('display','block');
					break;
			case 6:
					$('#div_instancia5').animate({width: '100%'}, 150, function() {
		                $(this).hide();              
		                $('#div_instancia6').animate({width: '100%'}, 100
		                	, function() {
		                  
		                  // $('#div_instancia0').css('display','none');
						   $('#div_instancia1').css('display','none');  
						   $('#div_instancia3').css('display','none');
						   $('#div_instancia4').css('display','none'); 
						   $('#div_instancia5').css('display','none');
						   $('#div_instancia6').css('display','block');
		                   $('#div_instancia7').css('display','none');
		                   $('#div_instancia8').css('display','none');
		                    $(this).show();
		                });
		            });

					//$('#div_instancia0').css('display','none');
					//$('#div_instancia1').css('display','block');
					break;
			case 7:
					$('#div_instancia6').animate({width: '100%'}, 150, function() {
		                $(this).hide();              
		                $('#div_instancia7').animate({width: '100%'}, 100
		                	, function() {
		                  
		                  // $('#div_instancia0').css('display','none');
						   $('#div_instancia1').css('display','none');  
						   $('#div_instancia3').css('display','none');
						   $('#div_instancia4').css('display','none'); 
						   $('#div_instancia5').css('display','none');
						   $('#div_instancia6').css('display','none');
		                   $('#div_instancia7').css('display','block');
		                   $('#div_instancia8').css('display','none');
		                    $(this).show();
		                });
		            });

					//$('#div_instancia0').css('display','none');
					//$('#div_instancia1').css('display','block');
					break;	
			case 8:
					$('#div_instancia7').animate({width: '100%'}, 150, function() {
		                $(this).hide();              
		                $('#div_instancia8').animate({width: '100%'}, 100
		                	, function() {
		                  
		                  // $('#div_instancia0').css('display','none');
						   $('#div_instancia1').css('display','none');  
						   $('#div_instancia3').css('display','none');
						   $('#div_instancia4').css('display','none'); 
						   $('#div_instancia5').css('display','none');
						   $('#div_instancia6').css('display','none');
		                   $('#div_instancia7').css('display','none');
		                   $('#div_instancia8').css('display','block');
		                    $(this).show();
		                });
		            });

					//$('#div_instancia0').css('display','none');
					//$('#div_instancia1').css('display','block');
					break;			
		}

		return sesion.instActual;

    },

    siInstancia2: function() { 
		var sesionId = Session.get('idsesion');
		var sesion = Sesion.findOne( {_id: sesionId} );
		return sesion.instActual == 2;
    },

    siInstancia3: function() { 
		var sesionId = Session.get('idsesion');
		var sesion = Sesion.findOne( {_id: sesionId} );
		return sesion.instActual == 3;
    },

 	siInstancia4: function() { 
		var sesionId = Session.get('idsesion');
		var sesion = Sesion.findOne( {_id: sesionId} );
		return sesion.instActual == 4;
    },

	siInstancia5: function() { 
		var idgrupo = Session.get('idgrupo');	 
		var sesionId = Session.get('idsesion');
		var sesion = Sesion.findOne( {_id: sesionId} );
		if(sesion.instActual == 5)
		{	
			Meteor.subscribe('votos_compartir', idgrupo );
			res=1;
		}
		else res=0;
		return res;
	},

	siInstancia6: function() { 
		var sesionId = Session.get('idsesion');
		var sesion = Sesion.findOne( {_id: sesionId} );
		return sesion.instActual == 6;
	},

	siInstancia7: function() { 
		var sesionId = Session.get('idsesion');
		var sesion = Sesion.findOne( {_id: sesionId} );
		return sesion.instActual == 7;
	},

	siInstancia8: function() { 
		var sesionId = Session.get('idsesion');
		var sesion = Sesion.findOne( {_id: sesionId} );
		return sesion.instActual == 8;
	},

	siInstancia_1: function() { //-1
		var sesionId = Session.get('idsesion');
		var sesion = Sesion.findOne( {_id: sesionId} );
		return sesion.instActual == -1;
	},

	siInstancia0: function() { //-1
		var sesionId = Session.get('idsesion');
		var sesion = Sesion.findOne( {_id: sesionId} );
		return sesion.instActual == 0;
	},

	fechaI: function() { //-1
		var sesionId = Session.get('idsesion');
		var sesion = Sesion.findOne( {_id: sesionId} );
		var fecha1 = sesion.fecha1;	
		var hora1 = sesion.hora1;
		//var fechaI = new Date(fecha1 +' '+hora1); 
		return fecha1 +' '+hora1;
	},

	/*fechaDif: function() { //-1
		var idgrupo = Session.get('idgrupo');	    
		var grupo = Grupo.findOne( {_id: idgrupo} );		
		var sesionId = grupo.sesion_id;
		var sesion = Sesion.findOne( {_id: ''+sesionId+''} );

		var fecha1 = sesion.fecha1;	
		var hora1 = sesion.hora1;
		var fechaI = new Date(fecha1 +' '+hora1); 

		//var fechaA = new Date(); 

		 fechaA='nada';
		Meteor.call('getFechaA', '', function(error, result)
	    {      
	      if (error)
	        return console.log(error.reason);

	    	console.log(result);
	       Session.set('fechaA', result);	
	    });    
		fechaA = Session.get('fechaA');
		if(fechaA < fechaI)
		{
			var difference = (fechaI - fechaA)	
			var min = Math.round(difference/(1000*60));
			var seg = Math.round(difference/(1000)%60) ;

			return min + ':'+seg + ' min para comenzar';
		}
		else {
				$('#siguiente').css('display','none');
				$('#edittime').css('display','none');
				return 'Sesion Terminada';
			}
	},*/

	IsAnimador: function() { 
 		//alert(Session.get('rol'));
    	return Session.get('rol') == 'Animador';
	},

	get_grupos: function() {
		var sesion = Session.get('idsesion');
	    return Grupo.find({sesion_id: sesion}, {sort: {gr: 1}});	
	},

	/*subs_ideas_grupo: function(id) {
		Meteor.subscribe('ideas',id); //le envio el id de grupo para que me publique solo las ideas del grupo.
		//Meteor.subscribe('votos',idgr);
	},*/

	
	/*contarGrupos: function() { 
		var contGrupos= Session.get('contGrupos');
		if(contGrupos==0)
	    {
	   		Session.set('idgrupo', this._id);
			//alert( Session.get('idgrupo') );	
			//Meteor.subscribe('grupos');
		    //Meteor.subscribe('sesionesCreatividad');
		  	//Meteor.subscribe('ideas',idgr); //le envio el id de grupo para que me publique solo las ideas del grupo.
		    //Meteor.subscribe('votos',idgr); 
		}
	   contGrupos++;
	   Meteor.subscribe('ideas', this._id);
	},*/
	
	grupoactivo: function() { // alert(Session.get('contGrupos')); 
	  return Session.get('idgrupo')===this._id;
	},


 }); 


  
Template.contenidoChat.helpers({ 


  get_messages: function() {
	var idgrupoA = Session.get('idgrupo');
    return Ideas.find({idgrupo: idgrupoA}, {  });	
  },

   get_messagesI3: function() {
	var idgrupoA = Session.get('idgrupo');
    var ideas = Ideas.find({idgrupo: idgrupoA}, { sort: {submitted: 1} });

    var todos=Array();

    ideas.forEach( function(myDoc) 
    {
        if(myDoc.votacionI2.resultado== 'Debate')
            todos.push( Ideas.findOne( {_id: myDoc._id }, {} )  );  
	});
    //votacionI2.resultado: 'Debate'
     return  todos;
  },

  get_messagesI5: function() {
	var idgrupoA = Session.get('idgrupo');
    var ideas = Ideas.find({idgrupo: idgrupoA}, { sort: {submitted: 1} });

    var todos=Array();

    ideas.forEach( function(myDoc) 
    {
        if( (myDoc.votacionI2.resultado == 'Aceptado')  || (myDoc.votacionI4.resultado == 'Aceptado')  ) 
            todos.push( Ideas.findOne( {_id: myDoc._id }, {} )  );  
	});
    //votacionI2.resultado: 'Debate'
     return  todos;
  },

  get_messages_compI6: function() {

  	var idgrupoA = Session.get('idgrupo');
  	var idsesion = Session.get('idsesion');


  	Meteor.subscribe('gruposComp', idgrupoA);

	var grupC = GruposComp.findOne({sesion_id: idsesion});
	 if(grupC)
	    grupC = grupC.gruposIds;
	 else grupC = 0;

	 var ideas = Ideas.find({idgrupo: {$in: grupC} }, { sort: {submitted: 1}} ); 
    //var ideas = Ideas.find({}, { sort: {submitted: 1} });

    var todos=Array();

    ideas.forEach( function(myDoc) 
    {
        if( myDoc.compartir.compartir == 1 )  
            todos.push( Ideas.findOne( {_id: myDoc._id }, {} )  );  
	});
    //votacionI2.resultado: 'Debate'
     return  todos;
  },

   get_messages_compI7: function() {
  	var idgrupoA = Session.get('idgrupo');
    var ideas = Ideas.find({idgrupo: idgrupoA}, { sort: {submitted: 1} });
    var todos=Array();
    ideas.forEach( function(myDoc) 
    {
        if( myDoc.compartir.compartir == 1 )  
            todos.push( Ideas.findOne( {_id: myDoc._id }, {} )  );  
	});
    //votacionI2.resultado: 'Debate'
     return  todos;
  },

  get_messagesI8: function() {
	var idgrupoA = Session.get('idgrupo');
    var ideas = Ideas.find({idgrupo: idgrupoA}, { sort: {submitted: 1} });

    var todos=Array();

   
    ideas.forEach( function(myDoc) 
    {
        //if( (myDoc.votacionI2.resultado == 'Aceptado')  || (myDoc.votacionI4.resultado == 'Aceptado')  ) 
           // todos.push(  Ideas.findOne( {_id: myDoc._id }, {} ) );  
       	 var ban=0;	

        if( myDoc.votacionI2.resultado == 'Aceptado') 
    		var votos = myDoc.votacionI2.cantA;
    	else 
    		if (myDoc.votacionI4.resultado == 'Aceptado')  
				var votos = myDoc.votacionI4.cantA;
			else ban=1;

		if(ban==0)
		{
			var data = {
	   			_id: myDoc._id,
	   			messageBox: myDoc.messageBox,
	   			iduser: myDoc.iduser,
	   			votos:votos 
	   		};
	        todos.push( data  ); 
	    }

	});

	//console.log(todos);
	todos.sort(function (a,b) {  //descendente
		  if (a.votos > b.votos)
		    return -1;
		  if (a.votos < b.votos)
		    return 1;
		  return 0;
	});
	//console.log(todos);

    return  todos;
  },



   grupoIdeaComp: function() {
    var idea = Ideas.findOne({_id: this._id});	
    var grupo = Grupo.findOne({_id: idea.idgrupo});	
	return grupo.gr;	
   },
  
   get_username: function() {
    var data = Meteor.users.findOne({_id: this.iduser});	
	return data.username;	
   },

   ownIdea: function() {
    //var data = Meteor.users.findOne({_id: userid});	
	return this.iduser == Meteor.userId();
   },


	get_comentarios: function() {
	    return Comentarios.find({ididea:this._id, instancia:2}, { sort: {submitted: 1} });	
	},

	get_comentarios_comp: function() {
	    return Comentarios.find({ididea:this._id, instancia:6}, { sort: {submitted: 1} });
	},

	get_idea: function(idIdea){
		return Ideas.findOne({ididea:idIdea},{sort:{submitted: 1}});

	},

	
	siInstancia1: function() { 
		var sesionId = Session.get('idsesion');
		var sesion = Sesion.findOne( {_id: sesionId} );
		return sesion.instActual == 1;
    },

	siInstancia2: function() { 
		Meteor.subscribe("votos_I2");
		var sesionId = Session.get('idsesion');
		var sesion = Sesion.findOne( {_id: sesionId} );
		return sesion.instActual == 2;
    },  

    siInstancia3: function() { 
		var sesionId = Session.get('idsesion');
		var sesion = Sesion.findOne( {_id: sesionId} );
		return sesion.instActual == 3;
    },

     siInstancia4: function() { 
		var sesionId = Session.get('idsesion');
		var sesion = Sesion.findOne( {_id: sesionId} );
		return sesion.instActual == 4;
    },

    siInstancia5: function() { 
		var sesionId = Session.get('idsesion');
		var sesion = Sesion.findOne( {_id: sesionId} );
		return sesion.instActual == 5;
    },

    siInstancia6: function() { 
		var sesionId = Session.get('idsesion');
		var sesion = Sesion.findOne( {_id: sesionId} );
		return sesion.instActual == 6;
	},

	siInstancia7: function() { 
		var sesionId = Session.get('idsesion');
		var sesion = Sesion.findOne( {_id: sesionId} );
		return sesion.instActual == 7;
	},

	siInstancia8: function() { 
		var sesionId = Session.get('idsesion');
		var sesion = Sesion.findOne( {_id: sesionId} );
		return sesion.instActual == 8;
	},

	NoInstancia1y2: function() {  // no es instancia 1 ni 2
		var sesionId = Session.get('idsesion');
		var sesion = Sesion.findOne( {_id: sesionId} );

		if ( (sesion.instActual != 1) && (sesion.instActual != 2) ) 
			return 1;
		else return 0;
    },


    
    votosComp: function() { 		
		//console.log(this.compartir.cant);
		return this.compartir.cant;
    },


    checkeadoI2: function(voto) {
   		
    	var useractual = Meteor.userId();
		var votacion = VotacionI2.findOne( {user_id:useractual, idea_id:this._id} );
		if(votacion) 
		{	
			console.log(voto+'--'+(votacion.voto === voto));
			if(votacion.voto == voto) 
				return "checked";
			else return "nono";
		}else 
			return "nono";
    },

    /*checkeadoI2_R: function() {
    	var useractual = Meteor.userId();
		var votacion = VotacionI2.findOne( {user_id:useractual, idea_id:this._id} );
		if( (votacion) && (votacion.voto=='R') ) 
			return "checked";
		else 
			return "";
    },

    checkeadoI2_D: function() {
    	var useractual = Meteor.userId();
		var votacion = VotacionI2.findOne( {user_id:useractual, idea_id:this._id} );
		if( (votacion) && (votacion.voto=='D') ) 
			return "checked";
		else 
			return "";
    },*/

    checkeadoI5: function() {
    	var useractual = Meteor.userId();

		var votacion = IdeasC.findOne( {user_id:useractual, idea_id:this._id, comp:1} );

		if(votacion) 
			return "checked";
		else 
			return "";
    },


    //I8
    get_autor: function() {
    	var data = Meteor.users.findOne({_id: this.iduser});
		return data.username;
    },
    
    /*get_votos: function() {
    	if( this.votacionI2.resultado == 'Aceptado') 
    		return this.votacionI2.cantA;
    	else 
    		if (this.votacionI4.resultado == 'Aceptado')  
				return this.votacionI4.cantA;
			else return this.votacionI2.cantA;
    },*/

    num_idea: function() {
    	var trs = $('#tablares tbody tr');
    	return trs.length + 1;
    },
 
});


Template.chatPage.events ({

	'click .menugrupo': function(e)
    {	
    	e.preventDefault();
		var id = $(e.target).attr('id');
		//Meteor.subscribe('ideas', id); //se subscribe en el router
		Session.set('idgrupo', id);

	    //Meteor.subscribe('grupos');
	    //Meteor.subscribe('sesionesCreatividad');
	  	//Meteor.subscribe('ideas',id); //le envio el id de grupo para que me publique solo las ideas del grupo.
	    //Meteor.subscribe('votos',id); 
    },

  	'click #siguiente': function(e)
    {
    	bootbox.confirm("Pasar de instancia?", function(res){
    		if( res )
			{
				var datos = {
				  idsesion: Session.get('idsesion'),
				};

				Meteor.call('pasardeInstantcia', datos, function(error, result) //se define un metodo para insertar
				{      
				  if (error)
						return alert(error.reason);
				  //Router.go('chatPage', {idgrupo:Session.get('idgrupo')});
				}); 
			} 
    	});
		
    },

    'click #edittime': function(e)
	{
		e.preventDefault();
		//var resp = prompt('Ingrese Comentario');
		bootbox.dialog({
              backdrop: true,
              title: "Aumentar/Disminuir Tiempo de Sesion...",
              message:  
                    '<div class="row">'+
                         '<form id="formtime" novalidate="novalidate">'+
                            '<div class="form-group">'+
                                '<div class="form-group">'+
                                  '<label class="control-label" for="nombre">Minutos</label>'+
                                  '<input type="number" max="30" min="1" name="newtime" id="newtime" placeholder="" class="form-control" required />'+
                                '</div>'+
                            '</div>'+
                          '</form>'+
                    '</div>',
              buttons: {
                  success: {
                      label: "Guardar",
                      className: "btn-primary",
                      callback: function (ev) { 
                           ev.preventDefault();

                           //console.log($('#comment #comentario'));

                          var $myForm = $('#formtime');
                          if ($myForm[0].checkValidity()) 
                          {
                         	
							var arre = {
						      time:  $('#formtime #newtime').val(),
						      idsesion: Session.get('idsesion'),
						    };

						    Meteor.call('editTimeInst', arre, function(error, result) //se define un metodo para insertar
						    {      
						      if (error)
						        return console.log(error.reason);
						       //Router.go('chatPage', {_id: result._id}); 
						    });
                           
                            bootbox.hideAll();
                          }
                          else {
                                bootbox.alert("Ingrese el tiempo en minutos (max:30)");
                                return false;
                                }
                                                                 
                      }//fin calback
                  }//fin success
              },//fin Buttons

              onEscape: function() {return ;},
        });  //FIN DIALOG
	},

	'click #instanciaX': function(e)
	{
		e.preventDefault();
		//var resp = prompt('Ingrese Comentario');
		bootbox.dialog({
              backdrop: true,
              title: "Ir a la Instancia...",
              message:  
                    '<div class="row">'+
                         '<form id="formtime" novalidate="novalidate">'+
                            '<div class="form-group">'+
                                '<div class="form-group">'+
                                  '<label class="control-label" for="nombre">Instancia</label>'+
                                  '<input type="number" max="8" min="1" name="instX" id="instX" placeholder="" class="form-control" required />'+
                                '</div>'+
                            '</div>'+
                          '</form>'+
                    '</div>',
              buttons: {
                  success: {
                      label: "Guardar",
                      className: "btn-primary",
                      callback: function (ev) { 
                           ev.preventDefault();

                           //console.log($('#comment #comentario'));

                          var $myForm = $('#formtime');
                          if ($myForm[0].checkValidity()) 
                          {
                         	
							var arre = {
						      instanciaX: parseInt( $('#formtime #instX').val()),
						      idsesion: Session.get('idsesion'),
						    };

						    console.log(arre);

						    Meteor.call('irInstantciaX', arre, function(error, result) //se define un metodo para insertar
						    {      
						      if (error)
						        return console.log(error.reason);
						       //Router.go('chatPage', {_id: result._id}); 
						    });
                           
                            bootbox.hideAll();
                          }
                          else {
                                bootbox.alert("Ingrese el tiempo en minutos (max:30)");
                                return false;
                                }
                                                                 
                      }//fin calback
                  }//fin success
              },//fin Buttons

              onEscape: function() {return ;},
        });  //FIN DIALOG
	},


  	'click #preparar': function(e)
	{
		e.preventDefault();
		//var resp = prompt('Ingrese Comentario');
		bootbox.dialog({
              backdrop: true,
              title: "Comenzar la Sesión...",
              message:  
                    '<div class="row">'+
                         '<form id="formempezar" novalidate="novalidate">'+
                            '<div class="form-group">'+
                                '<div class="form-group">'+
                                  '<label class="control-label" for="minIni">Minutos</label>'+
                                  '<input type="number" max="30" min="0" name="minIni" id="minIni" placeholder="" class="form-control" required />'+
                                '</div>'+
                            '</div>'+
                          '</form>'+
                    '</div>',
              buttons: {
                  success: {
                      label: "Listo",
                      className: "btn-primary",
                      callback: function (ev) { 
                           ev.preventDefault();

                           //console.log($('#comment #comentario'));

                          var $myForm = $('#formempezar');
                          if ($myForm[0].checkValidity()) 
                          {
						    var datos = {
							   //idgrupo: Session.get('idgrupo'),	
							   idsesion: Session.get('idsesion'),
							   minutos:  $('#formempezar #minIni').val()		 
							};

							Meteor.call('comenzarSesion', datos, function(error, result) //se define un metodo para insertar
							{      
							    if (error)
									return alert(error.reason);
								//console.log(result);
							  //Router.go('chatPage', {idgrupo:Session.get('idgrupo')});
							});
                           
                            bootbox.hideAll();
                          }
                          else {
                                bootbox.alert("Ingrese el tiempo");
                                return false;
                                }
                                                                 
                      }//fin calback
                  }//fin success
              },//fin Buttons

              onEscape: function() {return ;},
        });  //FIN DIALOG
	},
	
 });




  //Listen for the following events on the entry template
  Template.contenidoChat.events ({
   
   'keyup #messageBox': function(e)
    {
      if(e.which === 13)
      { 
		if( $("#messageBox").val() !='')
		{
			var new_message = {
			  messageBox: $("#messageBox").val(),
			  idgrupo: Session.get('idgrupo'),
			  iduser: Meteor.userId(),
			  compartir: '0',
			};

			Meteor.call('ideasInsert', new_message, function(error, result) //se define un metodo para insertar
			{      
			  if (error)
					return alert(error.reason);
			  //Router.go('chatPage', {idgrupo:Session.get('idgrupo')});
			}); 
			
		} else bootbox.alert("Debe ingresar una idea", function() { });
          
       $("#messageBox").val("");
       $("#messageBox").focus();
        
        $("#chat").scrollTop(9999999);
      }
    },
	
	'click #enviar': function(e)
    {
    	//alert( $("#messageBox").val());
		if( $("#messageBox").val() !='')
		{
			var new_message = {
			  messageBox: $("#messageBox").val(),
			  idgrupo: Session.get('idgrupo'),
			  iduser: Meteor.userId(),
			  compartir: '0',
			};

			Meteor.call('ideasInsert', new_message, function(error, result) //se define un metodo para insertar
			{      
			  if (error)
					return alert(error.reason);
			  //Router.go('chatPage', {idgrupo:Session.get('idgrupo')});
			}); 
		} 
		else
			bootbox.alert("Debe ingresar una idea", function() { });
	      
	   $("#messageBox").val("");
	   $("#messageBox").focus();
	    
	   $("#chat").scrollTop(9999999);
      
    },


     // Collapse ibox function
   'click .collapse-link': function(e) { //console.log(e);
        var ibox = $(e.target).closest('div.ibox');
        var button = $(e.target).find('i');
        var content = ibox.find('div.ibox-content');
        content.slideToggle(200);
        button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
        ibox.toggleClass('').toggleClass('border-bottom');
        setTimeout(function () {
            ibox.resize();
            ibox.find('[id^=map-]').resize();
        }, 50);
    },

    'click .coment': function(e)
	{
		e.preventDefault();
		//var resp = prompt('Ingrese Comentario');
		bootbox.dialog({
              backdrop: true,
              title: "Comenatar Idea...",
              message:  
                    '<div class="row">'+
                         '<form id="comment" novalidate="novalidate">'+
                            '<div class="form-group">'+
                                '<div class="form-group">'+
                                  '<label class="control-label" for="nombre">Comentario</label>'+
                                  '<textarea name="comentario" id="comentario" placeholder="" class="form-control" required> </textarea>'+
                                '</div>'+
                            '</div>'+
                          '</form>'+
                    '</div>',
              buttons: {
                  success: {
                      label: "Guardar",
                      className: "btn-primary",
                      callback: function (ev) { 
                           ev.preventDefault();

                           //console.log($('#comment #comentario'));

                          var $myForm = $('#comment');
                          if ($myForm[0].checkValidity()) 
                          {
                         	var idIdea = $(e.target);
							idIdea = $(idIdea[0]).attr('name');
							var arre = {
						      comentario:  $('#comment #comentario').val(),
						      ididea: idIdea,
						      idgrupo: Session.get('idgrupo')
						    };
						    Meteor.call('comentInsert', arre, function(error, result) //se define un metodo para insertar
						    {      
						      if (error)
						        return console.log(error.reason);
						       //Router.go('chatPage', {_id: result._id}); 
						    });
                           
                            bootbox.hideAll();
                          }
                          else {
                                bootbox.alert("Ingrese comentario");
                                return false;
                                }
                                                                 
                      }//fin calback
                  }//fin success
              },//fin Buttons

              onEscape: function() {return ;},
        });  //FIN DIALOG
	},

    'click .editar': function(e)
	{
		e.preventDefault();

		var idIdea = $(e.target);
		idIdea = $(idIdea[0]).attr('name');
		var idea = Ideas.findOne( {_id: idIdea} );
		ideaname = idea.messageBox;
		//var resp = prompt('Ingrese Comentario');
		bootbox.dialog({
              backdrop: true,
              title: "Editar Idea...",
              message:  
                    '<div class="row">'+
                         '<form id="edit" novalidate="novalidate">'+
                            '<div class="form-group">'+
                                '<div class="form-group">'+
                                  '<label class="control-label" for="nombre">Idea</label>'+
                                  '<textarea name="editar" id="editar" placeholder="" class="form-control" required> '+ideaname+' </textarea>'+
                                '</div>'+
                            '</div>'+
                          '</form>'+
                    '</div>',

              buttons: {
                  success: {
                      label: "Guardar",
                      className: "btn-primary",
                      callback: function (ev) { 
                           ev.preventDefault();

                           //console.log($('#comment #comentario'));

                          var $myForm = $('#edit');
                          if ($myForm[0].checkValidity()) 
                          {
                         	
							var arre = {
						      editar:  $('#edit #editar').val(),
						      ididea: idIdea,
						      idgrupo:  Session.get('idgrupo'),
						    };
						    Meteor.call('editIdea', arre, function(error, result) //se define un metodo para insertar
						    {      
						      if (error)
						        return console.log(error.reason);
						       //Router.go('chatPage', {_id: result._id}); 
						    });
                           
                            bootbox.hideAll();
                          }
                          else {
                                bootbox.alert("Ingrese nueva Idea");
                                return false;
                                }
                                                                 
                      }//fin calback
                  }//fin success
              },//fin Buttons

              onEscape: function() {return ;},
        });  //FIN DIALOG
	  },


	'click .radiovota2': function(e)
	{
		//e.preventDefault();

     	var radio = $(e.target);
     
		id = $(radio[0]).attr('id');

		$(radio[0]).attr('checked','checked');

		var aux = new Array();
		aux=id.split('_');

		var voto = aux[0];
		var ididea = aux[1];


		var arre = {
		  idea_id:ididea,
	      voto: voto 

	    };

	    //console.log(arre);

	    Meteor.call('InsertVotI2', arre, function(error, result) //se define un metodo para insertar
	    {      
	      if (error)
	        return console.log(error.reason);
	       //Router.go('chatPage', {_id: result._id}); 
	    });     
  	},

	'click .radiovota4': function(e)
	{
		//e.preventDefault();

     	var radio = $(e.target);
     
		id = $(radio[0]).attr('id');

		$(radio[0]).attr('checked','checked');

		var aux = new Array();
		aux=id.split('_');

		var voto = aux[0];
		var ididea = aux[1];


		var arre = {
		  idea_id:ididea,
	      voto: voto 

	    };

	    //console.log(arre);

	    Meteor.call('InsertVotI4', arre, function(error, result) //se define un metodo para insertar
	    {      
	      if (error)
	        return console.log(error.reason);
	       //Router.go('chatPage', {_id: result._id}); 
	    });     
  	},


  	'click .comp': function(e)
	{
		//e.preventDefault();

     	var radio = $(e.target);
     
		id = $(radio[0]).attr('id');

		//$(radio[0]).attr('checked','checked');

		var aux = new Array();
		aux=id.split('_');

		//var voto = aux[0];
		var ididea = aux[1];


		var arre = {
		  idea_id:ididea,
	      grupo_id: Session.get('idgrupo'),
	    };

	    //Sconsole.log(arre);

	    Meteor.call('InsertVotI5', arre, function(error, result) //se define un metodo para insertar
	    {      
	      if (error)
	        return console.log(error.reason);
	       //Router.go('chatPage', {_id: result._id}); 
	    });     
  	},


  	'click .ficha': function(e)
	{
		e.preventDefault();

		var objeto = $(e.target);
		idIdea = $(objeto[0]).attr('name');
		var idea = Ideas.findOne( {_id: idIdea} );
		ideadesc = idea.messageBox;

		if(idea.nombre)
			var ideaname = idea.nombre;
		else
			var ideaname ='';

		if(idea.escenario)
			var ideaesce = idea.escenario;
		else
			var ideaesce = '';



		var grupo = Grupo.findOne( {_id: idea.idgrupo} );

		var numidea = $(objeto[0]).parent('td').parent('tr').find('.numIdea').text();


		//var resp = prompt('Ingrese Comentario');
		bootbox.dialog({
              backdrop: true,
              title: "completar Ficha...",
              message:  
              		 '<form id="formficha" novalidate="novalidate">'+
                    '<div class="form-group">'+

                    	'<div class="col-sm-6">'+
			            	'<label class="control-label" for="gruponame">Grupo: &nbsp;</label>'+
		                	'<input name="gruponame" id="gruponame" type="text" value="'+grupo.gr+'" disabled>'+
		                '</div>'+

			            '<div class="col-sm-6">'+
			                '<label class="control-label" for="numidea">N&deg; de Idea: &nbsp;</label>'+
			                '<input name="numidea" id="numidea" type="text" value="'+numidea+'" style="width:15%;" disabled>'+
		                '</div><br><br>'+


			            
		                '<div class="col-sm-12">'+
		                	'<label class="control-label" for="nombreID">Nombre de la IDEA:  &nbsp; </label>'+
		                   '<input name="nombreID" id="nombreID" type="text" value="'+ideaname+'" placeholder=""  style="width:80%;" required>'+
		                '</div><br><br><br>'+
			            
			           
		                 '<div class="col-sm-12">'+
		                	 '<label class="control-label" for="des">Descripcion:  &nbsp;</label><br>'+
		                    '<textarea cols="50" rows="10" name="des" id="des" required>'+ideadesc+' </textarea> '+                   
		                '</div><br><br>'+


		                 '<div class="col-sm-12">'+
		                	 '<label class="control-label" for="escenario">Escenario de Uso:  &nbsp;</label><br>'+
		                    '<textarea cols="50" rows="10" name="escenario" id="escenario" required> '+ideaesce+' </textarea> '+                   
		                '</div><br>'+
			                
			        '</div></form>',

              buttons: {
                  success: {
                      label: "Guardar",
                      className: "btn-primary",
                      callback: function (ev) { 
                           ev.preventDefault();

                           //console.log($('#comment #comentario'));

                          var $myForm = $('#formficha');
                          if ($myForm[0].checkValidity()) 
                          {
                         	
							var arre = {
						      nombre:  $('#formficha #nombreID').val(),
						      descripcion:  $('#formficha #des').val(),
						      escenario:  $('#formficha #escenario').val(),
						      ididea: idIdea,
						      idgrupo:  Session.get('idgrupo'),
						    };
						    Meteor.call('llenarFicha', arre, function(error, result) //se define un metodo para insertar
						    {      
						      if (error)
						        return console.log(error.reason);
						       //Router.go('chatPage', {_id: result._id}); 
						      bootbox.alert("Carga Exitosa");
						    });
                           
                            bootbox.hideAll();
                          }
                          else {
                                bootbox.alert("Complete todos los campos");
                                return false;
                                }
                                                                 
                      }//fin calback
                  }//fin success
              },//fin Buttons

              onEscape: function() {return ;},
        });  //FIN DIALOG
	  },

	
  });




	


		 


	
	
		
		
		
	
