"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, registerGsapPlugins } from "@/lib/motion/register-gsap";
import { prefersReducedMotion } from "@/lib/motion/reduced-motion";
import { getDeviceProfile } from "@/lib/motion/device-profile";
import { HeroSceneFallback } from "@/components/webgl/HeroSceneFallback";
import { createHeroState } from "@/lib/webgl/hero-state";
import { updateHeroBridge } from "@/lib/webgl/hero-bridge";
import {
  isLoaderComplete,
  markLoaderHeroReady,
  onLoaderComplete,
} from "@/lib/loader/loader-gate";
import {
  createHeroScene,
  renderHeroFrame,
  type HeroSceneContext,
} from "@/lib/webgl/create-hero-scene";

function supportsWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

type HeroSceneCanvasProps = {
  className?: string;
};

export function HeroSceneCanvas({ className }: HeroSceneCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<HeroSceneContext | null>(null);
  const rafRef = useRef<number>(0);
  const visibleRef = useRef(true);
  const heroReadyRef = useRef(false);
  const [useFallback, setUseFallback] = useState(false);
  const [isLightMotion, setIsLightMotion] = useState(false);

  useEffect(() => {
    const profile = getDeviceProfile();
    setIsLightMotion(profile.lightMotion);

    if (prefersReducedMotion()) {
      markLoaderHeroReady();
      setUseFallback(true);
      return;
    }

    if (!supportsWebGL()) {
      markLoaderHeroReady();
      setUseFallback(true);
      return;
    }

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) {
      markLoaderHeroReady();
      return;
    }

    const state = createHeroState();
    let ctx: HeroSceneContext;
    let assemblyTween: gsap.core.Tween | null = null;

    try {
      ctx = createHeroScene({ canvas, state, quality: profile.heroQuality });
      ctxRef.current = ctx;
      ctx.resize();
      renderHeroFrame(ctx);
      markLoaderHeroReady();
    } catch {
      markLoaderHeroReady();
      setUseFallback(true);
      return;
    }

    registerGsapPlugins();

    const startAssembly = () => {
      assemblyTween?.kill();
      assemblyTween = gsap.to(state, {
        assemblyAmount: 1,
        duration: 1.15,
        ease: "power3.out",
      });
    };

    if (isLoaderComplete()) {
      startAssembly();
    } else {
      onLoaderComplete(startAssembly);
    }

    const heroStage = container.closest(".hero-stage") ?? container;

    const scrollTween = gsap.to(state, {
      scrollProgress: 1,
      ease: "none",
      scrollTrigger: {
        trigger: heroStage,
        start: "top top",
        end: "bottom top",
        scrub: 0.6,
      },
    });

    const dissolveTween = gsap.to(state, {
      dissolveAmount: 1,
      ease: "none",
      scrollTrigger: {
        trigger: heroStage,
        start: "10% top",
        end: "90% top",
        scrub: 0.45,
        onUpdate() {
          updateHeroBridge({ dissolveAmount: state.dissolveAmount });
        },
      },
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        state.isActive = entry.isIntersecting;
      },
      { threshold: 0.01, rootMargin: "50px" },
    );
    observer.observe(container);

    const syncVisualCenter = () => {
      const rect = container.getBoundingClientRect();
      updateHeroBridge({
        visualCenterX: (rect.left + rect.width / 2) / window.innerWidth,
        visualCenterY: (rect.top + rect.height / 2) / window.innerHeight,
      });
    };

    const onResize = () => {
      ctx.resize();
      syncVisualCenter();
    };
    window.addEventListener("resize", onResize);
    ctx.resize();
    syncVisualCenter();

    const updatePointer = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      state.pointerX = ((clientX - rect.left) / rect.width - 0.5) * 2;
      state.pointerY = ((clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (profile.lightMotion || !isLoaderComplete()) return;
      updatePointer(event.clientX, event.clientY);
    };

    const onPointerDown = (event: PointerEvent) => {
      if (profile.lightMotion || !isLoaderComplete()) return;
      state.isPointerDown = true;
      container.setPointerCapture(event.pointerId);
      updatePointer(event.clientX, event.clientY);
    };

    const onPointerUp = (event: PointerEvent) => {
      state.isPointerDown = false;
      if (container.hasPointerCapture(event.pointerId)) {
        container.releasePointerCapture(event.pointerId);
      }
    };

    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointercancel", onPointerUp);
    container.addEventListener("pointerleave", onPointerUp);

    let frameCount = 0;
    const loop = () => {
      rafRef.current = requestAnimationFrame(loop);
      if (!ctxRef.current) return;
      const shouldRender = visibleRef.current || !isLoaderComplete();
      if (shouldRender) {
        renderHeroFrame(ctxRef.current);
        frameCount += 1;
        if (!heroReadyRef.current && frameCount >= 1) {
          heroReadyRef.current = true;
          markLoaderHeroReady();
        }
      }
      updateHeroBridge({
        dissolveAmount: state.dissolveAmount,
        explodeAmount: state.explodeAmount,
        assemblyAmount: state.assemblyAmount,
        pointerX: state.pointerX,
        pointerY: state.pointerY,
        isPointerDown: state.isPointerDown,
      });
    };
    loop();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointercancel", onPointerUp);
      container.removeEventListener("pointerleave", onPointerUp);
      observer.disconnect();
      assemblyTween?.kill();
      scrollTween.scrollTrigger?.kill();
      scrollTween.kill();
      dissolveTween.scrollTrigger?.kill();
      dissolveTween.kill();
      ctx.dispose();
      ctxRef.current = null;
    };
  }, []);

  if (useFallback) {
    return <HeroSceneFallback className={className} />;
  }

  return (
    <div
      ref={containerRef}
      className={`hero-visual-canvas ${isLightMotion ? "hero-visual-canvas--light" : ""} ${className ?? ""}`}
      aria-label={
        isLightMotion
          ? "loopcodez signature object"
          : "Interactive 105 object — hold to disassemble, move to tilt"
      }
    >
      <canvas
        ref={canvasRef}
        className={`h-full w-full ${isLightMotion ? "hero-canvas--scroll" : "touch-none"}`}
      />
    </div>
  );
}
