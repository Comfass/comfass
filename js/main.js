// js/main.js

import './popup.js';
import './rating.js';
import './review.js';
import './testimonial.js';
import './theme-music.js';
import './validation.js';
import './contact.js';
import './submit.js';

import { initReviewForm, toggleReviewPopup } from './review.js';

document.addEventListener("DOMContentLoaded", () => {
  initReviewForm();

  // חיבור כפתורים עם data-popup="review"
  document.querySelectorAll('[data-popup="review"]').forEach(btn => {
    btn.addEventListener("click", toggleReviewPopup);
  });
});

