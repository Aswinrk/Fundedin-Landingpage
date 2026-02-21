// Animation removed as per user request.
// This file is intentionally left empty for future logic.

document.addEventListener('DOMContentLoaded', () => {
    // FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                }
            });

            // Toggle current item
            item.classList.toggle('active');
            const answer = item.querySelector('.faq-answer');
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = null;
            }
        });
    });

    // Cinematic Slider Logic
    class CinematicSlider {
        constructor() {
            this.slides = document.querySelectorAll('.slider-bg');
            this.navItems = document.querySelectorAll('.nav-item');
            this.progressBar = document.querySelector('.progress-bar');
            this.currentIndex = 0;
            this.intervalTime = 6000; // 6 seconds
            this.timer = null;
            this.startTime = null;
            this.animationFrame = null;

            this.init();
        }

        init() {
            // Start the first slide
            this.startSlideTimer();

            // Add click event listeners to nav items
            this.navItems.forEach(item => {
                item.addEventListener('click', () => {
                    const index = parseInt(item.dataset.index);
                    if (index !== this.currentIndex) {
                        this.switchSlide(index);
                    }
                });
            });
        }

        switchSlide(index) {
            // Clear existing timer and animation
            this.stopSlideTimer();

            // Update slides
            this.slides[this.currentIndex].classList.remove('active');
            this.slides[index].classList.add('active');

            // Update nav items
            this.navItems[this.currentIndex].classList.remove('active');
            this.navItems[index].classList.add('active');

            // Update current index
            this.currentIndex = index;

            // Restart timer
            this.startSlideTimer();
        }

        nextSlide() {
            const nextIndex = (this.currentIndex + 1) % this.slides.length;
            this.switchSlide(nextIndex);
        }

        startSlideTimer() {
            this.startTime = Date.now();
            this.timer = setTimeout(() => {
                this.nextSlide();
            }, this.intervalTime);

            this.animateProgressBar();
        }

        stopSlideTimer() {
            clearTimeout(this.timer);
            cancelAnimationFrame(this.animationFrame);
            this.progressBar.style.width = '0%';
        }

        animateProgressBar() {
            const updateProgress = () => {
                const elapsedTime = Date.now() - this.startTime;
                const progress = Math.min((elapsedTime / this.intervalTime) * 100, 100);
                this.progressBar.style.width = `${progress}%`;

                if (elapsedTime < this.intervalTime) {
                    this.animationFrame = requestAnimationFrame(updateProgress);
                }
            };

            this.animationFrame = requestAnimationFrame(updateProgress);
        }
    }

    // Initialize Slider
    new CinematicSlider();

    // Mobile Menu Logic
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const header = document.querySelector('.main-header');

    if (mobileBtn && header) {
        mobileBtn.addEventListener('click', () => {
            header.classList.toggle('menu-open');
            // Prevent scrolling when menu is open
            document.body.style.overflow = header.classList.contains('menu-open') ? 'hidden' : '';
        });

        // Close menu when clicking a link
        const navLinks = document.querySelectorAll('.nav-link, .header-cta, .login-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                header.classList.remove('menu-open');
                document.body.style.overflow = '';
            });
        });
    }
});
