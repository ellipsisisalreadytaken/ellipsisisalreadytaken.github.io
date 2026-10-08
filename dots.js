// The dots: Ellipsa's ellipsis as a mascot. Three dots that bounce like a typing indicator when
// thinking, gather into a face when talking to you, turn red when listening, and line up as a list
// for the briefing. They live in the grey pebble, which starts in the hero and becomes the corner
// button, just like the app.
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  // ---------- Springs ----------
  class Spring {
    constructor(v, k = 260, c = 20) { this.v = v; this.t = v; this.vel = 0; this.k = k; this.c = c; }
    step(dt) {
      if (reduce) { this.v = this.t; this.vel = 0; return; }
      this.vel += (-this.k * (this.v - this.t) - this.c * this.vel) * dt;
      this.v += this.vel * dt;
    }
  }

  const layer = $('.mascot');
  const pebbleEl = $('.pebble', layer);
  const dotEls = $$('.dot', layer);
  const bubbleEl = $('.bubble', layer);
  const badgeEl = $('.badge', layer);
  const homeEl = $('.home');
  const homeGetEl = $('.home-get');
  const ellipsisEl = $('.ellipsis');
  const ghosts = $$('.ellipsis i');

  // Pebble: position and size follow the hero home, then the corner
  const peb = { x: new Spring(0, 170, 17), y: new Spring(0, 170, 17), s: new Spring(100, 170, 17), squish: new Spring(1, 300, 12) };
  // Dots: centre, radius, and a per-dot shape scale
  const dots = dotEls.map((el, i) => ({
    el, i, home: 'headline',
    x: new Spring(0, 240, 19), y: new Spring(0, 240, 19), r: new Spring(6, 200, 18),
    sx: new Spring(1, 300, 16), sy: new Spring(1, 300, 16),
  }));

  let mode = 'face';
  let lastMode = '';
  const pointer = { x: -1, y: -1, seen: false };
  const look = { x: new Spring(0, 90, 14), y: new Spring(0, 90, 14) };
  let blink = 1, nextBlink = 2.5;
  let hopT = 0;
  let started = false;
  let firstPlace = true;

  addEventListener('pointermove', e => { pointer.x = e.clientX; pointer.y = e.clientY; pointer.seen = e.pointerType === 'mouse'; }, { passive: true });

  // ---------- Where the pebble sits ----------
  function pebbleTarget() {
    const vw = innerWidth, vh = innerHeight;
    const cornerS = vw < 820 ? 56 : 72;
    const corner = { x: vw - cornerS - (vw < 820 ? 16 : 28), y: vh - cornerS - (vw < 820 ? 16 : 28), s: cornerS };
    const r = homeEl.getBoundingClientRect();
    const home = { x: r.left, y: r.top, s: r.width };
    const hero = $('.hero');
    const t = Math.min(1, Math.max(0, scrollY / (hero.offsetHeight * (vw < 820 ? 0.35 : 0.5))));
    const e = t * t * (3 - 2 * t);
    if (homeGetEl && t >= 1) {
      const g = homeGetEl.getBoundingClientRect();
      if (g.top < vh * 0.78 && g.bottom > vh * 0.12) return { x: g.left, y: g.top, s: g.width, docked: false };
    }
    return { x: home.x + (corner.x - home.x) * e, y: home.y + (corner.y - home.y) * e, s: home.s + (corner.s - home.s) * e, docked: t >= 1 };
  }

  // ---------- Formations, in pebble units (0..1) ----------
  function formation(i, now) {
    const lx = look.x.v, ly = look.y.v;
    switch (mode) {
      case 'ellipsis': {
        const hop = reduce ? 0 : Math.max(0, Math.sin(now * 7 - i * 0.9)) * 0.07;
        return { x: 0.32 + i * 0.18, y: 0.5 - hop, sx: 1, sy: 1, red: false };
      }
      case 'listen': {
        const level = reduce ? 0.6 : 0.5 + 0.5 * Math.sin(now * (5 + i * 1.7) + i * 2) * Math.sin(now * 2.3 + i);
        return { x: 0.32 + i * 0.18, y: 0.5, sx: 0.9, sy: 1 + Math.abs(level) * 1.9, red: true };
      }
      case 'list': {
        const scan = reduce ? 0 : Math.sin(now * 1.6) * 0.05;
        if (i < 2) return { x: 0.37 + i * 0.26 + scan, y: 0.47, sx: 1, sy: Math.max(0.12, blink) * 0.85, red: false };
        return { x: 0.5 + scan * 0.5, y: 0.66, sx: 1.1, sy: 0.55, red: false };
      }
      case 'happy': {
        const jump = reduce ? 0 : Math.max(0, Math.sin(now * 5 - i * 0.6)) * 0.08;
        if (i < 2) return { x: 0.37 + i * 0.26 + lx * 0.05, y: 0.42 - jump + ly * 0.05, sx: 1.05, sy: Math.max(0.12, blink) * 1.05, red: false };
        return { x: 0.5 + lx * 0.03, y: 0.635 - jump * 0.6, sx: 1.6, sy: 1.15, red: false };
      }
      default: { // face, and badge (a face with the blue badge)
        if (i < 2) return { x: 0.37 + i * 0.26 + lx * 0.06, y: 0.43 + ly * 0.06, sx: 1, sy: Math.max(0.12, blink), red: false };
        const talk = talking && !reduce ? 0.35 + Math.abs(Math.sin(now * 13)) * 0.75 : 0.55;
        return { x: 0.5 + lx * 0.035, y: 0.645 + ly * 0.03, sx: 1.7, sy: talk, red: false };
      }
    }
  }

  // ---------- Speech bubble ----------
  let bubbleTimer = 0;
  let docked = false;
  let talking = false;
  let talkTimer = 0;
  function say(text, ms = 3200) {
    if (!text) return;
    // On phones the corner button stays quiet: a bubble there would sit on the page's words
    if (innerWidth < 820) { if (docked) return; ms = Math.min(ms, 2000); }
    bubbleEl.textContent = text;
    bubbleEl.classList.add('on');
    talking = true;
    clearTimeout(talkTimer);
    talkTimer = setTimeout(() => { talking = false; }, Math.min(1400, 300 + text.length * 35));
    clearTimeout(bubbleTimer);
    bubbleTimer = setTimeout(() => bubbleEl.classList.remove('on'), ms);
  }
  const LINES = {
    hero: 'hi! i remember, so you don’t have to.',
    ellipsis: 'ask me anything…',
    listen: 'listening… nothing gets saved.',
    list: 'morning! Marcus is waiting on you.',
    badge: 'your reply to Marcus is ready for a look.',
    face: 'Priya asked for the Q3 numbers last time.',
    privacy: 'what you tell me stays on your computer.',
    apps: 'i read these. carefully.',
    happy: 'yay! go on, try me.',
  };
  const BOOPS = ['boop.', 'hehe, that tickles…', 'still remembering…', 'i’m on it…', 'you rang?'];
  let boopN = 0;

  function setMode(next, line) {
    if (next === mode && !line) return;
    mode = next;
    badgeEl.classList.toggle('on', mode === 'badge');
    if (mode !== lastMode && !reduce) for (const d of dots) d.y.vel -= 260 + d.i * 60; // a little hop on every change of mood
    lastMode = mode;
    if (line) say(line);
  }

  pebbleEl.addEventListener('click', () => {
    peb.squish.v = 0.8;
    for (const d of dots) d.y.vel -= 700;
    say(BOOPS[boopN++ % BOOPS.length], 1800);
  });

  // ---------- The loop ----------
  let prev = performance.now();
  function frame(nowMs) {
    requestAnimationFrame(frame);
    if (document.hidden) { prev = nowMs; return; }
    const dt = Math.min(0.034, (nowMs - prev) / 1000);
    prev = nowMs;
    const now = nowMs / 1000;

    const target = pebbleTarget();
    docked = target.docked;
    if (docked && innerWidth < 820 && bubbleEl.classList.contains('on')) bubbleEl.classList.remove('on');
    peb.x.t = target.x; peb.y.t = target.y; peb.s.t = target.s;
    if (firstPlace) { peb.x.v = target.x; peb.y.v = target.y; peb.s.v = target.s; }
    // Two half steps keep the bouncy springs stable at low frame rates
    for (let k = 0; k < 2; k++) { peb.x.step(dt / 2); peb.y.step(dt / 2); peb.s.step(dt / 2); peb.squish.step(dt / 2); }
    const S = peb.s.v, PX = peb.x.v, PY = peb.y.v;
    const sq = peb.squish.v;
    const qx = 2 - sq, qy = sq; // squash from the bottom, like a ball landing
    pebbleEl.style.transform = `translate(${PX + (S * (1 - qx)) / 2}px, ${PY + S * (1 - qy)}px) scale(${(S / 100) * qx}, ${(S / 100) * qy})`;

    // Eyes follow the pointer; without one, they wander
    const cx = PX + S / 2, cy = PY + S / 2;
    if (pointer.seen) {
      const dx = pointer.x - cx, dy = pointer.y - cy, len = Math.hypot(dx, dy) || 1, pull = Math.min(1, len / 300);
      look.x.t = (dx / len) * pull; look.y.t = (dy / len) * pull;
    } else if (!reduce) {
      look.x.t = Math.sin(now * 0.6) * 0.6; look.y.t = Math.sin(now * 0.43) * 0.3;
    }
    look.x.step(dt); look.y.step(dt);

    // Blink now and then
    if (!reduce) {
      nextBlink -= dt;
      if (nextBlink < 0) { blink = 0.1; if (nextBlink < -0.12) { blink = 1; nextBlink = 2.2 + Math.random() * 3.5; } }
    }

    // Dots
    for (const d of dots) {
      let tx, ty, tr, fsx = 1, fsy = 1, red = false;
      if (d.home === 'headline' && ghosts[d.i]) {
        const g = ghosts[d.i].getBoundingClientRect();
        tr = g.width / 2;
        const hop = reduce ? 0 : Math.max(0, Math.sin(now * 7 - d.i * 0.9)) * tr * 1.8;
        tx = g.left + tr; ty = g.top + tr - hop;
      } else {
        const f = formation(d.i, now);
        tx = PX + f.x * S; ty = PY + f.y * S; tr = S * 0.055; fsx = f.sx; fsy = f.sy; red = f.red;
      }
      d.x.t = tx; d.y.t = ty; d.r.t = tr; d.sx.t = fsx; d.sy.t = fsy;
      if (firstPlace) { d.x.v = tx; d.y.v = ty; d.r.v = tr; }
      for (let k = 0; k < 2; k++) { d.x.step(dt / 2); d.y.step(dt / 2); d.r.step(dt / 2); d.sx.step(dt / 2); d.sy.step(dt / 2); }
      // Squash and stretch from vertical speed
      const stretch = reduce ? 1 : Math.min(1.5, Math.max(0.7, 1 + d.y.vel / 2200));
      const r = Math.max(0.5, d.r.v);
      const scx = (2 * r / 100) * d.sx.v / Math.sqrt(stretch);
      const scy = (2 * r / 100) * d.sy.v * stretch;
      d.el.style.transform = `translate(${d.x.v - 50}px, ${d.y.v - 50}px) scale(${scx}, ${scy})`;
      d.el.classList.toggle('red', red);
    }
    firstPlace = false;

    // The bubble sits to the left of the pebble, above its middle
    if (bubbleEl.classList.contains('on')) {
      const w = bubbleEl.offsetWidth, h = bubbleEl.offsetHeight, vw = innerWidth;
      let bx, by, left;
      if (vw < 820) {
        // Beside the big pebble, in the room to its right, so it never sits on a heading
        bx = PX + S + 12; by = PY + S / 2 - h / 2; left = false;
        bubbleEl.style.maxWidth = `${Math.max(120, vw - bx - 16)}px`;
      } else {
        left = PX - w - 10 > 8;
        bx = left ? PX - w - 10 : Math.min(vw - w - 16, PX + S + 10);
        by = Math.max(76, PY + S * 0.28 - h);
      }
      bubbleEl.classList.toggle('left', left);
      bubbleEl.style.left = `${bx}px`;
      bubbleEl.style.top = `${by}px`;
    }
  }
  requestAnimationFrame(frame);

  // ---------- Opening: the headline's dots hop into the pebble ----------
  function hopIn() {
    if (started) return;
    started = true;
    dots.forEach((d, i) => setTimeout(() => {
      d.home = 'pebble';
      if (i === 2) ellipsisEl?.classList.add('left');
      if (!reduce) d.y.vel -= 1100;
      if (i === 2) setTimeout(() => say(LINES.hero), 500);
    }, reduce ? 0 : i * 150));
  }
  setTimeout(hopIn, reduce ? 0 : 1600);
  addEventListener('scroll', hopIn, { once: true, passive: true });

  // ---------- Moods by section ----------
  const moodTabs = $$('.moods [role="tab"]');
  let tourInView = false;
  function selectMood(tab, speak = true) {
    moodTabs.forEach(t => { const on = t === tab; t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; });
    if (tourInView || speak) setMode(tab.dataset.mood, speak ? LINES[tab.dataset.mood] : '');
  }
  moodTabs.forEach((t, i) => {
    t.tabIndex = i === 0 ? 0 : -1;
    t.addEventListener('click', () => selectMood(t));
    t.addEventListener('keydown', e => {
      const step = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
      if (!step) return;
      e.preventDefault();
      const next = moodTabs[(i + step + moodTabs.length) % moodTabs.length];
      next.focus();
      selectMood(next);
    });
  });

  const shots = $$('.screen img');
  const moments = $$('.moments li');
  const watch = new IntersectionObserver(entries => {
    for (const e of entries) {
      if (!e.isIntersecting) { if (e.target.id === 'button') tourInView = false; continue; }
      const el = e.target;
      if (el.matches('.moments li')) {
        moments.forEach(m => m.classList.toggle('on', m === el));
        shots.forEach(s => s.classList.toggle('on', s.dataset.shot === el.dataset.shot));
        setMode(el.dataset.mode, LINES[el.dataset.mode]);
        continue;
      }
      if (el.id === 'button') {
        tourInView = true;
        const sel = moodTabs.find(t => t.getAttribute('aria-selected') === 'true');
        setMode(sel.dataset.mood, LINES[sel.dataset.mood]);
        continue;
      }
      if (el.classList.contains('hero')) { if (started) setMode('face'); continue; }
      const line = el.id === 'privacy' ? LINES.privacy : el.classList.contains('apps') ? LINES.apps : el.id === 'get' ? LINES.happy : '';
      setMode(el.dataset.mode, line);
    }
  }, { rootMargin: '-45% 0px -45% 0px' });
  $$('main > section, .moments li').forEach(s => watch.observe(s));
  if (moments[0]) { moments[0].classList.add('on'); shots[0]?.classList.add('on'); }

  // ---------- Things that pop in, and the conversation ----------
  if (!reduce) {
    const pops = $$('main section h2, .button-tour .lede, .moods, .facts li, .logos, .ways > *, .player, .stage');
    pops.forEach(p => p.classList.add('pop'));
    const popper = new IntersectionObserver(entries => entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      popper.unobserve(e.target);
    }), { rootMargin: '0px 0px -12% 0px' });
    pops.forEach(p => popper.observe(p));
  }
  const thread = $('.thread');
  if (thread) {
    const lines = $$('p', thread);
    if (reduce) lines.forEach(l => l.classList.add('in'));
    else new IntersectionObserver(async ([e], obs) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      const wait = ms => new Promise(r => setTimeout(r, ms));
      for (const l of lines) {
        if (l.classList.contains('it')) {
          const typing = document.createElement('p');
          typing.className = 'it typing';
          typing.setAttribute('aria-hidden', 'true');
          typing.innerHTML = '<i></i><i></i><i></i>';
          l.before(typing);
          await wait(30);
          typing.classList.add('in');
          await wait(750);
          typing.remove();
        }
        l.classList.add('in');
        await wait(l.classList.contains('me') ? 450 : 650);
      }
    }, { rootMargin: '0px 0px -25% 0px' }).observe(thread);
  }

  // ---------- The recording: hide the section until the file exists ----------
  const video = $('.video video');
  if (video) fetch(video.getAttribute('src'), { method: 'HEAD' }).then(r => { if (!r.ok) $('.video').hidden = true; }).catch(() => { $('.video').hidden = true; });

  // ---------- The Mac waitlist ----------
  const form = $('#mac');
  const msg = $('#mac-msg');
  form?.addEventListener('submit', async e => {
    e.preventDefault();
    const email = form.email.value.trim();
    const button = $('button', form);
    msg.className = 'msg';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      form.email.setAttribute('aria-invalid', 'true');
      msg.classList.add('err');
      msg.textContent = 'That email address doesn’t look right. Check it and try again.';
      form.email.focus();
      return;
    }
    form.email.removeAttribute('aria-invalid');
    button.setAttribute('aria-busy', 'true');
    button.disabled = true;
    msg.textContent = 'Adding you…';
    setMode('ellipsis');
    try {
      const res = await fetch('https://ellipsa-proxy.ellipsa.workers.dev/waitlist', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, platform: 'mac', website: form.website.value }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || 'The waitlist didn’t answer.');
      msg.classList.add('ok');
      msg.textContent = 'You’re on the list. We’ll email you once, when the Mac app is ready.';
      form.reset();
      setMode('happy', 'you’re on the list!');
    } catch (err) {
      msg.classList.add('err');
      msg.textContent = `${err.message || 'Something went wrong.'} Try again in a minute, or email husseinkhidr2@gmail.com.`;
      setMode('face', 'hmm, that didn’t work…');
    } finally {
      button.removeAttribute('aria-busy');
      button.disabled = false;
    }
  });
})();
