document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mainNav.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            mainNav.classList.remove('active');
        });
    });
    
    // Back to Top Button
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Cookie Consent
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptCookies = document.getElementById('acceptCookies');
    const declineCookies = document.getElementById('declineCookies');
    
    if (!localStorage.getItem('cookieConsent')) {
        setTimeout(() => {
            cookieConsent.classList.add('show');
        }, 1000);
    }
    
    acceptCookies.addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieConsent.classList.remove('show');
    });
    
    declineCookies.addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'declined');
        cookieConsent.classList.remove('show');
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
    
    // Hero scroll down button
    const heroScroll = document.querySelector('.hero-scroll');
    if (heroScroll) {
        heroScroll.addEventListener('click', function() {
            window.scrollTo({
                top: document.querySelector('#menu').offsetTop - 80,
                behavior: 'smooth'
            });
        });
    }
    
    // Testimonials slider
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial');
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
    }
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
    
    // Only run slider if there are multiple testimonials
    if (testimonials.length > 1) {
        showTestimonial(currentTestimonial);
        setInterval(nextTestimonial, 3000);
    }
    
    // Form submission handling
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && !emailInput.value.includes('@')) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Here you would typically send the form data to a server
            alert('Thank you for your submission!');
            this.reset();
        });
    });
    
    // Lazy loading for images
    if ('loading' in HTMLImageElement.prototype) {
        const lazyImages = document.querySelectorAll('img[ ]');
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const lazyLoad = function() {
            const lazyImages = document.querySelectorAll('img[ ]');
            
            const lazyImageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const lazyImage = entry.target;
                        lazyImage.src = lazyImage.dataset.src;
                        lazyImageObserver.unobserve(lazyImage);
                    }
                });
            });
            
            lazyImages.forEach(function(lazyImage) {
                lazyImageObserver.observe(lazyImage);
            });
        };
        
        document.addEventListener('DOMContentLoaded', lazyLoad);
    }
});



// menu page js 
// menu page js 
// menu page js 


document.addEventListener('DOMContentLoaded', function() {
    // Menu category filtering
    const categoryBtns = document.querySelectorAll('.menu-category-btn');
    const menuCategories = document.querySelectorAll('.menu-category');
    
    // Set up Intersection Observer for category highlighting
    const observerOptions = {
        root: null,
        rootMargin: '-100px 0px -50% 0px',
        threshold: 0
    };
    
    const categoryObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const categoryId = entry.target.id;
                
                // Update active button
                categoryBtns.forEach(btn => {
                    btn.classList.remove('active');
                    if (btn.dataset.category === categoryId || 
                       (categoryId === 'starters' && btn.dataset.category === 'all')) {
                        btn.classList.add('active');
                    }
                });
                
                // Update URL hash without scrolling
                if (history.replaceState) {
                    history.replaceState(null, null, `#${categoryId}`);
                }
            }
        });
    }, observerOptions);
    
    // Observe each menu category
    menuCategories.forEach(category => {
        categoryObserver.observe(category);
    });
    
    // Category button click handler
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Scroll to category
            if (category === 'all') {
                window.scrollTo({
                    top: document.querySelector('.menu-section').offsetTop - 100,
                    behavior: 'smooth'
                });
            } else {
                const targetCategory = document.getElementById(category);
                if (targetCategory) {
                    window.scrollTo({
                        top: targetCategory.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Check URL hash on load
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        const targetCategory = document.getElementById(hash);
        
        if (targetCategory) {
            // Find and activate corresponding button
            categoryBtns.forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.category === hash) {
                    btn.classList.add('active');
                }
            });
            
            // Scroll to category
            setTimeout(() => {
                window.scrollTo({
                    top: targetCategory.offsetTop - 100,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }
    
    // Menu item hover effects
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Mobile menu category scrolling
    const menuNav = document.querySelector('.menu-nav');
    let isDragging = false;
    let startX, scrollLeft;
    
    if (menuNav) {
        menuNav.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.pageX - menuNav.offsetLeft;
            scrollLeft = menuNav.scrollLeft;
            menuNav.style.cursor = 'grabbing';
            menuNav.style.userSelect = 'none';
        });
        
        menuNav.addEventListener('mouseleave', () => {
            isDragging = false;
            menuNav.style.cursor = '';
        });
        
        menuNav.addEventListener('mouseup', () => {
            isDragging = false;
            menuNav.style.cursor = '';
            menuNav.style.userSelect = '';
        });
        
        menuNav.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - menuNav.offsetLeft;
            const walk = (x - startX) * 2;
            menuNav.scrollLeft = scrollLeft - walk;
        });
        
        // Touch support for mobile
        menuNav.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].pageX - menuNav.offsetLeft;
            scrollLeft = menuNav.scrollLeft;
        });
        
        menuNav.addEventListener('touchend', () => {
            isDragging = false;
        });
        
        menuNav.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const x = e.touches[0].pageX - menuNav.offsetLeft;
            const walk = (x - startX) * 2;
            menuNav.scrollLeft = scrollLeft - walk;
        });
    }
});


// blog js code 
// blog js code 
// blog js code 

document.addEventListener('DOMContentLoaded', function() {
    // Blog category filtering
    const categoryBtns = document.querySelectorAll('.blog-category-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.dataset.category;
            
            // Filter blog cards
            blogCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Scroll to blog grid
            setTimeout(() => {
                document.querySelector('.blog-grid').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        });
    });
    
    // Check URL for category parameter
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    
    if (categoryParam) {
        const matchingBtn = document.querySelector(`.blog-category-btn[data-category="${categoryParam}"]`);
        if (matchingBtn) {
            matchingBtn.click();
        }
    }
    
    // Lazy load images with intersection observer
    if ('loading' in HTMLImageElement.prototype) {
        const lazyImages = document.querySelectorAll('img[ ]');
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        const lazyLoad = function() {
            const lazyImages = document.querySelectorAll('img[ ]');
            
            const lazyImageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const lazyImage = entry.target;
                        lazyImage.src = lazyImage.dataset.src;
                        lazyImageObserver.unobserve(lazyImage);
                    }
                });
            });
            
            lazyImages.forEach(function(lazyImage) {
                lazyImageObserver.observe(lazyImage);
            });
        };
        
        document.addEventListener('DOMContentLoaded', lazyLoad);
    }
    
    // Featured post hover effect
    const featuredPost = document.querySelector('.featured-post');
    if (featuredPost) {
        featuredPost.addEventListener('mouseenter', function() {
            this.querySelector('.featured-post-image img').style.transform = 'scale(1.05)';
        });
        
        featuredPost.addEventListener('mouseleave', function() {
            this.querySelector('.featured-post-image img').style.transform = 'scale(1)';
        });
    }
});


// careers css 
// careers css 
// careers css 
// careers css 


document.addEventListener('DOMContentLoaded', function() {
    // Job accordion functionality
    const jobTitles = document.querySelectorAll('.job-title');
    
    jobTitles.forEach(title => {
        title.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            
            const jobDetails = this.nextElementSibling;
            if (isExpanded) {
                jobDetails.style.maxHeight = null;
            } else {
                jobDetails.style.maxHeight = jobDetails.scrollHeight + 'px';
            }
            
            // Rotate the arrow icon
            const arrow = this.querySelector('svg');
            arrow.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
        });
    });
    
    // Set initial state for job details
    document.querySelectorAll('.job-details').forEach(details => {
        details.style.maxHeight = null;
    });
    
    // FAQ accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            
            const faqAnswer = this.nextElementSibling;
            if (isExpanded) {
                faqAnswer.style.maxHeight = null;
            } else {
                faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
            }
            
            // Rotate the arrow icon
            const arrow = this.querySelector('svg');
            arrow.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
        });
    });
    
    // Set initial state for FAQ answers
    document.querySelectorAll('.faq-answer').forEach(answer => {
        answer.style.maxHeight = null;
    });
    
    // Application form handling
    const applicationForm = document.querySelector('.application-form');
    if (applicationForm) {
        applicationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = 'var(--primary-color)';
                    isValid = false;
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (!isValid) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Here you would typically send the form data to your server
            // For demonstration, we'll show a success message
            alert('Thank you for your application! We will review your information and contact you soon.');
            this.reset();
        });
    }
    
    // Smooth scroll to application form when clicking "Apply Now"
    document.querySelectorAll('a[href="#apply"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const applySection = document.getElementById('apply');
            if (applySection) {
                window.scrollTo({
                    top: applySection.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});