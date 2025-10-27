// Slide Navigation System
class PresentationController {
    constructor() {
        this.currentSlide = 1;
        this.totalSlides = document.querySelectorAll('.slide').length;
        this.slides = document.querySelectorAll('.slide');
        this.init();
    }

    init() {
        // Update slide counter
        document.getElementById('total-slides').textContent = this.totalSlides;
        
        // Add keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        // Add touch/swipe support
        this.addTouchSupport();
        
        // Update navigation state
        this.updateNavigation();
        
        // Add smooth transitions
        this.addTransitions();
    }

    handleKeyPress(e) {
        switch(e.key) {
            case 'ArrowRight':
            case ' ':
                e.preventDefault();
                this.nextSlide();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                this.previousSlide();
                break;
            case 'Home':
                e.preventDefault();
                this.goToSlide(1);
                break;
            case 'End':
                e.preventDefault();
                this.goToSlide(this.totalSlides);
                break;
            case 'Escape':
                e.preventDefault();
                this.toggleFullscreen();
                break;
        }
    }

    addTouchSupport() {
        let startX = 0;
        let startY = 0;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Ignore vertical swipes
            if (Math.abs(diffY) > Math.abs(diffX)) return;
            
            // Swipe left (next slide)
            if (diffX > 50) {
                this.nextSlide();
            }
            // Swipe right (previous slide)
            else if (diffX < -50) {
                this.previousSlide();
            }
            
            startX = 0;
            startY = 0;
        });
    }

    addTransitions() {
        this.slides.forEach(slide => {
            slide.style.transition = 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out';
        });
    }

    goToSlide(slideNumber) {
        if (slideNumber < 1 || slideNumber > this.totalSlides) return;
        
        // Hide current slide
        this.slides[this.currentSlide - 1].classList.remove('active');
        
        // Show new slide
        this.currentSlide = slideNumber;
        this.slides[this.currentSlide - 1].classList.add('active');
        
        // Update UI
        this.updateNavigation();
        
        // Trigger slide animations
        this.animateSlideContent();
    }

    nextSlide() {
        if (this.currentSlide < this.totalSlides) {
            this.goToSlide(this.currentSlide + 1);
        }
    }

    previousSlide() {
        if (this.currentSlide > 1) {
            this.goToSlide(this.currentSlide - 1);
        }
    }

    updateNavigation() {
        // Update slide counter
        document.getElementById('current-slide').textContent = this.currentSlide;
        
        // Update navigation buttons
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        prevBtn.disabled = this.currentSlide === 1;
        nextBtn.disabled = this.currentSlide === this.totalSlides;
    }

    animateSlideContent() {
        const currentSlideElement = this.slides[this.currentSlide - 1];
        const animatableElements = currentSlideElement.querySelectorAll('.index-item, .device, .tech-item, .feature-list li');
        
        // Reset animations
        animatableElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
        });
        
        // Animate elements in sequence
        animatableElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    }
}

// Progress indicator
class ProgressIndicator {
    constructor(presentation) {
        this.presentation = presentation;
        this.createProgressBar();
    }

    createProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.innerHTML = '<div class="progress-fill"></div>';
        
        const styles = `
            .progress-bar {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 4px;
                background: rgba(59, 130, 246, 0.2);
                z-index: 1001;
            }
            .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #3b82f6, #06b6d4);
                transition: width 0.3s ease;
                border-radius: 0 2px 2px 0;
            }
            @media print {
                .progress-bar { display: none !important; }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
        document.body.appendChild(progressBar);
        
        this.progressFill = progressBar.querySelector('.progress-fill');
        this.updateProgress();
    }

    updateProgress() {
        const progress = (this.presentation.currentSlide / this.presentation.totalSlides) * 100;
        this.progressFill.style.width = `${progress}%`;
    }
}

// Theme Controller
class ThemeController {
    constructor() {
        this.themes = {
            'network': {
                primary: '#3b82f6',
                secondary: '#06b6d4',
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
            },
            'cyber': {
                primary: '#10b981',
                secondary: '#059669',
                background: 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)'
            },
            'corporate': {
                primary: '#6366f1',
                secondary: '#8b5cf6',
                background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)'
            }
        };
        this.currentTheme = 'network';
    }

    applyTheme(themeName) {
        if (!this.themes[themeName]) return;
        
        const theme = this.themes[themeName];
        const root = document.documentElement;
        
        root.style.setProperty('--primary-color', theme.primary);
        root.style.setProperty('--secondary-color', theme.secondary);
        document.body.style.background = theme.background;
        
        this.currentTheme = themeName;
    }
}

// Auto-save for PDF generation
class AutoSaver {
    constructor() {
        this.setupAutoSave();
    }

    setupAutoSave() {
        // Add print optimization
        window.addEventListener('beforeprint', () => {
            document.body.classList.add('printing');
            // Show all slides for printing
            document.querySelectorAll('.slide').forEach(slide => {
                slide.style.display = 'block';
                slide.style.position = 'relative';
            });
        });

        window.addEventListener('afterprint', () => {
            document.body.classList.remove('printing');
            // Restore normal slide display
            document.querySelectorAll('.slide').forEach((slide, index) => {
                if (index === presentation.currentSlide - 1) {
                    slide.style.display = 'flex';
                    slide.style.position = 'absolute';
                } else {
                    slide.style.display = 'none';
                }
            });
        });
    }

    generatePDF() {
        window.print();
    }
}

// Slide content animations
class AnimationController {
    constructor() {
        this.setupAnimations();
    }

    setupAnimations() {
        // Add hover effects for interactive elements
        document.querySelectorAll('.device, .index-item, .tech-item').forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transform = 'translateY(-5px) scale(1.02)';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    pulseElement(element) {
        element.style.animation = 'pulse 0.6s ease-in-out';
        setTimeout(() => {
            element.style.animation = '';
        }, 600);
    }
}

// Global navigation functions (for HTML buttons)
function nextSlide() {
    if (window.presentation) {
        window.presentation.nextSlide();
        if (window.progressIndicator) {
            window.progressIndicator.updateProgress();
        }
    }
}

function previousSlide() {
    if (window.presentation) {
        window.presentation.previousSlide();
        if (window.progressIndicator) {
            window.progressIndicator.updateProgress();
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main components
    window.presentation = new PresentationController();
    window.progressIndicator = new ProgressIndicator(window.presentation);
    window.themeController = new ThemeController();
    window.autoSaver = new AutoSaver();
    window.animationController = new AnimationController();
    
    // Override the goToSlide method to update progress
    const originalGoToSlide = window.presentation.goToSlide;
    window.presentation.goToSlide = function(slideNumber) {
        originalGoToSlide.call(this, slideNumber);
        window.progressIndicator.updateProgress();
    };
    
    // Add CSS animations
    const animationStyles = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        @keyframes slideInFromLeft {
            0% { opacity: 0; transform: translateX(-50px); }
            100% { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInFromRight {
            0% { opacity: 0; transform: translateX(50px); }
            100% { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = animationStyles;
    document.head.appendChild(styleSheet);
    
    console.log('🚀 Presentation system initialized!');
    console.log('📝 Controls:');
    console.log('   ← → : Navigate slides');
    console.log('   Space: Next slide');
    console.log('   Home/End: First/Last slide');
    console.log('   Escape: Toggle fullscreen');
    console.log('   Ctrl+P: Print to PDF');

    // Position navigation below the print instructions memo
    function positionNavigationBelowMemo() {
        const memo = document.querySelector('.print-instructions');
        const nav = document.querySelector('.navigation');
        if (!memo || !nav) return;
        const memoRect = memo.getBoundingClientRect();
        const offset = 12; // px spacing below memo
        nav.style.top = `${memoRect.bottom + offset}px`;
        nav.style.right = '1rem';
    }

    positionNavigationBelowMemo();
    window.addEventListener('resize', positionNavigationBelowMemo);
}); 