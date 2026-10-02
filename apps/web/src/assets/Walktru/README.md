# Landing page assets

Photos (persona-*.jpg, workspace.jpg, reading.jpg, trackpad.jpg) were picked from the images you provided.
Originals are kept outside the site in apps/web/design/source-images/.

Screenshots (*.png) are PLACEHOLDERS rendered from apps/web/design/mocks/*.html.
Re-render after editing a mock:  bash apps/web/design/mocks/render.sh
Replace them with real screenshots (same filenames) once the extension and report exist.

Real captures (2026-09-27): report.png, stuck-closeup.png, seo.png and security.png are crops of real public
reports rendered by headless Edge at 1.5x (report: run 8152119f, the showcase contact-form journey; the others:
run c61d6cfd, the hard-fixture signup journey). render.sh no longer overwrites them. hero-product.png and
extension-panel.png are still placeholders and are not used anywhere. The hero uses hero-dashboard.webp, a real
capture of the signed-in dashboard (local test account, headless Edge at 2x, WebP q88).
