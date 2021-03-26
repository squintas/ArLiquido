var _url;  // isto é uma variável global

// esta função carrega os dados que irão alimentar a criação do HTML
function loadConfigurationData() {
    $.getJSON(_url + "data.json", function (oData) {
        if (oData) {
            createHtml(oData);
        } else {
            throw "Error Loading data.json";
        }
    }).fail(function (oError) {
        throw oError;
    });
}

// esta funcao baralha os valores de um array
// encontrei-a no stackoverflow aqui https://stackoverflow.com/questions/48659645/jquery-object-shuffle-randomize
function baralhaOsValoresDesteArray(arr) {
    var m = arr.length, t, i;

    // While there remain elements to shuffle…
    while (m) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = arr[m];
        arr[m] = arr[i];
        arr[i] = t;
    }

    return arr;
};

// obtem a URL de uma imagem de acordo com o seu "tipo"
// por ex: "cover", etc
function getImage(arr, sType) {
    if (arr && sType) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][sType]) {
                return _url + "images/" + arr[i][sType];
            }
        }
    }
}

// obtem a URL de um video de acordo com o seu "tipo"
// por ex: "youtube", "vimeo", etc
function getLink(arr, aStype) {
    if (arr && aStype) {
        for (let i = 0; i < arr.length; i++) {
            for (let ii = 0; ii < aStype.length; ii++) {
                if (arr[i][aStype[ii]]) {
                    return arr[i][aStype[ii]];
                }
            }

        }
    }
}

// cria o HTML para cada entrada no array
function createHtml(arr) {
    arr = baralhaOsValoresDesteArray(arr);
    // primeiro temos que apagar algum HTML anteriormente criado
    $("#al-generated-content").html("");

    var sHtml = "";
    for (let i = 0; i < arr.length; i++) {
        var oElement = arr[i];
        if (oElement.enabled) {
            var sLink = getLink(oElement.links, ["youtube", "vimeo", "spotify"]);
            sHtml += "<div class='al-card'>";
            sHtml += "<p>" + oElement.id + "</p>";
            sHtml += "<p>" + oElement.title + "</p>";
            sHtml += "<p>" + oElement.description + "</p>";
            sHtml += "<p>" + oElement.creationDate + "</p>";
            if (sLink) {
                sHtml += "<a href='" + sLink + "'>" + sLink + "</a>";
            }
            sHtml += "<p>" + oElement.format + "</p>";
            sHtml += "<p>" + oElement.enabled + "</p>";
            sHtml += "<img src='" + getImage(oElement.images, "cover") + "'</>";
            sHtml += "</div>";
        }
    }

    $("#al-generated-content").html(sHtml);
}

// é importante fazer o set da variável global _url
// pois dependendo de onde estivermos a correr isto (localhost ou github)
// a url será diferente
function setGlobalURL() {
    _url = "";
    if (window.location.host === "squintas.github.io") {
        _url = window.location.origin + "/ArLiquido/mockupServer/"
    } else {
        _url = window.location.origin + "/mockupServer/"
    }
}

// é aqui que começa a festa assim que o "document" estiver "ready"
$(document).ready(function () {
    setGlobalURL();
    loadConfigurationData();
});
