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
  const palette = ["#38bdf8", "#60a5fa", "#818cf8", "#f8fafc", "#38bdf8", "#f59e0b"];

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
          speed: 0.4 + Math.random() * 0.65,
          driftAmp: 3 + Math.random() * 5,
          baseLen: 2.0 + Math.random() * 1.6,
          maxBoostLen: 6.0 + Math.random() * 5.5,
          width: 1.15 + Math.random() * 0.9,
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
    // Smooth directional spectrum around cursor: cyan/blue dominant, warm amber on front arc
    const norm = ((angle + Math.PI) / (Math.PI * 2)) % 1;
    if (norm > 0.84 || norm < 0.08) return palette[5];
    if (norm < 0.35) return palette[0];
    if (norm < 0.58) return palette[1];
    if (norm < 0.74) return palette[2];
    return palette[3];
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
      const rx = Math.min(165, Math.max(60, width * 0.16));
      const ry = Math.min(100, Math.max(42, height * 0.16));

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

    const ringRadius = Math.max(125, Math.min(205, Math.min(width, height) * 0.26));
    const bandSigma = 74;

    ctx.lineCap = "round";
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const baseX = p.nx * width + Math.cos(t * p.speed + p.phase) * p.driftAmp;
      const baseY = p.ny * height + Math.sin(t * p.speed * 0.85 + p.phase) * p.driftAmp;

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

      // Ambient flow stays faint (~0.08 alpha); mouse proximity reveals crisp directional dashes
      const alpha = 0.08 + influence * 0.78;
      const len = p.baseLen + influence * p.maxBoostLen;
      const half = len * 0.5;
      const flowAngle = angle + 0.32 * Math.sin(angle * 2 + t * 0.6);
      const drawAngle = influence > 0.04 ? flowAngle : p.phase * 0.15;

      const cos = Math.cos(drawAngle);
      const sin = Math.sin(drawAngle);

      ctx.beginPath();
      ctx.moveTo(drawX - cos * half, drawY - sin * half);
      ctx.lineTo(drawX + cos * half, drawY + sin * half);
      ctx.lineWidth = p.width + influence * 1.1;
      ctx.strokeStyle = influence > 0.18 ? pickColor(angle) : "#94a3b8";
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
