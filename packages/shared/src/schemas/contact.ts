import { z } from "zod";

// Contact form contract — used by apps/web (form) and apps/api (validation).
// Mirrors API_SPEC.md → POST /api/contact.

export const projectTypeEnum = z.enum([
  "design",
  "development",
  "fullstack",
  "ai",
  "other",
]);

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email(),
  projectType: projectTypeEnum,
  message: z.string().trim().min(10).max(2000),
  /** honeypot — must be empty; non-empty is silently dropped server-side */
  website: z.string().max(0).optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ProjectType = z.infer<typeof projectTypeEnum>;
