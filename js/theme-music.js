export function toggleTheme() {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');

  const icon = document.getElementById('theme-icon');
  if (icon) {
    icon.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
  }
}

export function toggleMusic() {
  const music = document.getElementById('bg-music');
  const iconPath = document.getElementById('icon-path');

  if (!music || !iconPath) return;

  if (music.paused) {
    music.play();
    iconPath.setAttribute('d', 'M9 19V6l12-2v13'); // Play icon
  } else {
    music.pause();
    iconPath.setAttribute('d', 'M6 18L18 6M6 6l12 12'); // X icon
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    const icon = document.getElementById('theme-icon');
    if (icon) icon.textContent = '☀️';
  }

  document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);
  document.getElementById('music-btn')?.addEventListener('click', toggleMusic);
});
