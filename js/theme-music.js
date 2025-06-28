// js/theme-music.js

function toggleTheme() {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
}

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
  if (!music || !musicBtn) return;

  if (playing) {
    music.pause();
    musicBtn.textContent = '🔊';
  } else {
    music.play();
    musicBtn.textContent = '⏸️';
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

