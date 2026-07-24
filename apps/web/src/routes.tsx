import { createBrowserRouter } from "react-router";
import { ScaffoldBoot } from "./ScaffoldBoot";
import { Home } from "./pages/Home";

// Phase 1 routing skeleton. Real pages (home/work/about/logs/lab/contact/404)
// arrive in Phase 3 after design sign-off. The `/ask` stub reserves the AI
// route from day one (Phase 6) per PROJECT_MEMORY prime directive #4.
export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/ask", element: <ScaffoldBoot note="AI assistant route — reserved (Phase 6)" /> },
  { path: "*", element: <ScaffoldBoot note="404 — real page in Phase 3" /> },
]);
