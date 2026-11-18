# SEM `Ac4` — MagLink Consortium Project Webpage

Public project webpage for **Seminários em Engenharia Mecânica (SEM 2026/2027)** — Evaluation `Ac4` (10%).

**Project Acronym:** `MagLink`  
**Working Title:** *MagLink: Bimodal Autonomous Public Transit Linking Local Roads and Open Highway Maglev Corridors*  
**Language:** English (chosen for international R&D framing and portfolio use; confirm EN acceptance with faculty).

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
| `assets/` | Figures, system architecture diagrams, Gantt charts, and plots |
| `scripts/` | Python scripts (e.g., parametric corridor estimator, Matplotlib/Plotly charts) outputting to `assets/` |
| `.nojekyll` | Disables Jekyll on GitHub Pages so static files serve cleanly |

---

## 4. Reference Paper Analysis Matrix (Literature Synthesis)

> [!IMPORTANT]
> **Why this table matters:** The professors explicitly asked for the **main work, main conclusions, and main limitations** of every paper we base the project on. Every row must be verified and tied directly to the **real engineering problem** and **SotA gap**.

Rating key: **great** = fully verified & tied to our gap, **good** = extracted & usable, **ok** = draft from PDF, **bad** = missing / weak link, **to do** = not yet analyzed.

| Reference (Author, Year) | Main Work | Main Conclusions | Main Limitations / Gap Identified | Status | Notes / Action Needed |
| :--- | :--- | :--- | :--- | :---: | :--- |
| **Chen et al. (2021)** — *Assessing carbon dioxide emissions of high-speed rail: Beijing–Shanghai corridor* (`Transp. Res. Part D`) | Ex-post Life-Cycle Assessment (LCA) comparing actual Beijing–Shanghai HSR traffic vs. counterfactual without HSR, modeling mode substitution and induced traffic across construction, manufacturing, and operation. | Net operational CO2 turns negative once enough road/air traffic is diverted, offsetting rolling-stock manufacturing; however, **HSR infrastructure construction creates a massive upfront CO2 burden** barely offset by avoided road/air expansion. | Single Chinese corridor case study; proves that **building brand-new dedicated rail infrastructure from scratch carries huge embodied CO2**, motivating reuse of existing highway corridors. | **good** | Anchors why `MagLink` uses existing highways/roads rather than new rail lines. |
| **Lee, Kim & Lee (2006)** — *Review of Maglev Train Technologies* (`IEEE Trans. Magn.`) | Reviews EMS vs. EDS levitation, LIM vs. LSM propulsion, guidance, and global Maglev projects from an electrical engineering viewpoint. | Low/medium-speed urban Maglev favors EMS + LIM for lower construction cost; high-speed (>500 km/h) favors EDS + LSM for controllability/reliability; HTS/PM advances improve magnetic efficiency. | Published in 2006 (pre-modern AV/LiDAR); focuses strictly on closed, dedicated Maglev guideways with high civil cost and zero road/last-mile interoperability; flags remaining system-level cost/adoption barriers. | **ok** | Add newer post-2020 Maglev or dual-mode mechanical interface paper so Maglev citation isn't only from 2006. |
| **Feng et al. (2024)** — *Autonomous-rail rapid transit tram: System architecture, design and applications* (CRRC Zhuzhou) | Designs the Autonomous-Rail Rapid Transit (ART) rubber-tire tram architecture (core + intelligent subsystems) using virtual painted tracks instead of steel rails; benchmarks Yibin T1 line vs. subway/tram/BRT. | Achieves rail-like multi-axle steering and capacity on existing urban roads with minimal civil cost (98.8% schedule on-time rate, 26.8 km/h avg vs. 13 km/h bus, lower capex than LRT/tram). | Operating speed capped at **70 km/h** (too slow for regional/intercity express corridors); relies on painted markings/vision + GPS/IMU; authors flag **"long-tail" self-driving edge cases**, all-weather perception, and wireless platooning as unresolved. | **good** | Direct LRT/tram/BRT benchmark (`Table 5`) for our parametric corridor estimator. |
| **Fadlelseed et al. (2025)** — *Recent Advances in Demand Responsive Transport: Opportunities With Autonomous Bus Service* (`IEEE Access`) | System-of-Systems (SoS) review of DRT + Connected & Automated Mobility (CAM) buses across vehicles, infrastructure, routing/optimization algorithms, and lifecycle ROI analysis. | Automated DRT breaks even around Year 5 on structured corridors and can cut CO2/NOx by ~40–60% vs. conventional buses; heterogeneous/adaptive service models optimize utilization. | Fixed-vs-fluctuating demand trade-off risks over-investment; strictly low/medium-speed road transit; authors flag **cybersecurity/spoofing**, accessibility, regulatory gaps, V&V/digital twins, and multimodal rail/MaaS integration as open challenges. | **good** | Justifies `MagLink` smart V2I skip-stop operation + ethical/cybersecurity risks section. |
| **Adaptive Suspension Partner Papers** *(Rolls-Royce-style active/predictive suspension)* | *[Add papers from the collaborating Adaptive Controlled Suspension group]* | *[Summarize active leveling, road-preview damping, response bandwidth]* | *[Connect limitations to millimeter-scale Maglev airgap capture & mode-transition dynamics]* | **to do** | Collect partner group's references and exact group details. |
| **Dual-Mode / Mechanical Transition Paper(s)** | *[Search Consensus / Scopus for wheel-to-guideway / retractable bogie / active height leveling]* | *[Summarize key findings]* | *[Identify feasibility limits: mass penalty, airgap tolerance, fail-safe latching]* | **to do** | **High priority:** Directly backs our core Mechanical Engineering bottleneck. |

---

## 5. `Ac4` Webpage & Consortium Status Against the Brief

Checked against `SEM_2627_v02.pdf` (Sections 12–13). Submission deadline for webpage URL: **December 7, 2026** (pitch: **December 9, 2026**).

| Item | Brief / Evaluators Ask | Status | Notes / Next Step |
| :--- | :--- | :---: | :--- |
| **Real Engineering Problem & Niche** | Narrow the broad *Big Idea* into one concrete R&D bottleneck backed by SotA limitations. | **good** | Locked: **Wheel ↔ Open Highway Maglev transition** + **V2I smart skip-stop** competing with LRT/trams (e.g., Coimbra) & regional buses. |
| **Consortium Alignment & WPs** | Show all partner groups, competencies, Work Packages, and **Grupo 2's specific tasks** (50% consortium / 50% subgroup grade). | **ok** | **Grupo 2** (6 members) & **Adaptive Controlled Suspension collaborator** identified; exact partner group #s, other partners (if any), and formal WP split still `to do`. |
| **Literature-Grounded Corridor Estimation** | Preliminary engineering estimates (travel time, energy, CO2 vs. LRT/tram, bus, car) clearly labeled as literature-based estimates. | **to do** | **New task saved:** Build parametric Python estimator in `scripts/` using Chen (2021), Feng (2024), Fadlelseed (2025), and Lee (2006) parameters, outputting comparison charts to `assets/`. |
| **Technical Specs (*Caderno de Encargos*)** | Target KPIs (road speed, highway Maglev speed, transition window, mass budget, TRL 2→4), risks & ethics. | **to do** | Define parameter ranges with the Adaptive Suspension partner group. |
| **Webpage (`index.html`, `styles.css`)** | Public, standalone, attractive overview so external evaluators can review before Dec 9 without reading the full report. | **ok** | Updated with **MagLink** scope, system boundary, Grupo 2 roster, and verified `[1]–[4]` references; charts/WPs pending. |
| **Paper Limitations Synthesis** | Clear answers on main work, conclusions, and limitations of all reference papers. | **ok** | 4 poster papers summarized above; still need partner suspension papers + mode-transition paper. |
