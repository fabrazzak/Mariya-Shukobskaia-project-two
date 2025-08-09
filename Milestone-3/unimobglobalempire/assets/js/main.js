 document.addEventListener('DOMContentLoaded', function() {
        // Check if user has already made a choice
        if (!localStorage.getItem('cookies-consent')) {
            // Show the cookies consent banner after a short delay
            setTimeout(() => {
                document.getElementById('cookies-consent').classList.remove('hidden');
                document.getElementById('cookies-consent').classList.add('block');
            }, 1000);
        }

        // Accept button
        document.getElementById('cookies-accept').addEventListener('click', function() {
            localStorage.setItem('cookies-consent', 'accepted');
            document.getElementById('cookies-consent').classList.add('hidden');
            // Here you would also load your analytics/tracking scripts
        });

        // Decline button
        document.getElementById('cookies-decline').addEventListener('click', function() {
            localStorage.setItem('cookies-consent', 'declined');
            document.getElementById('cookies-consent').classList.add('hidden');
            // Here you would ensure no tracking scripts are loaded
        });

        // Learn More button
        document.getElementById('cookies-learn-more').addEventListener('click', function() {
            document.getElementById('cookies-modal').classList.remove('hidden');
            document.getElementById('cookies-modal').classList.add('flex');
        });

        // Modal close button
        document.getElementById('cookies-modal-close').addEventListener('click', function() {
            document.getElementById('cookies-modal').classList.add('hidden');
            document.getElementById('cookies-modal').classList.remove('flex');
        });

        // Modal accept button
        document.getElementById('cookies-modal-accept').addEventListener('click', function() {
            localStorage.setItem('cookies-consent', 'accepted');
            document.getElementById('cookies-consent').classList.add('hidden');
            document.getElementById('cookies-modal').classList.add('hidden');
            document.getElementById('cookies-modal').classList.remove('flex');
            // Here you would also load your analytics/tracking scripts
        });
    });

    // Mobile Menu Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            // Toggle mobile menu visibility
            mobileMenu.classList.toggle('hidden');
            
            // Change icon between bars and times
            const icon = mobileMenuButton.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });
        
        // Close mobile menu when clicking on a link
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.querySelector('i').classList.remove('fa-times');
                mobileMenuButton.querySelector('i').classList.add('fa-bars');
            });
        });
    }
    
    // Back to Top Button
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.remove('opacity-0', 'invisible');
                backToTopButton.classList.add('opacity-100', 'visible');
            } else {
                backToTopButton.classList.add('opacity-0', 'invisible');
                backToTopButton.classList.remove('opacity-100', 'visible');
            }
        });
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Cookies Consent
    const cookiesConsent = document.getElementById('cookies-consent');
    const cookiesAccept = document.getElementById('cookies-accept');
    const cookiesDecline = document.getElementById('cookies-decline');
    
    if (cookiesConsent && cookiesAccept && cookiesDecline) {
        // Check if user has already made a choice
        if (!localStorage.getItem('cookies-consent')) {
            cookiesConsent.classList.remove('hidden');
        }
        
        cookiesAccept.addEventListener('click', function() {
            localStorage.setItem('cookies-consent', 'accepted');
            cookiesConsent.classList.add('hidden');
        });
        
        cookiesDecline.addEventListener('click', function() {
            localStorage.setItem('cookies-consent', 'declined');
            cookiesConsent.classList.add('hidden');
        });
    }
});