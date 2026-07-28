import { createBrowserRouter } from "react-router";
import { ScaffoldBoot } from "./ScaffoldBoot";
import { RootLayout } from "./RootLayout";
import { Home } from "./pages/Home";
import { Work } from "./pages/Work";

// Phase 1 routing skeleton. Real pages (home/work/about/logs/lab/contact/404)
// arrive in Phase 3 after design sign-off. The `/ask` stub reserves the AI
// route from day one (Phase 6) per PROJECT_MEMORY prime directive #4.
// All routes render under RootLayout, which hosts the page-transition curtain.
export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/work", element: <Work /> },
      { path: "/ask", element: <ScaffoldBoot note="AI assistant route — reserved (Phase 6)" /> },
      { path: "*", element: <ScaffoldBoot note="404 — real page in Phase 3" /> },
    ],
  },
]);
