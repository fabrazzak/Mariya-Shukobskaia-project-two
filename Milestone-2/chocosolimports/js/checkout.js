document.addEventListener('DOMContentLoaded', function() {
    // Load cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const summaryItems = document.getElementById('summaryItems');
    const subtotalElement = document.querySelector('.subtotal');
    const taxElement = document.querySelector('.tax');
    const totalElement = document.querySelector('.total-amount');
    const checkoutForm = document.getElementById('checkoutForm');
    const submitOrder = document.getElementById('submitOrder');
    
    // Render order summary
    renderOrderSummary();
    
    // Form submission
    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            processOrder();
        }
    });
    
    // Shipping method change
    document.querySelectorAll('input[name="shippingMethod"]').forEach(radio => {
        radio.addEventListener('change', function() {
            updateOrderSummary();
        });
    });
    
    function renderOrderSummary() {
        if (cartItems.length === 0) {
            window.location.href = '/cart/';
            return;
        }
        
        let html = '';
        let subtotal = 0;
        
        cartItems.forEach(item => {
            const price = parseFloat(item.price.replace('$', ''));
            const total = price * item.quantity;
            subtotal += total;
            
            html += `
                <div class="summary-item">
                    <div class="summary-item-info">
                        <div class="summary-item-name">${item.name}</div>
                        <div class="summary-item-qty">Qty: ${item.quantity}</div>
                    </div>
                    <div class="summary-item-price">$${total.toFixed(2)}</div>
                </div>
            `;
        });
        
        summaryItems.innerHTML = html;
        updateOrderSummary();
    }
    
    function updateOrderSummary() {
        const subtotal = cartItems.reduce((total, item) => {
            const price = parseFloat(item.price.replace('$', ''));
            return total + (price * item.quantity);
        }, 0);
        
        const shippingMethod = document.querySelector('input[name="shippingMethod"]:checked').value;
        const shippingCost = shippingMethod === 'express' ? 9.99 : 0;
        const tax = subtotal * 0.05; // 5% tax for example
        const total = subtotal + shippingCost + tax;
        
        subtotalElement.textContent = `$${subtotal.toFixed(2)} CAD`;
        taxElement.textContent = `$${tax.toFixed(2)} CAD`;
        document.querySelector('.shipping').textContent = shippingCost > 0 ? `$${shippingCost.toFixed(2)} CAD` : 'Free';
        totalElement.textContent = `$${total.toFixed(2)} CAD`;
    }
    
    function validateForm() {
        let isValid = true;
        const email = document.getElementById('email');
        const firstName = document.getElementById('firstName');
        const lastName = document.getElementById('lastName');
        const address = document.getElementById('address');
        const city = document.getElementById('city');
        const province = document.getElementById('province');
        const phone = document.getElementById('phone');
        
        // Reset errors
        document.querySelectorAll('.error-message').forEach(el => {
            el.style.display = 'none';
            el.textContent = '';
        });
        
        // Validate email
        if (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            document.getElementById('emailError').textContent = 'Please enter a valid email address';
            document.getElementById('emailError').style.display = 'block';
            isValid = false;
        }
        
        // Validate first name
        if (!firstName.value) {
            document.getElementById('firstNameError').textContent = 'Please enter your first name';
            document.getElementById('firstNameError').style.display = 'block';
            isValid = false;
        }
        
        // Validate last name
        if (!lastName.value) {
            document.getElementById('lastNameError').textContent = 'Please enter your last name';
            document.getElementById('lastNameError').style.display = 'block';
            isValid = false;
        }
        
        // Validate address
        if (!address.value) {
            document.getElementById('addressError').textContent = 'Please enter your street address';
            document.getElementById('addressError').style.display = 'block';
            isValid = false;
        }
        
        // Validate city
        if (!city.value) {
            document.getElementById('cityError').textContent = 'Please enter your city';
            document.getElementById('cityError').style.display = 'block';
            isValid = false;
        }
        
        // Validate province
        if (!province.value) {
            document.getElementById('provinceError').textContent = 'Please select your province';
            document.getElementById('provinceError').style.display = 'block';
            isValid = false;
        }
        
        // Validate phone
        if (!phone.value || !/^[\d\+\-\.\s\(\)]{10,}$/.test(phone.value)) {
            document.getElementById('phoneError').textContent = 'Please enter a valid phone number';
            document.getElementById('phoneError').style.display = 'block';
            isValid = false;
        }
        
        return isValid;
    }
    
    function processOrder() {
        submitOrder.disabled = true;
        submitOrder.textContent = 'Processing...';
        
        // Collect order data
        const orderData = {
            customer: {
                email: document.getElementById('email').value,
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                address: document.getElementById('address').value,
                address2: document.getElementById('address2').value,
                city: document.getElementById('city').value,
                province: document.getElementById('province').value,
                phone: document.getElementById('phone').value
            },
            items: cartItems,
            shippingMethod: document.querySelector('input[name="shippingMethod"]:checked').value,
            subtotal: parseFloat(subtotalElement.textContent.replace('$', '')),
            tax: parseFloat(taxElement.textContent.replace('$', '')),
            total: parseFloat(totalElement.textContent.replace('$', ''))
        };
        
        // In a real application, you would send orderData to your server here
        console.log('Order data:', orderData);
        
        // Simulate order processing
        setTimeout(() => {
            // Clear cart
            localStorage.removeItem('cartItems');
            
            // Update cart count
            const cartCount = document.querySelector('.cart-count');
            if (cartCount) {
                cartCount.style.display = 'none';
            }
            
            // Redirect to confirmation page
            window.location.href = '/shop';
        }, 1500);
    }
    
    // Update cart count on page load
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
});