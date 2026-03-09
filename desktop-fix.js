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
})();
