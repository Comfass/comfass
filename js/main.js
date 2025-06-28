import { initReviewForm } from './review.js';
import { attachValidationListeners } from './validation.js';
import './rating.js';
import './testimonial.js';
import './theme-music.js';
import './validation.js';

document.addEventListener("DOMContentLoaded", () => {
  initReviewForm();

  attachValidationListeners('#contact-form [name="phone"]', '#contact-form [name="email"]');
  attachValidationListeners('#review-form [name="phone"]', '#review-form [name="email"]');
});
