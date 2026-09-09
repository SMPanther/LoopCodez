"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { AmbientBackground } from "@/components/graphics/AmbientBackground";
import { HeroFrameLines } from "@/components/graphics/HeroFrameLines";
import { HeroSceneFallback } from "@/components/webgl/HeroSceneFallback";
import { LineReveal } from "@/components/motion/LineReveal";
import { gsap, registerGsapPlugins } from "@/lib/motion/register-gsap";
import { DURATION, EASE } from "@/lib/motion/easing";
import { prefersReducedMotion } from "@/lib/motion/reduced-motion";
import { isLoaderComplete, onLoaderComplete } from "@/lib/loader/loader-gate";
import { siteCopy } from "@/lib/content/site";

export function HeroSection() {
  const { hero } = siteCopy;
  const sectionRef = useRef<HTMLElement>(null);
  const introStartedRef = useRef(false);

  useLayoutEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    const runIntro = () => {
      if (introStartedRef.current) return;
      introStartedRef.current = true;

      if (prefersReducedMotion()) {
        gsap.set("[data-hero-content]", { opacity: 1, y: 0, filter: "none" });
        gsap.set("[data-hero-hint]", { opacity: 1 });
        return;
      }

      const ctx = gsap.context(() => {
        gsap.fromTo(
          "[data-hero-content]",
          { opacity: 0, y: 28, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: DURATION.slow,
            ease: EASE.out,
          },
        );

        gsap.fromTo(
          "[data-hero-hint]",
          { opacity: 0 },
          { opacity: 1, duration: DURATION.base, delay: 0.85 },
        );
      }, section);

      return () => ctx.revert();
    };

    let cleanupIntro: (() => void) | undefined;

    if (isLoaderComplete()) {
      cleanupIntro = runIntro();
    } else {
      const unsub = onLoaderComplete(() => {
        cleanupIntro = runIntro();
      });
      return () => {
        unsub();
        cleanupIntro?.();
      };
    }

    return () => cleanupIntro?.();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero-stage relative min-h-[100dvh] overflow-hidden border-b border-line"
      aria-labelledby="hero-heading"
    >
      <AmbientBackground variant="hero" />
      <HeroFrameLines />

      <div className="hero-canvas-layer" data-hero-visual aria-hidden>
        <HeroSceneFallback  />
      </div>

      <div className="hero-content-layer container-site relative z-10 flex min-h-[100dvh] flex-col justify-between py-[calc(var(--nav-height)+1rem)] pb-6 md:py-[calc(var(--nav-height)+1.5rem)] md:pb-8">
        <div data-hero-content className="hero-copy max-w-3xl pt-2 md:pt-4">
          <p className="hero-eyebrow mb-4 md:mb-6">{hero.eyebrow}</p>

          <h1 id="hero-heading" className="hero-headline-type max-w-4xl">
            <LineReveal delay={0.15} lines={["Built to mean", "something."]} />
          </h1>

          <p className="mt-6 max-w-lg body-lg md:mt-8">{hero.secondary}</p>

          <div className="hero-cta-row mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center md:mt-10 md:gap-4">
            <Link
              href="/contact"
              className="hero-cta-btn"
              data-cursor="true"
              data-cursor-label="Contact"
            >
              Discuss your project →
            </Link>
            <Link
              href="/work"
              className="hero-cta-btn hero-cta-btn--ghost"
              data-cursor="true"
              data-cursor-label="Work"
            >
              View selected work →
            </Link>
          </div>
        </div>

        <div className="hero-copy flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-8">
          <p
            data-hero-hint
            className="max-w-xs font-mono text-xs uppercase leading-relaxed tracking-widest text-text-subtle"
          >
            loopcodez · design, build, ship
          </p>
          <div className="hidden font-mono text-xs uppercase leading-relaxed tracking-widest text-text-subtle md:block">
            <p className="text-paper-muted">Est. Room 105</p>
            <p>Design · Build · Ship</p>
          </div>
        </div>
      </div>
    </section>
  );
}
