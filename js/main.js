document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-mobile-toggle");
  const navLinks = document.querySelector(".nav-links");
  const dropdowns = document.querySelectorAll(".nav-dropdown");

  const closeTimers = new WeakMap();

  const closeAllDropdowns = () => {
    dropdowns.forEach((dropdown) => {
      clearTimeout(closeTimers.get(dropdown));
      const btn = dropdown.querySelector(".nav-dropdown-toggle");
      if (btn) btn.setAttribute("aria-expanded", "false");
      dropdown.classList.remove("is-open", "is-hover-open");
    });
  };

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", (event) => {
      event.stopPropagation();
      const open = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!open));
      navLinks.classList.toggle("is-open", !open);
      if (open) closeAllDropdowns();
    });
  }

  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector(".nav-dropdown-toggle");
    const menu = dropdown.querySelector(".nav-dropdown-menu");
    if (!toggle || !menu) return;

    dropdown.addEventListener("pointerenter", (event) => {
      if (event.pointerType !== "mouse") return;
      clearTimeout(closeTimers.get(dropdown));
      dropdowns.forEach((other) => {
        if (other !== dropdown) {
          clearTimeout(closeTimers.get(other));
          other.classList.remove("is-hover-open");
        }
      });
      dropdown.classList.add("is-hover-open");
      toggle.setAttribute("aria-expanded", "true");
    });

    dropdown.addEventListener("pointerleave", (event) => {
      if (event.pointerType !== "mouse") return;
      clearTimeout(closeTimers.get(dropdown));
      const timer = setTimeout(() => {
        dropdown.classList.remove("is-hover-open");
        if (!dropdown.classList.contains("is-open")) {
          toggle.setAttribute("aria-expanded", "false");
        }
      }, 180);
      closeTimers.set(dropdown, timer);
    });

    toggle.addEventListener("click", (event) => {
      event.stopPropagation();
      const next = !dropdown.classList.contains("is-open");
      closeAllDropdowns();
      toggle.setAttribute("aria-expanded", String(next));
      dropdown.classList.toggle("is-open", next);
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        closeAllDropdowns();
        if (navToggle && navLinks) {
          navToggle.setAttribute("aria-expanded", "false");
          navLinks.classList.remove("is-open");
        }
      });
    });
  });

  if (navLinks) {
    navLinks.querySelectorAll(":scope > li > a").forEach((link) => {
      link.addEventListener("click", () => {
        closeAllDropdowns();
        if (navToggle) navToggle.setAttribute("aria-expanded", "false");
        navLinks.classList.remove("is-open");
      });
    });
  }

  document.addEventListener("click", (event) => {
    dropdowns.forEach((dropdown) => {
      if (!dropdown.contains(event.target)) {
        clearTimeout(closeTimers.get(dropdown));
        const btn = dropdown.querySelector(".nav-dropdown-toggle");
        if (btn) btn.setAttribute("aria-expanded", "false");
        dropdown.classList.remove("is-open", "is-hover-open");
      }
    });
    if (navToggle && navLinks && !navLinks.contains(event.target) && !navToggle.contains(event.target)) {
      navToggle.setAttribute("aria-expanded", "false");
      navLinks.classList.remove("is-open");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAllDropdowns();
      if (navToggle && navLinks) {
        navToggle.setAttribute("aria-expanded", "false");
        navLinks.classList.remove("is-open");
      }
    }
  });

  document.querySelectorAll(".hero, .cta-stage").forEach(initHeroField);
  document.querySelectorAll(".hero-visual-wide, .cta-stage").forEach(initScrollGrow);
  document.querySelectorAll(".footer-wordmark").forEach(initWordmarkFloat);
});

/**
 * First-entry scroll-driven grow & lift animation (scale 0.88 -> 1.0, lift 20px -> 0px),
 * respecting prefers-reduced-motion.
 */
function initScrollGrow(el) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.style.setProperty("--scroll-scale", "1");
    el.style.setProperty("--scroll-lift", "0px");
    return;
  }

  let ticking = false;
  let maxProgress = 0;

  const update = () => {
    ticking = false;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || 800;
    const raw = Math.max(0, Math.min(1, (vh * 0.94 - rect.top) / (vh * 0.64)));
    const eased = 1 - Math.pow(1 - raw, 2);
    maxProgress = Math.max(maxProgress, eased);

    const scale = 0.88 + maxProgress * 0.12;
    const lift = (1 - maxProgress) * 20;
    el.style.setProperty("--scroll-scale", scale.toFixed(4));
    el.style.setProperty("--scroll-lift", `${lift.toFixed(2)}px`);
  };

  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  update();
}

/**
 * Animates trailing "Link" glyphs in the bottom wordmark with magnetic levitation bobbing
 * and subtle cursor-proximity repulsion, pausing off-screen or when reduced motion is enabled.
 */
function initWordmarkFloat(wordmark) {
  const glyphs = Array.from(wordmark.querySelectorAll(".wm-float"));
  if (!glyphs.length) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const presets = [
    { ampY: 10, rot: -1.6, speed: 1.15, phase: 0.2 },
    { ampY: 15, rot: 1.9, speed: 1.35, phase: 1.7 },
    { ampY: 11, rot: -1.4, speed: 1.05, phase: 3.1 },
    { ampY: 16, rot: 2.2, speed: 1.28, phase: 4.5 },
  ];

  const states = glyphs.map(() => ({ px: 0, py: 0, pr: 0 }));
  let pointerX = -9999;
  let pointerY = -9999;
  let pointerInside = false;
  let isVisible = true;
  let rafId = null;

  if (reducedMotion) {
    glyphs.forEach((el, idx) => {
      const p = presets[idx % presets.length];
      el.style.transform = `translate3d(0, ${-Math.round(p.ampY * 0.45)}px, 0) rotate(${(p.rot * 0.6).toFixed(2)}deg)`;
    });
    return;
  }

  function frame(timeMs) {
    if (!isVisible) {
      rafId = null;
      return;
    }
    const t = timeMs * 0.001;
    const wrapRect = wordmark.getBoundingClientRect();
    const scaleAmp = Math.max(0.5, Math.min(1, wrapRect.width / 820));

    glyphs.forEach((el, idx) => {
      const p = presets[idx % presets.length];
      const baseY = (Math.sin(t * p.speed + p.phase) * p.ampY - 6) * scaleAmp;
      const baseRot = Math.cos(t * (p.speed * 0.85) + p.phase) * p.rot;

      let targetPx = 0;
      let targetPy = 0;
      let targetPr = 0;

      if (pointerInside) {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width * 0.5 - wrapRect.left;
        const cy = rect.top + rect.height * 0.5 - wrapRect.top;
        const dx = cx - pointerX;
        const dy = cy - pointerY;
        const dist = Math.hypot(dx, dy) || 1;
        const radius = 220 * scaleAmp;
        if (dist < radius) {
          const strength = Math.pow(1 - dist / radius, 1.5);
          targetPx = (dx / dist) * strength * 14 * scaleAmp;
          targetPy = -strength * 18 * scaleAmp;
          targetPr = ((dx / radius) * 5.5) * strength;
        }
      }

      const st = states[idx];
      st.px += (targetPx - st.px) * 0.12;
      st.py += (targetPy - st.py) * 0.12;
      st.pr += (targetPr - st.pr) * 0.12;

      el.style.transform = `translate3d(${st.px.toFixed(2)}px, ${(baseY + st.py).toFixed(2)}px, 0) rotate(${(baseRot + st.pr).toFixed(2)}deg)`;
    });

    rafId = window.requestAnimationFrame(frame);
  }

  function start() {
    if (isVisible && rafId === null) {
      rafId = window.requestAnimationFrame(frame);
    }
  }

  wordmark.addEventListener("pointermove", (event) => {
    const rect = wordmark.getBoundingClientRect();
    pointerX = event.clientX - rect.left;
    pointerY = event.clientY - rect.top;
    pointerInside = true;
    start();
  });

  wordmark.addEventListener("pointerleave", () => {
    pointerInside = false;
  });

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
        if (isVisible) start();
      },
      { threshold: 0.05 }
    ).observe(wordmark);
  }

  start();
}

/**
 * Renders an Antigravity-inspired mouse-reactive field of magnetic flux capsules
 * behind hero sections, tracking cursor position with smooth spring inertia.
 */
function initHeroField(hero) {
  const canvas = hero.querySelector(".hero-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const palette = ["#22d3ee", "#3b82f6", "#a855f7", "#fb7185", "#fbbf24", "#34d399", "#f472b6", "#38bdf8"];

  let width = 0;
  let height = 0;
  let particles = [];
  let rafId = null;
  let isVisible = true;
  let pointerInside = false;
  let hasMovedPointer = false;
  let pointerDirty = false;
  let isAutonomous = true;
  let lastMoveTimeMs = 0;
  let roamStartMs = 0;
  let lastX = 0;
  let lastY = 0;
  let roamOriginX = 0;
  let roamOriginY = 0;

  const pointer = { x: 0, y: 0, smoothX: 0, smoothY: 0, active: 0.88 };

  function buildParticles() {
    const area = width * height;
    const count = Math.max(110, Math.min(360, Math.round(area / 3600)));
    const cols = Math.max(10, Math.round(Math.sqrt(count * (width / Math.max(height, 1)))));
    const rows = Math.max(7, Math.ceil(count / cols));
    const list = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (list.length >= count) break;
        const nx = (c + 0.16 + Math.random() * 0.68) / cols;
        const ny = (r + 0.16 + Math.random() * 0.68) / rows;
        list.push({
          nx,
          ny,
          phase: Math.random() * Math.PI * 2,
          phaseY: Math.random() * Math.PI * 2,
          speedX: 0.48 + Math.random() * 0.62,
          speedY: 0.42 + Math.random() * 0.58,
          driftAmpX: 10 + Math.random() * 12,
          driftAmpY: 8 + Math.random() * 10,
          baseLen: 4.0 + Math.random() * 2.6,
          maxBoostLen: 6.5 + Math.random() * 5.0,
          width: 1.55 + Math.random() * 0.9,
          baseColor: palette[Math.floor(Math.random() * palette.length)],
          ox: 0,
          oy: 0,
        });
      }
    }
    particles = list;
  }

  function resize() {
    const rect = hero.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    if (!hasMovedPointer) {
      lastX = width * 0.52;
      lastY = height * 0.42;
      roamOriginX = lastX;
      roamOriginY = lastY;
      pointer.x = lastX;
      pointer.y = lastY;
      pointer.smoothX = lastX;
      pointer.smoothY = lastY;
    } else {
      lastX = Math.max(0, Math.min(width, lastX));
      lastY = Math.max(0, Math.min(height, lastY));
      roamOriginX = Math.max(0, Math.min(width, roamOriginX));
      roamOriginY = Math.max(0, Math.min(height, roamOriginY));
    }
    buildParticles();
    if (reducedMotion) renderFrame(0);
  }

  function pickColor(angle) {
    // Full vibrant directional spectrum around the active ring
    const norm = ((angle + Math.PI) / (Math.PI * 2)) % 1;
    return palette[Math.floor(norm * palette.length) % palette.length];
  }

  function renderFrame(timeMs) {
    const t = timeMs * 0.001;
    ctx.clearRect(0, 0, width, height);

    if (pointerDirty) {
      lastMoveTimeMs = timeMs;
      pointerDirty = false;
      isAutonomous = false;
    } else if (
      hasMovedPointer &&
      !isAutonomous &&
      (!pointerInside || timeMs - lastMoveTimeMs > 1050)
    ) {
      isAutonomous = true;
      roamStartMs = timeMs;
      roamOriginX = lastX;
      roamOriginY = lastY;
    }

    if (isAutonomous) {
      if (roamStartMs === null) {
        roamStartMs = timeMs;
      }
      const dt = Math.max(0, (timeMs - roamStartMs) * 0.001);
      // Smoothstep velocity ramp ensures zero jerk when departing from (lastX, lastY)
      const rampT = Math.min(1, dt / 0.85);
      const ramp = rampT * rampT * (3 - 2 * rampT);
      const rx = Math.min(220, Math.max(75, width * 0.22));
      const ry = Math.min(130, Math.max(52, height * 0.20));

      // Lissajous/figure-8 drift: sin(0) === 0 guarantees zero discontinuity from (lastX, lastY)
      const oscX = Math.sin(dt * 0.65) * rx;
      const oscY = (Math.sin(dt * 1.3) * 0.7 + Math.sin(dt * 0.43) * 0.3) * ry;

      // Gently guide extreme corner origins inward over time while keeping exact origin at dt = 0
      const padX = Math.min(width * 0.25, rx * 0.85);
      const padY = Math.min(height * 0.25, ry * 0.85);
      const safeX = Math.max(padX, Math.min(width - padX, roamOriginX));
      const safeY = Math.max(padY, Math.min(height - padY, roamOriginY));
      const inwardBlend = 1 - Math.exp(-dt * 0.14);
      const anchorX = roamOriginX + (safeX - roamOriginX) * inwardBlend;
      const anchorY = roamOriginY + (safeY - roamOriginY) * inwardBlend;

      pointer.x = Math.max(12, Math.min(width - 12, anchorX + oscX * ramp));
      pointer.y = Math.max(12, Math.min(height - 12, anchorY + oscY * ramp));
    }

    const targetActive = isAutonomous ? 0.88 : 1.0;
    pointer.active += (targetActive - pointer.active) * 0.08;

    pointer.smoothX += (pointer.x - pointer.smoothX) * 0.14;
    pointer.smoothY += (pointer.y - pointer.smoothY) * 0.14;

    if (pointer.active > 0.08) {
      const glow = ctx.createRadialGradient(
        pointer.smoothX,
        pointer.smoothY,
        0,
        pointer.smoothX,
        pointer.smoothY,
        240
      );
      glow.addColorStop(0, `rgba(56, 189, 248, ${(0.11 * pointer.active).toFixed(3)})`);
      glow.addColorStop(0.55, `rgba(37, 99, 235, ${(0.05 * pointer.active).toFixed(3)})`);
      glow.addColorStop(1, "rgba(7, 11, 20, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);
    }

    const ringRadius = Math.max(130, Math.min(215, Math.min(width, height) * 0.27));
    const bandSigma = 86;

    ctx.lineCap = "round";
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const waveX = Math.cos(t * p.speedX + p.phase) * p.driftAmpX + Math.sin(t * 0.34 + p.ny * 6.2) * 7;
      const waveY = Math.sin(t * p.speedY + p.phaseY) * p.driftAmpY + Math.cos(t * 0.29 + p.nx * 6.2) * 6;
      const baseX = p.nx * width + waveX;
      const baseY = p.ny * height + waveY;

      const dx = baseX - pointer.smoothX;
      const dy = baseY - pointer.smoothY;
      const dist = Math.hypot(dx, dy) || 0.001;
      const angle = Math.atan2(dy, dx);

      const ringDist = dist - ringRadius;
      const ringBand = Math.exp(-(ringDist * ringDist) / (2 * bandSigma * bandSigma));
      const nearAura = Math.max(0, 1 - dist / (ringRadius + bandSigma * 1.45));
      const influence = Math.min(1, (ringBand * 0.92 + nearAura * 0.35) * pointer.active);

      const push = influence * 14;
      const targetOx = (dx / dist) * push;
      const targetOy = (dy / dist) * push;
      p.ox += (targetOx - p.ox) * 0.14;
      p.oy += (targetOy - p.oy) * 0.14;

      const drawX = baseX + p.ox;
      const drawY = baseY + p.oy;

      // Rich vibrant AFK capsules (~0.58-0.74), surging to full brightness along the active ring
      const shimmer = 0.5 + 0.5 * Math.sin(t * p.speedX * 1.3 + p.phase);
      const alpha = Math.min(1.0, 0.58 + shimmer * 0.16 + influence * 0.38);
      const len = p.baseLen + influence * p.maxBoostLen;
      const half = len * 0.5;
      const driftVx = -Math.sin(t * p.speedX + p.phase) * p.speedX * p.driftAmpX;
      const driftVy = Math.cos(t * p.speedY + p.phaseY) * p.speedY * p.driftAmpY;
      const driftAngle = Math.atan2(driftVy, driftVx);
      const flowAngle = angle + 0.32 * Math.sin(angle * 2 + t * 0.6);
      const drawAngle = influence > 0.12 ? flowAngle : driftAngle;

      const cos = Math.cos(drawAngle);
      const sin = Math.sin(drawAngle);

      ctx.beginPath();
      ctx.moveTo(drawX - cos * half, drawY - sin * half);
      ctx.lineTo(drawX + cos * half, drawY + sin * half);
      ctx.lineWidth = p.width + influence * 1.15;
      ctx.strokeStyle = influence > 0.18 ? pickColor(angle) : p.baseColor;
      ctx.globalAlpha = alpha;
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  function loop(timeMs) {
    if (!isVisible) {
      rafId = null;
      return;
    }
    renderFrame(timeMs);
    rafId = window.requestAnimationFrame(loop);
  }

  function startLoop() {
    if (!reducedMotion && isVisible && rafId === null) {
      rafId = window.requestAnimationFrame(loop);
    }
  }

  hero.addEventListener("pointermove", (event) => {
    const rect = hero.getBoundingClientRect();
    lastX = event.clientX - rect.left;
    lastY = event.clientY - rect.top;
    pointer.x = lastX;
    pointer.y = lastY;
    pointerInside = true;
    hasMovedPointer = true;
    pointerDirty = true;
    isAutonomous = false;
    startLoop();
  });

  hero.addEventListener("pointerleave", () => {
    pointerInside = false;
    if (!isAutonomous && hasMovedPointer) {
      isAutonomous = true;
      roamStartMs = null;
      roamOriginX = lastX;
      roamOriginY = lastY;
    }
  });

  if ("ResizeObserver" in window) {
    new ResizeObserver(resize).observe(hero);
  } else {
    window.addEventListener("resize", resize);
  }

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
        if (isVisible) startLoop();
      },
      { threshold: 0.05 }
    ).observe(hero);
  }

  resize();
  startLoop();
}

/* Interactive 20-Year Corridor & OPEX Explorer */
function initCorridorExplorer() {
  const root = document.getElementById("corridor-explorer");
  if (!root) return;

  const sSup = document.getElementById("slider-supervision");
  const sSkip = document.getElementById("slider-skip");
  const sSpeed = document.getElementById("slider-speed");
  const outSup = document.getElementById("out-supervision");
  const outSkip = document.getElementById("out-skip");
  const outSpeed = document.getElementById("out-speed");
  const presets = root.querySelectorAll(".explorer-preset");

  const CFG = {
    urbanKm: 6.0,
    trunkKm: 70.0,
    stops: 14,
    stopLossS: 40.0,
    layoverMin: 12.0,
    baseHeadway: 30.0,
    driverShare: 0.45,
    remoteWageMult: 1.25,
    overhead: 0.08,
  };

  function calcScenario(urbanKmh, trunkKmh, skipFrac, supN, transferMin, isConv = false) {
    const opexRatio = isConv
      ? 1.0
      : (1.0 - CFG.driverShare) + (CFG.driverShare * CFG.remoteWageMult) / Math.max(1, supN) + CFG.overhead;

    const urbanMin = (CFG.urbanKm / urbanKmh) * 60.0;
    const trunkMin = (CFG.trunkKm / trunkKmh) * 60.0;
    const dwellMin = ((1.0 - skipFrac) * CFG.stops * CFG.stopLossS) / 60.0;
    const inVeh = urbanMin + trunkMin + dwellMin;
    const cycleMin = 2.0 * inVeh + CFG.layoverMin;

    const convCycle =
      2.0 * ((CFG.urbanKm / 13.0) * 60.0 + (CFG.trunkKm / 85.0) * 60.0 + (CFG.stops * CFG.stopLossS) / 60.0) +
      CFG.layoverMin;
    const fleetMult = 1.0 / opexRatio;
    const headwayMin = CFG.baseHeadway * (cycleMin / convCycle) * opexRatio;
    const freqPerH = 60.0 / headwayMin;
    const waitMin = 0.5 * headwayMin;
    const d2d = waitMin + inVeh + transferMin;

    return { opexRatio, fleetMult, headwayMin, freqPerH, waitMin, urbanMin, trunkMin, dwellMin, transferMin, d2d };
  }

  function syncSliderVars(slider) {
    slider.style.setProperty("--attr-min", slider.min || 0);
    slider.style.setProperty("--attr-max", slider.max || 100);
    slider.style.setProperty("--control-value", slider.value);
  }

  function update() {
    const supN = Number(sSup.value);
    const skipPct = Number(sSkip.value);
    const trunkSpeed = Number(sSpeed.value);

    syncSliderVars(sSup);
    syncSliderVars(sSkip);
    syncSliderVars(sSpeed);

    outSup.textContent = `1:${supN}`;
    sSup.setAttribute("aria-valuetext", `1 operator per ${supN} vehicles`);
    outSkip.textContent = `${skipPct}%`;
    sSkip.setAttribute("aria-valuetext", `${skipPct} percent empty stops skipped`);
    outSpeed.textContent = `${trunkSpeed} km/h`;
    sSpeed.setAttribute("aria-valuetext", `${trunkSpeed} kilometers per hour`);

    const conv = calcScenario(13.0, 85.0, 0.0, 1, 10.0, true);
    const pilot = calcScenario(12.0, 85.0, 0.15, 2, 10.0, false);
    const v2i = calcScenario(27.0, 95.0, skipPct / 100.0, supN, 0.0, false);
    const maglink = calcScenario(27.0, trunkSpeed, skipPct / 100.0, supN, 0.0, false);

    document.getElementById("kpi-opex").textContent = `${(maglink.opexRatio * 100).toFixed(1)}%`;
    document.getElementById("kpi-fleet").textContent = `${maglink.fleetMult.toFixed(2)}\u00d7`;
    document.getElementById("kpi-headway").textContent = `${maglink.headwayMin.toFixed(1)} min`;
    document.getElementById("kpi-freq").textContent = `${maglink.freqPerH.toFixed(2)} buses/h (vs. 2.0/h)`;
    document.getElementById("kpi-d2d").textContent = `${maglink.d2d.toFixed(1)} min`;

    const maxD2D = Math.max(conv.d2d, pilot.d2d, 120);
    const rows = [
      ["conv", conv, "OPEX: 100% (1.0\u00d7 fleet, 2.0 buses/h)"],
      ["pilot", pilot, `OPEX: ${(pilot.opexRatio * 100).toFixed(1)}% (${pilot.fleetMult.toFixed(2)}\u00d7 fleet, 12 km/h trial)`],
      ["v2i", v2i, `OPEX: ${(v2i.opexRatio * 100).toFixed(1)}% (${v2i.fleetMult.toFixed(2)}\u00d7 fleet, ${v2i.freqPerH.toFixed(2)} buses/h)`],
      ["maglink", maglink, `OPEX: ${(maglink.opexRatio * 100).toFixed(1)}% (${maglink.fleetMult.toFixed(2)}\u00d7 fleet, ${maglink.freqPerH.toFixed(2)} buses/h)`],
    ];

    rows.forEach(([key, data, note]) => {
      const fill = document.getElementById(`fill-${key}`);
      const val = document.getElementById(`val-${key}`);
      const tip = document.getElementById(`tip-${key}-body`);
      if (fill) fill.style.width = `${Math.min(100, (data.d2d / maxD2D) * 100).toFixed(1)}%`;
      if (val) val.textContent = `${data.d2d.toFixed(1)} min \u00b7 ${data.headwayMin.toFixed(1)} min hw`;
      if (tip) {
        tip.innerHTML = `Wait ${data.waitMin.toFixed(1)}m + Urban ${data.urbanMin.toFixed(1)}m + Dwell ${data.dwellMin.toFixed(1)}m + Trunk ${data.trunkMin.toFixed(1)}m + Transfer ${data.transferMin.toFixed(1)}m = <strong>${data.d2d.toFixed(1)} min</strong>. ${note}.`;
      }
    });
  }

  [sSup, sSkip, sSpeed].forEach((el) => el.addEventListener("input", () => {
    presets.forEach((b) => b.classList.remove("is-active"));
    update();
  }));

  presets.forEach((btn) => {
    btn.addEventListener("click", () => {
      presets.forEach((b) => {
        b.classList.remove("is-active", "btn-primary");
        b.classList.add("btn-secondary");
      });
      btn.classList.add("is-active", "btn-primary");
      btn.classList.remove("btn-secondary");
      if (btn.dataset.preset === "today") {
        sSup.value = "2";
        sSkip.value = "15";
        sSpeed.value = "140";
      } else {
        sSup.value = "10";
        sSkip.value = "35";
        sSpeed.value = "220";
      }
      update();
    });
  });

  // Progressive enhancement for popover="hint" & interestfor triggers
  const probe = document.createElement("div");
  probe.popover = "hint";
  if (probe.popover !== "hint") {
    document.addEventListener(
      "beforetoggle",
      (event) => {
        const t = event.target;
        if (t?.getAttribute?.("popover") === "hint" && event.newState === "open") {
          t.popover = "auto";
        }
      },
      true
    );
  }

  const triggers = root.querySelectorAll("[interestfor]");
  const ownedTriggers = new Map();
  triggers.forEach((trigger) => {
    const id = trigger.getAttribute("interestfor");
    const tip = id ? document.getElementById(id) : null;
    if (!tip) return;
    tip.setAttribute("role", "tooltip");
    if (!trigger.hasAttribute("aria-expanded")) {
      trigger.setAttribute("aria-expanded", "false");
      ownedTriggers.set(trigger, id);
    }

    if (!("interestForElement" in HTMLButtonElement.prototype)) {
      let hideTimer;
      const showTip = () => {
        clearTimeout(hideTimer);
        if (typeof tip.showPopover === "function" && !tip.matches(":popover-open")) {
          try { tip.showPopover(); } catch {}
        }
      };
      const scheduleHide = () => {
        clearTimeout(hideTimer);
        hideTimer = setTimeout(() => {
          if (typeof tip.hidePopover === "function" && tip.matches(":popover-open")) {
            try { tip.hidePopover(); } catch {}
          }
        }, 120);
      };
      trigger.addEventListener("pointerenter", showTip);
      trigger.addEventListener("focus", showTip);
      trigger.addEventListener("pointerleave", scheduleHide);
      trigger.addEventListener("blur", scheduleHide);
      tip.addEventListener("pointerenter", () => clearTimeout(hideTimer));
      tip.addEventListener("pointerleave", scheduleHide);
    }
  });

  document.addEventListener(
    "toggle",
    (event) => {
      const target = event.target;
      if (!target?.id) return;
      ownedTriggers.forEach((tipId, trigger) => {
        if (tipId === target.id) {
          trigger.setAttribute("aria-expanded", event.newState === "open" ? "true" : "false");
        }
      });
    },
    true
  );

  update();
}

initCorridorExplorer();
