/* ===== ตั้งใจทำบัญชี — TH/EN internationalization =====
   TH is the source content in index.html. This file holds the EN strings and a
   small engine that swaps innerHTML / placeholders / <title> / meta on demand,
   persists the choice, and emits a `langchange` event other scripts react to. */
(function(){
  'use strict';

  const META = {
    en: {
      title: "Chiang Mai Accounting Services | Tang Jai Tam Bunchee — Full-Service Accounting Firm",
      desc: "Full-service Chiang Mai accounting by Tang Jai Tam Bunchee — company registration, monthly bookkeeping, year-end closing, tax filing and accounting systems for SMEs in Chiang Mai and nationwide. Led by a Tax Auditor (TA). 100% on-time filing. Free consultation."
    }
  };

  const EN = {
    // nav / drawer
    "nav.services": `Services`,
    "nav.why": `Why Us`,
    "nav.credentials": `Credentials`,
    "nav.process": `Process`,
    "nav.pricing": `Pricing`,
    "nav.faq": `FAQ`,
    "nav.contact": `Contact`,
    "nav.cta": `Free Consult`,
    "drawer.cta": `Free Consultation — No Cost`,

    // hero
    "hero.eyebrow": `Chiang Mai Accounting Firm — Caring for SMEs`,
    "hero.h1": `Chiang Mai Accounting<br>Bookkeeping & Tax <span class="hl">All in One Place</span><br>with care in every number`,
    "hero.lede": `A Chiang Mai accounting firm handling everything from company registration, monthly bookkeeping and year-end closing to tax filing — all in one place, so you can focus fully on growing your business.`,
    "hero.cta1": `Get a Free Consultation`,
    "hero.cta2": `View Pricing`,
    "hero.reassure1": `CPD-registered accountants`,
    "hero.reassure2": `100% on-time tax filing`,
    "hero.reassure3": `Clear pricing, no add-ons`,

    // hero mock card
    "mock.title": `This Month's Tax Checklist`,
    "mock.pill": `June 2026`,
    "mock.progress.lbl": `This month's progress`,
    "mock.progress.pct": `4 / 5 done`,
    "task1.date": `By 7th`,
    "task1.name": `P.N.D.1, 3, 53 — Withholding Tax`,
    "task1.status": `Filed`,
    "task2.date": `By 15th`,
    "task2.name": `Social Security contributions`,
    "task2.status": `Filed`,
    "task3.date": `By 15th`,
    "task3.name": `P.P.30 — Value Added Tax (VAT)`,
    "task3.status": `Filed`,
    "task4.date": `By 20th`,
    "task4.name": `Monthly management report`,
    "task4.status": `Sent`,
    "task5.date": `Aug 31`,
    "task5.name": `P.N.D.51 — Half-year corporate tax`,
    "task5.status": `Up next`,
    "badge1": `<b>On-time filing</b>no penalties`,
    "badge2": `<b>CPD accountants</b>properly registered`,

    // trust strip
    "trust.lbl": `Serving Chiang Mai and nationwide, across many industries`,
    "trust1": `Restaurants`,
    "trust2": `E-commerce`,
    "trust3": `Construction`,
    "trust4": `Clinics`,
    "trust5": `Import–Export`,
    "trust6": `Factories`,

    // stats
    "stat1.cap": `On-time tax filing`,
    "stat2.cap": `Full-service offerings`,
    "stat3.cap": `Callback within a business day`,
    "stat4.cap": `Properly registered accountants`,

    // services
    "services.eyebrow": `Our Services`,
    "services.h2": `Chiang Mai accounting — every bookkeeping and tax task, all in one place`,
    "services.p": `Whatever stage your business is at, we have the right service for you — from the very first day you register.`,
    "svc1.title": `Company Registration`,
    "svc1.desc": `Open a new company end-to-end — we prepare all documents and handle the whole process.`,
    "svc1.f1": `Company / partnership registration`,
    "svc1.f2": `Tax ID application`,
    "svc1.f3": `VAT registration`,
    "svc2.title": `Monthly Bookkeeping`,
    "svc2.desc": `Accurate, standards-compliant bookkeeping with easy-to-read summaries for owners.`,
    "svc2.f1": `Monthly transaction recording`,
    "svc2.f2": `Trial balance & ledgers`,
    "svc2.f3": `Performance summary reports`,
    "svc3.title": `Year-End Financial Closing`,
    "svc3.desc": `Accurate financial statements, plus auditor coordination and filing with the authorities.`,
    "svc3.f1": `Annual financial statements`,
    "svc3.f2": `Auditor coordination (CPA / TA)`,
    "svc3.f3": `File S.B.Ch.3 and P.N.D.50`,
    "svc4.title": `Complete Tax Filing`,
    "svc4.desc": `We handle every type of tax filing accurately and on time — no more penalty worries.`,
    "svc4.f1": `P.N.D.1, 3, 53 monthly`,
    "svc4.f2": `P.P.30 Value Added Tax`,
    "svc4.f3": `P.N.D.50, 51 corporate income tax`,
    "svc5.title": `Social Security & Payroll`,
    "svc5.desc": `Handle HR paperwork properly and in line with labor law.`,
    "svc5.f1": `Employer–employee registration`,
    "svc5.f2": `File and remit contributions`,
    "svc5.f3": `Payroll documentation`,
    "svc6.title": `Systems & Advisory`,
    "svc6.desc": `Build a strong accounting foundation with proper, legal tax planning to save money.`,
    "svc6.f1": `Document & accounting systems`,
    "svc6.f2": `Annual tax planning`,
    "svc6.f3": `Business advice throughout the contract`,

    // why us
    "why.imgph": `[ Team / office photo ]`,
    "why.quote": `“We believe good accounting isn't just correct numbers — it's a tool that helps business owners make better decisions.”`,
    "why.who": `Managing Director — Tax Auditor (TA)`,
    "why.eyebrow": `Why Us`,
    "why.h2": `We care for your business<br>as if it were our own`,
    "why.p": `More than just bookkeeping — we're committed to being a partner alongside your business through every stage of growth.`,
    "wf1.title": `Professional Accountants`,
    "wf1.desc": `Led by a director who is a licensed Tax Auditor (TA); our CPD-registered team stays current with tax law.`,
    "wf2.title": `100% On-Time Filing`,
    "wf2.desc": `Our reminder and review system means you never pay unnecessary penalties.`,
    "wf3.title": `Clear, Transparent Pricing`,
    "wf3.desc": `Know your costs up front as a package — no hidden fees along the way.`,
    "wf4.title": `A Dedicated Contact`,
    "wf4.desc": `Message us about anything via LINE; our team understands your business and is always ready to help.`,

    // credentials
    "creds.eyebrow": `Licenses & Certifications`,
    "creds.h2": `Practicing the profession lawfully and properly`,
    "creds.p": `We are fully registered and certified, so you can be confident in every service.`,
    "cred1.ph": `Space for the<br>Tax Auditor license`,
    "cred1.nm": `Tax Auditor (TA)`,
    "cred1.sub": `Issued by the Revenue Department`,
    "cred2.ph": `Space for the bookkeeper<br>registration certificate`,
    "cred2.nm": `Bookkeeper (CPD)`,
    "cred2.sub": `Registered with the Department of Business Development`,
    "cred3.ph": `Space for the juristic-person<br>registration certificate`,
    "cred3.nm": `Juristic Person Registration`,
    "cred3.sub": `Limited partnership, properly registered`,
    "cred4.ph": `Space for the accounting-firm<br>standard certificate`,
    "cred4.nm": `Accounting Firm Standard`,
    "cred4.sub": `Operating per DBD guidelines`,
    "creds.note": `* You can display your real licenses or certificates in the slots above to build more trust.`,

    // process
    "process.eyebrow": `How We Work`,
    "process.h2": `Get started easily in 4 steps`,
    "process.p": `It's simpler than you think — we take care of everything from the start, even if you're switching from another firm.`,
    "step1.title": `Free Consultation`,
    "step1.desc": `We talk to understand your business and needs — no cost, no obligation.`,
    "step2.title": `Package Proposal`,
    "step2.desc": `We assess the workload and propose a package suited to your business size.`,
    "step3.title": `Send Documents`,
    "step3.desc": `Start right away — send documents conveniently, online or offline, however you prefer.`,
    "step4.title": `Ongoing Care`,
    "step4.desc": `We do the bookkeeping, file taxes and send you a summary report every month, consistently.`,

    // pricing
    "pricing.eyebrow": `Pricing`,
    "pricing.h2": `Clear pricing, choose by business size`,
    "pricing.p": `Every package includes advisory and has no hidden fees — adjust as your business grows.`,
    "price.month": `Monthly`,
    "price.year": `Yearly`,
    "price.save": `Yearly saves 2 months`,
    "plan.start": `Starting at`,
    "plan.cta": `Choose this plan`,
    "plan1.name": `Starter`,
    "plan1.desc": `For small businesses or newly opened companies`,
    "plan1.f1": `Monthly bookkeeping`,
    "plan1.f2": `Complete monthly tax filing`,
    "plan1.f3": `Annual financial closing`,
    "plan1.f4": `LINE consultation`,
    "plan1.f5": `In-depth tax planning`,
    "plan2.name": `Growth`,
    "plan2.desc": `For expanding businesses with more transactions`,
    "plan2.f1": `Everything in Starter`,
    "plan2.f2": `Monthly management reports`,
    "plan2.f3": `Social Security & Payroll`,
    "plan2.f4": `Annual tax planning`,
    "plan2.f5": `1 dedicated account manager`,
    "plan3.name": `Enterprise`,
    "plan3.desc": `For mid-sized businesses needing tailored care`,
    "plan3.f1": `Everything in Growth`,
    "plan3.f2": `Custom accounting systems`,
    "plan3.f3": `Strategic financial advisory`,
    "plan3.f4": `In-depth analytical reports`,
    "plan3.f5": `A team dedicated to your business`,
    "pricing.note": `* Prices are starting rates; actual fees depend on document volume and business complexity — <a href="#contact" style="color:var(--green-800);font-weight:600">get a free quote</a>`,

    // testimonials
    "reviews.eyebrow": `Customer Voices`,
    "reviews.h2": `Businesses growing with us`,
    "t1.quote": `“Since switching, I've never had to worry about tax filing. The team always reminds me, the reports are easy to understand, and I see my business much more clearly.”`,
    "t1.nm": `Khun Kan Thanawat`,
    "t1.rl": `Restaurant owner, Mueang Chiang Mai`,
    "t2.quote": `“I'd just opened a company with zero accounting knowledge. The team handled everything from registration and explained every detail patiently. Truly recommended for beginners.”`,
    "t2.nm": `Khun Nicha Srisuk`,
    "t2.rl": `Founder, e-commerce brand, Chiang Mai`,
    "t3.quote": `“Clear pricing from the start, never any add-ons later. What impressed me most was the tax-planning advice — it genuinely saved the company money, legally.”`,
    "t3.nm": `Khun Pich Rungrueang`,
    "t3.rl": `Managing Director, Co., Ltd.`,

    // faq
    "faq.eyebrow": `FAQ`,
    "faq.h2": `What customers often ask us`,
    "faq1.q": `Do I need to come to the office, or can I use the service from another province?`,
    "faq1.a": `No need to visit the office. We serve clients in central Chiang Mai, nearby districts such as San Sai, Hang Dong and Saraphi, and clients nationwide — send documents conveniently online, with LINE consultation anytime.`,
    "faq2.q": `How are fees calculated — are there hidden costs?`,
    "faq2.a": `Fees are a monthly package based on document volume and business complexity. We state pricing clearly up front and in the contract, with no add-ons along the way. If the workload changes significantly, we'll always inform and agree with you first.`,
    "faq3.q": `What documents do I need to prepare for bookkeeping?`,
    "faq3.a": `Generally: purchase/sales tax invoices, receipts, bank statements, and various expense documents. You can send them scanned online or as physical documents. We provide a clear checklist after onboarding so submitting is complete and convenient.`,
    "faq4.q": `I just opened a company with no revenue yet — can I still use the service?`,
    "faq4.a": `Absolutely. We have packages specifically for early-stage businesses and help from the registration stage. Even with no revenue, a company must still file tax returns and close its annual accounts — so we help you do it correctly from day one.`,
    "faq5.q": `Is switching from my current accounting firm difficult?`,
    "faq5.a": `Not at all. Our team helps coordinate the handover from your previous firm and checks the continuity of your accounting and tax data. You barely have to do anything yourself, and you can switch at any time of year.`,
    "faq6.q": `How can I reach you during the month?`,
    "faq6.a": `Clients on every package can consult via LINE during business hours. Growth and above include a dedicated account manager who understands your business and is available throughout the contract.`,

    // cta band
    "cta.h2": `Ready to stop worrying about accounting for good`,
    "cta.p": `Book a free consultation with our accounting team today — no cost, no obligation.`,
    "cta.btn": `Book a Free Consult`,

    // contact
    "contact.eyebrow": `Contact Us`,
    "contact.h2": `Getting started is easy — just reach out`,
    "contact.p": `Fill in the form or contact us via the channels below. Our team will get back to you within 1 business day.`,
    "ci.phone": `Phone`,
    "ci.line": `LINE Official`,
    "ci.email": `Email`,
    "ci.addr": `Office Location`,
    "ci.addr.val": `Nimmanhaemin Rd., Mueang Chiang Mai, Chiang Mai 50200`,
    "ci.hours": `Business Hours`,
    "ci.hours.val": `Mon–Fri 09:00–18:00`,
    "form.h3": `Request a Free Consultation`,
    "form.sub": `Fill in a few basics and we'll get back to you as soon as possible.`,
    "form.name": `Full Name`,
    "form.name.ph": `e.g. Somchai Jaidee`,
    "form.name.err": `Please enter your name`,
    "form.phone": `Phone Number`,
    "form.phone.ph": `08X-XXX-XXXX`,
    "form.phone.err": `Please enter a 9–10 digit phone number`,
    "form.biz": `Business Type`,
    "biz.opt0": `Select type`,
    "biz.opt1": `Restaurant / Café`,
    "biz.opt2": `E-commerce / Online`,
    "biz.opt3": `Contractor / Construction`,
    "biz.opt4": `Import–Export`,
    "biz.opt5": `Service / Consulting`,
    "biz.opt6": `Factory / Manufacturing`,
    "biz.opt7": `Other`,
    "form.service": `Service of Interest`,
    "svcopt0": `Select service`,
    "svcopt1": `Company registration`,
    "svcopt2": `Monthly bookkeeping`,
    "svcopt3": `Year-end closing`,
    "svcopt4": `Tax filing`,
    "svcopt5": `Systems / advisory`,
    "svcopt6": `Not sure — need advice`,
    "form.msg": `Additional Details`,
    "form.msg.ph": `Tell us about your business or what you'd like to discuss (optional)`,
    "form.submit": `Submit — Request Free Consult`,
    "form.privacy": `We keep your information confidential and use it only to contact you back.`,
    "form.success.h3": `Got it — thank you!`,
    "form.success.p": `The Tang Jai Tam Bunchee team will contact you within 1 business day.`,

    // footer
    "footer.about": `Tang Jai Tam Bunchee Limited Partnership — a Chiang Mai accounting firm caring for SMEs with attention to every number, full-service from registration to tax filing, serving Chiang Mai and nationwide.`,
    "footer.h.services": `Services`,
    "fs1": `Company registration`,
    "fs2": `Bookkeeping`,
    "fs3": `Financial closing`,
    "fs4": `Tax filing`,
    "fs5": `Systems & advisory`,
    "footer.h.company": `Company`,
    "fc1": `Why us`,
    "fc2": `How we work`,
    "fc3": `Pricing`,
    "fc4": `Customer reviews`,
    "fc5": `FAQ`,
    "footer.h.contact": `Contact`,
    "fcon4": `Nimmanhaemin Rd., Mueang Chiang Mai 50200`,
    "fcon5": `Mon–Fri 09:00–18:00`,
    "footer.copy": `© 2026 Tang Jai Tam Bunchee Limited Partnership · TANG JAI TAM BUNCHEE LIMITED PARTNERSHIP`,
    "footer.legal": `<a href="#">Privacy Policy</a> · <a href="#">Terms of Service</a>`
  };

  // ----- engine -----
  const TH_TITLE = document.title;
  const descEl = document.querySelector('meta[name="description"]');
  const TH_DESC = descEl ? descEl.content : '';
  const original = new WeakMap();   // element -> original TH innerHTML

  function apply(lang){
    const en = lang === 'en';
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      if(!original.has(el)) original.set(el, el.innerHTML);
      const key = el.getAttribute('data-i18n');
      el.innerHTML = en ? (EN[key] != null ? EN[key] : original.get(el)) : original.get(el);
    });

    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      if(el.dataset.phTh == null) el.dataset.phTh = el.getAttribute('placeholder') || '';
      const key = el.getAttribute('data-i18n-ph');
      el.setAttribute('placeholder', en ? (EN[key] != null ? EN[key] : el.dataset.phTh) : el.dataset.phTh);
    });

    document.title = en ? META.en.title : TH_TITLE;
    if(descEl) descEl.content = en ? META.en.desc : TH_DESC;

    document.querySelectorAll('.lang-switch button').forEach(b =>
      b.classList.toggle('active', b.dataset.lang === lang));

    window.appLang = lang;
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  }

  function setLang(lang){
    lang = lang === 'en' ? 'en' : 'th';
    try { localStorage.setItem('lang', lang); } catch(e){}
    apply(lang);
  }
  window.setAppLang = setLang;

  let initial = 'th';
  try { const s = localStorage.getItem('lang'); if(s === 'en' || s === 'th') initial = s; } catch(e){}

  document.querySelectorAll('.lang-switch button').forEach(b =>
    b.addEventListener('click', () => setLang(b.dataset.lang)));

  apply(initial);
})();
