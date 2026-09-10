import { TextLink } from "@/components/ui/TextLink";
import { Button } from "@/components/ui/Button";
import { BrandMark } from "@/components/layout/BrandMark";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Mail } from "lucide-react";

const footerLinks = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/lab", label: "Lab" },
  { href: "/about", label: "About" },
];

const socialLinks = [
  {
    href: "https://instagram.com/loopcodez",
    label: "Instagram",
    icon: FaInstagram,
  },
  {
    href: "https://linkedin.com/",
    label: "LinkedIn",
    icon: FaLinkedin,
  },
  {
    href: "mailto:loopcodez@gmail.com",
    label: "Email",
    icon: Mail,
  },
  {
    href: "https://github.com/loopcodez",
    label: "GitHub",
    icon: FaGithub,
  },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer border-t border-line bg-ink-soft">
      <div className="container-site section-pad !pb-12 !pt-16">
        <div className="grid-site gap-y-10">
          <div className="col-span-12 lg:col-span-7">
            <div className="mb-4 flex items-center gap-3">
              <BrandMark className="brand-mark--bare" />
              <p className="font-display text-xl font-semibold tracking-tight">
                loopcodez
              </p>
            </div>

            <p className="display-heading max-w-lg text-3xl text-paper md:text-4xl">
              Built to mean something.
            </p>

            <p className="mt-4 max-w-md text-sm text-text-muted">
              Have something worth building?
            </p>

            <div className="mt-6">
              <Button href="/contact">Let&apos;s talk →</Button>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 lg:flex lg:flex-col lg:items-end">
            <nav
              className="flex flex-wrap items-center gap-x-7 gap-y-3"
              aria-label="Footer"
            >
              {footerLinks.map((link) => (
                <TextLink
                  key={link.href}
                  href={link.href}
                  showArrow={false}
                >
                  {link.label}
                </TextLink>
              ))}
            </nav>

            <div className="mt-6 flex items-center gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;

              return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    target={
                      social.href.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      social.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-text-muted transition-all duration-200 hover:border-text-muted hover:text-paper"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>

            <p className="mt-5 font-mono text-[10px] uppercase tracking-widest text-text-subtle">
              loopcodez · {year}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}