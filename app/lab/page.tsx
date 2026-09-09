import { AmbientBackground } from "@/components/graphics/AmbientBackground";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { labExperiments } from "@/lib/content/lab";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Lab",
  description:
    "loopcodez lab — experiments in WebGL, AI, creative coding, and interactive systems.",
  path: "/lab",
});

export default function LabPage() {
  return (
    <div className="relative section-pad overflow-hidden">
      <AmbientBackground />
      <div className="container-site relative z-10">
        <SectionMarker index="→" label="Lab" className="mb-4" />
        <h1 className="display-heading mb-4 max-w-3xl text-4xl text-paper md:text-5xl">
          The studio workshop.
        </h1>
        <p className="mb-12 max-w-2xl body-lg">
          Experiments, prototypes, and creative coding — not client work. This is
          where loopcodez tests ideas before they ship.
        </p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {labExperiments.map((item) => (
            <article
              key={item.id}
              className="lab-card group flex flex-col gap-4 rounded-lg border border-line bg-ink-soft/80 p-6 backdrop-blur-sm transition-[border-color] duration-[var(--duration-base)] hover:border-signal/35"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="font-mono text-xs uppercase tracking-widest text-text-subtle">
                  Lab {item.index}
                </p>
                <span className="lab-status font-mono text-[10px] uppercase tracking-widest text-signal/80">
                  {item.status}
                </span>
              </div>
              <h2 className="font-display text-xl font-semibold tracking-tight text-paper transition-colors group-hover:text-signal">
                {item.title}
              </h2>
              <p className="font-mono text-[10px] uppercase tracking-widest text-text-subtle">
                {item.category}
              </p>
              <p className="text-sm leading-relaxed text-text-muted">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
