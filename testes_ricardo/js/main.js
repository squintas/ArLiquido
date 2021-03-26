
function loadConfigurationData() {
    var url = "";
    if (window.location.host === "squintas.github.io") {
        url = window.location.origin + "/ArLiquido/mockupServer/data.json"
    } else {
        url = window.location.origin + "/mockupServer/data.json"
    }

    $.getJSON(url, function (oData) {
        if (oData) {
            createHtml(oData);
        } else {
            throw "Error Loading data.json";
        }
    }).fail(function (oError) {
        throw oError;
    });
}

function getImage(arr, sType) {
    if (arr && sType) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][sType]) {
                return arr[i][sType];
            }
        }
    }
}

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

function createHtml(arr) {
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
            sHtml += "<img src='/../mockupServer/images/" + getImage(oElement.images, "cover") + "'</>";
            sHtml += "</div>";
        }
    }

    $("#al-generated-content").html(sHtml);
}


$(document).ready(function () {
    loadConfigurationData();
});
