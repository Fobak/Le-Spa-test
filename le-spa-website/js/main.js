/* ============================================================
   LE SPA – Main JavaScript
   Navigation, Scroll-Effekte, Animationen
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Navigation ---
  const hamburger = document.querySelector('.hamburger');
  const navMain = document.querySelector('.nav-main');
  const navOverlay = document.querySelector('.nav-overlay');
  const body = document.body;

  function toggleNav() {
    hamburger.classList.toggle('active');
    navMain.classList.toggle('open');
    navOverlay.classList.toggle('active');
    body.classList.toggle('nav-open');
  }

  function closeNav() {
    hamburger.classList.remove('active');
    navMain.classList.remove('open');
    navOverlay.classList.remove('active');
    body.classList.remove('nav-open');
  }

  if (hamburger) {
    hamburger.addEventListener('click', toggleNav);
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', closeNav);
  }

  // Close nav on link click (mobile)
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 968) {
        closeNav();
      }
    });
  });


  // --- Mobile Dropdown Toggle ---
  document.querySelectorAll('.nav-item.has-dropdown').forEach(item => {
    const link = item.querySelector('.nav-link');
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 968) {
        e.preventDefault();
        item.classList.toggle('dropdown-open');
      }
    });
  });


  // --- Header Scroll Effect ---
  const header = document.querySelector('.site-header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });


  // --- Scroll-to-Top Button ---
  const scrollTopBtn = document.querySelector('.scroll-top');

  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  // --- Scroll Animations (Intersection Observer) ---
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  if (animatedElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
  }


  // --- Active Navigation Link ---
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPath.startsWith(href) && href !== '/') {
      link.classList.add('active');
    } else if (href === '/' && currentPath === '/') {
      link.classList.add('active');
    }
  });


  // --- Simple Contact Form Validation ---
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const requiredFields = contactForm.querySelectorAll('[required]');
      let isValid = true;

      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = 'var(--color-rose)';
          isValid = false;
        } else {
          field.style.borderColor = '';
        }
      });

      if (isValid) {
        // Hier könnte eine echte Form-Submission stehen (z.B. per fetch)
        alert('Vielen Dank für Ihre Nachricht! Wir melden uns schnellstmöglich bei Ihnen.');
        contactForm.reset();
      }
    });
  }

});
