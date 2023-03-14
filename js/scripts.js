function relogio() {
    var data = new Date();
    var hor = data.getHours();
    var min = data.getMinutes();
    var seg = data.getSeconds();

    var yyyy = data.getFullYear();
    var mm = data.getMonth() + 1; // Months start at 0!
    var dd = data.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    if (hor < 10) {
        hor = "0" + hor;
    }
    if (min < 10) {
        min = "0" + min;
    }
    if (seg < 10) {
        seg = "0" + seg;
    }

    var agora = dd + "/" + mm + "/" + yyyy + " " + hor + ":" + min + ":" + seg;

    document.getElementById("clock").innerHTML = agora;

}

var timer = setInterval(relogio, 1000);



function pisca() {
    window.location.reload(true);
}

var timer2 = setInterval(pisca, 600000);
