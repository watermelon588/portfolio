from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import json

root = Path(__file__).resolve().parent
dest = root / 'tripverse-ten-mockups.zip'
folders = ('png', 'jpg', 'source', 'art', 'screens', 'fonts', 'previews')
files = ('gallery.html', 'README.md', 'PLAN.md', 'manifest.json', 'prompts.json', 'revision-prompts.json', 'screen-provenance.json', 'verification.json', 'gallery-verification.json', 'brand-mark.svg', 'contact-sheet.jpg')
with ZipFile(dest, 'w', compression=ZIP_DEFLATED, compresslevel=6) as archive:
    for folder in folders:
        for item in sorted((root / folder).glob('*')):
            if item.is_file():
                archive.write(item, item.relative_to(root).as_posix())
    for name in files:
        archive.write(root / name, name)
with ZipFile(dest) as archive:
    png_count = sum(n.startswith('png/') and n.endswith('.png') for n in archive.namelist())
    jpg_count = sum(n.startswith('jpg/') and n.endswith('.jpg') for n in archive.namelist())
    assert png_count == 10 and jpg_count == 10
    assert archive.testzip() is None
print(json.dumps({'zip': str(dest), 'bytes': dest.stat().st_size, 'pngCount': png_count, 'jpegCount': jpg_count}))
