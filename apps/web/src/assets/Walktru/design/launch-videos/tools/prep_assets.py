"""Shared assets for the three launch films: fonts, GSAP, brand mark, resized artwork and cropped demo clips.

Sources are never modified. Outputs go to ../shared/. Clips drop the Chrome tab and address bars (top 146 px of the
1920x1020 captures) and are re-encoded H.264, 30 fps, short GOP for fast seeking.

    python tools/prep_assets.py
"""

import shutil
import subprocess
from pathlib import Path

from PIL import Image

HERE = Path(__file__).resolve().parent
DESIGN = HERE.parents[1]
WEB = DESIGN.parent
SHARED = HERE.parent / "shared"
VID = DESIGN / "video"

LOOP = VID / "InShot_20261001_194449541.mp4"     # full loop: dashboard, Tripverse run, report, replay
EXT = VID / "InShot_20261001_193304450.mp4"      # extension on Tripverse, report
MCP = VID / "InShot_20261001_192123691.mp4"      # MCP page, key, Claude Code in VS Code
LAND = VID / "InShot_20261001_191538113.mp4"     # landing page scroll
BIRDS = VID / "InShot_20260920_001509965.mp4"    # five birds playground

# name: (source, start, end)
CLIPS = {
    "dash": (LOOP, 0.0, 1.9),
    "goal": (LOOP, 3.6, 9.9),
    "run": (LOOP, 9.9, 19.6),
    "budget": (LOOP, 19.6, 23.6),
    "places": (LOOP, 23.6, 26.4),
    "writing": (LOOP, 26.6, 30.8),
    "report": (LOOP, 31.2, 33.6),
    "moments": (LOOP, 33.6, 38.9),
    "seo": (LOOP, 38.9, 42.1),
    "ext-start": (EXT, 0.6, 9.4),
    "ext-form": (EXT, 11.4, 15.2),
    "ext-report": (EXT, 15.2, 22.9),
    "mcp-page": (MCP, 1.6, 12.4),
    "mcp-code": (MCP, 12.6, 23.5),
    "landing": (LAND, 0.4, 14.8),
}

ART = {  # folder: (source folder, max px)
    "doodles": (DESIGN / "source-images" / "doodles", 1500),
    "illustration": (DESIGN / "source-images" / "illustration", 1300),
    "visual": (DESIGN / "source-images" / "visual", 1700),
    "mcp": (DESIGN / "source-images" / "mcp-claude", 1300),
    "info": (DESIGN / "source-images" / "info", 1300),
    "real": (DESIGN / "source-images" / "real-img", 1700),
    "inspo": (DESIGN / "source-images" / "inspo", 1500),
    "posters": (DESIGN / "doodle-posters" / "posters", 1800),
    "mockups": (DESIGN / "doodle-exploration", 1920),
    "screens": (WEB / "public" / "assets", 1920),
}


def clip(name: str, src: Path, start: float, end: float) -> None:
    out = SHARED / "clips" / f"{name}.mp4"
    if out.exists():
        return
    crop = "crop=1920:874:0:146" if src != BIRDS else "crop=1920:878:0:0"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", f"{start}", "-to", f"{end}", "-i", str(src), "-an",
                    "-vf", f"{crop},fps=30,format=yuv420p", "-c:v", "libx264", "-preset", "slow", "-crf", "17",
                    "-g", "15", "-movflags", "+faststart", str(out)], check=True)


def art() -> None:
    for folder, (src, size) in ART.items():
        dest = SHARED / "img" / folder
        dest.mkdir(parents=True, exist_ok=True)
        for f in sorted(src.iterdir()):
            if f.suffix.lower() not in (".jpg", ".jpeg", ".png", ".webp") or (folder == "mockups" and not f.name.startswith("mockup-")):
                continue
            name = "".join(ch if ch.isalnum() or ch == "-" else "-" for ch in f.stem).strip("-")[:40]
            im = Image.open(f)
            im.thumbnail((size, size), Image.LANCZOS)
            keep_alpha = im.mode in ("RGBA", "LA", "P") and folder in ("screens",)
            if keep_alpha:
                im.save(dest / f"{name}.png", optimize=True)
            else:
                im.convert("RGB").save(dest / f"{name}.jpg", quality=88, optimize=True)


def main() -> None:
    (SHARED / "clips").mkdir(parents=True, exist_ok=True)
    for name, (src, a, b) in CLIPS.items():
        clip(name, src, a, b)
    clip("birds", BIRDS, 0.0, 2.75)
    art()
    fonts = SHARED / "fonts"
    fonts.mkdir(exist_ok=True)
    nm = WEB / "node_modules" / "@fontsource-variable"
    shutil.copy(nm / "geist" / "files" / "geist-latin-wght-normal.woff2", fonts / "geist.woff2")
    shutil.copy(nm / "geist-mono" / "files" / "geist-mono-latin-wght-normal.woff2", fonts / "geist-mono.woff2")
    shutil.copy(DESIGN / "doodle-exploration" / "geist-FONT-LICENSE.txt", fonts / "geist-FONT-LICENSE.txt")
    js = SHARED / "js"
    js.mkdir(exist_ok=True)
    shutil.copy(WEB / "node_modules" / "gsap" / "dist" / "gsap.min.js", js / "gsap.min.js")
    brand = SHARED / "brand"
    brand.mkdir(exist_ok=True)
    shutil.copy(WEB / "src" / "assets" / "brand" / "walkthru-mark.svg", brand / "mark.svg")
    shutil.copy(WEB / "src" / "assets" / "brand" / "walkthru-mark.png", brand / "mark.png")
    for f in sorted(SHARED.rglob("*")):
        if f.is_file() and f.parent.name in ("clips", "fonts", "js", "brand"):
            print(f.relative_to(SHARED), f.stat().st_size // 1024, "kB")


if __name__ == "__main__":
    main()
