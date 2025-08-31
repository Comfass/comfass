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
    const panel = item.querySelector('.faq-panel');
    const icon = btn.querySelector('svg path');
    if (!btn || !panel) return;

    btn.setAttribute('aria-expanded', open ? 'true' : 'false');

    if (open) {
      panel.style.maxHeight = panel.scrollHeight + 'px';
      // לשנות את האייקון למינוס
      icon.setAttribute("d", "M20 12H4"); 
    } else {
      panel.style.maxHeight = '0px';
      // להחזיר לפלוס
      icon.setAttribute("d", "M12 4v16m8-8H4");
    }
  };

  faqContainer.querySelectorAll('.faq-item').forEach((item) => {
    const btn = item.querySelector('button[aria-controls]');
    btn.addEventListener('click', () => {
      if (openItem && openItem !== item) setOpen(openItem, false);
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      setOpen(item, !isOpen);
      openItem = !isOpen ? item : null;
    });
    setOpen(item, false); // התחל סגור
  });
}
})();
