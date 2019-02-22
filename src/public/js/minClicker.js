minano_site = {};

minano_site.init = function () {
    minano_site.minano = document.getElementById("skin_miñano");
    minano_site.minano_count = $('#mincount').text();
    minano_site.minanos = 0;

    minano = document.getElementById("skin_miñano");

    minano.addEventListener("mousedown", minano_site.mousedown);
    minano.addEventListener("mouseup", minano_site.mouseup);
    minano_site.loop();
}

minano_site.mousedown = function () {


    if (minano_site.minanos < 10) {
        minano_site.minano.className += " clicked";
    }
    minano_site.minano_count.className += " clicked";
    minano_site.minanos++;
    $("#mincount").text(minano_site.minanos);

    if ($("#record").text() < minano_site.minanos) {
        console.log(1);
        $("#record").text(minano_site.minanos);
    }

    console.log("mouseup");
    $.ajax({
        url: '/minClicker',
        type: 'POST',
        data: { clicks: minano_site.minanos }
    }).done(function (data) {
        console.log("enviando " + data);
    });

    let randomEC = Math.floor((Math.random() * 80) + 1);
    if (randomEC < 3) {
        let EC = Math.floor((Math.random() * 10) + 1);
        
        $.ajax({
            url: '/ganasDinero',
            type: 'POST',
            data: {EC:EC}
        }).done(function (data) {
            console.log(data);
        });
        PlaySound('moneda');
        $("#loot").text("+"+EC+" etsisiCoins")
        $(".coin").removeClass("esconder");
        window.setTimeout("cerrarDiv();", 3000);
    }

}

function cerrarDiv(){
    $(".coin").addClass("esconder");
}

minano_site.mouseup = function () {
    minano_site.minano.className -= " clicked";
    minano_site.minano_count.className -= " clicked";
}

minano_site.loop = function () {
    minano_site.minano_count.innerHTML = minano_site.minanos;
    setTimeout(minano_site.loop, 1000 / 60);

    if (minano_site.minanos > 50000) {
        minano_site.minano.style.animation = "spin " + 50 / 10000 + "s linear infinite";
        console.log("Velocidad = " + (50 / 50000) + " segundos en dar una vuelta");
    }
    if ((minano_site.minanos > 0) && (minano_site.minanos < 50000)) {
        minano_site.minano.style.animation = "spin " + 50 / minano_site.minanos + "s linear infinite";
        console.log("Velocidad = " + (50 / minano_site.minanos) + " segundos en dar una vuelta");
    }
    if (minano_site.minanos == Infinity) {
        alert("No hagas trampas :(");
        minano_site.minanos = 0;
        minano_site.minano.style.animation = "spin 0s linear infinite";
    }
}

window.onload = function () {
    minano_site.init();
}