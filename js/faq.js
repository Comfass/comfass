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
      const btn   = item.querySelector('button[aria-controls]');
      const panel = item.querySelector('.faq-panel');
      if (!btn || !panel) return;

      // יצירת/מציאת אייקון טקסטואלי: ◂ (סגור) / ▾ (פתוח)
      let iconSpan = btn.querySelector('.faq-icon');
      if (!iconSpan) {
        iconSpan = document.createElement('span');
        iconSpan.className = 'faq-icon';
        iconSpan.setAttribute('aria-hidden', 'true');
        iconSpan.style.display = 'inline-block';
        iconSpan.style.marginInlineEnd = '0.5ch'; // רווח אחרי האייקון
        iconSpan.style.fontSize = '1.4em'; // חץ גדול יותר
        // מוסיפים בתחילת הכפתור (RTL: החץ בצד ימין)
        btn.prepend(iconSpan);
      }

      // פונקציית פתיחה/סגירה
      const setOpen = (open) => {
        btn.setAttribute('aria-expanded', String(open));
        panel.style.maxHeight = open ? panel.scrollHeight + 'px' : '0px';
        iconSpan.textContent = open ? '▾' : '◂'; // סגור = חץ שמאלה, פתוח = חץ למטה
      };

      // התנהגות קליק + סגירת פריט אחר
      const toggle = () => {
        if (openItem && openItem !== item) {
          const prevBtn   = openItem.querySelector('button[aria-controls]');
          const prevPanel = openItem.querySelector('.faq-panel');
          const prevIcon  = openItem.querySelector('.faq-icon');
          if (prevBtn && prevPanel) {
            prevBtn.setAttribute('aria-expanded', 'false');
            prevPanel.style.maxHeight = '0px';
            if (prevIcon) prevIcon.textContent = '◂';
          }
          openItem = null;
        }
        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        setOpen(!isOpen);
        openItem = !isOpen ? item : null;
      };

      btn.addEventListener('click', toggle);

      // נגישות מקלדת: Enter/Space
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        }
      });

      // מצב התחלתי: סגור (או שמור אם aria-expanded="true")
      const initial = btn.getAttribute('aria-expanded') === 'true';
      setOpen(!!initial);
      if (initial) openItem = item;
    });

    // עדכון גובה אם חלון משתנה
    window.addEventListener('resize', () => {
      const current = root.querySelector('.faq-item button[aria-expanded="true"]');
      if (!current) return;
      const panel = current.closest('.faq-item')?.querySelector('.faq-panel');
      if (panel) panel.style.maxHeight = panel.scrollHeight + 'px';
    });
  }
})();
