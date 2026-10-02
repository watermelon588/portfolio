"""Embed preview-sized copies of original artwork without changing the sources."""
import base64
import io
import json
from pathlib import Path

from PIL import Image

HERE = Path(__file__).resolve().parent
WEB = HERE.parents[1]
VISUAL = Path('C:/Users/Rohit Maity/.codex/visualizations/2026/10/01/01a0f6cf-04d3-7b02-86d3-a9d2109de0d0')
SELECTIONS = {
    'doodles': [6, 7, 9, 10, 13, 14, 16, 21, 22, 23, 24],
    'illustration': [1, 6, 7],
    'mcp-claude': [0, 2, 3],
    'visual': [1],
}
PREFIXES = {'doodles': 'd', 'illustration': 'i', 'mcp-claude': 'm', 'visual': 'v'}
assets = {}
manifest = []
for folder, indices in SELECTIONS.items():
    files = sorted((WEB / 'design' / 'source-images' / folder).glob('*.jpg'))
    for index in indices:
        source = files[index]
        key = PREFIXES[folder] + str(index)
        image = Image.open(source).convert('RGB')
        image.thumbnail((680, 680), Image.Resampling.LANCZOS)
        buffer = io.BytesIO()
        image.save(buffer, format='WEBP', quality=82, method=6)
        assets[key] = 'data:image/webp;base64,' + base64.b64encode(buffer.getvalue()).decode('ascii')
        manifest.append({'key': key, 'source': str(source.relative_to(WEB)).replace('\\', '/'), 'original_dimensions': list(Image.open(source).size), 'preview_dimensions': list(image.size)})

brand = WEB / 'src' / 'assets' / 'brand' / 'walkthru-mark.png'
image = Image.open(brand).convert('RGBA')
image.thumbnail((160, 160), Image.Resampling.LANCZOS)
buffer = io.BytesIO()
image.save(buffer, format='PNG', optimize=True)
assets['brand'] = 'data:image/png;base64,' + base64.b64encode(buffer.getvalue()).decode('ascii')
manifest.append({'key': 'brand', 'source': str(brand.relative_to(WEB)).replace('\\', '/')})

font_faces = []
for package, family, filename in [
    ('geist', 'Geist Variable', 'geist-latin-wght-normal.woff2'),
    ('geist-mono', 'Geist Mono Variable', 'geist-mono-latin-wght-normal.woff2'),
]:
    package_path = WEB / 'node_modules' / '@fontsource-variable' / package
    encoded = base64.b64encode((package_path / 'files' / filename).read_bytes()).decode('ascii')
    font_faces.append(f"@font-face{{font-family:'{family}';font-style:normal;font-weight:100 900;font-display:swap;src:url(data:font/woff2;base64,{encoded}) format('woff2');}}")
    license_path = package_path / 'LICENSE'
    if license_path.exists():
        (HERE / f'{package}-FONT-LICENSE.txt').write_text(license_path.read_text(encoding='utf-8'), encoding='utf-8')

fragment = (HERE / 'walkthru-doodle-worlds.template.html').read_text(encoding='utf-8').replace('__ASSET_DATA__', json.dumps(assets, separators=(',', ':'))).replace('__FONT_FACES__', '\n'.join(font_faces))
assert '__ASSET_DATA__' not in fragment
assert '__FONT_FACES__' not in fragment
assert '\u2014' not in fragment and '\u2013' not in fragment
assert len(fragment.encode('utf-8')) < 1_000_000
VISUAL.mkdir(parents=True, exist_ok=True)
output = VISUAL / 'walkthru-doodle-worlds.html'
output.write_text(fragment, encoding='utf-8', newline='\n')
(HERE / 'asset-manifest.json').write_text(json.dumps(manifest, indent=2), encoding='utf-8')
print(json.dumps({'path': str(output), 'bytes': output.stat().st_size, 'variants': fragment.count('data-variant='), 'original_artworks': len(assets) - 1}))
