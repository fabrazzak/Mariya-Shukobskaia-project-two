document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('fade-out');
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Cookie Consent
    const cookieConsent = document.querySelector('.cookie-consent');
    const acceptCookies = document.getElementById('accept-cookies');
    const declineCookies = document.getElementById('decline-cookies');
    
    if (!localStorage.getItem('cookieConsent')) {
        setTimeout(function() {
            cookieConsent.classList.add('show');
        }, 2000);
    }
    
    acceptCookies.addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieConsent.classList.remove('show');
    });
    
    declineCookies.addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'declined');
        cookieConsent.classList.remove('show');
    });

    // GSAP Animations
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Animate features on scroll
        gsap.utils.toArray('.feature-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: i * 0.1
            });
        });
        
        // Animate casino cards on scroll
        gsap.utils.toArray('.casino-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                x: i % 2 === 0 ? -50 : 50,
                opacity: 0,
                duration: 0.8,
                delay: i * 0.1
            });
        });
        
        // Animate review cards on scroll
        gsap.utils.toArray('.review-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: i * 0.1
            });
        });
        
        // Parallax effect for casinos section
        gsap.to('.parallax-background', {
            scrollTrigger: {
                trigger: '.casinos',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            },
            y: 100,
            ease: 'none'
        });
    }

    // Initialize sliders
    function initSliders() {
        // Casino slider auto-scroll
        const casinoSlider = document.querySelector('.casinos-slider');
        if (casinoSlider) {
            let isDown = false;
            let startX;
            let scrollLeft;
            
            casinoSlider.addEventListener('mousedown', (e) => {
                isDown = true;
                startX = e.pageX - casinoSlider.offsetLeft;
                scrollLeft = casinoSlider.scrollLeft;
            });
            
            casinoSlider.addEventListener('mouseleave', () => {
                isDown = false;
            });
            
            casinoSlider.addEventListener('mouseup', () => {
                isDown = false;
            });
            
            casinoSlider.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - casinoSlider.offsetLeft;
                const walk = (x - startX) * 2;
                casinoSlider.scrollLeft = scrollLeft - walk;
            });
            
            // Auto-scroll animation
            let direction = 1;
            let scrollAmount = 0;
            const maxScroll = casinoSlider.scrollWidth - casinoSlider.clientWidth;
            
            function autoScroll() {
                if (maxScroll <= 0) return;
                
                scrollAmount += direction * 0.5;
                casinoSlider.scrollLeft = scrollAmount;
                
                if (scrollAmount >= maxScroll || scrollAmount <= 0) {
                    direction *= -1;
                }
                
                requestAnimationFrame(autoScroll);
            }
            
            // Start auto-scroll after a delay
            setTimeout(autoScroll, 3000);
        }
        
        // Reviews slider auto-scroll
        const reviewSlider = document.querySelector('.reviews-slider');
        if (reviewSlider) {
            let isDown = false;
            let startX;
            let scrollLeft;
            
            reviewSlider.addEventListener('mousedown', (e) => {
                isDown = true;
                startX = e.pageX - reviewSlider.offsetLeft;
                scrollLeft = reviewSlider.scrollLeft;
            });
            
            reviewSlider.addEventListener('mouseleave', () => {
                isDown = false;
            });
            
            reviewSlider.addEventListener('mouseup', () => {
                isDown = false;
            });
            
            reviewSlider.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - reviewSlider.offsetLeft;
                const walk = (x - startX) * 2;
                reviewSlider.scrollLeft = scrollLeft - walk;
            });
            
            // Auto-scroll animation
            let direction = 1;
            let scrollAmount = 0;
            const maxScroll = reviewSlider.scrollWidth - reviewSlider.clientWidth;
            
            function autoScroll() {
                if (maxScroll <= 0) return;
                
                scrollAmount += direction * 0.5;
                reviewSlider.scrollLeft = scrollAmount;
                
                if (scrollAmount >= maxScroll || scrollAmount <= 0) {
                    direction *= -1;
                }
                
                requestAnimationFrame(autoScroll);
            }
            
            // Start auto-scroll after a delay
            setTimeout(autoScroll, 3000);
        }
    }
    
    // Initialize sliders after a short delay to ensure DOM is ready
    setTimeout(initSliders, 500);
});