"""Copy the shared assets into one film's Hyperframes project (each project must be self-contained).

    python tools/setup_project.py a-ship-friday happy-beats-business-moves-vol-12-by-ende-dot-app.mp3
"""

import shutil
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent
SHARED = ROOT / "shared"
BRAG = Path.home() / ".claude" / "skills" / "brag" / "assets"
SFX = [  # CC0 Kenney sounds from the brag skill, the small palette the three films draw from
    "interface/click_002.ogg", "interface/click_004.ogg", "interface/drop_001.ogg", "interface/drop_002.ogg", "interface/select_008.ogg",
    "interface/switch_002.ogg", "interface/bong_001.ogg", "impact/impactSoft_medium_001.ogg", "impact/impactSoft_medium_003.ogg",
    "impact/impactBell_heavy_000.ogg", "impact/impactBell_heavy_003.ogg", "impact/impactGlass_light_002.ogg",
    "impact/impactWood_light_002.ogg", "casino/card-slide-2.ogg", "casino/card-place-1.ogg", "casino/card-fan-1.ogg",
    "casino/chips-stack-2.ogg", "ui/mouseclick1.ogg", "ui/rollover2.ogg",
] + [f"keyboard/keypress-{i:03d}.wav" for i in range(1, 13)]


def main(name: str, music: str) -> None:
    project = ROOT / name
    assets = project / "assets"
    for sub in ("clips", "img", "fonts", "js", "kit", "brand"):
        shutil.copytree(SHARED / sub, assets / sub, dirs_exist_ok=True)
    (assets / "scout").mkdir(parents=True, exist_ok=True)
    for f in (SHARED / "scout").glob("scout-strip-*.png"):
        shutil.copy(f, assets / "scout" / f.name)
    for f in (SHARED / "scout").glob("scout-still-*.png"):
        shutil.copy(f, assets / "scout" / f.name)
    (assets / "music").mkdir(exist_ok=True)
    shutil.copy(BRAG / "music" / music, assets / "music" / music)
    for rel in SFX:
        dest = assets / "sfx" / rel
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy(BRAG / "sfx" / rel, dest)
    print(f"{name}: assets ready")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
