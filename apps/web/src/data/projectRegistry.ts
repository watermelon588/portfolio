import type { Project } from "./projects";
import type { CaseStudy } from "./caseStudies";

/** Each session owns one entry; shared consumers stay untouched. */
export interface ProjectEntry {
  project: Project;
  caseStudy: CaseStudy;
}

const catalogueOrder = ["walkthru", "tripverse", "skyguide-ai", "neuron", "shiori", "yapchat", "forcaster"];
const selectedOrder = ["walkthru", "tripverse", "skyguide-ai", "neuron"];
const originalSelection = ["skyguide-ai", "neuron", "yapchat", "forcaster"];

export function mergeProjects(base: Project[], entries: ProjectEntry[]): Project[] {
  const bySlug = new Map(base.map((project) => [project.slug, project]));
  entries.forEach(({ project }) => bySlug.set(project.slug, { ...bySlug.get(project.slug), ...project }));
  const rank = (slug: string) => {
    const index = catalogueOrder.indexOf(slug);
    return index < 0 ? catalogueOrder.length : index;
  };
  return [...bySlug.values()].sort((a, b) => rank(a.slug) - rank(b.slug));
}

export function selectHomeProjects(catalogue: Project[]): Project[] {
  const ready = selectedOrder.every((slug) => catalogue.some((project) => project.slug === slug));
  return (ready ? selectedOrder : originalSelection).flatMap((slug) =>
    catalogue.filter((project) => project.slug === slug && project.category === "dev"),
  );
}

export function nextCase(catalogue: Project[], slug: string): Project | undefined {
  const dev = catalogue.filter((project) => project.category === "dev");
  const index = dev.findIndex((project) => project.slug === slug);
  return index < 0 ? undefined : dev[(index + 1) % dev.length];
}
