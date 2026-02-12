/**
 * Professional Portfolio Script
 * Features: Theme toggle, navigation, form handling, animations, API integration
 */

document.addEventListener('DOMContentLoaded', initPortfolio);

function initPortfolio() {
    initTheme();
    initNavigation();
    initFormHandling();
    loadDynamicContent();
    setupAnimations();
    checkBackendHealth();
}

// ===== THEME SYSTEM =====
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // Get saved theme or use system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    html.setAttribute('data-theme', theme);
    updateThemeIcon(theme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = html.getAttribute('data-theme') || 'light';
            const next = current === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            updateThemeIcon(next);
        });
    }
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('.theme-toggle i');
    if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// ===== NAVIGATION =====
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', navMenu.classList.contains('active'));
        });
    }
    
    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            updateActiveLink();
        });
    });
    
    // Update active link on scroll
    updateActiveLink();
    window.addEventListener('scroll', () => {
        updateActiveLink();
    });
}

function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

// ===== FORM HANDLING =====
function initFormHandling() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const formStatus = document.getElementById('formStatus');
        
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        try {
            // Get form data
            const formData = new FormData(form);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message')
            };
            
            // Call backend API
            const result = await APIService.submitContact(data);
            
            showSuccess(formStatus, result.message || 'Message sent successfully!');
            form.reset();
        } catch (error) {
            showError(formStatus, error.message || 'Failed to send message. Please try again.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

function showSuccess(element, message = 'Message sent successfully!') {
    if (!element) return;
    element.textContent = message;
    element.className = 'form-status success';
    setTimeout(() => {
        element.className = '';
    }, 5000);
}

function showError(element, message = 'Something went wrong') {
    if (!element) return;
    element.textContent = message;
    element.className = 'form-status error';
    setTimeout(() => {
        element.className = '';
    }, 5000);
}

// ===== BACKEND INTEGRATION =====
/**
 * Load dynamic content from backend API
 */
async function loadDynamicContent() {
    try {
        // Load projects from backend
        const projectsContainer = document.getElementById('projectsContainer');
        if (projectsContainer) {
            const projects = await APIService.getProjects();
            renderProjects(projects, projectsContainer);
        }
        
        // Load about info from backend
        const aboutSection = document.getElementById('aboutSection');
        if (aboutSection) {
            const about = await APIService.getAbout();
            updateAboutSection(about);
        }
    } catch (error) {
        console.error('Error loading dynamic content:', error);
    }
}

/**
 * Render projects to DOM
 */
function renderProjects(projects, container) {
    if (!projects || !Array.isArray(projects)) return;
    
    const projectsHTML = projects
        .map(project => `
            <div class="project-card">
                <h3>${escapeHtml(project.name)}</h3>
                <p>${escapeHtml(project.description)}</p>
                <div class="tech-tags">
                    ${project.technologies.map(tech => 
                        `<span class="tag">${escapeHtml(tech)}</span>`
                    ).join('')}
                </div>
                ${project.url ? `<a href="${project.url}" target="_blank" class="project-link">View Project →</a>` : ''}
            </div>
        `)
        .join('');
    
    container.innerHTML = projectsHTML;
}

/**
 * Update about section with backend data
 */
function updateAboutSection(about) {
    if (!about) return;
    
    const titleEl = document.querySelector('.about-content h2');
    const descEl = document.querySelector('.about-description');
    
    if (titleEl) titleEl.textContent = about.title || 'About Me';
    if (descEl) descEl.textContent = about.bio || '';
}

/**
 * Check backend health
 */
async function checkBackendHealth() {
    try {
        const health = await APIService.checkHealth();
        if (health) {
            console.log('✅ Backend is online');
            document.body.setAttribute('data-backend', 'online');
        }
    } catch (error) {
        console.warn('⚠️ Backend is offline - using static content');
        document.body.setAttribute('data-backend', 'offline');
    }
}

/**
 * Utility: Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== ANIMATIONS =====
function setupAnimations() {
    // Observe elements for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all cards and list items
    document.querySelectorAll(
        '.project-card, .skill-card, .highlight-card, .about-text, .contact-method'
    ).forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        observer.observe(el);
    });
    
    // Add animation keyframes
    if (!document.getElementById('animationStyles')) {
        const style = document.createElement('style');
        style.id = 'animationStyles';
        style.textContent = `
            @keyframes fadeInUp {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Analytics tracking
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
}
