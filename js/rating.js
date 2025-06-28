// js/rating.js

export function initRatingStars() {
  const stars = document.querySelectorAll("#star-rating .star");
  const ratingInput = document.getElementById("rating-input");
  let currentRating = 0;

  stars.forEach(star => {
    star.addEventListener("click", () => {
      const selectedRating = parseInt(star.dataset.value);
      currentRating = currentRating === selectedRating ? 0 : selectedRating;
      ratingInput.value = currentRating;
      updateStars(currentRating);
    });

    star.addEventListener("mouseover", () => {
      updateStars(parseInt(star.dataset.value));
    });

    star.addEventListener("mouseout", () => {
      updateStars(currentRating);
    });
  });

  function updateStars(rating) {
    stars.forEach(star => {
      const val = parseInt(star.dataset.value);
      star.classList.toggle("selected", val <= rating);
    });
  }
}

document.addEventListener("DOMContentLoaded", initRatingStars);

