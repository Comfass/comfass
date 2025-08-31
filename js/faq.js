// app.js — root
(function () {
  const faqContainer = document.getElementById('faq-accordion');
  if (!faqContainer) return;

  // אם האתר לא נטען מהשורש, זה ימנע 404
  const faqUrl = './faq.html';

  fetch(faqUrl, { cache: 'no-cache' })
    .then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); })
    .then(html => {
      faqContainer.innerHTML = html;
      initAccordion(faqContainer);
    })
    .catch(err => console.error('Failed to load FAQ:', err));

  function initAccordion(root) {
    let openItem = null;

    root.querySelectorAll('.faq-item').forEach((item) => {
      const btn   = item.querySelector('button[aria-controls]');
      const panel = item.querySelector('.faq-panel');
      if (!btn || !panel) return;

      const iconPath = btn.querySelector('svg path'); // ייתכן שאין – נבדוק לפני שימוש

      const setOpen = (open) => {
        btn.setAttribute('aria-expanded', String(open));
        panel.style.maxHeight = open ? panel.scrollHeight + 'px' : '0px';

        // עדכון האייקון רק אם יש path
        if (iconPath) {
          // פתוח = מינוס; סגור = פלוס
          iconPath.setAttribute('d', open ? 'M20 12H4' : 'M12 4v16M20 12H4');
        }
      };

      btn.addEventListener('click', () => {
        // סגור את הפריט הפתוח הקודם
        if (openItem && openItem !== item) {
          const prevBtn   = openItem.querySelector('button[aria-controls]');
          const prevPanel = openItem.querySelector('.faq-panel');
          const prevPath  = prevBtn?.querySelector('svg path');
          if (prevBtn && prevPanel) {
            prevBtn.setAttribute('aria-expanded', 'false');
            prevPanel.style.maxHeight = '0px';
            if (prevPath) prevPath.setAttribute('d', 'M12 4v16M20 12H4');
          }
          openItem = null;
        }

        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        setOpen(!isOpen);
        openItem = !isOpen ? item : null;
      });

      // התחל סגור כברירת מחדל
      btn.setAttribute('aria-expanded', 'false');
      panel.style.maxHeight = '0px';
    });
  }
})();
