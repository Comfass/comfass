// js/review.js

export function toggleReviewPopup() {
  const popup = document.getElementById('review-popup');
  const form = document.getElementById('review-form');
  const thankyou = document.getElementById('review-thankyou');

  form.reset();
  thankyou.classList.add('hidden');
  popup.classList.toggle('hidden');
  popup.classList.toggle('flex');
}

export function handleReviewSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const data = new FormData(form);
  const thankyou = document.getElementById('review-thankyou');

  fetch(form.action, {
    method: form.method,
    body: data,
    headers: { 'Accept': 'application/json' }
  })
    .then(response => {
      if (response.ok) {
        form.reset();
        thankyou.classList.remove('hidden');
        setTimeout(() => toggleReviewPopup(), 2000);
      } else {
        alert('אירעה שגיאה בשליחה');
      }
    })
    .catch(() => alert('שגיאה בחיבור לשרת'));

  return false;
}

// Auto attach submit listener
export function initReviewForm() {
  const form = document.getElementById('review-form');
  if (form) {
    form.addEventListener('submit', handleReviewSubmit);
  }
}

