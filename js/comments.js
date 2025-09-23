// comments.js – טעינת Disqus בלחיצה בלבד + נגישות + טיפול שגיאות
(function () {
  let loaded = false;

  function loadDisqus() {
    if (loaded) return;
    loaded = true;

    const btn = document.getElementById('load-comments');
    const loading = document.getElementById('comments-loading');

    // מצב כפתור + ARIA
    if (btn) {
      btn.setAttribute('aria-expanded', 'true');
      btn.classList.add('opacity-70', 'cursor-default');
      btn.disabled = true;
    }
    if (loading) loading.classList.remove('hidden');

    // קונפיגורציית Disqus (מומלץ בלי hash)
    window.disqus_config = function () {
      this.page.url = 'https://www.comfass.com/';   // בלי #reviews
      this.page.identifier = 'comfass-reviews';
      this.language = 'he';
    };

    // הזרקת ספריית Disqus
    const d = document;
    const s = d.createElement('script');
    s.src = 'https://comfass-com.disqus.com/embed.js';
    s.setAttribute('data-timestamp', String(+new Date()));
    s.async = true;

    s.addEventListener('load', () => {
      if (loading) loading.classList.add('hidden');
    });

    s.addEventListener('error', () => {
      if (loading) loading.classList.add('hidden');
      console.error('Disqus failed to load');
      const holder = document.getElementById('disqus_thread');
      if (holder) {
        holder.innerHTML = '<p class="text-red-600 dark:text-red-400">⚠️ לא ניתן לטעון תגובות כרגע. נסה מאוחר יותר.</p>';
      }
      if (btn) btn.disabled = false;
    });

    (d.head || d.body).appendChild(s);
  }

  function init() {
    // לחיצה על הכפתור — טוען פעם אחת
    const button = document.getElementById('load-comments');
    if (button) button.addEventListener('click', loadDisqus, { once: true });

    // אם הגיעו עם #reviews או ?comments=1 — טען אוטומטית
    const url = new URL(window.location.href);
    if (url.hash === '#reviews' || url.searchParams.get('comments') === '1') {
      setTimeout(loadDisqus, 150);
    }
  }

  // אם הקובץ נטען בלי defer, נרוץ אחרי DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
