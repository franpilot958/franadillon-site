/* Language switch (EN / DE / ES). No cookies, no tracking.
   Order of choice: ?lang=de in the URL > last choice (if the browser allows storing it) > browser language > English. */
(function () {
  var langs = ['en', 'de', 'es'];
  var root = document.documentElement;

  function pick() {
    var fromUrl = null, saved = null;
    try { fromUrl = new URLSearchParams(location.search).get('lang'); } catch (e) {}
    try { saved = localStorage.getItem('lang'); } catch (e) {}
    var nav = ((navigator.language || 'en') + '').slice(0, 2).toLowerCase();
    if (nav === 'ca') nav = 'es'; // Catalan speakers: show Spanish
    var order = [fromUrl, saved, nav];
    for (var i = 0; i < order.length; i++) {
      if (langs.indexOf(order[i]) !== -1) return order[i];
    }
    return 'en';
  }

  function apply(l, remember) {
    root.setAttribute('data-lang', l);
    root.setAttribute('lang', l);
    if (remember) { try { localStorage.setItem('lang', l); } catch (e) {} }
    var btns = document.querySelectorAll('[data-set-lang]');
    for (var i = 0; i < btns.length; i++) {
      btns[i].setAttribute('aria-pressed', btns[i].getAttribute('data-set-lang') === l ? 'true' : 'false');
    }
  }

  apply(pick(), false); // runs immediately, before the page is painted

  document.addEventListener('DOMContentLoaded', function () {
    apply(root.getAttribute('data-lang'), false);
    var btns = document.querySelectorAll('[data-set-lang]');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function () { apply(this.getAttribute('data-set-lang'), true); });
    }
  });
})();
