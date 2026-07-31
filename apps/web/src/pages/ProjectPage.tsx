import { useRef, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Preloader } from "@/components/motion/Preloader";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/sections/Footer/Footer";
import { useMagnetic } from "@/components/motion/useMagnetic";
import { projects } from "@/data/projects";
import { caseStudies } from "@/data/caseStudies";
import "./ProjectPage.css";

gsap.registerPlugin(ScrollTrigger);

export function ProjectPage() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const cs = slug ? caseStudies[slug] : undefined;

  const root = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const heroFrameRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const nextSectionRef = useRef<HTMLDivElement>(null);
  const nextCurveRef = useRef<SVGPathElement>(null);

  // Apply general magnetic force to elements within page
  useMagnetic(root, [slug]);

  // Interactive Particle/Graphics Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Dynamic wave/noise nodes class
    class Node {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      vx: number;
      vy: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 2 + 1;
        this.vx = Math.random() * 0.4 - 0.2;
        this.vy = Math.random() * 0.4 - 0.2;
      }

      update(mx: number, my: number) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // Displace points near mouse cursor
        const dx = mx - this.x;
        const dy = my - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          const force = (130 - dist) / 130;
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * force * 3;
          this.y -= Math.sin(angle) * force * 3;
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.fillStyle = "rgba(0, 73, 205, 0.45)"; // Accent blue color
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fill();
      }
    }

    const nodeCount = Math.min(100, Math.floor((width * height) / 16000));
    const nodes: Node[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push(new Node());
    }

    let mx = -1000;
    let my = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)"; // Leave trace tail
      ctx.fillRect(0, 0, width, height);

      nodes.forEach((n) => {
        n.update(mx, my);
        n.draw(ctx);
      });

      // Connect nodes with thin lines
      ctx.strokeStyle = "rgba(0, 73, 205, 0.09)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const nI = nodes[i];
          const nJ = nodes[j];
          if (!nI || !nJ) continue;
          const dx = nI.x - nJ.x;
          const dy = nI.y - nJ.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(nI.x, nI.y);
            ctx.lineTo(nJ.x, nJ.y);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [slug]);

  // Master GSAP scroll orchestration
  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      const heroFrame = heroFrameRef.current;
      const track = trackRef.current;
      if (!project || !wrapper || !heroFrame || !track) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      const created: Array<ScrollTrigger | undefined> = [];
      const w = window.innerWidth;
      const h = window.innerHeight;
      const trackWidth = track.scrollWidth;

      // Pin the overall wrapper and coordinate zoom + horizontal scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: () => `+=${h * 1.5 + (trackWidth - w)}`,
          pin: true,
          scrub: 1.0,
          invalidateOnRefresh: true,
        },
      });

      // Phase 1: Dimensional shifting zoom-in portal
      tl.to(heroFrame, {
        scale: 6.5,
        borderRadius: "0px",
        ease: "power2.inOut",
        duration: 1.8,
      })
        .to(
          heroTextRef.current,
          {
            opacity: 0,
            y: -60,
            scale: 0.94,
            ease: "power2.inOut",
            duration: 1.3,
          },
          0
        )
        .fromTo(
          track,
          {
            autoAlpha: 0,
            scale: 0.88,
          },
          {
            autoAlpha: 1,
            scale: 1,
            ease: "power2.inOut",
            duration: 1.3,
          },
          0.6
        )
        // Zoom transition covers viewport completely -> hide hero frame to emerge in details
        .to(
          heroFrame,
          {
            opacity: 0,
            duration: 0.3,
          },
          1.5
        )

        // Phase 2: Horizontal scroll
        .to(track, {
          x: () => -(trackWidth - w),
          ease: "none",
          duration: 3.5,
        });

      // Gallery Parallax effect during horizontal track scroll
      const items = gsap.utils.toArray<HTMLElement>(".pp-gallery-item img");
      items.forEach((img) => {
        const tw = gsap.fromTo(
          img,
          { xPercent: -14 },
          {
            xPercent: 14,
            ease: "none",
            scrollTrigger: {
              trigger: wrapper,
              start: () => `top+=${h * 1.5} top`,
              end: "bottom bottom",
              scrub: true,
            },
          }
        );
        created.push(tw.scrollTrigger);
      });

      // Metrics bounce reveal on scroll trigger
      const metrics = gsap.utils.toArray<HTMLElement>(".pp-metric-card");
      if (metrics.length > 0) {
        const tw = gsap.from(metrics, {
          scale: 0.6,
          opacity: 0,
          y: 40,
          stagger: 0.1,
          ease: "elastic.out(1, 0.4)",
          duration: 1.6,
          scrollTrigger: {
            trigger: ".pp-slide-metrics",
            start: "left 70%",
            containerAnimation: tl,
          },
        });
        created.push(tw.scrollTrigger);
      }

      // Next Project Curve edge reveal (matching footer/preloader curve)
      const nextCurve = nextCurveRef.current;
      if (nextCurve && nextSectionRef.current) {
        const drawCurve = (p: number) => {
          const q = Math.min(1, Math.max(0, p));
          const top = 100 * (1 - q);
          const bulge = Math.sin(q * Math.PI) * 36;
          const ctrl = top - bulge;
          nextCurve.setAttribute("d", `M 0 ${top} Q 50 ${ctrl} 100 ${top} L 100 100 L 0 100 Z`);
        };
        drawCurve(0);

        const stCurve = ScrollTrigger.create({
          trigger: nextSectionRef.current,
          start: "top bottom",
          end: "top top",
          scrub: 1.0,
          onUpdate: (self) => drawCurve(self.progress),
        });
        created.push(stCurve);
      }

      return () => {
        created.forEach((t) => t?.kill());
      };
    },
    { scope: root, dependencies: [slug, project] }
  );

  if (!project) return <Navigate to="/work" replace />;

  // Find next project in the workspace array
  const dev = projects.filter((p) => p.category === "dev");
  const idx = dev.findIndex((p) => p.slug === project.slug);
  const next = (dev.length ? dev[(Math.max(0, idx) + 1) % dev.length] : project) ?? project;

  // Sequential chapter numbering across every slide in the horizontal track, so
  // the kicker index stays coherent no matter which slides a project has.
  let step = 0;
  const chapter = (label: string) => `${String(++step).padStart(2, "0")} — ${label}`;
  const kickerLabel = (k: string) => (k.includes("—") ? k.split("—")[1]!.trim() : k.trim());

  return (
    <>
      <Preloader text={project.title} />
      <Navbar />

      <canvas className="pp-canvas" ref={canvasRef} />

      <main className="pp-new" ref={root}>
        {/* Pinned animation wrapper (Hero Zoom + Horizontal track) */}
        <div className="pp-pin-wrapper" ref={wrapperRef}>
          {/* Hero section — first dimension */}
          <section className="pp-hero-sec">
            <div className="pp-hero-banner">
              <div className="pp-hero-frame" ref={heroFrameRef}>
                {project.images[0] && (
                  <img className="pp-hero-img-new" src={project.images[0]} alt={project.title} />
                )}
              </div>
              <div className="pp-hero-text" ref={heroTextRef}>
                <span className="pp-hero-eyebrow-new">{project.role}</span>
                <h1 className="pp-hero-title-new">{project.title}</h1>
                {cs && <p className="pp-hero-tagline-new">{cs.tagline}</p>}
                <div className="pp-scroll-indicator">
                  <span className="pp-scroll-arrow">↓</span> Scroll to enter dimension
                </div>
              </div>
            </div>
          </section>

          {/* Horizontal slider — second dimension */}
          <div className="pp-horizontal-scroll-container">
            <div className="pp-horizontal-track" ref={trackRef}>
              {/* Slide 1: Overview */}
              <div className="pp-slide pp-slide-overview">
                <div className="pp-slide-inner">
                  <span className="pp-slide-kicker">{chapter("Overview")}</span>
                  <h2 className="pp-slide-title">The gist</h2>
                  {cs && <p className="pp-overview-lede">{cs.overview}</p>}
                  <div className="pp-meta-links-new">
                    {cs?.live && (
                      <a
                        className="pp-pill-new magnetic"
                        data-strength="18"
                        href={cs.live}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Live site ↗
                      </a>
                    )}
                    {cs?.github && (
                      <a
                        className="pp-pill-new magnetic"
                        data-strength="18"
                        href={cs.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GitHub ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Story chapters — the detailed case study, one slide per section */}
              {cs?.sections.map((s, i) => (
                <div className="pp-slide pp-slide-story" key={i}>
                  <div className="pp-slide-inner">
                    <span className="pp-slide-kicker">{chapter(kickerLabel(s.kicker))}</span>
                    <h2 className="pp-story-title">{s.title}</h2>
                    <p className="pp-story-body">{s.body}</p>
                  </div>
                </div>
              ))}

              {/* Metrics */}
              {cs && cs.metrics.length > 0 && (
                <div className="pp-slide pp-slide-metrics">
                  <div className="pp-slide-inner">
                    <span className="pp-slide-kicker">{chapter("Impact")}</span>
                    <h2 className="pp-slide-title">Key Indicators</h2>
                    <div className="pp-metrics-grid">
                      {cs.metrics.map((m, i) => (
                        <div className="pp-metric-card" key={i}>
                          <span className="pp-metric-val-new">{m.value}</span>
                          <span className="pp-metric-lbl-new">{m.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Slide 3: Gallery */}
              {project.images.length > 1 && (
                <div className="pp-slide pp-slide-gallery">
                  <div className="pp-slide-inner">
                    <span className="pp-slide-kicker">{chapter("Interface")}</span>
                    <h2 className="pp-slide-title">Visual Layouts</h2>
                    <div className="pp-gallery-horizontal">
                      {project.images.slice(1).map((img, i) => (
                        <div className="pp-gallery-item" key={i} style={{ backgroundColor: project.frameColor }}>
                          <img src={img} alt="" loading="lazy" draggable={false} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Slide 4: Tech Stack */}
              {cs && cs.stack.length > 0 && (
                <div className="pp-slide pp-slide-stack">
                  <div className="pp-slide-inner">
                    <span className="pp-slide-kicker">{chapter("Core Stack")}</span>
                    <h2 className="pp-slide-title">Technology Fused</h2>
                    <div className="pp-stack-chips">
                      {cs.stack.map((t) => (
                        <div className="pp-stack-chip-wrap magnetic" data-strength="14" key={t}>
                          <span className="pp-stack-chip">{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Transition into Next Project — third dimension */}
        <section className="pp-next-section" ref={nextSectionRef}>
          <div className="pp-next-curve">
            <svg className="pp-next-curve-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path ref={nextCurveRef} className="pp-next-curve-path" />
            </svg>
          </div>
          <div className="pp-next-body container">
            <Link className="pp-next-link-new magnetic" data-strength="34" to={`/work/${next.slug}`}>
              <span className="pp-next-eyebrow">Next project</span>
              <h2 className="pp-next-title-new">{next.title}</h2>
              <div className="pp-next-preview" style={{ backgroundColor: next.frameColor }}>
                {next.images[0] && <img src={next.images[0]} alt={next.title} />}
              </div>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default ProjectPage;
