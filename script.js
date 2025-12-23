// ========================================
// ROMANTIC LOVE PAGE - JAVASCRIPT
// ========================================

// ===== FLOATING HEARTS ANIMATION =====
function createFloatingHearts() {
    const heartsContainer = document.getElementById('heartsContainer');
    const heartSymbols = ['❤️', '💕', '💗', '💖', '💝', '💓'];
    
    function addHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        
        // Random horizontal position
        heart.style.left = Math.random() * 100 + '%';
        
        // Random animation duration between 8-15 seconds
        const duration = Math.random() * 7 + 8;
        heart.style.animationDuration = duration + 's';
        
        // Random delay
        heart.style.animationDelay = Math.random() * 3 + 's';
        
        heartsContainer.appendChild(heart);
        
        // Remove heart after animation completes
        setTimeout(() => {
            heart.remove();
        }, (duration + 3) * 1000);
    }
    
    // Create initial hearts
    for (let i = 0; i < 5; i++) {
        setTimeout(addHeart, i * 1000);
    }
    
    // Continue creating hearts periodically
    setInterval(addHeart, 3000);
}

// ===== INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);
    
    // Observe all sections with fade-in-up class
    const sections = document.querySelectorAll('.fade-in-up');
    sections.forEach((section, index) => {
        section.style.animationDelay = `${index * 0.1}s`;
        observer.observe(section);
    });
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
function initSmoothScroll() {
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
}

// ===== PARALLAX EFFECT FOR HERO SECTION =====
function initParallax() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (heroContent && scrolled < hero.offsetHeight) {
            heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            heroContent.style.opacity = 1 - (scrolled / hero.offsetHeight);
        }
    });
}

// ===== ADD SPARKLE EFFECT ON MOUSE MOVE =====
function initSparkleEffect() {
    const specialCards = document.querySelectorAll('.special-card, .memory-card');
    
    specialCards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            createSparkle(e.pageX, e.pageY);
        });
    });
}

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.textContent = '✨';
    sparkle.style.position = 'fixed';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.fontSize = '1.5rem';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '9999';
    sparkle.style.animation = 'fadeIn 0.5s ease-out reverse';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 500);
}

// ===== TYPEWRITER EFFECT FOR HERO TITLE =====
function initTypewriter() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.opacity = '1';
    
    let charIndex = 0;
    
    function typeChar() {
        if (charIndex < originalText.length) {
            heroTitle.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeChar, 100);
        }
    }
    
    setTimeout(typeChar, 500);
}

// ===== DYNAMIC DATE DISPLAY =====
function updateDateDisplay() {
    const dateCard = document.querySelector('.date-card');
    if (!dateCard) return;
    
    // Calculate days since the special date
    const specialDate = new Date('2024-03-15');
    const today = new Date();
    const diffTime = Math.abs(today - specialDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // You can optionally add a counter showing days together
    // This is commented out but available if desired
    /*
    const daysCounter = document.createElement('p');
    daysCounter.className = 'days-together';
    daysCounter.innerHTML = `<strong>${diffDays}</strong> beautiful days together`;
    daysCounter.style.marginTop = 'var(--spacing-md)';
    daysCounter.style.fontSize = '1.125rem';
    daysCounter.style.color = 'var(--color-primary-dark)';
    dateCard.querySelector('.date-content').appendChild(daysCounter);
    */
}

// ===== RANDOM GENTLE ANIMATIONS FOR CTA SECTION =====
function initCTAAnimations() {
    const ctaIcon = document.querySelector('.cta-icon');
    
    if (ctaIcon) {
        setInterval(() => {
            ctaIcon.style.transform = 'scale(1.2) rotate(10deg)';
            setTimeout(() => {
                ctaIcon.style.transform = 'scale(1) rotate(0deg)';
            }, 300);
        }, 3000);
    }
}

// ===== ADD HOVER GLOW EFFECT TO CARDS =====
function initCardGlowEffect() {
    const cards = document.querySelectorAll('.memory-card, .special-card, .date-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

// ===== EASTER EGG: SECRET MESSAGE =====
function initEasterEgg() {
    let clicks = 0;
    const heroSparkle = document.querySelector('.hero-sparkle');
    
    if (heroSparkle) {
        heroSparkle.addEventListener('click', () => {
            clicks++;
            if (clicks === 3) {
                showSecretMessage();
                clicks = 0;
            }
        });
    }
}

function showSecretMessage() {
    const message = document.createElement('div');
    message.textContent = 'P.S. You make my heart smile every single day 💕';
    message.style.position = 'fixed';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.padding = '2rem';
    message.style.background = 'var(--color-white)';
    message.style.borderRadius = '20px';
    message.style.boxShadow = 'var(--shadow-large)';
    message.style.fontSize = '1.25rem';
    message.style.fontFamily = 'var(--font-script)';
    message.style.color = 'var(--color-primary-dark)';
    message.style.zIndex = '10000';
    message.style.animation = 'fadeIn 0.5s ease-out';
    message.style.textAlign = 'center';
    message.style.maxWidth = '90%';
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.animation = 'fadeIn 0.5s ease-out reverse';
        setTimeout(() => message.remove(), 500);
    }, 3000);
}

// ===== INITIALIZE ALL FEATURES ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all interactive features
    createFloatingHearts();
    initScrollAnimations();
    initSmoothScroll();
    initParallax();
    initSparkleEffect();
    initTypewriter();
    updateDateDisplay();
    initCTAAnimations();
    initCardGlowEffect();
    initEasterEgg();
    
    // Add smooth fade-in for page load
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
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

// Add loading state
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
