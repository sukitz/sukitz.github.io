$(document).ready(function () {
    $.get({
        url: `${server_api}/standard`,
        headers: {
            'Authorization': localStorage.access_token
        }
    }).done(res => {
        let temp = ``
        for (i in res.data) {
            let sub = i.split(/[a-zA-Z]/).pop()
            let pre = i.split(/[\d]/)[0]
            temp += `<tr class="${i}">`
            temp += `<th width="20%">${pre}<sub>${sub}</th>`
            temp += `<td width="40%">
                        <span class="text-standard" >${res.data[i][0]}</sub></span>
                        <input type="text" style="display: none;" class="form-control input-standard" value="${res.data[i][0]}" name="[standard][1][${i}]" />
                    </td>`
            temp += `<td width="40%">
                        <span class="text-standard" >${res.data[i][1]}</sub></span>
                        <input type="text" style="display: none;" class="form-control input-standard" value="${res.data[i][1]}" name="[standard][2][${i}]" />
                    </td>`
            temp += `</tr>`
        }
        $('#standard_table tbody').append(temp)
    })
})

function editStandatd() {
    $('#btn_edit_standard').hide()
    $('.text-standard').hide()

    $('.input-standard').show()
    $('#btn_cancel_standard').show()
    $('#btn_save_standard').show()
}

function cancelStandatd() {
    $('.input-standard').hide()
    $('#btn_cancel_standard').hide()
    $('#btn_save_standard').hide()

    $('#btn_edit_standard').show()
    $('.text-standard').show()

}

$('#standard_form').submit(function (e) {
    e.preventDefault()
    $.ajax({
        url: `${server_api}/standard`,
        type: 'PUT',
        data: $('#standard_form').serializeArray(),
        headers: {
            'Authorization': localStorage.access_token
        }
    }).done(res => {
        $('#standard_table tbody').empty()

        $('#btn_cancel_standard').hide()
        $('#btn_save_standard').hide()
        $('#btn_edit_standard').show()

        swal({
            title: "Success!",
            text: "Success",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "OK",
            closeOnConfirm: false
        })

        let temp = ``
        for (i in res.standard) {
            let sub = i.split(/[a-zA-Z]/).pop()
            let pre = i.split(/[\d]/)[0]
            temp += `<tr class="${i}">`
            temp += `<th width="20%">${pre}<sub>${sub}</th>`
            temp += `<td width="40%">
                        <span class="text-standard" >${res.standard[i][0]}</sub></span>
                        <input type="text" style="display: none;" class="form-control input-standard" value="${res.standard[i][0]}" name="[standard][1][${i}]" />
                    </td>`
            temp += `<td width="40%">
                        <span class="text-standard" >${res.standard[i][1]}</sub></span>
                        <input type="text" style="display: none;" class="form-control input-standard" value="${res.standard[i][1]}" name="[standard][2][${i}]" />
                    </td>`
            temp += `</tr>`
        }
        $('#standard_table tbody').append(temp)
    })
})