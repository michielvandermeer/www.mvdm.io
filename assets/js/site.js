(function () {
  var script = document.createElement('script');
  script.src = 'https://statistics.mvdm.io/visits.js';
  script.setAttribute('data-project', '1');
  document.head.appendChild(script);
})();

(function () {
  fetch('/cdn-cgi/trace')
    .then(function (response) {
      return response.ok ? response.text() : '';
    })
    .then(function (trace) {
      if (!/^loc=US$/m.test(trace)) {
        return;
      }
      document.querySelectorAll('[data-currency]').forEach(function (sign) {
        sign.textContent = '$';
      });
    });
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
