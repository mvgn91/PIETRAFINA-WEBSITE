// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (header && window.scrollY > 100) {
        header.classList.add('scrolled');
    } else if (header) {
        header.classList.remove('scrolled');
    }
});

// Hero slideshow
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.hero-slide');
const indicators = document.querySelectorAll('.indicator');

function showSlide(index) {
    if (slides.length === 0) return;
    
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (indicators[i]) indicators[i].classList.remove('active');
    });
    
    slides[index].classList.add('active');
    if (indicators[index]) indicators[index].classList.add('active');
}

function nextSlide() {
    if (slides.length === 0) return;
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(currentSlideIndex);
}

function prevSlide() {
    if (slides.length === 0) return;
    currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    showSlide(currentSlideIndex);
}

function changeSlide(direction) {
    if (direction === 1) {
        nextSlide();
    } else {
        prevSlide();
    }
}

function currentSlide(index) {
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
}

// Auto-advance slides only if slides exist
if (slides.length > 0) {
    setInterval(nextSlide, 6000);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const header = document.getElementById('header');
            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition = target.offsetTop - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const header = document.getElementById('header');
        const headerHeight = header ? header.offsetHeight : 0;
        
        if (window.scrollY >= sectionTop - headerHeight - 100) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.store-category, .category-card, .about-text, .about-image, .service-card, .value-card').forEach(el => {
    el.classList.add('scroll-animate');
    observer.observe(el);
});

// Portfolio category interactions
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
        const category = card.getAttribute('data-category');
        showPortfolioGallery(category);
    });
});

function showPortfolioGallery(category) {
    // Hide all galleries
    document.querySelectorAll('.portfolio-gallery').forEach(gallery => {
        gallery.classList.remove('active');
    });
    
    // Show selected gallery
    const targetGallery = document.getElementById(`gallery-${category}`);
    if (targetGallery) {
        targetGallery.classList.add('active');
        
        // Scroll to gallery
        const header = document.getElementById('header');
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = targetGallery.offsetTop - headerHeight - 50;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Contact form handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = {
            nombre: formData.get('nombre'),
            email: formData.get('email'),
            telefono: formData.get('telefono'),
            servicio: formData.get('servicio'),
            mensaje: formData.get('mensaje')
        };
        
        // Create mailto link
        const subject = `Consulta de ${data.nombre} - ${data.servicio}`;
        const body = `
Nombre: ${data.nombre}
Email: ${data.email}
Teléfono: ${data.telefono}
Servicio: ${data.servicio}

Mensaje:
${data.mensaje}
        `;
        
        const mailtoLink = `mailto:ventaspietrafina@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Simulate form submission
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'ENVIANDO...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            // Open email client
            window.location.href = mailtoLink;
            
            submitButton.textContent = 'MENSAJE PREPARADO';
            submitButton.style.backgroundColor = '#059669';
            
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.style.backgroundColor = '';
                this.reset();
            }, 3000);
        }, 1500);
    });
}

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });
}

// Store category interactions
document.querySelectorAll('.store-category .btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const category = button.closest('.store-category').querySelector('h3').textContent;
        
        // Create WhatsApp message
        const message = `Hola, estoy interesado en los productos de la categoría: ${category}`;
        const whatsappLink = `https://wa.me/523331050996?text=${encodeURIComponent(message)}`;
        
        window.open(whatsappLink, '_blank');
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-slide img');
    
    parallaxElements.forEach(element => {
        const speed = 0.3;
        element.style.transform = `translateY(${scrolled * speed}px) scale(1.05)`;
    });
});

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add stagger animation to elements
    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
    });
});

// Intersection Observer for fade-in animations
const fadeElements = document.querySelectorAll('.fade-in-up');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

fadeElements.forEach(element => {
    fadeObserver.observe(element);
});

// Gallery navigation keyboard support
document.addEventListener('keydown', (e) => {
    if (slides.length === 0) return;
    
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
});

// Add loading states for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', () => {
        img.classList.add('loaded');
    });
    
    // If image is already loaded
    if (img.complete) {
        img.classList.add('loaded');
    }
});

// Smooth reveal animations on scroll
const revealElements = document.querySelectorAll('.category-card, .store-category, .about-content > *, .service-card, .value-card');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, {
    threshold: 0.1
});

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    revealObserver.observe(element);
});

// Enhanced button hover effects
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add elegant transitions to all interactive elements
const style = document.createElement('style');
style.textContent = `
    * {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .hero-slide img {
        transition: transform 20s ease-out, opacity 1.5s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .scroll-animate {
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
`;
document.head.appendChild(style);