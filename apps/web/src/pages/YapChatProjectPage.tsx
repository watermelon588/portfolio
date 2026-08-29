import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Preloader } from "@/components/motion/Preloader";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/sections/Footer/Footer";
import { useMagnetic } from "@/components/motion/useMagnetic";
import { projects } from "@/data/projects";
import { caseStudies } from "@/data/caseStudies";
import {
  FeatureShowcase,
  type ShowcaseItem,
} from "@/components/FeatureShowcase/FeatureShowcase";

// Asset imports for Yap Chat
import yap1 from "@/assets/Yap chat/assets/yapchat1.png";
import yap2 from "@/assets/Yap chat/assets/yapchat2.png";
import yap3 from "@/assets/Yap chat/assets/yapchat3.png";
import yap4 from "@/assets/Yap chat/assets/yapchat4.png";
import yap5 from "@/assets/Yap chat/assets/yapchat5.png";
import yap6 from "@/assets/Yap chat/assets/yapchat6.png";
import yap7 from "@/assets/Yap chat/assets/yapchat7.png";
import yap8 from "@/assets/Yap chat/assets/yapchat8.jpg";
import yapFrame498 from "@/assets/Yap chat/assets/Frame 498.jpg";
import yapPreview from "@/assets/Yap chat/assets/Preview.jpg";
import yapPreview1 from "@/assets/Yap chat/assets/Preview1.jpg";
import yapLogo from "@/assets/Yap chat/assets/logo7.png";

// Gallery folder imports
import yapGalCottonbro from "@/assets/Yap chat/assets/gallery/pexels-cottonbro-7013900.jpg";
import yapGalJibarofoto from "@/assets/Yap chat/assets/gallery/pexels-jibarofoto-14001854.jpg";
import yapGalKetut from "@/assets/Yap chat/assets/gallery/pexels-ketut-subiyanto-4901947.jpg";
import yapGalRdne from "@/assets/Yap chat/assets/gallery/pexels-rdne-6669782.jpg";
import yapGalHash1 from "@/assets/Yap chat/assets/gallery/07c45aad13c58d2f53dba964fa7b7816.jpg";
import yapGalHash2 from "@/assets/Yap chat/assets/gallery/a9c24c821f664c370a5272d3ab05321a.jpg";
import yapGalHash3 from "@/assets/Yap chat/assets/gallery/1f8b5eafb4ff32b81e02a82a89e93e8b.jpg";
import yapGalHash5 from "@/assets/Yap chat/assets/gallery/9541818385c557414266cad685e7faab.jpg";

// Visual folder imports
import yapVisHash1 from "@/assets/Yap chat/assets/visual/4037eab981a9e471accefeb98675d2db.jpg";
import yapVisHash2 from "@/assets/Yap chat/assets/visual/488dd91ca1e7e80a1084b46e46b85e07.jpg";
import yapVisHash3 from "@/assets/Yap chat/assets/visual/611d5494829ac5407c24de5e693b672d.jpg";
import yapVisHash4 from "@/assets/Yap chat/assets/visual/a088b80ccfec0e179acd479aa4f1d3a7.jpg";
import yapVisHash5 from "@/assets/Yap chat/assets/visual/b01f8db8fd947d60422e219b1bd16405.jpg";

export const yapGalleryImages = [
  yap1,
  yap2,
  yap3,
  yap4,
  yap5,
  yap6,
  yap7,
  yap8,
  yapFrame498,
  yapPreview,
  yapPreview1,
  yapLogo,
  yapGalCottonbro,
  yapGalJibarofoto,
  yapGalKetut,
  yapGalRdne,
  yapGalHash1,
  yapGalHash2,
  yapVisHash1,
  yapVisHash2,
  yapVisHash3,
  yapVisHash4,
  yapVisHash5,
];

export const yapShowcaseItems: ShowcaseItem[] = [
  {
    image: yap2,
    title: "Real-Time Room Messaging",
    tag: "FEATURE 01",
    description:
      "Instant message delivery via Socket.IO with typing indicators and online/offline presence.",
    objectPosition: "center top",
  },
  {
    image: yap3,
    title: "Voice Notes & Media Sharing",
    tag: "FEATURE 02",
    description:
      "Record, pause, replay and discard voice notes before sending, alongside photo attachments in the media panel.",
    objectPosition: "center top",
  },
  {
    image: yap7,
    title: "Private Code-Based Invites",
    tag: "FEATURE 03",
    description:
      "Join rooms instantly via custom room codes, invite links, or scannable QR codes.",
    objectPosition: "center top",
  },
  {
    image: yap6,
    title: "Group Call Signalling & Controls",
    tag: "FEATURE 04",
    description:
      "Seamless WebRTC peer connections with live mic, video, screen share, and in-call chat controls.",
    objectPosition: "center top",
  },
  {
    image: yap4,
    title: "Media Panel & Shared Assets",
    tag: "FEATURE 05",
    description:
      "Dedicated room media view for instant access to shared photos, voice notes, and room resources.",
    objectPosition: "center top",
  },
];

import "./ProjectPage.css";
import "./YapChatProjectPage.css";

gsap.registerPlugin(ScrollTrigger);

function ArrowUpRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      style={{ width: "100%", height: "100%" }}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 17 17 7M8 7h9v9"
      />
    </svg>
  );
}

export function YapChatProjectPage() {
  const root = useRef<HTMLElement>(null);
  const slug = "yapchat";
  const project = projects.find((p) => p.slug === "yapchat");
  const cs = caseStudies["yapchat"];

  const dev = projects.filter((p) => p.category === "dev");
  const idx = dev.findIndex((p) => p.slug === "yapchat");
  const nextProjectObj = dev.length
    ? (dev[(Math.max(0, idx) + 1) % dev.length] ?? dev[0])
    : undefined;

  const nextProjectForFooter = nextProjectObj
    ? {
        title: nextProjectObj.title,
        slug: nextProjectObj.slug,
        image: nextProjectObj.images[0],
        role: nextProjectObj.role,
      }
    : undefined;

  useMagnetic(root, [slug]);

  // Master GSAP Parallax & Reveal Animations
  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduce || !root.current) return;

      const created: Array<ScrollTrigger | undefined> = [];

      // 1. Hero Text Fade + Reveal
      const heroTitle = root.current.querySelector(".dw-hero-title");
      if (heroTitle) {
        gsap.fromTo(
          heroTitle,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" },
        );
      }

      // 2. Parallax on Media Elements & Image Containers
      const parallaxImgs = gsap.utils.toArray<HTMLElement>(
        ".dw-media-img, .media-portrait, .media-portrait-full, .media-landscape, .media-square, .media-natural, .yap-hero-img, .yap-overlap-img, .yap-fullbleed-img, .dw-media-container img",
      );
      parallaxImgs.forEach((img) => {
        const frame =
          img.closest(".dw-media-container") ||
          img.closest(".yap-hero-video-wrap") ||
          img.closest(".yap-overlap-container") ||
          img.closest(".yap-fullbleed-img-wrap") ||
          img.parentElement;
        if (!frame) return;

        const tw = gsap.fromTo(
          img,
          { yPercent: -8, scale: 1.05 },
          {
            yPercent: 8,
            scale: 1.0,
            ease: "none",
            scrollTrigger: {
              trigger: frame,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
        created.push(tw.scrollTrigger);
      });

      // 3. Section Kickers, Headings, Text Blocks, and Cards Reveal Animation
      const sections = gsap.utils.toArray<HTMLElement>(".dw-section");
      sections.forEach((sec) => {
        const kicker = sec.querySelector(".dw-kicker");
        const heading = sec.querySelector(
          ".dw-heading-lg, .dw-heading-md, .dw-scale-number, .dw-conclusion-lead, .dw-hero-title",
        );
        const textBlocks = sec.querySelectorAll(
          ".dw-body-lg, .dw-body-muted, .dw-hero-tagline, .yap-hero-subtext",
        );
        const cards = sec.querySelectorAll(
          ".dw-arch-card, .dw-stat-card, .dw-decision-item, .yap-stat-item, .yap-scale-item",
        );

        if (kicker || heading || textBlocks.length > 0 || cards.length > 0) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sec,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          });

          if (kicker) {
            tl.fromTo(
              kicker,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
            );
          }
          if (heading) {
            tl.fromTo(
              heading,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
              kicker ? "-=0.4" : 0,
            );
          }
          if (textBlocks.length > 0) {
            tl.fromTo(
              textBlocks,
              { opacity: 0, y: 25 },
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.12,
                ease: "power2.out",
              },
              "-=0.5",
            );
          }
          if (cards.length > 0) {
            tl.fromTo(
              cards,
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.1,
                ease: "power2.out",
              },
              "-=0.4",
            );
          }
          created.push(tl.scrollTrigger);
        }
      });

      return () => {
        created.forEach((t) => t?.kill());
      };
    },
    { scope: root, dependencies: [slug] },
  );

  return (
    <>
      <Preloader text="Yap Chat" />
      <Navbar />

      <main className="dw-case-study" ref={root}>
        {/* 01 — HERO / PROJECT IDENTITY */}
        <section
          className="dw-section container"
          style={{ paddingBottom: "2rem" }}
        >
          <span className="dw-kicker">
            01 — PRIVATE REAL-TIME COMMUNICATION
          </span>
          <h1 className="dw-hero-title">YAP CHAT</h1>
          <p className="dw-hero-tagline">A private place to actually yap.</p>
          <p className="dw-body-lg" style={{ marginTop: "-1.5rem" }}>
            Code-based chat rooms for people who want to talk, share, send voice
            notes, and jump into a video call without turning everything into a
            social network.
          </p>
        </section>

        {/* DIVIDER AND BUTTONS */}
        <section
          className="container"
          style={{ position: "relative", marginBottom: "4rem" }}
        >
          <span className="footer-stripe" />
          <div className="footer-cta-row">
            <div className="footer-contacts">
              {cs?.github && (
                <a
                  className="footer-pill magnetic"
                  data-strength="24"
                  href={cs.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>GitHub Repository ↗</span>
                </a>
              )}
            </div>

            {cs?.live && (
              <a
                className="footer-round magnetic"
                data-strength="42"
                href={cs.live}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="footer-round-label">Live site</span>
                <span className="footer-round-arrow">
                  <ArrowUpRight />
                </span>
              </a>
            )}
          </div>
        </section>

        {/* METADATA GRID */}
        <section
          className="container"
          style={{ marginBottom: "clamp(3rem, 6vh, 5rem)" }}
        >
          <div className="dw-meta-grid">
            <div className="dw-meta-item">
              <span className="dw-meta-label">ROLE</span>
              <span className="dw-meta-value">Fullstack Developer</span>
            </div>
            <div className="dw-meta-item">
              <span className="dw-meta-label">TIMELINE</span>
              <span className="dw-meta-value">{project?.year ?? "2025"}</span>
            </div>
            <div className="dw-meta-item">
              <span className="dw-meta-label">STACK</span>
              <span className="dw-meta-value">MERN + Socket.IO + WebRTC</span>
            </div>
            <div className="dw-meta-item">
              <span className="dw-meta-label">COMMUNICATION</span>
              <span className="dw-meta-value">Realtime &amp; P2P</span>
            </div>
          </div>
        </section>

        {/* 02 — HERO MEDIA (FULL-WIDTH 100VW HERO VISUAL) */}
        <section
          className="dw-section dw-preview-section"
          style={{ paddingInline: 0, paddingBottom: "clamp(5rem, 10vh, 9rem)" }}
        >
          <div className="yap-hero-video-wrap">
            <img
              src={yapGalKetut}
              alt="Yap Chat Main Interface Overview"
              className="yap-hero-img"
            />
            <div className="yap-hero-overlay" />
            <div className="yap-hero-content">
              <div className="dw-media-catchphrase">
                ✦ ROOMS YOU ACTUALLY CONTROL
              </div>
              <p className="yap-hero-subtext">
                Code-based room identity — share the code, invite your people,
                and talk.
              </p>
            </div>
          </div>
        </section>

        {/* 03 — WHY YAP CHAT EXISTS */}
        <section className="dw-section container">
          <span className="dw-kicker">02 — WHY I BUILT IT</span>
          <h2 className="dw-heading-lg">
            THE INTERNET HAS ENOUGH PLACES TO TALK.
            <br />I WANTED ONE THAT FELT PRIVATE.
          </h2>
          <p className="dw-body-lg">
            Most communication products assume the room already exists: a
            follower graph, a giant server, a group chat with fifty people, or
            another feed waiting to steal the evening.
          </p>
          <p
            className="dw-body-muted"
            style={{ marginTop: "0.5rem", marginBottom: "3rem" }}
          >
            Yap Chat starts somewhere smaller: Create a room. Share the code.
            Let the people you actually want in. Then talk. Underneath that
            simple interaction is a real-time system handling authentication,
            room membership, message delivery, presence and media.
          </p>

          <div className="dw-media-grid-2col">
            <div className="dw-media-container">
              <img
                src={yapGalHash1}
                alt="Yap Chat Sidebar and Room Code Entry"
                className="media-landscape"
                style={{ objectFit: "contain", height: "auto" }}
              />
            </div>
            <div className="dw-media-container">
              <img
                src={yapGalHash3}
                alt="Private room collaboration"
                className="media-landscape"
                style={{ objectFit: "contain", height: "auto" }}
              />
            </div>
          </div>
        </section>

        {/* 04 — REAL-TIME MESSAGING */}
        <section className="dw-section container">
          <span className="dw-kicker">03 — REAL-TIME, WITHOUT THE NOISE</span>
          <h2 className="dw-heading-lg">
            TEXT. PHOTOS. VOICE NOTES. SAME ROOM.
          </h2>
          <p className="dw-body-lg">
            Messages move through Socket.IO, so the room updates in real time
            instead of waiting for refreshes or polling to catch up. Photos live
            in the media panel, while voice notes can be recorded, paused,
            replayed and discarded before sending.
          </p>
          <p
            className="dw-body-muted"
            style={{ marginTop: "0.5rem", marginBottom: "3rem" }}
          >
            Presence and unseen-message counts keep the room feeling alive —
            because apparently “seen 2 minutes ago” is already enough emotional
            damage.
          </p>

          <FeatureShowcase
            className="yap-feature-showcase"
            items={yapShowcaseItems}
            defaultIndex={0}
          />
        </section>

        {/* 05 — VIDEO CALLING */}
        <section
          className="dw-section dw-preview-section"
          style={{ paddingInline: 0 }}
        >
          <div className="yap-overlap-container">
            <img
              src={yapGalJibarofoto}
              alt="Yap Chat Group Video Call Interface"
              className="yap-overlap-img"
            />
            <div className="yap-overlap-overlay" />
            <div className="yap-overlap-content">
              <span
                className="dw-kicker"
                style={{
                  color: "rgba(255, 255, 255, 0.76)",
                  marginBottom: "1rem",
                }}
              >
                04 — THEN IT GOT LOUDER
              </span>
              <h2
                className="dw-heading-lg"
                style={{ color: "#ffffff", marginBottom: "1.75rem" }}
              >
                CHAT IS NICE. EIGHT PEOPLE ON VIDEO IS ANOTHER STORY.
              </h2>
              <p
                className="dw-body-lg"
                style={{
                  color: "rgba(255, 255, 255, 0.95)",
                  maxWidth: "60ch",
                  marginBottom: "1.5rem",
                }}
              >
                A chat can turn into a group call without leaving the room. The
                call stack uses WebRTC mesh connections, while Socket.IO handles
                the signalling needed to get peers connected.
              </p>
              <p
                className="dw-body-muted"
                style={{
                  color: "rgba(255, 255, 255, 0.8)",
                  maxWidth: "52ch",
                  margin: 0,
                }}
              >
                Mic/camera controls, screen sharing, emoji reactions,
                participant management and an in-call chat panel keep the call
                self-contained.
              </p>
            </div>
          </div>
        </section>

        {/* 06 — ARCHITECTURE & SECURITY */}
        <section className="dw-section container">
          <span className="dw-kicker">05 — UNDER THE HOOD</span>

          <h2 className="dw-heading-lg">REAL-TIME UX. REAL-TIME PROBLEMS.</h2>

          <p
            className="dw-body-lg"
            style={{ marginTop: "1.5rem", maxWidth: "68ch" }}
          >
            The interface stays simple because the complexity is pushed
            underneath it. React handles the experience, Node + Express handle
            the application layer, MongoDB persists users, rooms and messages,
            Socket.IO carries real-time messaging and signalling, WebRTC moves
            call media peer-to-peer, and Cloudinary handles media uploads.
          </p>

          <div className="dw-arch-grid" style={{ marginTop: "3rem" }}>
            <div className="dw-arch-card">
              <div>
                <span className="dw-arch-card-tag">REAL-TIME LAYER</span>
                <h3>Socket.IO</h3>
                <p>
                  Messages and signalling move through persistent socket
                  connections.
                </p>
              </div>
              <span className="dw-body-muted">WebSocket Transport</span>
            </div>

            <div className="dw-arch-card">
              <div>
                <span className="dw-arch-card-tag">MEDIA LAYER</span>
                <h3>WebRTC Mesh</h3>
                <p>
                  Call media travels peer-to-peer instead of passing through the
                  server.
                </p>
              </div>
              <span className="dw-body-muted">P2P Audio &amp; Video</span>
            </div>

            <div className="dw-arch-card">
              <div>
                <span className="dw-arch-card-tag">APPLICATION LAYER</span>
                <h3>Node · Express · MongoDB</h3>
                <p>
                  Authentication, rooms, messages, persistence and API logic.
                </p>
              </div>
              <span className="dw-body-muted">MERN Stack</span>
            </div>
          </div>

          {/* SECURITY SUB-SECTION */}
          <div style={{ marginTop: "5rem" }}>
            <span className="dw-kicker">06 — PRIVATE MEANS SOMETHING</span>
            <h2 className="dw-heading-lg" style={{ marginTop: "0.5rem" }}>
              THE ROOM CODE ISN'T THE SECURITY MODEL.
            </h2>
            <p
              className="dw-body-lg"
              style={{ marginTop: "1.5rem", maxWidth: "68ch" }}
            >
              Authentication starts with signed JWT sessions. Passwords are
              hashed with bcrypt. Room membership is checked on message
              operations. Rate limits protect authentication and API routes.
              CORS is locked in production. Helmet hardens HTTP headers, and
              uploads are restricted so the server cannot become an accidental
              request proxy.
            </p>

            <div
              className="dw-media-container"
              style={{ marginTop: "3rem", width: "100%" }}
            >
              <img
                src={yapGalCottonbro}
                alt="Security Architecture and Access Model"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          </div>
        </section>

        {/* 07 — TESTING & REALITY CHECK */}
        <section className="dw-section container">
          <span className="dw-kicker">07 — IT ACTUALLY HAD TO WORK</span>
          <h2 className="dw-heading-lg">
            NOT JUST “LOOKS GOOD IN THE SCREENSHOT.”
          </h2>
          <p className="dw-body-lg">
            The real test was getting the system to survive actual signalling,
            messaging and security paths. Video-call signalling was tested
            across creation, join ordering, offer/answer relay, reactions, late
            joins, disconnect cleanup and host handover.
          </p>

          <div className="yap-scale-grid">
            <div className="yap-scale-item">
              <span className="yap-scale-val">20/20</span>
              <span className="yap-scale-lbl">
                VIDEO CALL SIGNALLING TESTS PASSED
              </span>
            </div>
            <div className="yap-scale-item">
              <span className="yap-scale-val">15/15</span>
              <span className="yap-scale-lbl">
                API SECURITY SUITE TESTS PASSED
              </span>
            </div>
            <div className="yap-scale-item">
              <span className="yap-scale-val">320 → 1440</span>
              <span className="yap-scale-lbl">RESPONSIVE VIEWPORT CHECKS</span>
            </div>
          </div>

          <div className="dw-media-container" style={{ marginTop: "3rem" }}>
            <img
              src={yapPreview1}
              alt="Testing &amp; Diagnostics Overview"
              className="media-landscape"
              style={{ objectFit: "contain", height: "auto" }}
            />
          </div>

          <div className="yap-tradeoff-box">
            <span className="yap-tradeoff-tag">BUILT WITH TRADE-OFFS</span>
            <p className="yap-tradeoff-body">
              WebRTC mesh keeps the system simple and server-light, but eight
              people is where the architecture says “okay, enough.” Beyond that,
              I’d want an SFU.
            </p>
          </div>
        </section>

        {/* 08 — CLOSING & BRAND VISUAL */}
        <section className="dw-section container">
          <span className="dw-kicker">08 — THE POINT</span>
          <h2 className="dw-conclusion-lead">
            LESS PLATFORM.
            <br />
            <span className="dw-conclusion-accent">MORE PEOPLE.</span>
          </h2>
          <p
            className="dw-body-muted"
            style={{
              fontSize: "1.1rem",
              marginTop: "1rem",
              marginBottom: "2.5rem",
            }}
          >
            JUST OPEN A ROOM AND YAP.
          </p>

          <p className="dw-body-lg">
            Yap Chat started as a simple communication idea and turned into a
            full-stack real-time system: room-based identity, live messaging,
            media uploads, voice notes, WebRTC calls, signalling, authentication
            and security hardening.
          </p>
          <p
            className="dw-body-muted"
            style={{ fontSize: "1.15rem", marginTop: "1.5rem" }}
          >
            Sometimes the best social product is the one that gets out of the
            way.
          </p>

          <div
            className="dw-media-container"
            style={{ marginTop: "2rem", width: "100%" }}
          >
            <img
              src={yapGalHash5}
              alt="Yap Chat Feature Showcase"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        </section>
      </main>

      {/* FOOTER TRANSITION */}
      <Footer nextProject={nextProjectForFooter} />
    </>
  );
}

export default YapChatProjectPage;
