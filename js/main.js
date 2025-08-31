import { initReviewForm } from './review.js';
import { attachValidationListeners } from './validation.js';
import { toggleTheme, initThemeUIOnce } from './theme.js';
import './rating.js';
import './testimonial.js';
// הסרנו: import './validation.js';  // מיותר

document.addEventListener('DOMContentLoaded', () => {
  // כפתור מצב כהה/בהיר
  document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);

  // טופס חוות דעת (אם קיים)
  initReviewForm();

  // צור קשר: טלפון + אימייל + מוסד/חברה + שליטה על ה-submit
  // שים לב: אין פרמטר לשדה name — נאסף אוטומטית לפי data-validate="name"
  attachValidationListeners(
    '#contact-form [name="phone"]',
    '#contact-form [name="email"]',
    '#contact-form [name="company"]',
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
