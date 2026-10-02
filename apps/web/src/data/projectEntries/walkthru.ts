import type { ProjectEntry } from "../projectRegistry";
import dashboard from "@/assets/Walktru/hero-dashboard.webp";
import report from "@/assets/Walktru/report.png";
import secondLook from "@/assets/Walktru/portfolio/the-second-look.webp";
import laptop from "@/assets/Walktru/mockups/walkthru-laptop-v1.png";

export const project: ProjectEntry["project"] = {
  slug: "walkthru",
  title: "Walkthru",
  category: "dev",
  role: "AI Browser Agent",
  year: "2026",
  images: [dashboard, secondLook, report],
  nextCaseImage: laptop,
  frameColor: "#4d7274",
  ratio: "16 / 10",
};

export const caseStudy: ProjectEntry["caseStudy"] = {
  tagline: "Fresh eyes. Before you launch.",
  github: "https://github.com/watermelon588/Walkthru",
  overview: "An AI test user walks through your real app inside Chrome, records the friction, and turns evidence into a fix your coding agent can use. Browser journeys, search readiness and passive hygiene come together in one grounded report.",
  sections: [
    { kicker: "Browser journeys", title: "See it through someone else's eyes.", body: "A goal and a test persona guide a bounded browser journey, with screenshots and step-level evidence." },
    { kicker: "Grounded reports", title: "From stuck to specific.", body: "Journey findings sit alongside SEO, AI search readiness, accessibility, performance and passive security checks." },
    { kicker: "The repair loop", title: "Find. Fix. Try again.", body: "An evidence-based fix prompt and MCP editor handoff connect the report to a rerun comparison." },
  ],
  metrics: [],
  stack: ["React", "TypeScript", "WXT / Chrome MV3", "FastAPI", "LangGraph", "Supabase / PostgreSQL", "MCP"],
};
