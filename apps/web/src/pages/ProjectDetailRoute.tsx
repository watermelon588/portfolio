import { lazy, Suspense, type ComponentType } from "react";
import { useParams } from "react-router";
import { ProjectPage } from "./ProjectPage";

// Project sessions add only their own page + entry. No concurrent route edits.
const modules = import.meta.glob<{ default: ComponentType }>([
  "./WalkthruProjectPage.tsx",
  "./TripverseProjectPage.tsx",
  "./ShioriProjectPage.tsx",
]);
const pages = Object.fromEntries(Object.entries(modules).map(([path, load]) => [
  path.replace("./", "").replace("ProjectPage.tsx", "").toLowerCase(), lazy(load),
]));

export function ProjectDetailRoute() {
  const { slug } = useParams();
  const Page = slug ? pages[slug] : undefined;
  return Page ? (
    <Suspense fallback={<main className="container" aria-busy="true"><p role="status">Opening case study…</p></main>}>
      <Page key={slug} />
    </Suspense>
  ) : <ProjectPage />;
}
