import type { ProjectEntry } from "../projectRegistry";
import plan from "@/assets/Tripverse/portfolio/screens/06-studio-plan.webp";
import studio from "@/assets/Tripverse/portfolio/compositions/09-one-trip-four-views.webp";
import sketch from "@/assets/Tripverse/portfolio/compositions/05-sketch-meets-studio.webp";
import laptop from "@/assets/Tripverse/mockups/tripverse-laptop-v1.png";

export const project: ProjectEntry["project"] = {
  slug: "tripverse", title: "TripVerse", category: "dev", role: "AI Travel Planner", year: "2026",
  images: [plan, studio, sketch], nextCaseImage: laptop, frameColor: "#717b61", ratio: "16 / 10",
};

export const caseStudy: ProjectEntry["caseStudy"] = {
  tagline: "Your next trip, taking shape.",
  live: "https://tripverse-0.vercel.app/",
  github: "https://github.com/watermelon588/Tripverse",
  overview: "A conversation becomes a trip you can see, change and carry. Two LangGraph planning modes feed one Studio: a day plan, hand-drawn sketchbook, map and 3D route, with a budget ledger and portable exports close at hand.",
  sections: [
    { kicker: "Build the days", title: "A first draft. Or one day at a time.", body: "Ask for a complete researched itinerary, or shape each day together with a guide." },
    { kicker: "One trip, four views", title: "Keep the whole journey in view.", body: "Plan, Sketchbook, Map and 3D share one trip document; edits leave a receipt." },
    { kicker: "The souvenir you keep", title: "Keep the feeling. Turn the page.", body: "Original independently controlled Memory Stack and Field Journal, with eight chapters and native page-turn interactions." },
  ],
  metrics: [],
  stack: ["React", "TypeScript", "GSAP", "Three.js", "FastAPI", "LangGraph", "Supabase / PostgreSQL"],
};
