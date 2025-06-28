// js/review.js

import { validatePhone, validateEmail } from './validation.js';

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

function handleReviewSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const emailInput = form.querySelector('[name="email"]');
  const phoneInput = form.querySelector('[name="phone"]');
  const data = new FormData(form);
  const thankyou = document.getElementById('review-thankyou');

  if (emailInput && !validateEmail(emailInput.value)) {
    alert('יש להזין כתובת אימייל תקינה');
    return false;
  }

  if (phoneInput && !validatePhone(phoneInput.value)) {
    alert('יש להזין מספר טלפון ישראלי תקין');
    return false;
  }

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

function handleContactSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const phoneInput = form.querySelector('[name="phone"]');
  const emailInput = form.querySelector('[name="email"]');
  const thankYou = document.getElementById('thank-you');
  const data = new FormData(form);

  if (phoneInput && !validatePhone(phoneInput.value)) {
    alert('יש להזין מספר טלפון ישראלי תקין');
    return false;
  }

  if (emailInput && !validateEmail(emailInput.value)) {
    alert('יש להזין כתובת אימייל תקינה');
    return false;
  }

  fetch(form.action, {
    method: form.method,
    body: data,
    headers: { 'Accept': 'application/json' }
  })
    .then(response => {
      if (response.ok) {
        form.reset();
        if (thankYou) {
          form.style.display = 'none';
          thankYou.classList.remove('hidden');
        }
      } else {
        alert('הייתה שגיאה בשליחה, נסה שוב מאוחר יותר');
      }
    })
    .catch(() => alert('שגיאה בחיבור לשרת'));

  return false;
}

export function initReviewForm() {
  const reviewForm = document.getElementById('review-form');
  if (reviewForm) {
    reviewForm.addEventListener('submit', handleReviewSubmit);
  }

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
  }

  document.querySelectorAll('[data-popup="review"]').forEach(btn => {
    btn.addEventListener("click", toggleReviewPopup);
  });

  document.querySelectorAll('[data-close="review"]').forEach(btn => {
    btn.addEventListener("click", toggleReviewPopup);
  });
}
