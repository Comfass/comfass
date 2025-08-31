// js/modals.js
// פתיחת מודאל וטעינת תוכן חיצוני (terms/privacy/accessibility/returns/warranty)
export function openModal(id, url) {
  const modal = document.getElementById(id);
  if (!modal) return;

  // מניעת סגירה כש"לוחצים" בתוך התיבה
  const panel = modal.querySelector('[data-modal-panel]');
  if (panel) panel.addEventListener('click', (e) => e.stopPropagation(), { once: true });

  // סגירה בלחיצה על הרקע
  modal.addEventListener('click', () => closeModal(id), { once: true });

  // שמירת אלמנט שהיה בפוקוס להחזרה לאחר סגירה
  const previouslyFocused = document.activeElement;
  modal.dataset.prevFocus = previouslyFocused ? previouslyFocused.id || '___noid' : '___noid';

  // הצגה + פוקוס לכפתור הסגירה
  modal.classList.remove('hidden');
  const closeBtn = modal.querySelector('[data-close]');
  closeBtn?.focus();

  if (url) {
    const contentId = id.replace('Modal', 'Content'); // e.g. privacyModal -> privacyContent
    const contentEl = modal.querySelector('#' + contentId);
    if (!contentEl) return;

    contentEl.innerHTML = '<p class="text-gray-500 dark:text-gray-300 text-sm">טוען…</p>';

    const finalUrl = new URL(url, document.baseURI).toString();
    fetch(finalUrl, { cache: 'no-store' })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status} for ${finalUrl}`);
        return res.text();
      })
      .then(html => { contentEl.innerHTML = html; })
      .catch(err => {
        console.error('שגיאה בטעינת תוכן:', err);
        contentEl.innerHTML = '<p class="text-red-600 dark:text-red-400">⚠️ לא הצלחתי לטעון את התוכן. בדוק את הנתיב/השמות.</p>';
      });
  }
}

export function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add('hidden');

  // החזרת פוקוס לאלמנט שהיה פעיל לפני פתיחת המודאל
  const prevId = modal.dataset.prevFocus;
  if (prevId && prevId !== '___noid') {
    const prev = document.getElementById(prevId);
    prev?.focus();
  }
}

// סגירה עם ESC
document.addEventListener('keydown', (event) => {
  if (event.key === "Escape") {
    const openModals = document.querySelectorAll('[id$="Modal"]:not(.hidden)');
    openModals.forEach(m => m.classList.add('hidden'));
  }
});

// חשיפה ל-onclick ב-HTML (type="module" יוצר scope נפרד)
window.openModal = openModal;
window.closeModal = closeModal;
