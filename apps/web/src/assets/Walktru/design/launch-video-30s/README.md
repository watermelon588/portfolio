# Walkthru: Fresh eyes. Before you launch.

The finished launch film is `walkthru-launch-30s.mp4`. Open `player.html` for a local player and download link. The file is H.264, 1920×1080, 30fps, exactly 30 seconds, with an original stereo soundtrack and transition cues. It is prepared for digital sharing in 16:9.

## Direction

A doodle-led film about taking an AI-built app into the real world. Curious faces arrive in a depth cloud, Scout takes a browser journey, the report brings evidence into view, and findings become the next move. Original logo artwork and the website's real Geist and Geist Mono fonts anchor the colorful paper, cobalt, coral and yellow scenes.

| Time | Scene | Motion |
| --- | --- | --- |
| 00–03 | You built it. Now test it. | Offset paper collage, layered card arrivals, kinetic headline |
| 03–06 | Meet your fresh eyes. | Perspective card assembly, portrait cloud and floating bird |
| 06–11 | They try your flows. | Actual browser recording, drawn journey route, walking Scout |
| 11–15 | Every step. Saved. | Recorded report, evidence framing, illustration and close-up camera |
| 15–19 | Check the launch basics. | Staggered search, accessibility and passive hygiene chapters |
| 19–23 | Evidence in. Fixes out. | Actual prioritized fixes, AI illustration, drawn handoff path |
| 23–26 | Build. Test. Launch. | Rhythmic words, Scout focus, surrounding artwork |
| 26–30 | Walkthru | Walking identity reveal, original logo lockup, tagline and final hold |

## Artwork and sound

- All imagery comes from the supplied Walkthru `apps/web/design` library. The later corrected path takes precedence over the earlier TripVerse media path. The test-site TripVerse interface visible in the real recording is an example of Walkthru testing another app.
- `asset-provenance.json` records copied source artwork, existing alpha cutouts, brand walk strip, screenshots and video ranges. Fourteen unique source illustrations/doodles are placed in the film, alongside three cutout subjects, the Scout identity, real demo recordings and the fixes screenshot. A larger library of 33 source images is copied for future edits.
- The account-detail area of the real browser recording is masked in the derived frames. Original video and source images are preserved.
- `original-score.wav` is synthesized locally for this film: 120 BPM, a bass pulse, bell arpeggio, percussion, transitions and a closing chord. It uses no downloaded music, samples, voices or paid services. Final audio is normalized to -16 LUFS with a -1.5 dB true-peak target and encoded as stereo AAC at 48kHz.
- Font license files are included. Supplied artworks keep their existing provenance; no image asset was newly generated for this film.

## Editable production

`index.html` contains eight timed scenes and one deterministic paused GSAP timeline. `prepare.py` copies the original assets, extracts precise video frames with FFmpeg and synthesizes the score. `render.cjs` seeks the composition frame by frame in local Edge using the existing bundled Playwright, streams three parallel sections into FFmpeg, and assembles the final film. No project dependency was added. Rendering does not rely on a network connection.

Motion direction follows the HyperFrames composition, animation, creative and keyframe skills. The HyperFrames CLI was not available in the accessible npm cache, so the film uses a standalone GSAP/Playwright/FFmpeg export with direct validation rather than claiming a HyperFrames check. The composition remains editable in HTML and uses compatible scene timing attributes.

Rebuild:

1. Run `prepare.py` with the existing bundled Python runtime (NumPy is already included).
2. Run `node render.cjs --review-only` to export review frames and run layout, assets and font checks.
3. Run `node render.cjs` to render the final 900 frames, mix audio and validate export specifications.

The scripts contain the local bundled runtime paths. Preserve `assets/` beside the composition. `frames/` holds reproducible intermediate ten-second video sections; `review/` contains key-frame images. Neither is needed to play the finished MP4.

## Verification

Sixteen key frames checked for one active scene, real fonts, loaded images and headline bounds. Eight scene compositions were visually reviewed, and Scout's sprite units were corrected before encoding. `qa.json` records those checks; `video-metadata.json` records the encoded format, duration and streams. `final-qa.json` verifies motion in all eight scenes, player metadata and responsive widths, audio loudness and full decode. Out-of-order seeks preserve identical DOM poses; browser rasterization differed in 32 pixels out of 2,073,600, within the documented visual tolerance. `filmstrip.jpg` shows eight frames from the actual encoded MP4. Web build and zero-warning lint pass with the existing build warnings. The production app is unchanged.
