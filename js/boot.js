// /js/boot.js
window.addEventListener('DOMContentLoaded', () => {
  // AOS (במקום onload inline)
  if (window.AOS) {
    AOS.init({ once: false });
  }

  // הגדרות נגישלי (במקום inline <script> כפולים)
  window.nl_pos = "br";
  window.nl_compact = "1";
  window.nl_accordion = "1";
  window.nl_contact = "u:info";
});
