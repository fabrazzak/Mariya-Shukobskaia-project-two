document.addEventListener('DOMContentLoaded', function() {
    // Mobile filter toggle
    const filterToggle = document.getElementById('filterToggle');
    const filterDropdown = document.getElementById('filterDropdown');
    
    if (filterToggle && filterDropdown) {
        filterToggle.addEventListener('click', function() {
            filterDropdown.classList.toggle('active');
        });
        
        // Close when clicking outside
        document.addEventListener('click', function(e) {
            if (!filterToggle.contains(e.target) && !filterDropdown.contains(e.target)) {
                filterDropdown.classList.remove('active');
            }
        });
    }
    
    // Product filtering
    const applyFilters = document.getElementById('applyFilters');
    const resetFilters = document.getElementById('resetFilters');
    const productsGrid = document.getElementById('productsGrid');
    const products = productsGrid.querySelectorAll('.product-card');
    
    if (applyFilters && resetFilters) {
        applyFilters.addEventListener('click', function() {
            filterProducts();
            filterDropdown.classList.remove('active');
        });
        
        resetFilters.addEventListener('click', function() {
            // Reset all checkboxes
            document.querySelectorAll('.filter-list input[type="checkbox"]').forEach(checkbox => {
                checkbox.checked = true;
            });
            
            // Reset sorting
            document.getElementById('sortProducts').value = 'featured';
            
            // Show all products
            products.forEach(product => {
                product.style.display = 'block';
            });
            
            filterDropdown.classList.remove('active');
        });
    }
    
    // Sorting functionality
    const sortSelect = document.getElementById('sortProducts');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            sortProducts();
        });
    }
    
    function filterProducts() {
        // Get selected categories
        const selectedCategories = [];
        document.querySelectorAll('#filterDropdown input[type="checkbox"]:checked').forEach(checkbox => {
            selectedCategories.push(checkbox.id.replace('filter-', ''));
        });
        
        // Filter products
        products.forEach(product => {
            const productCategory = product.getAttribute('data-category').replace('-', ' ');
            const productCacao = product.getAttribute('data-cacao');
            
            const categoryMatch = selectedCategories.some(cat => 
                productCategory.includes(cat) || productCacao.includes(cat)
            );
            
            if (categoryMatch) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }
    
    function sortProducts() {
        const sortValue = sortSelect.value;
        const productsArray = Array.from(products);
        
        productsArray.sort((a, b) => {
            const aPrice = parseFloat(a.querySelector('.price').textContent.replace('$', ''));
            const bPrice = parseFloat(b.querySelector('.price').textContent.replace('$', ''));
            const aName = a.querySelector('h3').textContent;
            const bName = b.querySelector('h3').textContent;
            
            switch(sortValue) {
                case 'price-asc':
                    return aPrice - bPrice;
                case 'price-desc':
                    return bPrice - aPrice;
                case 'name-asc':
                    return aName.localeCompare(bName);
                case 'name-desc':
                    return bName.localeCompare(aName);
                default:
                    return 0; // Featured (original order)
            }
        });
        
        // Re-append products in new order
        productsArray.forEach(product => {
            productsGrid.appendChild(product);
        });
    }
    
    // Sold out products
    const soldOutButtons = document.querySelectorAll('.btn-disabled');
    soldOutButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('This product is currently out of stock');
        });
    });
    
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
});