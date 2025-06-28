// js/testimonial.js

const testimonials = [
  { name: 'רותם מ.', text: 'הכרית הזאת שינתה לי את הישיבה במשרד!', stars: 5, img: 'https://i.pravatar.cc/80?img=1' },
  { name: 'מאיה ג.', text: 'התלמידים יושבים מרוכזים יותר. תודה!', stars: 4, img: 'https://i.pravatar.cc/80?img=2' },
  { name: 'שחר ל.', text: 'הכי נוחה שניסיתי!', stars: 5, img: 'https://i.pravatar.cc/80?img=3' }
];

let currentTestimonial = 0;

function rotateTestimonial() {
  const box = document.getElementById('testimonial-box');
  const text = document.getElementById('testimonial-text');
  const stars = document.getElementById('stars-box');
  const name = document.getElementById('testimonial-name');
  const img = document.getElementById('testimonial-img');

  if (!box || !text || !stars || !name || !img) return;

  box.style.opacity = 0;
  setTimeout(() => {
    const { text: t, stars: s, name: n, img: i } = testimonials[currentTestimonial];
    text.textContent = t;
    stars.textContent = '⭐'.repeat(s);
    name.textContent = n;
    img.src = i;
    box.style.opacity = 1;
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  }, 500);
}

document.addEventListener("DOMContentLoaded", () => {
  setInterval(rotateTestimonial, 5000);
});

