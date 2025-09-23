// comments.js – טעינת Disqus בלחיצה בלבד + שיפורי נגישות ו־UX
(function () {
  let loaded = false;

  // קונפיגורציה ל-Disqus – עדכן אם תרצה מזהה/URL שונים
  window.disqus_config = function () {
    this.page.url = 'https://www.comfass.com/#reviews';
    this.page.identifier = 'comfass-reviews';
    this.language = 'he';
  };

  function loadDisqus() {
    if (loaded) return;
    loaded = true;

    const btn = document.getElementById('load-comments');
    btn.addEventListener('click', ()=>{
    btn.setAttribute('aria-expanded','true');
    document.getElementById('comments-loading').classList.remove('hidden');
    const loading = document.getElementById('comments-loading');
    if (btn) {
      btn.setAttribute('aria-expanded', 'true');
      btn.classList.add('opacity-70', 'cursor-default');
      btn.disabled = true;
    }
    if (loading) loading.classList.remove('hidden');

    // הטמעת ספריית Disqus
    const d = document, s = d.createElement('script');
    s.src = 'https://comfass-com.disqus.com/embed.js';
    s.setAttribute('data-timestamp', String(+new Date()));
    s.async = true;
    (d.head || d.body).appendChild(s);

    // נסתיר את “טוען…” כש-Disqus מוכן
    // יש ל-Disqus אירוע load על התגית עצמה, נשתמש בו:
    s.addEventListener('load', () => {
      if (loading) loading.classList.add('hidden');
    });
  }

  // לחיצה על הכפתור
  const button = document.getElementById('load-comments');
  if (button) {
    button.addEventListener('click', loadDisqus, { once: true });
  }

  // פרוגרסיב אינהנסמנט: אם הגיעו עם עוגן #reviews או פרמטר ?comments=1 – נטען אוטומטית
  const url = new URL(window.location.href);
  if (url.hash === '#reviews' || url.searchParams.get('comments') === '1') {
    // נטען אחרי טיק קצר כדי שה-DOM יסתדר
    setTimeout(loadDisqus, 150);
  }
})();
