import { AmbientBackground } from "@/components/graphics/AmbientBackground";
import { WorkArchive } from "@/components/work/WorkArchive";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { getProjectsForSite } from "@/lib/content/project-store";
import { createPageMetadata } from "@/lib/seo/metadata";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: "Work",
  description:
    "Selected loopcodez case studies in ecommerce, web apps, automation, and AI.",
  path: "/work",
});

export default async function WorkPage() {
  const projects = await getProjectsForSite();
  const liveCount = projects.filter((p) => p.approved && p.liveUrl).length;

  return (
    <div className="relative section-pad overflow-hidden">
      <AmbientBackground />
      <div className="container-site relative z-10">
        <SectionMarker index="→" label="Work" className="mb-4" />
        <h1 className="display-heading mb-4 text-4xl text-paper md:text-5xl">
          Selected projects.
        </h1>
        <p className="mb-4 max-w-2xl body-lg">
          Curated case studies — each selected deliberately. Live projects show
          the actual deployed site in preview.
        </p>
        {liveCount > 0 ? (
          <p className="mb-12 font-mono text-xs uppercase tracking-widest text-signal">
            {liveCount} live {liveCount === 1 ? "project" : "projects"} shipping now
          </p>
        ) : (
          <div className="mb-12" aria-hidden />
        )}
        <WorkArchive projects={projects} />
      </div>
    </div>
  );
}
