document.addEventListener('DOMContentLoaded', () => {
    // 1. Loading Animation
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }, 1000);
    }

    // 2. Playful Sound Interaction (Meow)
    const meowSound = document.getElementById('meow-sound');
    const playMeow = () => {
        if (meowSound) {
            meowSound.currentTime = 0;
            // Catch required because browsers may block autoplay audio before interaction
            meowSound.play().catch(e => console.log("Audio play prevented by browser till interacted:", e));
        }
    };
    
    // Play meow on logo click
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', playMeow);
    }

    // 3. Mobile Navigation Toggle
    const burgerMenu = document.getElementById('burger-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (burgerMenu && navLinks) {
        burgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            burgerMenu.classList.toggle('toggle');
        });

        // Close mobile menu when link clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    burgerMenu.classList.remove('toggle');
                }
            });
        });
    }

    // 4. Dark Mode Toggle
    const darkModeBtn = document.getElementById('dark-mode-toggle');
    const body = document.body;

    // Check local storage for theme
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        if(darkModeBtn) darkModeBtn.textContent = '☀️';
    }

    if (darkModeBtn) {
        darkModeBtn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
            darkModeBtn.textContent = isDark ? '☀️' : '🌙';
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    // 5. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 6. Interactive Menu Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active classes
                tabBtns.forEach(b => b.classList.remove('active'));
                tabPanes.forEach(p => p.classList.remove('active'));

                // Add active class to clicked
                btn.classList.add('active');
                const targetPane = document.getElementById(btn.getAttribute('data-tab'));
                if (targetPane) {
                    targetPane.classList.add('active');
                    // Retrigger animation
                    targetPane.style.animation = 'none';
                    targetPane.offsetHeight; /* trigger reflow */
                    targetPane.style.animation = null;
                }
            });
        });
    }

    // 7. Scroll Animations (Fade-in Sections)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });

    // 8. Toast Notification System
    const showToast = (message, type = 'success') => {
        const toast = document.getElementById('toast');
        if (!toast) return;
        toast.textContent = message;
        toast.className = `toast show ${type}`;
        setTimeout(() => {
            toast.className = toast.className.replace('show', '');
        }, 3000);
    };

    // 9. Forms Submission Handling
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = bookingForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'Booking...';
            btn.disabled = true;

            setTimeout(() => {
                showToast('Booking confirmed! We can\'t wait to see you! 🐾');
                bookingForm.reset();
                btn.textContent = originalText;
                btn.disabled = false;
                playMeow();
            }, 1000);
        });
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                showToast('Message sent! We will purr back at you soon.', 'success');
                contactForm.reset();
                btn.textContent = originalText;
                btn.disabled = false;
            }, 1000);
        });
    }

    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Subscribed to the Mew-sletter! 💌');
            newsletterForm.reset();
        });
    }

    // 10. Match Me With A Cat Feature
    const matchMeBtn = document.getElementById('match-me-btn');
    const matchResult = document.getElementById('cat-match-result');
    const catsAndMoods = [
        { name: 'Oliver', trait: 'Chill & Quiet, loves naps.' },
        { name: 'Luna', trait: 'Playful & Energetic gymnast.' },
        { name: 'Milo', trait: 'Needy, vocal, wants treats.' },
        { name: 'Bella', trait: 'Gentle observer, very sweet.' }
    ];

    if (matchMeBtn && matchResult) {
        matchMeBtn.addEventListener('click', () => {
            matchMeBtn.textContent = 'Finding... 🎲';
            
            setTimeout(() => {
                const randomCat = catsAndMoods[Math.floor(Math.random() * catsAndMoods.length)];
                matchResult.innerHTML = `<strong>Purr-fect Match!</strong><br>You've been matched with <em>${randomCat.name}</em> (${randomCat.trait})`;
                matchResult.classList.remove('hidden');
                matchResult.style.display = 'block';
                matchResult.style.animation = 'bounceIn 0.5s ease';
                matchMeBtn.textContent = '🎲 Match Me with a Cat';
                playMeow();
            }, 800);
        });
    }
});
