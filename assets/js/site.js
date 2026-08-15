/* mvdmio marketing site — the one shared script (no build step).
   Mobile nav toggle: opens/closes the nav links behind the hamburger. */
(function () {
  var nav = document.getElementById('site-nav');
  var toggle = nav.querySelector('.nav-toggle');
  toggle.addEventListener('click', function () {
    var open = nav.getAttribute('data-open') === 'true';
    nav.setAttribute('data-open', String(!open));
    toggle.setAttribute('aria-expanded', String(!open));
  });
})();
