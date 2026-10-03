import { useEffect, useRef } from "react";
import { Navbar } from "@/components/nav/Navbar";
import { Preloader } from "@/components/motion/Preloader";
import { useMagnetic } from "@/components/motion/useMagnetic";
import { CaseFlow } from "@/components/CaseFlow/CaseFlow";
import { StoryChapter, StoryFilm, StoryImage, useStoryMotion } from "@/components/caseStory/CaseStory";
import { Footer } from "@/sections/Footer/Footer";
import { projects } from "@/data/projects";
import { nextCase } from "@/data/projectRegistry";
import { caseStudy } from "@/data/projectEntries/walkthru";
import { storyImages as photos } from "@/assets/Walktru/detail-story/images";
import dashboard from "@/assets/Walktru/hero-dashboard.webp";
import report from "@/assets/Walktru/report.png";
import film from "@/assets/Walktru/detail-story/launch-film.mp4";
import filmPoster from "@/assets/Walktru/detail-story/launch-poster.jpg";
import "./ProjectPage.css";
import "./WalkthruProjectPage.css";

export default function WalkthruProjectPage() {
  const root = useRef<HTMLElement>(null);
  useMagnetic(root);
  useStoryMotion(root);
  const next = nextCase(projects, "walkthru");
  useEffect(() => {
    const before = document.title;
    document.title = "Walkthru — Rohit Maity";
    return () => { document.title = before; };
  }, []);

  return <>
    <Preloader text="Walkthru" />
    <Navbar />
    <main className="dw-case-study human-case walkthru-case" ref={root}>
      <section className="dw-section container story-intro">
        <span className="dw-kicker">Walkthru / A little more understanding</span>
        <h1 className="dw-hero-title">Walkthru</h1>
        <p className="dw-hero-tagline">On the other side of every screen,<br />there’s a person.</p>
        <p className="dw-body-lg">Someone trying to get somewhere. Someone who hasn’t spent months building what you built. I wanted to make that first encounter easier to understand — and easier to care about.</p>
      </section>
      <section className="container story-links">
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

      <section className="container walkthru-opening" aria-label="The people behind the experience">
        <div className="story-grid story-grid--uneven">
          <StoryImage asset={photos.strangers} alt="A seated reader stays still while people blur past in a monochrome photograph" label="01 / The outside perspective" title="Familiar to you. New to them." shape="square" priority sizes="(max-width: 700px) 100vw, 55vw" />
          <StoryImage asset={photos.focus} alt="A person working on a laptop beside a window overlooking the hills" label="Made with care" title="You know every corner. They’re finding the door." shape="portrait" />
        </div>
        <p className="walkthru-opening-note">A story about the distance between making something and seeing it fresh.</p>
      </section>

      <section className="container story-section">
        <StoryChapter number="02 — Why I built it" title={<>It’s hard to see it<br />with <em>fresh eyes.</em></>}>
          <p>When you build a product, its logic becomes your logic. You remember where the button is. You know what happens next. The confusing parts start to look familiar.</p>
          <p>But the person arriving for the first time has none of that context. Walkthru began with a simple question: how do I make room for their perspective before I launch?</p>
        </StoryChapter>
        <div className="story-grid story-grid--offset">
          <StoryImage asset={photos.cafe} alt="A person sitting at a café table with a laptop, notebook and drink" label="A busy afternoon" title="Your app is a small part of someone’s day." shape="portrait" />
          <StoryImage asset={photos.overload} alt="A portrait behind a crowded computer desktop of files and icons" label="A little too much at once" title="What feels obvious can feel overwhelming." kind="art" />
        </div>
      </section>

      <section className="container story-section">
        <StoryChapter number="03 — A person, before a persona" title={<>Different days.<br /><em>Different ways in.</em></>}>
          <p>A visit might happen on a crowded train, between tasks, or with a cup of coffee getting cold. Attention, patience and confidence change with the situation.</p>
          <p>That’s why the test starts with a goal and a perspective. The agent is a way to look for friction; the people who eventually use the product are the reason to look.</p>
        </StoryChapter>
        <div className="story-grid story-grid--three">
          <StoryImage asset={photos.commute} alt="A commuter looking at a phone while standing on a train" label="Between stops" title="A smaller screen. A shorter moment." shape="portrait" />
          <StoryImage asset={photos.reading} alt="A reader quietly thinking with an open book beside them" label="Taking it in" title="Give understanding a little room." shape="portrait" />
          <StoryImage asset={photos.phone} alt="A person reading a phone beside a sunlit window" label="The first encounter" title="Let the next step feel clear." shape="portrait" />
        </div>
        <p className="story-statement" data-story-reveal>A useful product should leave someone feeling <em>more capable.</em><small>The thought behind Walkthru</small></p>
        <StoryImage asset={photos.secondLook} alt="Walkthru’s blue campaign collage with an eye, curious doodles and the Scout bird" label="The second look" title="See what familiarity lets you miss." kind="art" sizes="100vw" />
      </section>

      <section className="container story-section">
        <StoryChapter number="04 — Care, made concrete" title={<>Listen to the journey.<br /><em>Look at the evidence.</em></>}>
          <p>Walkthru brings an AI test user into your real Chrome session. Give it a goal, and it observes the page, takes bounded steps and records where the journey gets difficult.</p>
          <p>Instead of “something feels wrong,” you get the moment, the screenshot and a focused explanation. A small piece of uncertainty becomes something you can work on.</p>
        </StoryChapter>
        <div className="story-grid story-grid--uneven">
          <StoryImage asset={photos.hands} alt="Hands typing on a laptop in a relaxed setting" label="Making the next version" title="A little less guessing. A little more care." shape="portrait" />
          <StoryImage asset={photos.freshEyes} alt="Walkthru’s Fresh eyes club poster with playful figures, doodles and a cream paper background" label="The visual language" title="Curiosity belongs in the work." kind="art" />
        </div>
        <div className="story-evidence">
          <StoryImage asset={{ src: dashboard, width: 2160, height: 1275 }} alt="Walkthru’s real dashboard with a new journey action and recent runs" label="Inside the product / 01" title="One goal. A fresh pair of eyes." kind="evidence" sizes="100vw" />
          <p>The implemented dashboard. Run figures and allowances belong to a local test account.</p>
        </div>
        <div className="story-evidence">
          <StoryImage asset={{ src: report, width: 1872, height: 653 }} alt="Walkthru’s real evidence report with journey findings and a sample Launch Ready score" label="Inside the product / 02" title="A finding you can trace back to a moment." kind="evidence" sizes="100vw" />
          <p>A real showcase report. The example score describes a demo run. Journey evidence sits alongside search readiness, accessibility, performance and passive security checks.</p>
        </div>
      </section>

      <section className="container story-section">
        <StoryChapter number="05 — The launch film" title={<>A second look,<br /><em>in motion.</em></>}>
          <p>The idea in fifteen seconds: a stranger arrives, tries to find their way, and leaves you with something worth noticing.</p>
        </StoryChapter>
        <StoryFilm src={film} poster={filmPoster} name="Walkthru" />
      </section>

      <section className="container story-section">
        <StoryChapter number="06 — For the person making it" title={<>You put care into it.<br /><em>Let that care reach them.</em></>}>
          <p>The report is a beginning. Grounded fix prompts and an MCP connection carry the finding into a coding agent. Then you can rerun the journey and see what changed.</p>
          <p>I want the technical loop to support a human one: notice the difficulty, make a thoughtful change, and give someone a better way through.</p>
        </StoryChapter>
        <div className="story-grid story-grid--offset">
          <StoryImage asset={photos.late} alt="A monochrome photograph of someone concentrating on work at a café table" label="The work behind the work" title="Another draft. Another try." shape="portrait" />
          <StoryImage asset={photos.perspective} alt="A surreal seated figure reading a red book with a red geometric shape behind them" label="A change of perspective" title="Step back. See it differently." kind="art" />
        </div>
      </section>

      <section className="container story-section story-technical">
        <StoryChapter number="07 — The engineering underneath" title={<>Built to observe.<br /><em>Designed to return.</em></>}>
          <p>The extension keeps browser actions local. FastAPI and LangGraph coordinate the observe–decide–check loop. Masked captures and step observations ground the report, the repair and the rerun.</p>
        </StoryChapter>
        <CaseFlow lanes={[
          { name: "Local browser / Chrome MV3 + WXT", steps: ["Goal + persona", "Observe the page", "Execute bounded actions", "Return fresh evidence"] },
          { name: "Agent loop / FastAPI + LangGraph", steps: ["Decide", "Pause for local action", "Check the result", "Continue or finish"] },
          { name: "Evidence / Supabase + PostgreSQL", steps: ["Mask PII before upload", "Store private evidence", "Report + grounded fix", "Rerun + compare"] },
        ]} />
        <p className="story-stack">{caseStudy.stack.join(" / ")}<br />The product is implemented locally. Deployment and production acceptance remain the next stage.</p>
      </section>

      <section className="container story-section story-closing">
        <StoryChapter number="08 — The point" title={<>Make something work.<br />Then make it <em>feel right.</em></>}>
          <p>I love the technology behind this. But the part I want to keep coming back to is the person on the other side: their time, their attention, and that small feeling of “I know what to do now.”</p>
          <p>Fresh eyes. Before you launch.</p>
        </StoryChapter>
      </section>
    </main>
    <Footer nextProject={next ? { title: next.title, slug: next.slug, image: next.nextCaseImage ?? next.images[0], role: next.role } : undefined} />
  </>;
}
