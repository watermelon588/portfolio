# SkyGuide AI — gallery mockups

Drop the SkyGuide AI mockup images here and they are picked up **automatically**
by the gallery (`src/data/gallery.ts` globs this folder).

- Formats: `.png`, `.jpg`, `.jpeg`, `.webp`, `.avif`
- Order: files are shown sorted by filename — prefix with `01-`, `02-`, … to control order.
- Until at least one image is present, the gallery shows labeled placeholders.
- Later, to use "moving images" (video loops), swap the resolver to also glob
  `*.mp4`/`*.webm` and render `<video autoplay muted loop>` in `Gallery.tsx`.
