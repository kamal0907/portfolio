/**
 * Kamal Saini Portfolio - Main Interaction Script
 */

document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initParticles();
    initTyping();
    initScrollEffects();
    initForm();
    initParallax();
});

// --- Custom Cursor ---
function initCursor() {
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cring');
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
    });

    // Smoothing the ring movement
    function animateRing() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        
        ring.style.left = `${ringX}px`;
        ring.style.top = `${ringY}px`;
        
        requestAnimationFrame(animateRing);
    }
    animateRing();

    // Interaction scaling
    const interactables = document.querySelectorAll('a, button, .skill-tag, .project-card, .social-link');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            ring.style.transform = 'translate(-50%, -50%) scale(1.5)';
            ring.style.borderColor = 'var(--accent-secondary)';
            cursor.style.transform = 'translate(-50%, -50%) scale(0.5)';
        });
        el.addEventListener('mouseleave', () => {
            ring.style.transform = 'translate(-50%, -50%) scale(1)';
            ring.style.borderColor = 'var(--border-bright)';
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

// --- Particles Background ---
function initParticles() {
    const canvas = document.getElementById('pc');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    canvas.width = width;
    canvas.height = height;

    window.addEventListener('resize', () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    });

    const particleCount = 60;
    const particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        color: Math.random() > 0.8 ? '0, 212, 255' : '83, 74, 183' // Cyan or Purple
    }));

    function draw() {
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach((p, i) => {
            p.x += p.vx;
            p.y += p.vy;

            // Boundary wrap
            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
            ctx.fill();

            // Draw connections
            for (let j = i + 1; j < particleCount; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(83, 74, 183, ${0.15 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        });

        requestAnimationFrame(draw);
    }
    draw();
}

// --- Typing Effect ---
function initTyping() {
    const phrases = [
        'Associate Backend Developer',
        'Node.js · NestJS · AWS',
        'API Architect',
        'AWS Certified AI Practitioner',
        'Building Scalable Systems'
    ];
    
    const target = document.getElementById('tt');
    if (!target) return;

    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    function type() {
        const currentPhrase = phrases[phraseIdx];
        
        if (!isDeleting) {
            target.textContent = currentPhrase.substring(0, charIdx + 1);
            charIdx++;
            
            if (charIdx === currentPhrase.length) {
                isDeleting = true;
                setTimeout(type, 2000); // Wait at end
                return;
            }
        } else {
            target.textContent = currentPhrase.substring(0, charIdx - 1);
            charIdx--;
            
            if (charIdx === 0) {
                isDeleting = false;
                phraseIdx = (phraseIdx + 1) % phrases.length;
            }
        }
        
        const speed = isDeleting ? 40 : 80;
        setTimeout(type, speed);
    }
    
    type();
}

// --- Scroll Effects (Reveal & Nav) ---
function initScrollEffects() {
    // Nav state
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Intersection Observer for reveals
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal, .titem, .stat-card, .project-card, .skill-tag').forEach(el => {
        observer.observe(el);
    });

    // Stagger delays for stats and skills
    document.querySelectorAll('.stat-card').forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.1}s`;
    });
    
    document.querySelectorAll('.skill-tag').forEach((el, i) => {
        el.style.transitionDelay = `${(i % 5) * 0.05}s`;
    });
}

// --- Parallax Effect ---
function initParallax() {
    document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        
        const codeBlock = document.querySelector('.hero-code');
        if (codeBlock) {
            codeBlock.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });
}

// --- Form Handling ---
function initForm() {
    const form = document.getElementById('cf');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = form.querySelector('.btn-submit');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<span>Sending...</span>';
        btn.style.pointerEvents = 'none';

        // Simulate API call
        setTimeout(() => {
            btn.innerHTML = '<span>Success ✓</span>';
            btn.style.background = 'var(--accent-secondary)';
            btn.style.borderColor = 'var(--accent-secondary)';
            
            form.reset();
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.style.borderColor = '';
                btn.style.pointerEvents = 'auto';
            }, 3000);
        }, 1500);
    });
}
