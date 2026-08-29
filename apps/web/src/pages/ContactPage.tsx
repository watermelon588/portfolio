import { useRef, useState, type FormEvent } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Preloader } from "@/components/motion/Preloader";
import { Navbar } from "@/components/nav/Navbar";
import { useMagnetic } from "@/components/motion/useMagnetic";
import { EMAIL, socials } from "@/data/nav";
import pfpImg from "@/assets/hero/pfp.png";
import heroImg2 from "@/assets/hero/2.png";
import { LocalTime } from "@/components/motion/LocalTime";

import "./ContactPage.css";

gsap.registerPlugin(ScrollTrigger);

function ArrowUpRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      style={{ width: "1rem", height: "1rem" }}
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

import { GLOBAL_LINKS } from "@/data/links";

export function ContactPage() {
  const root = useRef<HTMLElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useMagnetic(root);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduce || !root.current) return;

      const created: Array<ScrollTrigger | undefined> = [];

      // Hero Title reveal
      const headline = root.current.querySelector(".contact-headline");
      if (headline) {
        gsap.fromTo(
          headline,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        );
      }

      // Form rows staggered reveal
      const formRows = root.current.querySelectorAll(".contact-form-row");
      if (formRows.length > 0) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".contact-form",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
        tl.fromTo(
          formRows,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power2.out",
          },
        );
        created.push(tl.scrollTrigger);
      }

      // Side Info reveal
      const sideBlocks = root.current.querySelectorAll(".contact-info-block");
      if (sideBlocks.length > 0) {
        const tlSide = gsap.timeline({
          scrollTrigger: {
            trigger: ".contact-side-info",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
        tlSide.fromTo(
          sideBlocks,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
          },
        );
        created.push(tlSide.scrollTrigger);
      }

      return () => {
        created.forEach((t) => t?.kill());
      };
    },
    { scope: root },
  );

  const triggerMailtoFallback = (
    name: string,
    email: string,
    org: string,
    services: string,
    message: string,
  ) => {
    const subject = encodeURIComponent(`Project Inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nOrganization: ${org}\nServices: ${services}\n\nMessage:\n${message}`,
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get("name") as string) || "";
    const email = (formData.get("email") as string) || "";
    const org = (formData.get("organization") as string) || "";
    const services = (formData.get("services") as string) || "";
    const message = (formData.get("message") as string) || "";

    const apiKey = GLOBAL_LINKS.web3formsKey;

    try {
      if (apiKey && apiKey !== "YOUR_WEB3FORMS_ACCESS_KEY") {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: apiKey,
            name,
            email,
            organization: org,
            services,
            message,
            subject: `New Portfolio Inquiry from ${name}`,
            from_name: "Rohit Maity Portfolio",
          }),
        });

        const result = await response.json();
        if (result.success) {
          setSubmitted(true);
          form.reset();
        } else {
          triggerMailtoFallback(name, email, org, services, message);
        }
      } else {
        triggerMailtoFallback(name, email, org, services, message);
      }
    } catch {
      triggerMailtoFallback(name, email, org, services, message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Preloader text="Contact" />
      <Navbar />

      <main className="contact-page" ref={root}>
        <div className="contact-container">
          <div className="contact-grid">
            {/* LEFT COLUMN: HERO & FORM */}
            <div className="contact-main">
              <div className="contact-hero">
                <div className="contact-avatar-wrap">
                  <img
                    src={pfpImg}
                    alt="Rohit Maity profile picture"
                    className="contact-avatar"
                  />
                </div>
                <h1 className="contact-headline">
                  Let's start a<br />
                  project together
                </h1>
              </div>

              <form
                id="contact-form"
                className="contact-form"
                onSubmit={handleSubmit}
              >
                {/* 01: Name */}
                <div className="contact-form-row">
                  <span className="contact-form-num">01</span>
                  <div className="contact-form-content">
                    <label
                      htmlFor="contact-name"
                      className="contact-form-question"
                    >
                      What's your name?
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      placeholder="John Doe *"
                      className="contact-form-input"
                      autoComplete="name"
                    />
                  </div>
                </div>

                {/* 02: Email */}
                <div className="contact-form-row">
                  <span className="contact-form-num">02</span>
                  <div className="contact-form-content">
                    <label
                      htmlFor="contact-email"
                      className="contact-form-question"
                    >
                      What's your email?
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      placeholder="john@doe.com *"
                      className="contact-form-input"
                      autoComplete="email"
                    />
                  </div>
                </div>

                {/* 03: Organization */}
                <div className="contact-form-row">
                  <span className="contact-form-num">03</span>
                  <div className="contact-form-content">
                    <label
                      htmlFor="contact-org"
                      className="contact-form-question"
                    >
                      What's the name of your organization?
                    </label>
                    <input
                      id="contact-org"
                      type="text"
                      name="organization"
                      placeholder="John &amp; Doe"
                      className="contact-form-input"
                      autoComplete="organization"
                    />
                  </div>
                </div>

                {/* 04: Services */}
                <div className="contact-form-row">
                  <span className="contact-form-num">04</span>
                  <div className="contact-form-content">
                    <label
                      htmlFor="contact-services"
                      className="contact-form-question"
                    >
                      What services are you looking for?
                    </label>
                    <input
                      id="contact-services"
                      type="text"
                      name="services"
                      placeholder="Web Design, Fullstack Development, AI Copilot..."
                      className="contact-form-input"
                    />
                  </div>
                </div>

                {/* 05: Message */}
                <div className="contact-form-row">
                  <span className="contact-form-num">05</span>
                  <div className="contact-form-content">
                    <label
                      htmlFor="contact-message"
                      className="contact-form-question"
                    >
                      Your message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      placeholder="Hello Rohit, can you help me with..."
                      className="contact-form-textarea"
                    />
                  </div>
                </div>

                {submitted && (
                  <p
                    className="dw-body-lg"
                    style={{ color: "#ffffff", margin: 0, marginTop: "1rem" }}
                  >
                    ✓ Thank you! Message sent successfully.
                  </p>
                )}
              </form>
            </div>

            {/* RIGHT COLUMN: CONTACT DETAILS, VACANT SPOT HERO IMAGE 2 & SOCIALS WITH SINGLE PING BUTTON */}
            <aside className="contact-side-info">
              <div className="contact-info-block">
                <span className="contact-side-tag">CONTACT DETAILS</span>
                <a
                  className="footer-pill magnetic"
                  data-strength="24"
                  href={`mailto:${EMAIL}`}
                  aria-label={`Send email to ${EMAIL}`}
                  style={{ width: "fit-content", marginBottom: "0.75rem" }}
                >
                  <span>{EMAIL}</span>
                </a>
                <p className="contact-side-text">Location: India</p>
                <p className="contact-side-text">
                  Local time: <LocalTime />
                </p>
              </div>

              {/* VACANT SPOT: HERO IMAGE 2 FRAME */}
              <div className="contact-info-block">
                <span className="contact-side-tag">WORK &amp; CREATION</span>
                <div className="contact-side-image-wrap">
                  <img
                    src={heroImg2}
                    alt="Rohit Maity Visual Showcase"
                    className="contact-side-image"
                  />
                </div>
              </div>

              <div className="contact-info-block">
                <span className="contact-side-tag">SOCIALS</span>
                <ul
                  className="footer-sociallist"
                  style={{ listStyle: "none", padding: 0, margin: 0 }}
                >
                  {socials.map((s) => (
                    <li key={s.name}>
                      <a
                        className="footer-social magnetic"
                        data-strength="16"
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {s.name}
                      </a>
                    </li>
                  ))}
                </ul>

                {/* SINGLE BIG ROUND MAGNETIC "PING" BUTTON POSITIONED UNDER SOCIALS */}
                <div className="contact-ping-wrap">
                  <button
                    type="submit"
                    form="contact-form"
                    disabled={isSubmitting}
                    className="footer-round magnetic"
                    data-strength="42"
                    aria-label="Submit contact form and send email"
                    style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? "wait" : "pointer" }}
                  >
                    <span className="footer-round-label">
                      {isSubmitting ? "sending..." : "ping"}
                    </span>
                    <span className="footer-round-arrow">
                      <ArrowUpRight />
                    </span>
                  </button>
                </div>

              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}

export default ContactPage;
