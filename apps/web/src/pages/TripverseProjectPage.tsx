import { useEffect, useRef } from "react";
import { Navbar } from "@/components/nav/Navbar";
import { Preloader } from "@/components/motion/Preloader";
import { useMagnetic } from "@/components/motion/useMagnetic";
import { CaseFlow } from "@/components/CaseFlow/CaseFlow";
import { StoryChapter, StoryFilm, StoryImage, useStoryMotion } from "@/components/caseStory/CaseStory";
import { TravelJournals } from "@/components/tripverse/journal/TravelJournals";
import { Footer } from "@/sections/Footer/Footer";
import { projects } from "@/data/projects";
import { nextCase } from "@/data/projectRegistry";
import { caseStudy } from "@/data/projectEntries/tripverse";
import { storyImages as photos } from "@/assets/Tripverse/detail-story/images";
import plan from "@/assets/Tripverse/portfolio/screens/06-studio-plan.webp";
import film from "@/assets/Tripverse/detail-story/launch-film.mp4";
import filmPoster from "@/assets/Tripverse/detail-story/launch-poster.jpg";
import "./ProjectPage.css";
import "./TripverseProjectPage.css";

export default function TripverseProjectPage() {
  const root = useRef<HTMLElement>(null);
  useMagnetic(root);
  useStoryMotion(root);
  const next = nextCase(projects, "tripverse");
  useEffect(() => {
    const before = document.title;
    document.title = "TripVerse — Rohit Maity";
    return () => { document.title = before; };
  }, []);

  return <>
    <Preloader text="TripVerse" />
    <Navbar />
    <main className="human-case tripverse-page" ref={root}>
      <div className="dw-case-study tripverse-case">
        <section className="dw-section container story-intro">
          <span className="dw-kicker">TripVerse / A little room for wonder</span>
          <h1 className="dw-hero-title">TripVerse</h1>
          <p className="dw-hero-tagline">You remember how it felt.<br />The itinerary comes second.</p>
          <p className="dw-body-lg">The wind. The people beside you. A place that makes you stop for a moment. I wanted to build a planner that helps you get there while keeping that feeling in view.</p>
        </section>
        <section className="container story-links">
          <span className="footer-stripe" />
          <div className="footer-cta-row"><div className="footer-contacts">
            <a className="footer-pill magnetic" data-strength="24" href={caseStudy.github} target="_blank" rel="noopener noreferrer"><span>GitHub Repository ↗</span></a>
          </div>
            {caseStudy.live && <a className="footer-round magnetic" data-strength="42" href={caseStudy.live} target="_blank" rel="noopener noreferrer"><span className="footer-round-label">Live site</span><span className="footer-round-arrow"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M8 7h9v9" /></svg></span></a>}
          </div>
        </section>
        <section className="container dw-meta-section" aria-label="Project details">
          <div className="dw-meta-grid-3col">{[["Discipline", "Full-stack engineering / AI agents"], ["Architecture", "React · FastAPI · LangGraph"], ["Year", "2026"]].map(([label, value]) => <div className="dw-meta-col" key={label}><span className="dw-meta-label">{label}</span><span className="dw-meta-stripe" /><p className="dw-meta-val">{value}</p></div>)}</div>
        </section>
        <section className="tripverse-opening" aria-label="The feeling behind TripVerse">
          <StoryImage asset={photos.wind} alt="A traveler closes their eyes as the green landscape blurs around them" label="01 / Before a destination" title="Sometimes, you just need to feel somewhere else." shape="landscape" priority sizes="100vw" />
        </section>

        <section className="container story-section">
          <StoryChapter number="02 — Why I built it" title={<>The trip starts<br />with <em>a feeling.</em></>}>
            <p>Before there’s a route, there’s a thought: I want to get out. I want to see something new. I want a few days with the people I care about.</p>
            <p>Then come the tabs, the lists and all the little decisions. I built TripVerse to help turn that first impulse into a journey you can shape — without letting the planning become the whole experience.</p>
          </StoryChapter>
          <div className="story-grid story-grid--offset">
            <StoryImage asset={photos.grass} alt="A person lying with arms outstretched in a field of long green grass" label="A slower kind of day" title="Nothing to rush toward." shape="portrait" />
            <StoryImage asset={photos.flowers} alt="Soft red tulips rendered in a textured, colorful graphic artwork" label="A small spark" title="Something catches your eye. Start there." kind="art" />
          </div>
        </section>

        <section className="container story-section">
          <StoryChapter number="03 — Make room for yourself" title={<>Your pace.<br /><em>Your kind of day.</em></>}>
            <p>A good trip leaves room for the person taking it. A quieter morning. One more stop. A change of mind when somewhere feels worth staying.</p>
            <p>Start with where you’re going and how long you have. Bring your budget, interests and pace into the conversation. Ask for a complete first draft, or build the days together.</p>
          </StoryChapter>
          <div className="story-grid story-grid--uneven">
            <StoryImage asset={photos.walking} alt="Two people walking across green grass with misty mountains behind them" label="Away from the usual" title="Take the day at your own pace." shape="portrait" />
            <StoryImage asset={photos.city} alt="A colorful urban street transformed into horizontal bands with a person on a scooter" label="A different way of seeing" title="The same place. A new perspective." kind="art" />
          </div>
          <p className="story-statement" data-story-reveal>Plan enough to go.<br />Leave room to <em>be surprised.</em><small>The thought behind TripVerse</small></p>
          <StoryImage asset={photos.sketchbook} alt="TripVerse’s sketchbook and real Studio interface in a wide travel collage of maps, paper and mountain photographs" label="From a thought to a day" title="A plan you can picture." kind="art" sizes="100vw" />
        </section>

        <section className="container story-section">
          <StoryChapter number="04 — The people you go with" title={<>Some places are better<br /><em>with someone beside you.</em></>}>
            <p>The destination is only part of the story. So is the person you laugh with, the shared detour, the moment everyone decides to stay a little longer.</p>
            <p>I wanted the product to feel companionable too. Illustrated guides bring a voice to the planning, and a conversation gives you room to ask, reconsider and make the trip your own.</p>
          </StoryChapter>
          <div className="story-grid story-grid--offset">
            <StoryImage asset={photos.together} alt="A group of friends holding hands in a circle against a clear blue sky" label="Good company" title="The people become part of the place." shape="square" />
            <StoryImage asset={photos.laugh} alt="Two friends laughing together in a warmly lit evening photograph" label="The part you keep" title="You can’t put this in a checklist." shape="square" />
          </div>
        </section>

        <section className="container story-section">
          <StoryChapter number="05 — Clarity before you leave" title={<>See the journey.<br /><em>Keep your choices.</em></>}>
            <p>The same trip becomes a day plan, a hand-drawn sketchbook, a map and a spatial route. Each view answers a different question: what happens today, how does it feel, and how far are we going?</p>
            <p>Ask to move a stop and the saved plan changes with a receipt. The budget stays nearby. The details do their job, leaving a little more attention for the journey.</p>
          </StoryChapter>
          <div className="story-grid story-grid--uneven">
            <StoryImage asset={photos.trek} alt="A bundled-up traveler with a large backpack on a snowy mountain trek" label="Finding a way through" title="A little preparation. A world beyond it." shape="portrait" />
            <StoryImage asset={photos.now} alt="Playful travel artwork with people standing around large red letters spelling enjoy the now" label="The visual language" title="Make space for the now." kind="art" />
          </div>
          <div className="story-evidence">
            <StoryImage asset={{ src: plan, width: 1440, height: 900 }} alt="The real TripVerse Studio with Kyoto day cards, Plan, Sketchbook, Map and 3D views" label="Inside the product" title="The whole trip, taking shape." kind="evidence" sizes="100vw" />
            <p>A real application capture. The example itinerary demonstrates the workspace; suggested costs and travel details remain planning estimates.</p>
          </div>
        </section>

        <section className="container story-section">
          <StoryChapter number="06 — The launch film" title={<>A first thought.<br /><em>A journey in motion.</em></>}>
            <p>Fifteen seconds from “I want to go somewhere” to a plan you can begin to picture.</p>
          </StoryChapter>
          <StoryFilm src={film} poster={filmPoster} name="TripVerse" />
        </section>

        <section className="container story-section">
          <StoryChapter number="07 — Beyond the screen" title={<>Take the plan.<br /><em>Go make the memory.</em></>}>
            <p>Carry the journey as a PDF, a calendar, map pins or a budget sheet. The plan you shaped is the plan you take with you.</p>
            <p>And once you’re there, the best part may be something you didn’t plan at all.</p>
          </StoryChapter>
          <div className="story-grid story-grid--offset">
            <StoryImage asset={photos.surf} alt="Two surfers holding boards and looking out over a rocky coastline" label="Where the planning leads" title="Less looking at the screen. More looking around." shape="square" />
            <StoryImage asset={photos.takeWithYou} alt="A tablet displaying TripVerse’s export interface among mountain photography, colorful paper and travel illustrations" label="A plan that travels" title="Ready to leave the desk." kind="art" />
          </div>
          <div className="tripverse-camp">
            <StoryImage asset={photos.camp} alt="A glowing orange tent, a camper van and surfboards beside the ocean at dusk" label="At the end of a good day" title="Somewhere you’ll want to remember." shape="landscape" sizes="(max-width: 700px) 100vw, 65vw" />
          </div>
        </section>
      </div>

      <div className="tripverse-original tripverse-original--bone"><TravelJournals /></div>

      <div className="dw-case-study tripverse-case">
        <section className="container story-section story-technical">
          <StoryChapter number="08 — The engineering underneath" title={<>Many ways to see it.<br /><em>One shared journey.</em></>}>
            <p>React holds the workspace. FastAPI streams the conversation. Two LangGraph planning paths feed one normalized trip document, keeping the Studio, budget and exports connected when the plan changes.</p>
          </StoryChapter>
          <CaseFlow lanes={[
            { name: "A complete draft / LangGraph", steps: ["Read the brief", "Research the destination", "Write the days", "Extract the itinerary"] },
            { name: "Build together / LangGraph", steps: ["Interpret the request", "Apply the edit", "Research + recommend", "Respond + render"] },
            { name: "One trip document", steps: ["Plan + Sketchbook", "Map + 3D route", "Budget ledger", "Portable exports"] },
          ]} />
          <p className="story-stack">{caseStudy.stack.join(" / ")}<br />Traveler research, available road metrics and weather context support the plan. Example trips illustrate the product rather than measured travel outcomes.</p>
        </section>
        <section className="container story-section story-closing">
          <StoryChapter number="09 — The point" title={<>Find a way there.<br />Then <em>be there.</em></>}>
            <p>For me, the point of building this is the world it helps you step into. The software holds the decisions together. You get to bring the curiosity.</p>
            <p>Your next trip, taking shape.</p>
          </StoryChapter>
        </section>
      </div>
    </main>
    <Footer nextProject={next ? { title: next.title, slug: next.slug, image: next.nextCaseImage ?? next.images[0], role: next.role } : undefined} />
  </>;
}
