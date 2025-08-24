// js/banner.js
(function initPromoBanner() {
  var banner = document.getElementById('promoBanner');
  if (banner) {
    banner.classList.remove('hidden'); // תמיד מציג את הבאנר
  }
})();

function dismissBanner() {
  var el = document.getElementById('promoBanner');
  if (el) el.classList.add('hidden');
}

function scrollToForm() {
  var el = document.getElementById('contact');
  if (el && el.scrollIntoView) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    location.hash = '#contact';
  }
}
