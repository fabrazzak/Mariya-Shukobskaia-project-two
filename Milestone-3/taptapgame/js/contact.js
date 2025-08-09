document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion Functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqCard = this.parentElement;
            faqCard.classList.toggle('active');
            
            // Close other open FAQs
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== this) {
                    otherQuestion.parentElement.classList.remove('active');
                }
            });
        });
    });
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to your server
            // For this example, we'll just show an alert
            alert(`Thank you for your message, ${name}! We'll get back to you soon.`);
            
            // Reset the form
            contactForm.reset();
        });
    }
});