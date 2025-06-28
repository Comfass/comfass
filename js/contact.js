// contact.js

function handleSubmit(event) {
  event.preventDefault();
  const form = document.getElementById("contact-form");
  const thankYou = document.getElementById("thank-you");
  const data = new FormData(form);
  const phone = form.querySelector('[name="phone"]').value.trim();

  const israelPhonePattern = /^(\+972|0)([23489]|5[0-9])-?\d{7}$/;
  if (!israelPhonePattern.test(phone)) {
    alert("יש להזין מספר טלפון ישראלי תקין");
    return false;
  }

  fetch(form.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        form.reset();
        form.style.display = "none";
        thankYou.classList.remove("hidden");
      } else {
        alert("הייתה שגיאה בשליחה, נסה שוב מאוחר יותר");
      }
    })
    .catch(() => alert("שגיאה בחיבור לשרת"));

  return false;
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", handleSubmit);
  }
});

