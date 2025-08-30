import { initReviewForm } from './review.js';
import { attachValidationListeners } from './validation.js';
import { toggleTheme, initThemeUIOnce } from './theme.js';
import './rating.js';
import './testimonial.js';
import './validation.js';

document.addEventListener('DOMContentLoaded', () => {
  // כפתור מצב כהה/בהיר
  document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);

  // טפסים
  initReviewForm();

  // ✅ ולידציה: צור קשר (טלפון + אימייל + מוסד/חברה)
  attachValidationListeners('#contact-form [name="phone"]',
                            '#contact-form [name="email"]',
                            '#contact-form [name="company"]');

  // ✅ ולידציה: חוות דעת (רק אימייל)
  attachValidationListeners('#review-form [name="email"]');

  initThemeUIOnce();
});
