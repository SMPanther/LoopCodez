import { AmbientBackground } from "@/components/graphics/AmbientBackground";
import { ServiceIcon } from "@/components/graphics/ServiceIcon";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { services } from "@/lib/content/site";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Services",
  description:
    "loopcodez services: AI agents, automations, web development, app development, ecommerce, and content management.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <div className="relative section-pad overflow-hidden">
      <AmbientBackground />
      <div className="container-site relative z-10">
        <SectionMarker index="→" label="Services" className="mb-4" />
        <h1 className="display-heading mb-4 text-4xl text-paper md:text-5xl">
          What we build.
        </h1>
        <p className="mb-12 max-w-2xl body-lg">
          Six capabilities. Each one answers what we make, who it helps, and
          what outcome it creates.
        </p>
        <div className="flex flex-col gap-6">
          {services.map((service, i) => (
            <article
              key={service.slug}
              className="service-card grid gap-6 rounded-lg border border-line bg-ink-soft/60 p-6 backdrop-blur-sm md:grid-cols-12"
            >
              <div className="flex items-start gap-4 md:col-span-1">
                <span className="font-mono text-sm text-signal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <ServiceIcon slug={service.slug} className="md:hidden" />
              </div>
              <div className="flex items-start gap-4 md:col-span-4">
                <ServiceIcon slug={service.slug} className="hidden md:block" />
                <h2 className="font-display text-2xl font-semibold text-paper">
                  {service.title}
                </h2>
              </div>
              <div className="md:col-span-7">
                <p className="text-text-muted">{service.description}</p>
                <p className="mt-3 text-sm text-paper-muted">
                  <span className="text-signal">Proof · </span>
                  {service.proof}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
