var server_api = "http://localhost:3999/api/v1"
$('#logout').click(function (e) {
    e.preventDefault()
    localStorage.clear()
    location.replace('./login.html')
})

$(document).ready(function () {
    $.get({
        url: `${server_api}/login`,
        headers: {
            "authenticaion": localStorage.access_token
        }
    }).done(res => {
        if (res.status == "Success") {
            if (window.location.pathname.split('/').pop() == "login.html") {
                location.replace('./')
            } else {
                $('body').show()
            }
        } else {
            if (window.location.pathname.split('/').pop() != "login.html") {
                location.replace('./login.html')
            } else {
                $('body').show()
            }
        }
    }).fail(err => {
        if (window.location.pathname.split('/').pop() != "login.html") {
            location.replace('./login.html')
        } else {
            $('body').show()
        }
    })
})