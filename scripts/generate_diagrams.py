"""Generate clean, publication-grade SVG engineering diagrams for MagLink Ac4."""

from pathlib import Path

ASSETS_DIR = Path(__file__).resolve().parent.parent / "assets"
ASSETS_DIR.mkdir(parents=True, exist_ok=True)


def write_mode_transition_svg() -> None:
    svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 340" role="img" aria-labelledby="mt-title mt-desc">
  <title id="mt-title">MagLink Bimodal Wheel-to-Maglev Transition Architecture</title>
  <desc id="mt-desc">Three-stage operational flow showing local wheeled autonomous driving, adaptive suspension transition handoff, and open highway Maglev operation with V2I smart skip-stop.</desc>
  <defs>
    <style>
      .bg { fill: #f8fafc; }
      .box { fill: #ffffff; stroke: #cbd5e1; stroke-width: 1.8; rx: 12; }
      .box-accent { fill: #eef6ff; stroke: #0f4c81; stroke-width: 2.2; rx: 12; }
      .pill-1 { fill: #e0ecf7; }
      .pill-2 { fill: #fef3c7; }
      .pill-3 { fill: #dcfce7; }
      .h-title { font-family: system-ui, -apple-system, sans-serif; font-size: 16px; font-weight: 700; fill: #0f172a; }
      .pill-txt { font-family: system-ui, -apple-system, sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.04em; fill: #0f4c81; }
      .pill-txt-2 { fill: #92400e; }
      .pill-txt-3 { fill: #166534; }
      .body-txt { font-family: system-ui, -apple-system, sans-serif; font-size: 13px; fill: #334155; }
      .sub-txt { font-family: system-ui, -apple-system, sans-serif; font-size: 12px; fill: #475569; }
      .arrow { stroke: #0f4c81; stroke-width: 2.5; fill: none; marker-end: url(#arrowhead); }
      .arrow-rev { stroke: #64748b; stroke-width: 2; stroke-dasharray: 5 4; fill: none; marker-end: url(#arrowhead-muted); }
      .band { fill: #0f4c81; rx: 8; }
      .band-txt { font-family: system-ui, -apple-system, sans-serif; font-size: 12.5px; font-weight: 600; fill: #ffffff; }
    </style>
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#0f4c81"/>
    </marker>
    <marker id="arrowhead-muted" markerWidth="9" markerHeight="6" refX="8" refY="3" orient="auto">
      <polygon points="0 0, 9 3, 0 6" fill="#64748b"/>
    </marker>
  </defs>

  <rect class="bg" x="0" y="0" width="960" height="340" rx="14"/>

  <!-- Stage 1 -->
  <rect class="box" x="24" y="26" width="272" height="224" rx="12"/>
  <rect class="pill-1" x="40" y="42" width="150" height="22" rx="11"/>
  <text class="pill-txt" x="52" y="57">MODE 1 · LOCAL ROADS</text>
  <text class="h-title" x="40" y="88">Wheeled Autonomous Transit</text>
  <text class="body-txt" x="40" y="114">• Rubber-tire steering &amp; traction</text>
  <text class="body-txt" x="40" y="136">• Vision + LiDAR 3D point clouds</text>
  <text class="body-txt" x="40" y="158">• Virtual-track urban guidance [3]</text>
  <text class="body-txt" x="40" y="180">• Serves peripheral &amp; local stops</text>
  <text class="sub-txt" x="40" y="216">Priority: Maneuverability &amp; safety</text>
  <text class="sub-txt" x="40" y="234">Infrastructure: Existing streets</text>

  <!-- Stage 2 (Core R&D Bottleneck) -->
  <rect class="box-accent" x="344" y="26" width="272" height="224" rx="12"/>
  <rect class="pill-2" x="360" y="42" width="186" height="22" rx="11"/>
  <text class="pill-txt pill-txt-2" x="372" y="57">CORE R&amp;D · TRANSITION ZONE</text>
  <text class="h-title" x="360" y="88">Adaptive Suspension Handoff</text>
  <text class="body-txt" x="360" y="114">• Road-preview active leveling</text>
  <text class="body-txt" x="360" y="136">• Height &amp; pitch airgap capture</text>
  <text class="body-txt" x="360" y="158">• Smooth wheel load transfer</text>
  <text class="body-txt" x="360" y="180">• Mechanical fail-safe latching</text>
  <text class="sub-txt" x="360" y="216">Collab: Grupo 2 + Adaptive Susp.</text>
  <text class="sub-txt" x="360" y="234">Target: Zero passenger jolt</text>

  <!-- Stage 3 -->
  <rect class="box" x="664" y="26" width="272" height="224" rx="12"/>
  <rect class="pill-3" x="680" y="42" width="172" height="22" rx="11"/>
  <text class="pill-txt pill-txt-3" x="692" y="57">MODE 2 · OPEN HIGHWAY</text>
  <text class="h-title" x="680" y="88">Maglev Trunk &amp; Smart Stops</text>
  <text class="body-txt" x="680" y="114">• Open highway magnetic lane [2]</text>
  <text class="body-txt" x="680" y="136">• Zero rolling friction &amp; low wear</text>
  <text class="body-txt" x="680" y="158">• V2I station passenger detection</text>
  <text class="body-txt" x="680" y="180">• Skips empty stops dynamically [4]</text>
  <text class="sub-txt" x="680" y="216">Priority: Speed &amp; energy/p-km</text>
  <text class="sub-txt" x="680" y="234">Infrastructure: Highway retrofit [1]</text>

  <!-- Arrows -->
  <line class="arrow" x1="298" y1="122" x2="340" y2="122"/>
  <line class="arrow" x1="618" y1="122" x2="660" y2="122"/>
  <line class="arrow-rev" x1="660" y1="154" x2="620" y2="154"/>
  <line class="arrow-rev" x1="340" y1="154" x2="300" y2="154"/>

  <!-- Bottom cross-cutting bar -->
  <rect class="band" x="24" y="272" width="912" height="44" rx="8"/>
  <text class="band-txt" x="480" y="299" text-anchor="middle">
    Continuous Supervisory Layer: Vision + LiDAR Sensor Fusion · V2I Smart-Stop Dispatch · Fail-Safe Wheel Fallback
  </text>
</svg>
"""
    (ASSETS_DIR / "fig_mode_transition.svg").write_text(svg, encoding="utf-8")


def write_sota_benchmark_svg() -> None:
    # Speed values strictly verified from Feng et al. (2024) Table 5 and Lee et al. (2006)
    bars = [
        ("BRT (Diesel, Road)", 60, "#94a3b8", "60 km/h · Existing road [3]"),
        ("Tram / LRT (Steel Rail)", 70, "#64748b", "70 km/h · New rails & bridges [3]"),
        ("ART (Virtual Track)", 70, "#3b82f6", "70 km/h · Existing road, virtual track [3]"),
        ("Subway (Heavy Metro)", 80, "#475569", "80 km/h · Exclusive tunnel/bridge [3]"),
        ("Maglev (Dedicated Trunk)", 430, "#0284c7", "430+ km/h · Dedicated guideway [2]"),
    ]
    max_speed = 500
    x0 = 210
    max_w = 400

    rows = []
    y = 78
    for label, speed, color, note in bars:
        w = int((speed / max_speed) * max_w)
        rows.append(
            f'<text class="lbl" x="{x0 - 12}" y="{y + 19}" text-anchor="end">{label}</text>'
            f'<rect x="{x0}" y="{y}" width="{w}" height="28" rx="5" fill="{color}"/>'
            f'<text class="val" x="{x0 + w + 10}" y="{y + 19}">{note}</text>'
        )
        y += 46

    # MagLink dual-regime target band (qualitative target bridging urban & highway trunk)
    maglink_y = y + 6
    rows.append(
        f'<text class="lbl-accent" x="{x0 - 12}" y="{maglink_y + 19}" text-anchor="end">MagLink (Proposed)</text>'
        f'<rect x="{x0}" y="{maglink_y}" width="56" height="28" rx="5" fill="#0f4c81"/>'
        f'<rect x="{x0 + 62}" y="{maglink_y}" width="180" height="28" rx="5" fill="#e0ecf7" stroke="#0f4c81" stroke-width="1.8" stroke-dasharray="6 4"/>'
        f'<text class="val-accent" x="{x0 + 252}" y="{maglink_y + 19}">Dual-regime: Local (~60-70) + Maglev trunk (KPI to estimate)</text>'
    )

    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 390" role="img" aria-labelledby="sb-title sb-desc">
  <title id="sb-title">Literature Operating Speed and Infrastructure Positioning</title>
  <desc id="sb-desc">Comparison of published maximum operating speeds for BRT, Tram/LRT, ART, Subway, and Maglev from Feng et al. (2024) and Lee et al. (2006), illustrating the regional-to-trunk gap targeted by MagLink.</desc>
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

  <rect class="bg" x="1" y="1" width="958" height="388" rx="12"/>
  <text class="title" x="28" y="34">Literature Benchmark: Maximum Operating Speed vs. Infrastructure Dependency</text>
  <text class="subtitle" x="28" y="54">Published benchmarks from Feng et al. (2024, Table 5) [3] and Lee et al. (2006) [2]; MagLink bridges local road agility and highway trunk speed.</text>

  <!-- Vertical reference gridlines -->
  <line class="grid" x1="{x0}" y1="70" x2="{x0}" y2="352"/>
  <line class="grid" x1="{x0 + 80}" y1="70" x2="{x0 + 80}" y2="352"/>
  <line class="grid" x1="{x0 + 160}" y1="70" x2="{x0 + 160}" y2="352"/>
  <line class="grid" x1="{x0 + 240}" y1="70" x2="{x0 + 240}" y2="352"/>
  <line class="grid" x1="{x0 + 320}" y1="70" x2="{x0 + 320}" y2="352"/>
  <line class="grid" x1="{x0 + 400}" y1="70" x2="{x0 + 400}" y2="352"/>

  {''.join(rows)}

  <text class="axis" x="{x0}" y="370" text-anchor="middle">0</text>
  <text class="axis" x="{x0 + 80}" y="370" text-anchor="middle">100 km/h</text>
  <text class="axis" x="{x0 + 160}" y="370" text-anchor="middle">200 km/h</text>
  <text class="axis" x="{x0 + 240}" y="370" text-anchor="middle">300 km/h</text>
  <text class="axis" x="{x0 + 320}" y="370" text-anchor="middle">400 km/h</text>
  <text class="axis" x="{x0 + 400}" y="370" text-anchor="middle">500 km/h</text>
</svg>
"""
    (ASSETS_DIR / "fig_sota_benchmark.svg").write_text(svg, encoding="utf-8")


if __name__ == "__main__":
    write_mode_transition_svg()
    write_sota_benchmark_svg()
    print("Generated SVG diagrams in", ASSETS_DIR)
