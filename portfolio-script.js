/**
 * Portfolio Script - Main JavaScript File
 * Author: Daniyal Ali Dana
 * Features: Theme toggle, Navigation, Modal system, Form handling, Animations
 */

// ========================================
// 1. INITIALIZATION & DOM READY
// ========================================
document.addEventListener('DOMContentLoaded', initializePortfolio);
window.addEventListener('load', onPageLoad);

function initializePortfolio() {
    console.log('%c🚀 Initializing Portfolio...', 'color: #6366f1; font-size: 14px; font-weight: bold;');
    
    // Initialize all features
    initTheme();
    initNavigation();
    initProjectModal();
    initFormValidation();
    initAnimations();
    initEmailCopy();
    setupKeyboardShortcuts();
    
    console.log('%c✅ Portfolio ready!', 'color: #14b8a6; font-size: 14px;');
}

function onPageLoad() {
    // Remove loading screen if exists
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => loadingScreen.remove(), 500);
        }, 500);
    }
    
    // Initialize Service Worker for PWA
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('Service Worker registered'))
            .catch(err => console.log('Service Worker registration failed', err));
    }
}

// ========================================
// 2. THEME SYSTEM (Dark/Light Mode)
// ========================================
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    function getInitialTheme() {
        const saved = localStorage.getItem('theme');
        if (saved) return saved;
        
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark ? 'dark' : 'light';
    }
    
    function setTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateThemeIcon(theme);
    }
    
    function updateThemeIcon(theme) {
        if (!themeToggle) return;
        const icon = themeToggle.querySelector('i');
        if (theme === 'light') {
            icon.className = 'fas fa-sun';
            themeToggle.setAttribute('title', 'Switch to dark mode');
        } else {
            icon.className = 'fas fa-moon';
            themeToggle.setAttribute('title', 'Switch to light mode');
        }
    }
    
    // Set initial theme
    const initialTheme = getInitialTheme();
    setTheme(initialTheme);
    
    // Listen to toggle button
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = html.getAttribute('data-theme') || 'dark';
            const next = current === 'dark' ? 'light' : 'dark';
            setTheme(next);
        });
    }
    
    // Listen to system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        setTheme(e.matches ? 'dark' : 'light');
    });
}

// ========================================
// 3. NAVIGATION SYSTEM
// ========================================
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            const isActive = navMenu.classList.toggle('active');
            animateHamburger(navToggle, isActive);
        });
    }
    
    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            handleNavigation(e, link, navMenu, navToggle);
        });
    });
    
    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', throttle(() => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.2)';
        }
        lastScroll = currentScroll;
    }, 100));
    
    // Active section highlighting
    updateActiveNavLink(navLinks);
}

function animateHamburger(toggle, isActive) {
    const spans = toggle.querySelectorAll('span');
    if (isActive) {
        spans[0].style.transform = 'rotate(45deg) translateY(8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
    } else {
        spans[0].style.transform = 'rotate(0) translateY(0)';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'rotate(0) translateY(0)';
    }
}

function handleNavigation(e, link, navMenu, navToggle) {
    e.preventDefault();
    
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        navMenu.classList.remove('active');
        animateHamburger(navToggle, false);
        
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetSection.offsetTop - navHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

function updateActiveNavLink(navLinks) {
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        root: null,
        rootMargin: '-100px',
        threshold: 0.3
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                
                const activeLink = document.querySelector(
                    `.nav-link[href="#${entry.target.id}"]`
                );
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);
    
    sections.forEach(section => observer.observe(section));
}

// ========================================
// 4. PROJECT MODAL SYSTEM
// ========================================
function initProjectModal() {
    const projectCards = document.querySelectorAll('.project-card');
    const projectModal = document.getElementById('projectModal');
    const modalBackdrop = projectModal?.querySelector('.modal-backdrop');
    const modalClose = projectModal?.querySelector('.modal-close');
    
    if (!projectModal) return;
    
    const projectsData = {
        'Data Collection for AI Model': {
            type: 'Freelance Project - Upwork',
            description: 'Successfully completed a professional data collection project for training an AI model. Demonstrated expertise in data gathering, cleaning, and preparation for machine learning applications. This project involved meticulous attention to detail in ensuring data quality and consistency for optimal model training.',
            tags: ['Data Collection', 'Data Cleaning', 'AI/ML', 'Python'],
            status: 'Completed',
            icon: 'fa-briefcase',
            links: [
                { text: 'View on Upwork', url: 'https://www.upwork.com/freelancers/daniyalalidana', icon: 'fa-external-link-alt' }
            ]
        },
        'Machine Learning Projects': {
            type: 'Open Source - GitHub',
            description: 'Collection of machine learning projects showcasing implementation of various supervised learning algorithms including regression, classification, and ensemble methods. Each project includes detailed documentation, code examples, and performance metrics.',
            tags: ['Scikit-learn', 'Python', 'ML Algorithms', 'Data Science'],
            icon: 'fa-github',
            links: [
                { text: 'View on GitHub', url: 'https://github.com/daniyalalidana', icon: 'fa-github', primary: true }
            ]
        },
        'Supervised Learning Implementations': {
            type: 'Academic & Personal Projects',
            description: 'Comprehensive implementations of all major supervised learning algorithms including Linear Regression, Logistic Regression, Decision Trees, Random Forests, SVM, and Neural Networks. Each implementation includes theory explanations, code walkthroughs, and practical examples.',
            tags: ['Linear Regression', 'Classification', 'Decision Trees', 'Neural Networks'],
            icon: 'fa-project-diagram',
            links: [
                { text: 'GitHub Repository', url: 'https://github.com/daniyalalidana', icon: 'fa-github', primary: true }
            ]
        },
        'Data Analysis with Python': {
            type: 'Course Project - IBM Certification',
            description: 'Comprehensive data analysis projects using Pandas, NumPy, and visualization libraries. Applied statistical methods and created insightful visualizations for data-driven decision making. This project demonstrates proficiency in exploratory data analysis and data storytelling.',
            tags: ['Pandas', 'NumPy', 'Matplotlib', 'Data Viz'],
            icon: 'fa-chart-bar',
            links: [
                { text: 'GitHub Repository', url: 'https://github.com/daniyalalidana', icon: 'fa-github', primary: true }
            ]
        }
    };
    
    function openModal(projectTitle) {
        const project = projectsData[projectTitle];
        if (!project) return;
        
        // Update modal content
        const modalTitle = projectModal.querySelector('#modalTitle');
        const modalType = projectModal.querySelector('.modal-type');
        const modalIcon = projectModal.querySelector('.modal-icon i');
        const modalDescription = projectModal.querySelector('.modal-description');
        const modalTags = projectModal.querySelector('.modal-tags');
        const modalStatus = projectModal.querySelector('.modal-status');
        const modalLinks = projectModal.querySelector('.modal-links');
        
        if (modalTitle) modalTitle.textContent = projectTitle;
        if (modalType) modalType.textContent = project.type;
        if (modalIcon) modalIcon.className = `fas ${project.icon}`;
        if (modalDescription) modalDescription.textContent = project.description;
        
        if (modalTags) {
            modalTags.innerHTML = project.tags
                .map(tag => `<span class="tag">${tag}</span>`)
                .join('');
        }
        
        if (modalStatus) {
            if (project.status) {
                modalStatus.innerHTML = `<i class="fas fa-check-circle"></i> ${project.status}`;
                modalStatus.style.display = 'flex';
            } else {
                modalStatus.style.display = 'none';
            }
        }
        
        if (modalLinks) {
            modalLinks.innerHTML = project.links
                .map(link => `
                    <a href="${link.url}" target="_blank" rel="noopener noreferrer" 
                       class="modal-link ${link.primary ? '' : 'secondary'}">
                        <i class="fas ${link.icon}"></i>
                        ${link.text}
                    </a>
                `)
                .join('');
        }
        
        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        projectModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Event listeners
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h3')?.textContent;
            if (title) openModal(title);
        });
    });
    
    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', closeModal);
    }
    
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal.classList.contains('active')) {
            closeModal();
        }
    });
}

// ========================================
// 5. FORM VALIDATION & SUBMISSION
// ========================================
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    const formInputs = contactForm.querySelectorAll('input, textarea');
    
    const validationRules = {
        name: { pattern: /^[a-zA-Z\s]{3,50}$/, message: 'Name: 3-50 letters' },
        email: { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Valid email required' },
        subject: { pattern: /^.{5,100}$/, message: 'Subject: 5-100 characters' },
        message: { pattern: /^.{10,1000}$/, message: 'Message: 10-1000 characters' }
    };
    
    function validateField(field) {
        const rules = validationRules[field.name];
        if (!rules || !field.value.trim()) return true;
        
        const isValid = rules.pattern.test(field.value.trim());
        field.style.borderColor = isValid ? 'inherit' : '#ef4444';
        return isValid;
    }
    
    // Real-time validation
    formInputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            if (input.value) validateField(input);
        });
    });
    
    // Form submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate all fields
        const allValid = Array.from(formInputs).every(field => {
            const rules = validationRules[field.name];
            return !rules || rules.pattern.test(field.value.trim());
        });
        
        if (!allValid) {
            showToast('Please fix form errors', 'error');
            return;
        }
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { 'Accept': 'application/json' }
            });
            
            if (response.ok) {
                showToast('Message sent successfully!', 'success');
                contactForm.reset();
                formInputs.forEach(f => f.style.borderColor = 'inherit');
            } else {
                showToast('Error sending message', 'error');
            }
        } catch (error) {
            showToast('Network error. Please try again', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    });
}

// ========================================
// 6. EMAIL COPY FUNCTIONALITY
// ========================================
function initEmailCopy() {
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    if (!copyEmailBtn) return;
    
    const emailAddress = 'daniyalalidana193@gmail.com';
    
    copyEmailBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        
        try {
            await navigator.clipboard.writeText(emailAddress);
            
            const icon = copyEmailBtn.querySelector('i');
            const originalClass = icon.className;
            
            copyEmailBtn.classList.add('copied');
            icon.className = 'fas fa-check';
            copyEmailBtn.disabled = true;
            
            showToast('Email copied to clipboard!', 'success');
            
            setTimeout(() => {
                copyEmailBtn.classList.remove('copied');
                icon.className = originalClass;
                copyEmailBtn.disabled = false;
            }, 2000);
        } catch (err) {
            showToast('Failed to copy email', 'error');
        }
    });
}

// ========================================
// 7. ANIMATIONS
// ========================================
function initAnimations() {
    // Animate elements on scroll
    const elementsToAnimate = document.querySelectorAll(
        '.stat-card, .education-item, .cert-card, .skill-category, .project-card, .contact-item'
    );
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.cssText = `
                    opacity: 0;
                    transform: translateY(30px);
                    transition: all 0.6s ease;
                `;
                
                setTimeout(() => {
                    entry.target.style.cssText = `
                        opacity: 1;
                        transform: translateY(0);
                        transition: all 0.6s ease;
                    `;
                }, 50);
                
                animationObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    elementsToAnimate.forEach(el => animationObserver.observe(el));
    
    // Animate skill bars
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 100);
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => skillObserver.observe(bar));
    
    // Typing effect
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        let index = 0;
        
        const typeText = () => {
            if (index < text.length) {
                heroSubtitle.textContent += text.charAt(index++);
                setTimeout(typeText, 50);
            }
        };
        
        setTimeout(typeText, 500);
    }
    
    // Parallax effect
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        const heroImage = document.querySelector('.hero-image');
        
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = Math.max(0, 1 - scrolled / 600);
        }
        
        if (heroImage && scrolled < window.innerHeight) {
            heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    }, 100));
    
    // Counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                const number = parseInt(text.match(/\d+/)?.[0] || 0);
                
                if (number > 0) {
                    let current = 0;
                    const increment = number / 30;
                    const counter = setInterval(() => {
                        current += increment;
                        if (current >= number) {
                            target.textContent = text;
                            clearInterval(counter);
                        } else {
                            target.textContent = Math.floor(current) + text.replace(/\d+/, '');
                        }
                    }, 50);
                }
                
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => counterObserver.observe(stat));
}

// ========================================
// 8. KEYBOARD SHORTCUTS
// ========================================
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        if (e.target.matches('input, textarea')) return;
        
        switch (e.key.toLowerCase()) {
            case 'h':
                window.scrollTo({ top: 0, behavior: 'smooth' });
                break;
            case 'c':
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                    setTimeout(() => {
                        document.getElementById('name')?.focus();
                    }, 500);
                }
                break;
        }
    });
}

// ========================================
// 9. TOAST NOTIFICATIONS
// ========================================
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    const styles = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 6px;
        font-size: 0.9rem;
        font-weight: 500;
        z-index: 9999;
        animation: slideInToast 0.3s ease-out;
        color: white;
        background: ${
            type === 'success' ? '#10b981' :
            type === 'error' ? '#ef4444' :
            '#3b82f6'
        };
    `;
    
    toast.style.cssText = styles;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutToast 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add toast animation styles
const toastStyles = document.createElement('style');
toastStyles.textContent = `
    @keyframes slideInToast {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutToast {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(toastStyles);

// ========================================
// 10. UTILITY FUNCTIONS
// ========================================

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

// ========================================
// 11. CONSOLE & LOGGING
// ========================================

console.log('%c👋 Welcome to Daniyal Ali Dana\'s Portfolio!', 'color: #6366f1; font-size: 18px; font-weight: bold;');
console.log('%cLet\'s build something amazing together!', 'color: #14b8a6; font-size: 14px;');
console.log('%cGitHub: https://github.com/daniyalalidana', 'color: #cbd5e1;');
console.log('%cEmail: daniyalalidana193@gmail.com', 'color: #cbd5e1;');
