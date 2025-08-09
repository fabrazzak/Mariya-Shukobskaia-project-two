document.addEventListener('DOMContentLoaded', function() {
    // View options toggle
    const viewOptions = document.querySelectorAll('.view-option');
    const productsGrid = document.querySelector('.products-grid');
    
    viewOptions.forEach(option => {
        option.addEventListener('click', function() {
            viewOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            if (this.getAttribute('data-view') === 'list') {
                productsGrid.classList.add('list-view');
            } else {
                productsGrid.classList.remove('list-view');
            }
        });
    });
    
    // Price range slider (using jQuery UI for demo)
    if (document.getElementById('price-range')) {
        $('#price-range').slider({
            range: true,
            min: 0,
            max: 10000,
            values: [1000, 8000],
            slide: function(event, ui) {
                $('#min-price').val('$ ' + ui.values[0]);
                $('#max-price').val('$ ' + ui.values[1]);
            }
        });
        
        $('#min-price').val('$ ' + $('#price-range').slider('values', 0));
        $('#max-price').val('$ ' + $('#price-range').slider('values', 1));
    }
    
    // Sort functionality
    const sortSelect = document.querySelector('.sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            // In a real app, this would sort the products
            console.log('Sort by:', this.value);
        });
    }
    
    // Filter functionality
    const filterBtn = document.querySelector('.filter-btn');
    if (filterBtn) {
        filterBtn.addEventListener('click', function() {
            // In a real app, this would filter the products
            console.log('Filter products');
        });
    }
    
    // Quick view functionality
    const quickViewBtns = document.querySelectorAll('.quick-view');
    const quickViewModal = document.getElementById('quickViewModal');
    const modalClose = document.querySelector('.modal-close');
    
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const product = this.getAttribute('data-product');
            // In a real implementation, you would fetch product details here
            // For demo, we'll just show the modal with sample content
            const quickViewContent = document.querySelector('.quick-view-content');
            quickViewContent.innerHTML = `
                <div class="product-images">
                    <div class="main-image">
                        <img src="../images/product-${product}.jpg" alt="${product}">
                    </div>
                    <div class="thumbnail-images">
                        <img src="../images/product-${product}-thumb1.jpg" alt="${product}">
                        <img src="../images/product-${product}-thumb2.jpg" alt="${product}">
                        <img src="../images/product-${product}-thumb3.jpg" alt="${product}">
                    </div>
                </div>
                <div class="product-details">
                    <h2>${this.closest('.product-card').querySelector('.product-title').textContent}</h2>
                    <div class="product-price">${this.closest('.product-card').querySelector('.product-price').textContent}</div>
                    <div class="product-meta">
                        <div><span>Brand:</span> ${this.closest('.product-card').querySelector('.product-brand').textContent}</div>
                        <div class="availability in-stock">In Stock</div>
                    </div>
                    <div class="product-description">
                        <p>This is a detailed description of the product that would appear in the quick view modal. It would include all the features and details about the product.</p>
                    </div>
                    <div class="product-actions">
                        <div class="quantity-selector">
                            <button class="quantity-btn minus">-</button>
                            <input type="number" value="1" min="1" class="quantity-input">
                            <button class="quantity-btn plus">+</button>
                        </div>
                        <button class="btn btn-primary add-to-cart" data-product-id="${product}">Add to Cart</button>
                        <button class="btn btn-outline add-to-wishlist"><i class="far fa-heart"></i> Add to Wishlist</button>
                    </div>
                    <div class="product-share">
                        <span>Share:</span>
                        <a href="javascript:void(0)"><i class="fab fa-facebook-f"></i></a>
                        <a href="javascript:void(0)"><i class="fab fa-twitter"></i></a>
                        <a href="javascript:void(0)"><i class="fab fa-pinterest"></i></a>
                    </div>
                </div>
            `;
            
            quickViewModal.classList.add('active');
            
            // Add event listeners for the quantity selector in the modal
            const minusBtn = quickViewContent.querySelector('.quantity-btn.minus');
            const plusBtn = quickViewContent.querySelector('.quantity-btn.plus');
            const quantityInput = quickViewContent.querySelector('.quantity-input');
            
            minusBtn.addEventListener('click', function() {
                if (parseInt(quantityInput.value) > 1) {
                    quantityInput.value = parseInt(quantityInput.value) - 1;
                }
            });
            
            plusBtn.addEventListener('click', function() {
                quantityInput.value = parseInt(quantityInput.value) + 1;
            });
            
            // Add to cart button in modal
            const addToCartBtn = quickViewContent.querySelector('.add-to-cart');
            addToCartBtn.addEventListener('click', function() {
                const productId = this.getAttribute('data-product-id');
                const quantity = parseInt(quantityInput.value);
                
                // Add to cart functionality would go here
                console.log(`Added ${quantity} of ${productId} to cart`);
                
                // Close modal after adding to cart
                quickViewModal.classList.remove('active');
            });
        });
    });
    
    modalClose.addEventListener('click', function() {
        quickViewModal.classList.remove('active');
    });
    
    quickViewModal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
        }
    });
});