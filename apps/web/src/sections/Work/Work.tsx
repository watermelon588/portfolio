import { Link } from "react-router";
import { HoverRevealList } from "@/components/motion/HoverRevealList/HoverRevealList";
import ScrollReveal from "@/components/vendor/reactbits/ScrollReveal/ScrollReveal";
import { devProjects } from "@/data/projects";
import "./Work.css";

// Selected Work — the home-page project index. Uses the cursor-follow reveal
// interaction (a project image floats toward the cursor on hover). Full
// catalogue lives on /work.
export function Work() {
  return (
    <section className="work section" id="work">
      <div className="work-head container">
        <span className="work-eyebrow">Selected Work</span>
        <ScrollReveal
          containerClassName="work-reveal"
          baseOpacity={0.12}
          baseRotation={3}
          blurStrength={6}
          rotationEnd="bottom center+=30%"
          wordAnimationEnd="bottom center+=30%"
        >
          Things I&rsquo;ve built.
        </ScrollReveal>
      </div>

      <div className="work-list container">
        <HoverRevealList
          items={devProjects.map((p) => ({
            title: p.title,
            role: p.role,
            year: p.year,
            href: `/work/${p.slug}`,
            images: p.images,
            frameColor: p.frameColor,
            ratio: p.ratio,
          }))}
        />
      </div>

      <div className="work-foot container">
        <Link className="work-all magnetic" data-strength="16" to="/work">
          <span>View all work</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 17 17 7M8 7h9v9"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}

export default Work;
