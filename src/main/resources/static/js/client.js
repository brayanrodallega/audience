$(document).ready(function () {
    getAllClient();
});

function getAllClient() {

        $.ajax({
            url: "api/Client/all",
            type: "GET",
            dataType: 'JSON',
            success: function (p) {
                console.log(p);
                $("#resultsClient").empty()
                for (i = 0; i < p.length; i++) {

                    let card = `<div class="col">
                                    <div class="card">
                                        <div class="card-body">
                                            <h4 class="card-title">${p[i].name}</h4>
                                            <h6 class="card-text">Edad: ${p[i].age}</h6>
                                            <p class="card-text">${p[i].email}</p>
                                        </div>
                                        <div class="card-footer">
                                            <div class="btn-group" role="group">
                                                <button type="button" class="btn btn-outline-primary" onclick='getClientById(${p[i].idClient})'>Actualizar</button>
                                                <button type="button" class="btn btn-outline-primary" onclick='deleteClientById(${p[i].idClient})'>Borrar!</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;

                    $("#resultsClient").append(card);
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

function getClientData() {
    let cli = {
        idClient: parseInt($("#idClient").val()),
        name: $("#nameClient").val(),
        age: parseInt($("#ageClient").val()),
        email: $("#emailClient").val(),
        password: $("#passwordClient").val()
    }
    return cli;
}

function cleanData() {
    $("#idClient").val("")
    $("#nameClient").val("")
    $("#ageClient").val("")
    $("#emailClient").val("")
    $("#passwordClient").val("")
}

function saveClient() {

    let cli = getClientData();
    cli.idClient = null;
    let dataToSend = JSON.stringify(cli);
    $.ajax({
        url: "api/Client/save",
        type: "POST",
        data: dataToSend,
        contentType: 'application/json',
        success: function (p) {
            console.log(p);
            cleanData();
            getAllClient();
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema');
        },
        complete: function (xhr, status) {
            // alert('Perición realizada')
        }
    });
}

function getClientById(id) {

    $(".saveButtonBR").hide();
    $(".updateButtonBR").show();

    $.ajax({
        url: "api/Client/" + id,
        type: "GET",
        dataType: 'JSON',
        success: function (p) {
            console.log(p);
            $("#idClient").val(p.idClient);
            $("#nameClient").val(p.name);
            $("#ageClient").val(p.age);
            $("#emailClient").val(p.email);
            $("#passwordClient").val(p.password);
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema');
        },
        complete: function (xhr, status) {
            // alert('Perición realizada')
        }
    });
}

function cancelUpdateClient() {
    $(".saveButtonBR").show();
    $(".updateButtonBR").hide();
    cleanData();
}

function updateClient() {
    let cli = getClientData();
    let dataToSend = JSON.stringify(cli);
    $.ajax({
        url: "api/Client/update",
        type: "PUT",
        data: dataToSend,
        contentType: 'application/json',
        success: function (p) {
            console.log(p);
            getAllClient();
            cancelUpdateClient();
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema');
        },
        complete: function (xhr, status) {
            // alert('Perición realizada')
        }
    });
}

function deleteClientById(id) {
    $.ajax({
        url: "api/Client/" + id,
        type: "DELETE",
        dataType: 'JSON',
        success: function (p) {
            console.log(p);
            cleanData();
            getAllClient();
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema');
        },
        complete: function (xhr, status) {
            // alert('Perición realizada')
        }
    });
}