let persons;


$(document).ready(function () {
    persons = $('#person_table').DataTable({
        "autoWidth": false,
        "paging": false,
        "info": false,
        "searching": false,
        ajax: {
            url: '/get_all_persons',
            dataSrc: ''
        },
        "columns": [

            {
                data: "name",
                width: "200px"
            },
            {
                data: "email",
                className: "text-position"
            }
        ],
        "order": [[1, 'asc']],
        "select": true
    });
});

function updateTable() {
    $.get('/get_all_persons', function (data) {
        persons.clear().rows.add(data).draw();
    });
}