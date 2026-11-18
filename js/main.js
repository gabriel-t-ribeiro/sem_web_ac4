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

  document.querySelectorAll(".hero").forEach(initHeroField);
});

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

  const pointer = { x: 0, y: 0, smoothX: 0, smoothY: 0, active: 0 };

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
      pointer.x = width * 0.52;
      pointer.y = height * 0.42;
      pointer.smoothX = pointer.x;
      pointer.smoothY = pointer.y;
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

    const targetActive = pointerInside ? 1 : hasMovedPointer ? 0.14 : 0.22;
    pointer.active += (targetActive - pointer.active) * 0.06;

    if (!pointerInside && !hasMovedPointer) {
      pointer.x = width * (0.5 + 0.14 * Math.cos(t * 0.35));
      pointer.y = height * (0.42 + 0.09 * Math.sin(t * 0.45));
    }

    pointer.smoothX += (pointer.x - pointer.smoothX) * 0.12;
    pointer.smoothY += (pointer.y - pointer.smoothY) * 0.12;

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
    pointer.x = event.clientX - rect.left;
    pointer.y = event.clientY - rect.top;
    pointerInside = true;
    hasMovedPointer = true;
    startLoop();
  });

  hero.addEventListener("pointerleave", () => {
    pointerInside = false;
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
