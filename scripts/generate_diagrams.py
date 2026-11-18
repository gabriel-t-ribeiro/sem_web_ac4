"""Generate validated SVG diagrams for the MagLink R&D proposal website."""

from pathlib import Path
import xml.etree.ElementTree as ET

ASSETS_DIR = Path(__file__).resolve().parent.parent / "assets"
ASSETS_DIR.mkdir(parents=True, exist_ok=True)


def save_and_validate_svg(filename: str, content: str) -> None:
    ET.fromstring(content)
    out_path = ASSETS_DIR / filename
    out_path.write_text(content, encoding="utf-8")
    print(f"Validated & wrote {out_path.name}")


def build_mode_transition_svg() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 980 350" role="img" aria-labelledby="mt-title mt-desc">
  <title id="mt-title">MagLink Bimodal Wheel-to-Maglev Transition Architecture</title>
  <desc id="mt-desc">Three-stage operational flow showing local wheeled autonomous driving, adaptive suspension transition handoff, and open highway Maglev operation with smart skip-stop dispatch.</desc>
  <defs>
    <style>
      .bg { fill: #0f172a; }
      .card { fill: #1e293b; stroke: #334155; stroke-width: 1.5; }
      .card-core { fill: #102a43; stroke: #38bdf8; stroke-width: 2; }
      .pill-1 { fill: rgba(56, 189, 248, 0.16); }
      .pill-2 { fill: rgba(251, 191, 36, 0.16); }
      .pill-3 { fill: rgba(45, 212, 191, 0.16); }
      .pill-txt-1 { font-family: system-ui, -apple-system, sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.05em; fill: #38bdf8; }
      .pill-txt-2 { font-family: system-ui, -apple-system, sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.05em; fill: #fbbf24; }
      .pill-txt-3 { font-family: system-ui, -apple-system, sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.05em; fill: #2dd4bf; }
      .h-title { font-family: system-ui, -apple-system, sans-serif; font-size: 16.5px; font-weight: 700; fill: #f8fafc; }
      .body-txt { font-family: system-ui, -apple-system, sans-serif; font-size: 13px; fill: #cbd5e1; }
      .sub-txt { font-family: system-ui, -apple-system, sans-serif; font-size: 12px; fill: #94a3b8; }
      .arrow { stroke: #38bdf8; stroke-width: 2.5; fill: none; marker-end: url(#ah-blue); }
      .arrow-rev { stroke: #64748b; stroke-width: 1.8; stroke-dasharray: 5 4; fill: none; marker-end: url(#ah-muted); }
      .band { fill: #172554; stroke: #1d4ed8; stroke-width: 1.2; }
      .band-txt { font-family: system-ui, -apple-system, sans-serif; font-size: 12.5px; font-weight: 600; fill: #e0f2fe; }
    </style>
    <marker id="ah-blue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#38bdf8"/>
    </marker>
    <marker id="ah-muted" markerWidth="9" markerHeight="6" refX="8" refY="3" orient="auto">
      <polygon points="0 0, 9 3, 0 6" fill="#64748b"/>
    </marker>
  </defs>

  <rect class="bg" x="0" y="0" width="980" height="350" rx="16"/>

  <!-- Stage 1 -->
  <rect class="card" x="26" y="28" width="276" height="230" rx="12"/>
  <rect class="pill-1" x="44" y="44" width="154" height="22" rx="11"/>
  <text class="pill-txt-1" x="56" y="59">MODE 1 · LOCAL ROADS</text>
  <text class="h-title" x="44" y="92">Wheeled Urban Circulation</text>
  <text class="body-txt" x="44" y="120">&#8226; Rubber-tire steering &amp; traction</text>
  <text class="body-txt" x="44" y="142">&#8226; Vision + LiDAR 3D perception</text>
  <text class="body-txt" x="44" y="164">&#8226; Virtual-track guidance [3]</text>
  <text class="body-txt" x="44" y="186">&#8226; Peripheral &amp; local stop access</text>
  <text class="sub-txt" x="44" y="222">Priority: Maneuverability &amp; safety</text>
  <text class="sub-txt" x="44" y="240">Surface: Existing local streets</text>

  <!-- Stage 2 -->
  <rect class="card-core" x="352" y="28" width="276" height="230" rx="12"/>
  <rect class="pill-2" x="370" y="44" width="188" height="22" rx="11"/>
  <text class="pill-txt-2" x="382" y="59">CORE R&amp;D · TRANSITION ZONE</text>
  <text class="h-title" x="370" y="92">Adaptive Suspension Handoff</text>
  <text class="body-txt" x="370" y="120">&#8226; Predictive road-preview leveling</text>
  <text class="body-txt" x="370" y="142">&#8226; Height &amp; pitch airgap capture</text>
  <text class="body-txt" x="370" y="164">&#8226; Controlled wheel load transfer</text>
  <text class="body-txt" x="370" y="186">&#8226; Mechanical fail-safe latching</text>
  <text class="sub-txt" x="370" y="222">Core Focus: WP2 + WP3 Co-design</text>
  <text class="sub-txt" x="370" y="240">Target: Smooth, shock-free handoff</text>

  <!-- Stage 3 -->
  <rect class="card" x="678" y="28" width="276" height="230" rx="12"/>
  <rect class="pill-3" x="696" y="44" width="174" height="22" rx="11"/>
  <text class="pill-txt-3" x="708" y="59">MODE 2 · HIGHWAY TRUNK</text>
  <text class="h-title" x="696" y="92">Open Maglev &amp; Smart Stops</text>
  <text class="body-txt" x="696" y="120">&#8226; Shared open magnetic lane [2]</text>
  <text class="body-txt" x="696" y="142">&#8226; Zero rolling wear on trunk</text>
  <text class="body-txt" x="696" y="164">&#8226; V2I station occupancy sensing</text>
  <text class="body-txt" x="696" y="186">&#8226; Skips empty stops to cut losses [4]</text>
  <text class="sub-txt" x="696" y="222">Priority: Trunk speed &amp; flow</text>
  <text class="sub-txt" x="696" y="240">Right-of-Way: Highway corridor [1]</text>

  <line class="arrow" x1="306" y1="126" x2="346" y2="126"/>
  <line class="arrow" x1="632" y1="126" x2="672" y2="126"/>
  <line class="arrow-rev" x1="672" y1="160" x2="634" y2="160"/>
  <line class="arrow-rev" x1="346" y1="160" x2="308" y2="160"/>

  <rect class="band" x="26" y="280" width="928" height="44" rx="10"/>
  <text class="band-txt" x="490" y="307" text-anchor="middle">
    Continuous Supervisory Layer: Vision + LiDAR Perception &#183; V2I Smart-Stop Dispatch &#183; Fail-Safe Wheel Fallback
  </text>
</svg>
"""


def build_sota_benchmark_svg() -> str:
    bars = [
        ("BRT (Diesel, Road)", 60, "#64748b", "60 km/h &#183; Existing road [3]"),
        ("Tram / LRT (Steel Rail)", 70, "#475569", "70 km/h &#183; New rails &amp; bridges [3]"),
        ("ART (Virtual Track)", 70, "#3b82f6", "70 km/h &#183; Existing road, virtual track [3]"),
        ("Subway (Heavy Metro)", 80, "#334155", "80 km/h &#183; Exclusive tunnel/bridge [3]"),
        ("Dedicated Maglev", 430, "#0284c7", "430+ km/h &#183; Dedicated closed guideway [2]"),
    ]
    max_speed = 500
    x0 = 215
    max_w = 390

    rows = []
    y = 84
    for label, speed, color, note in bars:
        w = int((speed / max_speed) * max_w)
        rows.append(
            f'<text class="lbl" x="{x0 - 14}" y="{y + 19}" text-anchor="end">{label}</text>'
            f'<rect x="{x0}" y="{y}" width="{w}" height="28" rx="6" fill="{color}"/>'
            f'<text class="val" x="{x0 + w + 10}" y="{y + 19}">{note}</text>'
        )
        y += 46

    maglink_y = y + 8
    local_w = int((70 / max_speed) * max_w)
    trunk_w = int((180 / max_speed) * max_w) - local_w - 6
    rows.append(
        f'<text class="lbl-accent" x="{x0 - 14}" y="{maglink_y + 19}" text-anchor="end">MagLink (Proposed)</text>'
        f'<rect x="{x0}" y="{maglink_y}" width="{local_w}" height="28" rx="6" fill="#0f4c81"/>'
        f'<rect x="{x0 + local_w + 6}" y="{maglink_y}" width="{trunk_w}" height="28" rx="6" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.8" stroke-dasharray="5 4"/>'
        f'<text class="val-accent" x="{x0 + local_w + trunk_w + 16}" y="{maglink_y + 19}">Local (~60-70) + Highway-curve-limited Maglev envelope</text>'
    )

    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 980 400" role="img" aria-labelledby="sb-title sb-desc">
  <title id="sb-title">Literature Operating Speed and Infrastructure Positioning</title>
  <desc id="sb-desc">Comparison of published maximum operating speeds for BRT, Tram/LRT, ART, Subway, and dedicated Maglev against MagLink's highway-curve-constrained dual-regime envelope.</desc>
  <defs>
    <style>
      .bg {{ fill: #ffffff; stroke: #cbd5e1; stroke-width: 1.5; }}
      .title {{ font-family: system-ui, -apple-system, sans-serif; font-size: 16px; font-weight: 700; fill: #0f172a; }}
      .subtitle {{ font-family: system-ui, -apple-system, sans-serif; font-size: 12.5px; fill: #475569; }}
      .lbl {{ font-family: system-ui, -apple-system, sans-serif; font-size: 13px; font-weight: 600; fill: #1e293b; }}
      .lbl-accent {{ font-family: system-ui, -apple-system, sans-serif; font-size: 13px; font-weight: 700; fill: #0f4c81; }}
      .val {{ font-family: system-ui, -apple-system, sans-serif; font-size: 12px; fill: #334155; }}
      .val-accent {{ font-family: system-ui, -apple-system, sans-serif; font-size: 12px; font-weight: 600; fill: #0f4c81; }}
      .grid {{ stroke: #e2e8f0; stroke-width: 1; }}
      .axis {{ font-family: system-ui, -apple-system, sans-serif; font-size: 11px; fill: #64748b; }}
    </style>
  </defs>

  <rect class="bg" x="1" y="1" width="978" height="398" rx="14"/>
  <text class="title" x="28" y="34">Literature Benchmark: Operating Speed vs. Dedicated Rail Dependency</text>
  <text class="subtitle" x="28" y="54">Published speeds from Feng et al. (2024, Table 5) [3] and Lee et al. (2006) [2]; highway curve radii cap realistic MagLink trunk speeds well below 430 km/h.</text>

  <line class="grid" x1="{x0}" y1="74" x2="{x0}" y2="360"/>
  <line class="grid" x1="{x0 + 78}" y1="74" x2="{x0 + 78}" y2="360"/>
  <line class="grid" x1="{x0 + 156}" y1="74" x2="{x0 + 156}" y2="360"/>
  <line class="grid" x1="{x0 + 234}" y1="74" x2="{x0 + 234}" y2="360"/>
  <line class="grid" x1="{x0 + 312}" y1="74" x2="{x0 + 312}" y2="360"/>
  <line class="grid" x1="{x0 + 390}" y1="74" x2="{x0 + 390}" y2="360"/>

  {''.join(rows)}

  <text class="axis" x="{x0}" y="378" text-anchor="middle">0</text>
  <text class="axis" x="{x0 + 78}" y="378" text-anchor="middle">100 km/h</text>
  <text class="axis" x="{x0 + 156}" y="378" text-anchor="middle">200 km/h</text>
  <text class="axis" x="{x0 + 234}" y="378" text-anchor="middle">300 km/h</text>
  <text class="axis" x="{x0 + 312}" y="378" text-anchor="middle">400 km/h</text>
  <text class="axis" x="{x0 + 390}" y="378" text-anchor="middle">500 km/h</text>
</svg>
"""


def build_workplan_gantt_svg() -> str:
    # 24-month R&D execution plan (M1-M24)
    wps = [
        ("WP1 · System Specs &amp; Corridor Req.", 1, 6, "#2563eb", "M1–M6 · Core Architecture Team"),
        ("WP2 · Bimodal Transition &amp; Chassis", 4, 15, "#0284c7", "M4–M15 · Mechanical Integration"),
        ("WP3 · Adaptive Suspension &amp; Airgap", 5, 16, "#0d9488", "M5–M16 · Suspension Control Partner"),
        ("WP4 · V2I Skip-Stop &amp; Corridor Sim", 10, 21, "#6366f1", "M10–M21 · Autonomy &amp; LCA Modeling"),
        ("WP5 · Rig Integration &amp; TRL 4 Val.", 15, 24, "#0f4c81", "M15–M24 · Full Consortium V&amp;V"),
    ]
    x0 = 265
    total_m = 24
    chart_w = 440  # leaves room for the owner labels right of the bars
    step = chart_w / total_m

    grid_lines = []
    for m in [0, 6, 12, 18, 24]:
        gx = x0 + m * step
        grid_lines.append(f'<line class="grid" x1="{gx:.1f}" y1="72" x2="{gx:.1f}" y2="306"/>')
        lbl = "M1" if m == 0 else f"M{m}"
        grid_lines.append(f'<text class="axis" x="{gx:.1f}" y="324" text-anchor="middle">{lbl}</text>')

    bars = []
    y = 84
    for title, start_m, end_m, color, owner in wps:
        bx = x0 + (start_m - 1) * step
        bw = (end_m - start_m + 1) * step
        bars.append(
            f'<text class="lbl" x="{x0 - 14}" y="{y + 19}" text-anchor="end">{title}</text>'
            f'<rect x="{bx:.1f}" y="{y}" width="{bw:.1f}" height="28" rx="6" fill="{color}"/>'
            f'<text class="val" x="{x0 + chart_w + 14}" y="{y + 19}">{owner}</text>'
        )
        y += 44

    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 980 345" role="img" aria-labelledby="gp-title gp-desc">
  <title id="gp-title">MagLink 24-Month R&amp;D Work Plan Gantt Chart</title>
  <desc id="gp-desc">Work package timeline across 24 months from system requirements through bimodal transition design, adaptive suspension co-design, corridor simulation, and TRL 4 validation.</desc>
  <defs>
    <style>
      .bg {{ fill: #ffffff; stroke: #cbd5e1; stroke-width: 1.5; }}
      .title {{ font-family: system-ui, -apple-system, sans-serif; font-size: 16px; font-weight: 700; fill: #0f172a; }}
      .subtitle {{ font-family: system-ui, -apple-system, sans-serif; font-size: 12.5px; fill: #475569; }}
      .lbl {{ font-family: system-ui, -apple-system, sans-serif; font-size: 12.5px; font-weight: 600; fill: #1e293b; }}
      .val {{ font-family: system-ui, -apple-system, sans-serif; font-size: 12px; fill: #475569; }}
      .grid {{ stroke: #e2e8f0; stroke-width: 1; }}
      .axis {{ font-family: system-ui, -apple-system, sans-serif; font-size: 11px; fill: #64748b; }}
    </style>
  </defs>

  <rect class="bg" x="1" y="1" width="978" height="343" rx="14"/>
  <text class="title" x="28" y="34">24-Month R&amp;D Execution Timeline (TRL 2 &#8594; TRL 4)</text>
  <text class="subtitle" x="28" y="54">Phased work packages linking chassis mechanics, active suspension control, smart-stop dispatch, and validation.</text>

  {''.join(grid_lines)}
  {''.join(bars)}
</svg>
"""


def build_survey_proof_of_interest_svg() -> str:
    # Exact exploratory Ag2 survey counts (n = 51, fielded Oct 2-7, 2026)
    demand_bars = [
        ("Transfer-free travel (&#8805;4/5)", 94.1, "94.1% · 4.67/5", "#2563eb"),
        ("Future network interest (&#8805;4/5)", 80.4, "80.4% · 4.10/5", "#0284c7"),
        ("Bimodal road-to-Maglev use", 70.6, "70.6% · 0% No", "#0d9488"),
        ("Driverless transit use", 64.7, "64.7% · 19.6% No", "#475569"),
        ("Autonomous comfort (&#8805;4/5)", 47.1, "47.1% · 3.43/5", "#d97706"),
    ]
    driver_bars = [
        ("Top factor: fare price", 82.4, "82.4% (42/51)", "#0f4c81"),
        ("Prefer price&#8211;time balance", 82.4, "82.4% (42/51)", "#1d4ed8"),
        ("Remote oversight (&#8805;4/5)", 82.4, "82.4% · 4.31/5", "#0284c7"),
        ("Top factor: safety", 76.5, "76.5% (39/51)", "#0369a1"),
        ("Public tests &#8594; WP5", 66.7, "66.7% (34/51)", "#0d9488"),
        ("Redundancy &#8594; WP2", 49.0, "49.0% (25/51)", "#0f766e"),
        ("Autonomy fear &#8594; WP2/4", 45.1, "45.1% (23/51)", "#b45309"),
    ]

    left_rows = []
    y = 122
    lx = 232
    lw = 136
    for label, pct, note, color in demand_bars:
        bw = (pct / 100.0) * lw
        left_rows.append(
            f'<text class="lbl" x="{lx - 10}" y="{y + 15}" text-anchor="end">{label}</text>'
            f'<rect x="{lx}" y="{y + 2}" width="{lw}" height="18" rx="5" fill="#e2e8f0"/>'
            f'<rect x="{lx}" y="{y + 2}" width="{bw:.1f}" height="18" rx="5" fill="{color}"/>'
            f'<text class="val" x="{lx + lw + 8}" y="{y + 15}">{note}</text>'
        )
        y += 42

    right_rows = []
    ry = 122
    rx = 724
    rw = 124
    for label, pct, note, color in driver_bars:
        bw = (pct / 100.0) * rw
        right_rows.append(
            f'<text class="lbl" x="{rx - 10}" y="{ry + 15}" text-anchor="end">{label}</text>'
            f'<rect x="{rx}" y="{ry + 2}" width="{rw}" height="18" rx="5" fill="#e2e8f0"/>'
            f'<rect x="{rx}" y="{ry + 2}" width="{bw:.1f}" height="18" rx="5" fill="{color}"/>'
            f'<text class="val" x="{rx + rw + 8}" y="{ry + 15}">{note}</text>'
        )
        ry += 35

    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 980 436" role="img" aria-labelledby="sp-title sp-desc">
  <title id="sp-title">Exploratory Community Survey Proof of Interest and Design Drivers</title>
  <desc id="sp-desc">Summary of 51 exploratory responses showing strong support for transfer-free bimodal travel, price-and-safety prioritization, and remote supervision plus pre-launch testing requirements.</desc>
  <defs>
    <style>
      .bg {{ fill: #ffffff; stroke: #cbd5e1; stroke-width: 1.5; }}
      .panel {{ fill: #f8fafc; stroke: #e2e8f0; stroke-width: 1.2; }}
      .title {{ font-family: system-ui, -apple-system, sans-serif; font-size: 16px; font-weight: 700; fill: #0f172a; }}
      .subtitle {{ font-family: system-ui, -apple-system, sans-serif; font-size: 12px; fill: #475569; }}
      .sec-h {{ font-family: system-ui, -apple-system, sans-serif; font-size: 13px; font-weight: 700; fill: #0f4c81; }}
      .lbl {{ font-family: system-ui, -apple-system, sans-serif; font-size: 11.5px; font-weight: 600; fill: #1e293b; }}
      .val {{ font-family: system-ui, -apple-system, sans-serif; font-size: 11px; font-weight: 600; fill: #334155; }}
      .note-box {{ fill: #eff6ff; stroke: #bfdbfe; stroke-width: 1; }}
      .note-txt {{ font-family: system-ui, -apple-system, sans-serif; font-size: 11px; font-weight: 600; fill: #1e3a8a; }}
      .caveat-box {{ fill: #f1f5f9; stroke: #cbd5e1; stroke-width: 1; }}
      .caveat-txt {{ font-family: system-ui, -apple-system, sans-serif; font-size: 11.5px; fill: #334155; }}
    </style>
  </defs>

  <rect class="bg" x="1" y="1" width="978" height="434" rx="14"/>
  <text class="title" x="26" y="32">Exploratory Community Survey: Proof of Interest &amp; Requirements (n = 51)</text>
  <text class="subtitle" x="26" y="52">Fielded Oct 2&#8211;7, 2026 (84.3% private-car users) &#183; Connects public demand directly to cost constraints and WP2&#8211;WP5 safeguards.</text>

  <rect class="panel" x="24" y="70" width="456" height="304" rx="12"/>
  <text class="sec-h" x="40" y="96">A. Proof of Interest vs. Autonomy Comfort</text>
  {''.join(left_rows)}
  <rect class="note-box" x="38" y="330" width="428" height="32" rx="8"/>
  <text class="note-txt" x="252" y="350" text-anchor="middle">70.6% bimodal adoption vs. 47.1% comfort &#8594; prove safety first</text>

  <rect class="panel" x="496" y="70" width="460" height="304" rx="12"/>
  <text class="sec-h" x="512" y="96">B. Selection Priorities &amp; Trust Safeguards</text>
  {''.join(right_rows)}

  <rect class="caveat-box" x="24" y="386" width="932" height="32" rx="8"/>
  <text class="caveat-txt" x="38" y="406">Sample caveat (requirements triage): Cohort is 92.2% aged 18&#8211;24 and 7.8% aged 25&#8211;34 (0% 35+); WP1 expands commuter validation across all ages.</text>
</svg>
"""


if __name__ == "__main__":
    save_and_validate_svg("fig_mode_transition.svg", build_mode_transition_svg())
    save_and_validate_svg("fig_sota_benchmark.svg", build_sota_benchmark_svg())
    save_and_validate_svg("fig_workplan_gantt.svg", build_workplan_gantt_svg())
    save_and_validate_svg("fig_survey_proof_of_interest.svg", build_survey_proof_of_interest_svg())
