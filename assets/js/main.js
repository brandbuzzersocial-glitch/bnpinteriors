/* ============================================================
   ANTRA – Architecture & Interior Design
   Enhanced JavaScript: Animations, Scroll Effects & Micro-Interactions
   ============================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // ---- Page Loader -------------------------------------------
  const loader = document.getElementById('page-loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('hidden'), 500);
    });
    // Fallback if load already fired
    if (document.readyState === 'complete') {
      setTimeout(() => loader.classList.add('hidden'), 500);
    }
  }

  // ---- Header Scroll Behaviour --------------------------------
  const header = document.getElementById('site-header');
  if (header) {
    const updateHeader = () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
  }

  // ---- Mobile Menu Toggle ------------------------------------
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('open');
      menuToggle.classList.toggle('active');
    });

    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        menuToggle.classList.remove('active');
      });
    });
  }

  // ---- Hero Slider --------------------------------------------
  const heroSlider = document.getElementById('hero-slider');
  if (heroSlider) {
    const slides = heroSlider.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    let current = 0;
    let interval;

    const goTo = (index) => {
      slides[current].classList.remove('active');
      if (dots[current]) dots[current].classList.remove('active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('active');
      if (dots[current]) dots[current].classList.add('active');
    };

    const startAuto = () => {
      interval = setInterval(() => goTo(current + 1), 6000);
    };

    const stopAuto = () => clearInterval(interval);

    document.getElementById('hero-next')?.addEventListener('click', () => { stopAuto(); goTo(current + 1); startAuto(); });
    document.getElementById('hero-prev')?.addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto(); });

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { stopAuto(); goTo(i); startAuto(); });
    });

    startAuto();
  }

  // ---- Services Tabs ------------------------------------------
  const tabNav = document.getElementById('services-tab-nav');
  const tabContent = document.getElementById('services-tab-content');
  if (tabNav && tabContent) {
    const tabBtns = tabNav.querySelectorAll('.tab-btn');
    const tabPanels = tabContent.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.tab, 10);
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        if (tabPanels[idx]) {
          tabPanels[idx].classList.add('active');
        }
      });
    });
  }

  // ---- Projects Filter ----------------------------------------
  const filterNav = document.getElementById('projects-filter');
  const projectsGrid = document.getElementById('projects-grid');
  if (filterNav && projectsGrid) {
    const filterBtns = filterNav.querySelectorAll('.filter-btn');
    const cards = projectsGrid.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        cards.forEach(card => {
          if (filter === 'all' || card.dataset.cat === filter) {
            card.style.display = '';
            card.style.animation = 'tabFadeIn 0.4s ease forwards';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ---- Testimonials Slider ------------------------------------
  const testSlider = document.getElementById('testimonials-slider');
  if (testSlider) {
    const cards = testSlider.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.test-dot');
    let testCurrent = 0;

    const goTest = (index) => {
      cards[testCurrent].classList.remove('active');
      if (dots[testCurrent]) dots[testCurrent].classList.remove('active');
      testCurrent = (index + cards.length) % cards.length;
      cards[testCurrent].classList.add('active');
      if (dots[testCurrent]) dots[testCurrent].classList.add('active');
    };

    document.getElementById('test-next')?.addEventListener('click', () => goTest(testCurrent + 1));
    document.getElementById('test-prev')?.addEventListener('click', () => goTest(testCurrent - 1));

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => goTest(i));
    });

    setInterval(() => goTest(testCurrent + 1), 6000);
  }

  // ---- Scroll to Top ------------------------------------------
  const scrollTopBtn = document.getElementById('scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Scroll Animation Observer -----------------------------
  const scrollAnimObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.classList.add('in-view');

        // Trigger counter animation if element is a stat value
        if (el.classList.contains('stat-value') && !el.classList.contains('counted')) {
          el.classList.add('counted');
          animateCounter(el);
        }

        // Trigger skill bar animation
        if (el.classList.contains('skills-bars')) {
          el.querySelectorAll('.skill-bar-fill').forEach(bar => {
            bar.classList.add('animate');
          });
        }

        scrollAnimObserver.unobserve(el);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  // Observe all animated targets
  document.querySelectorAll('[data-anim], [data-anim-stagger], .stat-value, .skills-bars, .text-reveal, .line-draw').forEach(el => {
    scrollAnimObserver.observe(el);
  });

  // ---- Counter Animation Function -----------------------------
  function animateCounter(el) {
    const rawVal = el.dataset.target || el.textContent;
    const target = parseInt(rawVal, 10);
    if (isNaN(target)) return;

    const duration = 2000;
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Ease out expo
      const current = Math.floor(target * (1 - Math.pow(2, -10 * progress)));
      el.textContent = current;

      if (frame >= totalFrames) {
        el.textContent = target;
        clearInterval(timer);
      }
    }, frameRate);
  }

  // ---- Scroll Parallax Effect for Banner & Hero Backgrounds --
  const parallaxImages = document.querySelectorAll('.cta-section, .page-hero');
  if (parallaxImages.length > 0 && window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
      const pageTop = window.scrollY;
      parallaxImages.forEach(sec => {
        const speed = 0.35;
        const rect = sec.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const yPos = -(pageTop * speed);
          sec.style.backgroundPositionY = `calc(50% + ${yPos}px)`;
        }
      });
    }, { passive: true });
  }

  // ---- Lightbox for Gallery & Portfolio Images ---------------
  const galleryItems = document.querySelectorAll('.gallery-strip-item img, .project-img-wrap img, .about-img-main img');
  galleryItems.forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => openLightbox(img.src, img.alt));
  });

  function openLightbox(src, alt) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed; inset: 0; background: rgba(17,17,18,0.94); z-index: 99999;
      display: flex; align-items: center; justify-content: center; cursor: pointer;
      backdrop-filter: blur(10px); animation: tabFadeIn 0.3s ease;
    `;
    const image = document.createElement('img');
    image.src = src;
    image.alt = alt || '';
    image.style.cssText = 'max-width: 90vw; max-height: 88vh; object-fit: contain; border-radius: 8px; box-shadow: 0 20px 60px rgba(0,0,0,0.5);';

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    closeBtn.style.cssText = `
      position: absolute; top: 24px; right: 32px; background: none; border: none;
      color: #fff; font-size: 2.2rem; cursor: pointer; opacity: 0.8; transition: opacity 0.2s;
    `;
    closeBtn.addEventListener('mouseenter', () => closeBtn.style.opacity = '1');
    closeBtn.addEventListener('mouseleave', () => closeBtn.style.opacity = '0.8');
    closeBtn.addEventListener('click', () => document.body.removeChild(overlay));

    overlay.appendChild(image);
    overlay.appendChild(closeBtn);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) document.body.removeChild(overlay); });
    document.body.appendChild(overlay);

    document.addEventListener('keydown', function esc(e) {
      if (e.key === 'Escape' && document.body.contains(overlay)) {
        document.body.removeChild(overlay);
        document.removeEventListener('keydown', esc);
      }
    });
  }

  // ---- Active Menu Link Highlighting ------------------------
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ---- Form Submission Feedback ------------------------------
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');
      const btn = newsletterForm.querySelector('button');
      if (input && input.value) {
        const origText = btn.textContent;
        btn.textContent = '✓ Subscribed!';
        btn.style.background = '#caa05c';
        btn.style.borderColor = '#caa05c';
        btn.style.color = '#1c1c1d';
        input.value = '';
        setTimeout(() => {
          btn.textContent = origText;
          btn.style.background = '';
          btn.style.borderColor = '';
          btn.style.color = '';
        }, 3000);
      }
    });
  }

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      if (btn) {
        const origText = btn.innerHTML;
        btn.innerHTML = '✓ Message Sent Successfully!';
        btn.style.background = '#caa05c';
        btn.style.borderColor = '#caa05c';
        btn.style.color = '#1c1c1d';
        setTimeout(() => {
          btn.innerHTML = origText;
          btn.style.background = '';
          btn.style.borderColor = '';
          btn.style.color = '';
          contactForm.reset();
        }, 3500);
      }
    });
  }

});
