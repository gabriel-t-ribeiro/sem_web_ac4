# SEM `Ac4` — MagLink Consortium Project Webpage

Public project webpage for **Seminários em Engenharia Mecânica (SEM 2026/2027)** — Evaluation `Ac4` (10%).

**Project Acronym:** `MagLink`  
**Working Title:** *MagLink: Bimodal Autonomous Public Transit Linking Local Roads and Open Highway Maglev Corridors*  
**Language:** English (**confirmed with professor on 18/11/2026**; aligns with international R&D framing and portfolio use).

---

## 1. Concept, Real Problem & System Boundary

**Target Niche:** Regional, inter-municipal, and intercity transit competing with **trams and Light Rail Transit (LRT, e.g., Coimbra-style corridors)** — faster and lower-friction on highway trunk segments while keeping wheeled maneuverability on local streets, without requiring multi-city routes or building new steel railways from scratch.

### System Boundary (20-Year Horizon)

| In Scope (`MagLink` Consortium R&D) | Assumed / External Ecosystem (20-Year Horizon) |
| :--- | :--- |
| **Bimodal vehicle architecture & wheel ↔ Maglev transition mechanism** (height/pitch leveling, airgap alignment, wheel retraction/unloading) | **Open, standardized highway Maglev lane** accessible to compliant transit & freight vehicles (not developed from scratch by this consortium) |
| **Adaptive controlled suspension integration** (collaborating partner group — active road-preview leveling & transition control) | **Base autonomous driving stack** (Vision + LiDAR 3D point-cloud fusion maturing in automotive industry) |
| **Smart-stop V2I passenger-detection protocol & skip-stop routing** (predefined route; stops only when station detects waiting passengers) | **Existing highway & national road right-of-way** (already constructed — Chen et al., 2021) |
| **Literature-grounded corridor parametric estimation** (travel time, energy, CO2 vs. LRT/tram, BRT/bus, car, HSR) | |

---

## 2. Local Setup & GitHub Pages Deployment

### Preview locally (using Python)

Run a local static server from the repository root:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

### Deploy to GitHub Pages

1. Publish this repository to GitHub (via GitHub Desktop or `gh repo create`).
2. On GitHub, go to **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**, branch `main`, folder `/ (root)`, and click **Save**.
4. Submit the generated `https://<username>.github.io/<repo-name>/` URL on e-learning by **December 7, 2026**.

---

## 3. Project Structure

| File / Folder | Purpose |
| :--- | :--- |
| `index.html` | Main public overview webpage (semantic HTML5, zero build step) |
| `state-of-the-art.html` | Second page (navbar Research dropdown): paper matrix, technology comparison & SotA gap |
| `css/styles.css` | Layout, dropdown navigation, typography, tables, and responsive styling |
| `js/main.js` | Accessible click/Escape/outside-click handling for the navbar dropdown |
| `assets/` | Logo, presentation/poster renders (`hero_bimodal_concept.png`, `highway_maglev_*.jpg`), and generated SVG figures (`fig_mode_transition.svg`, `fig_sota_benchmark.svg`) |
| `scripts/` | Python scripts (`generate_diagrams.py`, parametric corridor estimator) outputting SVG/PNG figures to `assets/` |
| `.nojekyll` | Disables Jekyll on GitHub Pages so static files serve cleanly |

---

## 4. Reference Paper Analysis Matrix (Literature Synthesis)

> [!IMPORTANT]
> **Why this table matters:** The professors explicitly asked for the **main work, main conclusions, and main limitations** of every paper we base the project on. Every row must be verified and tied directly to the **real engineering problem** and **SotA gap**.

Rating key: **great** = fully verified & tied to our gap, **good** = extracted & usable, **ok** = draft from PDF, **bad** = missing / weak link, **to do** = not yet analyzed.

| Reference (Author, Year) | Main Work | Main Conclusions | Main Limitations / Gap Identified | Status | Notes / Action Needed |
| :--- | :--- | :--- | :--- | :---: | :--- |
| **Chen et al. (2021)** — *Assessing carbon dioxide emissions of high-speed rail: Beijing–Shanghai corridor* (`Transp. Res. Part D`) | Ex-post Life-Cycle Assessment (LCA) comparing actual Beijing–Shanghai HSR traffic vs. counterfactual without HSR, modeling mode substitution and induced traffic across construction, manufacturing, and operation. | Net operational CO2 turns negative once enough road/air traffic is diverted, offsetting rolling-stock manufacturing; however, **HSR infrastructure construction creates a massive upfront CO2 burden** barely offset by avoided road/air expansion. | Single Chinese corridor case study; proves that **building brand-new dedicated rail infrastructure from scratch carries huge embodied CO2**, motivating reuse of existing highway corridors. | **good** | Anchors why `MagLink` uses existing highways/roads rather than new rail lines. |
| **Lee, Kim & Lee (2006)** + **Zhu et al. (2024)** + **Huang et al. (2024)** — *Maglev EMS/EDS Evolution* (`IEEE Trans. Magn.`, `Buildings`, `Superconductivity`) | Reviews EMS vs. EDS levitation architectures (`Lee 2006`), low/medium-speed EMS levitation control (`Zhu 2024`), and superconducting EDS dynamics/optimization (`Huang 2024`). | EMS allows zero-speed levitation without auxiliary wheels; EDS delivers large airgaps and natural lateral self-stability with advancing adaptive/HTS control. | EMS is open-loop unstable and guideway-coupled; EDS requires wheels below transition speed; all operate strictly on closed dedicated guideways with zero road interoperability. | **great** | Modernized 2006 Maglev baseline with two 2024 reviews via Consensus. |
| **Feng et al. (2024)** — *Autonomous-rail rapid transit tram: System architecture, design and applications* (CRRC Zhuzhou) | Designs the Autonomous-Rail Rapid Transit (ART) rubber-tire tram architecture (core + intelligent subsystems) using virtual painted tracks instead of steel rails; benchmarks Yibin T1 line vs. subway/tram/BRT. | Achieves rail-like multi-axle steering and capacity on existing urban roads with minimal civil cost (98.8% schedule on-time rate, 26.8 km/h avg vs. 13 km/h bus, lower capex than LRT/tram). | Operating speed capped at **70 km/h** (too slow for regional/intercity express corridors); relies on painted markings/vision + GPS/IMU; authors flag **"long-tail" self-driving edge cases**, all-weather perception, and wireless platooning as unresolved. | **good** | Direct LRT/tram/BRT benchmark (`Table 5`) for our parametric corridor estimator. |
| **Fadlelseed et al. (2025)** — *Recent Advances in Demand Responsive Transport: Opportunities With Autonomous Bus Service* (`IEEE Access`) | System-of-Systems (SoS) review of DRT + Connected & Automated Mobility (CAM) buses across vehicles, infrastructure, routing/optimization algorithms, and lifecycle ROI analysis. | Automated DRT breaks even around Year 5 on structured corridors and can cut CO2/NOx by ~40–60% vs. conventional buses; heterogeneous/adaptive service models optimize utilization. | Fixed-vs-fluctuating demand trade-off risks over-investment; strictly low/medium-speed road transit; authors flag **cybersecurity/spoofing**, accessibility, regulatory gaps, V&V/digital twins, and multimodal rail/MaaS integration as open challenges. | **good** | Justifies `MagLink` smart V2I skip-stop operation + ethical/cybersecurity risks section. |
| **Mantouka et al. (2026)** & **Gyllenhammar et al. (2025)** — *Autonomous Transit Traffic, ODDs & Safety Evidence* (`Sensors`, `IEEE TITS`) | Reviews operational/infrastructure ODD requirements for automated transit traffic and eight core safety-evidence challenges in Automated Driving Systems (ADS). | Automated buses currently operate reliably only within narrow geo-fenced ODDs (`< 25 km/h`); scalable rollout needs V2X infrastructure links and scenario-based verification. | Road marking/signage variation, adverse weather, unmonitored ODD exit handovers, and AI black-box verification gaps block unrestricted driverless urban transit. | **great** | Direct peer-reviewed check on autonomous bus maturity via Consensus. |
| **Chen et al. (2024)** & **Iqbal et al. (2026)** — *End-to-End Vision vs. Multimodal Fusion* (`IEEE TPAMI`, `Sensors`) | Surveys End-to-End (E2E) autonomous driving frontiers (`Chen 2024`) and sensor physics comparing camera-only vs. RGB-LiDAR fusion under uncertainty (`Iqbal 2026`). | Cameras give rich semantics while LiDAR anchors metric 3D depth; multimodal RGB-LiDAR fusion lowers unknown-obstacle false braking (`1.7%` vs. `8.6%` LiDAR-only). | Vision-only E2E stacks suffer epistemic uncertainty on OOD corner cases (`<0.03%` occurrence), causal confusion, and lack deterministic safety guarantees without rule guardrails. | **great** | Explains why MagLink assumes multimodal Camera + LiDAR fusion + ODD guardrails rather than vision-only E2E hype. |
| **Yu et al. (2024)**, **Theunissen et al. (2021)** & **Li et al. (2024)** — *Predictive Active Suspension* (`Engineering`, `Annu. Rev. Control`, `Sensors`) | Partner Group (`Suspensão Ativa Preditiva` — Dinis Mano et al.) literature base: active suspension advances, road-preview control review, and speed-dependent preview MPC. | Anticipating road geometry via camera/laser preview solves comfort-vs.-stability trade-offs before wheel impact, stabilizing heave/pitch and tire-ground contact. | Validated only on road chassis; actuator energy and preview latency budgets stay tight at highway speed; connects directly to WP3 guideway airgap alignment. | **great** | Extracted from partner poster (`adaptative_suspension_dinis.pdf`). |
| **Zhan et al. (2022)** & **Widyotriatmo et al. (2024)** — *Precision Multi-DOF Docking* (`Sensors`, `J. Field Robot.`) | Active 6-DOF Stewart-platform docking via camera + laser rangefinder fusion and digital-twin heavy-vehicle autonomous docking stabilization control. | Achieves centimeter-level heavy docking alignment (`5 cm` position, `0.0087 rad` angle) and smooth road-disturbance tracking in simulation. | Both remain simulation-validated and do not couple rubber-tire transit onto a magnetic levitation highway lane; motivates WP2–WP5 physical test rig. | **great** | Backs our Mechanical Engineering transition gap via Consensus. |

---

## 5. `Ac4` Webpage & Consortium Status Against the Brief

Checked against `SEM_2627_v02.pdf` (Sections 12–13). Submission deadline for webpage URL: **December 7, 2026** (pitch: **December 9, 2026**).

| Item | Brief / Evaluators Ask | Status | Notes / Next Step |
| :--- | :--- | :---: | :--- |
| **Real Engineering Problem & Niche** | Narrow the broad *Big Idea* into one concrete R&D bottleneck backed by SotA limitations. | **great** | Locked: **Wheel ↔ Open Highway Maglev transition** + **V2I smart skip-stop**, with honest framing ("No New Corridor", curve-radius speed cap, aero/levitation power nuance). |
| **Consortium Alignment & WPs** | Show all partner groups, competencies, Work Packages, and **Grupo 2's specific tasks** (50% consortium / 50% subgroup grade). | **good** | **WP1–WP5**, 24-month Gantt (`fig_workplan_gantt.svg`), and **Suspensão Ativa Preditiva** partner group (Dinis Mano et al., link + 6 members) integrated; confirm person-month (`PM`) split and partner group number if any. |
| **Literature-Grounded Corridor Estimation** | Preliminary engineering estimates (travel time, energy, CO2 vs. LRT/tram, bus, car) clearly labeled as literature-based estimates. | **to do** | Build parametric Python estimator in `scripts/corridor_estimator.py` and add measurable §3.3 objectives / hero KPI (tracked in **Issue #2**). |
| **Technical Specs (*Caderno de Encargos*)** | Target KPIs (road speed, curve-limited trunk speed, transition window, mass budget, TRL 2→4), risks & ethics. | **ok** | TRL 2→4 & risk safeguards live on site; lock quantitative mass/stroke/speed KPIs with `Suspensão Ativa Preditiva` and add objective cards (**Issue #2**). |
| **Webpage (`index.html`, `styles.css`, `state-of-the-art.html`)** | Public, standalone, attractive overview (sum of `Ai1`–`Ac4` so evaluators can review before Dec 9 without reading the full report). | **good** | Layout, interactive hero, dropdown, and responsive checks verified; dedicated visuals to replace reused `highway_maglev_ground.jpg` tracked in **Issue #3**. |
| **`Ag2` Cumulative Integration (Questions + Society Validation)** | Reflect the sum of prior evaluations (`Ai1` + `Ag2` + `Ag3`): broad societal questions + external community/Google Form feedback. | **ok** | Broad societal questions + initial **Proof of Interest (`n = 51`)** SVG chart live on `index.html` (`#proof-of-interest`); deeper PDP-style analysis & integration tracked in open Issue #1. |
| **Paper Limitations Synthesis** | Clear answers on main work, conclusions, and limitations of all reference papers. | **great** | 15 peer-reviewed papers synthesized across `state-of-the-art.html` & `index.html` (`[1]–[15]`), covering LCA, Maglev EMS/EDS, ART, DRT, AI transit safety/E2E vision vs. LiDAR, partner preview MPC suspension, and docking. |

### Open Issues to Tackle Later

- **Issue #1** — Deeper PDP-style survey analysis & Proof of Interest integration (`#proof-of-interest`).
- **Issue #2** — Measurable §3.3 R&D objectives, `scripts/corridor_estimator.py` parametric model, and replacing one secondary hero pill with a quantitative corridor KPI (keeping `Dual-Mode`).
- **Issue #3** — Generate custom technical images/schematics to replace reused `assets/highway_maglev_ground.jpg` across pages.
