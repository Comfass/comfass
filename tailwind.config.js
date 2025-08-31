// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './**/*.html',
    './**/*.{js,ts,jsx,tsx}',
    './js/**/*.js',
    './components/**/*.{html,js}',
  ],
  safelist: [
    // אייקוני פלוס/מינוס, טרנספורמים, מצבי תצוגה
    'rotate-45', 'rotate-0', 'hidden', 'block', 'flex', 'grid',
    // AOS/ספריות חיצוניות אם אתה משנה מחלקות ב-JS
    { pattern: /(bg|text|border)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900)/ },
    { pattern: /(from|via|to)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(100|200|300|400|500|600|700|800|900)/ },
    { pattern: /(ring|outline)-(.*)/ },
    { pattern: /(w|h|p|m|gap|inset|left|right|top|bottom)-\d+/ },
    { pattern: /(opacity|z|order)-\d+/ },
  ],
  theme: { extend: {} },
  plugins: [],
}
