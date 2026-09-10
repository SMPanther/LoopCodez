import "server-only";

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { projects as seedProjects, type CaseStudy } from "@/lib/content/projects";

const dataDirectory = path.join(process.cwd(), ".data");
const projectsFile = path.join(dataDirectory, "projects.json");

async function readStoredProjects(): Promise<CaseStudy[]> {
  try {
    const contents = await readFile(projectsFile, "utf8");
    return JSON.parse(contents) as CaseStudy[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

export async function getProjectsForSite(): Promise<CaseStudy[]> {
  const stored = await readStoredProjects();
  const storedBySlug = new Map(stored.map((project) => [project.slug, project]));
  const merged = seedProjects.map((project) => storedBySlug.get(project.slug) ?? project);
  const seedSlugs = new Set(seedProjects.map((project) => project.slug));

  return [
    ...merged,
    ...stored.filter((project) => !seedSlugs.has(project.slug)),
  ];
}

export async function saveProject(project: CaseStudy): Promise<void> {
  const stored = await readStoredProjects();
  const next = stored.filter((item) => item.slug !== project.slug);
  next.push(project);
  await mkdir(dataDirectory, { recursive: true });
  await writeFile(projectsFile, `${JSON.stringify(next, null, 2)}\n`, "utf8");
}

export async function getProjectBySlugForSite(slug: string) {
  return (await getProjectsForSite()).find((project) => project.slug === slug);
}

export async function getAdjacentProjectsForSite(slug: string) {
  const projects = await getProjectsForSite();
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null,
  };
}
