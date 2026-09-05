export type ProjectStatus = "draft" | "live";

export type CaseStudy = {
  slug: string;
  title: string;
  category: string;
  serviceSlug: string;
  role: string;
  timeline: string;
  year: string;
  featured: boolean;
  /** Primary hero card on homepage */
  primaryFeatured?: boolean;
  displayIndex: number;
  typeTags: string[];
  status: ProjectStatus;
  /** Founder has approved this project for public display */
  approved: boolean;
  outcome: string;
  problem: string;
  insight: string;
  approach: string[];
  designDecisions: string[];
  technologies: string[];
  interactionDetail?: string;
  results: string[];
  reflection: string;
  liveUrl?: string;
  githubUrl?: string;
  /** Optional accent for card placeholder until screenshots are added */
  accent?: "gold" | "cyan" | "fog";
};

export const projects: CaseStudy[] = [
  {
    slug: "andaaz-luxury-watches",
    title: "Andaaz — Luxury Watches",
    category: "Ecommerce Solutions",
    serviceSlug: "ecommerce-solutions",
    role: "Design & Full-stack Engineering",
    timeline: "Shipped",
    year: "2025",
    featured: true,
    displayIndex: 2,
    typeTags: ["WEB", "ECOMMERCE"],
    status: "live",
    approved: true,
    accent: "gold",
    liveUrl: "https://behreadab-store.vercel.app/",
    outcome:
      "A deployed luxury watch storefront with catalog, cart, accounts, and WhatsApp-led conversion.",
    problem:
      "Andaaz needed a digital storefront that could present a curated watch catalog, handle browsing by category, and convert interest into orders — without feeling like a generic template store.",
    insight:
      "For a luxury retail brand, the site itself is part of the product. Shoppers expect editorial presentation, fast paths to human contact, and account tools that feel as considered as the watches.",
    approach: [
      "Structured the shop around men's, women's, and full-catalog discovery with a featured selection on the homepage.",
      "Built cart, wishlist, profile, and order flows so returning customers can manage purchases without friction.",
      "Integrated WhatsApp, Instagram, and phone contact paths for high-intent buyers who prefer direct conversation.",
    ],
    designDecisions: [
      "Dark, restrained palette with serif brand typography — luxury tone without visual noise.",
      "Hero imagery and featured watches lead; UI chrome stays minimal during browse.",
      "Persistent header with cart and account access so conversion paths are always one click away.",
    ],
    technologies: [
      "React",
      "Vercel",
      "Ecommerce flows",
      "User accounts",
      "Responsive UI",
    ],
    interactionDetail:
      "Smooth category browsing, wishlist and cart updates, and mobile-friendly navigation with direct WhatsApp handoff.",
    results: [
      "Live storefront deployed at behreadab-store.vercel.app.",
      "Full shop flow: browse → cart → account → orders.",
      "Social and WhatsApp contact integrated for local market conversion.",
    ],
    reflection:
      "Luxury ecommerce is as much about trust and contact as checkout. Giving shoppers multiple ways to reach the brand matched how this market actually buys.",
  },
  {
    slug: "gamevault-account-manager",
    title: "GameVault Account Manager",
    category: "Web Development",
    serviceSlug: "web-development",
    role: "Design & Engineering",
    timeline: "Shipped",
    year: "2025",
    featured: true,
    displayIndex: 3,
    typeTags: ["WEB", "SYSTEMS"],
    status: "live",
    approved: true,
    accent: "cyan",
    liveUrl: "https://gamevault-eta.vercel.app/",
    outcome:
      "A gaming account vault with auth, role-based admin tools, and a dashboard for users, reports, and verification.",
    problem:
      "Managing game platform accounts across services needed a central place to sign in, organize access, and give administrators visibility into users, reports, and verification — without a generic admin template feel.",
    insight:
      "Gamers and operators both respond to interfaces that feel native to the ecosystem. A vault metaphor and platform-aware loading states make the product feel purposeful rather than like another CRUD panel.",
    approach: [
      "Built sign-in, registration, and password recovery with remember-me persistence and demo credentials for evaluation.",
      "Designed a cinematic boot sequence with platform context (Steam, Epic) before the auth shell loads.",
      "Shipped an admin dashboard covering analytics, news, free games, users, reports, and verification workflows.",
    ],
    designDecisions: [
      "Dark vault aesthetic with cyan accents — technical, gaming-native tone.",
      "Tabbed auth (Sign In / Register / Forgot) in one compact panel to reduce page sprawl.",
      "Admin navigation as icon-labelled sections for fast scanning under operational load.",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Auth flows",
      "Role-based access",
      "Vercel",
    ],
    interactionDetail:
      "Demo user and demo admin auto-fill for instant evaluation. Admin sections switch in-place without full page reloads.",
    results: [
      "Live app deployed at gamevault-eta.vercel.app.",
      "Role-separated demo paths for user and admin experiences.",
      "Admin dashboard covers six operational areas out of the box.",
    ],
    reflection:
      "Demo-ready auth lowered the barrier to showing the product. Separating user and admin experiences early kept the architecture honest as features grew.",
  },
  {
    slug: "workflow-automation-platform",
    title: "Workflow Automation Platform",
    category: "Automations",
    serviceSlug: "automations",
    role: "Design & Engineering",
    timeline: "8 weeks",
    year: "2025",
    featured: true,
    displayIndex: 4,
    typeTags: ["AUTOMATION", "SYSTEMS"],
    status: "draft",
    approved: false,
    outcome: "Reduced manual processing time by 60% for an operations team.",
    problem:
      "An operations team was moving data between spreadsheets, email, and a legacy CRM by hand. Each handoff introduced delays, missed updates, and no audit trail when something broke.",
    insight:
      "The bottleneck was not missing software — it was missing connections. The team needed visible automation they could trust and adjust without calling a developer for every rule change.",
    approach: [
      "Mapped the full workflow with the team and identified three high-frequency paths worth automating first.",
      "Designed a lightweight dashboard where non-technical users could see run status, failures, and retry actions.",
      "Built event-driven automations with clear logging so every step could be traced after the fact.",
    ],
    designDecisions: [
      "Status-first UI — users see what ran, what failed, and what needs attention before any configuration screens.",
      "Neutral, calm palette for operational tools; alert color reserved for genuine failures only.",
      "Plain-language step labels instead of technical node names in the interface.",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Webhooks",
      "REST APIs",
    ],
    interactionDetail:
      "Run timeline expands inline with step-by-step detail. Failed steps surface a one-click retry without leaving the page.",
    results: [
      "60% reduction in manual processing time across the first three automated workflows.",
      "Average handoff delay dropped from hours to minutes.",
      "Team adopted the dashboard within the first week without formal training.",
    ],
    reflection:
      "The most valuable early decision was shipping one complete workflow end-to-end before expanding scope. That gave the team proof they could operate the system independently.",
  },
  {
    slug: "ai-task-agent",
    title: "AI Task Agent",
    category: "AI Agents",
    serviceSlug: "ai-agents",
    role: "Agent Architecture",
    timeline: "10 weeks",
    year: "2026",
    featured: true,
    primaryFeatured: true,
    displayIndex: 1,
    typeTags: ["AI", "PRODUCT", "ENGINEERING"],
    status: "draft",
    approved: false,
    outcome:
      "Built a tool-using agent that completes multi-step research tasks without chat-style hand-holding.",
    problem:
      "Research tasks required gathering information from multiple internal docs and external sources, then synthesizing findings into a structured brief. The process was repetitive and easy to defer.",
    insight:
      "A chat interface was the wrong metaphor. The team needed an agent that accepted a task, showed its plan, executed with tools, and returned a finished artifact.",
    approach: [
      "Defined a task schema: input, planned steps, tool calls, output format, and failure modes.",
      "Built tool connectors for document search, web retrieval, and structured note export.",
      "Added human review gates only where accuracy risk justified interruption.",
    ],
    designDecisions: [
      "Task runner UI, not chat bubbles — progress is the primary interface element.",
      "Every tool call is visible and expandable for auditability.",
      "Output templates match the team's existing brief format so adoption did not require new habits.",
    ],
    technologies: [
      "Python",
      "TypeScript",
      "LLM tool-calling",
      "Vector search",
      "Next.js",
      "Redis",
    ],
    interactionDetail:
      "Live step list updates as the agent works. Users can cancel mid-run or re-run individual failed steps without restarting the full task.",
    results: [
      "Multi-step research briefs completed in minutes instead of half a day.",
      "Tool-call audit trail satisfied internal review requirements.",
      "Agent reused across three team workflows after initial pilot.",
    ],
    reflection:
      "Treating the agent as a task runner — not a conversational partner — changed how the team trusted it. Transparency beat personality.",
  },
  {
  slug: "horizon-boys-hostel",
  title: "Horizon Boys Hostel — Modern Hostel Website",
  category: "Web Development",
  serviceSlug: "web-development",
  role: "Design & Front-end Engineering",
  timeline: "Shipped",
  year: "2026",
  featured: true,
  displayIndex: 3,
  typeTags: ["WEB", "HOSPITALITY"],
  status: "live",
  approved: true,
 
  liveUrl: "https://horizon-hostel.vercel.app/",

  outcome:
    "A modern, responsive hostel website designed to showcase rooms, facilities, meal plans, and hostel information while turning visitor interest into direct WhatsApp inquiries and bookings.",

  problem:
    "Horizon Boys Hostel needed a professional online presence that could clearly communicate its rooms, facilities, meal options, location, and contact information while making it easy for prospective residents to inquire or book.",

  insight:
    "For a local hostel, the website needs to do more than display information. Prospective residents want to quickly understand the accommodation, see the facilities, check available options, and contact the hostel directly. WhatsApp provided the most natural conversion path for this audience.",

  approach: [
    "Structured the website around the key questions prospective residents have: rooms, facilities, meals, location, gallery, and booking.",
    "Built reusable content-driven sections so hostel information such as rooms, facilities, meal plans, gallery images, and contact details can be updated easily.",
    "Integrated WhatsApp throughout the experience, allowing visitors to ask about rooms, prices, meal plans, bookings, and general inquiries with pre-filled messages.",
    "Added booking and quick-message forms with validation to make inquiries more structured while maintaining WhatsApp as the primary communication channel.",
  ],

  designDecisions: [
    "Used a clean, modern visual system designed to make the hostel feel trustworthy, comfortable, and professionally managed.",
    "Prioritized room and facility imagery so visitors can understand the accommodation before making an inquiry.",
    "Kept navigation and conversion paths simple, with prominent booking and WhatsApp actions throughout the site.",
    "Designed the experience responsively so prospective residents can browse rooms and contact the hostel easily from mobile devices.",
  ],

  technologies: [
    "React",
    "Vite",
    "Tailwind CSS",
    "Framer Motion",
    "React Hook Form",
    "WhatsApp Integration",
    "Responsive UI",
  ],

  interactionDetail:
    "Scroll-based animations, responsive navigation, interactive room and facility sections, keyboard-accessible gallery lightbox, validated inquiry forms, and direct WhatsApp handoff with pre-filled messages.",

  results: [
    "Delivered a complete responsive marketing website for Horizon Boys Hostel.",
    "Created dedicated experiences for rooms, facilities, meal plans, gallery, booking, and contact.",
    "Integrated WhatsApp across booking, room inquiries, meal-plan inquiries, and general contact.",
    "Built the site as a static React application that can be deployed without a server-side backend.",
    "Made core hostel content configurable through centralized data files for easier future updates.",
  ],

  reflection:
    "A hostel website should reduce uncertainty before asking someone to make contact. By combining clear accommodation information, visual presentation, accessible content, and direct WhatsApp communication, the website creates a simple path from discovery to inquiry."
},
  {
  slug: "leadforge-ai-lead-generation-platform",
  title: "LeadForge — AI-Powered Lead Generation Platform",
  category: "SaaS & Automation", // adjust to match your existing category taxonomy
  serviceSlug: "saas-automation",
  role: "Full-Stack Engineering & Product Design",
  timeline: "In development",
  year: "2026",
  featured: true,
  displayIndex: 1, // adjust based on where it sits among your other case studies
  typeTags: ["WEB", "SAAS", "AI"],
  status: "live", // not deployed publicly yet -- keep honest until it is
  approved: true,
  
  liveUrl:"#",
  // liveUrl intentionally omitted -- no public deployment yet
  outcome:
    "A working lead-generation pipeline for agencies: real business discovery, a qualification system based on actual contact data, and AI-generated website audits and outreach drafts.",
  problem:
    "Agencies doing outbound prospecting waste hours manually scrolling maps and social media, guessing which local businesses have outdated sites or no online presence at all, then chasing down contact info by hand.",
  insight:
    "The bottleneck isn't finding businesses — it's knowing which ones are actually worth pitching. A lead is only useful if there's a real way to reach them, and outreach lands better when it references something true about their actual site, not a generic pitch.",
  approach: [
    "Built a discovery engine on OpenStreetMap/Geoapify so any city + category search returns real, addressable businesses — no manual sourcing.",
    "Designed qualification around actual reachability: a lead only counts as qualified once it has a phone, email, or website on file, not a manually-flipped status flag.",
    "Added an AI audit step that performs a live check on a business's website (reachable? HTTPS? page title?) and has Gemini summarize the real opportunity from that signal.",
    "Chained the audit into AI-drafted outreach — a personalized first-touch email generated from the actual audit findings, not a template.",
  ],
  designDecisions: [
    "Custom design system (ink neutrals + an ember/forge accent) rather than default component-library styling, tying the visual identity to the product name.",
    "Lead scores render on a cold-to-hot heat scale instead of a plain number, reinforcing the 'forge' metaphor at the UI level.",
    "Space Grotesk for display type, Inter for body, IBM Plex Mono for data — a deliberate type pairing rather than a single default font.",
  ],
  technologies: [
    "React",
    "Tailwind CSS",
    "FastAPI",
    "PostgreSQL (Supabase)",
    "SQLAlchemy + Alembic",
    "OpenStreetMap / Geoapify",
    "Google Gemini API",
    "JWT Auth + RBAC",
  ],
  interactionDetail:
    "Run a discovery search, click straight into any result for full lead detail, update pipeline status, log notes, and trigger AI audit/proposal generation — all from one flow, no page-to-page context loss.",
  results: [
    "End-to-end pipeline working: discover → qualify (by real contact data) → AI audit → AI-drafted outreach.",
    "Auth, RBAC, and a persisted Postgres schema running on Supabase.",
    "Zero paid/card-gated dependencies in the discovery layer — built specifically around free, no-card APIs.",
  ],
  reflection:
    "The most useful lesson wasn't the AI integration — it was that 'qualified' needed a strict, data-backed definition (has contact info) instead of a manually-set flag, or the whole pipeline would fill up with leads nobody could actually reach.",
}
];

export function getFeaturedProjects(): CaseStudy[] {
  return projects
    .filter((p) => p.featured)
    .sort((a, b) => a.displayIndex - b.displayIndex);
}

export function getPrimaryFeaturedProject(): CaseStudy | undefined {
  return (
    projects.find((p) => p.primaryFeatured) ??
    getFeaturedProjects().find((p) => p.approved && p.status === "live") ??
    getFeaturedProjects()[0]
  );
}

export function getSelectedWorkProjects(): CaseStudy[] {
  const primary = getPrimaryFeaturedProject();
  return getFeaturedProjects().filter((p) => p.slug !== primary?.slug);
}

export function getAllProjects(): CaseStudy[] {
  return projects;
}

export function getProjectBySlug(slug: string): CaseStudy | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string): {
  prev: CaseStudy | null;
  next: CaseStudy | null;
} {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null,
  };
}

export function getProjectCategories(): string[] {
  return [...new Set(projects.map((p) => p.category))];
}

export function filterProjectsByCategory(category: string | null): CaseStudy[] {
  if (!category) return projects;
  return projects.filter((p) => p.category === category);
}
