import type { ProjectEntry } from "../projectRegistry";
import laptop from "@/assets/Shiori (栞)/portfolio/thumbs/laptop.webp";
import pig from "@/assets/Shiori (栞)/portfolio/thumbs/pig.webp";
import tiger from "@/assets/Shiori (栞)/portfolio/thumbs/tiger.webp";

export const project: ProjectEntry["project"] = {
  slug: "shiori", title: "Shiori", category: "dev", role: "Anime & Manga Hub", year: "2026",
  // Rohit's brief: one laptop mockup plus two plain brand visuals.
  images: [laptop, pig, tiger], nextCaseImage: laptop, frameColor: "#245CFF", ratio: "5 / 4",
};

export const caseStudy: ProjectEntry["caseStudy"] = {
  tagline: "Your anime, kept like a bookmark.",
  live: "https://shiori-dusky.vercel.app/",
  github: "https://github.com/watermelon588/Shiori-",
  overview: "A private anime and manga hub that runs on your own computer. Stream, download single episodes or whole seasons, read manga and track with AniList. No ads, no Shiori account. A personal build of Seanime with its own interface, security layer and website.",
  sections: [
    { kicker: "Your own bookmark", title: "One program. Your computer.", body: "Run it, open it in your browser. It hosts no media and there is no Shiori account: your copy, your password, your folders." },
    { kicker: "Two worlds", title: "Nagi and Ranbu.", body: "A calm theme and a loud one, with the same navigation and behaviour. One switch." },
    { kicker: "The website", title: "Its own craft.", body: "A separately built static site in HTML, CSS and GSAP, with the original cast stage, manga wall and gallery wall." },
  ],
  metrics: [],
  stack: ["React 19", "TypeScript", "Go / Echo", "SQLite", "GSAP", "HTML / CSS"],
};
