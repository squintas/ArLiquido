// // Add scrollmagic controller
// let controller = new ScrollMagic.Controller();



// //------------------
// //TIMELINE 2
// //------------------

// // Add timeline
// let tl2 = anime.timeline({ autoplay: false });

// // Add animations
// let s2a1 = {
//     targets: '#al-animate-this',
//     // opacity: [0.3, 1],
//     scale: [1, 4],
//     duration: 1000,
//     delay: 0,
//     easing: 'easeInOutSine'
// };

// let s2a2 = {
//     targets: '#al-animate-this',
//     scale: 1,
//     duration: 1000,
// };

// // Add children
// tl2.add(s2a1)
// // .add(s2a2);

// // Get section height
// let twoHeight = document.getElementById("al-animate-this").clientHeight;
// console.log('twoHeight: ' + twoHeight);

// //------------------
// //SCENE 2
// //------------------

// //Add second scrollmagic scene
// let scene2 = new ScrollMagic.Scene({
//     triggerElement: "#al-animate-this",
//     duration: 4500,
//     triggerHook: 0,
// })

//     // Add debug indicators
//     .addIndicators({
//         colorTrigger: "black",
//         colorStart: "blue",
//         colorEnd: "red",
//         indent: 10
//     })

//     // Trigger animation timeline
//     //Use scroll position to play animation
//     .on("progress", function (event) {
//         console.log("tl2.duration: " + tl2.duration);
//         console.log("event.progress: " + event.progress);
//         tl2.seek(tl2.duration * event.progress);
//     })

//     .setPin('#al-animate-this')
//     .addTo(controller);


// document.onreadystatechange = () => {
// if (document.readyState === 'complete') {
//     const elements = document.querySelectorAll('*[data-parallax]');
//     Array.from(elements).forEach((el) => {
//         Parallax.init(el);
//     });
// }
// };



function getScrollPercent() {
    var h = document.documentElement,
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight';
    return (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
}

const oElement = document.querySelector("#al-animate-this");
const oLogo = document.querySelector(".al-logo");

const tl = anime.timeline({ autoplay: false });



tl.add({
    targets: oElement,
    // translateX: anime.random(-500, 500) + '%',
    translateX: 50,
    // scale: anime.random(0.3, 1.7),
    // rotate: anime.random(-365, 365) + 'deg',
    duration: 500,
    // duration: 3500, //anime.random(500, 5000),
    // direction: 'alternate',
    easing: "easeInOutSine"
}).add({
    targets: oElement,
    // translateX: anime.random(-500, 500) + '%',
    translateX: 0,
    // scale: anime.random(0.3, 1.7),
    // rotate: anime.random(-365, 365) + 'deg',
    duration: 500,
    // duration: 3500, //anime.random(500, 5000),
    // direction: 'alternate',
    easing: "easeInOutSine"
});
// }

// _.map(els, el => {
//     anime.set(el, {
//         top: anime.random(0, 150) + 'vh',
//         left: anime.random(0, 100) + 'vw'
//     });

//     tl.add({
//         targets: el,
//         translateX: anime.random(-500, 500) + '%',
//         translateY: anime.random(-500, 500) + '%',
//         scale: anime.random(0.3, 1.7),
//         rotate: anime.random(-365, 365) + 'deg',
//         duration: anime.random(500, 5000), easing: 'easeInOutCirc'
//     },
//         0);
// });


function collision(oElement, oLogo) {
    oElement = $(oElement);
    oLogo = $(oLogo);
    var x1 = oElement.offset().left;
    var y1 = oElement.offset().top;
    var h1 = oElement.outerHeight(false);
    var w1 = oElement.outerWidth(true);
    var b1 = y1 + h1;
    var r1 = x1 + w1;
    var x2 = oLogo.offset().left;
    var y2 = oLogo.offset().top;
    var h2 = oLogo.outerHeight(false);
    var w2 = oLogo.outerWidth(true);
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

$(document).ready(function () {
    $(window).scroll(function () {
        // var iScrollTop = $(window).scrollTop();
        // oElement.offsetTop - document.body.scrollTop
        // var iCalc = Math.abs(iScrollTop - oElement.offsetTop);
        // console.log(iScrollTop + "-" + oElement.offsetTop + "=" + iCalc);
        // console.log("oElement.offsetTop: " + oElement.offsetTop);
        // console.log("iScrollTop: " + iScrollTop);
        var iPercent;
        if (iPercent = collision(oElement, oLogo)) {
            // debugger;
            tl.seek(iPercent * 10);

            // console.log(collision(oElement, oLogo));
            // console.log("oElement.offsetTop: " + oElement.offsetTop);
            // console.log("iScrollTop: " + iScrollTop);
        }
        // if (iCalc >= 200 && iCalc <= 260) {
        // console.log(tl.duration * (iCalc * 0.01));
        // console.log(iCalc);
        // }
    });
});


window.addEventListener('scroll', () => {
    // var zrq = document.querySelector("#al-animate-this");
    // console.log("offsetTop: " + oElement.offsetTop);
    // console.log("document.body.scrollTop: " + document.body.scrollTop);

    // oElement.offsetTop - document.body.scrollTop;

    // const percentage = getScrollPercent();
    // console.log("percentage: " + percentage * 100);
    // console.log("tl.duration: " + tl.duration);
    // tl.seek(percentage * 100);
    // tl.seek(tl.duration * (percentage * 0.01));
});