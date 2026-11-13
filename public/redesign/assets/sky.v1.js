/* Membership as the Southern Cross (home page #plans). GSAP + ScrollTrigger, loaded just before this file.
   The stage pins; scrolling moves the camera from the whole cross to Imai, Gacrux, Mimosa and Acrux (faintest to
   brightest), then pulls back to the cross with its lines drawn. Reduced motion, no GSAP or a failure: the static
   photo and the cards in a grid (assets/sky.v1.css) stay as they are. */
(function () {
  var sky = document.getElementById('plans');
  if (!sky || !window.gsap || !window.ScrollTrigger) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  try { start(); } catch (e) {
    // back to the static layout, with no pin left behind
    try { window.ScrollTrigger.getAll().forEach(function (t) { t.kill(true); }); } catch (_) {}
    sky.classList.remove('sky--live', 'sky--active');
    if (window.console) console.error(e);
  }

  function start() {
    var gsap = window.gsap, ST = window.ScrollTrigger;
    gsap.registerPlugin(ST);
    sky.classList.add('sky--live');

    var stage = sky.querySelector('.sky-stage'), cam = sky.querySelector('.sky-cam');
    var bloom = sky.querySelector('.sky-bloom'), lines = sky.querySelector('.sky-lines');
    var PLANS = ['imai', 'gacrux', 'mimosa', 'acrux'];
    var star = {}, glow = {}, card = { intro: sky.querySelector('.sky-card--intro') };
    PLANS.forEach(function (p) {
      star[p] = sky.querySelector('.star--' + p);
      glow[p] = star[p].querySelector('.glow');
      card[p] = sky.querySelector('.sky-card[data-plan=' + p + ']');
    });
    var spikes = sky.querySelector('.spikes'), pair = sky.querySelectorAll('.pair i');
    var navBtns = sky.querySelectorAll('.sky-nav button');

    // Where each star sits on the photo (fractions of the 3200 x 2400 crop), read from the markup.
    var pos = {};
    PLANS.forEach(function (p) { var cs = getComputedStyle(star[p]); pos[p] = [parseFloat(cs.getPropertyValue('--fx')), parseFloat(cs.getPropertyValue('--fy'))]; });
    pos.cross = [(pos.mimosa[0] + pos.imai[0]) / 2, (pos.gacrux[1] + pos.acrux[1]) / 2];

    // The camera: the photo box covers the stage at scale 1; a shot puts a point of it at a spot on screen.
    var m = {};
    function measure() {
      var vw = stage.clientWidth, vh = stage.clientHeight;
      var W = Math.max(vw, vh * 4 / 3), H = W * 3 / 4;
      m = { vw: vw, vh: vh, W: W, H: H, L: (vw - W) / 2, T: (vh - H) / 2, phone: window.innerWidth < 760 }; // same test as the CSS
      gsap.set(cam, { width: W, height: H, left: m.L, top: m.T });
    }
    var SCALE = { intro: [1.45, 1.15], imai: [2.0, 2.2], gacrux: [2.1, 2.3], mimosa: [2.2, 2.4], acrux: [3.0, 3.2], end: [1.15, 1.1] };
    function aim() { return m.phone ? [m.vw * 0.5, m.vh * (m.vh < 720 ? 0.25 : 0.33)] : [m.vw * 0.31, m.vh * 0.5]; } // short phones: above the card
    function shot(name, point) {
      var s = SCALE[name][m.phone ? 1 : 0], f = pos[point || name];
      // the whole cross: clear of the site header on phones, and of the card in the opening
      var a = name === 'end' ? [m.vw / 2, m.phone ? m.vh * 0.46 : m.vh / 2] : name === 'intro' && m.phone ? [m.vw / 2, m.vh * 0.36] : aim();
      var x = a[0] - m.L - s * f[0] * m.W, y = a[1] - m.T - s * f[1] * m.H;
      // never show the photo's edge
      x = Math.min(-m.L, Math.max(m.vw - m.L - s * m.W, x));
      y = Math.min(-m.T, Math.max(m.vh - m.T - s * m.H, y));
      return { x: x, y: y, s: s };
    }
    function camTo(name, point) {
      return {
        x: function () { return shot(name, point).x; },
        y: function () { return shot(name, point).y; },
        scale: function () { return shot(name, point).s; },
        '--z': function () { return shot(name, point).s; },
        duration: 0.6, ease: 'power2.inOut'
      };
    }
    function placeBloom() { var a = aim(); gsap.set(bloom, { '--bx': a[0] + 'px', '--by': a[1] + 'px' }); }

    ST.addEventListener('refreshInit', measure);
    measure();
    placeBloom();
    var first = shot('intro', 'cross');
    gsap.set(cam, { x: first.x, y: first.y, scale: first.s, '--z': first.s });

    var tl = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      onUpdate: function () { markNav(nearest()); }, // follows the scrub, not just the scroll events,
      scrollTrigger: {
        trigger: sky, pin: stage, start: 'top top', end: function () { return '+=' + Math.round(stage.clientHeight * 5.2); },
        scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1, toggleClass: { targets: sky, className: 'sky--active' },
        snap: { snapTo: 'labels', inertia: false, duration: { min: 0.25, max: 0.7 }, delay: 0.12, ease: 'power1.inOut' },
        onRefresh: placeBloom,
              }
    });

    tl.addLabel('intro', 0);
    var prev = 'intro';
    PLANS.forEach(function (p, i) {
      var t = i + 0.4; // each step: 0.6 of travel, then the card holds
      tl.to(cam, camTo(p), t)
        .to(card[prev], { opacity: 0, y: -24, duration: 0.25, ease: 'power1.in' }, t)
        .fromTo(card[p], { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out', immediateRender: false }, t + 0.3)
        .to(glow[p], { scale: p === 'acrux' ? 2.1 : 1.65, opacity: 1, duration: 0.5 }, t + 0.1);
      if (prev !== 'intro') tl.to(glow[prev], { scale: 1, opacity: 0.4, duration: 0.4 }, t);
      if (p === 'acrux') {
        // the finale: the deepest zoom, light spills, spikes open, and one star becomes two
        tl.to(bloom, { opacity: 1, duration: 0.55 }, t + 0.05)
          .fromTo(spikes, { opacity: 0, scale: 0.35 }, { opacity: 0.9, scale: 1, duration: 0.55, ease: 'power3.out', immediateRender: false }, t + 0.15)
          .to(pair[0], { x: -14, y: 4, duration: 0.45, ease: 'power2.out' }, t + 0.3)
          .to(pair[1], { x: 14, y: -4, duration: 0.45, ease: 'power2.out' }, t + 0.3);
      }
      tl.addLabel(p, i + 1);
      prev = p;
    });
    // pull back: the whole cross, every star lit, its lines drawn
    var e = PLANS.length + 0.4;
    tl.to(cam, camTo('end', 'cross'), e)
      .to(card.acrux, { opacity: 0, y: -24, duration: 0.25, ease: 'power1.in' }, e)
      .to([bloom, spikes], { opacity: 0, duration: 0.4 }, e)
      .to(pair, { x: 0, y: 0, duration: 0.4 }, e)
      .to(PLANS.map(function (p) { return glow[p]; }), { scale: 1.25, opacity: 0.95, duration: 0.5 }, e + 0.1)
      .to(lines, { opacity: 1, duration: 0.3 }, e + 0.2)
      .fromTo(lines.querySelectorAll('line'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.4, ease: 'power1.inOut', stagger: 0.12, immediateRender: false }, e + 0.2)
      .addLabel('end'); // after the last line is drawn

    sky.skyTimeline = tl; // for the screenshot check (tools) and the nav
    function nearest() { // the stop the camera is closest to
      var t = tl.time(), best = '', d = Infinity;
      for (var k in tl.labels) { var dd = Math.abs(tl.labels[k] - t); if (dd < d) { d = dd; best = k; } }
      return best;
    }
    var cardOf = { intro: card.intro, imai: card.imai, gacrux: card.gacrux, mimosa: card.mimosa, acrux: card.acrux };
    function markNav(label) {
      for (var k in cardOf) { if (k === label) cardOf[k].setAttribute('data-on', ''); else cardOf[k].removeAttribute('data-on'); }
      for (var i = 0; i < navBtns.length; i++) {
        if (navBtns[i].getAttribute('data-go') === label) navBtns[i].setAttribute('aria-current', 'step');
        else navBtns[i].removeAttribute('aria-current');
      }
    }
    Array.prototype.forEach.call(navBtns, function (b) {
      b.addEventListener('click', function () {
        var st = tl.scrollTrigger;
        window.scrollTo({ top: st.labelToScroll(b.getAttribute('data-go')), behavior: 'smooth' });
      });
    });
    // keyboard: tabbing into a card brings its star on screen
    Object.keys(cardOf).forEach(function (k) {
      cardOf[k].addEventListener('focusin', function () {
        if (nearest() !== k) window.scrollTo({ top: tl.scrollTrigger.labelToScroll(k), behavior: 'auto' });
      });
    });
    markNav('intro');
    // the photo arrives late (lazy): positions don't depend on it, but refresh once it's in for safety
    var img = sky.querySelector('.sky-photo');
    if (img && !img.complete) img.addEventListener('load', function () { ST.refresh(); }, { once: true });
  }
})();
