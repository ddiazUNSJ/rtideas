function rezisePantalla()
{
	var elemento = $("#piechat");
    var elemento2 = $("#chat");
	var posicion = elemento.position();
	var posicion2 = elemento2.position();
	var posY = (posicion.top - posicion2.top) - 10;

	//console.log(posY);
	$("#chat").css('min-height', posY);
	$("#chat").css('max-height', posY);
}


//contGrupos=0;

Template.chatPage.renderer = function (){


	rezisePantalla();
	$(window).resize(function() {
	  rezisePantalla();
	});
	
 };

 Template.contenidoChat.rendered = function ()
 { //alert('entra');

	rezisePantalla();
	$(window).resize(function() {
	  rezisePantalla();
	});



 };



Template.chatPage.helpers({ 
    
    getCountdown: function() {
		var sesionId = Session.get('idsesion');	    
		var sesionT = SesionTime.findOne( {sesion_id: sesionId},{ sort: {submitted: -1}} );
		return sesionT.countdown;
	},

    getTituloInt: function() {		
		var sesionId = Session.get('idsesion');
		var sesion = Sesion.findOne( {_id: sesionId} );
		var actual = sesion.instActual;
		var resul = Instancia.findOne( {numero: actual} );	
		return resul.nombre;
	},

	getDescInt: function() {
		var sesionId = Session.get('idsesion');
		var sesion = Sesion.findOne( {_id: sesionId} );
		var actual = sesion.instActual;
		var resul = Instancia.findOne( {numero: actual} );	
		return resul.descripcion;
	},

    getInstancia: function() { 
		var sesionId = Session.get('idsesion');
		var sesion = Sesion.findOne( {_id: sesionId} );

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
					/*$('#div_instancia0').animate({width: '100%'}, 150, function() {
		                $(this).hide();   */           
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
		            //});

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

		return fecha1 +' '+hora1;
	},

	IsAnimador: function() { 
 		//alert(Session.get('rol'));
    	return Session.get('subrol') == 'Animador';
	},

	get_grupos: function() {
		//var grupos = Session.get('idgrupo');
	    //return Grupo.find({_id:  {$in: grupos}}, {sort: {gr: 1}});	
	    return Grupo.find({}, {sort: {gr: 1}});	

	},
	
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

  	//Meteor.subscribe('gruposComp', idgrupoA);

	var grupC = GruposComp.findOne({sesion_id: idsesion});
	if(grupC)
	{
	    grupC = grupC.gruposIds;
	    var busq = grupC.indexOf(idgrupoA);
	}
	else {grupC = 0; busq = -1;}


	//los grupos que no estan en grupC no pueden ver las ideas compartidas
	
	if(busq == -1)
		{  
	  	var ideas = Ideas.find({idgrupo: idgrupoA }, { sort: {submitted: 1}});
	}
	else  {  
		var ideas = Ideas.find({idgrupo: {$in: grupC} }, { sort: {submitted: 1}} ); 
	}
	   

    var todos=Array();

    ideas.forEach( function(myDoc) 
    {
        if( myDoc.compartir.compartir == true )  
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
		
		var sesionId = Session.get('idsesion');
		var sesion = Sesion.findOne( {_id: sesionId} )
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
		/*if (sesion.instActual == 4)
		{
			Meteor.subscribe("votos_I4");
			return true;
		}else return false;*/
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
			if(votacion.voto == voto) 
				return "checked";
			else return "";
		}else 
			return "";
    },


    checkeadoI4: function(voto) {
    	var useractual = Meteor.userId();
		var votacion = VotacionI4.findOne( {user_id:useractual, idea_id:this._id} );
		if(votacion) 
		{
			if(votacion.voto == voto) 
				return "checked";
			else return "";
		}else 
			return "";
    },

   
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

    num_idea: function() {
    	var trs = $('#tablares tbody tr');
    	return trs.length + 1;
    },
   
   	getIdGrupo:  function() {    	
    	return Session.get('idgrupo');
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
	
	'submit #enviarIdea': function(e)
    {	
    	e.preventDefault();	

    	//alert(Session.get('idgrupo'));

		if( e.target.checkValidity() ){

			var new_message = {
			  messageBox: $("#messageBox").val(),
			  idgrupo: Session.get('idgrupo'),
			};

			//console.log(new_message);
			Meteor.call('ideasInsert', new_message, function(error, result) //se define un metodo para insertar
			{  			    
			  	if (error)
					return alert(error.reason);
				else{  	
			  		//Router.go('chatPage', {idgrupo:Session.get('idgrupo')});
			  	}
			});

			$("#messageBox").val("");
	   		//$("#messageBox").focus();
	   		$("#chat").scrollTop(9999999);

	   		rezisePantalla();
		} 
		//else alert('vacio');	     
	         
    },

     // Collapse ibox function
   'click .collapse-link': function(e) { 
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
		
        var idIdea = $(e.target);
		idIdea = $(idIdea[0]).attr('name');

        $('#insertComent #ididea').val( idIdea );
        $('#insertComent #comentario').val( '' );
        $('#modal_insert_comentario').modal('show');
	},

	'click .editar': function(e)
	{
		e.preventDefault();
		
        //var idIdea = $(e.target);
		//idIdea = $(idIdea[0]).attr('name');

		var idIdea = $(e.target);
		idIdea = $(idIdea[0]).attr('name');
		var idea = Ideas.findOne( {_id: idIdea} );
		ideaname = idea.messageBox;

        $('#editarIdea #idea_new').val( ideaname );        
        $('#editarIdea #ididea').val( idea._id );                
        $('#modal_editar_idea').modal('show');
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
		var aux = new Array();
		aux=id.split('_');
		var ididea = aux[1];

		var arre = {
		  idea_id:ididea,
	      grupo_id: Session.get('idgrupo'),
	    };

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

		var ficha = Ficha.findOne( {ididea: idIdea} );
		if(ficha){
			var ideaname = ficha.nombre;			
			var ideaesce = ficha.esc;
		}
		else {
			var ideaname ='';
			var ideaesce = '';
		}
	

		var grupo = Grupo.findOne( {_id: idea.idgrupo} );

		var numidea = $(objeto[0]).parent('td').parent('tr').find('.numIdea').text();

        $('#modal_ficha #gruponame').val( grupo.gr );
        $('#modal_ficha #numidea').val( numidea );
        $('#modal_ficha #nombre').val( ideaname );
        $('#modal_ficha #des').val( ideadesc );
        $('#modal_ficha #esc').val( ideaesce );
        $('#modal_ficha #ididea').val( idea._id );

        $('#modal_ficha').modal('show');
	},



  	/*'click .ficha': function(e)
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

                           
                          var $myForm = $('#formficha');

                         // console.log($('#myForm'));

                          if ($myForm[0].checkValidity()) 
                          {
                         	
							var arre = 
							{
						      nombre:  $('#formficha #nombreID').val(),
						      descripcion:  $('#formficha #des').val(),
						      escenario:  $('#formficha #escenario').val(),
						      ididea: idIdea,
						      idgrupo:  Session.get('idgrupo'),
						    };
						    //llenarFicha

						    Meteor.call('fichaInsert', arre, function(error, result) //se define un metodo para insertar
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
	},*/

	
});


Template.modales.events ({

	'submit #insertComent': function(e)
	{
		//e.preventDefault();

		if( e.target.checkValidity() )
	    {	     	
	    	var sesionId = Session.get('idsesion');
			var sesion = Sesion.findOne( {_id: sesionId} );

			var arre = {
		      comentario: $('#insertComent #comentario').val(),
		      ididea: $('#insertComent #ididea').val(),
		      idgrupo: Session.get('idgrupo'),
		      instancia: sesion.instActual,
		    };
		    
		    Meteor.call('comentInsert', arre, function(error, result) //se define un metodo para insertar
		    {      
		      if (error)
		        return console.log(error.reason);
		       //Router.go('chatPage', {_id: result._id}); 
		    });
	       
	        //bootbox.hideAll();
	        $('#modal_insert_comentario').modal('hide');
	    }
	},


	'submit #editarIdea': function(e)
	{
		//e.preventDefault();

		if( e.target.checkValidity() )
	    {	     	
			var arre = {
		      idea_new:  $('#editarIdea #idea_new').val(),
		      ididea: $('#editarIdea #ididea').val( ),
		      idgrupo:  Session.get('idgrupo'),
		    };

		    Meteor.call('editIdea', arre, function(error, result) //se define un metodo para insertar
		    {      
		      if (error)
		        return console.log(error.reason);
		       //Router.go('chatPage', {_id: result._id}); 
		    });
	       
	        //bootbox.hideAll();
	        $('#modal_editar_idea').modal('hide');
	    }
	},


	'submit #formficha': function(e)
	{
		//e.preventDefault();

		if( e.target.checkValidity() )
	    {	     	
	    	var sesionId = Session.get('idsesion');
			var sesion = Sesion.findOne( {_id: sesionId} );

			var arre = {
			  nombre:  $('#formficha #nombre').val(),
		      des: $('#formficha #des').val(),
		      esc: $('#formficha #esc').val(),
		      ididea: $('#formficha #ididea').val(),
		      idgrupo: Session.get('idgrupo'),
		    };
		    
		    
		    Meteor.call('fichaInsert', arre, function(error, result) //se define un metodo para insertar
		    {      
		      if (error)
		        return console.log(error.reason);
		       //Router.go('chatPage', {_id: result._id}); 
		    });
	       
	        //bootbox.hideAll();
	        $('#modal_ficha').modal('hide');
	    }
	},

});




	


		 


	
	
		
		
		
	
