"""Bind the existing brand fonts and source library to the ten poster compositions."""
import base64
import json
import re
import shutil
from pathlib import Path

HERE = Path(__file__).resolve().parent
WEB = HERE.parents[1]
SOURCE = WEB / 'design' / 'source-images'
PREFIXES = {'d': 'doodles', 'i': 'illustration', 'v': 'visual', 'info': 'info', 'm': 'mcp-claude'}
template = (HERE / 'poster-source.template.html').read_text(encoding='utf-8')
keys = sorted(set(re.findall(r'data-art="([a-z]+\d*|brand)"', template)))
paths = {}
manifest = []
for key in keys:
    if key == 'brand':
        source = WEB / 'src' / 'assets' / 'brand' / 'walkthru-mark.png'
        destination = HERE / 'assets' / 'walkthru-mark.png'
        shutil.copyfile(source, destination)
        paths[key] = 'assets/walkthru-mark.png'
    else:
        prefix, index = re.fullmatch(r'([a-z]+)(\d+)', key).groups()
        source = sorted((SOURCE / PREFIXES[prefix]).glob('*.jpg'))[int(index)]
        paths[key] = '../source-images/' + source.relative_to(SOURCE).as_posix()
    manifest.append({'key': key, 'source': source.relative_to(WEB).as_posix()})

font_faces = []
for package, family, filename in [
    ('geist', 'Geist Variable', 'geist-latin-wght-normal.woff2'),
    ('geist-mono', 'Geist Mono Variable', 'geist-mono-latin-wght-normal.woff2'),
]:
    package_dir = WEB / 'node_modules' / '@fontsource-variable' / package
    encoded = base64.b64encode((package_dir / 'files' / filename).read_bytes()).decode('ascii')
    font_faces.append(f"@font-face{{font-family:'{family}';font-style:normal;font-weight:100 900;font-display:swap;src:url(data:font/woff2;base64,{encoded}) format('woff2');}}")
    shutil.copyfile(package_dir / 'LICENSE', HERE / 'assets' / f'{package}-FONT-LICENSE.txt')
font_css = '\n'.join(font_faces)
html = template.replace('__FONT_FACES__', font_css).replace('__ASSET_PATHS__', json.dumps(paths, separators=(',', ':')))
assert '__FONT_FACES__' not in html and '__ASSET_PATHS__' not in html
assert '\u2014' not in html and '\u2013' not in html
(HERE / 'poster-source.html').write_text(html, encoding='utf-8', newline='\n')
(HERE / 'font-faces.css').write_text(font_css, encoding='utf-8', newline='\n')
(HERE / 'asset-manifest.json').write_text(json.dumps(manifest, indent=2), encoding='utf-8')
print(json.dumps({'posters': html.count('data-poster='), 'original_images': len(keys) - 1, 'font_families': ['Geist Variable', 'Geist Mono Variable']}))
