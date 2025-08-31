(function () {
  const faqContainer = document.getElementById('faq-accordion');
  if (!faqContainer) return;

  const faqUrl = './faq.html'; // עובד גם מקבצים סטטיים / GitHub Pages

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
      const btn = item.querySelector('button[aria-controls]');
      const panel = item.querySelector('.faq-panel');
      if (!btn || !panel) return;

      const iconPath = btn.querySelector('svg path'); // יכול להיות null

      const setOpen = (open) => {
        btn.setAttribute('aria-expanded', String(open));
        panel.style.maxHeight = open ? panel.scrollHeight + 'px' : '0px';

        // פלוס = שני קווים, מינוס = קו אחד
        if (iconPath) {
          iconPath.setAttribute('d',
            open
              ? 'M4 12 H20'                  // מינוס
              : 'M12 4 V20 M4 12 H20'       // פלוס
          );
        }
      };

      btn.addEventListener('click', () => {
        if (openItem && openItem !== item) {
          const pb = openItem.querySelector('button[aria-controls]');
          const pp = openItem.querySelector('.faq-panel');
          const ip = pb?.querySelector('svg path');
          if (pb && pp) {
            pb.setAttribute('aria-expanded', 'false');
            pp.style.maxHeight = '0px';
            if (ip) ip.setAttribute('d', 'M12 4 V20 M4 12 H20');
          }
          openItem = null;
        }

        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        setOpen(!isOpen);
        openItem = !isOpen ? item : null;
      });

      // מצב התחלתי: סגור
      setOpen(false);
    });
  }
})();
