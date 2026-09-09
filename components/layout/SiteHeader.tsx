"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { Magnetic } from "@/components/motion/Magnetic";
import { BrandMark } from "@/components/layout/BrandMark";
import { NavLinkMotion, ScrollHeader } from "@/components/motion/Interactions";
import { Button } from "@/components/ui/Button";
import { ensureAppInteractive, onLoaderComplete } from "@/lib/loader/loader-gate";
import { cn } from "@/lib/utils/cn";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/lab", label: "Lab" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    ensureAppInteractive();
    return onLoaderComplete(() => ensureAppInteractive());
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen((open) => !open);
  };

  return (
    <ScrollHeader>
      <div className="container-site flex h-[var(--nav-height)] items-center justify-between gap-4">
        <Link
          href="/"
          className="group flex items-center gap-3 transition-opacity hover:opacity-90"
          aria-label="loopcodez home"
        >
          <BrandMark className="brand-mark--bare" />
          <span className="hidden font-display text-sm font-semibold tracking-tight sm:inline">
            loopcodez
          </span>
        </Link>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Primary"
        >
          {navLinks.map((link) => (
            <NavLinkMotion key={link.href} href={link.href}>
              {link.label}
            </NavLinkMotion>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Magnetic strength={0.22}>
            <Button
              href="/contact"
              className="hidden sm:inline-flex"
              data-cursor="true"
              data-cursor-label="Let's talk"
            >
              Book a call
            </Button>
          </Magnetic>

          <button
            ref={toggleRef}
            type="button"
            className="relative z-[2] inline-flex h-11 w-11 touch-manipulation items-center justify-center rounded-md border border-line-strong md:hidden"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={toggleMenu}
          >
            <span className="sr-only">{menuOpen ? "Close" : "Menu"}</span>
            <span aria-hidden className="flex flex-col gap-1">
              <span
                className={cn(
                  "block h-px w-4 bg-paper transition-transform",
                  menuOpen && "translate-y-1.5 rotate-45",
                )}
              />
              <span
                className={cn(
                  "block h-px w-4 bg-paper transition-opacity",
                  menuOpen && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "block h-px w-4 bg-paper transition-transform",
                  menuOpen && "-translate-y-1.5 -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          ref={menuRef}
          id={menuId}
          className="relative z-[1] border-t border-line bg-ink md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <nav className="container-site flex flex-col gap-1 py-4" aria-label="Mobile primary">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-3 text-base text-paper transition-colors hover:bg-fog/20"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-2 rounded-md border border-signal bg-signal px-3 py-3 text-center text-sm font-medium text-ink"
              onClick={() => setMenuOpen(false)}
            >
              Book a call
            </Link>
          </nav>
        </div>
      )}
    </ScrollHeader>
  );
}
