import { ScrollParticleBridge } from "@/components/motion/ScrollParticleBridge";
import { AboutSection } from "@/components/sections/AboutSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhatWeBuildSection } from "@/components/sections/WhatWeBuildSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { getProjectsForSite } from "@/lib/content/project-store";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const projects = await getProjectsForSite();

  return (
    <>
      <HeroSection />
      <ScrollParticleBridge />
      <ServicesSection />
      <WhatWeBuildSection />
      <WorkSection projects={projects} />
      <ProcessSection />
      <AboutSection />
      <CtaSection />
    </>
  );
}
