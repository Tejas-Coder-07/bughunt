// Visual effects: matrix code rain, particle bursts, confetti
(function () {
  const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dpr = () => Math.min(window.devicePixelRatio || 1, 2);

  function matrix(canvas, opts) {
    opts = opts || {};
    const ctx = canvas.getContext('2d');
    const chars = '01{}[]();=<>#*+-/&|!?$%_ifforintdefprintmain'.split('');
    const fs = opts.fontSize || 16;
    let w, h, cols, drops, d;
    function resize() {
      d = dpr();
      w = canvas.width = innerWidth * d;
      h = canvas.height = innerHeight * d;
      canvas.style.width = innerWidth + 'px';
      canvas.style.height = innerHeight + 'px';
      cols = Math.ceil(innerWidth / fs);
      drops = Array.from({ length: cols }, () => Math.random() * -(innerHeight / fs));
      ctx.fillStyle = '#05070d'; ctx.fillRect(0, 0, w, h);
    }
    resize();
    addEventListener('resize', resize);
    const interval = 1000 / (opts.fps || 20);
    let last = 0;
    function draw() {
      ctx.fillStyle = 'rgba(5,7,13,0.16)';
      ctx.fillRect(0, 0, w, h);
      ctx.font = (fs * d) + 'px "JetBrains Mono", monospace';
      for (let i = 0; i < cols; i++) {
        const ch = chars[(Math.random() * chars.length) | 0];
        const x = i * fs * d, y = drops[i] * fs * d;
        ctx.fillStyle = Math.random() < 0.04 ? '#eafff3' : (i % 6 === 0 ? '#22d3ee' : '#39ff88');
        ctx.fillText(ch, x, y);
        if (drops[i] * fs > innerHeight && Math.random() > 0.975) drops[i] = 0;
        drops[i] += opts.speed || 1;
      }
    }
    function loop(t) {
      requestAnimationFrame(loop);
      if (document.hidden || t - last < interval) return;
      last = t; draw();
    }
    if (reduce) { for (let k = 0; k < 40; k++) draw(); } else requestAnimationFrame(loop);
  }

  // Particle layer (one shared canvas)
  let layer, lctx, parts = [], running = false;
  function ensureLayer() {
    if (layer) return;
    layer = document.createElement('canvas');
    layer.className = 'fx-layer';
    document.body.appendChild(layer);
    lctx = layer.getContext('2d');
    const rs = () => { const d = dpr(); layer.width = innerWidth * d; layer.height = innerHeight * d; layer.style.width = innerWidth + 'px'; layer.style.height = innerHeight + 'px'; lctx.setTransform(d, 0, 0, d, 0, 0); };
    rs(); addEventListener('resize', rs);
  }
  function tick() {
    lctx.clearRect(0, 0, innerWidth, innerHeight);
    parts = parts.filter(p => p.life > 0);
    for (const p of parts) {
      p.vy += p.g; p.vx *= p.drag; p.vy *= p.drag;
      p.x += p.vx; p.y += p.vy; p.rot += p.vr;
      p.life -= p.decay;
      lctx.globalAlpha = Math.max(0, Math.min(1, p.life));
      lctx.fillStyle = p.color;
      if (p.shape === 'rect') {
        lctx.save(); lctx.translate(p.x, p.y); lctx.rotate(p.rot);
        lctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2); lctx.restore();
      } else if (p.shape === 'char') {
        lctx.font = '700 ' + p.size + 'px "JetBrains Mono", monospace';
        lctx.fillText(p.ch, p.x, p.y);
      } else {
        lctx.beginPath(); lctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2); lctx.fill();
      }
    }
    lctx.globalAlpha = 1;
    if (parts.length) requestAnimationFrame(tick); else { running = false; lctx.clearRect(0, 0, innerWidth, innerHeight); }
  }
  function start() { if (!running) { running = true; requestAnimationFrame(tick); } }

  function burst(x, y, opts) {
    if (reduce) return;
    ensureLayer(); opts = opts || {};
    const colors = opts.colors || ['#39ff88', '#22d3ee', '#eafff3'];
    const n = opts.n || 26;
    const glyphs = '{}();<>=01'.split('');
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2, s = (opts.speed || 6) * (0.4 + Math.random());
      const isChar = Math.random() < 0.35;
      parts.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 1.5, g: 0.18, drag: 0.96, rot: 0, vr: 0,
        size: isChar ? 12 + Math.random() * 6 : 3 + Math.random() * 4, life: 1, decay: 0.022 + Math.random() * 0.02,
        color: colors[(Math.random() * colors.length) | 0], shape: isChar ? 'char' : 'dot', ch: glyphs[(Math.random() * glyphs.length) | 0] });
    }
    start();
  }

  function confetti(amount) {
    if (reduce) return;
    ensureLayer();
    const colors = ['#39ff88', '#22d3ee', '#ffd166', '#ff4d6d', '#b388ff', '#ffffff'];
    const n = amount || 160;
    for (let i = 0; i < n; i++) {
      parts.push({ x: Math.random() * innerWidth, y: -20 - Math.random() * innerHeight * 0.4,
        vx: (Math.random() - 0.5) * 3, vy: 2 + Math.random() * 3, g: 0.05, drag: 0.995,
        rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3, size: 8 + Math.random() * 8,
        life: 1.6 + Math.random(), decay: 0.006, color: colors[(Math.random() * colors.length) | 0], shape: 'rect' });
    }
    start();
  }

  window.FX = { matrix, burst, confetti, reduce };
})();
