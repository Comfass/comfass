// js/theme.js
const $html = document.documentElement;
const $body = document.body;

function computeIsDark() {
  const theme = localStorage.getItem('theme'); // 'dark' | 'light' | null
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return theme === 'dark' || (!theme && prefersDark);
}

export function applyTheme(mode /* 'dark' | 'light' | undefined (system) */) {
  if (mode === 'dark') localStorage.setItem('theme', 'dark');
  else if (mode === 'light') localStorage.setItem('theme', 'light');
  else localStorage.removeItem('theme'); // system (ברירת מחדל)

  const isDark = computeIsDark();
  $html.classList.toggle('dark', isDark);
  $body?.classList?.remove('dark'); // לא משתמשים במחלקה על body

  // עדכון האייקון אם קיים
  const icon = document.getElementById('theme-icon');
  if (icon) icon.textContent = isDark ? '☀️' : '🌙';
}

export function toggleTheme() {
  const isDark = $html.classList.contains('dark');
  applyTheme(isDark ? 'light' : 'dark');
}

// לסנכרון האייקון והמצב בהעלאה (אחרי ה-early-init)
export function initThemeUIOnce() {
  // 1) סנכרון אייקון
  const icon = document.getElementById('theme-icon');
  if (icon) icon.textContent = $html.classList.contains('dark') ? '☀️' : '🌙';

  // 2) להגיב לשינוי מערכת במצב "system"
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  const onChange = () => {
    if (!localStorage.getItem('theme')) applyTheme(); // system
  };
  // addEventListener נתמך בכל מודרני
  mq.addEventListener?.('change', onChange);
}
