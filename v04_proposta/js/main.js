var _aCards;
var _oLogo;
var _speedMarker1;
var _speedMarker2;

// const oElement = $("#al-animate-this")[0];
// const tl = anime.timeline({ autoplay: false });
// tl.add({
//     targets: oElement,
//     // translateX: anime.random(-500, 500) + '%',
//     translateX: 50,
//     // scale: anime.random(0.3, 1.7),
//     // rotate: anime.random(-365, 365) + 'deg',
//     duration: 500,
//     // duration: 3500, //anime.random(500, 5000),
//     // direction: 'alternate',
//     easing: "easeInOutSine"
// }).add({
//     targets: oElement,
//     // translateX: anime.random(-500, 500) + '%',
//     translateX: 0,
//     // scale: anime.random(0.3, 1.7),
//     // rotate: anime.random(-365, 365) + 'deg',
//     duration: 500,
//     // duration: 3500, //anime.random(500, 5000),
//     // direction: 'alternate',
//     easing: "easeInOutSine"
// });
// // }

function getColisionPercentage(oElement) {
    oElement = $(oElement);
    var x1 = oElement.offset().left;
    var y1 = oElement.offset().top;
    var h1 = oElement.outerHeight(false);
    var w1 = oElement.outerWidth(true);
    var b1 = y1 + h1;
    var r1 = x1 + w1;
    var x2 = _oLogo.offset().left;
    var y2 = _oLogo.offset().top;
    var h2 = _oLogo.outerHeight(false);
    var w2 = _oLogo.outerWidth(true);
    var b2 = y2 + h2;
    var r2 = x2 + w2;

    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) {
        return false;
    } else {
        var iPercent = y1 + h1 - y2 + h2;
        iPercent = (100 - (iPercent * 100 / h1)).toFixed(2);
        return iPercent;
    }
}

function initializeAnimationForAllCards() {
    var arr = $(".al-card");
    _aCards = [];

    for (let i = 0; i < arr.length; i++) {
        var oCard = arr[i];
        var oTimeLine = anime.timeline({ autoplay: false });
        oTimeLine.add({
            targets: oCard,
            translateX: 50,
            duration: 500,
            easing: "easeInOutSine"
        }).add({
            targets: oCard,
            translateX: 0,
            duration: 500,
            easing: "easeInOutSine"
        });

        var obj = {
            anime: oTimeLine,
            card: $(oCard)
        }

        _aCards.push(obj);
    }
}

function scrollSpeedIsHigh() {
    _speedMarker1 = _speedMarker2 || 0;
    _speedMarker2 = $(window).scrollTop();
    var dif = Math.abs(_speedMarker1 - _speedMarker2);
    console.log(dif);
    if (dif > 15) {
        return true;
    } else {
        return false;
    }
}

function animateCard() {
    var iPercent;
    for (let i = 0; i < _aCards.length; i++) {
        var oCard = _aCards[i];
        if (iPercent = getColisionPercentage(oCard.card)) {
            oCard.anime.seek(iPercent * 10);
            break;
        }
    }
}

function allignAllCardsToTheRight() {
    for (let i = 0; i < _aCards.length; i++) {
        var oCard = _aCards[i];
        oCard.card.css("transform", "translateX(0.0px)");
    }
}

$(document).ready(function () {
    _oLogo = $($(".al-logo")[0]);
    initializeAnimationForAllCards();
    $(window).scroll(function (oEvent) {
        if (scrollSpeedIsHigh()) {
            allignAllCardsToTheRight();
        } else {
            animateCard();
        }
    });
});
