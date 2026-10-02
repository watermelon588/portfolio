from pathlib import Path
from PIL import Image, ImageOps, ImageDraw
ROOT = Path(__file__).resolve().parents[2]
OUT = Path(__file__).resolve().parent
for folder in ['creative', 'photography']:
    paths = sorted((ROOT / 'frontend/media/mmm' / folder).glob('*.jpg'))
    sheet = Image.new('RGB', (1500, ((len(paths)+4)//5)*330), '#F7F6F3')
    draw = ImageDraw.Draw(sheet)
    for i,p in enumerate(paths):
        im = Image.open(p)
        thumb = ImageOps.contain(im, (284,280))
        x,y=(i%5)*300,(i//5)*330
        sheet.paste(thumb,(x+(300-thumb.width)//2,y))
        draw.text((x+8,y+284),f'{folder[0].upper()}{i+1:02}  {p.stem[:10]}',fill='#111111')
        draw.text((x+8,y+303),f'{im.width} x {im.height}',fill='#666562')
    sheet.save(OUT/f'contacts-{folder}.jpg')
    (OUT/f'assets-{folder}.txt').write_text('\n'.join(f'{folder[0].upper()}{i+1:02}: {p}' for i,p in enumerate(paths)))
