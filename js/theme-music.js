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
    // Pause icon
    iconPath.setAttribute('d', 'M6 4h4v16H6zM14 4h4v16h-4z');
  } else {
    music.pause();
    // Play icon
    iconPath.setAttribute('d', 'M5 3v18l14-9L5 3z');
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
