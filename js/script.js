        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        const mobileMenu = document.getElementById('mobileMenu');
        const navLinks = document.getElementById('navLinks');
        
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });

        // Smooth scroll
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

        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                    }, index * 100);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Form submission
        const contactForm = document.getElementById('contactForm');
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.style.background = 'rgba(200, 169, 81, 0.5)';
            
            // Simulate form submission
            setTimeout(() => {
                alert('✅ Obrigado pelo seu contacto! Entraremos em contacto em breve.');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
            }, 1500);
        });

        // Newsletter form submission
        const newsletterForm = document.getElementById('newsletterForm');
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = newsletterForm.querySelector('.newsletter-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Inscrevendo...';
            submitBtn.style.background = 'rgba(200, 169, 81, 0.5)';
            
            // Simulate newsletter subscription
            setTimeout(() => {
                alert('✅ Obrigado por se inscrever! Você receberá nossos melhores conteúdos.');
                newsletterForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
            }, 1500);
        });

        // Pricing card interactions
        const pricingCards = document.querySelectorAll('.pricing-card');
        pricingCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.boxShadow = '0 25px 70px rgba(200, 169, 81, 0.25)';
            });
            card.addEventListener('mouseleave', function() {
                if (!this.classList.contains('featured')) {
                    this.style.boxShadow = '';
                }
            });
        });

        // Parallax effect
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero && scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${scrolled * 0.3}px)`;
                hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.3;
            }
        });

        // Animate counter for stats
        function animateCounter(element) {
            const target = parseFloat(element.getAttribute('data-target'));
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    element.textContent = target + '%';
                    clearInterval(timer);
                } else {
                    element.textContent = current.toFixed(1) + '%';
                }
            }, 20);
        }

        // Trigger counter animation when hero card is visible
        const heroCard = document.querySelector('.hero-card');
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.querySelectorAll('[data-target]').forEach(el => {
                        animateCounter(el);
                    });
                    heroObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        if (heroCard) {
            heroObserver.observe(heroCard);
        }

        // Add hover effect to feature cards
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-15px) scale(1.02)';
            });
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });

        // Add interactive effect to mission-vision cards
        const mvCards = document.querySelectorAll('.mv-card');
        mvCards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px)`;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });

        // Add ripple effect to buttons
        document.querySelectorAll('.cta-button, .submit-btn').forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });

        // Smooth reveal on page load
        window.addEventListener('load', () => {
            document.body.style.opacity = '1';
            
            // Animate hero elements sequentially
            const heroElements = document.querySelectorAll('.hero-text h1, .hero-text p, .cta-button');
            heroElements.forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 200);
            });
        });

        // Add scroll indicator
        let lastScrollTop = 0;
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollPercent = (scrollTop / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            
            // You could add a progress bar here if desired
            lastScrollTop = scrollTop;
        }, false);