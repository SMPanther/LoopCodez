import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SectionMarker } from "@/components/ui/SectionMarker";

export default function NotFound() {
  return (
    <div className="section-pad">
      <div className="container-site max-w-2xl text-center md:text-left">
        <SectionMarker index="404" label="Not found" className="mb-4 justify-center md:justify-start" />
        <h1 className="display-heading mb-4 text-4xl text-paper">
          This page does not exist.
        </h1>
        <p className="mb-10 body-lg">
          The route may have moved or never shipped. Head back to the studio
          homepage or browse selected work.
        </p>
        <div className="flex flex-wrap justify-center gap-4 md:justify-start">
          <Button href="/">Back to home</Button>
          <Button href="/work" variant="secondary">
            View work
          </Button>
        </div>
        <p className="mt-12 font-mono text-xs uppercase tracking-widest text-text-subtle">
          loopcodez · Room 105 origin
        </p>
      </div>
    </div>
  );
}
