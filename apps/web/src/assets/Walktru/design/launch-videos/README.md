# Walkthru launch films (2026-10-01)

Three 60-second launch films, 1920x1080, 30 fps, H.264 with music and sound effects. Each follows the rhythm and visual language of one reference in `../video/references/`, rebuilt around Walkthru's real product, artwork and identity. Scout, the walking bird, appears in all three as the AI test user.

| File | After | Idea | Music |
|---|---|---|---|
| `walkthru-launch-A-ship-friday.mp4` | reference1 (Base44) | Product-led. Warm paper, tiny centred type, real captures floating in browser frames, iridescent "scan light", the agent loop on real footage, Claude Code connecting over MCP, the report, the security check, a fix pull request, Launch Ready 62 to 91. | vol-12, 110 BPM |
| `walkthru-launch-B-every-stranger.mp4` | reference2 (Shapes) | Bold shape language: rotated rounded squares, nested octagon portals, a 3D word wheel of every feature, five coloured Scouts, Scout answering inside the product, the findings table, a metric carousel, "Done!", the three audiences. | vol-1, 120 BPM |
| `walkthru-launch-C-not-a-scanner.mp4` | reference3 (Edge) | Editorial manifesto, one phrase per beat: "We are not a scanner", STRANGERS behind the illustrated crowd, "Launch checked. That's right.", "0 passwords shared", "Not after launch. But now." | vol-11, 115 BPM |

Every claim on screen is something the product does today (README of the app, SPEC.md). Type is Geist and Geist Mono only (DESIGN.md, doodle-exploration/DIRECTION.md); the hand-drawn marks in C are animated SVG strokes, not fonts.

## What is inside

- `a-ship-friday/`, `b-every-stranger/`, `c-not-a-scanner/`: one Hyperframes project each (`index.html` is the whole film; `assets/` is self-contained).
- `shared/`: the prepared assets every project copies: Scout walk strips in six colours, cropped clips from `../video/*.mp4`, resized artwork, stills from the demo recordings, Geist fonts, GSAP, and `kit/` (base.css tokens and frames, kit.js helpers).
- `tools/`: `build_scout.py` (Scout sprites from `brand.mp4`: one seamless 24-drawing stride, background removed, white eye kept), `prep_assets.py` (clips, stills, artwork), `setup_project.py` (copies shared assets, music and SFX into a project).

## Re-render

```
cd a-ship-friday
npx hyperframes check                     # lint, runtime, layout, contrast: must pass
npx hyperframes render --quality looks --output ../walkthru-launch-A-ship-friday.mp4
```

Use `--quality delivery` for a higher-bitrate master. A render takes 3 to 12 minutes on this machine.

## Before posting publicly

- **Music:** the beds are ende.app "Happy Beats / Business Moves" tracks bundled with the brag skill. Their licence is not documented there; confirm commercial use with ende.app or swap in a licensed track (any MP3 works: replace the file in `assets/music/` and the `src` of `#bgm`).
- **Sound effects:** Kenney.nl, CC0.
- **Photography and illustration:** from `../source-images/`. Confirm you have the rights to use each in an ad before publishing.
- The demo footage shows `localhost` addresses and the TripVerse test app; that is honest for a launch film, but re-record on the production domain if you prefer.
