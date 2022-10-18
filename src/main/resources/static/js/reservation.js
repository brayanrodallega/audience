$(document).ready(function () {
    getAllClient();
    getAllAudience();
    getAllReservation();
});

function getAllClient() {
    $.ajax({
        url: "api/Client/all",
        type: "GET",
        dataType: 'JSON',
        success: function (p) {
            console.log(p);
            $("#client_id").empty()
            let option = `<option value="0">Seleccione...</option>`;
            for (i = 0; i < p.length; i++) {
                option = `<option value="${p[i].idClient}">${p[i].name}</option>`;
                $("#client_id").append(option);
            }
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema');
        },
        complete: function (xhr, status) {
            // alert('Perición realizada')
        }
    });
}

function getAllAudience() {
    $.ajax({
        url: "api/Audience/all",
        type: "GET",
        dataType: 'JSON',
        success: function (p) {
            console.log(p);
            $("#audience_id").empty()
            let option = `<option value="0">Seleccione...</option>`;
            for (i = 0; i < p.length; i++) {
                option = `<option value="${p[i].id}">${p[i].name}</option>`;
                $("#audience_id").append(option);
            }
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema');
        },
        complete: function (xhr, status) {
            // alert('Perición realizada')
        }
    });
}

function getAllReservation() {

    $.ajax({
        url: "api/Reservation/all",
        type: "GET",
        dataType: 'JSON',
        success: function (p) {
            console.log(p);
            $("#resultsReservation").empty()
            for (i = 0; i < p.length; i++) {

                let card = `<div class="col">
                                <div class="card text-bg-success mb-3">
                                    <div class="card-header">Status: ${p[i].status}</div>
                                    <div class="card-body">
                                        <h4 class="card-title text-light">Audience: ${p[i].audience.name}</h4>
                                        <h5 class="card-subtitle mb-2 text-light">Client: ${p[i].client.name}</h5>
                                        <p class="card-text">
                                            Inicio: ${new Date(p[i].startDate).toDateString()} <br>
                                            Devolucion: ${new Date(p[i].devolutionDate).toDateString()}
                                        </p>
                                    </div>
                                    <div class="card-footer">
                                        <div class="btn-group" role="group">
                                            <button type="button" class="btn btn-outline-light" onclick='getReservationById(${p[i].idReservation})'>Actualizar</button>
                                            <button type="button" class="btn btn-outline-light" onclick='deleteReservationById(${p[i].idReservation})'>Borrar</button>
                                            <button type="button" class="btn btn-outline-light" onclick='statusCompletedReservation(${p[i].idReservation})'>Completar</button>
                                            <button type="button" class="btn btn-outline-light" onclick='statusCancelledReservation(${p[i].idReservation})'>Cancelar</button>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>`;
                $("#resultsReservation").append(card);
            }
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema');
        },
        complete: function (xhr, status) {
            // alert('Perición realizada')
        }
    });
}

function getReservationData() {
    let reservation = {
        idReservation: parseInt($("#idReservation").val()),
        startDate: new Date($("#startDate").val()),
        devolutionDate: new Date($("#devolutionDate").val()),
        status: $("#status").val(),
        client: {idClient: parseInt($("#client_id").val())},
        audience: {id: parseInt($("#audience_id").val())}
    };
    return reservation;
}

function cleanData() {
    $("#startDate").val("");
    $("#devolutionDate").val("");
    $("#status").val("");
    $("#client_id").val("");
    $("#audience_id").val("");
}

function saveReservation() {

    let reservation = getReservationData();
    reservation.idReservation = null;
    reservation.status = "created";
    let dataToSend = JSON.stringify(reservation);

    $.ajax({
        url: "api/Reservation/save",
        type: "POST",
        data: dataToSend,
        contentType: 'application/json',
        success: function (p) {
            console.log(p);
            cleanData();
            getAllReservation();
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema');
        },
        complete: function (xhr, status) {
            // alert('Perición realizada')
        }
    });
}

function getReservationById(id) {

    $(".saveButtonBR").hide();
    $(".updateButtonBR").show();

    $.ajax({
        url: "api/Reservation/" + id,
        type: "GET",
        dataType: 'JSON',
        success: function (p) {
            console.log(p);
            $("#idReservation").val(p.idReservation);
            // $("#startDate").val(new Date(p.startDate).toDateString());
            // $("#devolutionDate").val(new Date(p.devolutionDate).toDateString());
            // The specified value "Mon Oct 10 2022" does not conform to the required format, "yyyy-MM-dd".
            $("#startDate").val(new Date(p.startDate).toISOString().split('T')[0]);
            $("#devolutionDate").val(new Date(p.devolutionDate).toISOString().split('T')[0]);
            $("#status").val(p.status);
            $("#client_id").val(p.client.idClient);
            $("#audience_id").val(p.audience.id);
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema');
        },
        complete: function (xhr, status) {
            // alert('Perición realizada')
        }
    });
}

function cancelUpdateReservation() {
    $(".saveButtonBR").show();
    $(".updateButtonBR").hide();
    cleanData();
}

function updateReservation() {

    let reservation = getReservationData();
    let dataToSend = JSON.stringify(reservation);

    $.ajax({
        url: "api/Reservation/update",
        type: "PUT",
        data: dataToSend,
        contentType: 'application/json',
        success: function (p) {
            console.log(p);
            cancelUpdateReservation();
            getAllReservation();
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema');
        },
        complete: function (xhr, status) {
            // alert('Perición realizada')
        }
    });
}

function deleteReservationById(id) {
    $.ajax({
        url: "api/Reservation/" + id,
        type: "DELETE",
        dataType: 'JSON',
        success: function (p) {
            console.log(p);
            getAllReservation();
            cleanData();
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema');
        },
        complete: function (xhr, status) {
            // alert('Perición realizada')
        }
    });
}

function statusCompletedReservation(id) {

    let reservation = getReservationData();
    reservation.idReservation = id;
    reservation.status = "completed";
    let dataToSend = JSON.stringify(reservation);

    $.ajax({
        url: "api/Reservation/update",
        type: "PUT",
        data: dataToSend,
        contentType: 'application/json',
        success: function (p) {
            console.log(p);
            cancelUpdateReservation();
            getAllReservation();
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema');
        },
        complete: function (xhr, status) {
            // alert('Perición realizada')
        }
    });
}

function statusCancelledReservation(id) {

        let reservation = getReservationData();
        reservation.idReservation = id;
        reservation.status = "cancelled";
        let dataToSend = JSON.stringify(reservation);

        $.ajax({
            url: "api/Reservation/update",
            type: "PUT",
            data: dataToSend,
            contentType: 'application/json',
            success: function (p) {
                console.log(p);
                cancelUpdateReservation();
                getAllReservation();
            },
            error: function (xhr, status) {
                alert('Ha sucedido un problema');
            },
            complete: function (xhr, status) {
                // alert('Perición realizada')
            }
        });
}