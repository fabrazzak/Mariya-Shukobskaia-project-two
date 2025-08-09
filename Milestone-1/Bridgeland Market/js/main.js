// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        this.innerHTML = mainNav.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', function() {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
});

// Hero Slider
function initHeroSlider() {
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroIndicators = document.querySelector('.hero-indicators');
    const heroPrev = document.querySelector('.hero-prev');
    const heroNext = document.querySelector('.hero-next');
    
    let currentSlide = 0;
    
    // Create indicators
    heroSlides.forEach((slide, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('hero-indicator');
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(index));
        heroIndicators.appendChild(indicator);
    });
    
    const indicators = document.querySelectorAll('.hero-indicator');
    
    function updateSlider() {
        heroSlides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
        
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }
    
    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % heroSlides.length;
        updateSlider();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
        updateSlider();
    }
    
    heroNext.addEventListener('click', nextSlide);
    heroPrev.addEventListener('click', prevSlide);
    
    // Auto slide change
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pause on hover
    const heroSlider = document.querySelector('.hero-slider');
    heroSlider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    heroSlider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
}

// Testimonials Slider
function initTestimonialsSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    const testimonialPrev = document.querySelector('.testimonial-prev');
    const testimonialNext = document.querySelector('.testimonial-next');
    
    let currentTestimonial = 0;
    
    function updateTestimonials() {
        testimonials.forEach((testimonial, index) => {
            testimonial.classList.toggle('active', index === currentTestimonial);
        });
    }
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        updateTestimonials();
    }
    
    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        updateTestimonials();
    }
    
    testimonialNext.addEventListener('click', nextTestimonial);
    testimonialPrev.addEventListener('click', prevTestimonial);
    
    // Auto testimonial change
    setInterval(nextTestimonial, 8000);
}

// Quick View Modal
document.addEventListener('DOMContentLoaded', function() {
    const quickViewButtons = document.querySelectorAll('.quick-view');
    const quickViewModal = document.getElementById('quickViewModal');
    const quickViewContent = document.getElementById('quickViewContent');
    const modalClose = document.querySelector('.modal-close');
    
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product');
            // In a real implementation, you would fetch product details based on productId
            // For this example, we'll use mock data
            const productData = getProductData(productId);
            
            quickViewContent.innerHTML = `
                <div class="quick-view-product">
                    <div class="quick-view-images">
                        <div class="main-image">
                            <img src="${productData.image}" alt="${productData.name}">
                        </div>
                    </div>
                    <div class="quick-view-details">
                        <h2>${productData.name}</h2>
                        <div class="price">${productData.price}</div>
                        <div class="rating">
                            ${generateRatingStars(productData.rating)}
                            <span>(${productData.reviewCount} reviews)</span>
                        </div>
                        <p class="description">${productData.description}</p>
                        <div class="quantity-controls">
                            <label for="quantity">Quantity:</label>
                            <div class="quantity-input">
                                <button class="quantity-minus">-</button>
                                <input type="number" id="quantity" value="1" min="1">
                                <button class="quantity-plus">+</button>
                            </div>
                        </div>
                        <button class="btn btn-primary add-to-cart-modal" data-product="${productId}">Add to Cart</button>
                    </div>
                </div>
            `;
            
            quickViewModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Initialize quantity controls
            const quantityInput = document.getElementById('quantity');
            const quantityMinus = document.querySelector('.quantity-minus');
            const quantityPlus = document.querySelector('.quantity-plus');
            
            quantityMinus.addEventListener('click', () => {
                if (parseInt(quantityInput.value) > 1) {
                    quantityInput.value = parseInt(quantityInput.value) - 1;
                }
            });
            
            quantityPlus.addEventListener('click', () => {
                quantityInput.value = parseInt(quantityInput.value) + 1;
            });
            
            // Add to cart from modal
            document.querySelector('.add-to-cart-modal').addEventListener('click', function() {
                const productId = this.getAttribute('data-product');
                const quantity = parseInt(quantityInput.value);
                
                // In a real implementation, you would add to cart with quantity
                let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
                cartCount += quantity;
                localStorage.setItem('cartCount', cartCount);
                document.getElementById('cartCount').textContent = cartCount;
                
              
                quickViewModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        });
    });
    
    modalClose.addEventListener('click', function() {
        quickViewModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === quickViewModal) {
            quickViewModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});




// Mock product data for quick view
function getProductData(productId) {
    const products = {
    '1': {
        name: 'Bridgeland Market Gift Card',
        price: '$5.00 – $200.00',
        image: '/assets/product-gift-card.jpg',
        description: 'The perfect gift for any occasion! Our gift cards can be used for any product in our store and never expire. Choose any amount between $5 and $200. Delivered instantly via email or as a physical card.',
        rating: 5,
        reviewCount: 47
    },
    '2': {
        name: 'Blooms of the Month',
        price: '$150.00 – $381.00',
        image: '/assets/product-blooms-subscription.jpg',
        description: 'A recurring floral delight! Receive beautiful, seasonal arrangements delivered monthly. Perfect for birthdays, anniversaries, or just because. Choose from 3, 6, or 12-month subscriptions.',
        rating: 4.5,
        reviewCount: 32,
        badge: 'Popular'
    },
    '3': {
        name: 'Cheese of the Month',
        price: '$60.00 – $940.20',
        image: '/assets/product-cheese-subscription.jpg',
        description: 'A curated selection of artisanal cheeses delivered monthly. Discover new flavors from local and international producers. Includes pairing suggestions and tasting notes.',
        rating: 5,
        reviewCount: 41,
        badge: 'Bestseller'
    },
    '4': {
        name: 'The Jewel Merchant\'s Window',
        price: '$65.00 – $500.00',
        image: '/assets/product-jewel-merchant.png',
        description: 'An exquisite floral arrangement inspired by vintage jewelry displays. Features premium blooms in rich jewel tones arranged in a luxurious keepsake container.',
        rating: 4.5,
        reviewCount: 22,
        badge: 'Limited'
    },
    '5': {
        name: 'Kitchen Window Light',
        price: '$65.00 – $500.00',
        image: '/assets/product-kitchen-window.png',
        description: 'Brighten any kitchen with this cheerful arrangement of seasonal flowers. Designed to bring natural beauty to your cooking space with fresh, fragrant blooms.',
        rating: 4,
        reviewCount: 19
    },
    '6': {
        name: 'Powder Room Bouquet',
        price: '$65.00 – $500.00',
        image: '/assets/product-powder-room.png',
        description: 'A sophisticated compact floral arrangement perfect for powder rooms and small spaces. Features elegant blooms with subtle fragrance in a stylish vase.',
        rating: 4.5,
        reviewCount: 15
    },
    '7': {
        name: 'Petals & Perks',
        price: '$59.99',
        image: '/assets/product-petals-perks.png',
        description: 'A floral arrangement paired with gourmet chocolates and a luxury candle. The perfect gift combining beautiful blooms with indulgent treats for complete pampering.',
        rating: 4,
        reviewCount: 18
    },
    '8': {
        name: 'Little Cheese',
        price: '$64.99',
        image: '/assets/product-little-cheese.jpg',
        description: 'Our popular cheese box featuring three premium artisanal cheeses, gourmet crackers, and local honey. Perfect for intimate gatherings or as a gourmet gift.',
        rating: 5,
        reviewCount: 31,
        badge: 'New'
    },
    '9': {
        name: 'Big Cheese',
        price: '$99.99',
        image: '/assets/product-big-cheese-box.jpg',
        description: 'The ultimate cheese experience! Five premium cheeses, artisanal crackers, and specialty accompaniments. Perfect for entertaining or as an impressive gift.',
        rating: 4.5,
        reviewCount: 24,
        badge: 'Bestseller'
    },
    '10': {
        name: 'Aquarius',
        price: '$100.00 – $300.00',
        image: '/assets/product-aquarius.png',
        description: 'Zodiac-inspired floral arrangement featuring cool tones and unique blooms to match the Aquarius personality. Includes a personalized zodiac message card.',
        rating: 4,
        reviewCount: 12,
        badge: 'Zodiac'
    },
    '11': {
        name: 'Aries',
        price: '$100.00 – $300.00',
        image: '/assets/product-aries.png',
        description: 'Bold and vibrant Aries-themed arrangement with fiery reds and dramatic blooms. Perfect for the passionate Aries in your life. Includes zodiac personality card.',
        rating: 4.5,
        reviewCount: 14,
        badge: 'Zodiac'
    },
    '12': {
        name: 'A Dozen Roses',
        price: '$120.00',
        image: '/assets/product-dozen-roses.png',
        description: 'Classic long-stemmed roses in your choice of color. Arranged with greenery and delivered in a premium keepsake vase. Timeless elegance for any occasion.',
        rating: 5,
        reviewCount: 37,
        badge: 'Classic'
    },
    '13': {
        name: 'The Entertainer Basket',
        price: '$89.00',
        image: '/assets/product-dozen-roses.jpg',
        description: 'Everything you need for effortless entertaining! Premium crackers, artisanal cheeses, gourmet spreads, and more. Perfect for hosting or as a generous gift.',
        rating: 5,
        reviewCount: 28,
        badge: 'Classic'
    },
    '14': {
        name: 'Cocktails & Dreams',
        price: '$94.00',
        image: '/assets/cocktails-and-dreams.jpg',
        description: 'A complete cocktail-making kit with premium spirits, mixers, and gourmet snacks. Choose between whiskey, gin, or vodka themed baskets for the perfect gift.',
        rating: 5,
        reviewCount: 19,
        badge: 'Classic'
    },
    '15': {
        name: 'Family Snacking Basket',
        price: '$120.00',
        image: '/assets/family-snacking-basket.png',
        description: 'A crowd-pleasing assortment of sweet and savory snacks for the whole family. Includes gourmet popcorn, artisanal chips, premium chocolates and more.',
        rating: 5,
        reviewCount: 23,
        badge: 'Classic'
    }
};
    
    return products[productId] || products['1'];
}

function generateRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';
    
    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i === fullStars + 1 && hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    
    return stars;
}

// Newsletter Form Submission
document.getElementById('newsletterForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    
    // In a real implementation, you would send this to your server
    alert(`Thank you for subscribing with ${email}! You'll hear from us soon.`);
    this.reset();
});
















  // Initialize cart from localStorage
    document.addEventListener('DOMContentLoaded', function() {
        // Initialize cart if it doesn't exist
        if (!localStorage.getItem('cart')) {
            localStorage.setItem('cart', JSON.stringify([]));
        }
        
        // Update cart count display
        updateCartCount();
        
        // Check cookies consent
        if (!localStorage.getItem('cookiesAccepted')) {
            document.getElementById('cookieConsent').style.display = 'block';
        }
        
        // Initialize filters
        initShopFilters();
    });
    
    // Cookies consent
    document.getElementById('acceptCookies').addEventListener('click', function() {
        localStorage.setItem('cookiesAccepted', 'true');
        document.getElementById('cookieConsent').style.display = 'none';
    });
    
    document.getElementById('declineCookies').addEventListener('click', function() {
        document.getElementById('cookieConsent').style.display = 'none';
    });
    
    // Function to update cart count display
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart'));
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        document.getElementById('cartCount').textContent = totalItems;
    }
    
    // Add to cart functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product');
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3 a').textContent;
            const productPrice = parseFloat(productCard.querySelector('.product-price').textContent.replace(/[^0-9.]/g, ''));
            const productImage = productCard.querySelector('img').src;
            
            // Get current cart
            const cart = JSON.parse(localStorage.getItem('cart'));
            
            // Check if product already exists in cart
            const existingProductIndex = cart.findIndex(item => item.id === productId);
            
            if (existingProductIndex >= 0) {
                // Increment quantity if product exists
                cart[existingProductIndex].quantity += 1;
            } else {
                // Add new product to cart
                cart.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    quantity: 1
                });
            }
            
            // Save updated cart
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Update cart count display
            updateCartCount();
            
            
        });
    });
    
    // Shop filters functionality (unchanged)
    function initShopFilters() {
        const filterToggles = document.querySelectorAll('.filter-toggle');
        
        filterToggles.forEach(toggle => {
            toggle.addEventListener('click', function() {
                const dropdown = this.nextElementSibling;
                const icon = this.querySelector('i');
                
                dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
                icon.classList.toggle('fa-chevron-down');
                icon.classList.toggle('fa-chevron-up');
            });
        });
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.filter-group')) {
                document.querySelectorAll('.filter-dropdown').forEach(dropdown => {
                    dropdown.style.display = 'none';
                    const icon = dropdown.previousElementSibling.querySelector('i');
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                });
            }
        });
        
        // Filter products based on selections
        const filterOptions = document.querySelectorAll('.filter-option input');
        filterOptions.forEach(option => {
            option.addEventListener('change', filterProducts);
        });
        
        function filterProducts() {
            const selectedCategories = Array.from(document.querySelectorAll('.filter-dropdown input[type="checkbox"]:checked'))
                .map(checkbox => checkbox.id.replace('category-', ''));
            
            const selectedPrices = Array.from(document.querySelectorAll('.filter-dropdown input[type="checkbox"]:checked'))
                .filter(checkbox => checkbox.id.startsWith('price-'))
                .map(checkbox => checkbox.id.replace('price-', ''));
            
            const products = document.querySelectorAll('.product-card');
            
            products.forEach(product => {
                const productCategory = product.getAttribute('data-category');
                const productPrice = parseFloat(product.getAttribute('data-price'));
                
                // Check category filter
                const categoryMatch = selectedCategories.length === 0 || 
                    selectedCategories.includes(productCategory.replace('-', ''));
                
                // Check price filter
                let priceMatch = selectedPrices.length === 0;
                
                if (!priceMatch) {
                    for (const priceRange of selectedPrices) {
                        if (priceRange === 'under50' && productPrice < 50) {
                            priceMatch = true;
                            break;
                        } else if (priceRange === '50-100' && productPrice >= 50 && productPrice <= 100) {
                            priceMatch = true;
                            break;
                        } else if (priceRange === '100-150' && productPrice > 100 && productPrice <= 150) {
                            priceMatch = true;
                            break;
                        } else if (priceRange === 'over150' && productPrice > 150) {
                            priceMatch = true;
                            break;
                        }
                    }
                }
                
                // Show/hide product based on filters
                if (categoryMatch && priceMatch) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        }
    }