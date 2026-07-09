import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { router } from "./routes";
import "./styles/base.css";

// Note: React StrictMode is intentionally omitted. Its dev-only double-invoke
// of effects breaks GSAP timeline setup (orphaned tweens leave elements stuck
// at their start state). Standard practice for GSAP-driven apps; revisit if we
// adopt a MotionProvider that fully guards context lifecycles.
const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("#root not found");

createRoot(rootEl).render(<RouterProvider router={router} />);
