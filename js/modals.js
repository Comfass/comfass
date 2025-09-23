// js/modals.js – מודאלים עם טעינת תוכן חיצוני, נעילת גלילה, מלכודת פוקוס ותמיכה בעוגנים
// API זהה: openModal(id, url), closeModal(id)

function lockScroll() {
  // שומר את המיקום כדי שלא "נקפוץ" מעלה בסגירה
  const scrollY = window.scrollY || document.documentElement.scrollTop;
  document.documentElement.style.setProperty('--scroll-y', `${scrollY}px`);
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollY}px`;
  document.body.style.left = '0';
  document.body.style.right = '0';
  document.body.style.width = '100%';
}

function unlockScroll() {
  const scrollY = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--scroll-y') || '0', 10);
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';
  document.body.style.width = '';
  window.scrollTo(0, scrollY);
}

function getFocusable(container) {
  return Array.from(container.querySelectorAll(
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
  )).filter(el => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'));
}

export function openModal(id, url) {
  const modal = document.getElementById(id);
  if (!modal) return;

  // שמירת אלמנט שהיה בפוקוס
  const opener = document.activeElement;
  modal.dataset.prevFocus = opener && opener.id ? opener.id : '___noid';

  // מניעת סגירה כש"לוחצים" בתוך התיבה (חד־פעמי לכל פתיחה)
  const panel = modal.querySelector('[data-modal-panel]');
  if (panel) panel.addEventListener('click', (e) => e.stopPropagation(), { once: true });

  // סגירה בלחיצה על הרקע (חד־פעמי לכל פתיחה)
  const onBackdrop = () => closeModal(id);
  modal.addEventListener('click', onBackdrop, { once: true });

  // פתיחה + נעילת גלילה
  modal.classList.remove('hidden');
  lockScroll();

  // פוקוס: נעדיף כפתור סגירה, אחרת אלמנט פוקוסבילי ראשון
  const closeBtn = modal.querySelector('[data-close]');
  const focusables = getFocusable(modal);
  (closeBtn || focusables[0])?.focus();

  // מלכודת פוקוס בסיסית (Tab/Shift+Tab בתוך המודאל)
  function onKeydownTrap(e) {
    if (e.key !== 'Tab') return;
    const items = getFocusable(modal);
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
  modal.addEventListener('keydown', onKeydownTrap);

// ... בתוך openModal, אחרי if (url) { ... }
if (url) {
  const contentId = id.replace('Modal', 'Content'); // e.g. privacyModal -> privacyContent
  const contentEl = modal.querySelector('#' + contentId);
  if (contentEl) {
    contentEl.innerHTML = '<p class="text-gray-500 dark:text-gray-300 text-sm">טוען…</p>';
    const finalUrl = new URL(url, document.baseURI).toString();

    fetch(finalUrl, { cache: 'no-store' })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status} for ${finalUrl}`);
        return res.text();
      })
      .then(html => {
        // אם הקובץ הוא דף מלא – ניקח רק את #policy-root
        try {
          const doc = new DOMParser().parseFromString(html, 'text/html');
          const root = doc.querySelector('#policy-root');
          contentEl.innerHTML = root ? root.innerHTML : html; // אם זה חלקי – נכניס as-is
        } catch {
          contentEl.innerHTML = html;
        }
      })
      .catch(err => {
        console.error('שגיאה בטעינת תוכן:', err);
        contentEl.innerHTML = '<p class="text-red-600 dark:text-red-400">⚠️ לא הצלחתי לטעון את התוכן. בדוק את הנתיב/השמות.</p>';
      });
  }
}

  // שמירת מאזין כדי להסירו בסגירה (מלכודת פוקוס)
  modal.__trapListener = onKeydownTrap;
}

export function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;

  // סגירה
  modal.classList.add('hidden');
  unlockScroll();

  // ניקוי מלכודת פוקוס
  if (modal.__trapListener) {
    modal.removeEventListener('keydown', modal.__trapListener);
    delete modal.__trapListener;
  }

  // החזרת פוקוס לאלמנט פותח
  const prevId = modal.dataset.prevFocus;
  if (prevId && prevId !== '___noid') {
    const prev = document.getElementById(prevId);
    prev?.focus();
  }
}

// סגירה בלחיצה על כפתור עם data-close
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-close]');
  if (!btn) return;
  // אם יש פונקציית closeModal (באתר הראשי), נשתמש בה
  const panel = btn.closest('[id$="Modal"]'); // תופס את המודאל העוטף אם יש
  if (typeof closeModal === 'function' && panel?.id) {
    closeModal(panel.id);
  } else {
    // דף עצמאי: fallback — נסגור פשוט את החלון/נחזור אחורה
    if (history.length > 1) history.back(); else window.close();
  }
});

// סגירה עם מקש Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    // נסה למצוא מודאל פתוח (data-modal-panel) ולסגור
    const openModal = document.querySelector('[id$="Modal"]:not(.hidden)');
    if (typeof closeModal === 'function' && openModal?.id) {
      closeModal(openModal.id);
    } else {
      if (history.length > 1) history.back(); else window.close();
    }
  }
});

// חשיפה ל-onclick ב-HTML (type="module" יוצר scope נפרד)
window.openModal = openModal;
window.closeModal = closeModal;

// פתיחה אוטומטית לפי עוגן URL (#terms/#privacy/#accessibility/#returns/#warranty)
const hash = (window.location.hash || '').replace('#', '');
const hashToModal = {
  terms: ['termsModal', './modals/terms.html'],
  privacy: ['privacyModal', './modals/privacy.html'],
  accessibility: ['accessibilityModal', './modals/accessibility.html'],
  returns: ['returnsModal', './modals/returns.html'],
  warranty: ['warrantyModal', './modals/warranty.html'],
};
if (hashToModal[hash]) {
  const [id, url] = hashToModal[hash];
  // דחייה קצרה כדי ש-DOM יעלה לגמרי
  window.requestAnimationFrame(() => openModal(id, url));
}

