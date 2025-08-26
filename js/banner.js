// js/banner.js
// js/banner.js
document.addEventListener('DOMContentLoaded', function () {
  var banner = document.getElementById('promoBanner');
  var track  = document.getElementById('bannerTicker');

  // מציג את הבאנר מיד כשהעמוד מוכן
  if (banner) banner.classList.remove('hidden');

  // כפתור סגירה
  window.dismissBanner = function () {
    if (!banner) return;
    banner.classList.add('hidden');
    // אין פס לבן כי ביטלנו margin ברירת מחדל של body ב-CSS למעלה
  };

  // גלילה לטופס
  window.scrollToForm = function () {
    var el = document.getElementById('contact');
    if (el && el.scrollIntoView) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      location.hash = '#contact';
    }
  };

  // מהירות דינמית לפי אורך התוכן (כדי שלא ייחתך)
  if (track) {
    // אם לא שכפלת ב-HTML, אפשר לשכפל כאן:
    // track.innerHTML = track.innerHTML + track.innerHTML;

    // מרחק מחזור: חצי מהרוחב (בגלל הכפילות)
    var distancePx = track.scrollWidth / 2;
    // מהירות "קריאה" נוחה (פיקסלים לשנייה) – כוון לפי טעם
    var PX_PER_SEC = 30;

    var durationSec = distancePx / PX_PER_SEC;
    // מזריקים משך דינמי ל-CSS var
    track.style.setProperty('--banner-duration', durationSec.toFixed(2) + 's');
  }
});
