import { createBrowserRouter } from "react-router";
import { ScaffoldBoot } from "./ScaffoldBoot";
import { RootLayout } from "./RootLayout";
import { Home } from "./pages/Home";
import { Work } from "./pages/Work";
import { AboutPage } from "./pages/AboutPage";
import { ProjectPage } from "./pages/ProjectPage";
import { DemoPage } from "./pages/DemoPage";
import { PlaceholderPage } from "./pages/PlaceholderPage";

import { NeuronProjectPage } from "./pages/NeuronProjectPage";
import { YapChatProjectPage } from "./pages/YapChatProjectPage";
import { ForcasterProjectPage } from "./pages/ForcasterProjectPage";
import { ContactPage } from "./pages/ContactPage";
import { BlogPage } from "./pages/BlogPage";

// All routes render under RootLayout (hosts the page-transition curtain). Every
// nav link resolves to a real route. The `/ask` stub reserves
// the AI route (Phase 6).
export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/work", element: <Work /> },
      { path: "/work/:slug", element: <ProjectPage /> },
      { path: "/skyguide", element: <ProjectPage /> },
      { path: "/neuron", element: <NeuronProjectPage /> },
      { path: "/yapchat", element: <YapChatProjectPage /> },
      { path: "/yap-chat", element: <YapChatProjectPage /> },
      { path: "/forcaster", element: <ForcasterProjectPage /> },
      { path: "/forcastr", element: <ForcasterProjectPage /> },
      { path: "/demo", element: <DemoPage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/blog", element: <BlogPage /> },
      { path: "/contact", element: <ContactPage /> },

      { path: "/ask", element: <ScaffoldBoot note="AI assistant route — reserved (Phase 6)" /> },
      { path: "*", element: <PlaceholderPage title="Not found" index="404" /> },
    ],
  },
]);

