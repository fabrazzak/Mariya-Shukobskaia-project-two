document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-times');
            this.querySelector('i').classList.toggle('fa-bars');
        });
    }
    
    // Add to Cart Functionality
    const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');
    const cartCount = document.querySelector('.cart-count');
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    // Update cart count on page load
    updateCartCount();
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            const productCard = this.closest('.product-card, .deal-card');
            
            // Get product details
            let productName, productPrice, productImage;
            
            if (productCard.classList.contains('product-card')) {
                productName = productCard.querySelector('h3').textContent;
                productPrice = productCard.querySelector('.price').textContent;
                productImage = productCard.querySelector('img') ? productCard.querySelector('img').src : '';
            } else {
                productName = productCard.querySelector('h3').textContent;
                productPrice = productCard.querySelector('.deal-price').textContent;
                productImage = '';
            }
            
            // Check if product already in cart
            const existingItem = cartItems.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cartItems.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    quantity: 1
                });
            }
            
            // Save to localStorage
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            
            // Update cart count
            updateCartCount();
            
            // Show added notification
            showNotification(`${productName} added to cart`);
        });
    });
    
    function updateCartCount() {
        if (cartCount) {
            const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    }
    
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Create notification style
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: var(--primary-color);
            color: white;
            padding: 12px 24px;
            border-radius: 4px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .notification.show {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
    
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
});

















document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                // In a real application, you would send the form data to your server here
                // For demo purposes, we'll simulate a successful submission
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';
                
                // Reset form after 5 seconds (for demo purposes)
                setTimeout(() => {
                    contactForm.reset();
                    contactForm.style.display = 'block';
                    formSuccess.style.display = 'none';
                }, 5000);
            }
        });
    }
    
    function validateForm() {
        let isValid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        
        // Reset errors
        document.querySelectorAll('.error-message').forEach(el => {
            el.style.display = 'none';
        });
        
        // Validate name
        if (!name.value) {
            document.getElementById('nameError').textContent = 'Please enter your name';
            document.getElementById('nameError').style.display = 'block';
            isValid = false;
        }
        
        // Validate email
        if (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            document.getElementById('emailError').textContent = 'Please enter a valid email address';
            document.getElementById('emailError').style.display = 'block';
            isValid = false;
        }
        
        // Validate subject
        if (!subject.value) {
            document.getElementById('subjectError').textContent = 'Please select a subject';
            document.getElementById('subjectError').style.display = 'block';
            isValid = false;
        }
        
        // Validate message
        if (!message.value) {
            document.getElementById('messageError').textContent = 'Please enter your message';
            document.getElementById('messageError').style.display = 'block';
            isValid = false;
        } else if (message.value.length < 10) {
            document.getElementById('messageError').textContent = 'Message must be at least 10 characters';
            document.getElementById('messageError').style.display = 'block';
            isValid = false;
        }
        
        return isValid;
    }
    
    // Update cart count on page load
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
});
















document.addEventListener('DOMContentLoaded', function() {
    // Flavor profile interactivity
    const flavorDots = document.querySelectorAll('.flavor-dot');
    const flavorDescs = document.querySelectorAll('.flavor-desc');
    
    flavorDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const flavor = this.getAttribute('data-flavor');
            
            // Remove active class from all
            flavorDots.forEach(d => d.classList.remove('active'));
            flavorDescs.forEach(d => d.classList.remove('active'));
            
            // Add active class to clicked
            this.classList.add('active');
            document.querySelector(`.flavor-desc[data-flavor="${flavor}"]`).classList.add('active');
        });
    });
    
    // Activate first flavor by default
    if (flavorDots.length > 0) {
        flavorDots[0].click();
    }
    
    // Recipe tabs functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Activate first tab by default
    if (tabButtons.length > 0) {
        tabButtons[0].click();
    }
});














document.addEventListener('DOMContentLoaded', function() {
    // Rotate aroma wheel on hover
    const aromaWheel = document.querySelector('.aroma-wheel');
    const wheelCategories = document.querySelectorAll('.wheel-category');
    
    wheelCategories.forEach(category => {
        category.addEventListener('mouseenter', function() {
            aromaWheel.style.transform = 'rotate(-5deg)';
            setTimeout(() => {
                aromaWheel.style.transform = 'rotate(5deg)';
            }, 100);
        });
        
        category.addEventListener('mouseleave', function() {
            aromaWheel.style.transform = 'rotate(0)';
        });
    });
    
    // Interactive rating system
    const ratingStars = document.querySelectorAll('.rating i');
    
    ratingStars.forEach(star => {
        star.addEventListener('click', function() {
            const ratingContainer = this.parentElement;
            const stars = ratingContainer.querySelectorAll('i');
            const clickedIndex = Array.from(stars).indexOf(this);
            
            stars.forEach((s, index) => {
                if (index <= clickedIndex) {
                    s.classList.remove('far');
                    s.classList.add('fas');
                } else {
                    s.classList.remove('fas');
                    s.classList.add('far');
                }
            });
        });
    });
    
    // Make intensity bars interactive
    const intensityBars = document.querySelectorAll('.intensity-level');
    
    intensityBars.forEach(bar => {
        bar.addEventListener('click', function() {
            const randomWidth = Math.floor(Math.random() * 100) + 1;
            this.style.width = randomWidth + '%';
        });
    });
});




document.addEventListener('DOMContentLoaded', function() {
    // Culture tabs functionality
    const tabButtons = document.querySelectorAll('.culture-tabs .tab-button');
    const tabContents = document.querySelectorAll('.culture-tabs .tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Activate first tab by default
    if (tabButtons.length > 0) {
        tabButtons[0].click();
    }
    
    // History quiz functionality
    const quizSubmit = document.getElementById('quiz-submit');
    const quizResults = document.getElementById('quiz-results');
    
    if (quizSubmit) {
        quizSubmit.addEventListener('click', function() {
            // Correct answers
            const answers = {
                q1: 'c', // Olmec
                q2: 'b', // Sugar
                q3: 'd'  // 1847
            };
            
            // Calculate score
            let score = 0;
            const questions = ['q1', 'q2', 'q3'];
            
            questions.forEach(q => {
                const selected = document.querySelector(`input[name="${q}"]:checked`);
                if (selected && selected.value === answers[q]) {
                    score++;
                }
            });
            
            // Display results
            quizResults.style.display = 'block';
            quizResults.innerHTML = `
                <h4>Your Score: ${score}/3</h4>
                <p>${score === 3 ? 'Perfect! You know your chocolate history.' : 
                   score >= 1 ? 'Good effort! Check the article for the answers.' : 
                   'Time to brush up on your chocolate knowledge!'}</p>
            `;
            
            // Scroll to results
            quizResults.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Animate timeline items as they come into view
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.1 });
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'all 0.5s ease';
        observer.observe(item);
    });
});