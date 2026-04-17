/* ============================================================
   NAVIGATION — scroll effect
   ============================================================ */
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('is-scrolled');
  } else {
    nav.classList.remove('is-scrolled');
  }
}, { passive: true });

/* ============================================================
   HERO — parallax on title
   ============================================================ */
const heroTitle = document.querySelector('.hero__title-block');

if (heroTitle) {
  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    if (sy < window.innerHeight * 1.2) {
      heroTitle.style.transform = `translateY(${sy * 0.22}px)`;
      heroTitle.style.opacity = 1 - sy / (window.innerHeight * 0.85);
    }
  }, { passive: true });
}

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.dataset.delay || '0', 10);
      setTimeout(() => {
        entry.target.classList.add('is-visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.08,
  rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach(el => revealObserver.observe(el));

/* ============================================================
   PROJECT CARDS — staggered reveal
   ============================================================ */
const cards = document.querySelectorAll('.project-card');

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const idx = Array.from(cards).indexOf(entry.target);
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, idx * 100);
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

cards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(32px)';
  card.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
  cardObserver.observe(card);
});

/* ============================================================
   SKILL BARS ANIMATION
   ============================================================ */
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-animated');
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

skillFills.forEach(fill => skillObserver.observe(fill));

/* ============================================================
   TESTIMONIALS SLIDER
   ============================================================ */
const testimonials = document.querySelectorAll('.testimonial');
const dots         = document.querySelectorAll('.t-dot');
let current = 0;
let autoTimer;

function showTestimonial(idx) {
  testimonials.forEach(t => t.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  testimonials[idx].classList.add('active');
  dots[idx].classList.add('active');
  current = idx;
}

function next() {
  showTestimonial((current + 1) % testimonials.length);
}

function prev() {
  showTestimonial((current - 1 + testimonials.length) % testimonials.length);
}

function startAuto() {
  autoTimer = setInterval(next, 5500);
}

function resetAuto() {
  clearInterval(autoTimer);
  startAuto();
}

document.querySelector('.t-next')?.addEventListener('click', () => { next(); resetAuto(); });
document.querySelector('.t-prev')?.addEventListener('click', () => { prev(); resetAuto(); });

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => { showTestimonial(i); resetAuto(); });
});

startAuto();

// Swipe support
let touchStartX = 0;
document.querySelector('.testimonials__track')?.addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
}, { passive: true });

document.querySelector('.testimonials__track')?.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 50) {
    dx < 0 ? next() : prev();
    resetAuto();
  }
}, { passive: true });

/* ============================================================
   MAGNETIC BUTTON — btn-primary
   ============================================================ */
const btnPrimary = document.querySelector('.btn-primary');

if (btnPrimary && window.matchMedia('(hover: hover)').matches) {
  btnPrimary.addEventListener('mousemove', (e) => {
    const rect = btnPrimary.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.28;
    const dy = (e.clientY - cy) * 0.28;
    btnPrimary.style.transform = `translate(${dx}px, ${dy}px)`;
  });

  btnPrimary.addEventListener('mouseleave', () => {
    btnPrimary.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), color 0.35s ease';
    btnPrimary.style.transform = 'translate(0, 0)';
    setTimeout(() => {
      btnPrimary.style.transition = '';
    }, 500);
  });
}

/* ============================================================
   SMOOTH SCROLL for anchor links
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ============================================================
   CONTACT HEADING — subtle split on hover
   ============================================================ */
const contactHeading = document.querySelector('.contact__heading');
if (contactHeading) {
  contactHeading.addEventListener('mouseenter', () => {
    contactHeading.style.letterSpacing = '-0.05em';
  });
  contactHeading.addEventListener('mouseleave', () => {
    contactHeading.style.letterSpacing = '-0.04em';
  });
}
