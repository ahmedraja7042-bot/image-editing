// Main JavaScript for Portfolio Website
class PortfolioApp {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupTypewriter();
        this.setupParticles();
        this.setupScrollAnimations();
        this.setupCarousel();
        this.setupSkillsChart();
        this.setupCounters();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
    }
    
    // Typewriter Effect for Hero Section
    setupTypewriter() {
        const typed = new Typed('#typed-text', {
            strings: [
                'Professional Image Editor',
                'Visual Storyteller',
                'Digital Artist',
                'Color Grading Expert'
            ],
            typeSpeed: 80,
            backSpeed: 50,
            backDelay: 2000,
            loop: true,
            showCursor: false
        });
    }
    
    // Particle Background Effect
    setupParticles() {
        const canvas = document.getElementById('particleCanvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const particles = [];
        const particleCount = window.innerWidth < 768 ? 30 : 60;
        
        // Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
                this.opacity = Math.random() * 0.5 + 0.2;
            }
            
            update() {
                this.x += this.vx;
                this.y += this.vy;
                
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }
            
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(212, 165, 116, ${this.opacity})`;
                ctx.fill();
            }
        }
        
        // Create particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        
        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            
            // Draw connections
            particles.forEach((particle, i) => {
                particles.slice(i + 1).forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = `rgba(212, 165, 116, ${0.1 * (1 - distance / 100)})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                });
            });
            
            requestAnimationFrame(animate);
        };
        
        animate();
        
        // Resize handler
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
    
    // Scroll Animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    
                    // Animate skill bars
                    if (entry.target.classList.contains('skill-item')) {
                        const skillBar = entry.target.querySelector('.skill-bar');
                        if (skillBar) {
                            const width = skillBar.dataset.width;
                            setTimeout(() => {
                                skillBar.style.width = width;
                            }, 200);
                        }
                    }
                }
            });
        }, observerOptions);
        
        // Observe elements
        document.querySelectorAll('.scroll-reveal, .skill-item').forEach(el => {
            observer.observe(el);
        });
        
        // Hero text animation
        setTimeout(() => {
            document.querySelector('.hero-text').classList.add('visible');
        }, 500);
    }
    
    // Portfolio Carousel
    setupCarousel() {
        const splide = new Splide('#portfolio-carousel', {
            type: 'loop',
            perPage: 3,
            perMove: 1,
            gap: '2rem',
            autoplay: true,
            interval: 4000,
            pauseOnHover: true,
            breakpoints: {
                768: {
                    perPage: 1,
                    gap: '1rem'
                },
                1024: {
                    perPage: 2
                }
            }
        });
        
        splide.mount();
    }
    
    // Skills Radar Chart
    setupSkillsChart() {
        const chartDom = document.getElementById('skillsChart');
        const myChart = echarts.init(chartDom);
        
        const option = {
            title: {
                text: 'Technical Skills',
                left: 'center',
                textStyle: {
                    fontSize: 18,
                    fontWeight: 'bold'
                }
            },
            radar: {
                indicator: [
                    { name: 'Photoshop', max: 100 },
                    { name: 'Lightroom', max: 100 },
                    { name: 'Color Grading', max: 100 },
                    { name: 'Retouching', max: 100 },
                    { name: 'Compositing', max: 100 },
                    { name: 'RAW Processing', max: 100 }
                ],
                radius: '60%',
                axisName: {
                    color: '#666',
                    fontSize: 12
                },
                splitLine: {
                    lineStyle: {
                        color: '#e0e0e0'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#e0e0e0'
                    }
                }
            },
            series: [{
                name: 'Skills',
                type: 'radar',
                data: [{
                    value: [95, 92, 88, 96, 78, 94],
                    name: 'Skill Level',
                    areaStyle: {
                        color: 'rgba(212, 165, 116, 0.3)'
                    },
                    lineStyle: {
                        color: '#d4a574',
                        width: 3
                    },
                    itemStyle: {
                        color: '#d4a574'
                    }
                }]
            }]
        };
        
        myChart.setOption(option);
        
        // Resize handler
        window.addEventListener('resize', () => {
            myChart.resize();
        });
    }
    
    // Animated Counters
    setupCounters() {
        const counters = document.querySelectorAll('.stats-counter');
        
        const animateCounter = (counter) => {
            const target = parseInt(counter.dataset.target);
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current);
            }, 16);
        };
        
        // Trigger counters when visible
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
    
    // Mobile Menu
    setupMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const nav = document.querySelector('nav');
        
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                // Create mobile menu if it doesn't exist
                let mobileMenu = document.getElementById('mobileMenu');
                if (!mobileMenu) {
                    mobileMenu = document.createElement('div');
                    mobileMenu.id = 'mobileMenu';
                    mobileMenu.className = 'md:hidden bg-white border-t';
                    mobileMenu.innerHTML = `
                        <div class="px-6 py-4 space-y-4">
                            <a href="#home" class="block text-gray-700 hover:text-amber-600 transition-colors">Home</a>
                            <a href="portfolio.html" class="block text-gray-700 hover:text-amber-600 transition-colors">Portfolio</a>
                            <a href="about.html" class="block text-gray-700 hover:text-amber-600 transition-colors">About</a>
                            <a href="contact.html" class="block text-gray-700 hover:text-amber-600 transition-colors">Contact</a>
                        </div>
                    `;
                    nav.appendChild(mobileMenu);
                }
                
                mobileMenu.classList.toggle('hidden');
            });
        }
    }
    
    // Smooth Scrolling
    setupSmoothScrolling() {
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
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});

// Additional utility functions
const utils = {
    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function for scroll events
    throttle(func, limit) {
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
};

// Export for use in other files
window.PortfolioApp = PortfolioApp;
window.utils = utils;