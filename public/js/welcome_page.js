let $userModalContent;
let $errorModal;

$(document).ready(function () {
    $userModalContent = $('#add_person_form').detach();
    $errorModal = $('#error').detach();
});

$('#registry_button').click(function () {
    modal.open({
        content: $userModalContent,
        width: 340,
        height: 300,
    })
});

$('#inlet_button').click(function () {
    $('div#login_form').slideToggle();
});

$('#logout_button').click(function () {
    $.ajax({
        url: '/logout',
        type: 'GET'
    }).done(function (data) {
        window.location.replace(data)
    })
});

$(document).mouseup(function (e) {
    let login_form = $("#login_form");
    let inlet_button = $("#inlet_button");
    if ( !login_form.is(e.target)
        && login_form.has(e.target).length === 0
        && !inlet_button.is(e.target)) {
        $('#login_form').slideUp();
    }
});

$('#formLogin').submit(function (e) {
    e.preventDefault();

    $.ajax({
        url: '/login',
        type: 'POST',
        data: $('#formLogin').serialize(),
    }).done(function (data) {


        if (data['error']){
            modal_error.open({
                content: $errorModal,
                message: data['message'],
            });
        } else {
            window.location.replace(data['url'])
        }

        // window.location.replace('/personPage')
    });
});


