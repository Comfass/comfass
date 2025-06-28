// validation.js

export function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email.trim());
}

export function validatePhone(phone) {
  const israelPhonePattern = /^(\+972|0)([23489]|5[0-9])-?\d{7}$/;
  return israelPhonePattern.test(phone.trim());
}

export function updateInputValidationStyle(input, isValid) {
  input.classList.remove("border-gray-300", "border-red-500", "border-green-500");
  input.classList.add(isValid ? "border-green-500" : "border-red-500");
}

export function attachValidationListeners(phoneSelector, emailSelector) {
  const phoneInput = document.querySelector(phoneSelector);
  const emailInput = document.querySelector(emailSelector);

  if (phoneInput) {
    phoneInput.addEventListener("input", () => {
      const valid = validatePhone(phoneInput.value);
      updateInputValidationStyle(phoneInput, valid);
    });
  }

  if (emailInput) {
    emailInput.addEventListener("input", () => {
      const valid = validateEmail(emailInput.value);
      updateInputValidationStyle(emailInput, valid);
    });
  }
}

