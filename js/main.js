// main.js
import { toggleReviewPopup, initReviewForm } from './review.js';
import { handleSubmit } from './submit.js';
import './rating.js';
import './testimonial.js';
import './theme-music.js';
import './validation.js';
import './contact.js';

// מריץ את כל ההאזנות כאשר הדף מוכן
document.addEventListener("DOMContentLoaded", () => {
  initReviewForm();

  document.querySelectorAll('[data-popup="review"]').forEach(btn => {
    btn.addEventListener("click", toggleReviewPopup);
  });

  document.querySelectorAll('[data-close="review"]').forEach(btn => {
    btn.addEventListener("click", toggleReviewPopup);
  });

  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", handleSubmit);
  }
});
