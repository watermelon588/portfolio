import { useRef, useEffect, useState, type MouseEvent } from "react";
import { gsap } from "gsap";

import "./FlowingMenu.css";

// Vendored from ReactBits (FlowingMenu — JS+CSS variant), converted to
// TypeScript for this codebase. Behaviour is preserved verbatim: closest-edge
// enter/leave marquee reveal + seamless GSAP marquee loop.
//
// Two deliberate deviations from the source:
//  1. All classes are namespaced `fm-*`. The original used a bare `.menu`
//     class, which collided with the Navbar's full-screen `.menu` overlay and
//     forced every row to 100vh. Namespacing keeps the component self-contained.
//  2. The marquee image is asset-driven (ADR-017) — the image strip only renders
//     when an `image` is supplied, so projects without artwork degrade to a
//     clean dotted marquee instead of a broken `url()`.

export interface FlowingMenuItem {
  link: string;
  text: string;
  image?: string;
}

export interface FlowingMenuProps {
  items?: FlowingMenuItem[];
  /** Marquee loop duration in seconds (lower = faster). */
  speed?: number;
  textColor?: string;
  bgColor?: string;
  marqueeBgColor?: string;
  marqueeTextColor?: string;
  borderColor?: string;
}

function FlowingMenu({
  items = [],
  speed = 15,
  textColor = "#fff",
  bgColor = "#120F17",
  marqueeBgColor = "#fff",
  marqueeTextColor = "#120F17",
  borderColor = "#fff",
}: FlowingMenuProps) {
  return (
    <div className="fm-wrap" style={{ backgroundColor: bgColor }}>
      <nav className="fm-menu">
        {items.map((item, idx) => (
          <MenuItem
            key={idx}
            {...item}
            speed={speed}
            textColor={textColor}
            marqueeBgColor={marqueeBgColor}
            marqueeTextColor={marqueeTextColor}
            borderColor={borderColor}
          />
        ))}
      </nav>
    </div>
  );
}

interface MenuItemProps extends FlowingMenuItem {
  speed: number;
  textColor: string;
  marqueeBgColor: string;
  marqueeTextColor: string;
  borderColor: string;
}

function MenuItem({
  link,
  text,
  image,
  speed,
  textColor,
  marqueeBgColor,
  marqueeTextColor,
  borderColor,
}: MenuItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeInnerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const [repetitions, setRepetitions] = useState(4);

  const animationDefaults = { duration: 0.6, ease: "expo" };

  const findClosestEdge = (mouseX: number, mouseY: number, width: number, height: number) => {
    const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0);
    const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height);
    return topEdgeDist < bottomEdgeDist ? "top" : "bottom";
  };

  const distMetric = (x: number, y: number, x2: number, y2: number) => {
    const xDiff = x - x2;
    const yDiff = y - y2;
    return xDiff * xDiff + yDiff * yDiff;
  };

  useEffect(() => {
    const calculateRepetitions = () => {
      if (!marqueeInnerRef.current) return;

      const marqueeContent = marqueeInnerRef.current.querySelector<HTMLElement>(".fm-part");
      if (!marqueeContent) return;

      const contentWidth = marqueeContent.offsetWidth;
      // Before layout, offsetWidth can be 0 → viewport/0 = Infinity, which makes
      // `Array(repetitions)` throw a RangeError. Bail and keep the default until
      // the row has real width.
      if (!contentWidth) return;
      const viewportWidth = window.innerWidth;

      // How many copies to fill the viewport + extra for a seamless loop.
      const needed = Math.ceil(viewportWidth / contentWidth) + 2;
      setRepetitions(Math.max(4, Math.min(needed, 40)));
    };

    calculateRepetitions();
    window.addEventListener("resize", calculateRepetitions);
    return () => window.removeEventListener("resize", calculateRepetitions);
  }, [text, image]);

  useEffect(() => {
    const setupMarquee = () => {
      if (!marqueeInnerRef.current) return;

      const marqueeContent = marqueeInnerRef.current.querySelector<HTMLElement>(".fm-part");
      if (!marqueeContent) return;

      const contentWidth = marqueeContent.offsetWidth;
      if (contentWidth === 0) return;

      if (animationRef.current) {
        animationRef.current.kill();
      }

      // Animate exactly one content width for a seamless loop.
      animationRef.current = gsap.to(marqueeInnerRef.current, {
        x: -contentWidth,
        duration: speed,
        ease: "none",
        repeat: -1,
      });
    };

    // Small delay to ensure DOM is ready after repetitions update.
    const timer = setTimeout(setupMarquee, 50);

    return () => {
      clearTimeout(timer);
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [text, image, repetitions, speed]);

  const handleMouseEnter = (ev: MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    gsap
      .timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" }, 0)
      .set(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: "0%" }, 0);
  };

  const handleMouseLeave = (ev: MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    gsap
      .timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" }, 0)
      .to(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" }, 0);
  };

  return (
    <div className="fm-item" ref={itemRef} style={{ borderColor }}>
      <a
        className="fm-link"
        href={link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ color: textColor }}
      >
        {text}
      </a>
      <div className="fm-marquee" ref={marqueeRef} style={{ backgroundColor: marqueeBgColor }}>
        <div className="fm-marquee-innerwrap">
          <div className="fm-marquee-inner" ref={marqueeInnerRef} aria-hidden="true">
            {[...Array(repetitions)].map((_, idx) => (
              <div className="fm-part" key={idx} style={{ color: marqueeTextColor }}>
                <span>{text}</span>
                {image ? (
                  <div className="fm-img" style={{ backgroundImage: `url(${image})` }} />
                ) : (
                  <span className="fm-dot" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlowingMenu;
