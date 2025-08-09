// legal.js - Terms of Service Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                setTimeout(function() {
                    preloader.style.display = 'none';
                }, 500);
            }, 500);
        });
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a nav link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Table of Contents Navigation
    const tocLinks = document.querySelectorAll('.toc-list a');
    const termsSections = document.querySelectorAll('.terms-section');
    
    // Highlight current section in TOC while scrolling
    function highlightTOC() {
        let currentSection = '';
        
        termsSections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.pageYOffset >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });
        
        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Smooth scrolling for TOC links
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Update URL without page jump
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    location.hash = targetId;
                }
            }
        });
    });
    
    // Initialize highlight on page load
    highlightTOC();
    
    // Update highlight on scroll
    window.addEventListener('scroll', function() {
        highlightTOC();
    });

    // Back to Top Button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.classList.add('back-to-top');
    document.body.appendChild(backToTopBtn);
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });

    // Style active TOC link on page load based on hash
    if (window.location.hash) {
        const hash = window.location.hash;
        const targetLink = document.querySelector(`.toc-list a[href="${hash}"]`);
        if (targetLink) {
            tocLinks.forEach(link => link.classList.remove('active'));
            targetLink.classList.add('active');
        }
    }
});

// script.js - Shared JavaScript (included for completeness)
document.addEventListener('DOMContentLoaded', function() {
    // Sticky Header
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 100) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const mobileMenu = document.getElementById('mobile-menu');
        const navMenu = document.querySelector('.nav-menu');
        
        if (mobileMenu && navMenu && 
            !e.target.closest('.navbar') && 
            navMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});



// legal.js - Privacy Policy Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                setTimeout(function() {
                    preloader.style.display = 'none';
                }, 500);
            }, 500);
        });
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a nav link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Table of Contents Navigation
    const tocLinks = document.querySelectorAll('.toc-list a');
    const termsSections = document.querySelectorAll('.terms-section');
    
    // Highlight current section in TOC while scrolling
    function highlightTOC() {
        let currentSection = '';
        
        termsSections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.pageYOffset >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });
        
        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Smooth scrolling for TOC links
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Update URL without page jump
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    location.hash = targetId;
                }
            }
        });
    });
    
    // Initialize highlight on page load
    highlightTOC();
    
    // Update highlight on scroll
    window.addEventListener('scroll', function() {
        highlightTOC();
    });

    // Back to Top Button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.classList.add('back-to-top');
    document.body.appendChild(backToTopBtn);
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });

    // Style active TOC link on page load based on hash
    if (window.location.hash) {
        const hash = window.location.hash;
        const targetLink = document.querySelector(`.toc-list a[href="${hash}"]`);
        if (targetLink) {
            tocLinks.forEach(link => link.classList.remove('active'));
            targetLink.classList.add('active');
        }
    }
});