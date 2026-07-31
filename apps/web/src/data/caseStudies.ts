// Case-study content per project, keyed by slug. SkyGuide is drafted in depth
// from its own docs (problem → thinking → architecture → build/deploy → UX);
// the rest are drafted from their READMEs. Rohit edits/replaces freely.

export interface CaseSection {
  kicker: string;
  title: string;
  body: string;
}

export interface CaseStudy {
  tagline: string;
  live?: string;
  github: string;
  overview: string;
  sections: CaseSection[];
  metrics: { value: string; label: string }[];
  stack: string[];
}

export const caseStudies: Record<string, CaseStudy> = {
  "skyguide-ai": {
    tagline: "A real-time celestial matchmaking & telescope-alignment copilot.",
    live: "https://skyguide-ai.vercel.app",
    github: "https://github.com/watermelon588/skyguide-ai",
    overview:
      "SkyGuide AI answers the one question every amateur astronomer actually has — “I have a telescope; what should I look at right now, and how do I point at it?” It fuses your location, your telescope’s capabilities, live atmospheric conditions and precise astronomy into a single real-time recommendation — then turns your phone into the instrument that guides you onto target.",
    sections: [
      {
        kicker: "01 — Problem",
        title: "Owning a telescope isn’t the hard part.",
        body: "Most first telescopes end up in a closet — not because the sky is boring, but because the workflow is brutal. You have to work out what’s even visible tonight from your backyard, cross-reference it against what your specific scope can actually resolve, then somehow physically aim at an invisible point in a slowly-moving sky. SkyGuide AI collapses that entire loop into one answer.",
      },
      {
        kicker: "02 — Thinking",
        title: "Not a CRUD app — an astronomical copilot.",
        body: "The guiding rule from day one was never to trade architecture for convenience. A good recommendation has to weigh observer location, telescope aperture and focal length, live atmospheric conditions, rigorous astronomy and real-time mobile sensor telemetry all at once — so the system was designed for scalability, performance and production-readiness, not as a weekend MERN demo.",
      },
      {
        kicker: "03 — Architecture",
        title: "Three services, one clean boundary.",
        body: "A distributed microservice architecture with a strict rule: the frontend never does astronomy. A React client owns UI, the dashboard, QR pairing and the mobile companion; an Express gateway owns auth, JWT sessions, profiles, WebSocket rooms and QR pairing; and a FastAPI “astro-engine” (Astropy, Astroquery, Astroplan, Skyfield) performs every coordinate transform, visibility calculation, observation plan and AI recommendation. MongoDB Atlas ties it together.",
      },
      {
        kicker: "04 — The instrument",
        title: "Your phone becomes the eyepiece guide.",
        body: "Pair your phone with a QR code and it streams its orientation over WebSockets while the app talks you onto target — a live alignment loop that turns an entry-level scope into a guided instrument, no expensive mount required.",
      },
      {
        kicker: "05 — Experience",
        title: "A workspace, not a database.",
        body: "A glassmorphism dashboard surfaces your location, scope and conditions next to “Astro”, the AI assistant. Each target gets real imagery, a 0–100 match score and live visibility for your exact sky. Explore charts all 13,311 catalogued objects; a privacy-safe community map (~40 km cells) shows observers nearby; and a gallery fans out the most-loved nights.",
      },
      {
        kicker: "06 — Build & deploy",
        title: "Shipped, not theorised.",
        body: "A React 19 + Vite frontend, an Express 5 gateway and a Python FastAPI engine — deployed and live on Vercel. Isolating the scientific logic means the engine can keep improving (better models, more catalogues) without ever touching the product surface.",
      },
    ],
    metrics: [
      { value: "13,311", label: "catalogued objects" },
      { value: "3", label: "independent services" },
      { value: "0–100", label: "live target score" },
      { value: "~40 km", label: "private map cells" },
    ],
    stack: ["React 19", "Vite", "Express 5", "FastAPI", "Astropy", "Skyfield", "Socket.IO", "MongoDB Atlas"],
  },

  neuron: {
    tagline: "Search beyond words — one query across text, image, audio & video.",
    github: "https://github.com/watermelon588/Neuron",
    overview:
      "Neuron fuses any combination of inputs — image + query, or audio + image + query — into a single CLIP query vector, then re-ranks results by real visual similarity. Every result explains why it ranked where it did, and you can chat with your own documents, grounded in cited context.",
    sections: [
      {
        kicker: "01 — Problem",
        title: "Keyword search can’t see.",
        body: "Search engines match words, not meaning — and certainly not pixels. If your query is an image, a sound, or a mix of things, keyword search is blind to it.",
      },
      {
        kicker: "02 — Approach",
        title: "Fuse the modalities, then explain the rank.",
        body: "Every input becomes one CLIP query vector — the picture’s actual pixels, not a caption of them — plus a keyword query. Image and video results are re-ranked by visual similarity, blended with dense-embedding, BM25 and provider-position signals. Every result carries a relevance analysis: score, confidence, contributing signals and a plain-language explanation.",
      },
      {
        kicker: "03 — Document chat",
        title: "Talk to your files, with citations.",
        body: "Upload PDFs, DOCX, spreadsheets, code and more; answers are grounded in retrieved context with numbered citations that jump back to the exact page, section and line range. Weak context is augmented with live web search.",
      },
      {
        kicker: "04 — Architecture",
        title: "Lazy models, graceful degradation.",
        body: "A layered FastAPI backend (API → services → core/ml/db). Models load on first use so the API starts instantly; a missing optional dependency disables one capability instead of crashing the platform. No embedder? Ranking falls back to BM25 and flags itself degraded. No generator? Chat returns cited extractive answers.",
      },
    ],
    metrics: [
      { value: "4", label: "input modalities" },
      { value: "CLIP", label: "unified query vector" },
      { value: "100%", label: "cited answers" },
    ],
    stack: ["FastAPI", "React 19", "CLIP", "Whisper", "BLIP", "FAISS", "MongoDB"],
  },

  yapchat: {
    tagline: "Private, code-based chat rooms with voice, photos & group video.",
    live: "https://yap-chat-five.vercel.app",
    github: "https://github.com/watermelon588/Yap-Chat",
    overview:
      "Yap Chat isn’t one big room for everybody. Create a room, pick your own code (or generate one), and share it as text, a link or a QR — only people holding that code appear in your sidebar. Inside: one-to-one text, photo and voice-note chats, plus group video calls for up to eight.",
    sections: [
      {
        kicker: "01 — Idea",
        title: "Rooms you actually control.",
        body: "Identity is a code, not a global directory. You decide who’s in your sidebar by who you hand the code to — via text, an invite link, or a scannable QR.",
      },
      {
        kicker: "02 — Realtime",
        title: "Sockets for chat, WebRTC for calls.",
        body: "Text, photos and voice notes flow over Socket.IO; group video for up to eight runs peer-to-peer over WebRTC, with screen sharing, live emoji reactions and an in-call side panel.",
      },
      {
        kicker: "03 — Stack",
        title: "MERN, end to end.",
        body: "Email + password signup with JWT sessions, MongoDB persistence and a React client — a full realtime MERN application.",
      },
    ],
    metrics: [
      { value: "8", label: "-way group video" },
      { value: "P2P", label: "WebRTC calls" },
      { value: "QR", label: "room invites" },
    ],
    stack: ["React", "Node", "Express", "MongoDB", "Socket.IO", "WebRTC", "JWT"],
  },

  forcaster: {
    tagline: "Feel the forecast — a calm, glassmorphism weather experience.",
    github: "https://github.com/watermelon588/FORCASTR",
    overview:
      "A weather app built around clarity, motion and calm UI rather than data overload — glassmorphism cards, theme-aware visuals, and expandable forecasts instead of cluttered tables. It’s designed to feel like weather, not just display it.",
    sections: [
      {
        kicker: "01 — Intent",
        title: "Weather you feel, not just read.",
        body: "Minimal UI, maximum depth — glassmorphism cards with smooth transitions and theme-aware backgrounds that harmonise with the conditions.",
      },
      {
        kicker: "02 — Features",
        title: "Current, 5-day, hourly.",
        body: "Temperature and RealFeel, humidity, pressure, wind and visibility; a 5-day overview with expandable day cards (morning / afternoon / evening / night); and a 24-hour hourly breakdown — all in expandable cards instead of dense tables.",
      },
      {
        kicker: "03 — Motion",
        title: "Transitions that carry weight.",
        body: "Cards don’t just appear — they ease open, and the backdrop shifts with the sky so a clear afternoon and a grey storm never feel the same. Every movement earns its place by making the forecast legible at a glance, never by decorating it.",
      },
      {
        kicker: "04 — Data",
        title: "Live conditions, calmly mapped.",
        body: "OpenWeather feeds temperature and RealFeel, humidity, pressure, wind and visibility through a thin Axios layer, and the interface decides what deserves attention — surfacing the numbers that matter and folding the rest into detail you can expand on demand.",
      },
    ],
    metrics: [
      { value: "5-day", label: "forecast" },
      { value: "24h", label: "hourly breakdown" },
      { value: "2", label: "theme-aware modes" },
    ],
    stack: ["React", "Vite", "Tailwind CSS", "OpenWeather API", "Axios"],
  },
  "ultimate-finance-tracker": {
    tagline: "Take control of your money — a gorgeous Notion cockpit for wealth.",
    github: "https://github.com/watermelon588/ultimate-finance-tracker",
    overview:
      "A complete MERN-like database structure represented in a single relational Notion workspace. Track monthly budgets, recursive subscriptions, investments, and long-term financial goals with automated visual feedback and zero clutter.",
    sections: [
      {
        kicker: "01 — Concept",
        title: "Relational budgets, simplified.",
        body: "Standard finance templates feel like spreadsheets — dense, dry and manual. The Ultimate Finance Tracker uses dynamic Notion database relations and formulas to link transactions automatically to monthly budgets, alerting you visually when you approach limits.",
      },
      {
        kicker: "02 — Automation",
        title: "Sub-tracking and investments.",
        body: "Track recurring payments, subscriptions, and stock/crypto portfolios in separate views with unified summaries. Built-in Formula 2.0 equations automatically calculate renewals, returns, and allocation balances.",
      },
      {
        kicker: "03 — Structure",
        title: "One workspace, many linked tables.",
        body: "Transactions, budgets, subscriptions, investments and goals live as separate databases wired together with relations and rollups — so a single entry ripples out to every view that depends on it, the way a real backend would.",
      },
      {
        kicker: "04 — Feedback",
        title: "It warns you before you overspend.",
        body: "Formulas roll spend up against each budget and colour it as you approach the limit, so the workspace nudges you visually in the moment instead of waiting for a month-end reckoning.",
      },
    ],
    metrics: [
      { value: "100%", label: "relational sync" },
      { value: "30+", label: "pre-built views" },
      { value: "<5m", label: "weekly setup" },
    ],
    stack: ["Notion Database", "Relational Rollups", "Formula 2.0", "Financial Frameworks"],
  },
  "weekly-schedule-maker": {
    tagline: "Design your weeks visually — a calm block-scheduler template.",
    github: "https://github.com/watermelon588/weekly-schedule-maker",
    overview:
      "A highly-visual block scheduler designed around time-blocking, drag-and-drop Kanban task planning, and priority matrices. Focus on what actually matters by dividing tasks into deep work and admin slots.",
    sections: [
      {
        kicker: "01 — Design",
        title: "Calm time-blocking layout.",
        body: "Dividing your day into chunks is the only way to avoid context switching. This template structures your weeks into visual columns, allowing you to drag tasks directly into slots and prioritize them on a custom Eisenhower Matrix.",
      },
      {
        kicker: "02 — Focus",
        title: "Separate Deep Work from admin.",
        body: "Differentiate high-energy creation slots from passive admin tasks. Built-in daily checklists roll up into weekly scorecards, letting you track your execution efficiency over time.",
      },
      {
        kicker: "03 — Flow",
        title: "Drag a task, drop it into time.",
        body: "Tasks live on a Kanban board and slot straight into the week’s blocks, so planning becomes a physical act — move the card, claim the hour — instead of retyping the same to-do in three different places.",
      },
      {
        kicker: "04 — Review",
        title: "Weeks that score themselves.",
        body: "Daily checklists roll up into a weekly scorecard, turning a planner into a feedback loop — you can see which weeks you actually executed on and tune the next one accordingly.",
      },
    ],
    metrics: [
      { value: "7-day", label: "weekly grid" },
      { value: "100%", label: "no-code flow" },
      { value: "3", label: "priority layers" },
    ],
    stack: ["Notion Workspace", "Time Blocking", "Formula 2.0", "Kanban Database"],
  },
  "habit-tracker": {
    tagline: "Build streaks that stick — clean habit tracking and gamified goals.",
    github: "https://github.com/watermelon588/habit-tracker",
    overview:
      "Gamify your daily routines with visual streak counters, monthly checkboxes, and progress bars. Tracks habits across multiple categories (health, mind, work) with real-time stats and milestones.",
    sections: [
      {
        kicker: "01 — Gamification",
        title: "Checkboxes that calculate streaks.",
        body: "Traditional habit trackers are static. This system uses custom Notion formulas to look back at check-ins, automatically calculating active streaks and generating motivational milestone badges as your consistency grows.",
      },
      {
        kicker: "02 — Progress",
        title: "Category rollups and scorecards.",
        body: "Group your habits into core categories like physical health, mental focus, or career growth. Progress bars fill up automatically as you complete checkboxes, giving you instant visual feedback.",
      },
      {
        kicker: "03 — Streaks",
        title: "Consistency you can watch grow.",
        body: "Custom formulas look back across your check-ins to compute the live streak and hand out milestone badges, so the reward for showing up is visible the moment you tick the box.",
      },
      {
        kicker: "04 — Balance",
        title: "One view across your whole life.",
        body: "Because habits group into health, mind and work, the category rollups show whether you’re growing evenly — or quietly leaning on one area while another slips.",
      },
    ],
    metrics: [
      { value: "31-day", label: "progress grid" },
      { value: "100%", label: "streak logic" },
      { value: "0", label: "setup friction" },
    ],
    stack: ["Notion Workspace", "Progress Formulas", "Streak Algorithms", "Gamification UI"],
  },
};
