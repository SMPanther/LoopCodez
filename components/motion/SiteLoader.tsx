"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap, registerGsapPlugins } from "@/lib/motion/register-gsap";
import { EASE } from "@/lib/motion/easing";
import { shouldUseLightMotion } from "@/lib/motion/device-profile";
import { isLoaderComplete, shouldRunLoader, ensureAppInteractive, completeLoader } from "@/lib/loader/loader-gate";
import { startLoaderRuntime } from "@/lib/loader/loader-runtime";
import { BrandMark } from "@/components/layout/BrandMark";

export function SiteLoader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const [visible, setVisible] = useState(true);

  useLayoutEffect(() => {
    if (isLoaderComplete()) {
      setVisible(false);
      return;
    }

    if (!shouldRunLoader()) {
      completeLoader();
      setVisible(false);
      return;
    }

    const overlay = overlayRef.current;
    const panel = panelRef.current;
    const bar = barRef.current;
    const count = countRef.current;
    const status = statusRef.current;

    const setProgress = (progress: number) => {
      if (!bar || !count) return;
      const clamped = Math.max(0.06, Math.min(progress, 1));
      bar.style.transform = `scaleX(${clamped})`;
      count.textContent = String(Math.round(clamped * 105)).padStart(3, "0");
      if (status && clamped >= 0.95) {
        status.textContent = "Ready";
      }
    };

    const runtime = startLoaderRuntime({
      onProgress: setProgress,
      onExitStart: () => {
        if (!overlay) return;
        if (status) status.textContent = "Ready";

        if (shouldUseLightMotion()) {
          overlay.style.transition = "opacity 0.4s ease";
          overlay.style.opacity = "0";
          overlay.style.pointerEvents = "none";
          return;
        }

        if (!panel || !count) return;
        registerGsapPlugins();
        gsap.to(panel, {
          yPercent: -100,
          duration: 0.95,
          ease: "power3.inOut",
        });
        gsap.to(overlay, {
          autoAlpha: 0,
          duration: 0.35,
          delay: 0.72,
          ease: EASE.out,
        });
        gsap.to(count, { opacity: 0.4, duration: 0.15, ease: EASE.out });
      },
      onComplete: () => {
        setVisible(false);
      },
    });

    return () => runtime.dispose();
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      className="site-loader"
      role="status"
      aria-live="polite"
      aria-label="Loading loopcodez"
    >
      <div ref={panelRef} className="site-loader__panel">
        <div className="site-loader__grid" aria-hidden />
        <div className="site-loader__inner">
          <p data-loader-brand className="site-loader__brand">
            loopcodez
          </p>
          <BrandMark className="site-loader__mark" />
          <div className="site-loader__track" aria-hidden>
            <div ref={barRef} className="site-loader__bar" />
          </div>
          <span ref={countRef} className="site-loader__count" aria-hidden>
            000
          </span>
          <p ref={statusRef} className="site-loader__status">
            Initializing
          </p>
        </div>
      </div>
    </div>
  );
}
