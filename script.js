  
        document.addEventListener('DOMContentLoaded', function() {
          
            const cursor = document.getElementById('neonCursor');
            document.addEventListener('mousemove', (e) => {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
            });
            
             document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });
            
            function animateCounter(element, target) {
                let current = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        element.textContent = target.toFixed(1);
                        clearInterval(timer);
                    } else {
                        element.textContent = current.toFixed(1);
                    }
                }, 20);
            }
            
             const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                       
                        const statValues = entry.target.querySelectorAll('.stat-value[data-target]');
                        statValues.forEach(stat => {
                            const target = parseFloat(stat.getAttribute('data-target'));
                            if (!stat.classList.contains('animated')) {
                                animateCounter(stat, target);
                                stat.classList.add('animated');
                            }
                        });
                     
                        entry.target.classList.add('quantum-visible');
                    }
                });
            }, { threshold: 0.3 });
             
            document.querySelectorAll('.quantum-section').forEach(section => {
                observer.observe(section);
            });
     
            const navLinks = document.querySelectorAll('.nav-link');
            const sections = document.querySelectorAll('.quantum-section, .quantum-hero');
            
            function setActiveNavLink() {
                let current = '';
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop - 100;
                    const sectionHeight = section.clientHeight;
                    
                    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                        current = section.getAttribute('id');
                    }
                });
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${current}`) {
                        link.classList.add('active');
                    }
                });
            }
            
            window.addEventListener('scroll', setActiveNavLink);
     
            const cyberButtons = document.querySelectorAll('.cyber-button');
            cyberButtons.forEach(button => {
                button.addEventListener('mouseenter', function() {
                    this.style.boxShadow = '0 0 30px rgba(200, 169, 81, 0.6)';
                });
                
                button.addEventListener('mouseleave', function() {
                    this.style.boxShadow = '';
                });
            });
            
      
            const contactForm = document.querySelector('.contact-form-neo');
            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                     const button = this.querySelector('.cyber-button');
                    const originalText = button.innerHTML;
                    
                    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ENVIANDO...';
                    button.style.background = 'var(--neo-primary)';
                    
                    setTimeout(() => {
                        button.innerHTML = '<i class="fas fa-check"></i> MENSAGEM ENVIADA';
                        button.style.background = 'var(--gradient-neo)';
                        
                     
                        this.reset();
                        
                      
                        setTimeout(() => {
                            button.innerHTML = originalText;
                            button.style.background = '';
                        }, 3000);
                    }, 1500);
                });
            }
            
           
            const grid = document.querySelector('.quantum-grid');
            window.addEventListener('mousemove', (e) => {
                const x = (e.clientX / window.innerWidth) * 50;
                const y = (e.clientY / window.innerHeight) * 50;
                grid.style.backgroundPosition = `${x}px ${y}px`;
            });
 
            setActiveNavLink();
        });
   