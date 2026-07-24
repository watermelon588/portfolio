# Changelog

All notable changes to this project are documented here.
Format loosely follows [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]

### Changed
- **Hero → two-column composition.** Left column stacks poster → "Get in touch" → contact cards; right column holds the portrait, stretched (via grid `align-items: stretch`) to the full height of the left column so it aligns exactly with the poster/contact stack. No spacer elements. Prepared with `data-hero` hooks for future GSAP entrance animations. (`apps/web/src/sections/Hero/`)
- **Page gutters.** Added `padding-inline: var(--page-padding)` to the shared `.container` so Hero and About align to the fixed navbar's inline padding. (`apps/web/src/styles/layout.css`)
- **About spacing.** Added top padding so the hero → about transition reads as intentional; content, typography, and layout unchanged. (`apps/web/src/sections/About/About.css`)

### Added
- **`useMagnetic` hook** — reusable magnetic-pull interaction extracted from the Navbar's pattern (identical easing/durations, `data-strength` convention; desktop + non-reduced-motion only). Wired to the Hero's contact cards. Navbar left untouched. (`apps/web/src/components/motion/useMagnetic.ts`)
- **Optimized hero image derivatives** — `poster.web.png` (~976 KB) and `portrait.web.png` (~603 KB), generated from the source `poster.png` (18 MB) / `portrait.png` (156 MB) which are far too large to ship. Portrait re-cropped to drop the source's letterbox/wall so the profile fills the frame. Originals kept in place. (`apps/web/src/assets/images/`)
