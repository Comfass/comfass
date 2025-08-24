// js/dom-fixes.js
document.addEventListener('DOMContentLoaded', () => {
  const interval = setInterval(() => {
    const brokenOption = document.querySelector('option[aria-hidden="true"]');
    if (brokenOption) {
      brokenOption.removeAttribute('aria-hidden');
      clearInterval(interval);
    }
  }, 500);
});

// אפקט טיפוסי קטן לכותרת אם צריך
document.addEventListener("DOMContentLoaded", () => {
  const slogan = document.getElementById("slogan");
  if (slogan) {
    setTimeout(() => slogan.classList.add("typing-effect"), 1000);
  }
});
