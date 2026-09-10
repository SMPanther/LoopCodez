import { NextResponse } from "next/server";
import { addAdmin, changeAdminPassword, requireAdmin } from "@/lib/admin/auth";

export async function POST(request: Request) {
  try {
    const email = await requireAdmin();
    const body = (await request.json()) as {
      action?: "change-password" | "add-admin";
      password?: string;
      newEmail?: string;
    };
    if (!body.password || body.password.length < 10) {
      return NextResponse.json({ error: "Passwords must be at least 10 characters." }, { status: 400 });
    }
    if (body.action === "change-password") {
      await changeAdminPassword(email, body.password);
    } else if (body.action === "add-admin" && body.newEmail) {
      await addAdmin(body.newEmail, body.password);
    } else {
      return NextResponse.json({ error: "Invalid settings action." }, { status: 400 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }
    if (error instanceof Error && error.message === "ADMIN_EXISTS") {
      return NextResponse.json({ error: "That admin email already exists." }, { status: 409 });
    }
    throw error;
  }
}
