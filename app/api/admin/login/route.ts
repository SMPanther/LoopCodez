import { NextResponse } from "next/server";
import { authenticateAdmin, createAdminSession } from "@/lib/admin/auth";

export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string; password?: string };
  if (!body.email || !body.password || !(await authenticateAdmin(body.email, body.password))) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }
  await createAdminSession(body.email);
  return NextResponse.json({ ok: true });
}
