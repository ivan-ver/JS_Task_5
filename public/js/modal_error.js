let modal_error =(function () {
    let $modal = $('<div class="error_modal"/>');

    return {
        position: function () {
            $modal.css({
                bottom: 120,
                right: 30,
                position: 'absolute'
            })
        },

        open: function (settings) {
            $modal.show();
            $modal.empty().append(settings.content);
            $modal.append('<h3>'+settings.message+'</h3>');
            $modal.css({
                'font-weight': 600,
                opacity: 0.7,
                width: 'auto',
                height: 'auto',
                'border-style': 'solid',
                'border-color': 'black',
                background: 'red',
                color: 'yellow',
                'text-align': 'center',
                'padding-left': 15,
                'padding-right': 15,
            }).appendTo('body');

            modal_error.position();
            $(window).on('resize',modal_error.position);
            setTimeout(modal_error.close, 5000)
        },

        close: function () {
            $modal.fadeOut(400);
        }
    };
}());

