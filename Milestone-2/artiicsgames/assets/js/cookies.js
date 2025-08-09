document.addEventListener('DOMContentLoaded', function() {
    const cookieBanner = document.getElementById('cookie-consent');
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    
    // Check if user has already accepted cookies
    if (!localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1000);
    }
    
    // Accept cookies
    acceptCookiesBtn.addEventListener('click', function() {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieBanner.classList.remove('show');
    });
    
    // Optional: Cookie settings functionality
    // This can be expanded with a modal for more detailed cookie settings
});