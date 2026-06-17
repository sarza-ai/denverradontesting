(function () {
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');
  const navLinks = siteNav.querySelectorAll('a');
  const form = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const yearEl = document.getElementById('year');

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  function closeNav() {
    navToggle.classList.remove('is-open');
    siteNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
  }

  navToggle.addEventListener('click', function () {
    const isOpen = siteNav.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  navLinks.forEach(function (link) {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      formStatus.className = 'form-note';
      formStatus.textContent = '';

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        formStatus.className = 'form-note error';
        formStatus.textContent = 'Please fill in all required fields.';
        return;
      }

      const subject = encodeURIComponent('Radon Testing Inquiry from ' + name);
      const body = encodeURIComponent(
        'Name: ' + name + '\n' +
        'Email: ' + email + '\n' +
        'Phone: ' + (form.phone.value.trim() || 'Not provided') + '\n\n' +
        message
      );

      window.location.href = 'mailto:DenverRadonTesting@Gmail.com?subject=' + subject + '&body=' + body;

      formStatus.className = 'form-note success';
      formStatus.textContent = 'Opening your email client. If it did not open, email us at DenverRadonTesting@Gmail.com';
    });
  }
})();
