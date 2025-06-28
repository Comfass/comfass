// js/theme-music.js

export function toggleTheme() {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');

  // החלפת סמל
  const icon = document.getElementById('theme-icon');
  if (icon) {
    icon.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
  }
}

// מפעיל את המצב השמור
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    const icon = document.getElementById('theme-icon');
    if (icon) icon.textContent = '☀️';
  }
});

// music setup
export function toggleMusic() {
  const music = document.getElementById('bg-music');
  const icon = document.getElementById('music-icon');
  const path = document.getElementById('icon-path');

  if (!music || !icon || !path) return;

  if (music.paused) {
    music.play();
    path.setAttribute('d', 'M9 19V6l12-2v13'); // Play Icon
  } else {
    music.pause();
    path.setAttribute('d', 'M6 18L18 6M6 6l12 12'); // X icon (pause-style)
  }
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

