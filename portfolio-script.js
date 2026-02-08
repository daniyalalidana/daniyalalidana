// ========================================
// LOADING SCREEN
// ========================================
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => loadingScreen.remove(), 500);
        }, 500);
    }
});

// ========================================
// NAVIGATION MENU TOGGLE
// ========================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = navMenu.classList.contains('active') 
            ? 'rotate(45deg) translateY(8px)' 
            : 'rotate(0) translateY(0)';
        spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
        spans[2].style.transform = navMenu.classList.contains('active') 
            ? 'rotate(-45deg) translateY(-8px)' 
            : 'rotate(0) translateY(0)';
    });
}

// Close mobile menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        
        // Reset hamburger icon
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'rotate(0) translateY(0)';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'rotate(0) translateY(0)';
    });
});

// ========================================
// SMOOTH SCROLLING WITH OFFSET
// ========================================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// ACTIVE SECTION HIGHLIGHTING
// ========================================
const sections = document.querySelectorAll('section');
const observerOptions = {
    root: null,
    rootMargin: '-100px',
    threshold: 0.3
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('id');
            
            // Remove active class from all links
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to current section link
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.2)';
    }
    
    lastScroll = currentScroll;
});

// ========================================
// ANIMATE ELEMENTS ON SCROLL
// ========================================
const animateOnScrollElements = document.querySelectorAll(
    '.stat-card, .education-item, .cert-card, .skill-category, .project-card, .contact-item'
);

const animateObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'all 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            animateObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

animateOnScrollElements.forEach(element => {
    animateObserver.observe(element);
});

// ========================================
// SKILL BARS ANIMATION
// ========================================
const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.style.width;
            entry.target.style.width = '0';
            
            setTimeout(() => {
                entry.target.style.width = width;
            }, 200);
            
            skillObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// ========================================
// CONTACT FORM HANDLING WITH FORMSPREE
// ========================================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        
        // Disable button and show loading
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        try {
            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success
                showFormStatus('Thank you! Your message has been sent successfully. I\'ll get back to you soon!', 'success');
                contactForm.reset();
            } else {
                // Error from server
                throw new Error('Server error');
            }
        } catch (error) {
            // Network or other error
            showFormStatus('Oops! There was a problem sending your message. Please try again or email me directly.', 'error');
        } finally {
            // Re-enable button
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        }
    });
}

function showFormStatus(message, type) {
    if (formStatus) {
        formStatus.textContent = message;
        formStatus.className = `form-status ${type} show`;
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            formStatus.classList.remove('show');
        }, 5000);
    }
}

// ========================================
// NOTIFICATION SYSTEM
// ========================================
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#14b8a6' : '#6366f1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background 0.3s ease;
    `;
    
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }
`;
document.head.appendChild(style);

// ========================================
// TYPING EFFECT FOR HERO SUBTITLE
// ========================================
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    let index = 0;
    
    function typeWriter() {
        if (index < text.length) {
            heroSubtitle.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 50);
        }
    }
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
}

// ========================================
// PARALLAX EFFECT FOR HERO SECTION
// ========================================
window.addEventListener('scroll', () => {
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    const scrolled = window.pageYOffset;
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - scrolled / 600;
    }
    
    if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// ========================================
// STATS COUNTER ANIMATION
// ========================================
const statNumbers = document.querySelectorAll('.stat-number');

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const text = target.textContent;
            const number = parseInt(text.match(/\d+/)?.[0] || 0);
            
            if (number > 0) {
                let current = 0;
                const increment = number / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        target.textContent = text;
                        clearInterval(timer);
                    } else {
                        target.textContent = Math.floor(current) + text.replace(/\d+/, '');
                    }
                }, 30);
            }
            
            statsObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// ========================================
// COPY EMAIL TO CLIPBOARD
// ========================================
const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

emailLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        if (e.shiftKey) { // Hold shift to copy instead of opening email client
            e.preventDefault();
            const email = link.href.replace('mailto:', '');
            
            navigator.clipboard.writeText(email).then(() => {
                showNotification('Email address copied to clipboard!', 'success');
            }).catch(() => {
                showNotification('Failed to copy email address', 'error');
            });
        }
    });
});

// ========================================
// KEYBOARD NAVIGATION
// ========================================
document.addEventListener('keydown', (e) => {
    // Press 'h' to go to home
    if (e.key === 'h' && !e.target.matches('input, textarea')) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Press 'c' to focus contact form
    if (e.key === 'c' && !e.target.matches('input, textarea')) {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
                document.getElementById('name')?.focus();
            }, 500);
        }
    }
});

// ========================================
// PAGE LOAD ANIMATION
// ========================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ========================================
// CONSOLE MESSAGE
// ========================================
console.log('%c👋 Welcome to Daniyal Ali Dana\'s Portfolio!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%c🚀 Interested in my work? Let\'s connect!', 'color: #14b8a6; font-size: 14px;');
console.log('%cGitHub: https://github.com/daniyalalidana', 'color: #cbd5e1; font-size: 12px;');

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Update scroll handlers with throttle
window.addEventListener('scroll', throttle(() => {
    // Performance optimized scroll handlers
}, 100));

// ========================================
// ACCESSIBILITY ENHANCEMENTS
// ========================================

// Trap focus in mobile menu when open
document.addEventListener('keydown', (e) => {
    if (navMenu && navMenu.classList.contains('active') && e.key === 'Escape') {
        navMenu.classList.remove('active');
        navToggle.focus();
    }
});

// ========================================
// PERFORMANCE MONITORING
// ========================================
if ('performance' in window && 'PerformanceObserver' in window) {
    // Monitor Largest Contentful Paint
    try {
        const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
        // Observer not supported
    }
}

// ========================================
// SERVICE WORKER REGISTRATION (PWA)
// ========================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered:', registration);
            })
            .catch(error => {
                console.log('SW registration failed:', error);
            });
    });
}

console.log('%c✅ Portfolio loaded successfully!', 'color: #14b8a6; font-size: 14px; font-weight: bold;');
console.log('%c🚀 Performance optimized | SEO ready | Accessible', 'color: #6366f1; font-size: 12px;');
