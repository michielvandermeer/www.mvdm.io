(function () {
  var script = document.createElement('script');
  script.src = 'https://statistics.mvdm.io/visits.js';
  script.setAttribute('data-project', '1');
  document.head.appendChild(script);
})();

(function () {
  var signs = document.querySelectorAll('[data-currency]');
  var taxWords = document.querySelectorAll('[data-tax]');
  if (signs.length === 0) {
    return;
  }
  fetch('/cdn-cgi/trace')
    .then(function (response) {
      return response.ok ? response.text() : '';
    })
    .then(function (trace) {
      if (!/^loc=US$/m.test(trace)) {
        return;
      }
      signs.forEach(function (sign) {
        sign.textContent = '$';
      });
      taxWords.forEach(function (word) {
        word.textContent = 'tax';
      });
    })
    .catch(function () {});
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
