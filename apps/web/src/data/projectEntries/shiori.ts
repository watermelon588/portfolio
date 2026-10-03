import type { ProjectEntry } from "../projectRegistry";
import laptop from "@/assets/Shiori (栞)/shiori-laptop-mockup-minimal.png";
import art1 from "@/assets/Shiori (栞)/art/a157-6f7482.webp";
import art2 from "@/assets/Shiori (栞)/art/a132-8db4bd.webp";
import art3 from "@/assets/Shiori (栞)/art/a060-ed65f3.webp";

export const project: ProjectEntry["project"] = {
  slug: "shiori",
  title: "Shiori (栞)",
  category: "dev",
  role: "Anime & Manga Hub",
  year: "2026",
  images: [laptop, art1, art2, art3],
  nextCaseImage: laptop,
  frameColor: "#245CFF",
  ratio: "5 / 4",
};

export const caseStudy: ProjectEntry["caseStudy"] = {
  tagline: "Your anime, kept like a bookmark.",
  live: "https://shiori-dusky.vercel.app/",
  github: "https://github.com/watermelon588/Shiori-",
  overview: "A private anime and manga hub that runs on your own computer. Stream, download single episodes or whole seasons, read manga and track with AniList. No ads, no Shiori (栞) account. A personal build of Seanime with its own interface, security layer and website.",
  sections: [
    { kicker: "Your own bookmark", title: "One program. Your computer.", body: "Run it, open it in your browser. It hosts no media and there is no Shiori (栞) account: your copy, your password, your folders." },
    { kicker: "Two worlds", title: "Nagi and Ranbu.", body: "A calm theme and a loud one, with the same navigation and behaviour. One switch." },
    { kicker: "The website", title: "Its own craft.", body: "A separately built static site in HTML, CSS and GSAP, with the original cast stage, manga wall and gallery wall." },
  ],
  metrics: [],
  stack: ["React 19", "TypeScript", "Go / Echo", "SQLite", "GSAP", "HTML / CSS"],
};
