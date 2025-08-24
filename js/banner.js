<script>
  // מציג את הבאנר אם לא נסגר ב-7 ימים
  (function initPromoBanner() {
    var key = 'promoBannerDismissedAt';
    try {
      var last = localStorage.getItem(key);
      var now = Date.now();
      var sevenDays = 7 * 24 * 60 * 60 * 1000;

      if (!last || (now - parseInt(last, 10)) > sevenDays) {
        var banner = document.getElementById('promoBanner');
        if (banner) banner.classList.remove('hidden');
      }
    } catch (e) {
      var banner = document.getElementById('promoBanner');
      if (banner) banner.classList.remove('hidden');
    }
  })();

  // סגירת באנר + שמירה ל-7 ימים
  function dismissBanner() {
    var el = document.getElementById('promoBanner');
    if (el) el.classList.add('hidden');
    try { localStorage.setItem('promoBannerDismissedAt', String(Date.now())); } catch(e) {}
  }

  // גלילה לטופס (התאם את ה-id אם שונה)
  function scrollToForm() {
    var el = document.getElementById('contact');
    if (el && el.scrollIntoView) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      location.hash = '#contact';
    }
  }

  // אופציה: אם יש לך header קבוע מתחת לבאנר – תן מרווח לדף (בטל אם לא צריך)
  // document.addEventListener('DOMContentLoaded', function () {
  //   document.body.style.scrollMarginTop = '48px';
  // });
</script>
