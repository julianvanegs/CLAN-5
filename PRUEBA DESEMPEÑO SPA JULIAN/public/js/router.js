// js/router.js
const Router = (() => {
  const routes = {
    '/login': Views.renderLogin,
    '/register': Views.renderRegister,
    '/tickets': Views.renderTickets,
    '/users': Views.renderUsers,
  };

  const navigate = (path) => {
    location.hash = path;
  };

  const resolve = () => {
    const path = location.hash.replace('#', '') || '/tickets';
    const redirect = Middleware.check(path);

    // Update nav
    Views.renderNav();

    const app = document.getElementById('app');
    // Keep nav, replace content
    let content = document.getElementById('main-content');
    if (!content) {
      content = document.createElement('div');
      content.id = 'main-content';
      app.appendChild(content);
    }

    if (redirect === 'denied') {
      Views.renderDenied(content);
      return;
    }
    if (redirect) {
      navigate(redirect);
      return;
    }

    const renderFn = routes[path];
    if (renderFn) renderFn(content);
    else { content.innerHTML = `<div class="denied"><h2>404</h2><p>Page not found.</p></div>`; }
  };

  const init = () => {
    window.addEventListener('hashchange', resolve);
    resolve();
  };

  return { navigate, resolve, init };
})();
