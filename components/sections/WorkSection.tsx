"use client";

import Link from "next/link";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { TextLink } from "@/components/ui/TextLink";
import { AmbientBackground } from "@/components/graphics/AmbientBackground";
import { Reveal } from "@/components/motion/Reveal";
import { WorkCardMotion } from "@/components/motion/Interactions";
import { ProjectCardVisual } from "@/components/work/ProjectCardVisual";
import {
  type CaseStudy,
} from "@/lib/content/projects";

function WorkProjectCard({
  project,
  index,
  featured = false,
}: {
  project: CaseStudy;
  index: number;
  featured?: boolean;
}) {
  const indexLabel = String(project.displayIndex).padStart(2, "0");

  return (
    <WorkCardMotion
      href={`/work/${project.slug}`}
      index={index}
      className={`work-card group flex flex-col overflow-hidden rounded-lg border border-line bg-ink-soft/80 backdrop-blur-sm transition-[border-color] duration-[var(--duration-base)] hover:border-signal/40 ${
        featured ? "work-card--featured" : ""
      }`}
    >
      <ProjectCardVisual
        slug={project.slug}
        title={project.title}
        liveUrl={project.liveUrl}
        approved={project.approved}
        typeTags={project.typeTags}
        className={featured ? "aspect-[16/9]" : "aspect-[16/10]"}
        data-card-image
      />
      <Link
        href={`/work/${project.slug}`}
        className="work-card-meta block p-6 outline-none focus-visible:ring-2 focus-visible:ring-signal"
        data-card-meta
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-subtle">
          Project {indexLabel}
        </p>
        <h3 className="mt-2 font-display text-xl font-semibold uppercase tracking-tight text-paper transition-colors group-hover:text-signal md:text-2xl">
          {project.title.replace(/ — .+$/, "")}
        </h3>
        <div
          className="work-card-tags mt-3 flex flex-wrap items-center gap-2"
          data-card-tags
        >
          {project.typeTags.map((tag) => (
            <span key={tag} className="work-type-tag">
              {tag}
            </span>
          ))}
          <span className="work-type-tag work-type-tag--year">{project.year}</span>
          {!project.approved && (
            <span className="work-type-tag work-type-tag--draft">Draft</span>
          )}
        </div>
        <p className="mt-3 text-sm text-text-muted">{project.outcome}</p>
        <p className="work-card-cta mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-signal" data-card-cta>
          View case study →
        </p>
      </Link>
    </WorkCardMotion>
  );
}

export function WorkSection({ projects }: { projects: CaseStudy[] }) {
  const featuredProjects = projects
    .filter((project) => project.featured)
    .sort((a, b) => a.displayIndex - b.displayIndex);
  const featured =
    featuredProjects.find((project) => project.primaryFeatured) ??
    featuredProjects.find((project) => project.approved && project.status === "live") ??
    featuredProjects[0];
  const selected = featuredProjects.filter((project) => project.slug !== featured?.slug);

  return (
    <section
      id="work-section"
      className="relative section-pad overflow-hidden"
      aria-labelledby="work-heading"
    >
      <AmbientBackground />
      <div className="container-site relative z-10">
        <Reveal className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionMarker index="02" label="Work" className="mb-4" />
            <h2 id="work-heading" className="display-heading text-4xl text-paper">
              Proof, not filler.
            </h2>
          </div>
          <TextLink href="/work">View all projects</TextLink>
        </Reveal>

        {featured && (
          <div className="mb-14">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-signal">
              Featured
            </p>
            <Reveal>
              <WorkProjectCard project={featured} index={0} featured />
            </Reveal>
          </div>
        )}

        {selected.length > 0 && (
          <div>
            <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.22em] text-text-subtle">
              Selected work
            </p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {selected.map((project, i) => (
                <WorkProjectCard key={project.slug} project={project} index={i + 1} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
