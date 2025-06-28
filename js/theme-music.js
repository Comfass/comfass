
// theme-music.js

function toggleTheme() {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
}

(function () {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') document.body.classList.add('dark');
})();

const music = document.getElementById('bg-music');
const btn = document.getElementById('music-btn');
let playing = false;

function toggleMusic() {
  if (playing) {
    music.pause();
    btn.textContent = '🔊';
  } else {
    music.play();
    btn.textContent = '⏸️';
  }
  playing = !playing;
}
