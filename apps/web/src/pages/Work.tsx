import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/sections/Footer/Footer";
import FlowingMenu from "@/components/vendor/reactbits/FlowingMenu/FlowingMenu";
import { projects, toMenuItems } from "@/data/projects";
import "./WorkPage.css";

// Dedicated projects index (/work). Same Flowing Menu language as the home
// "Selected Work" strip, given the full viewport. Case-study routes land later.
export function Work() {
  return (
    <>
      <Navbar />
      <main className="workpage">
        <header className="workpage-head container">
          <span className="workpage-index">{String(projects.length).padStart(2, "0")} Projects</span>
          <h1 className="workpage-title">
            Selected <em>work</em>
          </h1>
          <p className="workpage-lead">
            A handful of things I&rsquo;ve designed and shipped — from AI tools to
            realtime apps. Hover a title to preview.
          </p>
        </header>

        <div className="workpage-menu">
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

        <Footer />
      </main>
    </>
  );
}

export default Work;
