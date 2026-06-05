// js/middleware.js
const Middleware = (() => {
  // Returns null if OK, or a redirect path / 'denied'
  const check = (route) => {
    if (!Session.isLoggedIn()) {
      if (route === '/login' || route === '/register') return null;
      return '/login';
    }
    const role = Session.getRole();
    // Logged in, trying to go to login/register → redirect home
    if (route === '/login' || route === '/register') return '/tickets';

    // Admin-only routes
    if (route === '/users' && role !== ROLES.ADMIN) return 'denied';

    return null; // all clear
  };

  return { check };
})();
