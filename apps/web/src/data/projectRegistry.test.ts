import { describe, expect, it } from "vitest";
import { mergeProjects, nextCase, selectHomeProjects, type ProjectEntry } from "./projectRegistry";
import type { Project } from "./projects";

const make = (slug: string): Project => ({ slug, title: slug, category: "dev", images: [], frameColor: "#000", ratio: "1" });
const entry = (slug: string): ProjectEntry => ({ project: make(slug), caseStudy: { tagline: "", github: "", overview: "", sections: [], metrics: [], stack: [] } });

describe("concurrent case registration", () => {
  it("keeps four original home rows until both new agents are ready, then activates the requested order", () => {
    const base = ["skyguide-ai", "neuron", "yapchat", "forcaster"].map(make);
    base.find(p => p.slug === "neuron")!.nextCaseImage = "neuron-laptop.png";
    const walk = mergeProjects(base, [entry("walkthru")]);
    expect(selectHomeProjects(walk).map(p => p.slug)).toEqual(base.map(p => p.slug));
    const all = mergeProjects(base, [entry("shiori"), entry("tripverse"), entry("walkthru"), { ...entry("neuron"), project: { ...make("neuron"), title: "Pulse" } }]);
    expect(all.map(p => p.slug)).toEqual(["walkthru", "tripverse", "skyguide-ai", "neuron", "shiori", "yapchat", "forcaster"]);
    expect(all.filter(p => p.slug === "neuron")).toHaveLength(1);
    expect(all.find(p => p.slug === "neuron")?.title).toBe("Pulse");
    expect(all.find(p => p.slug === "neuron")?.nextCaseImage).toBe("neuron-laptop.png");
    expect(selectHomeProjects(all).map(p => p.slug)).toEqual(["walkthru", "tripverse", "skyguide-ai", "neuron"]);
    expect(nextCase(all, "walkthru")?.slug).toBe("tripverse");
    expect(nextCase(all, "forcaster")?.slug).toBe("walkthru");
    expect(nextCase([], "walkthru")).toBeUndefined();
    expect(nextCase(all, "unknown")).toBeUndefined();
  });
});
