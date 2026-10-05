// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe the workshop activity, service cards, feature items, pricing cards, and testimonials
document.querySelectorAll('.personalizer, .service-card, .feature-item, .pricing-card, .testimonial-card').forEach(el => {
    observer.observe(el);
});

// Live workshop personalizer
const visitorName = document.querySelector('#visitor-name');
const visitorMessage = document.querySelector('#visitor-message');
const themeColor = document.querySelector('#theme-color');
const previewGreeting = document.querySelector('#preview-greeting');
const previewMessage = document.querySelector('#preview-message');
const preview = document.querySelector('#personalizer-preview');
const resetPersonalizer = document.querySelector('#reset-personalizer');

function updatePersonalizer() {
    const name = visitorName.value.trim();
    const message = visitorMessage.value.trim();
    previewGreeting.textContent = name ? `Hello, ${name}!` : 'Hello, visitor!';
    previewMessage.textContent = message || 'Welcome to my website hosted on Amazon EC2!';
    preview.style.background = `linear-gradient(135deg, ${themeColor.value}, #00d4ff)`;
}

if (visitorName && visitorMessage && themeColor && preview && resetPersonalizer) {
    [visitorName, visitorMessage, themeColor].forEach(input => {
        input.addEventListener('input', updatePersonalizer);
    });
    resetPersonalizer.addEventListener('click', () => {
        visitorName.value = '';
        visitorMessage.value = 'Welcome to my website hosted on Amazon EC2!';
        themeColor.value = '#0066ff';
        updatePersonalizer();
    });
}

// Contact form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Simple validation
        if (name && email && message) {
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            this.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// Add active state to navigation based on scroll position
window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary-color)';
            link.style.fontWeight = '600';
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', function () {
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
});

// Counter animation for stats
function animateCounter(element, target, duration = 1500) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statItems = document.querySelectorAll('.stat-item h3');
            statItems.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                if (!isNaN(number)) {
                    animateCounter(stat, number);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Add button click feedback
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function () {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});

// Mobile menu toggle (for future enhancement)
console.log('CloudHost website loaded successfully!');
