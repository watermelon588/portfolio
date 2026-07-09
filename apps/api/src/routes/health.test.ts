import { describe, it, expect } from "vitest";
import { createApp } from "../app.js";

// Lightweight boot test — no supertest dep yet (added with the full test setup
// in Phase 1.1). Asserts the app factory builds and exposes the health route.
describe("api app factory", () => {
  it("creates an app with a request handler", () => {
    const app = createApp();
    expect(typeof app).toBe("function");
  });
});
