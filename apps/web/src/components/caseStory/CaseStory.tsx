import { useEffect, type CSSProperties, type ReactNode, type RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./CaseStory.css";

gsap.registerPlugin(ScrollTrigger);

export type StoryAsset = { src: string; srcSet?: string; width: number; height: number };

// Used only by the Walkthru and TripVerse detail pages.
export function StoryImage({ asset, alt, label, title, kind = "photo", shape = "natural", priority = false, sizes = "(max-width: 700px) 100vw, 50vw", className = "" }: {
  asset: StoryAsset; alt: string; label: string; title: string; kind?: "photo" | "art" | "evidence";
  shape?: "natural" | "landscape" | "portrait" | "square"; priority?: boolean; sizes?: string; className?: string;
}) {
  return <div className={`story-image story-image--${kind} story-image--${shape} ${className}`} style={{ "--image-ratio": `${asset.width} / ${asset.height}` } as CSSProperties}>
    <figure className="story-image__frame" data-story-frame>
      <a href={asset.src} target="_blank" rel="noopener noreferrer" aria-label={`View full image: ${alt}`} className="story-image__link">
        <img src={asset.src} srcSet={asset.srcSet} sizes={sizes} alt={alt} width={asset.width} height={asset.height}
          loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} decoding="async" />
      </a>
      <figcaption className="story-image__copy"><span>{label}</span><strong>{title}</strong></figcaption>
    </figure>
  </div>;
}

export function StoryChapter({ number, title, children }: { number: string; title: ReactNode; children: ReactNode }) {
  return <header className="story-chapter" data-story-reveal><span className="dw-kicker">{number}</span><h2>{title}</h2><div className="story-chapter__body">{children}</div></header>;
}

export function StoryFilm({ src, poster, name }: { src: string; poster: string; name: string }) {
  return <figure className="story-film">
    <div className="story-film__heading"><span>{name} / Launch film</span><span>00:15 · Sound on</span></div>
    <video controls playsInline preload="none" poster={poster} width={1920} height={1080} aria-label={`${name} launch film`}>
      <source src={src} type="video/mp4" /><a href={src}>Watch the {name} launch film</a>
    </video>
    <figcaption>A small introduction to the idea. Play when you’re ready.</figcaption>
  </figure>;
}

export function useStoryMotion(root: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    if (!root.current) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".dw-hero-title", { y: 32, opacity: 0, duration: 1, ease: "power3.out" });
      root.current?.querySelectorAll<HTMLElement>("[data-story-reveal]").forEach((element) => {
        gsap.from(element, { y: 24, opacity: 0, duration: .8, ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 94%", once: true } });
      });
      root.current?.querySelectorAll<HTMLElement>("[data-story-frame]").forEach((frame) => {
        const photo = frame.parentElement?.classList.contains("story-image--photo");
        const target = photo ? frame.querySelector("img") : frame;
        if (!target) return;
        gsap.fromTo(target, photo ? { yPercent: -4, scale: 1.1 } : { y: () => window.innerWidth < 700 ? -10 : -20 }, {
          ...(photo ? { yPercent: 4, scale: 1.1 } : { y: () => window.innerWidth < 700 ? 10 : 20 }), ease: "none",
          scrollTrigger: { trigger: frame.parentElement, start: "top bottom", end: "bottom top", scrub: .7, invalidateOnRefresh: true },
        });
      });
    });
    return () => media.revert();
  }, { scope: root });

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    let alive = true;
    let frame = 0;
    const refresh = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => { if (alive) ScrollTrigger.refresh(); });
    };
    const images = element.querySelectorAll("img");
    images.forEach((img) => img.addEventListener("load", refresh));
    // Also covers the journal's height changes and responsive image frames.
    const observer = new ResizeObserver(refresh);
    observer.observe(element);
    document.fonts.ready.then(() => { if (alive) refresh(); });
    return () => { alive = false; cancelAnimationFrame(frame); observer.disconnect(); images.forEach((img) => img.removeEventListener("load", refresh)); };
  }, [root]);
}
