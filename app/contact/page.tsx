import { ContactForm } from "@/components/contact/ContactForm";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Start a project with loopcodez. Tell us about the problem and we will respond with honest scope thinking.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="section-pad">
      <div className="container-site max-w-2xl">
        <SectionMarker index="→" label="Contact" className="mb-4" />
        <h1 className="display-heading mb-4 text-4xl text-paper">
          Start a conversation.
        </h1>
        <p className="mb-10 body-lg">
          Tell us about the problem you are trying to solve. We will respond with
          honest scope thinking and a clear next step.
        </p>
        <ContactForm />
      </div>
    </div>
  );
}
