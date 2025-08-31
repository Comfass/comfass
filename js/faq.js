// app.js — root

(function () {
  const faqContainer = document.getElementById('faq-accordion');
  if (!faqContainer) return;

  // Load the external FAQ HTML that sits at the project root: /faq.html
  fetch('/faq.html', { cache: 'no-cache' })
    .then(r => r.text())
    .then(html => {
      faqContainer.innerHTML = html;
      initAccordion();
    })
    .catch(err => {
      console.error('Failed to load FAQ:', err);
    });

  function initAccordion() {
    let openItem = null;

    const setOpen = (item, open) => {
      const btn = item.querySelector('button[aria-controls]');
      const panel = item.querySelector('[role="region"]');
      if (!btn || !panel) return;
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      panel.style.gridTemplateRows = open ? '1fr' : '0fr';
      const chev = btn.querySelector('svg');
      if (chev) chev.style.transform = open ? 'rotate(180deg)' : 'rotate(0deg)';
    };

    // Start closed, open only what user clicks. One open item at a time.
    faqContainer.querySelectorAll('.faq-item').forEach((item) => {
      const btn = item.querySelector('button[aria-controls]');
      btn.addEventListener('click', () => {
        if (openItem && openItem !== item) setOpen(openItem, false);
        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        setOpen(item, !isOpen);
        openItem = !isOpen ? item : null;
      });
      setOpen(item, false);
    });
  }
})();
