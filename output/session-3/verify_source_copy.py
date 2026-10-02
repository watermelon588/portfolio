"""Verify original source fidelity and all 24 journal image transfers."""
from pathlib import Path
import hashlib
import json

root = Path(__file__).resolve().parents[2]
source = root.parent / "TripVerse/frontend"
dest = root / "apps/web/src/components/tripverse"
original = source / "src/components/home/v2/journal"
text = (dest / "journal/TravelJournals.tsx").read_text(encoding="utf-8")
text = text.replace("from '../vendor/lucide/index.js'", "from 'lucide-react'")
text = text.replace("from '../useReducedMotion'", "from '../../../../hooks/useReducedMotion'")
text = text.replace("import '../source-environment.css';", "import '@fontsource/caveat/400.css';\nimport '@fontsource/caveat/600.css';")
for token in ["entry.subtitle.split(' / ')[1]", "JOURNAL_ENTRIES[index]", "JOURNAL_ENTRIES[turn?.to ?? index]", "JOURNAL_ENTRIES[position]"]:
    text = text.replace(token + "!", token)
assert text == (original / "TravelJournals.tsx").read_text(encoding="utf-8"), "Journal behavior/DOM/content drift"
for name in ["journalContent.ts", "travel-journals.css", "README.md"]:
    assert (dest / "journal" / name).read_bytes() == (original / name).read_bytes(), name
assert (dest / "useReducedMotion.ts").read_bytes() == (source / "src/hooks/useReducedMotion.ts").read_bytes()
images = list((source / "public/images/journal").glob("*.webp"))
assert len(images) == 24
for image in images:
    assert image.read_bytes() == (root / "apps/web/public/images/journal" / image.name).read_bytes(), image.name
# Refresh manifest metadata without re-encoding any prepared images.
manifest = root / "apps/web/src/assets/Tripverse/portfolio/manifest.json"
records = json.loads(manifest.read_text(encoding="utf-8"))
for record in records:
    record["source_sha256"] = hashlib.sha256(Path(record["source"]).read_bytes()).hexdigest()
    record["output_sha256"] = hashlib.sha256((root / record["output"]).read_bytes()).hexdigest()
    if record["output"].endswith("TravelJournals.tsx"):
        record["transfer"] = "import bridges + four bounded index assertions; original DOM/content/handlers/timings"
manifest.write_text(json.dumps(records, indent=2, ensure_ascii=False), encoding="utf-8")
print("PASS: original journal DOM, content, event handlers and animation code; CSS/content/hook byte-identical; 24 image files byte-identical.")
