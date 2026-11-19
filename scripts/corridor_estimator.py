#!/usr/bin/env python3
"""
Parametric 20-year regional corridor estimator for MagLink.
Grounded in:
  [3]  Feng et al. (2024): ART urban commercial speed 26.8 km/h vs. 13 km/h bus
  [17] Felez et al. (2025): Hybrid Maglev retrofit hardware ~EUR 5.45M/km single-track
  [20] Badia & Jenelius (2021): Driver share >40% of bus OPEX; ~EUR 5.9/veh-h remote crew
  [21] Shen et al. (2025): Skip-stop + dwell control cuts wait & OPEX
  [22] Alobeidyeen (2026): V2I drives 72% of V2X wait/headway gains
"""
from dataclasses import dataclass


@dataclass
class CorridorConfig:
    urban_km: float = 6.0
    trunk_km: float = 70.0
    stops_per_dir: int = 14
    stop_loss_s: float = 40.0
    layover_min: float = 12.0
    base_headway_min: float = 30.0
    driver_share: float = 0.45      # [20] >40%
    remote_wage_mult: float = 1.25
    autonomy_overhead: float = 0.08 # sensor/compute upkeep share of base OPEX


def evaluate_scenario(
    cfg: CorridorConfig,
    urban_kmh: float,
    trunk_kmh: float,
    skip_frac: float,
    supervision_n: int,
    transfer_min: float = 0.0,
    is_conventional: bool = False,
) -> dict:
    if is_conventional:
        opex_ratio = 1.0
    else:
        opex_ratio = (
            (1.0 - cfg.driver_share)
            + (cfg.driver_share * cfg.remote_wage_mult) / max(1, supervision_n)
            + cfg.autonomy_overhead
        )

    urban_min = (cfg.urban_km / urban_kmh) * 60.0
    trunk_min = (cfg.trunk_km / trunk_kmh) * 60.0
    dwell_min = ((1.0 - skip_frac) * cfg.stops_per_dir * cfg.stop_loss_s) / 60.0
    one_way_in_veh = urban_min + trunk_min + dwell_min
    cycle_min = 2.0 * one_way_in_veh + cfg.layover_min

    # Baseline conventional cycle time for fixed-budget fleet scaling
    conv_cycle = (
        2.0 * ((cfg.urban_km / 13.0) * 60.0 + (cfg.trunk_km / 85.0) * 60.0 + (cfg.stops_per_dir * cfg.stop_loss_s) / 60.0)
        + cfg.layover_min
    )
    fleet_mult = 1.0 / opex_ratio
    headway_min = cfg.base_headway_min * (cycle_min / conv_cycle) * opex_ratio
    freq_per_h = 60.0 / headway_min
    wait_min = 0.5 * headway_min
    door_to_door = wait_min + one_way_in_veh + transfer_min

    return {
        "opex_pct": round(opex_ratio * 100.0, 1),
        "fleet_mult": round(fleet_mult, 2),
        "cycle_min": round(cycle_min, 1),
        "headway_min": round(headway_min, 1),
        "freq_per_h": round(freq_per_h, 2),
        "wait_min": round(wait_min, 1),
        "urban_min": round(urban_min, 1),
        "trunk_min": round(trunk_min, 1),
        "dwell_min": round(dwell_min, 1),
        "transfer_min": round(transfer_min, 1),
        "door_to_door_min": round(door_to_door, 1),
    }


def main() -> None:
    cfg = CorridorConfig()
    scenarios = {
        "Conventional Express Bus": evaluate_scenario(cfg, 13.0, 85.0, 0.0, 1, transfer_min=10.0, is_conventional=True),
        "Today's Pilot AV Feeder (1:2, 12 km/h)": evaluate_scenario(cfg, 12.0, 85.0, 0.15, 2, transfer_min=10.0),
        "20-Yr Automated V2I Bus (1:10, 27 km/h)": evaluate_scenario(cfg, 27.0, 95.0, 0.35, 10, transfer_min=0.0),
        "20-Yr MagLink Bimodal (1:10, 220 km/h)": evaluate_scenario(cfg, 27.0, 220.0, 0.35, 10, transfer_min=0.0),
    }
    for name, res in scenarios.items():
        print(f"{name}: {res}")


if __name__ == "__main__":
    main()
