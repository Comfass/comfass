// popup.js
export function toggleReviewPopup() {
  const popup = document.getElementById('review-popup');
  const form = document.getElementById('review-form');
  const thankyou = document.getElementById('review-thankyou');

  form.reset();
  thankyou.classList.add('hidden');
  popup.classList.toggle('hidden');
  popup.classList.toggle('flex');
}

// קישור הפונקציה לכפתורים
document.addEventListener("DOMContentLoaded", () => {
  const openBtns = document.querySelectorAll('[data-popup="review"]');
  openBtns.forEach(btn => {
    btn.addEventListener("click", toggleReviewPopup);
  });
});
