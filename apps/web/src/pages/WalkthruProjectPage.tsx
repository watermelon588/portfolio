import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "@/components/nav/Navbar";
import { Preloader } from "@/components/motion/Preloader";
import { useMagnetic } from "@/components/motion/useMagnetic";
import { AccordionGallery } from "@/components/motion/AccordionGallery";
import { CaseFlow } from "@/components/CaseFlow/CaseFlow";
import { Footer } from "@/sections/Footer/Footer";
import { projects } from "@/data/projects";
import { nextCase } from "@/data/projectRegistry";
import { caseStudy } from "@/data/projectEntries/walkthru";
import dashboard from "@/assets/Walktru/hero-dashboard.webp";
import report from "@/assets/Walktru/report.png";
import stuck from "@/assets/Walktru/stuck-closeup.png";
import seo from "@/assets/Walktru/seo.png";
import security from "@/assets/Walktru/security.png";
import sidepanel from "@/assets/Walktru/design/launch-videos/shared/img/stills/sidepanel.jpg";
import extensionReport from "@/assets/Walktru/design/launch-videos/shared/img/stills/ext-report.jpg";
import fixes from "@/assets/Walktru/design/launch-videos/shared/img/stills/fixes.jpg";
import mcp from "@/assets/Walktru/design/launch-videos/shared/img/stills/mcp-page.jpg";
import owner from "@/assets/Walktru/persona-owner.jpg";
import phone from "@/assets/Walktru/persona-phone.jpg";
import buyer from "@/assets/Walktru/persona-buyer.jpg";
import signup from "@/assets/Walktru/persona-signup.jpg";
import returning from "@/assets/Walktru/persona-returning.jpg";
import eye from "@/assets/Walktru/agent-eye.jpg";
import reading from "@/assets/Walktru/reading.jpg";
import secondLook from "@/assets/Walktru/portfolio/the-second-look.webp";
import freshEyes from "@/assets/Walktru/portfolio/fresh-eyes-club.webp";
import clearView from "@/assets/Walktru/portfolio/one-clear-view.webp";
import realPeople from "@/assets/Walktru/portfolio/real-people-energy.webp";
import wayThrough from "@/assets/Walktru/portfolio/the-way-through.webp";
import scout from "@/assets/Walktru/portfolio/scouts-second-look.webp";
import film from "@/assets/Walktru/design/launch-video-30s/walkthru-launch-30s.mp4";
import filmPoster from "@/assets/Walktru/design/launch-video-30s/poster.jpg";
import "./ProjectPage.css";
import "./WalkthruProjectPage.css";

gsap.registerPlugin(ScrollTrigger);

const personas = [
  { image: owner, label: "A first impression" },
  { image: phone, label: "A smaller screen" },
  { image: buyer, label: "A buying decision" },
  { image: signup, label: "A first signup" },
  { image: returning, label: "A second visit" },
];
const posters = [
  { image: freshEyes, label: "Fresh eyes club", alt: "Walkthru's cream campaign poster with doodles, cutouts and a fresh-eyes headline" },
  { image: clearView, label: "One clear view", alt: "Colorful collages arranged under Walkthru's One clear view headline" },
  { image: realPeople, label: "Built for real people", alt: "Yellow Walkthru poster with illustrated faces and Scout" },
  { image: wayThrough, label: "A stranger's way through", alt: "A tall green poster mapping a visitor's journey through a playful illustrated world" },
];

// Local composition helpers retain the existing case-page classes.
function Chapter({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return <div className="walkthru-chapter-heading" data-walk-reveal>
    <span className="dw-kicker">{number}</span>
    <h2 className="dw-heading-lg">{title}</h2>
    <p className="dw-body-lg">{children}</p>
  </div>;
}

function Capture({ src, alt, caption, width, height, priority = false }: {
  src: string; alt: string; caption?: string; width: number; height: number; priority?: boolean;
}) {
  return <figure className="walkthru-capture" data-walk-reveal>
    <div data-walk-parallax>
    <a href={src} target="_blank" rel="noopener noreferrer" className="walkthru-image-link" aria-label={`Open full image: ${alt}`}>
    <img src={src} alt={alt} width={width} height={height} loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"} decoding="async" />
    </a>
    {caption && <figcaption>{caption}</figcaption>}
    </div>
  </figure>;
}

export default function WalkthruProjectPage() {
  const root = useRef<HTMLElement>(null);
  useMagnetic(root);
  const next = nextCase(projects, "walkthru");

  useEffect(() => {
    const before = document.title;
    document.title = "Walkthru — Rohit Maity";
    return () => { document.title = before; };
  }, []);

  useGSAP(() => {
    if (!root.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(".dw-hero-title", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: "power3.out" });
    root.current.querySelectorAll<HTMLElement>("[data-walk-reveal]").forEach((element) => {
      gsap.from(element, { y: 30, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: element, start: "top 92%", once: true } });
    });
    // Move the complete image/caption layer inside its stable reveal wrapper.
    // Screenshots keep their natural ratio and every pixel; gallery hover owns its media transforms.
    root.current.querySelectorAll<HTMLElement>("[data-walk-parallax], .walkthru-poster-gallery").forEach((layer) => {
      const distance = () => window.innerWidth <= 600 ? 14 : 32;
      gsap.fromTo(layer, { y: () => -distance() }, { y: distance, ease: "none",
        scrollTrigger: { trigger: layer.parentElement, start: "top bottom", end: "bottom top", scrub: 0.6, invalidateOnRefresh: true } });
    });
    gsap.fromTo(".walkthru-art-opener img", { yPercent: -3, scale: 1.07 }, { yPercent: 3, scale: 1.07, ease: "none",
      scrollTrigger: { trigger: ".walkthru-art-opener", start: "top bottom", end: "bottom top", scrub: 0.6 } });
  }, { scope: root });

  return <>
    <Preloader text="Walkthru" />
    <Navbar />
    <main className="dw-case-study walkthru-case" ref={root}>
      <section className="dw-section container walkthru-intro">
        <span className="dw-kicker">01 — AI test users, inside your browser</span>
        <h1 className="dw-hero-title">Walkthru</h1>
        <p className="dw-hero-tagline">{caseStudy.tagline}</p>
        <p className="dw-body-lg">You know how your app works. A stranger doesn’t. Walkthru brings that first visit into focus — one real browser journey, one piece of evidence, one useful fix at a time.</p>
      </section>
      <section className="container dw-hero-cta-section">
        <span className="footer-stripe" />
        <div className="footer-cta-row"><div className="footer-contacts">
          <a className="footer-pill magnetic" data-strength="24" href={caseStudy.github} target="_blank" rel="noopener noreferrer"><span>GitHub Repository ↗</span></a>
        </div></div>
        <p className="walkthru-status">Built locally · Deployment pending</p>
      </section>
      <section className="container dw-meta-section" aria-label="Project details">
        <div className="dw-meta-grid-3col">
          {[["Discipline", "Full-stack engineering / AI agents"], ["Architecture", "Chrome MV3 · FastAPI · LangGraph"], ["Year", "2026"]].map(([label, value]) =>
            <div className="dw-meta-col" key={label}><span className="dw-meta-label">{label}</span><span className="dw-meta-stripe" /><p className="dw-meta-val">{value}</p></div>)}
        </div>
      </section>
      <section className="container dw-preview-section" aria-label="Walkthru dashboard">
        <Capture src={dashboard} alt="Walkthru dashboard: Launch with evidence, not guesses; run allowance and recent journeys" width={2160} height={1275} priority
          caption="The real signed-in dashboard. Figures and entitlements shown belong to a local test account." />
      </section>
      <div className="walkthru-art-opener"><img src={secondLook} alt="See what you missed — Walkthru's blue campaign collage with eye photography, doodles and Scout" width={1800} height={1013} loading="lazy" decoding="async" /></div>

      <section className="dw-section container">
        <Chapter number="02 — A different perspective" title="Build it. Then see it fresh.">For founders shipping with AI, making a screen is increasingly quick. Seeing the confusion inside it still takes care. Walkthru starts with a person’s goal, rather than a checklist of buttons.</Chapter>
        <div className="walkthru-personas" aria-label="Visitor perspectives">
          {personas.map(({ image, label }) => <figure key={label} data-walk-reveal><div data-walk-parallax><img src={image} alt={`Walkthru's editorial photography for ${label.toLowerCase()}`} loading="lazy" decoding="async" /><figcaption>{label}</figcaption></div></figure>)}
        </div>
        <p className="walkthru-note">Persona photography from the application. First-time visitors, phone users, buyers and skeptics guide the test; each run keeps its own goal and evidence.</p>
      </section>

      <section className="dw-section container">
        <Chapter number="03 — The browser is the workspace" title="A journey, not a guess.">Choose a site, a goal and a test user in the Chrome side panel. The agent observes the rendered page, decides on a next step, and pauses for the extension to carry it out locally. The next observation tells it whether that step actually worked.</Chapter>
        <Capture src={sidepanel} alt="A real recording of Walkthru's extension beside TripVerse, setting a trip-planning test goal" width={1920} height={874}
          caption="TripVerse is the site under test in this recording; Walkthru is the browser side panel on the right." />
        <div className="walkthru-editorial-pair">
          <div className="walkthru-text-block" data-walk-reveal><h3 className="dw-heading-md">Keep the session. Show the steps.</h3><p className="dw-body-lg">The journey runs inside your own browser, including pages you’re already signed into. Screenshots, snippets and step observations make the report traceable. PII masking happens before evidence is uploaded.</p><p className="dw-body-muted">Bounded actions and explicit checkpoints keep the loop understandable. Logged-in testing doesn’t require handing the agent your password.</p></div>
          <Capture src={extensionReport} alt="Walkthru run report beside the extension's think-aloud trip-planning journey" width={1920} height={874} caption="The local run and its browser-side progress, shown together." />
        </div>
      </section>

      <section className="dw-section container">
        <Chapter number="04 — Evidence before reassurance" title="Where did they get stuck?">A useful report connects the finding to the moment it happened. A missing response after a form submission becomes a named step, a screenshot and a focused explanation — something a developer can inspect and repair.</Chapter>
        <Capture src={report} alt="Real Walkthru evidence report with journey checks and a sample Launch Ready score" width={1872} height={653}
          caption="A real contact-form showcase report. The visible score is demo evidence, not a customer outcome." />
        <div className="walkthru-editorial-pair walkthru-evidence-detail">
          <Capture src={stuck} alt="A signup finding showing the exact form step, browser screenshot and grounded feedback" width={1872} height={1440} caption="A real hard-fixture signup run, with the failure tied to its evidence." />
          <div className="walkthru-text-block" data-walk-reveal><span className="dw-kicker">From observation to action</span><h3 className="dw-heading-md">Specific enough to fix.</h3><p className="dw-body-lg">The report separates what the visitor experienced from what the page exposes. That distinction keeps a confusing journey, an accessibility issue and a technical hygiene finding from becoming one vague score.</p><p className="dw-body-muted">Launch Ready is a summary of the run. The evidence underneath is what makes the next decision useful.</p></div>
        </div>
      </section>

      <section className="dw-section container">
        <Chapter number="05 — Beyond the happy path" title="Can the outside world read it?">The same report checks discoverability and the quieter details around a launch: crawlability, structured data, AI crawler access, accessibility, mobile performance and passive security hygiene.</Chapter>
        <Capture src={seo} alt="Walkthru SEO and AI search readiness report with crawlability, structured data and server-rendered content checks" width={1872} height={892} caption="SEO / GEO findings with a framework-aware fix pack, from a real report." />
        <div className="walkthru-editorial-pair">
          <div className="walkthru-text-block" data-walk-reveal><h3 className="dw-heading-md">Small signals. Real consequences.</h3><p className="dw-body-lg">Headers, cookies, exposed browser files and page errors get a second look. Accessibility and performance observations sit beside them, so release work has a clear place to begin.</p><p className="dw-body-muted">Security checks are passive. Citation tracking elsewhere in the product samples supported APIs; it does not measure every consumer AI search experience.</p></div>
          <Capture src={security} alt="Walkthru report showing accessibility, mobile performance and passive security hygiene checks" width={1872} height={653} caption="Observed hygiene and accessibility checks, rather than a security certification." />
        </div>
      </section>

      <section className="dw-section container">
        <Chapter number="06 — Close the loop" title="Find. Fix. Try again.">The report should travel to the tool doing the repair. Grounded fix prompts carry the evidence into a coding agent; MCP connects the editor to scans, reports and reruns. Comparison shows what’s fixed, what remains and what is new.</Chapter>
        <Capture src={fixes} alt="Walkthru fixes screen with evidence-based instructions ready for a coding agent" width={1920} height={874} caption="The real fix handoff: findings turned into instructions with context." />
        <Capture src={mcp} alt="Walkthru Connect your editor screen explaining MCP and showing an empty API key list" width={1920} height={874} caption="The MCP connection screen. This capture contains no API credential." />
      </section>

      <section className="dw-section-under-hood container">
        <Chapter number="07 — Under the hood" title="Observe. Decide. Check.">The extension owns the browser. FastAPI and LangGraph coordinate a bounded agent loop. The report connects that local journey to deterministic checks and stored evidence.</Chapter>
        <div className="walkthru-system" role="group" aria-label="Walkthru architecture">
          <CaseFlow lanes={[
            { name: "Local browser / Chrome MV3 + WXT", steps: ["Goal + persona", "Observe DOM, axe and vitals", "Execute the bounded local action", "Return fresh evidence"] },
            { name: "Control loop / FastAPI + LangGraph", steps: ["Decide", "Interrupt for local action", "Check the result", "Decide again or finish"] },
            { name: "Evidence & report / Supabase + PostgreSQL", steps: ["Mask PII before upload", "Private evidence storage", "Jobs + deterministic audits", "Grounded report + fix handoff"] },
          ]} />
          <p className="walkthru-system-loop">Report → coding-agent fix → rerun → comparison</p>
        </div>
        <div className="dw-decisions-list">
          {[
            ["01", "Keep actions local", "The extension executes in the active browser session; the server coordinates the next decision rather than holding a remote copy of the user's login."],
            ["02", "Ground the explanation", "Step observations and masked captures accompany the report. Private storage and persistence boundaries separate the evidence from its public presentation."],
            ["03", "Design for a rerun", "Findings, fix prompts and the 23-tool MCP surface keep repair connected to verification. Durable checkpoint configuration remains part of production deployment work."],
          ].map(([number, title, body]) => <div className="dw-decision-item" key={number}><span className="dw-decision-num">{number}</span><h3 className="dw-decision-title">{title}</h3><p className="dw-decision-body">{body}</p></div>)}
        </div>
        <p className="walkthru-stack">{caseStudy.stack.join(" / ")}</p>
      </section>

      <section className="dw-section container">
        <Chapter number="08 — A little curiosity" title="Fresh eyes have a face.">Scout, the walking bird, gives the product a small companion. Quiet software screens meet expressive photography, hand-drawn faces and campaign collages — a visual reminder that a real person is always on the other side of the interface.</Chapter>
        <div className="walkthru-photo-pair">
          <Capture src={eye} alt="Application artwork: an eye behind a desktop full of files, suggesting a closer look" width={735} height={471} />
          <Capture src={reading} alt="Application photography: a seated reader in focus while people pass by in a blur" width={1200} height={1200} />
        </div>
        <p className="walkthru-note">Campaign artwork, separate from the product captures above. Focus a panel or use the arrow keys to explore.</p>
        <AccordionGallery items={posters} defaultIndex={0} height={620} gap={16} expandRatio={0.45} parallax={0} showLabels={false} accentColor="var(--ink)" className="walkthru-poster-gallery" />
      </section>

      <section className="dw-section container">
        <Chapter number="09 — The story in motion" title="Thirty seconds. A second look.">The short launch film brings together the original artwork, Scout and recorded browser journeys. It follows the same arc as the product: fresh perspectives, evidence, a useful fix, then another try.</Chapter>
        <figure className="walkthru-film"><video controls playsInline preload="none" poster={filmPoster} width={1920} height={1080} aria-label="Walkthru 30-second launch film, campaign artwork and browser journeys"><source src={film} type="video/mp4" /><a href={film}>Watch the Walkthru launch film</a></video><figcaption>30-second campaign film with an original synthesized score. Playback starts only when you choose it.</figcaption></figure>
      </section>

      <section className="dw-section container walkthru-closing">
        <Capture src={scout} alt="Scout takes a second look — a wide Walkthru campaign with the walking bird and curious illustrations" width={1800} height={600} />
        <div className="walkthru-reflection" data-walk-reveal><span className="dw-kicker">10 — Reflection</span><h2 className="dw-heading-lg">Confidence starts<br />with a closer look.</h2><p className="dw-body-lg">Walkthru turns “it seems fine” into something you can examine. The browser journey, evidence report and repair loop are implemented in the source; deployment and production acceptance are the next stage.</p><p className="dw-body-muted">This case documents the local product and its design work. Team, watch, comparison and citation modules support the larger workflow; the real browser journey remains its center.</p></div>
      </section>
    </main>
    <Footer nextProject={next ? { title: next.title, slug: next.slug, image: next.nextCaseImage ?? next.images[0], role: next.role } : undefined} />
  </>;
}
