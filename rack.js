// The post room: a rack of pigeonholes, one per person, with slips for what's owed.
// The page reads fine without it; this adds the rack, the slip panel, the walk through
// the day, and the Mac waitlist form.

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Example people only. Each slip's reverse is what the panel shows.
const SLIPS = {
  dana: {
    kind: 'promise', edge: '#F2B544', name: 'Dana', col: 1, row: 2, face: ['Venue options', 'You promised · Fri'],
    status: 'You promised · due Fri', title: 'Venue options for the offsite',
    quote: '“I\'ll send three venue options by Friday.”',
    source: 'You, in Gmail · Tue 6 Oct, 4:12 pm · thread “Offsite planning”',
  },
  priya: {
    kind: 'promise', edge: '#F2B544', name: 'Priya', col: 3, row: 3, face: ['Q3 numbers', 'Bring to Thu call'],
    status: 'You promised · Thu 2:00 pm call', title: 'The Q3 numbers',
    quote: '“Can you bring the Q3 numbers next time?” You said you would.',
    source: 'Call with Priya · Thu 24 Sep · transcribed on your computer',
  },
  marcus: {
    kind: 'overdue', edge: '#E2553F', name: 'Marcus', col: 3, row: 1, face: ['Contract reply', 'Waiting 9 days'],
    status: 'Overdue · 9 days', title: 'Reply on the revised contract',
    quote: 'Marcus sent the revised contract and asked if Monday works to sign.',
    source: 'Marcus, in Gmail · Tue 29 Sep, 10:03 am',
  },
  lena: {
    kind: 'waiting', edge: '#B7C0D3', name: 'Lena', col: 0, row: 1, face: ['Homepage feedback', 'Waiting on Lena'],
    status: 'Waiting on them', title: 'Feedback on the homepage',
    quote: 'You asked Lena for feedback on the new homepage.',
    source: 'You, in Slack #launch · Mon 5 Oct, 11:40 am',
  },
};
const OTHERS = ['Tomás', 'Ade', 'June', 'Noor', 'Kofi', 'Ines', 'Ravi', 'Mei', 'Jonah', 'Elif', 'Theo', 'Sam', 'Wren', 'Omar', 'Lucia', 'Bea'];
const STOP_SLIP = ['dana', 'priya', 'priya', 'marcus'];

// ---------- The slip panel (works without WebGL) ----------
const panel = document.querySelector('.reverse .slip');
const tabs = [...document.querySelectorAll('.tabs [role="tab"]')];
let selected = 'dana';
let onSelect = () => {};

function select(id, fromRack = false) {
  if (!SLIPS[id] || id === selected) return;
  selected = id;
  const s = SLIPS[id];
  tabs.forEach(t => t.setAttribute('aria-selected', String(t.dataset.slip === id)));
  const fill = () => {
    panel.dataset.kind = s.kind;
    for (const field of ['status', 'title', 'quote', 'source']) panel.querySelector(`[data-field="${field}"]`).textContent = s[field];
    panel.classList.remove('swap');
  };
  if (reduceMotion) fill();
  else { panel.classList.add('swap'); setTimeout(fill, 140); }
  if (!fromRack) onSelect(id);
}
tabs.forEach((t, i) => {
  t.tabIndex = t.getAttribute('aria-selected') === 'true' ? 0 : -1;
  t.addEventListener('click', () => select(t.dataset.slip));
  t.addEventListener('keydown', e => {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = tabs[(i + step + tabs.length) % tabs.length];
    tabs.forEach(x => (x.tabIndex = -1));
    next.tabIndex = 0;
    next.focus();
    select(next.dataset.slip);
  });
});

// ---------- The Mac waitlist ----------
const form = document.getElementById('mac');
const msg = document.getElementById('mac-msg');
form.addEventListener('submit', async e => {
  e.preventDefault();
  const email = form.email.value.trim();
  const button = form.querySelector('button');
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
  } catch (err) {
    msg.classList.add('err');
    msg.textContent = `${err.message || 'Something went wrong.'} Try again in a minute, or email husseinkhidr2@gmail.com.`;
  } finally {
    button.removeAttribute('aria-busy');
    button.disabled = false;
  }
});

// ---------- The day: which moment is in view ----------
const stops = [...document.querySelectorAll('.stop')];
let activeStop = -1;
let onStop = () => {};
const stopObserver = new IntersectionObserver(entries => {
  for (const e of entries) {
    if (!e.isIntersecting) continue;
    const i = Number(e.target.dataset.stop);
    stops.forEach(s => s.classList.toggle('on', Number(s.dataset.stop) === i));
    activeStop = i;
    onStop(i);
  }
}, { rootMargin: '-45% 0px -45% 0px' });
stops.forEach(s => stopObserver.observe(s));
new IntersectionObserver(([e]) => {
  if (e.isIntersecting) { activeStop = -1; stops.forEach(s => s.classList.remove('on')); onStop(-1); }
}, { rootMargin: '-40% 0px -40% 0px' }).observe(document.querySelector('.hero'));

// ---------- The rack ----------
start().catch(err => {
  console.warn('Rack unavailable:', err);
  document.documentElement.classList.add('no-webgl');
});

async function start() {
  const THREE = await import('three');
  const canvas = document.getElementById('rack');
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  } catch (e) {
    throw new Error('WebGL is off');
  }
  await Promise.all([document.fonts.load('700 40px Archivo'), document.fonts.load('700 30px Stamp')]).catch(() => {});

  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#0E1426');
  scene.fog = new THREE.Fog('#0E1426', 9, 26);
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 60);

  // Dimensions of the rack, in metres-ish
  const COLS = 5, ROWS = 4, CW = 1.0, CH = 0.66, T = 0.05, D = 1.1;
  const W = COLS * CW + (COLS + 1) * T;
  const H = ROWS * CH + (ROWS + 1) * T;
  const cellX = c => -W / 2 + T + c * (CW + T) + CW / 2;
  const cellY = r => T + r * (CH + T);

  // Light: one warm lamp from the top left, the room in cool navy
  scene.add(new THREE.HemisphereLight('#8C9BC4', '#0A0F1F', 0.75));
  const lamp = new THREE.SpotLight('#FFE6BC', 340, 0, 0.6, 0.75, 2);
  lamp.position.set(-2.2, H + 5.2, 6.4);
  lamp.target.position.set(0.4, H * 0.45, 0);
  lamp.castShadow = true;
  lamp.shadow.mapSize.set(2048, 2048);
  lamp.shadow.bias = -0.0004;
  lamp.shadow.radius = 8;
  scene.add(lamp, lamp.target);
  const fill = new THREE.DirectionalLight('#B8C4E6', 0.7);
  fill.position.set(5, 2, 6);
  scene.add(fill);

  // Floor and back wall catch the lamp
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), new THREE.MeshStandardMaterial({ color: '#0C1222', roughness: 0.95 }));
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.002;
  floor.receiveShadow = true;
  scene.add(floor);
  const wall = new THREE.Mesh(new THREE.PlaneGeometry(60, 20), new THREE.MeshStandardMaterial({ color: '#111A33', roughness: 1 }));
  wall.position.set(0, 10, -D - 0.6);
  wall.receiveShadow = true;
  scene.add(wall);

  // The enamelled steel rack
  const enamel = new THREE.MeshStandardMaterial({ color: '#22386E', roughness: 0.46, metalness: 0.32 });
  const inside = new THREE.MeshStandardMaterial({ color: '#16234A', roughness: 0.7, metalness: 0.15 });
  const rack = new THREE.Group();
  const box = (w, h, d, x, y, z, mat = enamel) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    m.position.set(x, y, z);
    m.castShadow = true;
    m.receiveShadow = true;
    rack.add(m);
    return m;
  };
  box(W, H, T, 0, H / 2, -D + T / 2, inside); // back
  for (let c = 0; c <= COLS; c++) box(T, H, D, -W / 2 + T / 2 + c * (CW + T), H / 2, -D / 2);
  for (let r = 0; r <= ROWS; r++) box(W, T, D, 0, T / 2 + r * (CH + T), -D / 2);
  // Front lips under each row, holding the name labels
  for (let r = 0; r < ROWS; r++) box(W, 0.12, 0.03, 0, cellY(r) + CH - 0.075, 0.015);
  box(W + 0.12, 0.08, D + 0.12, 0, H + 0.04, -D / 2); // top cap
  scene.add(rack);

  // Canvas textures for labels and slips
  const texture = (w, h, draw) => {
    const cv = document.createElement('canvas');
    cv.width = w; cv.height = h;
    const ctx = cv.getContext('2d');
    draw(ctx, w, h);
    const t = new THREE.CanvasTexture(cv);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = renderer.capabilities.getMaxAnisotropy();
    return t;
  };
  const label = name => texture(512, 112, (ctx, w, h) => {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, '#F9D27A'); g.addColorStop(0.5, '#F2B544'); g.addColorStop(1, '#C98E26');
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(80,50,0,0.55)'; ctx.lineWidth = 6; ctx.strokeRect(3, 3, w - 6, h - 6);
    ctx.fillStyle = '#2B1E04';
    ctx.font = '700 58px Archivo';
    try { ctx.fontStretch = 'expanded'; } catch {}
    ctx.letterSpacing = '6px';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(name.toUpperCase(), w / 2, h / 2 + 3);
  });
  const SLIP_W = 0.8, SLIP_L = 0.95;
  const paperTexture = (edge, lines, text) => texture(640, 760, (ctx, w, h) => {
    ctx.fillStyle = '#EEF0F2'; ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 2600; i++) { ctx.fillStyle = `rgba(60,70,95,${0.02 + ((i * 37) % 11) / 260})`; ctx.fillRect((i * 283) % w, (i * 127 + (i >> 3)) % h, 1 + (i % 3), 1); }
    ctx.strokeStyle = 'rgba(70,90,140,0.18)'; ctx.lineWidth = 3;
    for (let y = 70; y < h - 240; y += 46) { ctx.beginPath(); ctx.moveTo(40, y); ctx.lineTo(w - 40, y); ctx.stroke(); }
    ctx.fillStyle = edge; ctx.fillRect(0, h - 44, w, 44);
    if (text) {
      ctx.fillStyle = '#141A2B';
      let size = 84;
      try { ctx.fontStretch = 'semi-expanded'; } catch {}
      ctx.letterSpacing = '0px';
      do { ctx.font = `700 ${size}px Archivo`; size -= 2; } while (ctx.measureText(text[0]).width > w - 80 && size > 40);
      ctx.fillText(text[0], 40, h - 150);
      ctx.font = '700 40px Stamp';
      ctx.fillStyle = edge === '#E2553F' ? '#B2321F' : edge === '#F2B544' ? '#9A5B00' : '#46506A';
      ctx.fillText(text[1].toUpperCase(), 42, h - 82);
    } else {
      ctx.fillStyle = 'rgba(20,26,43,0.32)';
      for (let i = 0; i < lines; i++) ctx.fillRect(40, h - 170 + i * 34, 200 + ((i * 97) % 260), 12);
    }
  });

  const slips = [];
  const slipGeo = new THREE.PlaneGeometry(SLIP_W, SLIP_L);
  const addSlip = (c, r, opts) => {
    const mat = new THREE.MeshStandardMaterial({ map: opts.map, roughness: 0.9, side: THREE.DoubleSide, emissive: '#ffffff', emissiveMap: opts.map, emissiveIntensity: 0.16 });
    const mesh = new THREE.Mesh(slipGeo, mat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    const holder = new THREE.Group();
    holder.position.set(cellX(c) + (opts.dx || 0), cellY(r) + 0.02 + (opts.lift || 0), 0);
    mesh.rotation.x = -Math.PI / 2 + (opts.tilt ?? 0.42);
    holder.rotation.y = opts.yaw || 0;
    holder.add(mesh);
    rack.add(holder);
    const rest = opts.out;
    const slip = { mesh, holder, id: opts.id, rest, now: reduceMotion ? rest : -0.6, delay: opts.delay || 0 };
    place(slip);
    slips.push(slip);
    return slip;
  };
  function place(s) {
    // The slip's front edge sits `now` in front of the rack; it pivots near its back end
    const L = SLIP_L;
    const tilt = s.mesh.rotation.x + Math.PI / 2;
    s.mesh.position.set(0, Math.sin(tilt) * L / 2, s.now - Math.cos(tilt) * L / 2);
  }

  // Names on every pigeonhole, key people where the story needs them
  const taken = new Map(Object.entries(SLIPS).map(([id, s]) => [`${s.col},${s.row}`, id]));
  let other = 0;
  const labelGeo = new THREE.PlaneGeometry(0.5, 0.11);
  const plainMaps = ['#E9ECEF', '#E9ECEF', '#B7C0D3', '#F2B544'].map((edge, i) => paperTexture(edge, 2 + (i % 3)));
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const key = taken.get(`${c},${r}`);
      const name = key ? SLIPS[key].name : OTHERS[other++ % OTHERS.length];
      const plate = new THREE.Mesh(labelGeo, new THREE.MeshStandardMaterial({ map: label(name), metalness: 0.55, roughness: 0.35 }));
      plate.position.set(cellX(c), cellY(r) + CH - 0.075, 0.036);
      rack.add(plate);
      const seed = (c * 7 + r * 13) % 10;
      if (key) {
        const s = SLIPS[key];
        if (seed % 2) addSlip(c, r, { map: plainMaps[0], out: 0.08, tilt: 0.2, dx: 0.04, yaw: 0.03, delay: 0.1 });
        addSlip(c, r, { id: key, map: paperTexture(s.edge, 0, s.face), out: 0.24, tilt: 0.62, lift: 0.03, yaw: -0.02, delay: 0.25 + Object.keys(SLIPS).indexOf(key) * 0.12 });
      } else if (seed > 3) {
        addSlip(c, r, { map: plainMaps[seed % 4], out: 0.1 + (seed % 3) * 0.05, tilt: 0.18 + (seed % 3) * 0.06, dx: ((seed % 3) - 1) * 0.04, yaw: ((seed % 5) - 2) * 0.02, delay: seed * 0.05 });
      }
    }
  }

  // Pointer: hover and click on the key slips
  const ray = new THREE.Raycaster();
  const pointer = new THREE.Vector2(9, 9);
  let hover = null;
  const keyMeshes = slips.filter(s => s.id).map(s => s.mesh);
  addEventListener('pointermove', e => {
    pointer.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
  }, { passive: true });
  canvas.style.pointerEvents = 'auto';
  canvas.addEventListener('click', () => { if (hover) select(hover, true), onSelect(hover); });
  onSelect = id => { selectedRack = id; };
  let selectedRack = selected;

  // Camera framing: overview, or close on a slip for each moment of the day
  const look = new THREE.Vector3(0, H * 0.45, 0);
  const lookNow = look.clone();
  const pos = new THREE.Vector3();
  const posNow = new THREE.Vector3();
  let frame = { cx: 0.66, cy: 0.5 };
  let frameNow = { ...frame };
  const tanHalf = () => Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
  const slipFront = id => {
    const s = slips.find(x => x.id === id);
    return s.holder.localToWorld(new THREE.Vector3(0, 0.12, s.rest));
  };
  function aim() {
    const narrow = camera.aspect < 0.9;
    if (activeStop < 0) {
      const fitW = (W * (narrow ? 1.12 : 1.85)) / (2 * tanHalf() * camera.aspect);
      const fitH = (H * (narrow ? 2.6 : 1.55)) / (2 * tanHalf());
      const d = Math.max(fitW, fitH);
      look.set(0, H * 0.48, 0);
      pos.set(0.6, H * 0.48 + d * 0.3, d);
      frame = narrow ? { cx: 0.5, cy: 0.25 } : { cx: 0.705, cy: 0.42 };
    } else {
      const id = STOP_SLIP[activeStop];
      const f = slipFront(id);
      const d = narrow ? Math.max(3.2, 1.6 / (2 * tanHalf() * camera.aspect)) : (activeStop === 2 ? 2.3 : 2.8);
      look.copy(f);
      pos.set(f.x + (activeStop % 2 ? -0.35 : 0.45), f.y + d * 0.42, f.z + d);
      frame = narrow ? { cx: 0.5, cy: 0.2 } : { cx: 0.68, cy: 0.5 };
      if (selected !== id) select(id, true);
      selectedRack = id;
    }
  }
  onStop = () => aim();

  function resize() {
    const w = innerWidth, h = innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    aim();
    camera.updateProjectionMatrix();
  }
  addEventListener('resize', resize);
  resize();
  posNow.copy(pos);
  lookNow.copy(look);
  frameNow = { ...frame };

  // Render only while the rack is on screen
  let visible = true;
  const solid = document.querySelector('.solid');
  const checkVisible = () => { visible = solid.getBoundingClientRect().top > 0 && !document.hidden; };
  addEventListener('scroll', checkVisible, { passive: true });
  document.addEventListener('visibilitychange', checkVisible);

  const clock = new THREE.Clock();
  let t0 = 0;
  const par = new THREE.Vector2();
  function tick() {
    requestAnimationFrame(tick);
    if (!visible) return;
    const dt = Math.min(clock.getDelta(), 0.05);
    t0 += dt;
    const k = reduceMotion ? 1 : 1 - Math.exp(-dt * 3.2);

    // Hover
    ray.setFromCamera(pointer, camera);
    const hit = ray.intersectObjects(keyMeshes, false)[0];
    hover = hit ? slips.find(s => s.mesh === hit.object).id : null;
    canvas.style.cursor = hover ? 'pointer' : '';

    // Slips slide to rest after the opening sort; hovered and selected ones come out further
    for (const s of slips) {
      if (!reduceMotion && t0 < s.delay + 0.2) continue;
      const out = s.rest + (s.id && (s.id === hover || s.id === selectedRack) ? 0.3 : 0);
      s.now += (out - s.now) * (reduceMotion ? 1 : 1 - Math.exp(-dt * 7));
      place(s);
    }

    // Camera eases to its pose, with a little parallax from the pointer
    if (!reduceMotion) par.lerp(new THREE.Vector2(pointer.x > 5 ? 0 : pointer.x, pointer.y > 5 ? 0 : pointer.y), 1 - Math.exp(-dt * 2));
    posNow.lerp(pos, k);
    lookNow.lerp(look, k);
    frameNow.cx += (frame.cx - frameNow.cx) * k;
    frameNow.cy += (frame.cy - frameNow.cy) * k;
    camera.position.set(posNow.x + par.x * 0.25, posNow.y + par.y * 0.12, posNow.z);
    camera.lookAt(lookNow);
    const w = innerWidth, h = innerHeight;
    const dist = posNow.distanceTo(lookNow);
    scene.fog.near = dist + 1.5; scene.fog.far = dist + 16;
    camera.setViewOffset(w, h, -(frameNow.cx - 0.5) * w, -(frameNow.cy - 0.5) * h, w, h);
    renderer.render(scene, camera);
  }
  tick();
}
