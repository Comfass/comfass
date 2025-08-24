// js/modals.js
// פונקציה גנרית לפתיחת מודאל וטעינת תוכן חיצוני (terms/privacy/accessibility)
export function openModal(id, url) {
  const modal = document.getElementById(id);
  if (!modal) return;

  // סגירה בלחיצה על הרקע
  modal.onclick = (e) => { if (e.target === modal) closeModal(id); };

  modal.classList.remove('hidden');

  if (url) {
    const contentId = id.replace('Modal', 'Content'); // e.g. privacyModal -> privacyContent
    const contentEl = modal.querySelector('#' + contentId);
    if (!contentEl) return;

    contentEl.innerHTML = '<p class="text-gray-500 text-sm">טוען…</p>';

    const finalUrl = new URL(url, document.baseURI).toString();
    fetch(finalUrl)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status} for ${finalUrl}`);
        return res.text();
      })
      .then(html => { contentEl.innerHTML = html; })
      .catch(err => {
        console.error('שגיאה בטעינת תוכן:', err);
        contentEl.innerHTML = '<p class="text-red-600">⚠️ לא הצלחתי לטעון את התוכן. בדוק את הנתיב/השמות.</p>';
      });
  }
}

export function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('hidden');
}

// סגירה עם ESC (פעם אחת בלבד)
document.addEventListener('keydown', (event) => {
  if (event.key === "Escape") {
    const modals = document.querySelectorAll('[id$="Modal"]:not(.hidden)');
    modals.forEach(m => m.classList.add('hidden'));
  }
});

// חושפים ל-onclick ב-HTML
// (כי type="module" יוצר scope נפרד)
window.openModal = openModal;
window.closeModal = closeModal;
