// Inlined into every page's <head> by BaseLayout: `pagereveal` has to be heard before the
// first frame.
//
// Moving between pages is a plain cross-fade (src/styles/transitions.css). The one exception
// is the post the visitor picks: its title (marked `data-hero`) flies from where it was clicked
// to its place on the next page, like a Flutter Hero. (Project cards open a dialog instead.)
(function () {
  var STORAGE_KEY = 'hero-transition';

  function clearHeroes() {
    document.querySelectorAll('[data-hero]').forEach(function (element) {
      element.style.viewTransitionName = '';
    });
  }

  document.addEventListener('click', function (event) {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    var link = event.target.closest('a[href]');
    if (!link || link.target || link.origin !== location.origin) return;
    var source = link.matches('[data-hero]') ? link : link.querySelector('[data-hero]');
    if (!source) return;
    clearHeroes();
    source.style.viewTransitionName = 'hero';
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ key: source.dataset.hero, path: link.pathname }));
    } catch (error) {
      // No storage: the page still cross-fades, just without the hero.
    }
  });

  window.addEventListener('pagereveal', function (event) {
    var hero = null;
    try {
      hero = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (error) {}

    var transition = event.viewTransition;
    if (!transition) return;
    // A transition the browser skips (the tab was hidden, say) rejects `ready`; that's fine.
    transition.ready.catch(function () {});

    if (!hero || hero.path !== location.pathname) return;
    var target = document.querySelector('[data-hero="' + CSS.escape(hero.key) + '"]');
    if (!target) return;
    target.style.viewTransitionName = 'hero';
    transition.finished.then(clearHeroes);
  });

  // The page being left has been captured by now; clear its hero in case the back/forward
  // cache brings it back.
  window.addEventListener('pagehide', clearHeroes);
})();
