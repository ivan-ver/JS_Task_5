let modal =(function () {
    let $window = $(window);
    let $modal = $('<div class="modal"/>');
    let $content = $('<div class="modal-content"/>');
    let $overlay = $('<div id="overlay"></div>');
    let $close = $('<div id="modal_close">X</div>');


    $modal.append($content);
    $modal.append($close);


    $close.on('click',function (e) {
        e.preventDefault();
        modal.close();
    });

    return {
        center: function () {
            let top = Math.max($window.height() - $modal.outerHeight(),0)/2;
            let left = Math.max($window.width() - $modal.outerWidth(),0)/2;
            $modal.css({
                top: top+$window.scrollTop(),
                left: left+$window.scrollLeft(),
            })
        },

        open: function (settings) {
            $('body').append($overlay);
            $overlay.fadeIn(400);
            $content.empty().append((settings.content));
            $modal.css({
                width: 'auto',
                height: 'auto',
                'border-radius': '7px',
            }).appendTo('body');

            modal.center();
            $(window).on('resize',modal.center);
        },

        close: function () {
            document.querySelectorAll('textarea').forEach(el=>el.value = '');
            $overlay.fadeOut(400);
            $content.empty();
            $modal.detach();
            $(window).off('resize',modal.center);
        }
    };
}());

