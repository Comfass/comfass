// js/theme-music.js

function toggleTheme() {
  const html = document.documentElement;
  const icon = document.getElementById('theme-icon');

  html.classList.toggle('dark');
  const isDark = html.classList.contains('dark');

  // שמירה על המצב בזיכרון הדפדפן
  localStorage.setItem('theme', isDark ? 'dark' : 'light');

  // החלפת סמל
  icon.textContent = isDark ? '☀️' : '🌙';
}

// כשנכנסים לדף: נטען ערך קודם אם קיים
(function () {
  const savedTheme = localStorage.getItem('theme');
  const html = document.documentElement;
  const icon = document.getElementById('theme-icon');

  if (savedTheme === 'dark') {
    html.classList.add('dark');
    if (icon) icon.textContent = '☀️';
  } else {
    html.classList.remove('dark');
    if (icon) icon.textContent = '🌙';
  }
})();

// load saved theme
(function () {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') document.body.classList.add('dark');
})();

// music setup
const music = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');
let playing = false;

function toggleMusic() {
  if (playing) {
    music.pause();
    iconPath.setAttribute('d', 'M9 19V6l12-2v13'); // Play icon
  } else {
    music.play();
    iconPath.setAttribute('d', 'M6 18L18 6M6 6l12 12'); // Pause icon
  }
  playing = !playing;
}


// attach listeners after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const themeBtn = document.getElementById('theme-toggle');
  const musicBtn = document.getElementById('music-btn'); // ⬅️ היה חסר!

  if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
  }

  if (musicBtn) {
    musicBtn.addEventListener('click', toggleMusic);
  }
});

