#!/usr/bin/env bash
# report, stuck-closeup, seo and security are now real captures of public reports (see public/assets/README.md).
# Renders placeholder product screens to public/assets, trimmed tight to their edges. Usage: bash render.sh
cd "$(dirname "$0")"
EDGE="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
OUT="$(cd ../../public/assets && pwd -W)"
shot() { "$EDGE" --headless=new --disable-gpu --hide-scrollbars --default-background-color=00000000 --force-device-scale-factor=$4 --window-size=$2,$3 --screenshot="$OUT/$1.png" "file:///$(pwd -W)/$1.html" 2>/dev/null; }
shot hero-product 1600 1100 1.5
shot extension-panel 500 900 1.6
python - "$OUT" <<'PY'
import sys, os
from PIL import Image
out = sys.argv[1]
for n in ['hero-product','extension-panel']:
    p = os.path.join(out, n + '.png'); im = Image.open(p)
    # Content = pixels that are neither transparent nor pure white (Edge leaves white below short pages).
    rgba = im.convert('RGBA'); px = rgba.load(); w, h = rgba.size
    mask = Image.new('L', (w, h), 0); mp = mask.load()
    for y in range(0, h):
        for x in range(0, w, 2):
            r, g, b, a = px[x, y]
            if a > 8 and (r, g, b) != (255, 255, 255): mp[x, y] = 255
    box = mask.getbbox(); x0, y0, x1, y1 = box
    rgba = rgba.crop((max(0, x0 - 1), y0, min(w, x1 + 1), y1))
    # Pure white left inside the crop (outside rounded corners) becomes transparent.
    rgba.putdata([(r, g, b, 0) if (r, g, b) == (255, 255, 255) else (r, g, b, a) for r, g, b, a in rgba.getdata()])
    rgba.save(p)
    im = rgba
    print(n, im.size, round(im.width / im.height, 3))
PY
