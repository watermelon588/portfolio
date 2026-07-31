import { createBrowserRouter } from "react-router";
import { ScaffoldBoot } from "./ScaffoldBoot";
import { RootLayout } from "./RootLayout";
import { Home } from "./pages/Home";
import { Work } from "./pages/Work";
import { ProjectPage } from "./pages/ProjectPage";
import { PlaceholderPage } from "./pages/PlaceholderPage";

// All routes render under RootLayout (hosts the page-transition curtain). Every
// nav link resolves to a real route — About/Contact are placeholder pages for
// now so navigation always leads somewhere coherent. The `/ask` stub reserves
// the AI route (Phase 6).
export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/work", element: <Work /> },
      { path: "/work/:slug", element: <ProjectPage /> },
      { path: "/about", element: <PlaceholderPage title="About" index="01 — About" /> },
      { path: "/contact", element: <PlaceholderPage title="Contact" index="02 — Contact" /> },
      { path: "/ask", element: <ScaffoldBoot note="AI assistant route — reserved (Phase 6)" /> },
      { path: "*", element: <PlaceholderPage title="Not found" index="404" /> },
    ],
  },
]);
