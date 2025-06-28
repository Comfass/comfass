// popup.js - ניהול פתיחה וסגירה של פופאפ חוות דעת

export function toggleReviewPopup() {
  const popup = document.getElementById('review-popup');
  const form = document.getElementById('review-form');
  const thankyou = document.getElementById('review-thankyou');

  form.reset();
  thankyou.classList.add('hidden');
  popup.classList.toggle('hidden');
  popup.classList.toggle('flex');
}
