"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { Tag } from "@/components/ui/Tag";
import {
  type CaseStudy,
} from "@/lib/content/projects";
import { ProjectCardVisual } from "@/components/work/ProjectCardVisual";
import { cn } from "@/lib/utils/cn";

type WorkArchiveProps = {
  projects: CaseStudy[];
};

export function WorkArchive({ projects }: WorkArchiveProps) {
  const categories = useMemo(
    () => [...new Set(projects.map((project) => project.category))],
    [projects],
  );
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = useMemo(
    () => activeCategory ? projects.filter((project) => project.category === activeCategory) : projects,
    [activeCategory, projects],
  );

  return (
    <>
      <div className="mb-10 flex flex-wrap gap-2">
        <FilterButton
          active={activeCategory === null}
          onClick={() => setActiveCategory(null)}
        >
          All
        </FilterButton>
        {categories.map((cat) => (
          <FilterButton
            key={cat}
            active={activeCategory === cat}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </FilterButton>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((project, i) => (
          <article
            key={project.slug}
            className={cn(
              "group flex flex-col rounded-lg border border-line bg-ink-soft p-6 transition-[border-color] hover:border-line-strong",
              i === 0 && "md:col-span-2 md:flex-row md:gap-8",
            )}
          >
            <ProjectCardVisual
              slug={project.slug}
              title={project.title}
              liveUrl={project.liveUrl}
              approved={project.approved}
              typeTags={project.typeTags}
              className={cn(
                "mb-6 aspect-[16/10]",
                i === 0 && "md:mb-0 md:w-1/2 md:shrink-0",
              )}
            />
            <Link
              href={`/work/${project.slug}`}
              className={cn(
                "block outline-none focus-visible:ring-2 focus-visible:ring-signal",
                i === 0 && "md:flex md:flex-col md:justify-center",
              )}
            >
              <div className="flex flex-wrap gap-2">
                <Tag>{project.category}</Tag>
                {!project.approved && <Tag>Draft</Tag>}
                {project.approved && project.liveUrl && <Tag>Live</Tag>}
              </div>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight group-hover:text-signal md:text-3xl">
                {project.title}
              </h2>
              <p className="mt-3 text-sm text-text-muted">{project.outcome}</p>
              <p className="mt-4 font-mono text-xs uppercase tracking-widest text-text-subtle">
                {project.role} · {project.year}
              </p>
            </Link>
          </article>
        ))}
      </div>
    </>
  );
}

type FilterButtonProps = {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

function FilterButton({ active, onClick, children }: FilterButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-md border px-3 py-1.5 font-mono text-xs uppercase tracking-widest transition-colors",
        active
          ? "border-signal bg-signal/10 text-signal"
          : "border-line text-text-muted hover:border-line-strong hover:text-paper",
      )}
    >
      {children}
    </button>
  );
}
