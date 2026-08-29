# Neuron Project Page --- Build Instructions

## 0. Objective

Create a **separate project page for Neuron** using the existing
**SkyGuide AI project page as the structural and visual reference**.

The SkyGuide page already establishes the case-study language, spacing,
typography, reveal animations, media parallax, metadata treatment,
feature showcase, project transition, and footer behavior. **Reuse that
system instead of inventing a new visual language.**

Neuron should feel like the same portfolio, but the case study must be
**much shorter, faster to read, and more visual**.

### Core direction

> **Search beyond words.**

Neuron is a multimodal search and document-chat platform: one interface
for text, images, audio and video, plus grounded conversations over
uploaded documents.

The page should communicate:

1.  What Neuron is.
2.  Why it exists.
3.  What makes the search experience different.
4.  How document chat works.
5.  What the engineering looks like.
6.  Why the architecture/security decisions matter.
7.  A concise closing statement.

Do **not** turn this into a long technical dissertation like SkyGuide.
SkyGuide is the reference implementation; Neuron is the shorter case
study.

------------------------------------------------------------------------

# 1. Important implementation rules

## Preserve the existing SkyGuide page

Do **not** rewrite, break, or redesign the existing SkyGuide project
page.

Create a separate Neuron-specific project page/component by copying the
relevant SkyGuide structure and adapting it.

The existing SkyGuide implementation should remain visually and
functionally unchanged.

## Shared styling

Reuse the existing SkyGuide classes and styling wherever possible:

-   `.dw-case-study`
-   `.dw-section`
-   `.dw-kicker`
-   `.dw-heading-lg`
-   `.dw-heading-md`
-   `.dw-body-lg`
-   `.dw-meta-section`
-   `.dw-meta-grid-3col`
-   `.dw-meta-col`
-   `.dw-meta-label`
-   `.dw-meta-stripe`
-   `.dw-meta-val`
-   `.dw-media-container`
-   `.media-landscape`
-   `.media-portrait`
-   `.media-square`
-   `.media-natural`
-   `.dw-showcase-grid`
-   `.dw-showcase-card`
-   `.dw-showcase-img-wrap`
-   `.dw-showcase-caption`
-   `.dw-arch-grid`
-   `.dw-arch-card`
-   `.dw-decisions-list`
-   `.dw-decision-item`
-   `.dw-conclusion-lead`
-   `.dw-conclusion-accent`

Reuse the existing project-page animations and parallax behavior.

**Do not change global CSS to make Neuron work.**

If Neuron requires a genuinely new layout, add a narrowly scoped Neuron
class or a small project-specific CSS block. Prefix any new classes with
`neuron-`.

Do not alter global footer styling, navbar styling, button styling, or
other project pages.

------------------------------------------------------------------------

# 2. Routing / registration

The portfolio should support individual project pages.

For now there is only one Neuron project page to add.

Create/register:

-   Project slug: `neuron`
-   Project title: `Neuron`
-   Category: use the existing development/project category expected by
    the project-page routing
-   Dedicated Neuron page/component
-   Neuron case-study data
-   Neuron assets

The existing SkyGuide project must continue to resolve through its own
slug.

Do not hard-code Neuron content into the SkyGuide case-study data.

Use the existing `projects` and `caseStudies` registration pattern.

The project page should resolve from the route parameter and render the
correct project.

If the existing application already has a generic `ProjectPage`, it is
acceptable to extract shared structure into reusable data-driven
sections, but **do not perform a large refactor just for Neuron**. The
safest implementation is to copy the SkyGuide page structure and create
a dedicated Neuron variant.

------------------------------------------------------------------------

# 3. Source of truth for Neuron content

Use the Neuron project README/repository information as the technical
source.

Confirmed project positioning:

> One interface for text, images, audio and video --- fused into a
> single query, ranked by what things mean and what they look like, with
> every result explaining why it ranked where it did.

Confirmed stack:

> FastAPI · React 19 · CLIP · Whisper · BLIP · FAISS · MongoDB

Confirmed core capabilities:

-   Multimodal web search.
-   Text and multiple-file search.
-   Image + query search.
-   Audio + image + query search.
-   CLIP-based visual query representation.
-   Keyword retrieval.
-   Visual re-ranking.
-   Dense embedding signals.
-   BM25.
-   Provider-position signals.
-   Relevance score/confidence/explanation.
-   Document upload.
-   Document parsing and indexing.
-   Semantic document search.
-   Grounded document chat.
-   Numbered citations that point back to source locations.

Do not claim features that are not supported by the project source.

------------------------------------------------------------------------

# 4. Neuron page structure

The page should contain approximately **8 sections**, not the 15-section
depth of SkyGuide.

Recommended sequence:

1.  Hero / project identity
2.  Hero visual
3.  The problem
4.  Multimodal search
5.  Document intelligence / chat
6.  Architecture
7.  Engineering decisions / reliability
8.  Closing result

The exact visual arrangement can vary. Do **not** mechanically
alternate:

`text → image → text → image`.

Use the same visual storytelling principle established for the SkyGuide
page:

-   large visual
-   short text
-   two-column image layouts
-   occasional full-width image
-   2--3 image compositions where useful
-   natural image ratios
-   parallax
-   generous whitespace
-   visual rhythm

The Neuron page should feel editorial and portfolio-like, not like a
README pasted into a website.

------------------------------------------------------------------------

# 5. SECTION 01 --- HERO / PROJECT IDENTITY

### Kicker

`01 — MULTIMODAL SEARCH & DOCUMENT INTELLIGENCE`

### Heading

`NEURON`

### Tagline

`Search beyond words.`

### Supporting text

`One interface for text, images, audio and video — with document chat that stays grounded in the source.`

### Metadata

Use a compact metadata grid:

**ROLE**

`Full-stack / ML Systems Engineering`

**ARCHITECTURE**

`FastAPI + React / Retrieval & RAG`

**YEAR**

`2026`

Do not overfill the metadata.

------------------------------------------------------------------------

# 6. SECTION 02 --- HERO VISUAL

Use the strongest Neuron product/brand visual as a large editorial
image.

Preferred asset:

`neuron4.png`

This image is portrait-oriented and should be displayed **without
cropping**.

Important:

-   Do not force it into a landscape box.
-   Do not use `object-fit: cover` if that crops the artwork.
-   Let the natural image ratio determine the height.
-   Use the existing parallax system.
-   The image should feel like a large visual statement rather than a
    framed card.

If the existing media container imposes a fixed ratio, override it only
inside the Neuron page with a scoped class.

Suggested alt:

`Neuron unified multimodal search interface`

------------------------------------------------------------------------

# 7. SECTION 03 --- THE PROBLEM

### Kicker

`02 — THE PROBLEM`

### Heading

`YOUR INFORMATION DOESN'T LIVE IN ONE FORMAT.`

### Body

`A useful answer might be hiding inside a document, an image, a video, an audio recording, or a page on the web. Traditional search makes you decide the format before you search. Neuron removes that boundary: bring the question, the file, or both, and let the system retrieve across modalities.`

### Visual direction

Use a **large visual-first composition**.

Preferred asset:

`neuron1.png`

This visual communicates the transition from scattered information to an
organized/searchable system.

Optional secondary image:

`neuron8 copy.jpg`

Use it as a smaller secondary visual if the composition benefits from
it.

Do not put both images into identical cards. One should dominate.

------------------------------------------------------------------------

# 8. SECTION 04 --- MULTIMODAL SEARCH

### Kicker

`03 — SEARCH BEYOND WORDS`

### Heading

`ONE QUERY. EVERY FORMAT.`

### Body

`Neuron treats text, images, audio and video as parts of the same search problem. A multimodal query becomes a shared representation, then retrieval combines semantic, keyword and visual signals before the results are re-ranked.`

### Short supporting line

`The goal is not just to find something related. It is to explain why it belongs near the top.`

### Visual layout

Use a **full-width or near-full-width visual** rather than a small
image.

Preferred asset:

`neuron8 copy.jpg`

This is the wide search-interface visual.

If a second visual is needed, use:

`neuron6.png`

Create a visual sequence:

-   large search visual
-   smaller secondary visual
-   no heavy borders
-   no unnecessary outer card

### Optional micro-stat row

Use three simple values:

`TEXT + IMAGE + AUDIO + VIDEO`

`VISUAL RE-RANKING`

`EXPLAINABLE RESULTS`

Do not invent numeric performance metrics.

------------------------------------------------------------------------

# 9. SECTION 05 --- DOCUMENT CHAT

### Kicker

`04 — ASK YOUR DOCUMENTS`

### Heading

`SEARCH THE FILE. THEN TALK TO IT.`

### Body

`Neuron turns uploaded files into searchable context. Documents are parsed, chunked and indexed so questions can be answered against the actual source instead of an ungrounded model response. Citations point back to the relevant page, section and line range.`

### Secondary copy

`The useful part is not simply getting an answer. It is being able to trace that answer back to where it came from.`

### Visuals

Use a **2-column layout**.

Primary:

`neuron3.png`

Secondary:

`neuron6.png`

If the second visual becomes redundant, use `neuron9.jpg` as a smaller
editorial image.

Do not crop these images merely to make both columns identical. Their
natural ratios should control the visual height.

------------------------------------------------------------------------

# 10. SECTION 06 --- ARCHITECTURE

### Kicker

`05 — UNDER THE HOOD`

### Heading

`SIMPLE ON THE SURFACE. LAYERED UNDERNEATH.`

### Body

`Neuron uses a layered FastAPI backend with strict boundaries between the API, services, retrieval systems, machine-learning models and database. React handles the experience while the backend coordinates search, ingestion, ranking, retrieval and grounded chat.`

### Architecture cards

Use 3 cards, matching the existing SkyGuide architecture-card visual
language.

### CARD 01

Tag:

`THE EXPERIENCE`

Title:

`React 19`

Text:

`The interface for multimodal search, document browsing, results, citations and chat.`

Footer:

`Vite frontend`

### CARD 02

Tag:

`THE INTELLIGENCE`

Title:

`CLIP · Whisper · BLIP`

Text:

`The ML layer handles visual understanding, speech transcription and image understanding as optional capabilities inside the retrieval pipeline.`

Footer:

`Lazy model loading`

### CARD 03

Tag:

`THE RETRIEVAL CORE`

Title:

`FAISS · BM25 · MongoDB`

Text:

`Vector retrieval, keyword ranking and persistent application data work together without forcing the product into a single retrieval strategy.`

Footer:

`Pluggable interfaces`

Important: keep the cards concise. Do not reproduce the complete
repository architecture diagram.

------------------------------------------------------------------------

# 11. SECTION 07 --- ENGINEERING DECISIONS

### Kicker

`06 — THE DETAILS THAT MATTER`

### Heading

`THE SEARCH IS ONLY AS GOOD AS THE SYSTEM AROUND IT.`

Use the existing SkyGuide decision-list treatment.

Create **4 decisions**.

### 01 --- Make every result explain itself

`Relevance is part of the response contract. Results carry score, confidence, contributing signals and a plain-language explanation instead of returning an unexplained ranked list.`

### 02 --- Fail gracefully

`If an optional embedder or generator is unavailable, Neuron falls back to simpler retrieval or extractive answers instead of taking the entire application down.`

### 03 --- Keep citations attached to the data

`Document parsers preserve page, heading and line-range information so retrieval can expose exactly where an answer came from.`

### 04 --- Treat security as part of search

`Uploads, outbound thumbnail fetching, authentication, rate limits, CSRF protection and per-user ownership are handled as first-class system boundaries.`

### Optional image

Use:

`42142ffcc3d6b3ac4e5f13d1cb249b72.jpg`

or

`f8c8cdba238fbf63ce3678c6ce4d8c51(1).jpg`

as an editorial side image.

Do not force the image into a 9:16 crop.

------------------------------------------------------------------------

# 12. SECTION 08 --- CLOSING RESULT

### Kicker

`07 — THE POINT`

### Main statement

`SEARCH LESS. UNDERSTAND MORE.`

### Accent line

`ONE INTERFACE. MANY WAYS TO ASK.`

### Body

`Neuron started from a simple frustration: information is multimodal, but search usually isn't. The result is a system that lets text, images, audio, video and documents participate in the same retrieval workflow — while keeping the reasoning behind each result visible.`

### Closing image

Preferred:

`neuron5.png`

This is a strong brand-oriented closing visual.

Alternative:

`neuron7.png`

Use the orange laptop visual if a more product-focused ending is
preferred.

The closing image should be large and cinematic, with the same subtle
parallax behavior as the SkyGuide page.

------------------------------------------------------------------------

# 13. Asset mapping

Use the supplied Neuron assets intentionally.

  -------------------------------------------------------------------------------------------
  Asset                                       Recommended use         Natural ratio /
                                                                      behavior
  ------------------------------------------- ----------------------- -----------------------
  `neuron4.png`                               Hero                    Portrait; preserve full
                                                                      image

  `neuron5.png`                               Closing / brand         Landscape; preserve
                                              statement               full image

  `neuron6.png`                               Product / feature       Landscape; preserve
                                              composition             full image

  `neuron7.png`                               Product / closing       Landscape; preserve
                                              alternate               full image

  `neuron8 copy.jpg`                          Multimodal search       Wide landscape; ideal
                                                                      large visual

  `neuron9.jpg`                               Small editorial/detail  Square
                                              visual                  

  `0b416699a0382b1a3fc7be66f8d95f7a(1).jpg`   Editorial supporting    Portrait 4:5
                                              image                   

  `547c613297f266ca47279a062ee97dd6.jpg`      Supporting editorial    Near-square portrait
                                              image                   

  `42142ffcc3d6b3ac4e5f13d1cb249b72.jpg`      Engineering/editorial   Landscape
                                              visual                  

  `neuron1.png`                               Problem → organization  Wide landscape
                                              visual                  

  `neuron2.png`                               Technical/editorial     Tall portrait
                                              poster                  

  `neuron3.png`                               Document intelligence   Landscape

  `42142ffcc3d6b3ac4e5f13d1cb249b72(1).jpg`   Duplicate/alternate of  Use only if actually
                                              engineering visual      different

  `f8c8cdba238fbf63ce3678c6ce4d8c51(1).jpg`   Supporting editorial    Landscape
                                              visual                  

  `neuron8.jpg`                               Alternate search visual Wide landscape

  `547c613297f266ca47279a062ee97dd6(1).jpg`   Duplicate/alternate     Do not display
                                                                      duplicates
                                                                      unnecessarily
  -------------------------------------------------------------------------------------------

### Important image rule

**Never crop an image just because the surrounding layout has a fixed
ratio.**

Use:

-   natural aspect ratio when possible
-   `object-fit: contain` when the entire artwork must remain visible
-   different media classes for portrait / landscape / square assets
-   different viewport heights depending on the source image

The portfolio should feel like the images were deliberately
art-directed, not squeezed into identical boxes.

------------------------------------------------------------------------

# 14. Visual rhythm

The Neuron page must have more visual variety than a basic case-study
template.

Allowed patterns:

### Pattern A

Text → giant image

### Pattern B

Text left → image right

### Pattern C

Image left → text/right-side decision list

### Pattern D

Large image → two smaller images

### Pattern E

Three architecture cards → no image

### Pattern F

Full-width visual with short overlay copy

Do not use the same pattern for every section.

Use 2--3 images in a section only when the images tell different parts
of the story.

Avoid decorative image boxes around every image.

------------------------------------------------------------------------

# 15. Parallax

Reuse the existing GSAP media-parallax system.

The current SkyGuide implementation applies parallax to:

-   `.dw-media-img`
-   `.media-portrait`
-   `.media-portrait-full`
-   `.media-landscape`
-   `.media-square`
-   `.media-natural`
-   `.dw-showcase-img`

Neuron should participate in the same system.

Do not create a second global parallax engine.

If a new Neuron-specific wrapper is necessary, make sure its child image
is still compatible with the existing parallax selector or explicitly
add a scoped Neuron selector.

Parallax should be subtle.

The image should move independently inside its visual area rather than
creating a distracting zoom effect.

Respect:

`prefers-reduced-motion: reduce`

------------------------------------------------------------------------

# 16. Image sizing rules

The biggest visual requirement is:

> **Show the entire supplied artwork whenever possible.**

Do not blindly use:

`object-fit: cover`

because several supplied Neuron visuals are portrait or unusually
composed.

For portrait artwork:

``` css
object-fit: contain;
width: 100%;
height: auto;
```

For a deliberately cropped photographic composition, `cover` is
acceptable only when the crop does not remove meaningful content.

Prefer natural-height media for:

-   `neuron4.png`
-   `neuron2.png`
-   `0b416699a0382b1a3fc7be66f8d95f7a(1).jpg`
-   `547c613297f266ca47279a062ee97dd6.jpg`

Prefer wide media treatment for:

-   `neuron5.png`
-   `neuron6.png`
-   `neuron7.png`
-   `neuron8 copy.jpg`
-   `neuron1.png`
-   `neuron3.png`

------------------------------------------------------------------------

# 17. Footer / next project

Use the **existing global Footer component**.

Do not create a second footer.

Do not change global footer styling.

For Neuron, pass the appropriate `nextProject` data through the same
mechanism already used by SkyGuide.

If Neuron is currently the only development project, the next-project
behavior should gracefully resolve according to the existing project
logic.

Do not introduce a hard-coded fake project just to make the footer
render.

------------------------------------------------------------------------

# 18. What NOT to do

Do not:

-   rewrite SkyGuide's content
-   change the global CSS
-   change the global footer
-   change navbar styling
-   introduce a new font
-   add gradients just for Neuron
-   add unnecessary rounded cards around every image
-   crop all images to 16:9
-   crop portrait images into landscape images
-   invent performance numbers
-   invent users, revenue, scale or adoption
-   claim unsupported AI capabilities
-   copy the entire Neuron README into the portfolio
-   make the page as long as SkyGuide
-   use 15+ sections
-   repeat the same text/image pattern
-   add generic filler paragraphs
-   add fake testimonials
-   add fake metrics
-   add fake deployment claims

------------------------------------------------------------------------

# 19. Tone

The writing should match the existing portfolio voice:

-   confident
-   technical but readable
-   concise
-   slightly conversational
-   first-person where appropriate
-   no corporate marketing fluff

Prefer:

`Search should understand more than a filename.`

over:

`Our revolutionary AI-powered platform leverages cutting-edge technologies to transform the way users interact with information.`

The page is a **builder's case study**, not a product landing page.

------------------------------------------------------------------------

# 20. Final implementation checklist

Before finishing:

-   [ ] `/neuron` route resolves correctly.
-   [ ] Neuron is registered in the existing project registry.
-   [ ] Neuron case-study metadata is registered separately.
-   [ ] SkyGuide still works unchanged.
-   [ ] Neuron assets are imported from the correct asset folder.
-   [ ] Duplicate images are not unnecessarily displayed.
-   [ ] All major supplied visuals are shown without destructive
    cropping.
-   [ ] Natural image ratios are respected.
-   [ ] Existing SkyGuide typography is reused.
-   [ ] Existing parallax/reveal animations are reused.
-   [ ] No global CSS was changed unnecessarily.
-   [ ] Any new CSS is prefixed/scoped to Neuron.
-   [ ] Existing global Footer remains untouched.
-   [ ] Next-project footer data uses the existing mechanism.
-   [ ] Desktop layout has strong visual rhythm.
-   [ ] Tablet layout does not squeeze portrait images.
-   [ ] Mobile layout stacks naturally.
-   [ ] `prefers-reduced-motion` remains respected.
-   [ ] No horizontal overflow is introduced.
-   [ ] No image is unintentionally cropped.
-   [ ] No unnecessary outer image boxes are introduced.
-   [ ] The final page is substantially shorter than SkyGuide.
-   [ ] The final page reads as a polished portfolio case study rather
    than documentation.

------------------------------------------------------------------------

# 21. Definition of done

The finished Neuron page should feel like:

**SkyGuide's sibling, not SkyGuide's clone.**

Same portfolio design system.

Same typography.

Same motion language.

Same footer.

Same media philosophy.

But:

**shorter, sharper, more visual, and centered around multimodal search +
document intelligence.**

The visitor should understand Neuron within roughly 30--60 seconds of
scrolling:

> **Information comes in many formats. Neuron lets you search and reason
> across them from one interface.**
