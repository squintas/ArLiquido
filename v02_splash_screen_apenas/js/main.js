
// // é aqui que começa a festa assim que o "document" estiver "ready"
// $(document).ready(function () {
//     setGlobalURL();
//     loadConfigurationData();
// });


// =============================


// import anime from 'animejs';

class Scroll {
    constructor(opts) {
        this.opts = opts;
        this.body = document.body;
        this.html = document.documentElement;
        this.scrollHeight = Math.max(this.body.scrollHeight, this.body.offsetHeight, this.html.clientHeight, this.html.scrollHeight, this.html.offsetHeight);
        window.onscroll = this.scroll.bind(this);
    }

    static init(opts = {}) {
        return new Scroll(opts);
    }

    scroll() {
        this.scrollY = window.scrollY;
        if (this.opts.progress) {
            this.opts.progress(this.scrollY, this.scrollHeight);
        }
        this.tick();
    }

    tick() {
        if (!this.isTicking) {
            requestAnimationFrame(this.updateScroll.bind(this));
        }
        this.isTicking = true;
    }

    updateScroll() {
        this.isTicking = false;
    }
}

function isElementInViewport(element, intersect, nonIntersect) {
    const opts = {
        rootMargin: '0%'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
            intersect(element, entry);
        }
        else {
            nonIntersect(element, entry);
        }
    }, opts);
    observer.observe(element);
}

class Parallax {
    constructor(element) {
        this.element = element;
        this.ANIMATION_ATTR = 'data-parallax-animation';
        this.SPEED_ATTR = 'data-parallax-speed';
        this.DEFAULT_DURATION = 1500;
        this.DEFAULT_SPEED_FACTOR = 1.5;
        let initialized = false;
        const animeConfig = {
            targets: element,
            easing: 'linear',
            translateY: [-100, 0],
            autoplay: false,
            duration: this.DEFAULT_DURATION
        };
        this.animation = this.getAnimation();
        this.speed = this.getSpeed();
        if (this.animation.length) {
            animeConfig.translateY = this.animation;
        }
        this.isAnimate = false;
        this.anime = anime(animeConfig);
        isElementInViewport(element, (el, entry) => {
            this.windowHeight = window.innerHeight;
            this.isAnimate = true;
            this.requestAnimation();
        }, (el, entry) => {
            this.isAnimate = false;
        });
    }

    static init(element) {
        return new Parallax(element);
    }

    getSpeed() {
        const speed = this.element.getAttribute(this.SPEED_ATTR);
        return speed
            ? Number(speed)
            : this.DEFAULT_SPEED_FACTOR;
    }

    getAnimation() {
        const animation = this.element.getAttribute(this.ANIMATION_ATTR);
        return animation
            ? animation
                .split(',')
                .map((n) => Number(n))
            : [];
    }

    requestAnimation() {
        const rect = this.element.getBoundingClientRect();
        const top = rect.top;
        const height = rect.height;
        const scrolled = (top - this.windowHeight) * -1.5;
        this.anime.seek(scrolled * 2);
        if (this.isAnimate) {
            this.requestAnimationId = requestAnimationFrame(this.requestAnimation.bind(this));
        }
    }
    getScrollElementHeight() {
        return 0;
    }
}
document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        const elements = document.querySelectorAll('*[data-parallax]');
        Array.from(elements).forEach((el) => {
            Parallax.init(el);
        });
    }
};
