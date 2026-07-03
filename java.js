const themeToggle = document.getElementById('themeToggle');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  if (themeToggle) {
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro');
  }
  localStorage.setItem('siteTheme', theme);
}

function initThemeToggle() {
  const savedTheme = localStorage.getItem('siteTheme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href');
      if (targetId.length > 1 && document.querySelector(targetId)) {
        event.preventDefault();
        document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  const message = document.getElementById('contactMessage');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.querySelectorAll('input, textarea').forEach((field) => {
        if (!field.checkValidity()) {
          field.classList.add('is-invalid');
        }
      });
      message.textContent = 'Por favor completa todos los campos correctamente.';
      message.className = 'text-danger mt-3';
      return;
    }

    message.textContent = '¡Gracias! Tu mensaje ha sido enviado correctamente.';
    message.className = 'text-success mt-3';
    form.reset();
    form.querySelectorAll('.is-invalid').forEach((field) => field.classList.remove('is-invalid'));
  });

  form.addEventListener('input', (event) => {
    if (event.target.checkValidity()) {
      event.target.classList.remove('is-invalid');
    }
  });
}

function initPortfolioFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.portfolio-card');
  if (!filterButtons.length || !cards.length) return;

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');

      cards.forEach((card) => {
        const category = card.dataset.category;
        card.style.display = filter === 'all' || category === filter ? '' : 'none';
      });
    });
  });
}

function initLightbox() {
  const overlay = document.getElementById('lightboxOverlay');
  const image = document.getElementById('lightboxImage');
  const caption = document.getElementById('lightboxCaption');
  const closeButton = document.querySelector('.lightbox-close');
  if (!overlay || !image || !caption || !closeButton) return;

  document.querySelectorAll('.portfolio-image').forEach((img) => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      const title = img.dataset.title || img.alt || '';
      const price = img.dataset.price ? `Precio: ${img.dataset.price}` : '';
      image.src = img.src;
      image.alt = title;
      caption.textContent = `${title} ${price}`.trim();
      overlay.classList.remove('d-none');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    overlay.classList.add('d-none');
    document.body.style.overflow = '';
  }

  closeButton.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
      closeLightbox();
    }
  });
}

function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('.animate-on-scroll').forEach((section) => observer.observe(section));
}

window.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initSmoothScroll();
  initContactForm();
  initPortfolioFilters();
  initLightbox();
  initScrollReveal();
});
