import { initReviewForm } from './review.js';
import { attachValidationListeners } from './validation.js';
import { toggleTheme, toggleMusic } from './theme-music.js';
import './rating.js';
import './testimonial.js';
import './validation.js';

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);
  document.getElementById('music-btn')?.addEventListener('click', toggleMusic);
});

document.addEventListener("DOMContentLoaded", () => {
  initReviewForm();

  attachValidationListeners('#contact-form [name="phone"]', '#contact-form [name="email"]');
  attachValidationListeners('#review-form [name="phone"]', '#review-form [name="email"]');
});
