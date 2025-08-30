// validation.js

// ---------- Email ----------
export function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test((email || '').trim());
}

// ---------- Phone (IL) ----------
function normDigits(s) {
  s = (s || '').trim();
  if (s.startsWith('+')) return '+' + s.slice(1).replace(/\D/g, '');
  return s.replace(/\D/g, '');
}

/** תומך בפורמטים ישראליים:
 *  05x-xxxxxxx (מובייל, 10 ספרות), 0[23489]-xxxxxxx (קווי, 9 ספרות),
 *  07x (VoB וכד'), וגם +972… (מומר ל-0… לבדיקות)
 */
export function validatePhone(phone) {
  const clean = normDigits(phone);
  let local = clean.startsWith('+972') ? '0' + clean.slice(4) : clean;
  local = local.replace(/\D/g, ''); // רק ספרות

  const isMobile = /^05\d{8}$/.test(local);       // 10 ספרות
  const isLand9 = /^0[23489]\d{7}$/.test(local);  // 9 ספרות (02/03/04/08/09)
  const isLand10 = /^0[57]\d{8}$/.test(local);    // 10 ספרות (07x/075 וכו')
  return isMobile || isLand9 || isLand10;
}

// ---------- Institution / Company ----------
export function validateInstitution(name) {
  const v = (name || '').trim();
  if (v.length < 3) return false;
  if (!/[A-Za-z\u0590-\u05FF0-9]/.test(v)) return false; // חייב לפחות אות/ספרה
  return /^[A-Za-z\u0590-\u05FF0-9 .,'"\-()&/\\]+$/.test(v);
}

// ---------- UI helpers ----------
export function updateInputValidationStyle(input, isValid) {
  if (!input) return;
  input.classList.remove('border-gray-300', 'border-red-500', 'border-green-500');
  input.classList.add(isValid ? 'border-green-500' : 'border-red-500');

  // שים סטטוס לשימוש פנימי
  input.dataset.valid = isValid ? 'true' : 'false';

  // HTML5 validity (לטובת form.checkValidity אם נדרש)
  input.setCustomValidity(isValid ? '' : 'invalid');
}

function validateFieldAndStyle(input) {
  if (!input) return true;

  const type = (input.dataset.validate || '').toLowerCase();
  let ok = true;

  if (type === 'phone') ok = validatePhone(input.value);
  else if (type === 'institution') ok = validateInstitution(input.value);
  else if (input.type === 'email' || input.name === 'email') ok = validateEmail(input.value);
  else if (input.required) ok = !!(input.value || '').trim();
  else ok = true;

  updateInputValidationStyle(input, ok);
  return ok;
}

function refreshSubmitStateFor(input) {
  const form = input?.closest('form');
  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
  if (!submitBtn) return;

  // כל השדות required + צ'קבוקסים required בטופס
  const requiredFields = Array.from(
    form.querySelectorAll('input[required], textarea[required], select[required]')
  );

  // ודא שכל שדה עבר בדיקה לפחות פעם אחת
  requiredFields.forEach(el => {
    if (!('valid' in el.dataset)) validateFieldAndStyle(el);
  });

  const allOk = requiredFields.every(el => {
    if (el.type === 'checkbox') return el.checked;
    return el.dataset.valid === 'true';
  });

  submitBtn.disabled = !allOk;
  submitBtn.classList.toggle('bg-blue-600', allOk);
  submitBtn.classList.toggle('text-white', allOk);
  submitBtn.classList.toggle('hover:bg-blue-700', allOk);
  submitBtn.classList.toggle('bg-orange-500', !allOk);
  submitBtn.classList.toggle('cursor-not-allowed', !allOk);
}

// ---------- Attach listeners ----------
// תאימות לאחור: (phoneSelector, emailSelector)
// הרחבה: (phoneSelector, emailSelector, institutionSelector?, formSelector?)
export function attachValidationListeners(phoneSelector, emailSelector, institutionSelector, formSelector) {
  const phoneInput = phoneSelector ? document.querySelector(phoneSelector) : null;
  const emailInput = emailSelector ? document.querySelector(emailSelector) : null;
  const instInput  = institutionSelector ? document.querySelector(institutionSelector) : null;

  const inputs = [phoneInput, emailInput, instInput].filter(Boolean);

  // אתחול ראשוני (צבעים + מצב submit)
  inputs.forEach(input => {
    // אם חסר data-validate—נגדיר לפי הסלקטור
    if (input === phoneInput && !input.dataset.validate) input.dataset.validate = 'phone';
    if (input === instInput  && !input.dataset.validate) input.dataset.validate = 'institution';

    validateFieldAndStyle(input);
    refreshSubmitStateFor(input);
  });

  // מאזינים
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      validateFieldAndStyle(input);
      refreshSubmitStateFor(input);
    });
    input.addEventListener('change', () => {
      validateFieldAndStyle(input);
      refreshSubmitStateFor(input);
    });
    input.addEventListener('blur', () => validateFieldAndStyle(input));
  });

  // לטפל גם ב־checkbox required בטופס (למשל terms)
  const form = formSelector ? document.querySelector(formSelector) : (phoneInput?.form || emailInput?.form || instInput?.form);
  if (form) {
    const requiredChecks = Array.from(form.querySelectorAll('input[type="checkbox"][required]'));
    requiredChecks.forEach(chk => {
      chk.addEventListener('change', () => refreshSubmitStateFor(chk));
    });

    // רענון מצב submit בהתחלה
    refreshSubmitStateFor(requiredChecks[0] || inputs[0] || form);
  }
}
