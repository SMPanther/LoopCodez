import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionMarker } from "@/components/ui/SectionMarker";
import {
  CaseStudyBlock,
  CaseStudyDraftBanner,
  CaseStudyHero,
  CaseStudyNextNav,
  CaseStudyTechStack,
} from "@/components/case-study/CaseStudySections";
import { getAdjacentProjectsForSite, getProjectBySlugForSite, getProjectsForSite } from "@/lib/content/project-store";
import { createPageMetadata } from "@/lib/seo/metadata";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return (await getProjectsForSite()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlugForSite(slug);
  if (!project) return { title: "Project" };
  return createPageMetadata({
    title: project.title,
    description: project.outcome,
    path: `/work/${slug}`,
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlugForSite(slug);
  if (!project) notFound();

  const { prev, next } = await getAdjacentProjectsForSite(slug);

  return (
    <article className="section-pad">
      <div className="container-site max-w-4xl">
        <SectionMarker index="→" label="Case study" className="mb-8" />
        <CaseStudyDraftBanner project={project} />
        <CaseStudyHero project={project} />

        <CaseStudyBlock index="01" title="Problem">
          <p>{project.problem}</p>
        </CaseStudyBlock>

        <CaseStudyBlock index="02" title="Approach">
          <ul className="list-none space-y-3 pl-0">
            {project.approach.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </CaseStudyBlock>

        <CaseStudyBlock index="03" title="Design">
          <ul className="list-none space-y-3 pl-0">
            {project.designDecisions.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </CaseStudyBlock>

        <CaseStudyBlock index="04" title="Technology">
          <CaseStudyTechStack technologies={project.technologies} />
        </CaseStudyBlock>

        {project.interactionDetail && (
          <CaseStudyBlock index="05" title="Interaction">
            <p>{project.interactionDetail}</p>
          </CaseStudyBlock>
        )}

        <CaseStudyBlock index={project.interactionDetail ? "06" : "05"} title="Result">
          <ul className="list-none space-y-3 pl-0">
            {project.results.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="text-signal">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </CaseStudyBlock>

        <CaseStudyBlock index={project.interactionDetail ? "07" : "06"} title="What we learned">
          <p>{project.reflection}</p>
        </CaseStudyBlock>

        {(project.liveUrl || project.githubUrl) && (
          <div className="flex flex-wrap gap-4 border-b border-line py-10">
            {project.liveUrl && project.approved && (
              <Link
                href={project.liveUrl}
                className="text-sm text-signal hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                View live ↗
              </Link>
            )}
            {project.githubUrl && (
              <Link
                href={project.githubUrl}
                className="text-sm text-signal hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                View code ↗
              </Link>
            )}
          </div>
        )}

        <CaseStudyNextNav prev={prev} next={next} />
      </div>
    </article>
  );
}
