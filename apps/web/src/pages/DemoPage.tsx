import { useRef, useState } from "react";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/sections/Footer/Footer";
import { useMagnetic } from "@/components/motion/useMagnetic";
import demo1Video from "@/assets/skyguide/video/demo 1.mp4";
import "./DemoPage.css";

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
    <>
      <Navbar />

      <main className="demo-page" ref={root}>
        <div className="container">
          <header className="demo-header">
            <span className="demo-kicker">03 — DEMO</span>
            <h1 className="demo-title">SKYGUIDE IN ACTION.</h1>
          </header>

          <div className="demo-video-container">
            <video
              ref={videoRef}
              className="demo-video"
              autoPlay
              playsInline
              controls
              src={demo1Video}
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
                <span>🔊 Unmute Video Audio</span>
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default DemoPage;
