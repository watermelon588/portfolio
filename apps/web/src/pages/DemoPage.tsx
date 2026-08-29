import { useRef, useState } from "react";
import { Link } from "react-router";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/sections/Footer/Footer";
import { useMagnetic } from "@/components/motion/useMagnetic";
import "./DemoPage.css";

const videoModules = import.meta.glob<{ default: string }>("@/assets/skyguide/video/*.mp4", { eager: true });
const demo2Video =
  Object.entries(videoModules).find(([path]) => {
    const p = decodeURIComponent(path).toLowerCase();
    return p.includes("demo 2") || p.includes("demo2");
  })?.[1]?.default ||
  Object.values(videoModules)[0]?.default ||
  "";

export function DemoPage() {
  const root = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [unmuted, setUnmuted] = useState(false);

  useMagnetic(root, []);

  const handleEnableAudio = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play().catch(() => {});
      setUnmuted(true);
    }
  };

  return (
    <div className="demo-page-wrapper">
      <Navbar />

      <main className="demo-page" ref={root}>
        <div className="container">
          <Link
            to="/work/skyguide-ai"
            className="demo-back-btn magnetic"
            data-strength="24"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              style={{ width: "1.1rem", height: "1.1rem" }}
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 12H5M12 19l-7-7 7-7"
              />
            </svg>
            <span>Back to SkyGuide AI</span>
          </Link>

          <header className="demo-header">
            <span className="demo-kicker">03 — DEMO</span>
            <h1 className="demo-title">SKYGUIDE IN ACTION.</h1>
          </header>

          <div className="demo-video-wrapper">
            <div className="demo-video-container">
              <video
                ref={videoRef}
                className="demo-video"
                autoPlay
                playsInline
                controls
                src={demo2Video}
              />
            </div>

            {!unmuted && (
              <div className="demo-audio-prompt">
                <button
                  type="button"
                  className="demo-audio-btn magnetic"
                  data-strength="24"
                  onClick={handleEnableAudio}
                >
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    style={{ width: "1.1rem", height: "1.1rem" }}
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14"
                    />
                  </svg>
                  <span>Unmute Audio</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default DemoPage;
