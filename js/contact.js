// js/contact.js
import { validatePhone, validateEmail } from './validation.js';

function handleContactSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const phoneInput = form.querySelector('[name="phone"]');
  const emailInput = form.querySelector('[name="email"]');
  const thankYou = document.getElementById('thank-you');
  const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');

  // ולידציה בסיסית לפני שליחה (מעבר למה ש-validation.js כבר עושה חי)
  if (phoneInput && !validatePhone(phoneInput.value)) {
    alert('יש להזין מספר טלפון ישראלי תקין');
    phoneInput.focus();
    return false;
  }
  if (emailInput && !validateEmail(emailInput.value)) {
    alert('יש להזין כתובת אימייל תקינה');
    emailInput.focus();
    return false;
  }

  // ננעל את הכפתור בזמן שליחה
  const prevLabel = submitBtn?.textContent;
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.classList.add('opacity-70');
    submitBtn.textContent = 'שולח...';
  }

  const data = new FormData(form);

  fetch(form.action, {
    method: form.method || 'POST',
    body: data,
    headers: { 'Accept': 'application/json' },
  })
    .then(async (response) => {
      if (response.ok) {
        form.reset();
        if (thankYou) {
          form.style.display = 'none';
          thankYou.classList.remove('hidden');
        } else {
          alert('תודה! פנייתך התקבלה.');
        }
      } else {
        // נסה לקרוא הודעת שגיאה ידידותית מ-Formspree
        let msg = 'הייתה שגיאה בשליחה, נסה שוב מאוחר יותר';
        try {
          const err = await response.json();
          if (err && err.errors && err.errors[0]?.message) {
            msg = err.errors[0].message;
          }
        } catch (_) {}
        alert(msg);
      }
    })
    .catch(() => {
      alert('שגיאה בחיבור לשרת');
    })
    .finally(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('opacity-70');
        submitBtn.textContent = prevLabel || 'שלח פנייה';
      }
    });

  return false;
}

export function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
  }
}
