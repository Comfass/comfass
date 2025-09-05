// js/main.js
import { initContactForm } from './contact.js';
import { attachValidationListeners } from './validation.js';
import { toggleTheme, initThemeUIOnce } from './theme.js';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);

  // ולידציה חיה + ניהול enable/disable של כפתור השליחה
  attachValidationListeners(
    '#contact-form [name="phone"]',
    '#contact-form [name="email"]',
    '#contact-form [name="company"]',
    '#contact-form'
  );

  // מאזין submit לטופס “צור קשר”
  initContactForm();

  initThemeUIOnce();
});
