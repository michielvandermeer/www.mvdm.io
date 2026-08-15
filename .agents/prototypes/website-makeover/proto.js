// PROTOTYPE — throwaway. Variant switcher for the mvdm.io makeover prototype.
// Three variants of homepage + Compliance landing page, gated by ?variant= (A|B|C).
(function () {
  const VARIANTS = [
    { key: 'A', name: 'Boardroom' },
    { key: 'B', name: 'Index' },
    { key: 'C', name: 'Console' },
  ];

  function currentKey() {
    const p = new URLSearchParams(location.search).get('variant');
    return VARIANTS.some(v => v.key === p) ? p : 'A';
  }

  function apply(key) {
    document.querySelectorAll('.proto-root').forEach(el => {
      el.hidden = el.dataset.variant !== key;
    });
    document.body.dataset.variant = key;
    // Keep the variant when navigating between prototype pages.
    document.querySelectorAll('a[href$=".html"], a[href*=".html#"]').forEach(a => {
      const url = new URL(a.getAttribute('href'), location.href);
      if (url.origin === location.origin || location.protocol === 'file:') {
        url.searchParams.set('variant', key);
        a.setAttribute('href', url.pathname.split('/').pop() + url.search + url.hash);
      }
    });
    const v = VARIANTS.find(v => v.key === key);
    const label = document.getElementById('proto-label');
    if (label) label.textContent = v.key + ' — ' + v.name;
  }

  function go(delta) {
    const i = VARIANTS.findIndex(v => v.key === currentKey());
    const next = VARIANTS[(i + delta + VARIANTS.length) % VARIANTS.length].key;
    const url = new URL(location.href);
    url.searchParams.set('variant', next);
    history.replaceState(null, '', url);
    apply(next);
  }

  function buildSwitcher() {
    const bar = document.createElement('div');
    bar.id = 'proto-switcher';
    bar.innerHTML =
      '<button type="button" id="proto-prev" aria-label="Previous variant">&#8592;</button>' +
      '<span id="proto-label"></span>' +
      '<button type="button" id="proto-next" aria-label="Next variant">&#8594;</button>';
    document.body.appendChild(bar);
    bar.querySelector('#proto-prev').addEventListener('click', () => go(-1));
    bar.querySelector('#proto-next').addEventListener('click', () => go(1));
  }

  document.addEventListener('keydown', e => {
    const t = e.target;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
    if (e.key === 'ArrowLeft') go(-1);
    if (e.key === 'ArrowRight') go(1);
  });

  buildSwitcher();
  apply(currentKey());
})();
