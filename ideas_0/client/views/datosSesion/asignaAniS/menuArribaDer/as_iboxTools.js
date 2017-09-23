import './as_iboxTools.html';
Template.as_iboxTools.events({

    'click .collapse-link': function (event) {
        console.log("click en agregar animador de Sesion");
        Modal.show('as_TmplModalCreaAnimaS');
        // var element = $(event.target);
        // var ibox = element.closest('div.ibox');
        // var button = element.closest("i");
        // var content = ibox.find('div.ibox-content');
        // content.slideToggle(200);
        // button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
        // ibox.toggleClass('').toggleClass('border-bottom');
        // setTimeout(function () {
        //     ibox.resize();
        //     ibox.find('[id^=map-]').resize();
        // }, 50);
    },

    // 'click .close-link': function (event) {
    //     var element = $(event.target);
    //     var content = element.closest('div.ibox');
    //     content.remove();

    // },
    
});