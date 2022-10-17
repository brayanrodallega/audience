$(document).ready(function () {
    getAllMessage();
    getAllClient();
    getAllAudience();
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

function getAllMessage() {

    $.ajax({
        url: "api/Message/all",
        type: "GET",
        dataType: 'JSON',
        success: function (p) {
            console.log(p);
            $("#resultsMessage").empty()
            for (i = 0; i < p.length; i++) {

                let card = `<div class="col">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="card-title">Client: ${p[i].client.name}</h4>
                                        <h5 class="card-subtitle mb-2 text-muted">Audience: ${p[i].audience.name}</h5>
                                        <p class="card-text">Text: ${p[i].messageText}</p>
                                    </div>
                                    <div class="card-footer">
                                        <div class="btn-group" role="group">
                                            <button type="button" class="btn btn-outline-primary" onclick='getMessageById(${p[i].idMessage})'>Actualizar</button>
                                            <button type="button" class="btn btn-outline-primary" onclick='deleteMessageById(${p[i].idMessage})'>Borrar!</button>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
                $("#resultsMessage").append(card);
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

function getMessageData() {
    let mess = {
        idMessage: parseInt($("#idMessage").val()),
        messageText: $("#messageText").val(),
        client: {idClient: parseInt($("#client_id").val())},
        audience: {id: parseInt($("#audience_id").val())}
    }
    return mess;
}

function cleanData() {
    $("#idMessage").val("")
    $("#messageText").val("")
    $("#client").val("")
    $("#audience").val("")
}

function saveMessage() {

    let mess = getMessageData();
    mess.idMessage = null;
    let dataToSend = JSON.stringify(mess);

    $.ajax({
        url: "api/Message/save",
        type: "POST",
        data: dataToSend,
        contentType: "application/json",
        success: function (p) {
            console.log(p);
            cleanData();
            getAllMessage();
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema');
        },
        complete: function (xhr, status) {
            // alert('Perición realizada')
        }
    });
}

function updateMessage() {
    let mess = getMessageData();
    let dataToSend = JSON.stringify(mess);
    $.ajax({
        url: "api/Message/update",
        type: "PUT",
        data: dataToSend,
        contentType: "application/json",
        success: function (p) {
            console.log(p);
            getAllMessage();
            cancelUpdateMessage();
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema');
        },
        complete: function (xhr, status) {
            // alert('Perición realizada')
        }
    });
}

function deleteMessageById(id) {
    $.ajax({
        url: "api/Message/" + id,
        type: "DELETE",
        dataType: 'JSON',
        success: function (p) {
            console.log(p);
            cleanData();
            getAllMessage();
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema');
        },
        complete: function (xhr, status) {
            // alert('Perición realizada')
        }
    });
}

function getMessageById(id) {

    $(".saveButtonBR").hide();
    $(".updateButtonBR").show();

    $.ajax({
        url: "api/Message/" + id,
        type: "GET",
        dataType: 'JSON',
        success: function (p) {
            console.log(p);
            $("#idMessage").val(p.idMessage)
            $("#messageText").val(p.messageText)
            $("#client_id").val(p.client.idClient)
            $("#audience_id").val(p.audience.id)
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema');
        },
        complete: function (xhr, status) {
            // alert('Perición realizada')
        }
    });
}

function cancelUpdateMessage() {
    cleanData();
    $(".saveButtonBR").show();
    $(".updateButtonBR").hide();
}