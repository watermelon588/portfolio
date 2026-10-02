"""Scout walk-cycle sprites for the launch films, from design/video/references/brand.mp4.

One stride (24 drawings, about 1 s) chosen where the pose loops seamlessly, aligned horizontally on the body so Scout
walks in place (the vertical bob is kept). Background removed by flood fill from the frame edge, so the white eye ring
stays opaque. Writes a 6x4 grid sprite per colour plus a still, into ../shared/scout/.

    python tools/build_scout.py
"""

import subprocess
import sys
from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage

HERE = Path(__file__).resolve().parent
SRC = HERE.parents[1] / "video" / "references" / "brand.mp4"
OUT = HERE.parent / "shared" / "scout"
TMP = HERE.parent / "shared" / ".scout-frames"

# Unique drawings in the 60 fps extraction; 13..36 is one stride that loops back into 13 (measured).
UNIQUE = [0, 4, 6, 8, 12, 14, 16, 20, 22, 24, 28, 30, 32, 36, 38, 40, 44, 46, 48, 52, 54, 56, 58, 62, 64, 66, 70, 72, 74, 78,
          80, 82, 86, 88, 90, 94, 96, 98, 102, 104, 106, 108, 112, 114, 116, 120, 122, 124, 128, 130, 132, 136, 138, 140, 144]
LOOP = UNIQUE[13:37]
CELL_H = 640
COLOURS = {"ink": (27, 27, 31), "coral": (255, 90, 78), "cobalt": (47, 91, 255), "sun": (255, 201, 60),
           "teal": (77, 114, 116), "lime": (198, 244, 50)}


def frames() -> list[np.ndarray]:
    TMP.mkdir(parents=True, exist_ok=True)
    out = []
    for idx in LOOP:
        path = TMP / f"f{idx:04d}.png"
        if not path.exists():
            subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", f"{idx / 60:.4f}", "-i", str(SRC), "-frames:v", "1", str(path)], check=True)
        out.append(np.asarray(Image.open(path).convert("L"), dtype=np.float32))
    return out


def cut(gray: np.ndarray) -> tuple[np.ndarray, np.ndarray, np.ndarray]:
    """(alpha 0..1, eye mask, ink mask) for one frame."""
    light = gray > 205
    labels, _ = ndimage.label(light)
    edge = set(np.unique(np.concatenate([labels[0], labels[-1], labels[:, 0], labels[:, -1]]))) - {0}
    background = np.isin(labels, list(edge))
    # Enclosed light areas: only those in the head are the eye. Gaps between crossed legs become background.
    ink_rows = np.where((gray < 110).any(axis=1))[0]
    head_limit = ink_rows.min() + 0.35 * (ink_rows.max() - ink_rows.min())
    eye = np.zeros_like(light)
    for lab in set(np.unique(labels[light])) - edge - {0}:
        part = labels == lab
        if np.where(part)[0].mean() < head_limit:
            eye |= part
        else:
            background |= part
    soft = np.clip((236.0 - gray) / 190.0, 0, 1)
    alpha = np.where(eye, 1.0, np.where(background, 0.0, soft))
    alpha = np.maximum(alpha, ndimage.binary_dilation(eye, iterations=2) * soft)  # keep the ring's inner edge solid
    return alpha, eye, ~background


def main() -> None:
    grays = frames()
    cuts = [cut(g) for g in grays]
    # Align on the body (upper 60% of ink) horizontally; keep the vertical bob.
    centres = []
    for alpha, _, _ in cuts:
        ys, xs = np.where(alpha > 0.5)
        body = ys < np.percentile(ys, 60)
        centres.append(xs[body].mean())
    target = float(np.mean(centres))
    shifted = []
    for (alpha, eye, _), cx in zip(cuts, centres):
        dx = int(round(target - cx))
        shifted.append((np.roll(alpha, dx, axis=1), np.roll(eye, dx, axis=1)))
    union = np.zeros_like(shifted[0][0], dtype=bool)
    for alpha, _ in shifted:
        union |= alpha > 0.02
    ys, xs = np.where(union)
    pad = 24
    y0, y1, x0, x1 = max(0, ys.min() - pad), ys.max() + pad, max(0, xs.min() - pad), xs.max() + pad
    scale = CELL_H / (y1 - y0)
    cell_w = int(round((x1 - x0) * scale))
    OUT.mkdir(parents=True, exist_ok=True)
    cols, rows = 6, 4
    for name, rgb in COLOURS.items():
        sheet = Image.new("RGBA", (cell_w * cols, CELL_H * rows), (0, 0, 0, 0))
        for i, (alpha, eye) in enumerate(shifted):
            a = alpha[y0:y1, x0:x1]
            e = eye[y0:y1, x0:x1]
            rgba = np.zeros(a.shape + (4,), dtype=np.uint8)
            rgba[..., 0], rgba[..., 1], rgba[..., 2] = rgb
            rgba[e, 0:3] = 255
            rgba[..., 3] = (a * 255).astype(np.uint8)
            cell = Image.fromarray(rgba, "RGBA").resize((cell_w, CELL_H), Image.LANCZOS)
            sheet.paste(cell, ((i % cols) * cell_w, (i // cols) * CELL_H))
            if i == 0:
                cell.save(OUT / f"scout-still-{name}.png", optimize=True)
        sheet.save(OUT / f"scout-walk-{name}.png", optimize=True)
        # One row for the films: a stepped background-position tween walks it, with repeat-x for loops.
        sh, sw = 480, int(round(cell_w * 480 / CELL_H))
        strip = Image.new("RGBA", (sw * len(shifted), sh), (0, 0, 0, 0))
        for i in range(len(shifted)):
            cell = sheet.crop(((i % cols) * cell_w, (i // cols) * CELL_H, (i % cols) * cell_w + cell_w, (i // cols) * CELL_H + CELL_H))
            strip.paste(cell.resize((sw, sh), Image.LANCZOS), (i * sw, 0))
        strip.save(OUT / f"scout-strip-{name}.png", optimize=True)
    (OUT / "sprite.json").write_text(f'{{"frames": {len(shifted)}, "cols": {cols}, "rows": {rows}, "cellW": {cell_w}, "cellH": {CELL_H}, "fps": 24}}\n')
    print(f"cells {cell_w}x{CELL_H}, {len(shifted)} frames, colours {list(COLOURS)}")


if __name__ == "__main__":
    sys.exit(main())
