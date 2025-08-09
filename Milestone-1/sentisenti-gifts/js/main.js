document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mainNav.classList.toggle('active');
    });
    
    // Search Toggle
    const searchToggle = document.querySelector('.search-toggle');
    const searchBar = document.querySelector('.search-bar');
    
    searchToggle.addEventListener('click', function() {
        searchBar.classList.toggle('active');
    });
    
    // Hero Slider
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroPaginationBtns = document.querySelectorAll('.hero-pagination-btn');
    let currentSlide = 0;
    
    function showSlide(index) {
        heroSlides.forEach(slide => slide.classList.remove('active'));
        heroPaginationBtns.forEach(btn => btn.classList.remove('active'));
        
        heroSlides[index].classList.add('active');
        heroPaginationBtns[index].classList.add('active');
        currentSlide = index;
    }
    
    heroPaginationBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => showSlide(index));
    });
    
    // Auto slide change
    setInterval(() => {
        let nextSlide = (currentSlide + 1) % heroSlides.length;
        showSlide(nextSlide);
    }, 5000);
    
    // Initialize cart count
    updateCartCount();
    
    // Add to cart functionality
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            addToCart(productId);
        });
    });
    
    // Quick View Modal
    const quickViewBtns = document.querySelectorAll('.quick-view');
    const quickViewModal = document.getElementById('quickViewModal');
    const modalClose = document.querySelector('.modal-close');
    
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const product = this.getAttribute('data-product');
            // In a real implementation, you would fetch product details here
            // For demo, we'll just show the modal
            quickViewModal.classList.add('active');
        });
    });
    
    modalClose.addEventListener('click', function() {
        quickViewModal.classList.remove('active');
    });
    
    // Close modal when clicking outside
    quickViewModal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
        }
    });
    
    // Cookie Consent
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptCookies = document.getElementById('acceptCookies');
    
    if (!localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => {
            cookieConsent.classList.add('active');
        }, 1000);
    }
    
    acceptCookies.addEventListener('click', function() {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieConsent.classList.remove('active');
    });
    
    // Cart Functions
    function addToCart(productId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Check if product already in cart
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            // In a real app, you would fetch product details from your data
            const product = {
                id: productId,
                name: document.querySelector(`[data-product-id="${productId}"]`).parentElement.querySelector('.product-title').textContent,
                price: parseFloat(document.querySelector(`[data-product-id="${productId}"]`).parentElement.querySelector('.product-price').textContent.replace(/[^\d.]/g, '')),
                quantity: 1,
                image: document.querySelector(`[data-product-id="${productId}"]`).closest('.product-card').querySelector('img').src
            };
            cart.push(product);
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        
        // Show added to cart feedback
        const feedback = document.createElement('div');
        feedback.className = 'cart-feedback';
        feedback.textContent = 'Added to cart!';
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            feedback.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(feedback);
            }, 300);
        }, 2000);
    }
    
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        document.getElementById('cart-count').textContent = totalItems;
    }
    
    // Create cart feedback styles
    const style = document.createElement('style');
    style.textContent = `
        .cart-feedback {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: var(--primary-color);
            color: white;
            padding: 10px 20px;
            border-radius: 4px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 1000;
        }
        .cart-feedback.show {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
});












// Cookie Consent Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if cookie consent has been given
    if (!getCookie('cookie_consent')) {
        document.querySelector('.cookie-consent-banner').style.display = 'block';
    }

    // Accept All Cookies
    document.getElementById('accept-cookies').addEventListener('click', function() {
        setCookie('cookie_consent', 'all', 365);
        document.querySelector('.cookie-consent-banner').style.display = 'none';
    });

    // Cookie Settings
    document.getElementById('cookie-settings').addEventListener('click', function() {
        // Here you would typically open a modal with more detailed cookie options
        alert('Cookie settings would open here in a production environment');
    });
});

// Helper functions for cookies
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}