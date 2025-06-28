// js/review.js

export function toggleReviewPopup() {
  const popup = document.getElementById('review-popup');
  const form = document.getElementById('review-form');
  const thankyou = document.getElementById('review-thankyou');

  if (popup.classList.contains('hidden')) {
    form.reset();
    thankyou.classList.add('hidden');
    popup.classList.remove('hidden');
    popup.classList.add('flex');
  } else {
    popup.classList.remove('flex');
    popup.classList.add('hidden');
  }
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

export function initReviewForm() {
  const form = document.getElementById('review-form');
  if (form) {
    form.addEventListener('submit', handleReviewSubmit);
  }

  document.querySelectorAll('[data-popup="review"]').forEach(btn => {
    btn.addEventListener("click", toggleReviewPopup);
  });

  document.querySelectorAll('[data-close="review"]').forEach(btn => {
    btn.addEventListener("click", toggleReviewPopup);
  });
}
