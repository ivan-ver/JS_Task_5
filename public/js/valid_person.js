$('#addPerson').click(function () {
    validPerson();
    let data = $('#person_form').serialize();
    $.ajax({
        type: "POST",
        url: '/save_person',
        data: data,
    });
    modal.close();
    updateTable()
});


function validPerson(){
    let fail = false;
    let res = $("#person_form").serializeArray();
    let name = res[1]['value'];
    let email = res[2]['value'];
    let password = res[3]['value'];
    let repassword = res[4]['value'];

    if (name === '' || name === ' ')
        fail = 'Ведите имя пльзователя!';
    else if (email === '' || email === ' ')
        fail = 'Введите E-mail!';
    else if (emailPattern.test(email) === false)
        fail = 'Введите E-mail правильно!';
    else if (password === '' || password === ' ')
        fail = 'Введите пароль!';
    else if (password !== repassword)
        fail = 'Пароли не совпадают!';
    if (fail)
        alert(fail);
}


const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;