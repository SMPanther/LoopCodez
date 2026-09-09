"use client";

import { useEffect } from "react";
import { markLoaderHeroReady } from "@/lib/loader/loader-gate";
import { BrandMark } from "@/components/layout/BrandMark";

type HeroSceneFallbackProps = {
  className?: string;
};

export function HeroSceneFallback({ className }: HeroSceneFallbackProps) {
  useEffect(() => {
    markLoaderHeroReady();
  }, []);

  return (
    <div
      className={`hero-visual-fallback ${className ?? ""}`}
      role="img"
      aria-label="loopcodez mark — static fallback when WebGL or motion is reduced"
    >
      <BrandMark className="brand-mark--hero" />
    </div>
  );
}
