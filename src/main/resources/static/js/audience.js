$(document).ready(function () {
    getAllAudience();
    getAllCategory();
});

function getAllCategory() {

    $.ajax({
        url: "api/Category/all",
        type: "GET",
        dataType: 'JSON',
        success: function (p) {
            console.log(p);
            $("#category_id").empty()
            let card = `<option value="0">Seleccione una categoria</option>`;
            for (i = 0; i < p.length; i++) {
                card += `<option value="${p[i].id}">${p[i].name}</option>`;
            }
            $("#category_id").append(card);
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
                $("#resultsAudience").empty()
                for (i = 0; i < p.length; i++) {

                    let card = `<div class="col">
                                    <div class="card text-bg-primary mb-3">
                                        <div class="card-header">Categoria: ${p[i].category.name}</div>
                                        <div class="card-body">
                                            <h4 class="card-title">${p[i].name}</h4>
                                            <h5 class="card-subtitle mb-2 text-light">Owner: ${p[i].owner}</h5>
                                            <h6 class="card-subtitle mb-2 text-light">Capacity: ${p[i].capacity}</h6>
                                            <p class="card-text">${p[i].description}</p>
                                        </div>
                                        <div class="card-footer">
                                            <div class="btn-group" role="group">
                                                <button type="button" class="btn btn-outline-light" onclick='getAudienceById(${p[i].id})'>Actualizar</button>
                                                <button type="button" class="btn btn-outline-light" onclick='deleteAudienceById(${p[i].id})'>Borrar!</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;

                    $("#resultsAudience").append(card);
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

function getAudienceData() {
    let aud = {
        id: parseInt($("#idAudience").val()),
        owner: $("#ownerAudience").val(),
        capacity: parseInt($("#capacityAudience").val()),
        name: $("#nameAudience").val(),
        description: $("#descriptionAudience").val(),
        category: {id: parseInt($("#category_id").val())}
    }
    return aud;
}

function cleanData() {
    $("#idAudience").val("")
    $("#nameAudience").val("")
    $("#ownerAudience").val("")
    $("#capacityAudience").val("")
    $("#descriptionAudience").val("")
}

function saveAudience() {

    let aud = getAudienceData();
    aud.id = null;
    let dataToSend = JSON.stringify(aud);

    $.ajax({
        url: "api/Audience/save",
        type: "POST",
        data: dataToSend,
        contentType: "application/json",
        success: function (p) {
            console.log(p);
            cleanData();
            getAllAudience();
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema');
        },
        complete: function (xhr, status) {
            // alert('Perición realizada')
        }
    });

}

function getAudienceById(id) {

    $(".saveButtonBR").hide();
    $(".updateButtonBR").show();

    $.ajax({
        url: "api/Audience/" + id,
        type: "GET",
        dataType: 'JSON',
        success: function (p) {
            console.log(p);
            $("#idAudience").val(p.id);
            $("#nameAudience").val(p.name);
            $("#ownerAudience").val(p.owner);
            $("#capacityAudience").val(p.capacity);
            $("#descriptionAudience").val(p.description);
            $("#category_id").val(p.category.id);
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema');
        },
        complete: function (xhr, status) {
            // alert('Perición realizada')
        }
    });
}

function cancelUpdateAudience() {
    cleanData();
    $(".saveButtonBR").show();
    $(".updateButtonBR").hide();
}

function updateAudience() {

    let aud = getAudienceData();
    let dataToSend = JSON.stringify(aud);

    $.ajax({
        url: "api/Audience/update",
        type: "PUT",
        data: dataToSend,
        contentType: "application/json",
        success: function (p) {
            console.log(p);
            cancelUpdateAudience();
            getAllAudience();
        },
        error: function (xhr, status) {
            alert(xhr + 'Ha sucedido un problema' + status);
        },
        complete: function (xhr, status) {
            // alert('Perición realizada')
        }
    });

}

function deleteAudienceById(id) {
    $.ajax({
        url: "api/Audience/" + id,
        type: "DELETE",
        dataType: 'JSON',
        success: function (p) {
            console.log(p);
            getAllAudience();
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