// js/app.js
document.addEventListener('DOMContentLoaded', () => {
  // Inactivity warning banner
  const warn = document.createElement('div');
  warn.id = 'inactivity-warn';
  warn.textContent = '⚠ Session expires in 30s due to inactivity';
  document.body.appendChild(warn);

  Session.trackActivity();
  if (Session.isLoggedIn()) Session.resetTimer();

  Router.init();
});
