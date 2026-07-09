import express from "express";
import cors from "cors";
import helmet from "helmet";
import { pinoHttp } from "pino-http";
import { config } from "./config/index.js";
import { healthRouter } from "./routes/health.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

// App factory (kept separate from index.ts so tests can import without listening).
export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: config.CORS_ORIGINS }));
  app.use(express.json({ limit: "100kb" }));
  app.use(pinoHttp());

  app.use("/api", healthRouter);
  // Future: /api/projects, /api/logs, /api/contact, /api/auth, /api/admin

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
