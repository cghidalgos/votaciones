// Forzar que ion-split-pane active desde md (768px)
// y estilar correctamente los botones del menú en desktop
(function () {
  function fixSplitPane() {
    var splitPane = document.querySelector('ion-split-pane');
    if (splitPane) {
      splitPane.setAttribute('when', 'md');
    } else {
      setTimeout(fixSplitPane, 100);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixSplitPane);
  } else {
    fixSplitPane();
  }

  // También intentar después de que Angular/Ionic cargue
  setTimeout(fixSplitPane, 500);
  setTimeout(fixSplitPane, 1500);

  // redirigir automáticamente a panel de administrador si el usuario logueado es admin
  function redirectAdmin() {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const parts = token.split('.');
      if (parts.length !== 3) return;
      const payload = JSON.parse(atob(parts[1]));
      if (payload.role && String(payload.role).toLowerCase() === 'admin') {
        if (window.location.pathname.startsWith('/voter')) {
          window.location.pathname = '/admin';
        }
      }
    } catch (e) {
      // ignore invalid token
    }
  }

  document.addEventListener('DOMContentLoaded', redirectAdmin);
  // in case the page changes after login without full reload
  setInterval(redirectAdmin, 1000);
})();
