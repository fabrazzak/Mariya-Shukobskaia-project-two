document.addEventListener('DOMContentLoaded', function() {
    // Blog Filter Functionality
    const categoryFilter = document.getElementById('category-filter');
    const sortByFilter = document.getElementById('sort-by');
    const blogPosts = document.querySelectorAll('.blog-post-card');
    
    function filterAndSortPosts() {
        const selectedCategory = categoryFilter.value;
        const sortMethod = sortByFilter.value;
        
        // Filter posts by category
        blogPosts.forEach(post => {
            const postCategory = post.dataset.category;
            
            if (selectedCategory === 'all' || postCategory === selectedCategory) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        });
        
        // Convert NodeList to Array for sorting
        const postsArray = Array.from(blogPosts).filter(post => {
            return post.style.display !== 'none';
        });
        
        // Sort posts
        postsArray.sort((a, b) => {
            if (sortMethod === 'newest') {
                return new Date(b.dataset.date) - new Date(a.dataset.date);
            } else if (sortMethod === 'oldest') {
                return new Date(a.dataset.date) - new Date(b.dataset.date);
            } else if (sortMethod === 'popular') {
                return parseInt(b.dataset.views) - parseInt(a.dataset.views);
            }
            return 0;
        });
        
        // Re-append sorted posts to DOM
        const blogGrid = document.querySelector('.blog-grid');
        blogGrid.innerHTML = '';
        postsArray.forEach(post => {
            blogGrid.appendChild(post);
        });
    }
    
    // Event listeners for filters
    categoryFilter.addEventListener('change', filterAndSortPosts);
    sortByFilter.addEventListener('change', filterAndSortPosts);
    
    // Newsletter Form Submission
    const newsletterForm = document.getElementById('newsletterForm');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (email) {
            // Here you would typically send the email to your server
            // For this example, we'll just show an alert
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
        }
    });
    
    // Pagination functionality (simplified for demo)
    const pageLinks = document.querySelectorAll('.page-numbers a, .page-nav');
    
    pageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.classList.contains('active')) return;
            
            // Remove active class from all page numbers
            document.querySelectorAll('.page-numbers a').forEach(a => {
                a.classList.remove('active');
            });
            
            // Add active class to clicked page number
            if (!this.classList.contains('page-nav')) {
                this.classList.add('active');
            }
            
            // In a real implementation, you would load the new page content here
            // For this demo, we'll just scroll to the top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
});











document.addEventListener('DOMContentLoaded', function() {
    // Comparison slider functionality
    const comparisonSlider = document.querySelector('.comparison-slider');
    
    if (comparisonSlider) {
        let isDragging = false;
        const before = comparisonSlider.querySelector('.before');
        
        function handleMove(e) {
            if (!isDragging) return;
            
            let x = e.clientX || e.touches[0].clientX;
            const rect = comparisonSlider.getBoundingClientRect();
            x = x - rect.left;
            
            // Constrain to slider boundaries
            if (x < 0) x = 0;
            if (x > rect.width) x = rect.width;
            
            const percent = (x / rect.width) * 100;
            before.style.width = percent + '%';
        }
        
        comparisonSlider.addEventListener('mousedown', function() {
            isDragging = true;
        });
        
        comparisonSlider.addEventListener('touchstart', function() {
            isDragging = true;
        });
        
        document.addEventListener('mouseup', function() {
            isDragging = false;
        });
        
        document.addEventListener('touchend', function() {
            isDragging = false;
        });
        
        document.addEventListener('mousemove', handleMove);
        document.addEventListener('touchmove', handleMove);
        
        // Also make it work on click/tap
        comparisonSlider.addEventListener('click', function(e) {
            let x = e.clientX || e.touches[0].clientX;
            const rect = comparisonSlider.getBoundingClientRect();
            x = x - rect.left;
            
            // Constrain to slider boundaries
            if (x < 0) x = 0;
            if (x > rect.width) x = rect.width;
            
            const percent = (x / rect.width) * 100;
            before.style.width = percent + '%';
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // Here you would typically send the email to your server
                // For this example, we'll just show an alert
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            }
        });
    }
});








document.addEventListener('DOMContentLoaded', function() {
    // Initialize the score distribution chart
    const ctx = document.getElementById('scoreDistributionChart');
    
    if (ctx) {
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['0-500', '501-1000', '1001-1500', '1501-2000', '2001-2500', '2501-3000', '3000+'],
                datasets: [{
                    label: 'Number of Players',
                    data: [1250, 2840, 3120, 1980, 980, 420, 252],
                    backgroundColor: [
                        '#e84393',
                        '#fd79a8',
                        '#a29bfe',
                        '#6c5ce7',
                        '#00cec9',
                        '#00b894',
                        '#0984e3'
                    ],
                    borderColor: [
                        '#e84393',
                        '#fd79a8',
                        '#a29bfe',
                        '#6c5ce7',
                        '#00cec9',
                        '#00b894',
                        '#0984e3'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.parsed.y + ' players';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of Players'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Score Range'
                        }
                    }
                }
            }
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // Here you would typically send the email to your server
                // For this example, we'll just show an alert
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            }
        });
    }
});