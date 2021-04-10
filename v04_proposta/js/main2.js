function getScrollPercent() {
    var h = document.documentElement,
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight';
    return (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
}

const oLogo = document.querySelector(".al-logo");
const tl = anime.timeline({ autoplay: false });

// for (let i = 0; i < els.length; i++) {
// const el = els[i];
// anime.set(oLogo, {
//     top: "50vh", //anime.random(0, 150) + 'vh',
//     left: "50vw" //anime.random(0, 100) + 'vw'
// });

tl.add({
    targets: oLogo,
    // translateX: anime.random(-500, 500) + '%',
    translateY: "100%", //anime.random(-500, 500) + '%',
    // scale: anime.random(0.3, 1.7),
    // rotate: anime.random(-365, 365) + 'deg',
    // duration: 3500, //anime.random(500, 5000),
    easing: "easeInOutCirc"
}, 0);
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


window.addEventListener('scroll', () => {
    const percentage = getScrollPercent();
    // console.log("percentage: " + (tl.duration * (percentage * 0.01)));
    console.log(tl.duration);
    tl.seek(percentage * 100);
    // tl.seek(tl.duration * (percentage * 0.01));
});