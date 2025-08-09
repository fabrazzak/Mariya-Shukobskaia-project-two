document.addEventListener('DOMContentLoaded', function() {
    // Load cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemsContainer = document.getElementById('cartItems');
    const cartCount = document.querySelector('.cart-count');
    const subtotalElement = document.querySelector('.subtotal');
    const taxElement = document.querySelector('.tax');
    const totalElement = document.querySelector('.total-amount');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const emptyCart = document.querySelector('.empty-cart');
    const frequentlyBought = document.getElementById('frequentlyBought');
    
    // Render cart items
    renderCartItems();
    
    // Update cart count
    updateCartCount();
    
    // Checkout button event
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function(e) {
            if (cartItems.length === 0) {
                e.preventDefault();
                showNotification('Your cart is empty');
            }
        });
    }
    
    function renderCartItems() {
        if (cartItems.length === 0) {
            emptyCart.style.display = 'block';
            frequentlyBought.style.display = 'none';
            checkoutBtn.style.opacity = '0.5';
            checkoutBtn.style.cursor = 'not-allowed';
            return;
        }
        
        emptyCart.style.display = 'none';
        frequentlyBought.style.display = 'block';
        checkoutBtn.style.opacity = '1';
        checkoutBtn.style.cursor = 'pointer';
        
        let subtotal = 0;
        let html = '';
        
        cartItems.forEach((item, index) => {
            const price = parseFloat(item.price.replace('$', ''));
            const total = price * item.quantity;
            subtotal += total;
            
            html += `
                <div class="cart-item" data-product-id="${item.id}">
                    <div class="cart-item-image">
                        ${item.image ? `<img src="${item.image}" alt="${item.name}">` : '<div class="no-image"><i class="fas fa-cookie"></i></div>'}
                    </div>
                    <div class="cart-item-details">
                        <h4 class="cart-item-title">${item.name}</h4>
                        <div class="cart-item-price">${item.price}</div>
                        <div class="cart-item-actions">
                            <button class="cart-item-remove" data-index="${index}">Remove</button>
                        </div>
                    </div>
                    <div class="cart-item-total">
                        <div class="cart-item-total-price">$${total.toFixed(2)} CAD</div>
                        <div class="cart-item-quantity">
                            <button class="quantity-decrease" data-index="${index}">-</button>
                            <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-index="${index}">
                            <button class="quantity-increase" data-index="${index}">+</button>
                        </div>
                    </div>
                </div>
            `;
        });
        
        cartItemsContainer.innerHTML = html;
        
        // Calculate totals
        const tax = subtotal * 0.05; // 5% tax for example
        const total = subtotal + tax;
        
        subtotalElement.textContent = `$${subtotal.toFixed(2)} CAD`;
        taxElement.textContent = `$${tax.toFixed(2)} CAD`;
        totalElement.textContent = `$${total.toFixed(2)} CAD`;
        
        // Add event listeners to dynamic elements
        document.querySelectorAll('.cart-item-remove').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                removeItem(index);
            });
        });
        
        document.querySelectorAll('.quantity-decrease').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                updateQuantity(index, -1);
            });
        });
        
        document.querySelectorAll('.quantity-increase').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                updateQuantity(index, 1);
            });
        });
        
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', function() {
                const index = this.getAttribute('data-index');
                const newQuantity = parseInt(this.value);
                
                if (newQuantity > 0) {
                    updateQuantity(index, 0, newQuantity);
                } else {
                    this.value = cartItems[index].quantity;
                }
            });
        });
    }
    
    function removeItem(index) {
        cartItems.splice(index, 1);
        saveCart();
        renderCartItems();
        updateCartCount();
        showNotification('Item removed from cart');
    }
    
    function updateQuantity(index, change, newQuantity = null) {
        if (newQuantity !== null) {
            cartItems[index].quantity = newQuantity;
        } else {
            cartItems[index].quantity += change;
            
            // Ensure quantity doesn't go below 1
            if (cartItems[index].quantity < 1) {
                cartItems[index].quantity = 1;
            }
        }
        
        saveCart();
        renderCartItems();
        updateCartCount();
    }
    
    function saveCart() {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
    
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
    
    // Add to cart buttons in "Frequently Bought Together"
    document.querySelectorAll('.btn-add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            const productCard = this.closest('.product-card');
            
            // Get product details
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.price').textContent;
            const productImage = productCard.querySelector('img') ? productCard.querySelector('img').src : '';
            
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
            saveCart();
            
            // Update cart
            renderCartItems();
            updateCartCount();
            
            // Show notification
            showNotification(`${productName} added to cart`);
        });
    });
});