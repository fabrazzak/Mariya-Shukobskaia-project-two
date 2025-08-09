document.addEventListener('DOMContentLoaded', function() {
    // Load cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartTable = document.getElementById('cart-table');
    const cartEmpty = document.getElementById('cart-empty');
    const cartItemsBody = document.getElementById('cart-items-body');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartTotal = document.getElementById('cart-total');
    const proceedCheckout = document.getElementById('proceed-checkout');
    const updateCartBtn = document.getElementById('update-cart');
    const cartCount = document.getElementById('cart-count');
    
    // Display cart items
    function displayCartItems() {
        if (cart.length === 0) {
            cartTable.style.display = 'none';
            cartEmpty.style.display = 'block';
            proceedCheckout.style.display = 'none';
        } else {
            cartTable.style.display = 'table';
            cartEmpty.style.display = 'none';
            proceedCheckout.style.display = 'block';
            
            cartItemsBody.innerHTML = '';
            let subtotal = 0;
            
            cart.forEach((item, index) => {
                const itemTotal = item.price * item.quantity;
                subtotal += itemTotal;
                
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="product-thumbnail">
                        <img src="${item.image}" alt="${item.name}">
                    </td>
                    <td class="product-name">${item.name}</td>
                    <td class="product-price">$ ${item.price.toFixed(2)}</td>
                    <td class="product-quantity">
                        <div class="quantity-selector">
                            <button class="quantity-btn minus" data-index="${index}">-</button>
                            <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-index="${index}">
                            <button class="quantity-btn plus" data-index="${index}">+</button>
                        </div>
                    </td>
                    <td class="product-subtotal">$ ${itemTotal.toFixed(2)}</td>
                    <td class="product-remove">
                        <button class="remove-item" data-index="${index}"><i class="fas fa-times"></i></button>
                    </td>
                `;
                cartItemsBody.appendChild(row);
            });
            
            // Update totals
            cartSubtotal.textContent = `$ ${subtotal.toFixed(2)}`;
            cartTotal.textContent = `$ ${subtotal.toFixed(2)}`; // In a real app, you'd add shipping and tax
            
            // Update cart count
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
    }
    
    // Initialize cart display
    displayCartItems();
    
    // Quantity change handlers
    cartItemsBody.addEventListener('click', function(e) {
        if (e.target.classList.contains('minus') || e.target.parentElement.classList.contains('minus')) {
            const index = e.target.getAttribute('data-index') || e.target.parentElement.getAttribute('data-index');
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
                localStorage.setItem('cart', JSON.stringify(cart));
                displayCartItems();
            }
        }
        
        if (e.target.classList.contains('plus') || e.target.parentElement.classList.contains('plus')) {
            const index = e.target.getAttribute('data-index') || e.target.parentElement.getAttribute('data-index');
            cart[index].quantity++;
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCartItems();
        }
        
        if (e.target.classList.contains('remove-item') || e.target.parentElement.classList.contains('remove-item')) {
            const index = e.target.getAttribute('data-index') || e.target.parentElement.getAttribute('data-index');
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCartItems();
            
            // Show removed feedback
            showFeedback('Item removed from cart');
        }
    });
    
    // Input quantity change
    cartItemsBody.addEventListener('change', function(e) {
        if (e.target.classList.contains('quantity-input')) {
            const index = e.target.getAttribute('data-index');
            const newQuantity = parseInt(e.target.value);
            
            if (newQuantity > 0) {
                cart[index].quantity = newQuantity;
                localStorage.setItem('cart', JSON.stringify(cart));
                displayCartItems();
            } else {
                e.target.value = cart[index].quantity;
            }
        }
    });
    
    // Update cart button
    updateCartBtn.addEventListener('click', function() {
        // In this implementation, quantities are updated in real-time
        // But we can add additional functionality here if needed
        showFeedback('Cart updated');
    });
    
    // Proceed to checkout button
    proceedCheckout.addEventListener('click', function() {
        // In a real app, you might validate cart here before proceeding
        window.location.href = '/checkout/';
    });
    
    // Show feedback message
    function showFeedback(message) {
        const feedback = document.createElement('div');
        feedback.className = 'cart-feedback';
        feedback.textContent = message;
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
    
    // Create cart feedback styles if not already present
    if (!document.getElementById('cart-feedback-style')) {
        const style = document.createElement('style');
        style.id = 'cart-feedback-style';
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
    }
});