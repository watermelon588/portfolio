import { useEffect, useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "@/components/nav/Navbar";
import { Preloader } from "@/components/motion/Preloader";
import { useMagnetic } from "@/components/motion/useMagnetic";
import { FeatureShowcase } from "@/components/FeatureShowcase/FeatureShowcase";
import { AccordionGallery } from "@/components/motion/AccordionGallery";
import { CaseFlow } from "@/components/CaseFlow/CaseFlow";
import { TravelJournals } from "@/components/tripverse/journal/TravelJournals";
import { Footer } from "@/sections/Footer/Footer";
import { projects } from "@/data/projects";
import { nextCase } from "@/data/projectRegistry";
import { caseStudy } from "@/data/projectEntries/tripverse";
import seoul from "@/assets/Tripverse/media/web/brady-bellini-t5dGNNQVwg8-unsplash.jpg";
import fuji from "@/assets/Tripverse/media/web/hero-bg.jpg";
import plan from "@/assets/Tripverse/portfolio/screens/06-studio-plan.webp";
import sketch from "@/assets/Tripverse/portfolio/screens/07c-sketch-day.webp";
import map from "@/assets/Tripverse/portfolio/screens/08-studio-map.webp";
import spatial from "@/assets/Tripverse/portfolio/screens/09-studio-3d.webp";
import brief from "@/assets/Tripverse/portfolio/screens/02-brief-step-1.webp";
import guides from "@/assets/Tripverse/portfolio/screens/02d-guide-picker.webp";
import oneShot from "@/assets/Tripverse/portfolio/screens/04-one-shot-itinerary.webp";
import build from "@/assets/Tripverse/portfolio/screens/16-build-day-plan.webp";
import receipt from "@/assets/Tripverse/portfolio/screens/05b-change-receipt.webp";
import receiptDetail from "@/assets/Tripverse/portfolio/screens/05b-change-receipt-512-666-736-76.webp";
import budget from "@/assets/Tripverse/portfolio/screens/13-budget-rows-720-0-720-900.webp";
import budgetSuggestions from "@/assets/Tripverse/portfolio/screens/12-budget-suggestions.webp";
import phoneSketch from "@/assets/Tripverse/portfolio/screens/23-phone-sketch.webp";
import phoneChat from "@/assets/Tripverse/portfolio/screens/23b-phone-chat.webp";
import exportReady from "@/assets/Tripverse/portfolio/screens/10b-export-ready.webp";
import liveSketch from "@/assets/Tripverse/portfolio/screens/21-build-live-sketch-done.webp";
import sketchSpread from "@/assets/Tripverse/portfolio/compositions/05-sketch-meets-studio.webp";
import pocket from "@/assets/Tripverse/portfolio/compositions/02-pocket-sketchbook.webp";
import buildTogether from "@/assets/Tripverse/portfolio/compositions/04-build-together.webp";
import budgetContext from "@/assets/Tripverse/portfolio/compositions/06-budget-context.webp";
import askChange from "@/assets/Tripverse/portfolio/compositions/07-ask-change-keep-going.webp";
import takeWithYou from "@/assets/Tripverse/portfolio/compositions/08-take-trip-with-you.webp";
import inspiration from "@/assets/Tripverse/portfolio/compositions/10-inspiration-to-plan.webp";
import "./ProjectPage.css";
import "./TripverseProjectPage.css";

gsap.registerPlugin(ScrollTrigger);

const studioViews = [
  { image: plan, title: "Follow the days.", tag: "01 / Plan", description: "Read the day cards, open the details and keep the whole itinerary in view." },
  { image: sketch, title: "Picture the moments.", tag: "02 / Sketchbook", description: "Hand-drawn day pages connect the places, their order, the weather and your annotations." },
  { image: map, title: "Understand the route.", tag: "03 / Map", description: "Numbered stops, nearby places and available road metrics make distance part of the conversation." },
  { image: spatial, title: "Change perspective.", tag: "04 / 3D", description: "Orbit the connected places and travel legs as a spatial route graph, rather than a second itinerary." },
];
const artwork = [
  { image: buildTogether, label: "Build a day together", alt: "Blue paper collage framing TripVerse's real collaborative day-planning interface" },
  { image: budgetContext, label: "Know the costs", alt: "TripVerse's budget campaign: real cost rows and a tablet ledger among colorful artwork" },
  { image: askChange, label: "Ask. Change. Keep going.", alt: "TripVerse's warm-paper campaign composition with a real conversation and change receipt" },
  { image: takeWithYou, label: "Your trip, ready to take", alt: "TripVerse export campaign with a tablet, mountain photography and a playful travel collage" },
  { image: inspiration, label: "Find your spark", alt: "Bright floral TripVerse composition connecting Explore and the trip brief" },
  { image: pocket, label: "A pocket of wonder", alt: "TripVerse phone sketchbook composition against torn pink paper and mountains" },
];

function Chapter({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  return <div className="tripverse-chapter" data-trip-reveal><span className="dw-kicker">{number}</span><h2 className="dw-heading-lg">{title}</h2><p className="dw-body-lg">{children}</p></div>;
}

function Capture({ src, alt, caption, width = 1440, height = 900, priority = false }: {
  src: string; alt: string; caption?: string; width?: number; height?: number; priority?: boolean;
}) {
  return <figure className="tripverse-capture" data-trip-reveal><div data-trip-parallax>
    <a className="tripverse-image-link" href={src} target="_blank" rel="noopener noreferrer" aria-label={`Open full image: ${alt}`}>
      <img src={src} alt={alt} width={width} height={height} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} decoding="async" />
    </a>{caption && <figcaption>{caption}</figcaption>}
  </div></figure>;
}

export default function TripverseProjectPage() {
  const root = useRef<HTMLElement>(null);
  useMagnetic(root);
  const next = nextCase(projects, "tripverse");

  useEffect(() => {
    const before = document.title;
    document.title = "TripVerse — Rohit Maity";
    return () => { document.title = before; };
  }, []);

  useGSAP(() => {
    if (!root.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(".dw-hero-title", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: "power3.out" });
    root.current.querySelectorAll<HTMLElement>("[data-trip-reveal]").forEach((element) => {
      gsap.from(element, { y: 30, opacity: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 92%", once: true } });
    });
    root.current.querySelectorAll<HTMLElement>("[data-trip-parallax]").forEach((layer) => {
      const distance = () => window.innerWidth <= 600 ? 14 : 32;
      gsap.fromTo(layer, { y: () => -distance() }, { y: distance, ease: "none", scrollTrigger: { trigger: layer.parentElement, start: "top bottom", end: "bottom top", scrub: 0.6, invalidateOnRefresh: true } });
    });
    gsap.fromTo(".tripverse-destination img", { yPercent: -4, scale: 1.1 }, { yPercent: 4, scale: 1.1, ease: "none", scrollTrigger: { trigger: ".tripverse-destination", start: "top bottom", end: "bottom top", scrub: 0.6 } });
  }, { scope: root });

  useEffect(() => {
    let alive = true;
    let frame = 0;
    const refresh = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => { if (alive) ScrollTrigger.refresh(); });
    };
    const images = root.current?.querySelectorAll("img");
    images?.forEach((img) => img.addEventListener("load", refresh));
    document.fonts.ready.then(() => { if (alive) refresh(); });
    return () => { alive = false; cancelAnimationFrame(frame); images?.forEach((img) => img.removeEventListener("load", refresh)); };
  }, []);

  return <>
    <Preloader text="TripVerse" />
    <Navbar />
    <main className="tripverse-page" ref={root}>
      <div className="dw-case-study tripverse-case">
        <section className="dw-section container tripverse-intro">
          <span className="dw-kicker">01 — Agentic travel planning</span>
          <h1 className="dw-hero-title">TripVerse</h1>
          <p className="dw-hero-tagline">{caseStudy.tagline}</p>
          <p className="dw-body-lg">A trip starts as a feeling. Turning it into days, places and decisions takes a little more. TripVerse brings the conversation and the journey into one workspace — with room to change your mind.</p>
        </section>
        <section className="container dw-hero-cta-section">
          <span className="footer-stripe" /><div className="footer-cta-row"><div className="footer-contacts">
            <a className="footer-pill magnetic" data-strength="24" href={caseStudy.live} target="_blank" rel="noopener noreferrer"><span>Explore TripVerse ↗</span></a>
            <a className="footer-pill magnetic" data-strength="24" href={caseStudy.github} target="_blank" rel="noopener noreferrer"><span>GitHub Repository ↗</span></a>
          </div></div>
        </section>
        <section className="container dw-meta-section" aria-label="Project details">
          <div className="dw-meta-grid-3col">{[["Discipline", "Full-stack engineering / AI agents"], ["Architecture", "React · FastAPI · LangGraph"], ["Year", "2026"]].map(([label, value]) => <div className="dw-meta-col" key={label}><span className="dw-meta-label">{label}</span><span className="dw-meta-stripe" /><p className="dw-meta-val">{value}</p></div>)}</div>
        </section>
        <figure className="tripverse-destination"><img src={seoul} alt="Gyeongbokgung palace eaves in Seoul — the photograph used on TripVerse's live homepage" width={1920} height={1280} fetchPriority="high" decoding="async" /><figcaption>Somewhere worth a first draft. Photography from the application.</figcaption></figure>
        <section className="container dw-preview-section tripverse-first-plan" aria-label="TripVerse product preview">
          <Capture src={plan} alt="The real TripVerse Studio: Kyoto day cards, Plan/Sketch/Map/3D tabs and an open trip details window" caption="The trip, rather than a paragraph about it. Real application capture from the in-app guide." priority />
        </section>

        <section className="dw-section container">
          <Chapter number="02 — Before the itinerary" title="Start with the idea.">Where from, where to, how long. Three essentials give the guide somewhere to begin. Dates, budget, pace, interests and things to avoid fill in the picture when you have them.</Chapter>
          <div className="tripverse-pair"><Capture src={brief} alt="TripVerse brief step one asking where from, where to and how many days" caption="The brief is saved; its details can be reopened and changed." /><Capture src={guides} alt="TripVerse's six illustrated guides in the original guide picker" caption="Six personalities. The same planning logic — with your chosen companion in the conversation, sketchbook and PDF." /></div>
        </section>

        <section className="dw-section container">
          <Chapter number="03 — Two ways to build" title="A first draft. Or one day at a time.">Ask for the complete itinerary and watch the researched days stream in. Or build together: choose suggestions, shape a day, move a stop, then continue. The guide keeps the brief and the running budget close.</Chapter>
          <Capture src={oneShot} alt="A real three-day Kyoto itinerary streamed into TripVerse's conversation" caption="One-shot planning researches the destination and writes a complete first draft." />
          <div className="tripverse-offset-pair"><div data-trip-reveal><h3 className="dw-heading-md">Make a day yours.</h3><p className="dw-body-lg">The collaborative mode works in smaller decisions. Traveler-post research feeds place suggestions; adding, removing and moving places updates the saved plan. A busy day or an over-budget choice gets a heads-up, while your explicit request remains yours to make.</p></div><Capture src={build} alt="TripVerse's collaborative day-planning conversation, with place choices and the day plan" caption="A real day-by-day run, not a second static itinerary template." /></div>
        </section>

        <section className="dw-section container">
          <Chapter number="04 — Change it by asking" title="A conversation that leaves a receipt.">“Move the market to day two.” An edit becomes a change to the trip, and a receipt tells you what actually happened. The Studio follows the saved plan, so the conversation and the visual route stay together.</Chapter>
          <Capture src={receipt} alt="TripVerse's revised Kyoto itinerary ending in a receipt for an added bamboo-grove visit" caption="The source guide's real change example: a new stop on day two, with the earlier visit retained as optional." />
          <div className="tripverse-receipt-detail"><Capture src={receiptDetail} alt="Readable detail of the original change receipt, listing the saved itinerary edit and Open Studio action" width={736} height={76} caption="A source-provided detail crop of the same receipt above." /></div>
          <p className="dw-body-muted tripverse-following-note">Advice can be offered before anything changes. A follow-up confirmation applies the offered move; the resulting receipt lists every saved change, including changes beyond the reply’s wording.</p>
        </section>

        <section className="dw-section container">
          <Chapter number="05 — One trip, four views" title="Keep the whole journey in view.">Plan the days. Sketch the moments. Read the route. Change perspective. Trip Studio gives the same itinerary four ways to make sense — with movable desktop windows for the details you want nearby.</Chapter>
          <FeatureShowcase items={studioViews} className="tripverse-studio" />
          <Capture src={liveSketch} alt="A real TripVerse live sketchbook beside the planning conversation, with a note added to day one" caption="The sketch takes shape alongside the conversation; edits redraw the day from the shared trip state." />
        </section>
        <section className="container tripverse-art-spread" aria-label="TripVerse sketchbook campaign"><Capture src={sketchSpread} alt="A plan you can picture — TripVerse's original wide sketchbook and travel-collage composition" width={1920} height={960} caption="Product composition from TripVerse's design pack. The interface pixels come from the real application." /></section>

        <section className="dw-section container">
          <Chapter number="06 — A budget with context" title="Know the costs. Keep your choices.">A target gives the plan context. Typical costs arrive as suggestions, row by row, sourced from traveler reports. They become part of the total when you accept them; entered amounts remain the ledger’s source of truth.</Chapter>
          <div className="tripverse-budget-pair"><Capture src={budget} alt="The TripVerse budget ledger's entered cost rows and trip total" width={720} height={900} caption="A readable source crop of the real ledger. Amounts belong to the example trip." /><div><Capture src={budgetSuggestions} alt="TripVerse's budget suggestions, with estimated costs that can be accepted separately" caption="Suggested amounts are estimates, not confirmed fares or bookings." /><p className="dw-body-lg tripverse-following-note">Dates matter too. Near-date weather is labeled as a forecast; farther-out planning uses the month’s typical conditions. Public holidays travel with the day plan, rather than sitting in a separate checklist.</p></div></div>
        </section>

        <section className="dw-section container">
          <Chapter number="07 — A smaller screen" title="The same trip, in your pocket.">The conversation stays upright. The sketchbook becomes a readable page. Bottom sheets bring the details within reach, while the same saved trip connects the phone to the larger Studio.</Chapter>
          <div className="tripverse-phones"><Capture src={phoneSketch} alt="TripVerse's actual phone sketchbook with handwritten day-one places and a sticky note" width={780} height={1688} caption="The sketchbook on a phone." /><Capture src={phoneChat} alt="TripVerse's actual mobile conversation with a completed three-day itinerary" width={780} height={1688} caption="The conversation on a phone." /></div>
        </section>

        <section className="dw-section container">
          <Chapter number="08 — Take it with you" title="A plan that can leave the screen.">Carry the trip as a PDF, a calendar, map pins or a budget sheet. Exports use the same trip document you just shaped, with the chosen guide signing the PDF cover.</Chapter>
          <Capture src={exportReady} alt="TripVerse's real Kyoto export window with PDF, calendar and map/file export options" caption="PDF · ICS calendar · daily Google Maps directions · GPX · KML · CSV · JSON. Google Maps directions support up to nine stops per day." />
        </section>

        <section className="dw-section container">
          <Chapter number="09 — Under the hood" title="Many perspectives. One trip.">React owns the workspace. FastAPI streams the conversation. LangGraph coordinates two planning paths, while deterministic edits and a normalized trip document connect the chat to every Studio view.</Chapter>
          <div className="tripverse-system" role="group" aria-label="TripVerse architecture"><CaseFlow lanes={[
            { name: "A complete draft / LangGraph", steps: ["Read the brief", "Research the destination", "Write the days", "Extract the itinerary"] },
            { name: "Build together / LangGraph", steps: ["Interpret the request", "Apply the edit", "Research + recommend", "Respond + render"] },
            { name: "Shared trip document", steps: ["Plan + Sketchbook", "Map + 3D route", "Budget ledger", "Portable exports"] },
          ]} /><p className="tripverse-system-note">Browser → REST + Server-Sent Events → FastAPI → planning / saved trip</p></div>
          <div className="dw-decisions-list">
            <div className="dw-decision-item" data-trip-reveal><span className="dw-decision-num">01</span><div className="dw-decision-body"><h3 className="dw-heading-md">Keep a document, not a duplicate.</h3><p className="dw-body-lg">Both planners converge on the same trip representation. The budget is a persistent ledger, with totals derived from entered rows rather than a model’s prose.</p></div></div>
            <div className="dw-decision-item" data-trip-reveal><span className="dw-decision-num">02</span><div className="dw-decision-body"><h3 className="dw-heading-md">Make the boundaries visible.</h3><p className="dw-body-lg">Research, place data and available road metrics support the itinerary. Estimates remain estimates. Choosing a display currency doesn’t promise automatic currency conversion, and planning doesn’t book a trip.</p></div></div>
            <div className="dw-decision-item" data-trip-reveal><span className="dw-decision-num">03</span><div className="dw-decision-body"><h3 className="dw-heading-md">Leave room to return.</h3><p className="dw-body-lg">Guest sessions let the planning begin before sign-in; an account can claim the trip afterward. Supabase Auth and PostgreSQL support the persisted journey.</p></div></div>
          </div>
          <p className="tripverse-stack">React / TypeScript / GSAP / Three.js / FastAPI / LangGraph / Supabase / PostgreSQL<br />Groq with Gemini fallback · Tavily research · Places cache/quota · available road metrics</p>
        </section>
      </div>

      {/* Original product environment sits outside the case's square-corner reset. */}
      <div className="tripverse-original tripverse-original--bone"><TravelJournals /></div>

      <div className="dw-case-study tripverse-case tripverse-ending">
        <section className="dw-section container">
          <Chapter number="10 — A little room for wonder" title="Useful enough to plan. Personal enough to keep.">Paper, photographs, fine rules and handwritten notes give a technical workspace a more human rhythm. These are the application’s own campaign compositions — the feeling around the functional screens.</Chapter>
          <AccordionGallery items={artwork} defaultIndex={0} height={620} gap={16} expandRatio={0.45} parallax={0} showLabels={false} accentColor="var(--ink)" className="tripverse-art-gallery" />
        </section>
        <figure className="tripverse-outside"><img src={fuji} alt="Mount Fuji at first light — the destination photography used on TripVerse's Explore page" width={1920} height={1280} loading="lazy" decoding="async" /></figure>
        <section className="dw-section container tripverse-closing" data-trip-reveal><span className="dw-kicker">11 — Reflection</span><h2 className="dw-heading-lg">From somewhere in mind<br />to a journey taking shape.</h2><p className="dw-body-lg">TripVerse turns the first idea into something you can inspect, change and carry. The conversation, the Studio and the little journal belong to the same story: more clarity before you leave, and a little room for what you find along the way.</p><p className="dw-body-muted">This case documents the current product and source-backed workflows. Its example itineraries and costs demonstrate the interface; they are not measured travel outcomes.</p></section>
      </div>
    </main>
    <Footer nextProject={next ? { title: next.title, slug: next.slug, image: next.nextCaseImage ?? next.images[0], role: next.role } : undefined} />
  </>;
}
