import { initReviewForm } from './review.js';
import { attachValidationListeners } from './validation.js';
import { toggleTheme, initThemeUIOnce } from './theme.js';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);

  attachValidationListeners(
    '#contact-form [name="phone"]',
    '#contact-form [name="email"]',
    '#contact-form [name="company"]',
    '#contact-form'
  );

  // 👇 זה היה חסר
  initReviewForm();

  initThemeUIOnce();
});
