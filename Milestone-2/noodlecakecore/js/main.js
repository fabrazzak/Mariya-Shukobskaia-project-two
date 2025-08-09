document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Showcase image slider
    const showcaseImages = document.querySelectorAll('.showcase-image');
    const mediaDots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;
    
    function showImage(index) {
        showcaseImages.forEach(img => img.classList.remove('active'));
        mediaDots.forEach(dot => dot.classList.remove('active'));
        
        showcaseImages[index].classList.add('active');
        mediaDots[index].classList.add('active');
        currentIndex = index;
    }
    
    mediaDots.forEach((dot, index) => {
        dot.addEventListener('click', () => showImage(index));
    });
    
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + showcaseImages.length) % showcaseImages.length;
        showImage(currentIndex);
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % showcaseImages.length;
        showImage(currentIndex);
    });
    
    // Auto-rotate showcase images
    let showcaseInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % showcaseImages.length;
        showImage(currentIndex);
    }, 5000);
    
    // Pause auto-rotation on hover
    const mediaContainer = document.querySelector('.media-container');
    mediaContainer.addEventListener('mouseenter', () => {
        clearInterval(showcaseInterval);
    });
    
    mediaContainer.addEventListener('mouseleave', () => {
        showcaseInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % showcaseImages.length;
            showImage(currentIndex);
        }, 5000);
    });
    
    // Testimonial slider
    const testimonials = document.querySelectorAll('.testimonial-card');
    const testimonialPrev = document.querySelector('.slider-prev');
    const testimonialNext = document.querySelector('.slider-next');
    let testimonialIndex = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        testimonials[index].classList.add('active');
        testimonialIndex = index;
    }
    
    testimonialPrev.addEventListener('click', () => {
        testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(testimonialIndex);
    });
    
    testimonialNext.addEventListener('click', () => {
        testimonialIndex = (testimonialIndex + 1) % testimonials.length;
        showTestimonial(testimonialIndex);
    });
    
    // Auto-rotate testimonials
    let testimonialInterval = setInterval(() => {
        testimonialIndex = (testimonialIndex + 1) % testimonials.length;
        showTestimonial(testimonialIndex);
    }, 8000);
    
    // Cookie Consent
    const cookieBanner = document.getElementById('cookie-consent');
    const acceptCookies = document.getElementById('accept-cookies');
    const declineCookies = document.getElementById('decline-cookies');
    
    if (!localStorage.getItem('cookieConsent')) {
        setTimeout(() => {
            cookieBanner.style.display = 'block';
        }, 2000);
    }
    
    acceptCookies.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieBanner.style.display = 'none';
    });
    
    declineCookies.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'declined');
        cookieBanner.style.display = 'none';
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
    
    // Initialize first testimonial and showcase image
    showTestimonial(0);
    showImage(0);
    
    // Lazy loading for images
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
    
    // Animation on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.feature-card, .blog-card, .testimonial-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state for animated elements
    document.querySelectorAll('.feature-card, .blog-card, .testimonial-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});















 // Blog post specific JavaScript
        document.addEventListener('DOMContentLoaded', function() {
            // Search functionality
            const searchForm = document.querySelector('.search-form');
            searchForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const searchTerm = this.querySelector('input').value.trim();
                if (searchTerm) {
                    alert('Searching for: ' + searchTerm);
                    // In a real implementation, this would redirect to search results
                    // window.location.href = '/blog/search/?s=' + encodeURIComponent(searchTerm);
                }
            });
            
            // Newsletter subscription
            const newsletterForm = document.querySelector('.newsletter-form');
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = this.querySelector('input').value.trim();
                if (email) {
                    alert('Thank you for subscribing with: ' + email);
                    this.querySelector('input').value = '';
                    // In a real implementation, this would send the email to your backend
                }
            });
            
            // Comment form submission
            const commentForm = document.querySelector('.comment-form form');
            if (commentForm) {
                commentForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const name = this.querySelector('#name').value.trim();
                    const comment = this.querySelector('#comment').value.trim();
                    
                    if (name && comment) {
                        alert('Thank you for your comment! It will be visible after moderation.');
                        this.reset();
                        // In a real implementation, this would send the comment to your backend
                    }
                });
            }
            
            // Social sharing buttons
            document.querySelectorAll('.post-share a').forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    let url = '';
                    const postUrl = window.location.href;
                    const postTitle = document.querySelector('.post-header h1').textContent;
                    
                    if (this.classList.contains('facebook')) {
                        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
                    } else if (this.classList.contains('twitter')) {
                        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(postTitle)}`;
                    } else if (this.classList.contains('linkedin')) {
                        url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(postUrl)}&title=${encodeURIComponent(postTitle)}`;
                    } else if (this.classList.contains('reddit')) {
                        url = `https://www.reddit.com/submit?url=${encodeURIComponent(postUrl)}&title=${encodeURIComponent(postTitle)}`;
                    }
                    
                    if (url) {
                        window.open(url, '_blank', 'width=600,height=400');
                    }
                });
            });
        });











        document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = this.querySelector('input').value.trim();
            if (searchTerm) {
                alert('Searching for: ' + searchTerm);
                // In a real implementation, this would redirect to search results
                // window.location.href = '/blog/search/?s=' + encodeURIComponent(searchTerm);
            }
        });
    }
    
    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input').value.trim();
            if (email) {
                alert('Thank you for subscribing with: ' + email);
                this.querySelector('input').value = '';
                // In a real implementation, this would send the email to your backend
            }
        });
    }
    
    // Comment form submission
    const commentForm = document.querySelector('.comment-form form');
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = this.querySelector('#name').value.trim();
            const comment = this.querySelector('#comment').value.trim();
            
            if (name && comment) {
                alert('Thank you for your comment! It will be visible after moderation.');
                this.reset();
                // In a real implementation, this would send the comment to your backend
            }
        });
    }
    
    // Social sharing buttons
    document.querySelectorAll('.post-share a').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            let url = '';
            const postUrl = window.location.href;
            const postTitle = document.querySelector('.post-header h1').textContent;
            
            if (this.classList.contains('facebook')) {
                url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
            } else if (this.classList.contains('twitter')) {
                url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(postTitle)}`;
            } else if (this.classList.contains('linkedin')) {
                url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(postUrl)}&title=${encodeURIComponent(postTitle)}`;
            } else if (this.classList.contains('reddit')) {
                url = `https://www.reddit.com/submit?url=${encodeURIComponent(postUrl)}&title=${encodeURIComponent(postTitle)}`;
            }
            
            if (url) {
                window.open(url, '_blank', 'width=600,height=400');
            }
        });
    });
    
    // Smooth scrolling for comment links
    document.querySelectorAll('a[href^="#comments"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const commentsSection = document.getElementById('comments');
            if (commentsSection) {
                window.scrollTo({
                    top: commentsSection.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize any animations
    function animateOnScroll() {
        const elements = document.querySelectorAll('.prize-card, .quote-card, .related-post');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state for animated elements
    document.querySelectorAll('.prize-card, .quote-card, .related-post').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});

