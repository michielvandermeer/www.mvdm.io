/* PROTOTYPE — throwaway. Do not ship.
   Question: how do people reach pages that no longer have a primary
   place in the top bar? Dropdown vs index vs utility row vs Flagship + More.
   Four variants on every existing page, gated by ?variant=A|B|C|D. */
(function () {
  var KEYS = ['A', 'B', 'C', 'D'];
  var NAMES = {
    A: 'Products dropdown',
    B: 'Products index',
    C: 'Utility row',
    D: 'Flagship + More'
  };
  var SUMMARIES = {
    A: 'Top bar: Products ▾, Blog, About, Get started. Footer is two lines on every variant.',
    B: 'Top bar: Products (a real page), Blog, About, Get started. Footer is two lines on every variant.',
    C: 'Slim row: Open source, Blog, About, Resume. Main bar: all five Products. Footer: identity and email, then the five Legal pages.',
    D: 'Top bar: Compliance, Translation Tools, More ▾, Get started. Footer is two lines on every variant.'
  };

  var PRODUCTS = [
    { href: '/products/compliance/', name: 'Compliance', blurb: 'Certification-ready management system.', n: '01' },
    { href: '/products/translation-tools/', name: 'Translation Tools', blurb: 'Your .resx files, translated for you.', n: '02' },
    { href: '/products/health-check/', name: 'Health Check', blurb: 'Uptime, SSL, DNS and smoke tests.', n: '03' },
    { href: '/products/statistics/', name: 'Statistics', blurb: 'Request-level analytics you own.', n: '04' },
    { href: '/products/commonplace/', name: 'Commonplace', blurb: 'A personal commonplace book.', n: '05' }
  ];

  var LEGAL = [
    { href: '/legal/terms/', name: 'Terms of Service' },
    { href: '/legal/privacy/', name: 'Privacy Notice' },
    { href: '/legal/dpa/', name: 'Data Processing Agreement' },
    { href: '/legal/subprocessors/', name: 'Subprocessors' },
    { href: '/legal/company/', name: 'Company details' }
  ];

  function currentKey() {
    var v = new URLSearchParams(location.search).get('variant');
    return KEYS.indexOf(v) === -1 ? 'C' : v;
  }

  function withVariant(href, key) {
    var u = new URL(href, location.origin);
    if (u.origin !== location.origin) return href;
    u.searchParams.set('variant', key);
    return u.pathname + u.search + u.hash;
  }

  function productLinks() {
    return PRODUCTS.map(function (p) {
      return '<a href="' + p.href + '">' + p.name + '</a>';
    }).join('');
  }

  function productPanel() {
    return PRODUCTS.map(function (p) {
      return (
        '<a href="' + p.href + '">' +
          '<span class="num">' + p.n + '</span>' +
          '<span class="name">' + p.name + '</span>' +
          '<span class="blurb">' + p.blurb + '</span>' +
        '</a>'
      );
    }).join('');
  }

  function topHtml(key) {
    var cta = '<span class="nav-cta"><a class="btn" href="https://compliance.mvdm.io">Get started</a></span>';
    if (key === 'A') {
      return (
        '<details class="nav-drop" id="proto-drop">' +
          '<summary>Products</summary>' +
          '<div class="nav-drop-panel wide">' + productPanel() + '</div>' +
        '</details>' +
        '<a href="/blog/">Blog</a>' +
        '<a href="/about/">About</a>' +
        cta
      );
    }
    if (key === 'B') {
      return (
        '<a href="/products/">Products</a>' +
        '<a href="/blog/">Blog</a>' +
        '<a href="/about/">About</a>' +
        cta
      );
    }
    if (key === 'C') {
      return productLinks() + cta;
    }
    var more = [
      { href: '/products/health-check/', name: 'Health Check', group: 'Products' },
      { href: '/products/statistics/', name: 'Statistics', group: 'Products' },
      { href: '/products/commonplace/', name: 'Commonplace', group: 'Products' },
      { href: '/open-source/', name: 'Open source', group: 'Site' },
      { href: '/blog/', name: 'Blog', group: 'Site' },
      { href: '/about/', name: 'About', group: 'Site' },
      { href: '/projects/', name: 'Resume', group: 'Site' }
    ];
    var lastGroup = '';
    var moreHtml = more.map(function (item) {
      var label = '';
      if (item.group !== lastGroup) {
        label = '<div class="drop-label">' + item.group + '</div>';
        lastGroup = item.group;
      }
      return label + '<a href="' + item.href + '">' + item.name + '</a>';
    }).join('');
    return (
      '<a href="/products/compliance/">Compliance</a>' +
      '<a href="/products/translation-tools/">Translation Tools</a>' +
      '<details class="nav-drop" id="proto-drop">' +
        '<summary>More</summary>' +
        '<div class="nav-drop-panel simple">' + moreHtml + '</div>' +
      '</details>' +
      cta
    );
  }

  function utilHtml(key) {
    if (key !== 'C') return '';
    return (
      '<div class="proto-util"><div class="wrap proto-util-inner">' +
        '<a href="/open-source/">Open source</a>' +
        '<a href="/blog/">Blog</a>' +
        '<a href="/about/">About</a>' +
        '<a href="/projects/">Resume</a>' +
      '</div></div>'
    );
  }

  function footerHtml() {
    var legal = LEGAL.map(function (l, i) {
      return '<a' + (i ? ' class="foot-sep"' : '') + ' href="' + l.href + '">' + l.name + '</a>';
    }).join('');
    return (
      '<p class="foot-id">' +
        '<span class="wordmark">mvdmio</span>' +
        '<span class="foot-sep">Built by Michiel van der Meer</span>' +
        '<a class="foot-sep" href="mailto:michiel@mvdm.io">michiel@mvdm.io</a>' +
      '</p>' +
      '<p class="foot-legal">' + legal + '</p>'
    );
  }

  function stateHtml(key) {
    return (
      '<div class="proto-state" role="note">' +
        '<b>PROTOTYPE ' + key + ' — ' + NAMES[key] + '</b><br>' +
        '<span>' + SUMMARIES[key] + '</span>' +
      '</div>'
    );
  }

  function switcherHtml(key) {
    return (
      '<div class="proto-switcher" role="navigation" aria-label="Prototype variants">' +
        '<button type="button" data-dir="-1" aria-label="Previous variant">←</button>' +
        '<div class="label"><small>Variant</small>' + key + ' — ' + NAMES[key] + '</div>' +
        '<button type="button" data-dir="1" aria-label="Next variant">→</button>' +
      '</div>'
    );
  }

  function go(key) {
    var u = new URL(location.href);
    u.searchParams.set('variant', key);
    location.assign(u.pathname + u.search + u.hash);
  }

  function nextKey(key, dir) {
    var i = KEYS.indexOf(key);
    return KEYS[(i + dir + KEYS.length) % KEYS.length];
  }

  function stampLinks(key) {
    document.querySelectorAll('a[href]').forEach(function (a) {
      var raw = a.getAttribute('href');
      if (!raw || raw.charAt(0) === '#') return;
      if (/^(https?:|mailto:|javascript:)/i.test(raw)) return;
      a.setAttribute('href', withVariant(raw, key));
    });
  }

  function bindDrop() {
    var drop = document.getElementById('proto-drop');
    if (!drop) return;
    document.addEventListener('click', function (e) {
      if (!drop.open) return;
      if (drop.contains(e.target)) return;
      drop.open = false;
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drop.open) drop.open = false;
    });
  }

  function paint() {
    var key = currentKey();
    document.documentElement.setAttribute('data-proto-variant', key);

    var header = document.getElementById('site-nav');
    var links = document.getElementById('nav-links');
    var footer = document.querySelector('.site-footer .foot-inner');
    if (!header || !links || !footer) return;

    var oldUtil = header.querySelector('.proto-util');
    if (oldUtil) oldUtil.remove();
    var util = utilHtml(key);
    if (util) header.insertAdjacentHTML('afterbegin', util);

    links.innerHTML = topHtml(key);
    footer.classList.add('proto-foot');
    footer.innerHTML = footerHtml();

    var oldState = document.querySelector('.proto-state');
    if (oldState) oldState.remove();
    var skip = document.querySelector('.skip-link');
    if (skip) skip.insertAdjacentHTML('afterend', stateHtml(key));
    else document.body.insertAdjacentHTML('afterbegin', stateHtml(key));

    if (!document.querySelector('.proto-switcher')) {
      document.body.insertAdjacentHTML('beforeend', switcherHtml(key));
    }

    stampLinks(key);
    bindDrop();

    document.querySelectorAll('.proto-switcher button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        go(nextKey(key, Number(btn.getAttribute('data-dir'))));
      });
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    var t = e.target;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
    var key = currentKey();
    go(nextKey(key, e.key === 'ArrowRight' ? 1 : -1));
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', paint);
  } else {
    paint();
  }
})();
