document.addEventListener('DOMContentLoaded', function() {
    // Game Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const gameCards = document.querySelectorAll('.game-card');
    const gameSearch = document.getElementById('game-search');
    
    // Filter by category
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter games
            gameCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Search functionality
    gameSearch.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        gameCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('.game-description').textContent.toLowerCase();
            const category = card.querySelector('.game-category').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm) || category.includes(searchTerm)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
    
    // Make game cards equal height
    function equalizeCardHeights() {
        let maxHeight = 0;
        const cards = document.querySelectorAll('.game-card');
        
        // Reset heights
        cards.forEach(card => {
            card.style.height = 'auto';
        });
        
        // Find max height
        cards.forEach(card => {
            if (card.offsetHeight > maxHeight) {
                maxHeight = card.offsetHeight;
            }
        });
        
        // Apply max height
        cards.forEach(card => {
            card.style.height = maxHeight + 'px';
        });
    }
    
    // Run on load and resize
    window.addEventListener('load', equalizeCardHeights);
    window.addEventListener('resize', equalizeCardHeights);
    
    // Initialize with all games showing
    filterButtons[0].click();
});