// js/submit.js

import { toggleReviewPopup } from './review.js';
import { validatePhone, validateEmail } from './validation.js';

/**
 * שליחת טופס צור קשר (כולל אימות טלפון ואימייל)
 */
export function handleSubmit(event) {
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

/**
 * שליחת טופס חוות דעת
 */
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
