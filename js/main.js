// =========================================
// Main JavaScript File
// =========================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lenis (Smooth Scroll)
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 0.8, // Slightly reduced for better control
        smoothTouch: false,
        touchMultiplier: 2,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Integrate Lenis with GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // 2. Navigation Logic
    initNav();

    // 3. Hero Animations
    initHero();

    // 4. Services Animations
    initServices();

    // 5. About Animations
    initAbout();

    // 6. Experience Animations
    initExperience();

    // 7. Portfolio Animations
    initPortfolio();

    // 8. Skills Animations
    initSkills();

    // 10. Hero Parallax Effect
    if (window.matchMedia("(min-width: 900px)").matches) {
        initHeroParallax();
    }
});

function initHeroParallax() {
    const heroSection = document.getElementById('hero');
    const movingElements = document.querySelectorAll('.hero-text h1, .hero-text .badge, .hero-text .subtitle');

    heroSection.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20; // -10px to 10px
        const y = (e.clientY / window.innerHeight - 0.5) * 20;

        movingElements.forEach((el, index) => {
            const depth = 1 + (index * 0.5); // Stagger depth
            const moveX = x * depth;
            const moveY = y * depth;

            gsap.to(el, {
                x: moveX,
                y: moveY,
                duration: 1,
                ease: "power2.out"
            });
        });
    });

    heroSection.addEventListener('mouseleave', () => {
        movingElements.forEach(el => {
            gsap.to(el, {
                x: 0,
                y: 0,
                duration: 1,
                ease: "power2.out"
            });
        });
    });
}

function initZoomBlocking() {
    // Block Keydown Zoom (Ctrl + +, -, 0)
    document.addEventListener('keydown', function (event) {
        if (event.ctrlKey && (
            event.key === '+' ||
            event.key === '-' ||
            event.key === '=' ||
            event.key === '0' ||
            event.keyCode === 187 ||
            event.keyCode === 189 ||
            event.keyCode === 107 ||
            event.keyCode === 109 ||
            event.keyCode === 96
        )) {
            event.preventDefault();
        }
    }, { passive: false });

    // Block Wheel Zoom (Ctrl + Scroll)
    document.addEventListener('wheel', function (event) {
        if (event.ctrlKey) {
            event.preventDefault();
        }
    }, { passive: false });

    // Block Touch Gestures (Pinch to Zoom)
    document.addEventListener('gesturestart', function (event) {
        event.preventDefault();
    }, { passive: false });

    document.addEventListener('gesturechange', function (event) {
        event.preventDefault();
    }, { passive: false });

    // Block Double Tap Zoom
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, { passive: false });
}

function initNav() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    let lastScrollY = window.scrollY;

    // Sticky & Hide/Show Logic
    // Sticky & Hide/Show Logic
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Cache selectors for better performance
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('.nav-links li a');

    function handleScroll() {
        const currentScrollY = window.scrollY;

        // Add background on scroll
        if (currentScrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Highlight Active Link
        sections.forEach(current => {
            const sectionTop = current.offsetTop;
            const sectionHeight = current.clientHeight;
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {

                navLi.forEach(a => {
                    a.classList.remove('active');
                    if (a.getAttribute('href').includes(current.getAttribute('id'))) {
                        a.classList.add('active');
                    }
                });
            }
        });
    }

    // Mobile Menu Toggle
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        hamburger.classList.toggle('active');

        // Check if menu is empty and populate if needed
        if (!mobileMenu.querySelector('.mobile-nav-links')) {
            mobileMenu.innerHTML = `
                <ul class="mobile-nav-links">
                    <li><a href="#hero" onclick="closeMenu()">Home</a></li>
                    <li><a href="#services" onclick="closeMenu()">Services</a></li>
                    <li><a href="#about" onclick="closeMenu()">About</a></li>
                    <li><a href="#experience" onclick="closeMenu()">Experience</a></li>
                    <li><a href="#portfolio" onclick="closeMenu()">Work</a></li>
                    <li><a href="#contact" onclick="closeMenu()">Contact</a></li>
                </ul>
            `;
        }
    });
}

// Global function to close menu
window.closeMenu = function () {
    document.getElementById('mobile-menu').classList.remove('active');
    document.getElementById('hamburger').classList.remove('active');
}

function initHero() {
    // Quiet Luxury: Almost Still, Gentle Fade
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.to('.hero-bg-video', {
        opacity: 1,
        duration: 1.5
    })
        .to('.badge-wrapper', {
            y: 0,
            opacity: 1,
            duration: 0.8
        }, "-=0.5")
        .to(['.title-line-1', '.title-line-2'], {
            y: 0,
            opacity: 1,
            duration: 1.0,
            stagger: 0.1
        }, "-=0.6")
        .to('.hero-text .subtitle', {
            y: 0,
            opacity: 1,
            duration: 1.0
        }, "-=0.8")
        .to('.signature-wrapper', {
            y: 0,
            opacity: 1,
            duration: 1.0
        }, "-=0.8");
}

function initServices() {
    // Title Animation
    gsap.to('#services .section-title', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
            trigger: '#services',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    // Cards Stagger Animation
    gsap.to('.service-card', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
}

function initAbout() {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#about",
            start: "top 75%"
        }
    });

    tl.from('.about-visual-col', {
        x: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    })
        .from('.section-label', {
            y: 20,
            opacity: 0,
            duration: 0.6
        }, "-=0.5")
        .from('.about-heading', {
            y: 30,
            opacity: 0,
            duration: 0.8
        }, "-=0.4")
        .from('.about-intro', {
            y: 20,
            opacity: 0,
            duration: 0.6
        }, "-=0.4")
        .from('.tag-pill', {
            y: 20,
            opacity: 0,
            stagger: 0.1,
            duration: 0.5
        }, "-=0.2");
}

function initExperience() {
    gsap.from('.timeline-card', {
        x: -30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
            trigger: '.timeline',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    gsap.from('.timeline-line', {
        height: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.timeline',
            start: 'top 80%'
        }
    });
}

function initPortfolio() {
    gsap.from(".project-card", {
        scrollTrigger: {
            trigger: ".portfolio-grid",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
    });
}

function initSkills() {
    gsap.utils.toArray('.radial-progress').forEach(progress => {
        const percentage = progress.getAttribute('data-percentage');
        const circle = progress.querySelector('.progress-circle');
        const radius = circle.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;

        // Set initial state
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = circumference;

        const offset = circumference - (percentage / 100) * circumference;

        gsap.to(circle, {
            strokeDashoffset: offset,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: progress,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });

        // Animate the label
        const label = progress.querySelector('.percentage-label');
        gsap.from(label, {
            textContent: 0,
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            stagger: 1,
            scrollTrigger: {
                trigger: progress,
                start: "top 85%",
            },
            onUpdate: function () {
                this.targets()[0].innerHTML = Math.ceil(this.progress() * percentage) + "%";
            }
        });
    });
}
