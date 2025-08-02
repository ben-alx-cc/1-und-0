// Scroll Animation Controller für Faces Mannheim
class ScrollAnimationController {
    constructor() {
        this.currentStep = 0;
        this.maxSteps = 6;
        this.isAnimating = false;
        this.scrollTimeout = null;
        this.contentItems = document.querySelectorAll('.content-item');
        this.scrollIndicator = document.querySelector('.scroll-indicator');
        
        this.init();
    }
    
    init() {
        // Erste Animation beim Laden
        this.showFirstStep();
        
        // Event Listeners
        this.setupEventListeners();
        
        // Touch Support für Mobile
        this.setupTouchSupport();
        
        // Keyboard Support
        this.setupKeyboardSupport();
    }
    
    setupEventListeners() {
        // Wheel Event für Desktop
        window.addEventListener('wheel', (e) => {
            e.preventDefault();
            this.handleScroll(e.deltaY);
        }, { passive: false });
        
        // Resize Event
        window.addEventListener('resize', () => {
            this.updateLayout();
        });
        
        // Visibility Change für Performance
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAnimations();
            } else {
                this.resumeAnimations();
            }
        });
    }
    
    setupTouchSupport() {
        let touchStartY = 0;
        let touchEndY = 0;
        
        // Touch Start
        document.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
        }, { passive: true });
        
        // Touch End
        document.addEventListener('touchend', (e) => {
            touchEndY = e.changedTouches[0].clientY;
            const deltaY = touchStartY - touchEndY;
            
            if (Math.abs(deltaY) > 50) { // Mindest-Swipe-Distanz
                this.handleScroll(deltaY);
            }
        }, { passive: true });
        
        // Touch Move verhindern
        document.addEventListener('touchmove', (e) => {
            e.preventDefault();
        }, { passive: false });
    }
    
    setupKeyboardSupport() {
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowDown':
                case 'PageDown':
                case ' ':
                    e.preventDefault();
                    this.handleScroll(1);
                    break;
                case 'ArrowUp':
                case 'PageUp':
                    e.preventDefault();
                    this.handleScroll(-1);
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goToStep(0);
                    break;
                case 'End':
                    e.preventDefault();
                    this.goToStep(this.maxSteps - 1);
                    break;
            }
        });
    }
    
    handleScroll(deltaY) {
        if (this.isAnimating) return;
        
        // Debounce Scroll Events
        clearTimeout(this.scrollTimeout);
        this.scrollTimeout = setTimeout(() => {
            if (deltaY > 0 && this.currentStep < this.maxSteps - 1) {
                this.nextStep();
            } else if (deltaY < 0 && this.currentStep > 0) {
                this.previousStep();
            }
        }, 50);
    }
    
    showFirstStep() {
        if (this.contentItems[0]) {
            this.contentItems[0].classList.add('visible');
            this.currentStep = 1;
            this.updateScrollIndicator();
        }
    }
    
    nextStep() {
        if (this.currentStep >= this.maxSteps) return;
        
        this.isAnimating = true;
        
        // Aktuelles Element animieren
        const currentItem = this.contentItems[this.currentStep - 1];
        if (currentItem) {
            currentItem.classList.add('animate-in');
        }
        
        // Nächstes Element vorbereiten
        const nextItem = this.contentItems[this.currentStep];
        if (nextItem) {
            nextItem.classList.add('visible');
        }
        
        this.currentStep++;
        
        // Animation beenden
        setTimeout(() => {
            this.isAnimating = false;
            this.updateScrollIndicator();
        }, 800);
    }
    
    previousStep() {
        if (this.currentStep <= 1) return;
        
        this.isAnimating = true;
        
        // Aktuelles Element ausblenden
        const currentItem = this.contentItems[this.currentStep - 1];
        if (currentItem) {
            currentItem.classList.remove('visible', 'animate-in');
        }
        
        this.currentStep--;
        
        // Animation beenden
        setTimeout(() => {
            this.isAnimating = false;
            this.updateScrollIndicator();
        }, 800);
    }
    
    goToStep(step) {
        if (step < 0 || step > this.maxSteps || this.isAnimating) return;
        
        this.isAnimating = true;
        
        // Alle Elemente zurücksetzen
        this.contentItems.forEach((item, index) => {
            if (index < step) {
                item.classList.add('visible');
            } else {
                item.classList.remove('visible', 'animate-in');
            }
        });
        
        this.currentStep = step;
        
        setTimeout(() => {
            this.isAnimating = false;
            this.updateScrollIndicator();
        }, 800);
    }
    
    updateScrollIndicator() {
        if (this.currentStep >= this.maxSteps) {
            this.scrollIndicator.style.opacity = '0.3';
        } else {
            this.scrollIndicator.style.opacity = '0.7';
        }
    }
    
    updateLayout() {
        // Layout-Updates bei Resize
        this.contentItems.forEach(item => {
            // Force reflow für bessere Performance
            item.offsetHeight;
        });
    }
    
    pauseAnimations() {
        // Pausiere Animationen wenn Tab nicht aktiv
        this.isAnimating = true;
    }
    
    resumeAnimations() {
        // Setze Animationen fort
        this.isAnimating = false;
    }
}

// Utility Functions
class AnimationUtils {
    static debounce(func, wait) {
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
    
    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Performance Optimierungen
class PerformanceOptimizer {
    constructor() {
        this.setupIntersectionObserver();
        this.setupPerformanceMonitoring();
    }
    
    setupIntersectionObserver() {
        // Intersection Observer für bessere Performance
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-viewport');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });
        
        // Beobachte Content Items
        document.querySelectorAll('.content-item').forEach(item => {
            observer.observe(item);
        });
    }
    
    setupPerformanceMonitoring() {
        // Performance Monitoring für Debugging
        if (window.location.search.includes('debug=performance')) {
            this.monitorPerformance();
        }
    }
    
    monitorPerformance() {
        let frameCount = 0;
        let lastTime = performance.now();
        
        const countFrames = () => {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime - lastTime >= 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                console.log(`FPS: ${fps}`);
                frameCount = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(countFrames);
        };
        
        requestAnimationFrame(countFrames);
    }
}

// Accessibility Enhancements
class AccessibilityEnhancer {
    constructor() {
        this.setupAccessibility();
    }
    
    setupAccessibility() {
        // ARIA Labels für Screen Reader
        this.addAriaLabels();
        
        // Focus Management
        this.setupFocusManagement();
        
        // Reduced Motion Support
        this.handleReducedMotion();
    }
    
    addAriaLabels() {
        const contentItems = document.querySelectorAll('.content-item');
        contentItems.forEach((item, index) => {
            item.setAttribute('role', 'region');
            item.setAttribute('aria-label', `Schritt ${index + 1} von ${contentItems.length}`);
        });
        
        // Scroll Indicator
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.setAttribute('role', 'button');
            scrollIndicator.setAttribute('aria-label', 'Weiter scrollen');
            scrollIndicator.setAttribute('tabindex', '0');
        }
    }
    
    setupFocusManagement() {
        // Focus Management für Keyboard Navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                // Verhindere Tab-Navigation außerhalb der Seite
                const focusableElements = document.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                
                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        });
    }
    
    handleReducedMotion() {
        // Prüfe Reduced Motion Preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            document.body.classList.add('reduced-motion');
        }
        
        // Listener für Änderungen
        prefersReducedMotion.addEventListener('change', (e) => {
            if (e.matches) {
                document.body.classList.add('reduced-motion');
            } else {
                document.body.classList.remove('reduced-motion');
            }
        });
    }
}

// Initialisierung
document.addEventListener('DOMContentLoaded', () => {
    // Warte kurz bis DOM vollständig geladen ist
    setTimeout(() => {
        new ScrollAnimationController();
        new PerformanceOptimizer();
        new AccessibilityEnhancer();
        
        // Debug Mode
        if (window.location.search.includes('debug=true')) {
            console.log('Faces Mannheim - Debug Mode aktiviert');
            window.scrollController = new ScrollAnimationController();
        }
    }, 100);
});

// Service Worker für Offline-Funktionalität (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}