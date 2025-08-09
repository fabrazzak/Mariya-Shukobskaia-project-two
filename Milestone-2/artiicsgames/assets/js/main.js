document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Sticky Navigation
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Cookie Consent
const cookieConsent = document.querySelector('.cookie-consent');
const cookieAccept = document.querySelector('.cookie-accept');
const cookieDecline = document.querySelector('.cookie-decline');

if (!localStorage.getItem('cookieChoice')) {
    setTimeout(() => {
        cookieConsent.classList.add('show');
    }, 2000);
}

cookieAccept.addEventListener('click', function() {
    localStorage.setItem('cookieChoice', 'accepted');
    cookieConsent.classList.remove('show');
    // Set necessary cookies here
    document.cookie = 'essentialCookies=true; max-age=31536000; path=/';
    document.cookie = 'analyticsCookies=true; max-age=31536000; path=/';
});

cookieDecline.addEventListener('click', function() {
    localStorage.setItem('cookieChoice', 'declined');
    cookieConsent.classList.remove('show');
    // Only set strictly necessary cookies
    document.cookie = 'essentialCookies=true; max-age=31536000; path=/';
    // Clear any existing non-essential cookies
    document.cookie = 'analyticsCookies=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
    document.cookie = 'marketingCookies=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
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
    
    // Download button animation
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'https://play.google.com/store/apps/details?id=artiic.ligaTweetsFree';
        });
    }
    
    // Screenshot carousel auto-scroll
    const carousel = document.querySelector('.screenshot-carousel');
    if (carousel) {
        let scrollAmount = 0;
        const scrollStep = 320;
        const scrollInterval = setInterval(() => {
            carousel.scrollLeft += scrollStep;
            scrollAmount += scrollStep;
            
            if (scrollAmount >= carousel.scrollWidth - carousel.clientWidth) {
                scrollAmount = 0;
                carousel.scrollLeft = 0;
            }
        }, 3000);
        
        // Pause on hover
        carousel.addEventListener('mouseenter', () => {
            clearInterval(scrollInterval);
        });
        
        carousel.addEventListener('mouseleave', () => {
            scrollInterval = setInterval(() => {
                carousel.scrollLeft += scrollStep;
                scrollAmount += scrollStep;
                
                if (scrollAmount >= carousel.scrollWidth - carousel.clientWidth) {
                    scrollAmount = 0;
                    carousel.scrollLeft = 0;
                }
            }, 3000);
        });
    }
    
    // Active nav link based on scroll position
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});




// blog page js 
// Blog Post Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Social Share Buttons
    const shareButtons = document.querySelectorAll('.social-share a');
    if (shareButtons) {
        shareButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const platform = this.querySelector('i').classList[1];
                let shareUrl = '';
                const currentUrl = encodeURIComponent(window.location.href);
                const title = encodeURIComponent(document.title);
                
                switch(platform) {
                    case 'fa-facebook-f':
                        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
                        break;
                    case 'fa-twitter':
                        shareUrl = `https://twitter.com/intent/tweet?url=${currentUrl}&text=${title}`;
                        break;
                    case 'fa-linkedin-in':
                        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}&title=${title}`;
                        break;
                }
                
                if (shareUrl) {
                    window.open(shareUrl, '_blank', 'width=600,height=400');
                }
            });
        });
    }
    
    // Comment Form Submission
    const commentForm = document.querySelector('.comment-form');
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the comment to your server
            // For demonstration, we'll just show an alert
            alert('Thank you for your comment! It will be visible after moderation.');
            this.reset();
        });
    }
    
    // Newsletter Subscription
    const newsletterForms = document.querySelectorAll('.sidebar-newsletter');
    if (newsletterForms) {
        newsletterForms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = this.querySelector('input').value;
                
                // Here you would typically send the email to your newsletter service
                // For demonstration, we'll just show an alert
                alert(`Thank you for subscribing with ${email}! You'll receive our next newsletter.`);
                this.reset();
            });
        });
    }
});






// Cookie Settings Modal
const cookieModal = document.getElementById('cookieModal');
const openSettingsBtn = document.getElementById('open-cookie-settings');
const closeModalBtn = document.querySelector('.close-modal');
const savePrefsBtn = document.querySelector('.save-preferences');
const acceptAllBtn = document.querySelector('.accept-all');

// Open modal when settings button clicked
if (openSettingsBtn) {
    openSettingsBtn.addEventListener('click', function() {
        cookieModal.style.display = 'block';
        
        // Load saved preferences
        const analyticsPref = localStorage.getItem('analyticsCookies') === 'true';
        const marketingPref = localStorage.getItem('marketingCookies') === 'true';
        
        document.getElementById('analyticsCookies').checked = analyticsPref;
        document.getElementById('marketingCookies').checked = marketingPref;
    });
}

// Close modal when X clicked
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', function() {
        cookieModal.style.display = 'none';
    });
}

// Close modal when clicking outside content
window.addEventListener('click', function(event) {
    if (event.target === cookieModal) {
        cookieModal.style.display = 'none';
    }
});

// Save preferences
if (savePrefsBtn) {
    savePrefsBtn.addEventListener('click', function() {
        const analyticsPref = document.getElementById('analyticsCookies').checked;
        const marketingPref = document.getElementById('marketingCookies').checked;
        
        localStorage.setItem('analyticsCookies', analyticsPref);
        localStorage.setItem('marketingCookies', marketingPref);
        
        // Update cookie consent
        document.cookie = `analyticsCookies=${analyticsPref}; max-age=31536000; path=/`;
        document.cookie = `marketingCookies=${marketingPref}; max-age=31536000; path=/`;
        
        cookieModal.style.display = 'none';
        alert('Your cookie preferences have been saved.');
    });
}

// Accept all cookies
if (acceptAllBtn) {
    acceptAllBtn.addEventListener('click', function() {
        localStorage.setItem('analyticsCookies', 'true');
        localStorage.setItem('marketingCookies', 'true');
        
        document.getElementById('analyticsCookies').checked = true;
        document.getElementById('marketingCookies').checked = true;
        
        // Update cookie consent
        document.cookie = 'analyticsCookies=true; max-age=31536000; path=/';
        document.cookie = 'marketingCookies=true; max-age=31536000; path=/';
        
        cookieModal.style.display = 'none';
        alert('All cookies have been accepted.');
    });
}

// Check for existing preferences on page load
document.addEventListener('DOMContentLoaded', function() {
    // Set default preferences if none exist
    if (localStorage.getItem('analyticsCookies') === null) {
        localStorage.setItem('analyticsCookies', 'true');
    }
    if (localStorage.getItem('marketingCookies') === null) {
        localStorage.setItem('marketingCookies', 'false');
    }
    
    // Hide cookie consent banner if preferences already set
    if (document.cookie.includes('cookieAccepted=true')) {
        document.querySelector('.cookie-consent').classList.remove('show');
    }
});