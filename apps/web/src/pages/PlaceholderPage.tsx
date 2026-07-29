import { useRef } from "react";
import { Link } from "react-router";
import { Preloader } from "@/components/motion/Preloader";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/sections/Footer/Footer";
import { useMagnetic } from "@/components/motion/useMagnetic";
import "./PlaceholderPage.css";

// Reusable placeholder for routes that don't have a real page yet. Borrows the
// shared shell (Preloader + Navbar + Footer) so every nav link leads somewhere
// coherent with the site's language, even while empty.
export function PlaceholderPage({ title, index }: { title: string; index: string }) {
  const root = useRef<HTMLElement>(null);
  useMagnetic(root);

  return (
    <>
      <Preloader />
      <Navbar />
      <main className="placeholder" ref={root}>
        <div className="placeholder-inner container">
          <span className="placeholder-eyebrow">{index}</span>
          <h1 className="placeholder-title">{title}</h1>
          <p className="placeholder-copy">
            This page is being designed. The rest of the site is live — this one
            is next.
          </p>
          <Link className="placeholder-back magnetic" data-strength="22" to="/">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 12H5M12 19l-7-7 7-7"
              />
            </svg>
            <span>Back home</span>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default PlaceholderPage;
