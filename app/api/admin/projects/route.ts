import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { saveProject } from "@/lib/content/project-store";
import type { CaseStudy } from "@/lib/content/projects";

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const project = (await request.json()) as CaseStudy;
    if (!project.slug || !project.title || !project.category || !project.outcome) {
      return NextResponse.json({ error: "Slug, title, category, and outcome are required." }, { status: 400 });
    }
    await saveProject(project);
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }
    throw error;
  }
}
