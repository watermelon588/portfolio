import { createApp } from "./app.js";
import { config } from "./config/index.js";

const app = createApp();

app.listen(config.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`[api] listening on http://localhost:${config.PORT}/api/health`);
});
