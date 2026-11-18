# SEM `Ac4` — Consortium Project Webpage

Public project webpage for **Seminários em Engenharia Mecânica (SEM 2026/2027)** — Evaluation `Ac4` (10%).

## Structure

- `index.html` — Main public webpage (semantic HTML5, zero build step)
- `css/styles.css` — Layout, typography, and responsive styling
- `assets/` — Figures, system architecture diagrams, Gantt charts, and plots
- `scripts/` — Optional Python scripts (e.g., Matplotlib/Plotly) to generate crisp SVG/PNG figures into `assets/`

## Local Preview (using Python)

Run a local static server from the repository root:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## Deploying to GitHub Pages

1. Publish this repository to GitHub (via GitHub Desktop or `gh repo create`).
2. On GitHub, go to **Settings -> Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**, branch `main`, folder `/ (root)`, and click **Save**.
4. Submit the generated `https://<username>.github.io/sem_web_ac4/` URL on e-learning by **December 7, 2026**.
