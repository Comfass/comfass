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

 // צור קשר: טלפון + אימייל + מוסד/חברה + שליטה על ה-submit
attachValidationListeners(
  '#contact-form [name="phone"]',
  '#contact-form [name="email"]',
  '#contact-form [name="company"]',
  '#contact-form [name="name"]',  // ⬅️ חדש
  '#contact-form'
);


// חוות דעת: רק אימייל (אם אין טלפון/מוסד בטופס הזה)
attachValidationListeners(
  null,
  '#review-form [name="email"]',
  null,
  '#review-form'
);

  initThemeUIOnce();
});
