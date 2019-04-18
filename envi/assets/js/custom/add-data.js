
var index_depot = 1
var index_gas_station = 1
var data
var data2
var data3
var data4
function resetDepotForm() {
    index_depot = 1
    $('#depot_parameter_table tbody').empty()
    $('#depot_noise_table tbody').empty()
    $('#depot_light_table tbody').empty()
    $('#depot_water_table tbody').empty()
    cancelRowDepotSamplingPoint()
    $('#depot_sampling_point_table tbody').empty()
}

function resetGasStationForm() {
    index_gas_station = 1
    $('#gas_station_parameter_table tbody').empty()
    $('#gas_station_noise_table tbody').empty()
    $('#gas_station_light_table tbody').empty()
    $('#gas_station_water_table tbody').empty()
    cancelRowGasStationSamplingPoint()
    $('#gas_station_sampling_point_table tbody').empty()
}
$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    let target = $(e.target).attr("href") // activated tab
    if (target == "#depot_parameter" || target == "#depot_water") {
        // loader.show()
        resetDepotForm()
        $.ajax({
            url: `${server_api}/depots`,
            headers: {
                'Authorization': localStorage.access_token
            },
        }).done(res => {
            data = res.data
            if (target == "#depot_water") {
                renderRowDepotWater()
            } else if (target == "#depot_parameter") {
                renderRow()
            }
            loader.hide()
        })
    } else if (target == "#depot_noise" || target == "#depot_light") {
        // loader.show()
        resetDepotForm()
        $.ajax({
            url: `${server_api}/depots`,
            headers: {
                'Authorization': localStorage.access_token
            },
        }).done(res => {
            $.ajax({
                url: `${server_api}/depots/depot_sampling_point`,
                headers: {
                    'Authorization': localStorage.access_token
                },
            }).done(res2 => {
                data = res.data
                data2 = res2.data
                if (target == "#depot_light") {
                    renderRowDepotLight()
                } else if (target == "#depot_noise") {
                    renderRowDepotNoise()
                }
                loader.hide()
            })
        })
    } else if (target == "#gas_station_parameter" || target == "#gas_station_water") {
        // loader.show()
        resetGasStationForm()
        $.ajax({
            url: `${server_api}/gas_station`,
            headers: {
                'Authorization': localStorage.access_token
            },
        }).done(res => {
            data3 = res.data
            if (target == "#gas_station_water") {
                renderRowGasStationWater()
            } else if (target == "#gas_station_parameter") {
                renderRowGasStationParameter()
            }
            loader.hide()
        })
    } else if (target == "#gas_station_noise" || target == "#gas_station_light") {
        resetGasStationForm()
        $.ajax({
            url: `${server_api}/gas_station`,
            headers: {
                'Authorization': localStorage.access_token
            },
        }).done(res => {
            $.ajax({
                url: `${server_api}/gas_station/gas_station_sampling_point`,
                headers: {
                    'Authorization': localStorage.access_token
                },
            }).done(res2 => {
                data3 = res.data
                data4 = res2.data
                if (target == "#gas_station_light") {
                    renderRowGasStationLight()
                } else if (target == "#gas_station_noise") {
                    renderRowGasStationNoise()
                }
                loader.hide()
            })
        })
    } else if (target == "#depot_sampling_point") {
        resetDepotForm()
        $.ajax({
            url: `${server_api}/depots/depot_sampling_point`,
            headers: {
                'Authorization': localStorage.access_token
            },
        }).done(res => {
            data = res.data
            renderRowDepotSamplingPoint()
            loader.hide()
        })
    } else if (target == "#gas_station_sampling_point") {
        resetGasStationForm()
        $.ajax({
            url: `${server_api}/gas_station/gas_station_sampling_point`,
            headers: {
                'Authorization': localStorage.access_token
            },
        }).done(res => {
            data3 = res.data
            renderRowGasStationSamplingPoint()
            loader.hide()
        })
    }
});

// start Depot

function renderRow() {
    let text = ``
    text += `<tr>`
    text += `<td><select class="form-control " name="depot_parameter[${index_depot}][id]" required>`
    data.map(e => {
        text += `<option value="${e.depot_id}">${e.depot_id} - ${e.depot_name}</option>`
    })
    text += `</select>`
    text += ` </td>`
    text += `<td><input type="date" class="form-control" name="depot_parameter[${index_depot}][date]" required></td>`
    text += `<td><input type="text" class="form-control" name="depot_parameter[${index_depot}][co]"></td>`
    text += `<td><input type="text" class="form-control" name="depot_parameter[${index_depot}][no2]"></td>`
    text += `<td><input type="text" class="form-control" name="depot_parameter[${index_depot}][so2]"></td>`
    text += `<td><input type="text" class="form-control" name="depot_parameter[${index_depot}][tsp]"></td>`
    text += `<td><input type="text" class="form-control" name="depot_parameter[${index_depot}][pm10]"></td>`
    text += `<td><input type="text" class="form-control" name="depot_parameter[${index_depot}][pm2_5]"></td>`
    text += `<td><input type="text" class="form-control" name="depot_parameter[${index_depot}][o3]"></td>`
    text += `<td><input type="text" class="form-control" name="depot_parameter[${index_depot}][pb]"></td>`
    text += `<td><input type="text" class="form-control" name="depot_parameter[${index_depot}][ws]"></td>`
    text += `<td><input type="text" class="form-control" name="depot_parameter[${index_depot}][wd]"></td>`
    text += `<td><input type="text" class="form-control" name="depot_parameter[${index_depot}][at]"></td>`
    text += `<td><input type="text" class="form-control" name="depot_parameter[${index_depot}][rh]"></td>`
    text += `<td><input type="text" class="form-control" name="depot_parameter[${index_depot}][bp]"></td>`
    text += `</tr>`
    index_depot++;
    $('#depot_parameter_table tbody').append(text)
}

function renderRowDepotNoise() {
    let text = ``
    text += `<tr>`
    text += `<td><select class="form-control " name="depot_noise[${index_depot}][id]" required>`
    data.map(e => {
        text += `<option value="${e.depot_id}">${e.depot_id} - ${e.depot_name}</option>`
    })
    text += `</select>`
    text += ` </td>`
    text += `<td><input type="number" class="form-control" name="depot_noise[${index_depot}][year]" min="1900" required></td>`
    text += `<td><select class="form-control " name="depot_noise[${index_depot}][sampling_point_name]" required>`
    data2.map(e => {
        text += `<option value="${e.sampling_point_name}">${e.sampling_point_name}</option>`
    })
    text += `<td><input type="text" class="form-control" name="depot_noise[${index_depot}][L_eq]"></td>`
    text += `<td><input type="text" class="form-control" name="depot_noise[${index_depot}][L_max]"></td>`
    text += `</tr>`
    index_depot++;
    $('#depot_noise_table tbody').append(text)
}

function renderRowDepotLight() {
    let text = ``
    text += `<tr>`
    text += `<td><select class="form-control " name="depot_light[${index_depot}][id]" required>`
    data.map(e => {
        text += `<option value="${e.depot_id}">${e.depot_id} - ${e.depot_name}</option>`
    })
    text += `</select>`
    text += ` </td>`
    text += `<td><input type="number" class="form-control" name="depot_light[${index_depot}][year]" min="1900" required></td>`
    text += `<td><select class="form-control " name="depot_light[${index_depot}][sampling_point_name]" required>`
    data2.map(e => {
        text += `<option value="${e.sampling_point_name}">${e.sampling_point_name}</option>`
    })
    text += `<td><input type="text" class="form-control" name="depot_light[${index_depot}][lux]"></td>`
    text += `</tr>`
    index_depot++;
    $('#depot_light_table tbody').append(text)
}

function renderRowDepotWater() {
    let text = ``
    text += `<tr>`
    text += `<td><select class="form-control " name="depot_water[${index_depot}][id]" required>`
    data.map(e => {
        text += `<option value="${e.depot_id}">${e.depot_id} - ${e.depot_name}</option>`
    })
    text += `</select>`
    text += ` </td>`
    text += `<td><input type="number" class="form-control" name="depot_water[${index_depot}][year]" min="1900" required></td>`
    text += `<td><input type="text" class="form-control" name="depot_water[${index_depot}][pH]"></td>`
    text += `<td><input type="text" class="form-control" name="depot_water[${index_depot}][COD]"></td>`
    text += `<td><input type="text" class="form-control" name="depot_water[${index_depot}][TSS]"></td>`
    text += `<td><input type="text" class="form-control" name="depot_water[${index_depot}][FOG]"></td>`
    text += `<td><input type="text" class="form-control" name="depot_water[${index_depot}][BOD]"></td>`
    text += `<td><input type="text" class="form-control" name="depot_water[${index_depot}][DO]"></td>`
    text += `</tr>`
    index_depot++;
    $('#depot_water_table tbody').append(text)
}

function renderRowDepotSamplingPoint() {
    let text = ``
    data.map(e => {
        text += `<tr>`
        text += `<td>${e.sampling_point_name}</td>`
        text += `<td>
                    <button type="button" rel="tooltip" title="Remove" class="btn btn-danger btn-fab btn-fab-mini" onclick="deleteDepotSamplingPoint('${e.sampling_point_name}')">
                        <i class="material-icons">close</i>
                    </button>
                </td>`
        text += `</tr>`
    })
    $('#depot_sampling_point_table tbody').append(text)
}

function addRow() {
    renderRow()
}

function delRow() {
    if ($('#depot_parameter_table tbody tr').length > 1) {
        index_depot--
        $('#depot_parameter_table tbody tr:last-child').remove()
    }
}

function addRowDepotNoise() {
    renderRowDepotNoise()
}

function delRowDepotNoise() {
    if ($('#depot_noise_table tbody tr').length > 1) {
        index_depot--
        $('#depot_noise_table tbody tr:last-child').remove()
    }
}

function addRowDepotLight() {
    renderRowDepotLight()
}

function delRowDepotLight() {
    if ($('#depot_light_table tbody tr').length > 1) {
        index_depot--
        $('#depot_light_table tbody tr:last-child').remove()
    }
}

function addRowDepotWater() {
    renderRowDepotWater()
}

function delRowDepotWater() {
    if ($('#depot_water_table tbody tr').length > 1) {
        index_depot--
        $('#depot_water_table tbody tr:last-child').remove()
    }
}

function addRowDepotSamplingPoint() {
    $('#btn_add_sp').hide()
    $('#btn_cancel_sp').show()
    $('#btn_save_sp').show()
    let text = ``
    text += `<tr id="new_row">`
    text += `<td colspan="2"><input type="text" name="sampling_point_name" class="form-control" required /></td>`
    text += `</tr>`
    $('#depot_sampling_point_table tbody').append(text)
    $('input[name=sampling_point_name]').focus()
}

function cancelRowDepotSamplingPoint() {
    $('#btn_add_sp').show()
    $('#btn_cancel_sp').hide()
    $('#btn_save_sp').hide()
    $('#new_row').remove()
}

function deleteDepotSamplingPoint(name) {
    swal({
        title: "Confirm deletion",
        type: "warning",
        showCancelButton: true,
    }).then(isConfirm => {
        if (isConfirm.value) {
            $.ajax({
                url: `${server_api}/depots/sampling_point/${name}`,
                headers: {
                    'Authorization': localStorage.access_token
                },
                type: 'DELETE',
                success: function () {
                    swal({
                        title: "Success!",
                        text: "Success",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonClass: "btn-danger",
                        confirmButtonText: "OK",
                        closeOnConfirm: false
                    })
                    cancelRowDepotSamplingPoint()
                    $('#depot_sampling_point_table tbody').empty()
                    renderRowDepotSamplingPoint()
                }
            });
        }
    })
}

$('#depot_form').submit(function (e) {
    e.preventDefault();
    // loader.show()
    $.post({
        url: `${server_api}/depots`,
        data: {
            "depot_id": `${$('#depot_id').val()}`,
            "depot_name": `${$('#depot_name').val()}`,
            "depot_mE": `${$('#depot_mE').val()}`,
            "depot_mN": `${$('#depot_mN').val()}`,
            "depot_zone": `${$('#depot_zone').val()}`
        },
        headers: {
            "Authorization": localStorage.access_token
        }
    }).done(res => {
        loader.hide()
        if (res.status == "Success") {
            swal({
                title: "Success!",
                text: res.msg,
                type: "success",
                showCancelButton: false,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "OK",
                closeOnConfirm: false
            }).then(() => {
                $('#depot_form').trigger("reset");
            })
        } else {
            swal({
                title: "Warning!",
                text: res.msg,
                type: "warning",
                showCancelButton: false,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "OK",
                closeOnConfirm: false
            });
        }
    })

})

$('#depot_parameter_form').submit(function (e) {
    e.preventDefault();
    // loader.show()
    $.post({
        url: `${server_api}/depots/parameter`,
        data: $('#depot_parameter_form').serializeArray(),
        headers: {
            "Authorization": localStorage.access_token
        }
    }).done(res => {
        loader.hide()
        if (res.status == "Success") {
            swal({
                title: "Success!",
                text: res.msg,
                type: "success",
                showCancelButton: false,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "OK",
                closeOnConfirm: false
            }).then(() => {
                $('#depot_parameter_table tbody').empty()
                index_depot = 1
                renderRow()
            })
        } else {
            swal({
                title: "Warning!",
                text: res.msg,
                type: "warning",
                showCancelButton: false,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "OK",
                closeOnConfirm: false
            });
        }
    })

})

$('#depot_noise_form').submit(function (e) {
    e.preventDefault();
    // loader.show()
    $.post({
        url: `${server_api}/depots/noise`,
        data: $('#depot_noise_form').serializeArray(),
        headers: {
            "Authorization": localStorage.access_token
        }
    }).done(res => {
        loader.hide()
        if (res.status == "Success") {
            swal({
                title: "Success!",
                text: res.msg,
                type: "success",
                showCancelButton: false,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "OK",
                closeOnConfirm: false
            }).then(() => {
                $('#depot_noise_table tbody').empty()
                index_depot = 1
                renderRowDepotNoise()
            })
        } else {
            swal({
                title: "Warning!",
                text: res.msg,
                type: "warning",
                showCancelButton: false,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "OK",
                closeOnConfirm: false
            });
        }
    })

})

$('#depot_light_form').submit(function (e) {
    e.preventDefault();
    // loader.show()
    $.post({
        url: `${server_api}/depots/light`,
        data: $('#depot_light_form').serializeArray(),
        headers: {
            "Authorization": localStorage.access_token
        }
    }).done(res => {
        loader.hide()
        if (res.status == "Success") {
            swal({
                title: "Success!",
                text: res.msg,
                type: "success",
                showCancelButton: false,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "OK",
                closeOnConfirm: false
            }).then(() => {
                $('#depot_light_table tbody').empty()
                index_depot = 1
                renderRowDepotLight()
            })
        } else {
            swal({
                title: "Warning!",
                text: res.msg,
                type: "warning",
                showCancelButton: false,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "OK",
                closeOnConfirm: false
            });
        }
    })

})

$('#depot_water_form').submit(function (e) {
    e.preventDefault();
    $.post({
        url: `${server_api}/depots/water`,
        data: $('#depot_water_form').serializeArray(),
        headers: {
            "Authorization": localStorage.access_token
        }
    }).done(res => {
        if (res.status == "Success") {
            swal({
                title: "Success!",
                text: res.msg,
                type: "success",
                showCancelButton: false,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "OK",
                closeOnConfirm: false
            }).then(() => {
                $('#depot_water_table tbody').empty()
                index_depot = 1
                renderRowDepotWater()
            })
        } else {
            swal({
                title: "Warning!",
                text: res.msg,
                type: "warning",
                showCancelButton: false,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "OK",
                closeOnConfirm: false
            });
        }
    })

})

$('#depot_sampling_point_form').submit(function (e) {
    e.preventDefault();

    $.post({
        url: `${server_api}/depots/sampling_point`,
        data: $('#depot_sampling_point_form').serializeArray(),
        headers: {
            "Authorization": localStorage.access_token
        }
    }).done(res => {
        if (res.status == "Success") {
            swal({
                title: "Success!",
                text: res.msg,
                type: "success",
                showCancelButton: false,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "OK",
                closeOnConfirm: false
            }).then(() => {
                let text = ``
                text += `<tr>`
                text += `<td>${$('input[name=sampling_point_name]').val()}</td>`
                text += `<td> 
                            <button type="button" rel="tooltip" title="Remove" class="btn btn-danger btn-fab btn-fab-mini" onclick="deleteDepotSamplingPoint('${$('input[name=sampling_point_name]').val()}')">
                                <i class="material-icons">close</i>
                            </button>
                        </td>`
                text += `</tr>`
                cancelRowDepotSamplingPoint()
                $('#depot_sampling_point_table tbody').append(text)
            })
        } else {
            swal({
                title: "Warning!",
                text: res.msg,
                type: "warning",
                showCancelButton: false,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "OK",
                closeOnConfirm: false
            });
        }
    }).fail(() => {
        swal({
            title: "Error!",
            text: `Please contact the system administrator.`,
            type: "warning",
            showCancelButton: false,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "OK",
            closeOnConfirm: false
        });
    })
})

// end Depot

// start Gas Station

function renderRowGasStationParameter() {
    let text = ``
    text += `<tr>`
    text += `<td> <select class="form-control " name="gas_station_parameter[${index_gas_station}][id]" required>`
    data3.map(e => {
        text += `<option value="${e.gas_station_id}">${e.gas_station_id} - ${e.gas_station_name}</option>`
    })
    text += `</select>`
    text += ` </td > `
    text += `<td> <input type="date" class="form-control" name="gas_station_parameter[${index_gas_station}][date]" required></td>`
    text += `<td> <input type="text" class="form-control" name="gas_station_parameter[${index_gas_station}][co]"></td>`
    text += `<td> <input type="text" class="form-control" name="gas_station_parameter[${index_gas_station}][no2]"></td>`
    text += `<td> <input type="text" class="form-control" name="gas_station_parameter[${index_gas_station}][so2]"></td>`
    text += `<td> <input type="text" class="form-control" name="gas_station_parameter[${index_gas_station}][tsp]"></td>`
    text += `<td> <input type="text" class="form-control" name="gas_station_parameter[${index_gas_station}][pm10]"></td>`
    text += `<td> <input type="text" class="form-control" name="gas_station_parameter[${index_gas_station}][pm2_5]"></td>`
    text += `<td> <input type="text" class="form-control" name="gas_station_parameter[${index_gas_station}][o3]"></td>`
    text += `<td> <input type="text" class="form-control" name="gas_station_parameter[${index_gas_station}][pb]"></td>`
    text += `<td> <input type="text" class="form-control" name="gas_station_parameter[${index_gas_station}][ws]"></td>`
    text += `<td> <input type="text" class="form-control" name="gas_station_parameter[${index_gas_station}][wd]"></td>`
    text += `<td> <input type="text" class="form-control" name="gas_station_parameter[${index_gas_station}][at]"></td>`
    text += `<td> <input type="text" class="form-control" name="gas_station_parameter[${index_gas_station}][rh]"></td>`
    text += `<td> <input type="text" class="form-control" name="gas_station_parameter[${index_gas_station}][bp]"></td>`
    text += `</tr > `
    index_gas_station++;
    $('#gas_station_parameter_table tbody').append(text)
}

function renderRowGasStationNoise() {
    let text = ``
    text += `<tr>`
    text += `<td> <select class="form-control " name="gas_station_noise[${index_gas_station}][id]" required>`
    data3.map(e => {
        text += `<option value="${e.gas_station_id}">${e.gas_station_id} - ${e.gas_station_name}</option>`
    })
    text += `</select>`
    text += ` </td > `
    text += `<td> <input type="number" class="form-control" name="gas_station_noise[${index_gas_station}][year]" min="1900" required></td>`
    text += `<td> <select class="form-control " name="gas_station_noise[${index_gas_station}][sampling_point_name]" required>`
    data4.map(e => {
        text += `<option value="${e.sampling_point_name}">${e.sampling_point_name}</option>`
    })
    text += `<td><input type="text" class="form-control" name="gas_station_noise[${index_gas_station}][L_eq]"></td>`
    text += `<td><input type="text" class="form-control" name="gas_station_noise[${index_gas_station}][L_max]"></td>`
    text += `</tr>`
    index_gas_station++;
    $('#gas_station_noise_table tbody').append(text)
}

function renderRowGasStationLight() {
    let text = ``
    text += `<tr>`
    text += `<td><select class="form-control " name="gas_station_light[${index_gas_station}][id]" required>`
    data3.map(e => {
        text += `<option value="${e.gas_station_id}">${e.gas_station_id} - ${e.gas_station_name}</option>`
    })
    text += `</select>`
    text += ` </td>`
    text += `<td><input type="number" class="form-control" name="gas_station_light[${index_gas_station}][year]" min="1900" required></td>`
    text += `<td><select class="form-control " name="gas_station_light[${index_gas_station}][sampling_point_name]" required>`
    data4.map(e => {
        text += `<option value="${e.sampling_point_name}">${e.sampling_point_name}</option>`
    })
    text += `<td><input type="text" class="form-control" name="gas_station_light[${index_gas_station}][lux]"></td>`
    text += `</tr>`
    index_gas_station++;
    $('#gas_station_light_table tbody').append(text)
}

function renderRowGasStationWater() {
    let text = ``
    text += `<tr>`
    text += `<td><select class="form-control " name="gas_station_water[${index_gas_station}][id]" required>`
    data3.map(e => {
        text += `<option value="${e.gas_station_id}">${e.gas_station_id} - ${e.gas_station_name}</option>`
    })
    text += `</select>`
    text += ` </td>`
    text += `<td><input type="number" class="form-control" name="gas_station_water[${index_gas_station}][year]" min="1900" required></td>`
    text += `<td><input type="text" class="form-control" name="gas_station_water[${index_gas_station}][pH]"></td>`
    text += `<td><input type="text" class="form-control" name="gas_station_water[${index_gas_station}][COD]"></td>`
    text += `<td><input type="text" class="form-control" name="gas_station_water[${index_gas_station}][TSS]"></td>`
    text += `<td><input type="text" class="form-control" name="gas_station_water[${index_gas_station}][FOG]"></td>`
    text += `<td><input type="text" class="form-control" name="gas_station_water[${index_gas_station}][BOD]"></td>`
    text += `<td><input type="text" class="form-control" name="gas_station_water[${index_gas_station}][DO]"></td>`
    text += `</tr>`
    index_gas_station++;
    $('#gas_station_water_table tbody').append(text)
}

function addRowGasStationParameter() {
    renderRowGasStationParameter()
}

function delRowGasStationParameter() {
    if ($('#gas_station_parameter_table tbody tr').length > 1) {
        index_gas_station--
        $('#gas_station_parameter_table tbody tr:last-child').remove()
    }
}

function addRowGasStationNoise() {
    renderRowGasStationNoise()
}

function delRowGasStationNoise() {
    if ($('#gas_station_noise_table tbody tr').length > 1) {
        index_gas_station--
        $('#gas_station_noise_table tbody tr:last-child').remove()
    }
}

function addRowGasStationLight() {
    renderRowGasStationLight()
}

function delRowGasStationLight() {
    if ($('#gas_station_light_table tbody tr').length > 1) {
        index_gas_station--
        $('#gas_station_light_table tbody tr:last-child').remove()
    }
}

function addRowGasStationWater() {
    renderRowGasStationWater()
}

function delRowGasStationWater() {
    if ($('#gas_station_water_table tbody tr').length > 1) {
        index_gas_station--
        $('#gas_station_water_table tbody tr:last-child').remove()
    }
}


function renderRowGasStationSamplingPoint() {
    let text = ``
    data3.map(e => {
        text += `<tr>`
        text += `<td>${e.sampling_point_name}</td>`
        text += `<td>
                    <button type="button" rel="tooltip" title="Remove" class="btn btn-danger btn-fab btn-fab-mini" onclick="deleteGasStationSamplingPoint('${e.sampling_point_name}')">
                        <i class="material-icons">close</i>
                    </button>
                </td>`
        text += `</tr>`
    })
    $('#gas_station_sampling_point_table tbody').append(text)
}

function deleteGasStationSamplingPoint(name) {
    swal({
        title: "Confirm deletion",
        type: "warning",
        showCancelButton: true,
    }).then(isConfirm => {
        if (isConfirm.value) {
            $.ajax({
                url: `${server_api}/gas_station/sampling_point/${name}`,
                headers: {
                    'Authorization': localStorage.access_token
                },
                type: 'DELETE',
                success: function () {
                    swal({
                        title: "Success!",
                        text: "Success",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonClass: "btn-danger",
                        confirmButtonText: "OK",
                        closeOnConfirm: false
                    })
                    cancelRowGasStationSamplingPoint()
                    $('#gas_station_sampling_point_table tbody').empty()
                    renderRowGasStationSamplingPoint()
                }
            });
        }
    })
}
function addRowGasStationSamplingPoint() {
    $('#btn_add_sp_sp').hide()
    $('#btn_cancel_sp_sp').show()
    $('#btn_save_sp_sp').show()
    let text = ``
    text += `<tr id="new_row_sp">`
    text += `<td colspan="2"><input type="text" name="gas_station_sampling_point_name" class="form-control" required /></td>`
    text += `</tr>`
    $('#gas_station_sampling_point_table tbody').append(text)
    $('input[name=gas_station_sampling_point_name]').focus()
}

function cancelRowGasStationSamplingPoint() {
    $('#btn_add_sp_sp').show()
    $('#btn_cancel_sp_sp').hide()
    $('#btn_save_sp_sp').hide()
    $('#new_row_sp').remove()
}

$('#gas_station_sampling_point_form').submit(function (e) {
    e.preventDefault();

    $.post({
        url: `${server_api}/gas_station/sampling_point`,
        data: $('#gas_station_sampling_point_form').serializeArray(),
        headers: {
            "Authorization": localStorage.access_token
        }
    }).done(res => {
        if (res.status == "Success") {
            swal({
                title: "Success!",
                text: res.msg,
                type: "success",
                showCancelButton: false,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "OK",
                closeOnConfirm: false
            }).then(() => {
                let text = ``
                text += `<tr>`
                text += `<td>${$('input[name=gas_station_sampling_point_name]').val()}</td>`
                text += `<td> 
                            <button type="button" rel="tooltip" title="Remove" class="btn btn-danger btn-fab btn-fab-mini" onclick="deleteGasStationSamplingPoint('${$('input[name=gas_station_sampling_point_name]').val()}')">
                                <i class="material-icons">close</i>
                            </button>
                        </td>`
                text += `</tr>`
                cancelRowGasStationSamplingPoint()
                $('#gas_station_sampling_point_table tbody').append(text)
            })
        } else {
            swal({
                title: "Warning!",
                text: res.msg,
                type: "warning",
                showCancelButton: false,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "OK",
                closeOnConfirm: false
            });
        }
    }).fail(() => {
        swal({
            title: "Error!",
            text: `Please contact the system administrator.`,
            type: "warning",
            showCancelButton: false,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "OK",
            closeOnConfirm: false
        });
    })
})

$('#gas_station_form').submit(function (e) {
    e.preventDefault();
    // loader.show()
    $.post({
        url: `${server_api}/gas_station`,
        data: {
            "gas_station_id": `${$('#gas_station_id').val()}`,
            "gas_station_name": `${$('#gas_station_name').val()}`,
            "gas_station_mE": `${$('#gas_station_mE').val()}`,
            "gas_station_mN": `${$('#gas_station_mN').val()}`,
            "gas_station_zone": `${$('#gas_station_zone').val()}`
        },
        headers: {
            "Authorization": localStorage.access_token
        }
    }).done(res => {
        loader.hide()
        if (res.status == "Success") {
            swal({
                title: "Success!",
                text: res.msg,
                type: "success",
                showCancelButton: false,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "OK",
                closeOnConfirm: false
            }).then(() => {
                $('#gas_station_form').trigger("reset");
            })
        } else {
            swal({
                title: "Warning!",
                text: res.msg,
                type: "warning",
                showCancelButton: false,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "OK",
                closeOnConfirm: false
            });
        }
    })

})

$('#gas_station_parameter_form').submit(function (e) {
    e.preventDefault();
    // loader.show()
    $.post({
        url: `${server_api}/gas_station/parameter`,
        data: $('#gas_station_parameter_form').serializeArray(),
        headers: {
            "Authorization": localStorage.access_token
        }
    }).done(res => {
        loader.hide()
        if (res.status == "Success") {
            swal({
                title: "Success!",
                text: res.msg,
                type: "success",
                showCancelButton: false,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "OK",
                closeOnConfirm: false
            }).then(() => {
                $('#gas_station_parameter_table tbody').empty()
                index_gas_station = 1
                renderRowGasStationParameter()
            })
        } else {
            swal({
                title: "Warning!",
                text: res.msg,
                type: "warning",
                showCancelButton: false,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "OK",
                closeOnConfirm: false
            });
        }
    })

})

$('#gas_station_noise_form').submit(function (e) {
    e.preventDefault();
    // loader.show()
    $.post({
        url: `${server_api}/gas_station/noise`,
        data: $('#gas_station_noise_form').serializeArray(),
        headers: {
            "Authorization": localStorage.access_token
        }
    }).done(res => {
        loader.hide()
        if (res.status == "Success") {
            swal({
                title: "Success!",
                text: res.msg,
                type: "success",
                showCancelButton: false,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "OK",
                closeOnConfirm: false
            }).then(() => {
                $('#gas_station_noise_table tbody').empty()
                index_gas_station = 1
                renderRowGasStationNoise()

            })
        } else {
            swal({
                title: "Warning!",
                text: res.msg,
                type: "warning",
                showCancelButton: false,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "OK",
                closeOnConfirm: false
            });
        }
    })

})

$('#gas_station_light_form').submit(function (e) {
    e.preventDefault();
    // loader.show()
    $.post({
        url: `${server_api}/gas_station/light`,
        data: $('#gas_station_light_form').serializeArray(),
        headers: {
            "Authorization": localStorage.access_token
        }
    }).done(res => {
        loader.hide()
        if (res.status == "Success") {
            swal({
                title: "Success!",
                text: res.msg,
                type: "success",
                showCancelButton: false,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "OK",
                closeOnConfirm: false
            }).then(() => {
                $('#gas_station_light_table tbody').empty()
                index_gas_station = 1
                renderRowGasStationLight()
            })
        } else {
            swal({
                title: "Warning!",
                text: res.msg,
                type: "warning",
                showCancelButton: false,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "OK",
                closeOnConfirm: false
            });
        }
    })

})

$('#gas_station_water_form').submit(function (e) {
    e.preventDefault();
    // loader.show()
    $.post({
        url: `${server_api}/gas_station/water`,
        data: $('#gas_station_water_form').serializeArray(),
        headers: {
            "Authorization": localStorage.access_token
        }
    }).done(res => {
        loader.hide()
        if (res.status == "Success") {
            swal({
                title: "Success!",
                text: res.msg,
                type: "success",
                showCancelButton: false,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "OK",
                closeOnConfirm: false
            }).then(() => {
                $('#gas_station_water_table tbody').empty()
                index_gas_station = 1
                renderRowGasStationWater()
            })
        } else {
            swal({
                title: "Warning!",
                text: res.msg,
                type: "warning",
                showCancelButton: false,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "OK",
                closeOnConfirm: false
            });
        }
    })

})