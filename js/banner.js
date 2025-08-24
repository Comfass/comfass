// js/banner.js
(function initPromoBanner() {
  var banner = document.getElementById('promoBanner');
  if (banner) {
    banner.classList.remove('hidden'); // תמיד מציג את הבאנר
  }
})();

function dismissBanner() {
  var el = document.getElementById('promoBanner');
  if (el) el.classList.add('hidden');
}

function scrollToForm() {
  var el = document.getElementById('contact');
  if (el && el.scrollIntoView) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    location.hash = '#contact';
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const banner = document.getElementById('promoBanner');
  const track = document.getElementById('bannerTicker');

  // מציג את הבאנר תמיד כשהעמוד נטען
  if (banner) banner.classList.remove('hidden');

  // כפתור סגירה
  window.dismissBanner = function () {
    if (banner) banner.classList.add('hidden');
  };

  // גלילה לטופס (אם יש לך #contact בעמוד)
  window.scrollToForm = function () {
    const el = document.getElementById('contact');
    if (el && el.scrollIntoView) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      location.hash = '#contact';
    }
  };

  // התאמת מהירות הגלילה לפי אורך התוכן
  if (track) {
    // משכפלים תוכן כדי ליצור לולאה רציפה
    track.innerHTML = track.innerHTML + track.innerHTML;

    // מחשבים את הרוחב הכולל של הטקסט
    const distance = track.scrollWidth / 2; // מחזור אחד = חצי מהרוחב
    const PX_PER_SEC = 80; // מהירות קריאה נוחה ~80px לשנייה
    const durationSec = distance / PX_PER_SEC;

    // מזריקים משך אנימציה דינמי
    track.style.animationDuration = durationSec.toFixed(2) + 's';

    // מגדירים את האנימציה לכיוון משמאל לימין
    track.style.animationName = 'banner-scroll-ltr';
  }
});

