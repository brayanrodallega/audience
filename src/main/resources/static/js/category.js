$(document).ready(function () {
    getAllCategory();
});

function getAllCategory() {

    $.ajax({
        url: "api/Category/all",
        type: "GET",
        dataType: 'JSON',
        success: function (p) {
            console.log(p);
            $("#resultsCategory").empty()
            for (i = 0; i < p.length; i++) {

                let card = `<div class="col">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">${p[i].name}</h5>
                                        <p class="card-text">${p[i].description}</p>
                                    </div>
                                    <div class="card-footer">
                                        <div class="btn-group" role="group">
                                            <button type="button" class="btn btn-outline-primary" onclick='getCategoryById(${p[i].id})'>Actualizar</button>
                                            <button type="button" class="btn btn-outline-primary" onclick='deleteCategoryById(${p[i].id})'>Borrar!</button>
                                        </div>
                                    </div>
                                </div>
                            </div>`;

                $("#resultsCategory").append(card);
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

function getCategoryData() {
    let cat = {
        id: parseInt($("#idCategoria").val()),
        name: $("#nombreCategoria").val(),
        description: $("#descripcionCategoria").val()
    }
    return cat;
}

function cleanData() {
    $("#idCategoria").val("")
    $("#nombreCategoria").val("")
    $("#descripcionCategoria").val("")
}

function saveCategory() {

    let data = getCategoryData();
    data.id = null;
    let dataToSend = JSON.stringify(data);
    $.ajax({
        url: "api/Category/save",
        type: "POST",
        data: dataToSend,
        contentType: 'application/json',
        success: function (p) {
            console.log(p);
            cleanData();
            getAllCategory();
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema');
        },
        complete: function (xhr, status) {
            // alert('Perición realizada')
        }
    });

}

function getCategoryById(idCat) {

    $(".saveButtonBR").hide();
    $(".updateButtonBR").show();

    $.ajax({
        url: "api/Category/"+idCat,
        type: "GET",
        dataType: 'JSON',
        success: function (p) {
            console.log(p);
            $("#idCategoria").val(p.id)
            $("#nombreCategoria").val(p.name)
            $("#descripcionCategoria").val(p.description)
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema');
        },
        complete: function (xhr, status) {
            // alert('Perición realizada')
        }
    });

}

function cancelUpdateCategory() {
    cleanData();
    $(".saveButtonBR").show();
    $(".updateButtonBR").hide();
}

function updateCategory() {

    let data = getCategoryData();
    let dataToSend = JSON.stringify(data);
    $.ajax({
        url: "api/Category/update",
        type: "PUT",
        data: dataToSend,
        contentType: 'application/json',
        success: function (p) {
            console.log(p);
            cancelUpdateCategory();
            getAllCategory();
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema');
        },
        complete: function (xhr, status) {
            // alert('Perición realizada')
        }
    });

}

function deleteCategoryById(idCat) {

    $.ajax({
        url: "api/Category/"+idCat,
        type: "DELETE",
        dataType: 'JSON',
        success: function (p) {
            console.log(p);
            cleanData();
            getAllCategory();
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema');
        },
        complete: function (xhr, status) {
            // alert('Perición realizada')
        }
    });

}