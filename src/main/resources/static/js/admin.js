$(document).ready(function () {
    getAllAdmin();
});

function getAllAdmin() {

        $.ajax({
            url: "api/Admin/all",
            type: "GET",
            dataType: 'JSON',
            success: function (p) {
                console.log(p);
                $("#resultsAdmin").empty()
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
                                                <button type="button" class="btn btn-outline-primary" onclick='getAdminById(${p[i].idAdmin})'>Actualizar</button>
                                                <button type="button" class="btn btn-outline-primary" onclick='deleteAdminById(${p[i].idAdmin})'>Borrar!</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;

                    $("#resultsAdmin").append(card);
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

function getAdminData() {
    let adm = {
        idAdmin: parseInt($("#idAdmin").val()),
        name: $("#nameAdmin").val(),
        age: parseInt($("#ageAdmin").val()),
        email: $("#emailAdmin").val(),
        password: $("#passwordAdmin").val()
    }
    return adm;
}

function cleanData() {
    $("#idAdmin").val("")
    $("#nameAdmin").val("")
    $("#ageAdmin").val("")
    $("#emailAdmin").val("")
    $("#passwordAdmin").val("")
}

function saveAdmin() {
    let admin = getAdminData();
    admin.idAdmin = null;
    let dataToSend = JSON.stringify(admin);
    $.ajax({
        url: "api/Admin/save",
        type: "POST",
        data: dataToSend,
        contentType: 'application/json',
        success: function (p) {
            console.log(p);
            cleanData();
            getAllAdmin();
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema');
        },
        complete: function (xhr, status) {
            // alert('Perición realizada')
        }
    });
}

function getAdminById(id) {

    $(".saveButtonBR").hide();
    $(".updateButtonBR").show();

    $.ajax({
        url: "api/Admin/" + id,
        type: "GET",
        dataType: 'JSON',
        success: function (p) {
            console.log(p);
            $("#idAdmin").val(p.idAdmin),
            $("#nameAdmin").val(p.name),
            $("#ageAdmin").val(p.age),
            $("#emailAdmin").val(p.email),
            $("#passwordAdmin").val(p.password)
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema');
        },
        complete: function (xhr, status) {
            // alert('Perición realizada')
        }
    });
}

function cancelUpdateAdmin() {
    cleanData();
    $(".saveButtonBR").show();
    $(".updateButtonBR").hide();
}

function updateAdmin() {
    let admin = getAdminData();
    let dataToSend = JSON.stringify(admin);
    $.ajax({
        url: "api/Admin/update",
        type: "PUT",
        data: dataToSend,
        contentType: 'application/json',
        success: function (p) {
            console.log(p);
            cancelUpdateAdmin();
            getAllAdmin();
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema');
        },
        complete: function (xhr, status) {
            // alert('Perición realizada')
        }
    });
}

function deleteAdminById(id) {
    $.ajax({
        url: "api/Admin/" + id,
        type: "DELETE",
        dataType: 'JSON',
        success: function (p) {
            console.log(p);
            getAllAdmin();
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema');
        },
        complete: function (xhr, status) {
            // alert('Perición realizada')
        }
    });
}