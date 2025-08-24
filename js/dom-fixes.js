// js/dom-fixes.js

document.addEventListener('DOMContentLoaded', () => {
  /* 1) מסיר aria-hidden מכל <option> ומונע חזרה (יעיל יותר מ-setInterval) */
  const cleanOptionAria = () => {
    document.querySelectorAll('option[aria-hidden="true"]').forEach(o => {
      o.removeAttribute('aria-hidden');
    });
  };

  // ניקוי ראשוני
  cleanOptionAria();

  // השגחה על שינויים בדף – מסיר ברגע שמישהו מוסיף aria-hidden שוב
  const mo = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.type === 'attributes' &&
          m.attributeName === 'aria-hidden' &&
          m.target.tagName === 'OPTION') {
        m.target.removeAttribute('aria-hidden');
      }
      if (m.type === 'childList' && m.addedNodes?.length) {
        cleanOptionAria();
      }
    }
  });

  mo.observe(document.documentElement, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: ['aria-hidden']
  });

  /* 2) אפקט כיתוב לסלוגן (אם קיים) */
  const slogan = document.getElementById("slogan");
  if (slogan) {
    setTimeout(() => slogan.classList.add("typing-effect"), 1000);
  }
});
