// main.js
import { toggleReviewPopup, initReviewForm, handleSubmit } from './review.js';
import { attachValidationListeners } from './validation.js';
import './rating.js';
import './testimonial.js';
import './theme-music.js';
import './validation.js';

document.addEventListener("DOMContentLoaded", () => {
  initReviewForm();

  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", handleSubmit);
    attachValidationListeners('#contact-form [name="phone"]', '#contact-form [name="email"]');
  }

  const reviewForm = document.getElementById("review-form");
  if (reviewForm) {
    attachValidationListeners('#review-form [name="phone"]', '#review-form [name="email"]');
  }

  const popupOpenBtns = document.querySelectorAll('[data-popup="review"]');
  const popupCloseBtns = document.querySelectorAll('[data-close="review"]');

  popupOpenBtns.forEach(btn => btn.addEventListener("click", toggleReviewPopup));
  popupCloseBtns.forEach(btn => btn.addEventListener("click", toggleReviewPopup));
});
