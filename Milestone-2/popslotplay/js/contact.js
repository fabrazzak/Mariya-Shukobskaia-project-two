document.addEventListener('DOMContentLoaded', function() {
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission (in a real site, you would use AJAX or similar)
            contactForm.style.display = 'none';
            formSuccess.style.display = 'block';
            
            // Reset form after 5 seconds (for demo purposes)
            setTimeout(function() {
                contactForm.reset();
                contactForm.style.display = 'block';
                formSuccess.style.display = 'none';
            }, 5000);
        });
    }
    
    // Animation for contact methods
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Animate contact methods
        gsap.utils.toArray('.contact-method').forEach((method, i) => {
            gsap.from(method, {
                scrollTrigger: {
                    trigger: method,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                x: i % 2 === 0 ? -50 : 50,
                opacity: 0,
                duration: 0.8,
                delay: i * 0.1
            });
        });
        
        // Animate FAQ items
        gsap.utils.toArray('.faq-item').forEach((item, i) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: i * 0.1
            });
        });
    }
});