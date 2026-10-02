# TripVerse — ten application mockups

Created 1 October 2026. Final requested files are saved in frontend/media/mmm/tripverse-mockups/, exactly ten PNGs. The previous ten posters are now also saved in frontend/media/mmm/tripverse-posters/.

Open gallery.html to inspect or download each mockup. png/ holds the same exports in this portable working pack. jpg/ has quality-94 JPEG versions. source/ contains ten self-contained editable HTML compositions with embedded screen pixels, art, logo and exact font files.

## Collection

- The planning desk: 16:9, 3840 × 2160; Laptop + phone.
- Pocket sketchbook: 9:16, 2160 × 3840; Mobile story.
- The whole route: 3:2, 3072 × 2048; Architectural tablet.
- Build a day together: 4:5, 2400 × 3000; Layered browser + day dock.
- Sketch meets studio: 2:1, 3840 × 1920; Panoramic floating tablet.
- A budget with context: 1:1, 2880 × 2880; Portrait tablet + paper ledger.
- Ask. Change. Keep going.: 3:4, 2400 × 3200; App window + receipt detail.
- Take your trip with you: 4:3, 2880 × 2160; Travel flatlay tablet.
- One trip, four views: 16:10, 3200 × 2000; Four-view product constellation.
- Inspiration into a plan: 1:1, 2880 × 2880; Desktop display + planning window.

## Brand and product fidelity

- Original arc mark from frontend/media/icons/Vector.svg. No replacement logo.
- Instrument Serif regular/italic headlines, Geist body text, Geist Mono metadata. Typeface files and OFL licenses are included in fonts/.
- Bone #F7F6F3, ink #111111, muted #787774, hairline #EAEAEA. Experimental colors remain in the surrounding artwork; the real app pixels retain their original styling.
- 13 distinct actual screenshots from frontend/public/guide/. Screens remain original images inside code-rendered device/browser frames. Detail crops magnify existing budget, day dock and receipt pixels. Crop coordinates are recorded in manifest.json; screen-provenance.json includes original SHA-256 hashes. No AI-generated application interface.
- 21 supplied image references: 15 creative and 6 photographic. No reference repeats within the ten new mockup concepts.
- The narrative is AI travel planning: chat, day building, TripStudio Plan/Sketch/Map/3D, budget editing and exports. Product copy makes no booking, real-time pricing, subscription or payment promises.

## Creation and inspection

The built-in image_gen tool created ten background plates, followed by two targeted cleanup edits. Exact UI, hardware frames, text and logo were composited in Chrome with Playwright. Sharp handled export sizing and exact screen crops. prompts.json and revision-prompts.json record all generation instructions. PLAN.md records the ten concepts.

Every output was visually inspected. verification.json records final dimensions, loaded fonts/images, canvas bounds and browser errors. gallery-verification.json covers 320, 736 and 1440 px widths.

## Editing

Open a file in source/ to view the standalone composition; edit that file to change typography or layout. For complete regeneration, run node output/tripverse-mockups/compose_mockups.cjs from the original repository, then node output/tripverse-mockups/package_mockups.cjs. These scripts refer to the supplied repository screenshots and generated image source paths; the self-contained HTML files work independently of them.
