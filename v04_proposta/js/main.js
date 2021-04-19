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
    var oElementTOP = oElement.offset().top;
    var oElementHEIGHT = oElement.outerHeight(false);
    var oElementTOTAL = oElementTOP + oElementHEIGHT;
    var oLogoTOP = _oLogo.offset().top;
    var oLogoHEIGHT = _oLogo.outerHeight(false);
    var oLogoTOTAL = oLogoTOP + oLogoHEIGHT;

    console.log("_oLogo: " + oLogoTOP, oLogoHEIGHT + "    oElement: " + oElementTOP, oElementHEIGHT);

    if (oElementTOTAL < oLogoTOP || oElementTOP > oLogoTOTAL) {
        return false;
    } else {
        var iPercent = oElementTOP + oElementHEIGHT - oLogoTOP + oLogoHEIGHT;
        console.log("iPercent: " + iPercent);
        iPercent = (100 - (iPercent * 100 / oElementHEIGHT)).toFixed(2);
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
            card: $(oCard),
            percent: 0
        }

        _aCards.push(obj);
    }
}

function scrollSpeedIsHigh() {
    _speedMarker1 = _speedMarker2 || 0;
    _speedMarker2 = $(window).scrollTop();
    var dif = Math.abs(_speedMarker1 - _speedMarker2);
    if (dif > 10) {
        return true;
    } else {
        return false;
    }
}

function animateCard() {
    // var iPercent;
    for (let i = 0; i < _aCards.length; i++) {
        var oCard = _aCards[i];
        if (oCard.percent = getColisionPercentage(oCard.card)) {
            oCard.anime.seek(oCard.percent * 10);
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
