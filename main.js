/* ==========================================================================
   TOHEED HASHIM - PORTFOLIO INTERACTIVITY SCRIPT (main.js)
   Features:
   - Dynamic Role Typer
   - Smooth Interactive Custom Cursor (Desktop Only)
   - Ambient Interactive Constellation Canvas
   - Sticky Nav & Active Section ScrollSpy
   - Mobile Nav Toggle
   - One-Click Email Copy with Toast Alert
   - Interactive Contact Form with Validation
   - Scroll-To-Top Trigger
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------
     1. TYPED ROLE ANIMATION
     --------------------------------------------------------- */
  const typedRoleElement = document.getElementById('typedRole');
  if (typedRoleElement) {
    const roles = [
      'Frontend Development Specialist',
      'Aspiring Software Engineer',
      'UI/UX & Responsive Web Craftsman',
      'AI-Powered Code Innovator'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    function typeRole() {
      const currentRole = roles[roleIndex];
      
      if (isDeleting) {
        typedRoleElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
      } else {
        typedRoleElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 90;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        // Pause at full word
        isDeleting = true;
        typingSpeed = 1800;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400;
      }

      setTimeout(typeRole, typingSpeed);
    }
    typeRole();
  }

  /* ---------------------------------------------------------
     2. STICKY NAVBAR & MOBILE MENU
     --------------------------------------------------------- */
  const navbar = document.querySelector('.navbar');
  const hamburger = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky style on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll to Top Button Visibility
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }
  });

  // Mobile menu toggle
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('open');
    });

    // Close menu when clicking link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
      });
    });
  }

  /* ---------------------------------------------------------
     3. SCROLLSPY (ACTIVE SECTION HIGHLIGHT)
     --------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

      if (targetNavLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach(link => link.classList.remove('active'));
          targetNavLink.classList.add('active');
        }
      }
    });
  }
  window.addEventListener('scroll', highlightNavOnScroll);

  /* ---------------------------------------------------------
     4. SCROLL TO TOP TRIGGER
     --------------------------------------------------------- */
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ---------------------------------------------------------
     5. TOAST NOTIFICATION UTILITY
     --------------------------------------------------------- */
  const toast = document.getElementById('toastMsg');
  function showToast(message) {
    if (!toast) return;
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #10b981;"></i> ${message}`;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  /* ---------------------------------------------------------
     6. ONE-CLICK EMAIL COPY
     --------------------------------------------------------- */
  const copyEmailBtns = document.querySelectorAll('.copy-email-btn');
  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-email') || 'toheedhashim90@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Copied to clipboard: ${email}`);
      }).catch(() => {
        showToast(`Email: ${email}`);
      });
    });
  });

  /* ---------------------------------------------------------
     7. CONTACT FORM SUBMISSION (INTERACTIVE)
     --------------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('.btn-submit');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending Message...`;
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = `<i class="fa-solid fa-check"></i> Message Dispatched!`;
        submitBtn.style.background = '#10b981';
        showToast('Thank you! Your message was sent successfully.');
        contactForm.reset();

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 3000);
      }, 1200);
    });
  }

  /* ---------------------------------------------------------
     8. CUSTOM CURSOR (FLUID TRAIL & HOVER EFFECT)
     --------------------------------------------------------- */
  const cursor = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');

  // Only run cursor on pointer (non-touch) devices
  if (cursor && cursorRing && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
    });

    function animateCursorRing() {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;

      requestAnimationFrame(animateCursorRing);
    }
    animateCursorRing();

    // Hover effect on interactable elements
    const interactives = document.querySelectorAll('a, button, input, textarea, .skill-card, .project-card, .highlight-box');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('hovered'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('hovered'));
    });
  }

  /* ---------------------------------------------------------
     9. AMBIENT CONSTELLATION / PARTICLES CANVAS
     --------------------------------------------------------- */
  const canvas = document.getElementById('ambientCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    });

    const particles = [];
    const particleCount = Math.min(Math.floor((width * height) / 22000), 55);

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.radius = Math.random() * 1.8 + 0.8;
        this.color = Math.random() > 0.4 ? 'rgba(245, 174, 126, ' : 'rgba(56, 189, 248, ';
        this.alpha = Math.random() * 0.4 + 0.15;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color + this.alpha + ')';
        ctx.fill();
      }
    }

    function initParticles() {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }
    initParticles();

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(245, 174, 126, ${0.12 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  /* ---------------------------------------------------------
     10. SCROLL REVEAL OBSERVER & METRICS COUNT-UP
     --------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-zoom');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  /* ---------------------------------------------------------
     11. MOUSE SPOTLIGHT (TORCH LIGHT)
     --------------------------------------------------------- */
  let spotlight = document.getElementById('mouseSpotlight');
  if (!spotlight && window.matchMedia('(pointer: fine)').matches) {
    spotlight = document.createElement('div');
    spotlight.id = 'mouseSpotlight';
    document.body.appendChild(spotlight);

    window.addEventListener('mousemove', (e) => {
      spotlight.style.left = `${e.clientX}px`;
      spotlight.style.top = `${e.clientY}px`;
    });
  }

  /* ---------------------------------------------------------
     12. 3D TILT WITH SPECULAR GLARE (CARDS & AVATAR)
     --------------------------------------------------------- */
  if (window.matchMedia('(pointer: fine)').matches) {
    const tiltTargets = document.querySelectorAll('.skill-card, .project-card, .about-code-window, .highlight-box, .contact-card, .ai-edge-card, .timeline-card');
    
    tiltTargets.forEach(card => {
      card.classList.add('tilt-card');
      
      // Inject glare layer if not present
      if (!card.querySelector('.tilt-glare')) {
        const glare = document.createElement('div');
        glare.className = 'tilt-glare';
        card.appendChild(glare);
      }

      const glare = card.querySelector('.tilt-glare');

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = -((y - centerY) / centerY) * 8; // Max 8 deg
        const rotateY = ((x - centerX) / centerX) * 8;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

        if (glare) {
          glare.style.opacity = '1';
          glare.style.background = `radial-gradient(circle at ${(x / rect.width) * 100}% ${(y / rect.height) * 100}%, rgba(255, 255, 255, 0.22) 0%, transparent 60%)`;
        }
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        if (glare) {
          glare.style.opacity = '0';
        }
      });
    });
  }

  /* ---------------------------------------------------------
     13. CLICK FIREWORKS & SHOCKWAVE SPARKS
     --------------------------------------------------------- */
  window.addEventListener('click', (e) => {
    // 1. Shockwave Ripple
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    document.body.appendChild(ripple);

    setTimeout(() => ripple.remove(), 700);

    // 2. Radiant Sparks
    const sparkCount = 7;
    for (let i = 0; i < sparkCount; i++) {
      const spark = document.createElement('div');
      spark.className = 'click-spark';
      spark.style.left = `${e.clientX}px`;
      spark.style.top = `${e.clientY}px`;

      const angle = (Math.PI * 2 / sparkCount) * i;
      const distance = Math.random() * 45 + 30;
      const dx = Math.cos(angle) * distance + 'px';
      const dy = Math.sin(angle) * distance + 'px';

      spark.style.setProperty('--dx', dx);
      spark.style.setProperty('--dy', dy);

      if (i % 2 === 0) {
        spark.style.background = '#06b6d4';
        spark.style.boxShadow = '0 0 10px #06b6d4';
      }

      document.body.appendChild(spark);
      setTimeout(() => spark.remove(), 600);
    }
  });

  /* ---------------------------------------------------------
     14. MAGNETIC BUTTONS (SUBTLE CURSOR PULL)
     --------------------------------------------------------- */
  if (window.matchMedia('(pointer: fine)').matches) {
    const magneticBtns = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-hire, .floating-whatsapp, .brand-logo');
    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0px, 0px)';
      });
    });
  }

});


