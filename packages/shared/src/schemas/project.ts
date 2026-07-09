import { z } from "zod";

// Project metadata contract — DATABASE.md → `projects`, API_SPEC.md → /api/projects.
// Case-study *body* is MDX in the web bundle; this is the queryable meta only.

export const roleEnum = z.enum(["design", "development", "fullstack", "ai"]);

export const projectSchema = z.object({
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "kebab-case slug"),
  title: z.string().min(1),
  year: z.number().int().min(2000).max(2100),
  roles: z.array(roleEnum).min(1),
  summary: z.string().min(1),
  stack: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  order: z.number().int().default(0),
  cover: z.object({
    cloudinaryId: z.string(),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    dominant: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  }),
  links: z
    .object({ live: z.string().url().optional(), repo: z.string().url().optional() })
    .default({}),
  published: z.boolean().default(false),
});

export type Project = z.infer<typeof projectSchema>;
export type Role = z.infer<typeof roleEnum>;
