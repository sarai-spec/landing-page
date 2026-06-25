/* ===== ตั้งใจทำบัญชี — interactions ===== */
(function(){
  'use strict';

  /* Sticky header shadow */
  const header = document.getElementById('header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, {passive:true});

  /* Mobile drawer */
  const drawer = document.getElementById('drawer');
  const toggle = document.getElementById('menuToggle');
  const openDrawer = () => { drawer.classList.add('open'); document.body.style.overflow='hidden'; };
  const closeDrawer = () => { drawer.classList.remove('open'); document.body.style.overflow=''; };
  toggle.addEventListener('click', openDrawer);
  drawer.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeDrawer));
  document.addEventListener('keydown', e => { if(e.key === 'Escape') closeDrawer(); });

  /* Scroll reveal */
  const reveals = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, {threshold:0.12, rootMargin:'0px 0px -40px 0px'});
    reveals.forEach(r => io.observe(r));
  } else {
    reveals.forEach(r => r.classList.add('in'));
  }

  /* Count-up stats (language-aware suffix) */
  const counters = document.querySelectorAll('[data-count]');
  const suffixFor = (el) => (window.appLang === 'en' && el.getAttribute('data-suffix-en') != null)
    ? el.getAttribute('data-suffix-en')
    : (el.getAttribute('data-suffix') || '');
  function renderCount(el){
    el.textContent = Math.round(parseFloat(el.getAttribute('data-count'))).toLocaleString('en-US') + suffixFor(el);
  }
  function animateCount(el){
    const target = parseFloat(el.getAttribute('data-count'));
    const dur = 1400; const start = performance.now();
    function tick(now){
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString('en-US') + suffixFor(el);
      if(p < 1) requestAnimationFrame(tick); else el.dataset.done = '1';
    }
    requestAnimationFrame(tick);
  }
  if('IntersectionObserver' in window){
    const cio = new IntersectionObserver((entries) => {
      entries.forEach(en => { if(en.isIntersecting){ animateCount(en.target); cio.unobserve(en.target); } });
    }, {threshold:0.6});
    counters.forEach(c => cio.observe(c));
  } else {
    counters.forEach(c => { c.dataset.done = '1'; renderCount(c); });
  }

  /* Hero progress bar grow on load */
  window.addEventListener('load', () => {
    const fill = document.getElementById('mpFill');
    if(fill){ const w = fill.style.width; fill.style.width = '0%'; setTimeout(() => { fill.style.width = w; }, 350); }
  });

  /* FAQ accordion */
  document.querySelectorAll('.faq .q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const ans = item.querySelector('.a');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq.open').forEach(o => {
        o.classList.remove('open');
        o.querySelector('.a').style.maxHeight = null;
      });
      if(!isOpen){
        item.classList.add('open');
        ans.style.maxHeight = ans.scrollHeight + 'px';
      }
    });
  });
  window.addEventListener('resize', () => {
    const open = document.querySelector('.faq.open .a');
    if(open) open.style.maxHeight = open.scrollHeight + 'px';
  });

  /* Credentials slider */
  (function(){
    const track = document.getElementById('credsTrack');
    if(!track) return;
    const prev = document.getElementById('credsPrev');
    const next = document.getElementById('credsNext');
    const dotsWrap = document.getElementById('credsDots');
    const cards = [...track.querySelectorAll('.cred')];
    const step = () => { const c = track.querySelector('.cred'); return c ? c.getBoundingClientRect().width + 22 : 300; };

    // build dots (one per card)
    cards.forEach((c, i) => {
      const b = document.createElement('button');
      b.setAttribute('aria-label', 'ไปการ์ดที่ ' + (i + 1));
      b.addEventListener('click', () => track.scrollTo({ left: i * step(), behavior: 'smooth' }));
      dotsWrap.appendChild(b);
    });
    const dots = [...dotsWrap.children];

    function update(){
      const max = track.scrollWidth - track.clientWidth;
      prev.disabled = track.scrollLeft <= 4;
      next.disabled = track.scrollLeft >= max - 4;
      const idx = Math.round(track.scrollLeft / step());
      dots.forEach((d, i) => d.classList.toggle('active', i === Math.min(idx, dots.length - 1)));
    }
    prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
    next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
    track.addEventListener('scroll', () => { window.requestAnimationFrame(update); }, { passive: true });
    window.addEventListener('resize', update);
    update();
  })();

  /* Pricing toggle (language-aware period suffix & notes) */
  const tg = document.getElementById('priceTg');
  let currentPeriod = 'month';
  const PER = { month: { th: '/ เดือน', en: '/ mo' }, year: { th: '/ ปี', en: '/ yr' } };
  function applyPricing(){
    if(!tg) return;
    const period = currentPeriod;
    const en = window.appLang === 'en';
    tg.classList.toggle('year', period === 'year');
    tg.querySelectorAll('button').forEach(b => b.classList.toggle('active', b.dataset.period === period));
    document.querySelectorAll('.plan').forEach(plan => {
      const amt = plan.querySelector('.amt');
      const per = plan.querySelector('.per');
      const note = plan.querySelector('.pnote');
      if(amt && amt.getAttribute('data-' + period)) amt.textContent = amt.getAttribute('data-' + period);
      if(per && per.getAttribute('data-' + period) !== null) per.textContent = en ? PER[period].en : PER[period].th;
      if(note && note.getAttribute('data-note-' + period)){
        const enNote = note.getAttribute('data-note-' + period + '-en');
        note.textContent = (en && enNote != null) ? enNote : note.getAttribute('data-note-' + period);
      }
    });
  }
  if(tg){
    tg.querySelectorAll('button').forEach(b =>
      b.addEventListener('click', () => { currentPeriod = b.dataset.period; applyPricing(); }));
    applyPricing();
  }

  /* React to language changes from i18n.js */
  document.addEventListener('langchange', () => {
    applyPricing();
    counters.forEach(c => { if(c.dataset.done) renderCount(c); });
    const openFaq = document.querySelector('.faq.open .a');
    if(openFaq) openFaq.style.maxHeight = openFaq.scrollHeight + 'px';
  });

  /* Contact form validation */
  const form = document.getElementById('contactForm');
  if(form){
    const setErr = (field, on) => field.closest('.field').classList.toggle('err', on);
    const name = form.querySelector('#f-name');
    const phone = form.querySelector('#f-phone');
    [name, phone].forEach(f => f.addEventListener('input', () => {
      if(f.closest('.field').classList.contains('err')) validateField(f);
    }));
    function validateField(f){
      let ok = true;
      if(f === name) ok = f.value.trim().length >= 2;
      if(f === phone) ok = /^[0-9\-\s]{9,12}$/.test(f.value.trim()) && f.value.replace(/\D/g,'').length >= 9;
      setErr(f, !ok);
      return ok;
    }
    const SHEET_URL = 'https://script.google.com/macros/s/AKfycbxrW36EaEoQDBEObmBKkFWONylt2A3ZUEET7jbxZzBH8dqP_7iHCQneW0aJUV2OV3s8/exec';

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const okName = validateField(name);
      const okPhone = validateField(phone);
      if(okName && okPhone){
        const submitBtn = form.querySelector('[type="submit"]');
        if(submitBtn) submitBtn.disabled = true;

        const payload = {
          name: name.value.trim(),
          phone: form.querySelector('#f-phone').value.trim(),
          business: (form.querySelector('#f-biz') || {value:''}).value,
          service: (form.querySelector('#f-service') || {value:''}).value,
          message: (form.querySelector('#f-msg') || {value:''}).value.trim()
        };

        fetch(SHEET_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(payload)
        })
        .finally(() => {
          document.getElementById('formBody').style.display = 'none';
          document.getElementById('formSuccess').classList.add('show');
        });
      } else {
        const firstErr = form.querySelector('.field.err input');
        if(firstErr) firstErr.focus();
      }
    });
  }

  /* Active nav link on scroll */
  const sections = ['services','why','credentials','process','pricing','faq','contact'];
  const navLinks = document.querySelectorAll('.nav-links a');
  if('IntersectionObserver' in window && navLinks.length){
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if(en.isIntersecting){
          navLinks.forEach(a => a.style.color = a.getAttribute('href') === '#'+en.target.id ? 'var(--ink)' : '');
        }
      });
    }, {rootMargin:'-45% 0px -50% 0px'});
    sections.forEach(id => { const el = document.getElementById(id); if(el) spy.observe(el); });
  }
})();
