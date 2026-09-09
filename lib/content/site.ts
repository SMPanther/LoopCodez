export type Service = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  outcome: string;
  proof: string;
  capabilities: string[];
};

export const services: Service[] = [
  {
    slug: "ai-agents",
    title: "AI Agents",
    tagline: "Systems that actually do the work.",
    description:
      "Task-oriented agents that execute useful work — not chat windows dressed up as products.",
    outcome: "Automate decisions, research, and multi-step workflows.",
    proof: "Internal assistants, workflow agents, tool-using systems.",
    capabilities: [
      "Agent architecture",
      "Tool use",
      "RAG",
      "API integration",
      "Workflow execution",
    ],
  },
  {
    slug: "automations",
    title: "Automations",
    tagline: "Remove the manual loop.",
    description:
      "Connect the steps between your tools so repetitive work happens reliably in the background.",
    outcome: "Remove manual handoffs and reduce operational friction.",
    proof: "Notifications, document flows, data sync, operational automations.",
    capabilities: [
      "Event triggers",
      "Data sync",
      "Webhook pipelines",
      "Ops dashboards",
      "Error recovery",
    ],
  },
  {
    slug: "web-development",
    title: "Web Development",
    tagline: "Interfaces built to ship.",
    description:
      "Websites and web apps that balance clarity, speed, and craft — from marketing to dashboards.",
    outcome: "Ship polished digital experiences that perform under real traffic.",
    proof: "Marketing sites, dashboards, interactive experiences.",
    capabilities: [
      "Marketing sites",
      "Product UI",
      "Motion systems",
      "Performance tuning",
      "Design systems",
    ],
  },
  {
    slug: "app-development",
    title: "App Development",
    tagline: "Products people open every day.",
    description:
      "Cross-platform mobile applications from prototype through production release.",
    outcome: "Turn product ideas into apps people actually use every day.",
    proof: "Mobile product flows, APIs, release engineering.",
    capabilities: [
      "Cross-platform UI",
      "API design",
      "Auth flows",
      "Release engineering",
      "Offline-first patterns",
    ],
  },
  {
    slug: "ecommerce-solutions",
    title: "Ecommerce Solutions",
    tagline: "Commerce that converts with intent.",
    description:
      "Commerce experiences engineered around discovery, checkout, and sustainable growth.",
    outcome: "Build storefronts that convert and scale with your catalog.",
    proof: "Storefronts, headless commerce, integrations.",
    capabilities: [
      "Storefront UX",
      "Catalog systems",
      "Checkout flows",
      "Headless commerce",
      "Growth integrations",
    ],
  },
  {
    slug: "content-management",
    title: "Content Management",
    tagline: "Publishing without bottlenecks.",
    description:
      "Publishing systems that give teams editorial control without developer bottlenecks.",
    outcome: "Let teams publish, iterate, and manage content independently.",
    proof: "CMS builds, editorial workflows, content tooling.",
    capabilities: [
      "CMS architecture",
      "Editorial workflows",
      "Content models",
      "Preview systems",
      "Team permissions",
    ],
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Understand",
    description:
      "Understand the problem, constraints, and what success actually looks like before pixels or code.",
  },
  {
    step: "02",
    title: "Design",
    description:
      "Shape interfaces, flows, and interaction logic with typography and hierarchy leading the way.",
  },
  {
    step: "03",
    title: "Build",
    description:
      "Engineer with performance, accessibility, and maintainability as non-negotiable constraints.",
  },
  {
    step: "04",
    title: "Ship",
    description:
      "Deploy, measure, refine — and hand over systems teams can operate without constant intervention.",
  },
];

export type Founder = {
  name: string;
  roles: string;
  tagline: string;
  personal: string;
  github: string;
};

export const founders: Founder[] = [
  {
    name: "Umer",
    roles: "Design / Frontend / Product",
    tagline: "Makes things feel intentional.",
    personal: "Turns room experiments into interfaces worth shipping.",
    github: "https://github.com/SMPanther",
  },
  {
    name: "Saqlain",
    roles: "Engineering / Systems / Development",
    tagline: "Makes ideas actually ship.",
    personal: "Builds the backends and agents that keep projects moving.",
    github: "https://github.com/sqln-ctrl",
  },
];

export const originTimeline = [
  { label: "Room 105", detail: "Two roommates, one shared room" },
  { label: "First experiments", detail: "Prototypes, tools, late-night builds" },
  { label: "First products", detail: "Real problems, real deadlines" },
  { label: "loopcodez", detail: "The habit became the studio" },
];

export const whatWeBuild = [
  { label: "AI systems", detail: "Agents, retrieval, workflow runners" },
  { label: "Web products", detail: "Marketing sites, dashboards, product UI" },
  { label: "Automation infrastructure", detail: "Pipelines, sync, ops tooling" },
  { label: "Interactive experiences", detail: "Motion, WebGL, spatial interfaces" },
  { label: "Internal tools", detail: "Admin panels, team workflows" },
  { label: "Experimental interfaces", detail: "Prototypes, lab builds, R&D" },
];

export const siteCopy = {
  hero: {
    eyebrow: "loopcodez",
    headline: "We design, build, and ship digital products with craft.",
    secondary:
      "A creative-tech studio founded by Umer and Saqlain — two roommates who turned Room 105 into a place where ideas become shipped work.",
    ctaPrimary: "Start a project",
    ctaSecondary: "View selected work",
  },
  about: {
    title: "Built from the same room.",
    body: "loopcodez started in Room 105, where two roommates began building things together. What started as experiments, late nights, and unfinished ideas became a studio focused on turning ambitious ideas into shipped digital products.",
  },
  cta: {
    title: "Have something worth building?",
    body: "Tell us about the problem. We will respond with honest scope, timeline thinking, and a clear next step.",
    button: "Get in touch",
  },
};
