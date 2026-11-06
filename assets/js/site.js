/* mvdmio marketing site — the one shared script (no build step).
   Page view: loads mvdm.io Statistics' script, which sends one cookieless Page view.
   Mobile nav toggle: opens/closes the nav links behind the hamburger. */
(function () {
  var script = document.createElement('script');
  script.src = 'https://statistics.mvdm.io/visits.js';
  script.setAttribute('data-project', '1');
  document.head.appendChild(script);
})();

(function () {
  var nav = document.getElementById('site-nav');
  var toggle = nav.querySelector('.nav-toggle');
  toggle.addEventListener('click', function () {
    var open = nav.getAttribute('data-open') === 'true';
    nav.setAttribute('data-open', String(!open));
    toggle.setAttribute('aria-expanded', String(!open));
  });
})();
