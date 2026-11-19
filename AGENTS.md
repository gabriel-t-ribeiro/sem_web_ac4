# MagLink SEM (`Ac4` & `Ac5`) — Agent Guidelines

These guidelines apply to all AI agents working in `sem_web_ac4` (Bimodal Autonomous Hybrid Transit — Seminários em Engenharia Mecânica, DEM, Universidade de Aveiro).

---

## 1. Core Positioning: Selling a 20-Year Scientific & Engineering Research Opportunity

All webpage copy, figures, mathematical models, and literature syntheses **must be framed as a compelling 20-year R&D funding proposal** aligned with `SEM_2627_v02.pdf` (§3.1 *Visão a longo prazo* & §3.2 *Avanço da ciência para a tecnologia*), **not** as a commercial startup pitch and **not** limited to today's short-term trial shuttle bottlenecks:

1. **Pre-competitive R&D Horizon (`TRL 2 → TRL 4` in 24 months, `20-Year` deployment impact):**
   - Pitch *why this research is worth funding*: solving the unsolved bimodal road-to-Maglev handoff unlocks regional transit economics and door-to-door competitiveness that neither conventional buses nor dedicated rail achieve alone.
   - Do **not** use startup/advertising hype ("SAVE MORE", commercial venture rhetoric). Keep the voice rigorous, quantitative, and structured for external R&D reviewers.
2. **Don't Let Today's `6 km/h` Trial Limits Hide the 20-Year Upside:**
   - Current automated shuttles crawl at `< 25 km/h` (or `~6–12 km/h` in mixed pilots), and open-street E2E AI faces long-tail edge cases. Frame those as **today's baseline constraints that motivate our R&D work packages** — **not** as the 20-year ceiling of the system.
   - At the **20-year deployment horizon**, model **mature human-or-better autonomous driving** (reliable `25–30 km/h` urban commercial feeder speeds matching ART benchmarks `[3]`, `1:10–1:20` fleet-level remote supervision, V2I skip-stop dispatch, and `200–250 km/h` highway Maglev cruise).

---

## 2. Dual-Horizon Analytical Rigor & Anti-Fabrication

To remain 100% defensible under technical review:

1. **Always separate baselines from 20-year targets:**
   - **(a) Literature Baseline (Today):** Explicitly anchor current operational limits, cost shares (e.g., `> 40%` driver labor share, residual control-center costs, retrofit hardware benchmarks), and speed floors using cited peer-reviewed studies.
   - **(b) Explicit 20-Year Target Assumptions:** State parameter bounds openly and generate all derived gains (OPEX per veh-h, fleet multiplier at fixed budget, headway reduction, door-to-door time, and corridor break-even) from reproducible Python scripts (e.g., `scripts/corridor_estimator.py`).
2. **Never fabricate numbers, KPIs, DOIs, or partner splits:**
   - Leave unconfirmed partner PM weights, partner group IDs, and individual member roles explicitly marked as pending confirmation (`Issues #5 & #6`) until signed off by the user/consortium.

---

## 3. Literature & Open Access Bibliography Policy

1. **Keep the bibliography lean (`<= 40` citations max):** Add new papers only when they contribute distinct quantitative equations, empirical limits, or mechanisms without overlapping existing references.
2. **Prioritize Open Access peer-reviewed papers:** When running Consensus (`https://consensus.app`) searches, enable the **Open Access (`oa=true`)** and **Exclude Preprints (`exclude_preprints=true`)** filters, and cross-check DOIs and publisher Open Access licenses before citing.

---

## 4. Language, Engineering Hygiene & Visual Verification

1. **Language:** Strictly **US English** across the site (`confirmed 18/11/2026`), code comments, and chat interactions.
2. **Accessibility & Modern Web Standards:** Follow `modern-web-guidance` for navigation (`aria-current`), responsive tables (`container-type`, keyboard scroll regions), and reduced motion.
3. **Visual Verification Before Push:** Whenever editing HTML, CSS, JS, or SVG scripts:
   - Regenerate SVGs with `python3 scripts/generate_diagrams.py` (or the relevant estimator script).
   - Verify desktop (`1440×900`) and mobile (`390×844`) layouts in headless Chrome CDP (shutting down temporary servers cleanly) and inspect screenshots before committing and pushing to `origin/main`.
