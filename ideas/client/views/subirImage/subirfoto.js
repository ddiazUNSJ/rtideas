// import './subir.html';
import { $ } from 'meteor/jquery';
import datatables from 'datatables.net';
import datatables_bs from 'datatables.net-bs';
import datatables_netbs from 'datatables.net-buttons';
import datatables_netbuttonbs from 'datatables.net-buttons-bs';
import {toDataURL} from  '/client/utilidades/utilities.js';

 
 import Tabular from 'meteor/aldeed:tabular';
// import { Template } from 'meteor/templating';
// import moment from 'moment';
// import { Meteor } from 'meteor/meteor';
// import { Books } from './collections/Books';

// TabularTables.AlbumsList = new Tabular.Table({
//   name: "Great Albums List",
//   collection: Albums,
//   columns: [
//     {data: "artNr", title: "Art.Nr", class: "col-md-1"},
//     {data: "artistName", title: "Artist", class: "col-md-3"},
//     {data: "albumTitle", title: "Title", class: "col-md-4"},
//     {data: "inStock", title: "In stock", class: "col-md-1"},
//     {data: "backOrdersPossible", title: "Backorders Possible", class: "col-md-1"},
//     {data: "price", title: "Price", class: "col-md-1"},
//     {
//       tmpl: Meteor.isClient && Template.AlbumActionBtns, class: "col-md-1"
//     }

//   ]
// });
//    {{> tabular table=TabularTables.AlbumsList class="table table-striped table-bordered table-condensed"}}





/*****************************************************************************/
/* subir: Event Handlers and Helpersss .js*/
/*****************************************************************************/
var cambiarA=false;
var dirImage="";
var idImage="";
Template.subirfoto.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
   'click tbody > tr': function (event) {
    var dataTable = $(event.target).closest('table').DataTable();
    var rowData = dataTable.row(event.currentTarget).data();
    if (!rowData) return; 

    dirImageAux=dirImage;
    console.log(rowData);
    if (rowData.versions.original.meta.pipePath==""){
        dirImage="img/p3.jpg";

      }
    else
      {
        
          dirImage=rowData.versions.original.meta.pipeFrom;
          idImage=rowData._id;
          cambiarA=true;
          $("#cambiarAvatar").show();
        
      }
     if (dirImage!=dirImageAux){
      $image.cropper("reset", true).cropper("replace", dirImage);
      }
   
  }
});



Template.subirfoto.helpers({
  //Imagen a mostrar correspondiente a la celda seleccionada
   imageA:function () {
     return Session.get('avatarDataUri'); 
     },
});

/*****************************************************************************/
/* subir: Lifecycle Hooks */
/*****************************************************************************/
Template.subirfoto.created = function () {
    Meteor.subscribe("miDropbox", Session.get(Meteor.userId()));
    $("#cambiarAvatar").hide();
};

Template.subirfoto.rendered = function () {

 // oculta o muestra boton cambiarAvatar 
 if (cambiarA)
       {$("#cambiarAvatar").show();}
 else {  $("#cambiarAvatar").hide();}  

//$('.dataTables-example').dataTable({
  $('#miTabla').dataTable({
        //"dom": 'lT<"clear">fgitp'
        dom :'<"html5buttons">BlTfgitp',
    //     dom: 'Bfrtip',
        buttons: [
                {extend: 'copy'},
                {extend: 'csv'},
                {extend: 'excel', title: 'ExampleFile'},
                {extend: 'pdf', title: 'ExampleFile'},

     ],
  "language": {
            
            "sProcessing":     "Procesando...",
            "sLengthMenu":     "Mostrar _MENU_ registros",
            "sZeroRecords":    "No se encontraron resultados",
            "sEmptyTable":     "Ningún dato disponible en esta tabla",
            "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix":    "",
            "sSearch":         "Buscar:",
            "sUrl":            "",
            "sInfoThousands":  ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst":    "Primero",
                "sLast":     "Último",
                "sNext":     "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
  }
  });
/*      "dom": 'T<"clear">lfrtip'
    $('.dataTables-example').DataTable({
      
       dom: '<"html5buttons"B>lTfgitp',
   
        buttons: [
            { extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: 'ExampleFile'},
            {extend: 'pdf', title: 'ExampleFile'},

            {extend: 'print',
                customize: function (win){
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');

                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            }
        ]

    });*/
      // Set options for cropper plugin

    $image = $(".image-crop > img")
    $($image).cropper({
        aspectRatio: 1,
        preview: ".img-preview",
        done: function(data) {
            // Output the result data for cropping image.
        }
    });

    var $inputImage = $("#inputImage2");
    if (window.FileReader) {
        $inputImage.change(function() {
            var fileReader = new FileReader(),
                files = this.files,
                file;

            if (!files.length) {
                return;
            }

            file = files[0];

            if (/^image\/\w+$/.test(file.type)) {
                fileReader.readAsDataURL(file);
                fileReader.onload = function () {
                    $inputImage.val("");
                    $image.cropper("reset", true).cropper("replace", this.result);
                };
            } else {
                showMessage("Por favor eliga una archivo que contenga una imagen.");
            }
        });
    } else {
        $inputImage.addClass("hide");
    }

    $("#download").click(function() {

      var url = $image.cropper("getCroppedCanvas").toDataURL();
      // Insertar avatar en imagenes gestionadas por ostrio files 
      var siga=false;
      var inputValue="";
      swal({
            title: "Ingresar de Archivo!",
            text: "Nombre Archivo:",
            type: "input",
            showCancelButton: true,
            closeOnConfirm: false,
            animation: "slide-from-top",
            inputPlaceholder: "Escriba nombre de archivo"
          },
          function(inputValue){
            if (inputValue === null) return false;
            
             if (inputValue === "") {
              swal.showInputError("Se necesita un nombre para el archivo!");
              return false;
               }
             
             Meteor.call('hayNombreRepetido',inputValue,function (error, result){ 
              // siga = result;
               if (result==false)
               { 
                    dropboxF.insert({
                    file: url,
                    isBase64: true, // <— Mandatory
                    fileName: inputValue, // <— Mandatory
                    onBeforeUpload(file2) {
                      if ((inputValue ==="")||(inputValue ===undefined)||(inputValue === null)){
                      return false;
                        }
                      else  {return true;}
                    },
                    onUploaded: function (error, fileObj) {
                        if (error) {
                          alert('Error during upload: ' + error);
                        } else {
                          Meteor.call('setIdAvatarEnUsers', fileObj._id,function (error, result){
                              Session.set('avatarUrl', url);
                          });
                           swal("La imagen " + inputValue, "ha sido cargada");
                          console.log(fileObj._id);

                        }
                     
                      },
                      streams: 'dynamic',
                      chunkSize: 'dynamic'
                    });
                    return true;
                 }
                 else {
                       swal.showInputError("El nombre ya existe, elija otro!");
                       return false;
                     } 

             });

             
           
            
           
            
            // Muestra imagen en una ventana de navegador a parte
            //window.open( $image.cropper("getCroppedCanvas").toDataURL());
  
          
      });
      
    });

     $("#cambiarAvatar").click(function() {
      Meteor.call('setIdAvatarEnUsers',idImage,function (error, result){
        if (result){
          //Si la carga es ok cargamos el avatar con la direccion  de la imagen
          Session.set('avatarUrl', dirImage);
          //avatar a dataUri
          Meteor.call('demeAvatarUrl',function (error, result){
            var dataUri;  
            if (result!=""){
              toDataURL(result, function(dataUri) {
                Session.set('avatarDataUri', dataUri); 
                console.log('Data:', dataUri)
              });
            }
          });
        }
       });
    
      
      swal("Actualizando Avatar con esta imagen " ); 
      $("#cambiarAvatar").hide();
       cambiarA=false;
     });

    $("#zoomIn").click(function() {
        $image.cropper("zoom", 0.1);
    });

    $("#zoomOut").click(function() {
        $image.cropper("zoom", -0.1);
    });

    $("#rotateLeft").click(function() {
        $image.cropper("rotate", 45);
    });

    $("#rotateRight").click(function() {
        $image.cropper("rotate", -45);
      
    });

    $("#setDrag").click(function() {

       $image.cropper("reset", true).cropper("replace", dirImage);
       // $image.cropper.reset;
       //  $image.cropper.resetPreview;
       //  $image.cropper("setDragMode", "crop");
        
    });

//todos=dropboxF.collection.find();


};

Template.subirfoto.destroyed = function () {

 
};


Template.subirfoto.onCreated(function () {
  datatables(window, $);
  datatables_bs(window, $);
    datatables_netbs(window, $);
    datatables_netbuttonbs(window, $);

 //dirImage= Session.get('avatarUrl');
 
  
});
