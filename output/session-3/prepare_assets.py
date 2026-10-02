"""Prepare local TripVerse media; preserve source journals and record provenance."""
from pathlib import Path
from shutil import copy2
import hashlib
import json
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT.parent / "TripVerse" / "frontend"
DEST = ROOT / "apps/web/src/components/tripverse"
ASSETS = ROOT / "apps/web/src/assets/Tripverse"
OUT = ASSETS / "portfolio"
records = []

def copy(source, target):
    target.parent.mkdir(parents=True, exist_ok=True)
    copy2(source, target)
    records.append({"source": str(source), "output": str(target.relative_to(ROOT)),
                    "sha256": hashlib.sha256(target.read_bytes()).hexdigest(), "transfer": "unchanged"})

original = SOURCE / "src/components/home/v2/journal"
for name in ["TravelJournals.tsx", "journalContent.ts", "travel-journals.css", "README.md"]:
    copy(original / name, DEST / "journal" / name)
component = DEST / "journal/TravelJournals.tsx"
text = component.read_text(encoding="utf-8")
text = text.replace("from 'lucide-react'", "from '../vendor/lucide/index.js'")
text = text.replace("from '../../../../hooks/useReducedMotion'", "from '../useReducedMotion'")
text = text.replace("import '@fontsource/caveat/400.css';\nimport '@fontsource/caveat/600.css';", "import '../source-environment.css';")
# The portfolio's stricter noUncheckedIndexedAccess requires these bounded
# index assertions. All journal content, handlers, markup and timings stay intact.
text = text.replace("entry.subtitle.split(' / ')[1].", "entry.subtitle.split(' / ')[1]!.")
text = text.replace("const entry = JOURNAL_ENTRIES[index];", "const entry = JOURNAL_ENTRIES[index]!;")
text = text.replace("const destination = JOURNAL_ENTRIES[turn?.to ?? index];", "const destination = JOURNAL_ENTRIES[turn?.to ?? index]!;")
text = text.replace("JOURNAL_ENTRIES[position].photo", "JOURNAL_ENTRIES[position]!.photo")
component.write_text(text, encoding="utf-8")
copy(SOURCE / "src/hooks/useReducedMotion.ts", DEST / "useReducedMotion.ts")

for image in sorted((SOURCE / "public/images/journal").glob("*.webp")):
    copy(image, ROOT / "apps/web/public/images/journal" / image.name)

# Copy the exact six Lucide controls and their original runtime, without
# adding a duplicate React or changing the shared package/lockfiles.
lucide = SOURCE / "node_modules/lucide-react"
for name in ["createLucideIcon.js", "defaultAttributes.js", "shared/src/utils.js"]:
    copy(lucide / "dist/esm" / name, DEST / "vendor/lucide" / name)
for name in ["chevron-left", "chevron-right", "grid-2x2", "rotate-ccw", "arrow-up-right", "move-horizontal"]:
    copy(lucide / "dist/esm/icons" / (name + ".js"), DEST / "vendor/lucide/icons" / (name + ".js"))
copy(lucide / "LICENSE", DEST / "vendor/lucide/LICENSE")

fontbase = ASSETS / "media/mmm/tripverse-design-pack/mockups/fonts"
for name in ["InstrumentSerif-Regular.ttf", "InstrumentSerif-Italic.ttf", "Geist-Regular.ttf", "Geist-Medium.ttf", "GeistMono-Regular.ttf", "InstrumentSerif-OFL.txt", "Geist-OFL.txt", "GeistMono-OFL.txt"]:
    copy(fontbase / name, DEST / "fonts" / name)
caveat = SOURCE / "node_modules/@fontsource/caveat"
for weight in [400, 600]:
    copy(caveat / f"files/caveat-latin-{weight}-normal.woff2", DEST / "fonts" / f"caveat-latin-{weight}-normal.woff2")
copy(caveat / "LICENSE", DEST / "fonts/Caveat-OFL.txt")

# Preserve the source environment tokens/resets, only scoping selectors.
env = (SOURCE / "src/styles/tripverse-v2.css").read_text(encoding="utf-8").split(".tv-container--wide")[0]
env = env.replace(".tv2", ".tripverse-original").replace(".tv-container {", ".tripverse-original .tv-container {")
(DEST / "original-environment.css").write_text(env, encoding="utf-8")

def webp(source, target, lossless=False):
    target.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as image:
        size = image.size
        if not lossless:
            image.thumbnail((1920, 1920), Image.Resampling.LANCZOS)
        image.save(target, "WEBP", quality=92, lossless=lossless, method=6)
        records.append({"source": str(source), "output": str(target.relative_to(ROOT)),
                        "original_size": size, "render_size": image.size,
                        "bytes": target.stat().st_size, "transfer": "lossless WebP" if lossless else "responsive WebP"})

screens = ASSETS / "media/mmm/tripverse-design-pack/mockups/screens"
for source in sorted(screens.glob("*.png")):
    webp(source, OUT / "screens" / (source.stem + ".webp"), lossless=True)
for name in ["02-brief-step-1", "02d-guide-picker", "03-planning-choice", "04-one-shot-itinerary", "12-budget-suggestions", "21-build-live-sketch-done"]:
    webp(SOURCE / "public/guide" / (name + ".png"), OUT / "screens" / (name + ".webp"), lossless=True)
for source in sorted((ASSETS / "media/mmm/tripverse-mockups").glob("*.png")):
    if source.name == "01-planning-desk.png":
        continue  # Laptop composition is reserved for Footer previews.
    webp(source, OUT / "compositions" / (source.stem + ".webp"))

for record in records:
    record["source_sha256"] = hashlib.sha256(Path(record["source"]).read_bytes()).hexdigest()
    record["output_sha256"] = hashlib.sha256((ROOT / record["output"]).read_bytes()).hexdigest()
    if record["output"].endswith("TravelJournals.tsx"):
        record["transfer"] = "import bridges + four bounded index assertions; original DOM/content/handlers/timings"
(OUT / "manifest.json").write_text(json.dumps(records, indent=2, ensure_ascii=False), encoding="utf-8")
print(f"Prepared {len(records)} source transfers/derivatives; 24 journal WebPs copied unchanged.")
