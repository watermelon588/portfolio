# apps/ai — FastAPI AI sidecar

Voice assistant (ElevenLabs, Rohit's cloned voice) + project RAG (Claude + Voyage + Atlas Vector Search). Design: [../../docs/AI_PIPELINE.md](../../docs/AI_PIPELINE.md).

> **Status:** Phase 1 skeleton — only `/ai/health` + config + kill switch. AI vendors wired in Phase 6.

## Run (Windows)

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements-dev.txt
uvicorn app.main:app --reload --port 8000   # → http://localhost:8000/ai/health
```

macOS/Linux: `source .venv/bin/activate` instead of the Activate.ps1 line.

Copy `.env.example` → `.env` and fill (see [../../docs/CONFIGURATION.md](../../docs/CONFIGURATION.md)).
