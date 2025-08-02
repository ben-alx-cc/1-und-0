// Scroll-step reveal functionality for Faces Mannheim exhibition
class ScrollStepReveal {
    constructor() {
        this.currentStep = 0;
        this.maxSteps = 6; // Total number of content steps (0-5)
        this.isScrolling = false;
        this.scrollCooldown = 800; // Cooldown between scroll steps in ms
        this.touchStartY = 0;
        this.touchEndY = 0;
        this.minSwipeDistance = 50;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.showStep(0); // Show first step immediately
        this.updateScrollIndicator();
    }
    
    bindEvents() {
        // Mouse wheel events
        window.addEventListener('wheel', this.handleWheel.bind(this), { passive: false });
        
        // Touch events for mobile
        window.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
        window.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: false });
        
        // Keyboard events
        window.addEventListener('keydown', this.handleKeyboard.bind(this));
        
        // Prevent default scrolling
        document.body.style.overflow = 'hidden';
        
        // Handle resize for responsive updates
        window.addEventListener('resize', this.handleResize.bind(this));
    }
    
    handleWheel(event) {
        event.preventDefault();
        
        if (this.isScrolling) return;
        
        const direction = event.deltaY > 0 ? 1 : -1;
        this.navigateStep(direction);
    }
    
    handleTouchStart(event) {
        this.touchStartY = event.touches[0].clientY;
    }
    
    handleTouchEnd(event) {
        event.preventDefault();
        
        if (this.isScrolling) return;
        
        this.touchEndY = event.changedTouches[0].clientY;
        const swipeDistance = this.touchStartY - this.touchEndY;
        
        if (Math.abs(swipeDistance) > this.minSwipeDistance) {
            const direction = swipeDistance > 0 ? 1 : -1;
            this.navigateStep(direction);
        }
    }
    
    handleKeyboard(event) {
        if (this.isScrolling) return;
        
        switch (event.key) {
            case 'ArrowDown':
            case ' ':
                event.preventDefault();
                this.navigateStep(1);
                break;
            case 'ArrowUp':
                event.preventDefault();
                this.navigateStep(-1);
                break;
            case 'Home':
                event.preventDefault();
                this.goToStep(0);
                break;
            case 'End':
                event.preventDefault();
                this.goToStep(this.maxSteps - 1);
                break;
        }
    }
    
    navigateStep(direction) {
        const newStep = this.currentStep + direction;
        
        if (newStep >= 0 && newStep < this.maxSteps) {
            this.goToStep(newStep);
        }
    }
    
    goToStep(targetStep) {
        if (targetStep === this.currentStep || this.isScrolling) return;
        
        this.isScrolling = true;
        this.currentStep = targetStep;
        
        // Show all steps up to current step
        for (let i = 0; i <= targetStep; i++) {
            this.showStep(i);
        }
        
        // Hide steps after current step
        for (let i = targetStep + 1; i < this.maxSteps; i++) {
            this.hideStep(i);
        }
        
        this.updateScrollIndicator();
        this.adjustLayout();
        
        // Reset scrolling flag after animation
        setTimeout(() => {
            this.isScrolling = false;
        }, this.scrollCooldown);
    }
    
    showStep(stepIndex) {
        const element = document.querySelector(`[data-step="${stepIndex}"]`);
        if (element) {
            // Add visible class with slight delay for staggered effect
            setTimeout(() => {
                element.classList.add('visible');
            }, stepIndex * 100);
        }
    }
    
    hideStep(stepIndex) {
        const element = document.querySelector(`[data-step="${stepIndex}"]`);
        if (element) {
            element.classList.remove('visible');
        }
    }
    
    updateScrollIndicator() {
        const indicator = document.querySelector('.scroll-indicator');
        if (indicator) {
            if (this.currentStep >= this.maxSteps - 1) {
                indicator.classList.add('hidden');
            } else {
                indicator.classList.remove('hidden');
            }
        }
    }
    
    adjustLayout() {
        // Scroll visible content into view smoothly
        const lastVisibleElement = document.querySelector(`[data-step="${this.currentStep}"]`);
        if (lastVisibleElement) {
            // Calculate if we need to adjust viewport
            const rect = lastVisibleElement.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            
            // If content extends beyond viewport, adjust container positioning
            if (rect.bottom > viewportHeight * 0.8) {
                const container = document.querySelector('.content-wrapper');
                if (container) {
                    const offset = Math.min(0, viewportHeight * 0.8 - rect.bottom);
                    container.style.transform = `translateY(${offset}px)`;
                }
            } else {
                // Reset positioning if content fits
                const container = document.querySelector('.content-wrapper');
                if (container) {
                    container.style.transform = 'translateY(0)';
                }
            }
        }
    }
    
    handleResize() {
        // Recalculate layout on resize
        setTimeout(() => {
            this.adjustLayout();
        }, 100);
    }
    
    // Public methods for external control
    next() {
        this.navigateStep(1);
    }
    
    previous() {
        this.navigateStep(-1);
    }
    
    reset() {
        this.goToStep(0);
    }
    
    getCurrentStep() {
        return this.currentStep;
    }
    
    getTotalSteps() {
        return this.maxSteps;
    }
}

// Enhanced scroll indicator with progress
class ScrollProgress {
    constructor(scrollReveal) {
        this.scrollReveal = scrollReveal;
        this.init();
    }
    
    init() {
        this.createProgressIndicator();
        this.updateProgress();
        
        // Update progress when step changes
        const originalGoToStep = this.scrollReveal.goToStep.bind(this.scrollReveal);
        this.scrollReveal.goToStep = (targetStep) => {
            originalGoToStep(targetStep);
            this.updateProgress();
        };
    }
    
    createProgressIndicator() {
        const indicator = document.querySelector('.scroll-indicator');
        if (indicator) {
            const progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress';
            progressBar.innerHTML = `
                <div class="progress-bar">
                    <div class="progress-fill"></div>
                </div>
                <div class="progress-text">
                    <span class="current-step">1</span> / <span class="total-steps">${this.scrollReveal.getTotalSteps()}</span>
                </div>
            `;
            
            indicator.appendChild(progressBar);
            
            // Add CSS for progress indicator
            this.addProgressStyles();
        }
    }
    
    addProgressStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .scroll-progress {
                margin-top: 1rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.5rem;
            }
            
            .progress-bar {
                width: 60px;
                height: 3px;
                background-color: #e0e0e0;
                border-radius: 2px;
                overflow: hidden;
            }
            
            .progress-fill {
                height: 100%;
                background-color: #333;
                border-radius: 2px;
                transition: width 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                width: 0%;
            }
            
            .progress-text {
                font-size: 0.75rem;
                color: #999;
                font-weight: 300;
            }
            
            @media (max-width: 480px) {
                .progress-bar {
                    width: 50px;
                    height: 2px;
                }
                
                .progress-text {
                    font-size: 0.7rem;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    updateProgress() {
        const progressFill = document.querySelector('.progress-fill');
        const currentStepElement = document.querySelector('.current-step');
        
        if (progressFill && currentStepElement) {
            const progress = ((this.scrollReveal.getCurrentStep() + 1) / this.scrollReveal.getTotalSteps()) * 100;
            progressFill.style.width = `${progress}%`;
            currentStepElement.textContent = this.scrollReveal.getCurrentStep() + 1;
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize scroll step reveal
    const scrollReveal = new ScrollStepReveal();
    
    // Initialize progress indicator
    const scrollProgress = new ScrollProgress(scrollReveal);
    
    // Add smooth entrance animation for logo
    const logo = document.querySelector('.logo-placeholder');
    if (logo) {
        setTimeout(() => {
            logo.style.opacity = '1';
            logo.style.transform = 'translateY(0)';
        }, 500);
        
        // Initially hide logo for entrance animation
        logo.style.opacity = '0';
        logo.style.transform = 'translateY(-20px)';
        logo.style.transition = 'all 0.6s ease';
    }
    
    // Expose scrollReveal to global scope for debugging
    window.scrollReveal = scrollReveal;
    
    // Add preload optimization
    const preloadFonts = () => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap';
        link.as = 'style';
        document.head.appendChild(link);
    };
    
    preloadFonts();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause any ongoing animations when page is hidden
        document.body.style.animationPlayState = 'paused';
    } else {
        // Resume animations when page is visible
        document.body.style.animationPlayState = 'running';
    }
});

// Performance optimization: Throttle resize events
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Trigger custom resize event after throttle
        window.dispatchEvent(new CustomEvent('optimizedResize'));
    }, 150);
});