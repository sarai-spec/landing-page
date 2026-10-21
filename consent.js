/* Cookie consent (PDPA) for GA4 with Google Consent Mode v2.
   The default (denied, or the saved choice) is set inline in <head> before gtag config. This file shows the banner,
   saves the choice in localStorage ('tj-consent' = granted | denied) and follows the in-page TH/EN switch. */
(function(){
  const KEY = 'tj-consent';
  const T = {
    th: { text: 'เราใช้คุกกี้เพื่อดูว่าคนใช้เว็บนี้อย่างไร แล้วนำไปปรับเว็บให้ดีขึ้น ไม่ใช้ยิงโฆษณา และไม่ขายข้อมูลของคุณ', yes: 'ยอมรับ', no: 'ไม่ยอมรับ', label: 'การใช้คุกกี้', settings: 'ตั้งค่าคุกกี้' },
    en: { text: 'We use cookies to see how people use this site, so we can make it better. No ads, no selling your data.', yes: 'Accept', no: 'Decline', label: 'Cookie consent', settings: 'Cookie settings' }
  };
  const read = () => { try { return localStorage.getItem(KEY); } catch(e){ return null; } };
  const save = v => { try { localStorage.setItem(KEY, v); } catch(e){} };

  const box = document.createElement('div');
  box.className = 'cookie';
  box.setAttribute('role', 'region');
  box.hidden = true;
  box.innerHTML = '<p></p><div class="cookie-acts"><button type="button" class="btn btn-ghost" data-c="denied"></button><button type="button" class="btn btn-primary" data-c="granted"></button></div>';
  document.body.append(box);

  const link = document.createElement('button');
  link.type = 'button';
  link.className = 'cookie-link';
  document.querySelector('.footer .bottom')?.append(link);

  const render = () => {
    const L = T[document.documentElement.lang === 'en' ? 'en' : 'th'];
    box.setAttribute('aria-label', L.label);
    box.querySelector('p').textContent = L.text;
    box.querySelector('[data-c="denied"]').textContent = L.no;
    box.querySelector('[data-c="granted"]').textContent = L.yes;
    link.textContent = L.settings;
  };
  render();
  document.addEventListener('langchange', render);

  const show = () => { box.hidden = false; requestAnimationFrame(() => box.classList.add('in')); };
  const hide = () => { box.classList.remove('in'); setTimeout(() => { box.hidden = true; }, 250); };
  link.addEventListener('click', show);

  box.addEventListener('click', e => {
    const v = e.target.closest('[data-c]')?.dataset.c;
    if(!v) return;
    save(v);
    if(typeof gtag === 'function') gtag('consent', 'update', { analytics_storage: v });
    window.track?.('consent_choice', { choice: v });
    hide();
  });

  if(!read()) setTimeout(show, 800);
})();
