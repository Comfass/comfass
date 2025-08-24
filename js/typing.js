// js/typing.js
function typeText(elementId, text, baseDelay = 60) {
  return new Promise((resolve) => {
    const el = document.getElementById(elementId);
    if (!el) return resolve();
    let i = 0;
    el.innerHTML = '<span id="blinker" class="blinker">|</span>';
    const blinker = document.getElementById("blinker");

    const step = () => {
      if (i >= text.length) { blinker.remove(); resolve(); return; }
      const ch = text.charAt(i);
      blinker.insertAdjacentText("beforebegin", ch);
      i++;

      let delay = baseDelay;
      if (ch === ' ') delay *= 0.6;
      if (/[,\.\!\?\:\;]/.test(ch)) delay *= 4;
      if (/[־–—]/.test(ch)) delay *= 2.5;
      if (/[“”'"״׳]/.test(ch)) delay *= 1.8;

      setTimeout(step, delay);
    };
    step();
  });
}

function scrollToForm() {
  const el = document.getElementById("contact"); // התאמת ה-id שלך
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

// התחלת האנימציה
(async function startTypingAnimation() {
  await typeText("line1", "כאן מתחיל השיפור שאתה מרגיש", 60);
  await new Promise(r => setTimeout(r, 300));
  const logo = document.getElementById("logo");
  if (logo) logo.classList.remove("opacity-0");
  await new Promise(r => setTimeout(r, 800));
  await typeText("line2", "הפתרון המושלם לישיבה ממושכת במכללות, אוניברסטאות וארגונים", 75);

  const container = document.getElementById("cta-button-container");
  if (!container) return;
  container.innerHTML = `
    <button class="frutiger-button cta-enter" onclick="scrollToForm()">
      <div class="inner">
        <div class="top-white"></div>
        <span class="text">השאר פניה</span>
      </div>
    </button>
  `;

  requestAnimationFrame(() => {
    const btn = container.querySelector('.cta-enter');
    if (!btn) return;
    requestAnimationFrame(() => { btn.classList.add('cta-enter-active'); });
  });
})();

// חושפים ל-onclick של הכפתור
window.scrollToForm = scrollToForm;
