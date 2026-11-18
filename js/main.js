document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-mobile-toggle");
  const navLinks = document.querySelector(".nav-links");
  const dropdowns = document.querySelectorAll(".nav-dropdown");

  const closeAllDropdowns = () => {
    dropdowns.forEach((dropdown) => {
      const btn = dropdown.querySelector(".nav-dropdown-toggle");
      if (btn) btn.setAttribute("aria-expanded", "false");
      dropdown.classList.remove("is-open");
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

    toggle.addEventListener("click", (event) => {
      event.stopPropagation();
      const next = toggle.getAttribute("aria-expanded") !== "true";
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
        const btn = dropdown.querySelector(".nav-dropdown-toggle");
        if (btn) btn.setAttribute("aria-expanded", "false");
        dropdown.classList.remove("is-open");
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
});
