document.addEventListener('DOMContentLoaded', function() {
    // Load cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const checkoutItems = document.getElementById('checkout-items');
    const sidebarSubtotal = document.getElementById('sidebar-subtotal');
    const sidebarTotal = document.getElementById('sidebar-total');
    const reviewSubtotal = document.getElementById('review-subtotal');
    const reviewShipping = document.getElementById('review-shipping-cost');
    const reviewTax = document.getElementById('review-tax');
    const reviewTotal = document.getElementById('review-total');
    const cartCount = document.getElementById('cart-count');
    
    // Tab functionality
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update active content
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // Navigation between tabs
    document.getElementById('continue-to-payment').addEventListener('click', function(e) {
        e.preventDefault();
        
        // Validate shipping form (simplified for demo)
        const shippingValid = validateShippingForm();
        
        if (shippingValid) {
            // Switch to payment tab
            switchTab('payment');
            
            // Update review section with shipping info
            updateReviewShipping();
        }
    });
    
    document.getElementById('back-to-shipping').addEventListener('click', function(e) {
        e.preventDefault();
        switchTab('shipping');
    });
    
    document.getElementById('continue-to-review').addEventListener('click', function(e) {
        e.preventDefault();
        
        // Validate payment form (simplified for demo)
        const paymentValid = validatePaymentForm();
        
        if (paymentValid) {
            // Switch to review tab
            switchTab('review');
            
            // Update review section with payment info
            updateReviewPayment();
            
            // Calculate and display totals
            updateOrderTotals();
        }
    });
    
    document.getElementById('back-to-payment').addEventListener('click', function(e) {
        e.preventDefault();
        switchTab('payment');
    });
    
    // Edit buttons in review tab
    document.getElementById('edit-shipping').addEventListener('click', function(e) {
        e.preventDefault();
        switchTab('shipping');
    });
    
    document.getElementById('edit-payment').addEventListener('click', function(e) {
        e.preventDefault();
        switchTab('payment');
    });
    
    // Switch tab function
    function switchTab(tabId) {
        tabs.forEach(t => t.classList.remove('active'));
        document.querySelector(`.tab[data-tab="${tabId}"]`).classList.add('active');
        
        tabContents.forEach(content => content.classList.remove('active'));
        document.getElementById(`${tabId}-tab`).classList.add('active');
    }
    
    // Validate shipping form
    function validateShippingForm() {
        const requiredFields = [
            'email', 'first-name', 'last-name', 
            'address', 'city', 'country', 
            'province', 'postal-code', 'phone'
        ];
        
        let isValid = true;
        
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!field.value.trim()) {
                field.style.borderColor = 'var(--error-color)';
                isValid = false;
            } else {
                field.style.borderColor = '#ddd';
            }
        });
        
        if (!isValid) {
            alert('Please fill in all required fields');
        }
        
        return isValid;
    }
    
    // Validate payment form
    function validatePaymentForm() {
        const paymentMethod = document.querySelector('input[name="payment-method"]:checked');
        
        if (!paymentMethod) {
            alert('Please select a payment method');
            return false;
        }
        
        if (paymentMethod.id === 'credit-card') {
            const cardFields = ['card-number', 'card-name', 'card-expiry', 'card-cvv'];
            let isValid = true;
            
            cardFields.forEach(fieldId => {
                const field = document.getElementById(fieldId);
                if (!field.value.trim()) {
                    field.style.borderColor = 'var(--error-color)';
                    isValid = false;
                } else {
                    field.style.borderColor = '#ddd';
                }
            });
            
            if (!isValid) {
                alert('Please fill in all credit card details');
                return false;
            }
        }
        
        return true;
    }
    
    // Update review shipping info
    function updateReviewShipping() {
        const reviewShipping = document.getElementById('review-shipping');
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const address = document.getElementById('address').value;
        const apartment = document.getElementById('apartment').value;
        const city = document.getElementById('city').value;
        const country = document.getElementById('country').value;
        const province = document.getElementById('province').value;
        const postalCode = document.getElementById('postal-code').value;
        const phone = document.getElementById('phone').value;
        
        let html = `
            <p><strong>${firstName} ${lastName}</strong></p>
            <p>${address}</p>
        `;
        
        if (apartment) {
            html += `<p>${apartment}</p>`;
        }
        
        html += `
            <p>${city}, ${province}, ${postalCode}</p>
            <p>${country}</p>
            <p>${phone}</p>
        `;
        
        reviewShipping.innerHTML = html;
    }
    
    // Update review payment info
    function updateReviewPayment() {
        const reviewPayment = document.getElementById('review-payment');
        const paymentMethod = document.querySelector('input[name="payment-method"]:checked');
        
        if (paymentMethod.id === 'credit-card') {
            const cardNumber = document.getElementById('card-number').value;
            const cardName = document.getElementById('card-name').value;
            
            reviewPayment.innerHTML = `
                <p><strong>Credit Card</strong></p>
                <p>${cardNumber.replace(/\d{12}/, '************')}</p>
                <p>${cardName}</p>
            `;
        } else {
            reviewPayment.innerHTML = `
                <p><strong>${paymentMethod.nextElementSibling.textContent.trim()}</strong></p>
            `;
        }
    }
    
    // Update order totals
    function updateOrderTotals() {
        // Calculate subtotal
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        
        // Calculate shipping (simplified for demo)
        const shipping = subtotal > 5000 ? 0 : 500; // Free shipping over 5000
        
        // Calculate tax (simplified for demo)
        const tax = subtotal * 0.05; // 5% tax
        
        // Calculate total
        const total = subtotal + shipping + tax;
        
        // Update display
        reviewSubtotal.textContent = `$ ${subtotal.toFixed(2)}`;
        reviewShipping.textContent = `$ ${shipping.toFixed(2)}`;
        reviewTax.textContent = `$ ${tax.toFixed(2)}`;
        reviewTotal.textContent = `$ ${total.toFixed(2)}`;
    }
    
    // Payment method selection
    const paymentMethods = document.querySelectorAll('.payment-method input');
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            document.querySelectorAll('.payment-method').forEach(pm => {
                pm.classList.remove('active');
            });
            
            if (this.checked) {
                this.closest('.payment-method').classList.add('active');
            }
        });
    });
    
    // Display order items in sidebar
    function displayOrderItems() {
        checkoutItems.innerHTML = '';
        
        if (cart.length === 0) {
            // If cart is empty, redirect to shop
            window.location.href = '/shop/';
            return;
        }
        
        let subtotal = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            
            const itemElement = document.createElement('div');
            itemElement.className = 'order-item';
            itemElement.innerHTML = `
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}">
                    <span class="item-quantity">${item.quantity}</span>
                </div>
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <div class="item-price">$ ${item.price.toFixed(2)}</div>
                </div>
            `;
            checkoutItems.appendChild(itemElement);
        });
        
        // Update subtotal and total
        sidebarSubtotal.textContent = `$ ${subtotal.toFixed(2)}`;
        sidebarTotal.textContent = `$ ${subtotal.toFixed(2)}`;
    }
    
    // Initialize display
    displayOrderItems();
    updateCartCount();
    
    // Update cart count
    function updateCartCount() {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
    
    // Place order button
    document.getElementById('place-order').addEventListener('click', function(e) {
        e.preventDefault();
        
        // Validate terms checkbox
        if (!document.getElementById('terms-agree').checked) {
            alert('Please agree to the Terms of Service and Privacy Policy');
            return;
        }
        
        // In a real app, you would process the order here
        // For demo, we'll just show a confirmation
        
        // Get customer email for confirmation
        const email = document.getElementById('email').value;
        
        // Generate random order number
        const orderNumber = 'SENTI-' + Math.floor(100000 + Math.random() * 900000);
        
        // Show confirmation modal
        document.getElementById('confirmation-email').textContent = email;
        document.getElementById('order-number').textContent = orderNumber;
        document.getElementById('orderConfirmation').classList.add('active');
        
        // Clear cart
        localStorage.removeItem('cart');
        cart = [];
        updateCartCount();
    });
    
    // Modal close button
    document.querySelector('#orderConfirmation .modal-close').addEventListener('click', function() {
        document.getElementById('orderConfirmation').classList.remove('active');
    });
    
    // Close modal when clicking outside
    document.getElementById('orderConfirmation').addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
        }
    });
});