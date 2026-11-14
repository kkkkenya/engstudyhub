/* Membership as the Southern Cross (home page #plans and the Crux page). GSAP + ScrollTrigger, loaded just before.
   The stage pins; scrolling flies the camera from the whole cross to Imai, Gacrux, Mimosa and Acrux (faintest to
   brightest). Each move banks and pulls back mid-flight, near stars drift past faster than the sky, and on arrival
   the star flickers, sends out a ring and the sky darkens around it. Acrux ends it: the deepest zoom, light spills,
   spikes open and it splits into two. Then the camera pulls back to the cross, every star lit.
   Reduced motion, no GSAP or a failure: the static photo and the cards (assets/sky.v2.css) stay as they are. */
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

    var stage = sky.querySelector('.sky-stage'), rig = sky.querySelector('.sky-rig'), cam = sky.querySelector('.sky-cam');
    var near = sky.querySelector('.sky-near'), spot = sky.querySelector('.sky-spot'), bloom = sky.querySelector('.sky-bloom');
    var lines = sky.querySelector('.sky-lines');
    var PLANS = ['imai', 'gacrux', 'mimosa', 'acrux'];
    var star = {}, glow = {}, ring = {}, label = {}, card = { intro: sky.querySelector('.sky-card--intro') };
    PLANS.forEach(function (p) {
      star[p] = sky.querySelector('.star--' + p);
      glow[p] = star[p].querySelector('.glow');
      ring[p] = star[p].querySelector('.ring');
      label[p] = star[p].querySelector('.star-name');
      card[p] = sky.querySelector('.sky-card[data-plan=' + p + ']');
    });
    var spikes = sky.querySelector('.spikes'), pair = sky.querySelectorAll('.pair i');
    var navBtns = sky.querySelectorAll('.sky-nav button');
    var allGlows = PLANS.map(function (p) { return glow[p]; }), allLabels = PLANS.map(function (p) { return label[p]; });

    // near stars: a tile of small points, drawn once
    near.style.setProperty('--near', 'url("data:image/svg+xml,' + encodeURIComponent(nearTile()) + '")');

    // where each star sits on the photo (fractions of the 3200 x 2400 crop), read from the markup
    var pos = {};
    PLANS.forEach(function (p) { var cs = getComputedStyle(star[p]); pos[p] = [parseFloat(cs.getPropertyValue('--fx')), parseFloat(cs.getPropertyValue('--fy'))]; });
    pos.cross = [(pos.mimosa[0] + pos.imai[0]) / 2, (pos.gacrux[1] + pos.acrux[1]) / 2];

    // the camera: the photo box covers the stage at scale 1; a shot puts a point of it at a spot on screen
    var m = {};
    function measure() {
      var vw = stage.clientWidth, vh = stage.clientHeight;
      var W = Math.max(vw, vh * 4 / 3), H = W * 3 / 4;
      m = { vw: vw, vh: vh, W: W, H: H, L: (vw - W) / 2, T: (vh - H) / 2, phone: window.innerWidth < 760 }; // same test as the CSS
      gsap.set(cam, { width: W, height: H, left: m.L, top: m.T });
      var a = aim();
      gsap.set(rig, { transformOrigin: a[0] + 'px ' + a[1] + 'px' });
      gsap.set([spot, bloom], { '--ax': a[0] + 'px', '--ay': a[1] + 'px' });
      gsap.set(near, { transformOrigin: (a[0] + m.vw) + 'px ' + (a[1] + m.vh) + 'px' }); // the layer starts one screen up-left
    }
    var SCALE = { intro: [1.45, 1.15], imai: [2.0, 2.2], gacrux: [2.1, 2.3], mimosa: [2.2, 2.4], acrux: [3.0, 3.2], end: [1.15, 1.1] };
    var ROLL = { intro: 0, imai: -4, gacrux: 3, mimosa: -3, acrux: 5, end: 0 };
    function aim() { return m.phone ? [m.vw * 0.5, m.vh * (m.vh < 720 ? 0.25 : 0.33)] : [m.vw * 0.31, m.vh * 0.5]; } // short phones: above the card
    function shot(name, point) {
      var s = SCALE[name][m.phone ? 1 : 0], f = pos[point || name];
      // the whole cross: clear of the site header on phones, and of the card in the opening
      var a = name === 'end' ? [m.vw / 2, m.phone ? m.vh * 0.46 : m.vh / 2] : name === 'intro' && m.phone ? [m.vw / 2, m.vh * 0.36] : aim();
      var x = a[0] - m.L - s * f[0] * m.W, y = a[1] - m.T - s * f[1] * m.H;
      // never show the photo's edge (with room for the roll)
      var pad = 0.06 * Math.max(m.vw, m.vh);
      x = Math.min(-m.L - pad, Math.max(m.vw - m.L - s * m.W + pad, x));
      y = Math.min(-m.T - pad, Math.max(m.vh - m.T - s * m.H + pad, y));
      return { x: x, y: y, s: s };
    }
    function camTo(name, point) {
      var memo = null, key = '';
      function get() { var k = m.vw + 'x' + m.vh; if (k !== key) { memo = shot(name, point); key = k; } return memo; }
      return {
        x: function () { return get().x; }, y: function () { return get().y; },
        scale: function () { return get().s; }, '--z': function () { return get().s; },
        duration: 0.6, ease: 'power3.inOut'
      };
    }

    // near stars follow the camera at 1.35x its movement, so they read as closer
    var nearSet = gsap.quickSetter(near, 'css'), base = null;
    function follow() {
      var x = gsap.getProperty(cam, 'x'), y = gsap.getProperty(cam, 'y'), s = gsap.getProperty(cam, 'scale');
      var a = aim(), wx = (a[0] - m.L - x) / s, wy = (a[1] - m.T - y) / s;
      if (!base) base = { wx: wx, wy: wy, s: s };
      nearSet({ x: -(wx - base.wx) * s * 0.35, y: -(wy - base.wy) * s * 0.35, scale: Math.pow(s / base.s, 1.3) });
    }

    ST.addEventListener('refreshInit', function () { measure(); base = null; });
    measure();
    var first = shot('intro', 'cross');
    gsap.set(cam, { x: first.x, y: first.y, scale: first.s, '--z': first.s });
    gsap.set(spot, { opacity: 0.35 });
    gsap.set(near, { opacity: 0.55 });

    var tl = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      onUpdate: function () { follow(); markNav(nearest()); }, // follows the scrub, not just the scroll events
      scrollTrigger: {
        trigger: sky, pin: stage, start: 'top top', end: function () { return '+=' + Math.round(stage.clientHeight * 5.4); },
        scrub: 0.9, invalidateOnRefresh: true, anticipatePin: 1, toggleClass: { targets: sky, className: 'sky--active' },
        snap: { snapTo: 'labels', inertia: false, duration: { min: 0.3, max: 0.8 }, delay: 0.12, ease: 'power1.inOut' }
      }
    });

    tl.addLabel('intro', 0);
    var prev = 'intro';
    PLANS.forEach(function (p, i) {
      var t = i + 0.35; // each step: 0.65 of flight, then the card holds
      var big = p === 'acrux';
      tl.to(cam, camTo(p), t)
        // bank and pull back mid-flight, then settle
        .to(rig, { rotation: ROLL[p], '--rot': ROLL[p], duration: 0.6, ease: 'power2.inOut' }, t)
        .to(rig, { scale: big ? 0.74 : 0.82, duration: 0.3, ease: 'power2.out' }, t)
        .to(rig, { scale: 1, duration: 0.32, ease: 'power2.in' }, t + 0.3)
        .to(spot, { opacity: 0.25, duration: 0.25 }, t)
        .to(spot, { opacity: 1, duration: 0.3 }, t + 0.35)
        .to(near, { opacity: 0.9, duration: 0.2 }, t)
        .to(near, { opacity: 0.45, duration: 0.3 }, t + 0.4)
        // the old star fades back, the new one comes up
        .to(card[prev], { opacity: 0, y: -24, duration: 0.22, ease: 'power1.in' }, t)
        .fromTo(card[p], { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out', immediateRender: false }, t + 0.32)
        .to(allGlows.filter(function (g) { return g !== glow[p]; }), { opacity: 0.22, scale: 0.85, duration: 0.4 }, t)
        .to(allLabels.filter(function (l) { return l !== label[p]; }), { opacity: 0.28, duration: 0.4 }, t)
        .to(glow[p], { scale: big ? 1.85 : 1.7, opacity: 1, duration: 0.5 }, t + 0.1)
        .to(label[p], { opacity: 1, x: p === 'mimosa' && !m.phone ? -6 : 6, scale: 1.25, transformOrigin: p === 'mimosa' && !m.phone ? '100% 50%' : '0% 50%', duration: 0.4 }, t + 0.25)
        .fromTo(ring[p], { opacity: 0.95, scale: 0.25 }, { opacity: 0, scale: big ? 4.6 : 3.2, duration: 0.36, ease: 'power2.out', immediateRender: false }, t + 0.28);
      if (prev !== 'intro') tl.to(label[prev], { x: 0, scale: 1, duration: 0.3 }, t);
      if (big) {
        // the finale: light spills, the spotlight tightens, spikes open, a second ring, and one star becomes two
        tl.to(bloom, { opacity: 1, duration: 0.55 }, t + 0.1)
          .fromTo(spikes, { opacity: 0, scale: 0.35 }, { opacity: 0.95, scale: 1, duration: 0.55, ease: 'power3.out', immediateRender: false }, t + 0.2)
          .fromTo(ring[p], { opacity: 0.8, scale: 0.25 }, { opacity: 0, scale: 6.5, duration: 0.4, ease: 'power2.out', immediateRender: false }, t + 0.24)
          .to(pair[0], { x: -14, y: 4, duration: 0.45, ease: 'power2.out' }, t + 0.32)
          .to(pair[1], { x: 14, y: -4, duration: 0.45, ease: 'power2.out' }, t + 0.32);
      }
      tl.addLabel(p, i + 1);
      prev = p;
    });
    // pull back: the whole cross, every star lit and named, its lines drawn bright
    var e = PLANS.length + 0.35;
    tl.to(cam, camTo('end', 'cross'), e)
      .to(rig, { rotation: 0, '--rot': 0, scale: 1, duration: 0.6 }, e)
      .to(card.acrux, { opacity: 0, y: -24, duration: 0.22, ease: 'power1.in' }, e)
      .to([bloom, spikes], { opacity: 0, duration: 0.4 }, e)
      .to(spot, { opacity: 0.3, duration: 0.5 }, e)
      .to(pair, { x: 0, y: 0, duration: 0.4 }, e)
      .to(allGlows, { scale: 1.2, opacity: 0.95, duration: 0.5 }, e + 0.15)
      .to(allLabels, { opacity: 1, x: 0, scale: 1, duration: 0.4 }, e + 0.25)
      .to(lines, { opacity: 0.9, duration: 0.4 }, e + 0.3)
      .addLabel('end'); // after everything has settled

    function nearest() { // the stop the camera is closest to
      var t = tl.time(), best = '', d = Infinity;
      for (var k in tl.labels) { var dd = Math.abs(tl.labels[k] - t); if (dd < d) { d = dd; best = k; } }
      return best;
    }
    var cardOf = { intro: card.intro, imai: card.imai, gacrux: card.gacrux, mimosa: card.mimosa, acrux: card.acrux };
    var shown = '';
    function markNav(label) {
      if (label === shown) return;
      shown = label;
      for (var k in cardOf) { if (k === label) cardOf[k].setAttribute('data-on', ''); else cardOf[k].removeAttribute('data-on'); }
      // the star you're on flickers; at the end they all do
      PLANS.forEach(function (p) { star[p].classList.toggle('is-on', p === label || label === 'end'); });
      for (var i = 0; i < navBtns.length; i++) {
        if (navBtns[i].getAttribute('data-go') === label) navBtns[i].setAttribute('aria-current', 'step');
        else navBtns[i].removeAttribute('aria-current');
      }
    }
    sky.skyTimeline = tl; // for the screenshot check (tools) and the nav
    Array.prototype.forEach.call(navBtns, function (b) {
      b.addEventListener('click', function () {
        window.scrollTo({ top: tl.scrollTrigger.labelToScroll(b.getAttribute('data-go')), behavior: 'smooth' });
      });
    });
    // keyboard: tabbing into a card brings its star on screen
    Object.keys(cardOf).forEach(function (k) {
      cardOf[k].addEventListener('focusin', function () {
        if (nearest() !== k) window.scrollTo({ top: tl.scrollTrigger.labelToScroll(k), behavior: 'auto' });
      });
    });
    markNav('intro');
    follow();
    var img = sky.querySelector('.sky-photo');
    if (img && !img.complete) img.addEventListener('load', function () { ST.refresh(); }, { once: true });
  }

  // 520 x 520 tile of near stars: a few bright points with a soft halo, most of them faint
  function nearTile() {
    var seed = 7, out = '';
    function rnd() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
    for (var i = 0; i < 70; i++) {
      var x = (rnd() * 520).toFixed(1), y = (rnd() * 520).toFixed(1), r = rnd(), o = (0.35 + rnd() * 0.6).toFixed(2);
      var size = r > 0.93 ? 1.9 : r > 0.7 ? 1.25 : 0.8, tint = r > 0.85 ? '#cfe0ff' : r > 0.78 ? '#ffd9b8' : '#ffffff';
      if (size > 1.5) out += '<circle cx="' + x + '" cy="' + y + '" r="5" fill="' + tint + '" opacity=".12"/>';
      out += '<circle cx="' + x + '" cy="' + y + '" r="' + size + '" fill="' + tint + '" opacity="' + o + '"/>';
    }
    return '<svg xmlns="http://www.w3.org/2000/svg" width="520" height="520">' + out + '</svg>';
  }
})();
