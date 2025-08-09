document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mainNav.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuToggle.classList.remove('active');
            mainNav.classList.remove('active');
        });
    });
    
    // Set current year in footer
    const currentYear = new Date().getFullYear();
    document.getElementById('currentYear').textContent = currentYear;
    
    // Cookie Consent Banner
    const cookieBanner = document.getElementById('cookieConsent');
    const acceptCookies = document.getElementById('acceptCookies');
    
    if (!localStorage.getItem('cookiesAccepted')) {
        cookieBanner.style.display = 'block';
    }
    
    acceptCookies.addEventListener('click', function() {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieBanner.style.display = 'none';
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.main-header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    });
    
    // Testimonial slider
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
    }
    
    if (testimonials.length > 1) {
        showTestimonial(0);
        
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    } else if (testimonials.length === 1) {
        showTestimonial(0);
    }
    
    // Form validation would go here
});






// About Page Specific JS
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const animationDuration = 2000; // 2 seconds
    const frameDuration = 1000 / 60; // 60 frames per second
    const totalFrames = Math.round(animationDuration / frameDuration);
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        let frame = 0;
        
        const counter = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            const currentCount = Math.round(target * progress);
            
            stat.textContent = currentCount;
            
            if (frame === totalFrames) {
                clearInterval(counter);
            }
        }, frameDuration);
    });
}

// Initialize stats animation when scrolled to
const aboutIntro = document.querySelector('.about-intro');
if (aboutIntro) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(aboutIntro);
}










// Industries Page Tab Functionality
function initIndustryTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Show corresponding content
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
}

// Initialize tabs when page loads
document.addEventListener('DOMContentLoaded', function() {
    initIndustryTabs();
});









// Projects Page Filtering Functionality
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Show all projects if "all" is selected
            if (filterValue === 'all') {
                projectItems.forEach(item => {
                    item.style.display = 'block';
                });
                return;
            }
            
            // Filter projects based on category
            projectItems.forEach(item => {
                if (item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Initialize project filters when page loads
document.addEventListener('DOMContentLoaded', function() {
    initProjectFilters();
    
    // Initialize testimonial slider if it exists
    if (document.querySelector('.testimonial-slider')) {
        $('.testimonial-slider').slick({
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            adaptiveHeight: true,
            autoplay: true,
            autoplaySpeed: 5000
        });
    }
});












// Careers Page Functionality
function initJobFilters() {
    const departmentFilter = document.getElementById('department-filter');
    const locationFilter = document.getElementById('location-filter');
    const jobCards = document.querySelectorAll('.job-card');
    const noJobsMessage = document.querySelector('.no-jobs-message');
    const resetFiltersBtn = document.querySelector('.reset-filters');
    
    function filterJobs() {
        const departmentValue = departmentFilter.value;
        const locationValue = locationFilter.value;
        let visibleJobs = 0;
        
        jobCards.forEach(card => {
            const cardDept = card.getAttribute('data-department');
            const cardLocation = card.getAttribute('data-location');
            
            const deptMatch = departmentValue === 'all' || cardDept === departmentValue;
            const locationMatch = locationValue === 'all' || cardLocation === locationValue;
            
            if (deptMatch && locationMatch) {
                card.style.display = 'block';
                visibleJobs++;
            } else {
                card.style.display = 'none';
            }
        });
        
        if (visibleJobs === 0) {
            noJobsMessage.style.display = 'block';
        } else {
            noJobsMessage.style.display = 'none';
        }
    }
    
    departmentFilter.addEventListener('change', filterJobs);
    locationFilter.addEventListener('change', filterJobs);
    
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', function() {
            departmentFilter.value = 'all';
            locationFilter.value = 'all';
            filterJobs();
        });
    }
}

function initApplicationModal() {
    const applyButtons = document.querySelectorAll('.apply-btn');
    const modal = document.getElementById('applicationModal');
    const closeModal = document.querySelector('.close-modal');
    const positionTitle = document.getElementById('modalPositionTitle');
    const positionLocation = document.getElementById('modalPositionLocation');
    
    applyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.job-card');
            const title = card.querySelector('h3').textContent;
            const location = card.querySelector('.job-location').textContent;
            
            positionTitle.textContent = title;
            positionLocation.textContent = location;
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeModal.addEventListener('click', function() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Form submission
    const applicationForm = document.querySelector('.application-form');
    if (applicationForm) {
        applicationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically send the form data to your server
            alert('Application submitted successfully!');
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
            this.reset();
        });
    }
}

// Initialize careers page functionality
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.job-card')) {
        initJobFilters();
        initApplicationModal();
    }
});