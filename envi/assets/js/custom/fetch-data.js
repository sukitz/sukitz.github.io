
function resetModal() {
    $('#water_table tbody').remove()
    $('#light_table tbody').remove()
    $('#noise_table tbody').remove()
    $('#parameter_table tbody').remove()
    $('#parameter_table tfoot').remove()
}

function getDepots() {
    $.get({
        url: `${server_api}/depots`,
        headers: {
            'Authorization': localStorage.access_token
        },
    }).done(res => {
        if (res.status == "Success") {
            let temp = ``
            res.data.map(e => {
                temp += `<tr data-id="${e.depot_id}">`
                temp += `<td class="detail">${e.depot_id}</td>`
                temp += `<td class="detail">${e.depot_name}</td>`
                temp += `<td class="detail">${e.mE}</td>`
                temp += `<td class="detail">${e.mN}</td>`
                temp += `<td class="detail">${e.zone}</td>`
                temp += `<td>
                            <button type="button" rel="tooltip" title="Remove" class="btn btn-danger btn-fab btn-fab-mini" onclick="deleteDepot('${e.depot_id}')">
                                <i class="material-icons">close</i>
                            </button>
                        </td>`
                temp += `</tr>`
            })
            $('#table_depots tbody').empty()
            $('#num_depots').html(res.data.length)

            $('#table_depots tbody').append(temp)
            $(`#table_depots tbody`).on('click', 'td.detail', function () {
                let depot_id = $(this).closest('tr').attr('data-id')
                depotModal(depot_id)
                $('#modal').modal('show')
            });
        }
        $('#table_depots').DataTable()
        loader_table_depots.hide()
    }).fail(res => {
        $('#table_depots').DataTable()
        loader_table_depots.hide()
    })
}

function getGasStation() {
    $('#water_table tbody').remove()
    $('#light_table tbody').remove()
    $('#noise_table tbody').remove()
    $('#parameter_table tbody').remove()
    $.get({
        url: `${server_api}/gas_station`,
        headers: {
            'Authorization': localStorage.access_token
        },
    }).done(res => {
        if (res.status == "Success") {
            let temp = ``
            res.data.map(e => {
                temp += `<tr data-id="${e.gas_station_id}">`
                temp += `<td class="detail">${e.gas_station_id}</td>`
                temp += `<td class="detail">${e.gas_station_name}</td>`
                temp += `<td class="detail">${e.mE}</td>`
                temp += `<td class="detail">${e.mN}</td>`
                temp += `<td class="detail">${e.zone}</td>`
                temp += `<td>
                            <button type="button"  rel="tooltip" title="Remove" class="btn btn-danger btn-fab btn-fab-mini" onclick="deleteGasStation('${e.gas_station_id}')">
                                <i class="material-icons">close</i>
                            </button>
                        </td>`
                temp += `</tr>`
            })
            $('#table_gas_station tbody').empty()
            $('#num_gas_station').html(res.data.length)

            $('#table_gas_station tbody').append(temp)
            $(`#table_gas_station tbody`).on('click', 'td.detail', function () {
                let gas_station_id = $(this).closest('tr').attr('data-id')
                gasStationModal(gas_station_id)
                $('#modal').modal('show')
            });
        }
        $('#table_gas_station').DataTable()
        loader_table_gas_station.hide()
    }).fail(res => {
        $('#table_gas_station').DataTable()
        loader_table_gas_station.hide()
    })
}

function depotModal(id) {
    // resetModal()
    $.get({
        url: `${server_api}/depots/${id}`,
        headers: {
            'Authorization': localStorage.access_token
        },
    }).done(res => {
        if (res.status == "Success") {
            let temp1 = ``
            let temp2 = ``
            let temp3 = ``
            let temp4 = ``
            let temp5 = ``
            $('#modal_title').html(`${res.data.depot.depot_id} - ${res.data.depot.depot_name}`)
            res.data.depot_water.map(e => {
                temp1 += `<tr data-id="${e.water_id}">`
                temp1 += `<td>${e.year}</td>`
                temp1 += `<td>${e.pH}</td>`
                temp1 += `<td>${e.COD}</td>`
                temp1 += `<td>${e.TSS}</td>`
                temp1 += `<td>${e.FOG}</td>`
                temp1 += `<td>${e.BOD}</td>`
                temp1 += `<td>${e.DO}</td>`
                temp1 += `<td>
                            <button type="button" rel="tooltip" title="Remove" class="btn btn-danger btn-fab btn-fab-mini" onclick="deleteDepotChild('${e.water_id}','depot_water','${id}')">
                                <i class="material-icons">close</i>
                            </button>
                        </td>`
                temp1 += `</tr>`
            })

            res.data.depot_light.map(e => {
                temp2 += `<tr data-id="${e.light_id}">`
                temp2 += `<td>${e.year}</td>`
                temp2 += `<td>${e.sampling_point_name}</td>`
                temp2 += `<td>${e.lux}</td>`
                temp2 += `<td>
                            <button type="button" rel="tooltip" title="Remove" class="btn btn-danger btn-fab btn-fab-mini" onclick="deleteDepotChild('${e.light_id}','depot_light','${id}')">
                                <i class="material-icons">close</i>
                            </button>
                        </td>`
                temp2 += `</tr>`
            })

            res.data.depot_noise.map(e => {
                temp3 += `<tr data-id="${e.noise_id}">`
                temp3 += `<td>${e.year}</td>`
                temp3 += `<td>${e.sampling_point_name}</td>`
                temp3 += `<td>${e.L_eq}</td>`
                temp3 += `<td>${e.L_max}</td>`
                temp3 += `<td>
                            <button type="button" rel="tooltip" title="Remove" class="btn btn-danger btn-fab btn-fab-mini" onclick="deleteDepotChild('${e.noise_id}','depot_noise','${id}')">
                                <i class="material-icons">close</i>
                            </button>
                        </td>`
                temp3 += `</tr>`
            })

            res.data.depot_parameter.map(e => {
                temp4 += `<tr data-id="${e.parameter_id}">`
                temp4 += `<td>${e.date}</td>`
                temp4 += `<td>${e.CO}</td>`
                temp4 += `<td>${e.NO2}</td>`
                temp4 += `<td>${e.SO2}</td>`
                temp4 += `<td>${e.TSP}</td>`
                temp4 += `<td>${e.PM10}</td>`
                temp4 += `<td>${e['PM2.5']}</td>`
                temp4 += `<td>${e.O3}</td>`
                temp4 += `<td>${e.Pb}</td>`
                temp4 += `<td>${e.WS}</td>`
                temp4 += `<td>${e.WD}</td>`
                temp4 += `<td>${e.AT}</td>`
                temp4 += `<td>${e.RH}</td>`
                temp4 += `<td>${e.BP}</td>`
                temp4 += `<td>
                            <button type="button" rel="tooltip" title="Remove" class="btn btn-danger btn-fab btn-fab-mini" onclick="deleteDepotChild('${e.parameter_id}','depot_parameter','${id}')">
                                <i class="material-icons">close</i>
                            </button>
                        </td>`
                temp4 += `</tr>`
            })

            res.data.parameter_standard.map(e => {
                temp5 += `<tr>`
                temp5 += `<th>Standard</th>`
                temp5 += `<th>${e.CO}</th>`
                temp5 += `<th>${e.NO2}</th>`
                temp5 += `<th>${e.SO2}</th>`
                temp5 += `<th>${e.TSP}</th>`
                temp5 += `<th>${e.PM10}</th>`
                temp5 += `<th>${e['PM2.5']}</th>`
                temp5 += `<th>${e.O3}</th>`
                temp5 += `<th>${e.Pb}</th>`
                temp5 += `<th>${e.WS}</th>`
                temp5 += `<th>${e.WD}</th>`
                temp5 += `<th>${e.AT}</th>`
                temp5 += `<th>${e.RH}</th>`
                temp5 += `<th>${e.BP}</th>`
                temp5 += `<th></th>`
                temp5 += `</tr>`
            })

            let opt = {
                "destroy": true,
                "paging": true,
                "deferRender": true,
                "processing": true,
            }

            $('#water_table').append(`<tbody>${temp1}</tbody>`)
            $('#light_table').append(`<tbody>${temp2}</tbody>`)
            $('#noise_table').append(`<tbody>${temp3}</tbody>`)
            $('#parameter_table').append(`<tbody>${temp4}</tbody>`)
            $('#parameter_table').append(`<tfoot>${temp5}</tfoot>`)
            $('#water_table').DataTable(opt)
            $('#light_table').DataTable(opt)
            $('#noise_table').DataTable(opt)
            $('#parameter_table').DataTable(opt)
        }
    }).fail(res => {
        swal({
            title: "Warning!",
            text: "Please contact the system administrator.",
            type: "warning",
            showCancelButton: false,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "OK",
            closeOnConfirm: false
        });
    })

}

function gasStationModal(id) {
    // resetModal()
    $.get({
        url: `${server_api}/gas_station/${id}`,
        headers: {
            'Authorization': localStorage.access_token
        },
    }).done(res => {
        if (res.status == "Success") {
            let temp1 = ``
            let temp2 = ``
            let temp3 = ``
            let temp4 = ``
            let temp5 = ``
            $('#modal_title').html(`${res.data.gas_station.gas_station_id} - ${res.data.gas_station.gas_station_name}`)
           
            res.data.gas_station_water.map(e => {
                temp1 += `<tr data-id="${e.water_id}">`
                temp1 += `<td>${e.year}</td>`
                temp1 += `<td>${e.pH}</td>`
                temp1 += `<td>${e.COD}</td>`
                temp1 += `<td>${e.TSS}</td>`
                temp1 += `<td>${e.FOG}</td>`
                temp1 += `<td>${e.BOD}</td>`
                temp1 += `<td>${e.DO}</td>`
                temp1 += `<td>
                            <button type="button" rel="tooltip" title="Remove" class="btn btn-danger btn-fab btn-fab-mini" onclick="deleteGasStationChild('${e.water_id}','gas_station_water','${id}')">
                                <i class="material-icons">close</i>
                            </button>
                        </td>`
                temp1 += `</tr>`
            })

            res.data.gas_station_light.map(e => {
                temp2 += `<tr data-id="${e.light_id}">`
                temp2 += `<td>${e.year}</td>`
                temp2 += `<td>${e.sampling_point_name}</td>`
                temp2 += `<td>${e.lux}</td>`
                temp2 += `<td>
                            <button type="button" rel="tooltip" title="Remove" class="btn btn-danger btn-fab btn-fab-mini" onclick="deleteGasStationChild('${e.light_id}','gas_station_light','${id}')">
                                <i class="material-icons">close</i>
                            </button>
                        </td>`
                temp2 += `</tr>`
            })

            res.data.gas_station_noise.map(e => {
                temp3 += `<tr data-id="${e.noise_id}">`
                temp3 += `<td>${e.year}</td>`
                temp3 += `<td>${e.sampling_point_name}</td>`
                temp3 += `<td>${e.L_eq}</td>`
                temp3 += `<td>${e.L_max}</td>`
                temp3 += `<td>
                            <button type="button" rel="tooltip" title="Remove" class="btn btn-danger btn-fab btn-fab-mini" onclick="deleteGasStationChild('${e.noise_id}','gas_station_noise','${id}')">
                                <i class="material-icons">close</i>
                            </button>
                        </td>`
                temp3 += `</tr>`
            })

            res.data.gas_station_parameter.map(e => {
                temp4 += `<tr data-id="${e.parameter_id}">`
                temp4 += `<td>${e.date}</td>`
                temp4 += `<td>${e.CO}</td>`
                temp4 += `<td>${e.NO2}</td>`
                temp4 += `<td>${e.SO2}</td>`
                temp4 += `<td>${e.TSP}</td>`
                temp4 += `<td>${e.PM10}</td>`
                temp4 += `<td>${e['PM2.5']}</td>`
                temp4 += `<td>${e.O3}</td>`
                temp4 += `<td>${e.Pb}</td>`
                temp4 += `<td>${e.WS}</td>`
                temp4 += `<td>${e.WD}</td>`
                temp4 += `<td>${e.AT}</td>`
                temp4 += `<td>${e.RH}</td>`
                temp4 += `<td>${e.BP}</td>`
                temp4 += `<td>
                            <button type="button" rel="tooltip" title="Remove" class="btn btn-danger btn-fab btn-fab-mini" onclick="deleteGasStationChild('${e.parameter_id}','gas_station_parameter','${id}')">
                                <i class="material-icons">close</i>
                            </button>
                        </td>`
                temp4 += `</tr>`
            })

            res.data.parameter_standard.map(e => {
                temp5 += `<tr>`
                temp5 += `<th>Standard</th>`
                temp5 += `<th>${e.CO}</th>`
                temp5 += `<th>${e.NO2}</th>`
                temp5 += `<th>${e.SO2}</th>`
                temp5 += `<th>${e.TSP}</th>`
                temp5 += `<th>${e.PM10}</th>`
                temp5 += `<th>${e['PM2.5']}</th>`
                temp5 += `<th>${e.O3}</th>`
                temp5 += `<th>${e.Pb}</th>`
                temp5 += `<th>${e.WS}</th>`
                temp5 += `<th>${e.WD}</th>`
                temp5 += `<th>${e.AT}</th>`
                temp5 += `<th>${e.RH}</th>`
                temp5 += `<th>${e.BP}</th>`
                temp5 += `<th></th>`
                temp5 += `</tr>`
            })

            let opt = {
                "destroy": true,
                "paging": true,
                "deferRender": true,
                "processing": true,
            }

            $('#water_table').append(`<tbody>${temp1}</tbody>`)
            $('#light_table').append(`<tbody>${temp2}</tbody>`)
            $('#noise_table').append(`<tbody>${temp3}</tbody>`)
            $('#parameter_table').append(`<tbody>${temp4}</tbody>`)
            $('#parameter_table').append(`<tfoot>${temp5}</tfoot>`)
            $('#water_table').DataTable(opt)
            $('#light_table').DataTable(opt)
            $('#noise_table').DataTable(opt)
            $('#parameter_table').DataTable(opt)
        }
    }).fail(res => {
        swal({
            title: "Error!",
            text: "Please contact the system administrator.",
            type: "warning",
            showCancelButton: false,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "OK",
            closeOnConfirm: false
        });
    })

}

function deleteDepot(id) {
    swal({
        title: "Confirm deletion",
        type: "warning",
        showCancelButton: true,
    }).then(isConfirm => {
        if (isConfirm.value) {
            $.ajax({
                url: `${server_api}/depots/${id}`,
                headers: {
                    'Authorization': localStorage.access_token
                },
                type: 'DELETE',
                success: function (result) {
                    resetModal()
                    getDepots()
                }
            });
        }
    })
}

function deleteDepotChild(id, type, depot_id) {
    swal({
        title: "Confirm deletion",
        type: "warning",
        showCancelButton: true,
    }).then(isConfirm => {
        if (isConfirm.value) {
            $.ajax({
                url: `${server_api}/depots/${type}/${id}`,
                headers: {
                    'Authorization': localStorage.access_token
                },
                type: 'DELETE',
                success: function () {
                    resetModal()

                    depotModal(depot_id)
                }
            });
        }
    })
}

function deleteGasStation(id) {
    swal({
        title: "Confirm deletion",
        type: "warning",
        showCancelButton: true,
    }).then(isConfirm => {
        if (isConfirm.value) {
            $.ajax({
                url: `${server_api}/gas_station/${id}`,
                headers: {
                    'Authorization': localStorage.access_token
                },
                type: 'DELETE',
                success: function (result) {
                    resetModal()
                    getGasStation()
                }
            });
        }
    })
}

function deleteGasStationChild(id, type, gas_station_id) {
    swal({
        title: "Confirm deletion",
        type: "warning",
        showCancelButton: true,
    }).then(isConfirm => {
        if (isConfirm.value) {
            $.ajax({
                url: `${server_api}/gas_station/${type}/${id}`,
                headers: {
                    'Authorization': localStorage.access_token
                },
                type: 'DELETE',
                success: function () {
                    resetModal()
                    gasStationModal(gas_station_id)
                }
            });
        }
    })
}