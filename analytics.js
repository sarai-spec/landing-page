/* GA4 behaviour tracking (G-1XQ6BK5133). The gtag snippet in <head> loads GA itself; this file only sends events.
   Every event carries site_lang (the language the visitor is reading in, which can switch in-page). */
(function(){
  const clean = s => (s || '').replace(/\s+/g, ' ').trim().slice(0, 100);
  const track = window.track = (name, params = {}) => {
    if(typeof gtag === 'function') gtag('event', name, { site_lang: document.documentElement.lang || 'th', ...params });
  };
  const once = new Set();
  const trackOnce = (key, name, params) => { if(!once.has(key)){ once.add(key); track(name, params); } };

  // Where on the page something happened: drawer/header/footer, else the nearest section id
  const where = el => {
    if(el.closest('.drawer')) return 'drawer';
    if(el.closest('header, .nav')) return 'header';
    if(el.closest('footer')) return 'footer';
    const sec = el.closest('section');
    return sec ? (sec.id || sec.classList[0] || 'section') : 'page';
  };
  const label = el => {
    if(el.getAttribute('aria-label')) return clean(el.getAttribute('aria-label'));
    const c = el.cloneNode(true); c.querySelectorAll('small, svg, i').forEach(n => n.remove());
    return clean(c.textContent);
  };
  const activeTab = () => clean(document.querySelector('.ptab.active')?.textContent);

  // ---------- Clicks ----------
  document.addEventListener('click', e => {
    const el = e.target.closest('a[href], button');
    if(!el) return;
    const loc = where(el), text = label(el);

    if(el.matches('.menu-toggle')) return track('menu_open');
    if(el.matches('.ptab')) return track('pricing_tab', { tab: text });
    if(el.dataset.period) return track('pricing_period', { period: el.dataset.period, tab: activeTab() });
    if(el.closest('.lang-switch')) return el.dataset.lang && track('language_switch', { to: el.dataset.lang, link_location: loc });
    if(el.matches('.faq .q')) return el.closest('.faq').classList.contains('open') && track('faq_open', { question: text });  // script.js has already toggled it
    if(el.tagName === 'BUTTON') return;

    const href = el.getAttribute('href');
    const p = { link_location: loc, link_text: text };
    if(href.startsWith('tel:')) return track('contact_phone', { ...p, number: href.slice(4) });
    if(href.startsWith('mailto:')) return track('contact_email', p);
    if(href.includes('line.me')) return track('contact_line', p);
    if(href === '#') return;
    // "ขอใบเสนอราคา" on a pricing card: which plan in which tab
    const plan = el.closest('.plan');
    if(plan) return track('plan_select', { tab: activeTab(), plan: clean(plan.querySelector('.pname')?.textContent), link_text: text });
    const url = new URL(el.href, location.href);
    if(url.host !== location.host) return track('outbound_click', { ...p, link_url: url.href, link_domain: url.host });
    track(el.classList.contains('btn') ? 'cta_click' : 'nav_click', { ...p, target: url.hash || url.pathname });
  });

  // ---------- Which sections get seen (40% on screen, once each) ----------
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver(entries => entries.forEach(x => {
      if(!x.isIntersecting) return;
      const s = x.target, name = s.id || s.classList[0];
      trackOnce('sec' + name, 'section_view', { section: name });
      io.unobserve(s);
    }), { threshold: 0.4 });
    document.querySelectorAll('section').forEach(s => io.observe(s));
  }

  // ---------- Scroll depth 25 / 50 / 75 / 100 ----------
  addEventListener('scroll', () => {
    const h = document.documentElement.scrollHeight - innerHeight;
    if(h <= 0) return;
    const pct = scrollY / h * 100;
    [25, 50, 75, 100].forEach(m => { if(pct >= m - 1) trackOnce('scroll' + m, 'scroll_depth', { percent: m }); });
  }, { passive: true });

  // ---------- Time on page while the tab is visible: 15s, 30s, 60s, 2m, 5m ----------
  let seen = 0;
  setInterval(() => {
    if(document.visibilityState !== 'visible') return;
    seen += 5;
    [15, 30, 60, 120, 300].forEach(s => { if(seen >= s) trackOnce('time' + s, 'time_on_page', { seconds: s }); });
  }, 5000);

  // ---------- Contact form: start, picks, errors, lead ----------
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('focusin', () => trackOnce('formstart', 'form_start_contact'));
    form.addEventListener('change', e => {
      const t = e.target;
      if(t.id === 'f-biz' && t.value) track('contact_pick_business', { business: clean(t.value) });
      if(t.id === 'f-service' && t.value) track('contact_pick_service', { service_type: clean(t.value) });
    });
    // script.js validates first and disables the submit button only when the form is sent
    form.addEventListener('submit', () => setTimeout(() => {
      const bad = [...form.querySelectorAll('.field.err')].map(f => f.querySelector('input, select, textarea')?.name || 'field');
      if(bad.length) return track('contact_error', { fields: bad.join(',') });
      if(form.querySelector('[type="submit"]')?.disabled) track('generate_lead', {
        service_type: clean(form.querySelector('#f-service')?.value) || 'none',
        business: clean(form.querySelector('#f-biz')?.value) || 'none'
      });
    }));
  }

  // ---------- JS errors ----------
  addEventListener('error', e => trackOnce('err' + e.message, 'js_error', { message: clean(e.message), source: clean((e.filename || '').split('/').pop()) + ':' + e.lineno }));
})();
