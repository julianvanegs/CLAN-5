// js/session.js
const Session = (() => {
  let _timer = null;
  let _warnTimer = null;

  const get = () => {
    try { return JSON.parse(localStorage.getItem(CONFIG.SESSION_KEY)); }
    catch { return null; }
  };

  const set = (data) => {
    localStorage.setItem(CONFIG.SESSION_KEY, JSON.stringify({ ...data, lastActivity: Date.now() }));
    resetTimer();
  };

  const clear = () => {
    localStorage.removeItem(CONFIG.SESSION_KEY);
    clearTimeout(_timer);
    clearTimeout(_warnTimer);
  };

  const isLoggedIn = () => !!get();
  const getRole = () => get()?.role || null;
  const getUser = () => get();

  const resetTimer = () => {
    clearTimeout(_timer);
    clearTimeout(_warnTimer);
    const warn = document.getElementById('inactivity-warn');
    if (warn) warn.style.display = 'none';

    _warnTimer = setTimeout(() => {
      const w = document.getElementById('inactivity-warn');
      if (w) w.style.display = 'block';
    }, CONFIG.INACTIVITY_MS - 30000);

    _timer = setTimeout(() => {
      clear();
      Router.navigate('/login');
      alert('Session expired due to inactivity.');
    }, CONFIG.INACTIVITY_MS);
  };

  const trackActivity = () => {
    ['click', 'keydown', 'mousemove', 'touchstart'].forEach(ev =>
      document.addEventListener(ev, () => { if (isLoggedIn()) resetTimer(); }, { passive: true })
    );
  };

  return { get, set, clear, isLoggedIn, getRole, getUser, resetTimer, trackActivity };
})();
