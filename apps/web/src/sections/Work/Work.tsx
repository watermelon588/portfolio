import { Link } from "react-router";
import FlowingMenu from "@/components/vendor/reactbits/FlowingMenu/FlowingMenu";
import ScrollReveal from "@/components/vendor/reactbits/ScrollReveal/ScrollReveal";
import { projects, toMenuItems } from "@/data/projects";
import "./Work.css";

// Selected Work — the home-page index of projects, built on the ReactBits
// Flowing Menu (DESIGN_SYSTEM Part VI). Themed to the approved palette: quiet
// light rows, accent-blue marquee reveal on hover. Full catalogue lives on /work.
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

      <div className="work-menu">
        <FlowingMenu
          items={toMenuItems(projects)}
          speed={18}
          textColor="#000000"
          bgColor="#F4F4F4"
          marqueeBgColor="#0049CD"
          marqueeTextColor="#FFFFFF"
          borderColor="rgba(0, 0, 0, 0.14)"
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
