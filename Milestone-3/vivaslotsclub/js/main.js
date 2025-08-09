document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // // Age verification modal
    // const ageModal = document.getElementById('ageModal');
    // const confirmAge = document.getElementById('confirmAge');
    // const exitSite = document.getElementById('exitSite');
    
    // // Check if age has been verified
    // if (!localStorage.getItem('ageVerified')) {
    //     setTimeout(() => {
    //         ageModal.classList.add('active');
    //     }, 1000);
    // }
    
    // confirmAge.addEventListener('click', function() {
    //     localStorage.setItem('ageVerified', 'true');
    //     ageModal.classList.remove('active');
    // });
    
    // exitSite.addEventListener('click', function() {
    //     window.location.href = 'https://www.google.com';
    // });
    
    // Cookies consent
    const cookiesConsent = document.getElementById('cookiesConsent');
    const acceptCookies = document.getElementById('acceptCookies');
    
    if (!localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => {
            cookiesConsent.classList.add('active');
        }, 2000);
    }
    
    acceptCookies.addEventListener('click', function() {
        localStorage.setItem('cookiesAccepted', 'true');
        cookiesConsent.classList.remove('active');
    });
    
    // Smooth scrolling for anchor links
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
    
    // Hero scroll button
    const heroScroll = document.querySelector('.hero-scroll');
    if (heroScroll) {
        heroScroll.addEventListener('click', function() {
            window.scrollTo({
                top: document.querySelector('.features').offsetTop - 80,
                behavior: 'smooth'
            });
        });
    }
    
    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-pop-in');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.animation = 'pop-in 0.8s ease-out forwards';
            }
        });
    };
    
    // Initial check
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Game carousel auto-scroll (simple implementation)
    const gameCarousel = document.querySelector('.game-carousel');
    if (gameCarousel) {
        let scrollAmount = 0;
        const scrollStep = 320; // Width of card + gap
        
        setInterval(() => {
            scrollAmount += scrollStep;
            if (scrollAmount > gameCarousel.scrollWidth - gameCarousel.clientWidth) {
                scrollAmount = 0;
            }
            gameCarousel.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }, 3000);
    }
    
    // Review carousel auto-scroll
    const reviewCarousel = document.querySelector('.review-carousel');
    if (reviewCarousel) {
        let reviewScrollAmount = 0;
        const reviewScrollStep = 380; // Width of card + gap
        
        setInterval(() => {
            reviewScrollAmount += reviewScrollStep;
            if (reviewScrollAmount > reviewCarousel.scrollWidth - reviewCarousel.clientWidth) {
                reviewScrollAmount = 0;
            }
            reviewCarousel.scrollTo({
                left: reviewScrollAmount,
                behavior: 'smooth'
            });
        }, 5000);
    }
});


document.getElementById("acceptCookies").addEventListener("click", function () {
        // Save acceptance in localStorage or cookies
        localStorage.setItem("cookiesConsent", "accepted");
        document.getElementById("cookiesConsent").style.display = "none";
    });

    document.getElementById("declineCookies").addEventListener("click", function () {
        // Save decline in localStorage or cookies
        localStorage.setItem("cookiesConsent", "declined");
        document.getElementById("cookiesConsent").style.display = "none";
    });

    window.addEventListener("load", function () {
        const consent = localStorage.getItem("cookiesConsent");
        if (consent) {
            document.getElementById("cookiesConsent").style.display = "none";
        }
    });



    


    document.addEventListener('DOMContentLoaded', function() {
    // ... (keep all your existing code) ...
    
    // Enhanced animation observer
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.section-title, .feature-card, .game-slide, .tournament-info, .tournament-image, .bonus-card, .review-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };
    
    // Initialize animations
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Add glow animation to header logo text on hover
    const logoText = document.querySelector('.logo h2');
    if (logoText) {
        logoText.addEventListener('mouseenter', function() {
            this.classList.add('animate-glow');
        });
        
        logoText.addEventListener('mouseleave', function() {
            this.classList.remove('animate-glow');
        });
    }
    
    // Add float animation to game showcase images
    const gameSlides = document.querySelectorAll('.game-slide');
    gameSlides.forEach(slide => {
        slide.addEventListener('mouseenter', function() {
            this.querySelector('img').classList.add('animate-float');
        });
        
        slide.addEventListener('mouseleave', function() {
            this.querySelector('img').classList.remove('animate-float');
        });
    });
    
    // Add pulse animation to feature icons on hover
    const featureIcons = document.querySelectorAll('.feature-icon');
    featureIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.classList.add('animate-pulse');
        });
        
        icon.addEventListener('mouseleave', function() {
            this.classList.remove('animate-pulse');
        });
    });
    
    // Add animation to hero buttons
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach((button, index) => {
        button.style.opacity = '0';
        button.style.transform = 'translateY(20px)';
        button.style.animation = `fadeInUp 0.8s ease-out ${0.6 + (index * 0.2)}s forwards`;
    });
    
    // Add animation to nav items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(-10px)';
        item.style.animation = `fadeInUp 0.5s ease-out ${0.3 + (index * 0.1)}s forwards`;
    });
});