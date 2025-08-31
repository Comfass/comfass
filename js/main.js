import { initReviewForm } from './review.js';
import { attachValidationListeners } from './validation.js';
import { toggleTheme, initThemeUIOnce } from './theme.js';

document.addEventListener('DOMContentLoaded', () => {
  // כפתור מצב כהה/בהיר
  document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);

  // טופס "צור קשר"
  attachValidationListeners(
    '#contact-form [name="phone"]',
    '#contact-form [name="email"]',
    '#contact-form [name="company"]',
    '#contact-form'
  );

  // טופס חוות דעת (רק אם באמת קיים בדף)
  const reviewFormEl = document.querySelector('#review-form');
  if (reviewFormEl) {
    attachValidationListeners(
      null,
      '#review-form [name="email"]',
      null,
      '#review-form'
    );
    // נניח שהפונקציה כבר יודעת להגן אם חסרים שדות
    initReviewForm();
  }

  initThemeUIOnce();
});
