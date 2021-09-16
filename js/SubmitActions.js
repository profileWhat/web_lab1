let x;
let y = document.getElementById("yValue");
let r;
let outputTableBody = document.getElementById("outputTableBody");
function buttonClick(value) {
    r = value;
}
function radioChanged(value) {
    x = value;
}
function isEmptyFields() {
    let isEmpty = false;

    if (r == null) {
        $('#messageR').text("Выберите значение");
        isEmpty = true;
    } else $('#messageR').text("");
    if (x == null) {
        $('#messageX').text("Выберите значение");
        isEmpty = true;
    } else $('#messageX').text("");

    if (!y.value) {
        $('#messageY').text("Заполните это поле");
        isEmpty = true;
    } else $('#messageY').text("");
    return isEmpty
}

function isValidData() {
    if (isNaN(y.value) || y.value <= -5 || y.value >= 3) {
        $('#messageY').text("Заполните поле допустимыми значениями");
        return false;
    }
    return !isEmptyFields();

}

$(document).ready(function() {
    $('[data-submit]').on('click', function(e) {
        e.preventDefault();
        if (isValidData()) {
            $.ajax({
                url: "php/save.php",
                async: true,
                method: "POST",
                data: {
                    "xValue": x,
                    "yValue": y.value,
                    "rValue": r
                },
                cache: false,
                success: function (response) {
                    let outputTable = document.getElementById("outputTableBody");
                    outputTable.insertAdjacentHTML('beforeend', response);
                },
                error: function (jqXHR, exception) {
                    let msg;
                    if (jqXHR.status === 0) {
                        msg = 'Not connect.\n Verify Network.';
                    } else if (jqXHR.status === 404) {
                        msg = 'Requested page not found. [404]';
                    } else if (jqXHR.status === 500) {
                        msg = 'Internal Server Error [500].';
                    } else if (exception === 'parsererror') {
                        msg = 'Requested JSON parse failed.';
                    } else if (exception === 'timeout') {
                        msg = 'Time out error.';
                    } else if (exception === 'abort') {
                        msg = 'Ajax request aborted.';
                    } else {
                        msg = 'Uncaught Error.\n' + jqXHR.responseText;
                    }
                    alert(msg);
                }
            });
        }
    })
});
$(document).ready(function () {
    $('[data-reset]').on('click', function (e) {
        e.preventDefault();
        console.log("here")
        $.ajax({
            url: "php/reset.php",
            async: true,
            method: "POST",
            data: {},
            cache: false,
            success: function() {
                outputTableBody.innerHTML = `
                <tr>
                    <th>X</th>
                    <th>Y</th>
                    <th>R</th>
                    <th>Результат</th>
                    <th>Время</th>
                </tr>
                `
            },
            error: function(xhr) {

            }
        });
    })
});

$(document).ready(function () {
    $.ajax({
        url: "php/restore.php",
        async: true,
        method: "POST",
        success: function (response){
            let outputTable = document.getElementById("outputTableBody");
            outputTable.insertAdjacentHTML('beforeend', response);
        }
    })
})

