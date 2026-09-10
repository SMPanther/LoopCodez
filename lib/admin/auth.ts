import "server-only";

import { createHmac, randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { cookies } from "next/headers";

const scrypt = promisify(scryptCallback);
const dataDirectory = path.join(process.cwd(), ".data");
const adminsFile = path.join(dataDirectory, "admins.json");
const sessionCookie = "studio105_admin_session";
const sessionMaxAge = 60 * 60 * 24 * 7;

type AdminRecord = {
  email: string;
  passwordHash: string;
};

function sessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not configured");
  return secret;
}

async function readAdmins(): Promise<AdminRecord[]> {
  try {
    return JSON.parse(await readFile(adminsFile, "utf8")) as AdminRecord[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

async function writeAdmins(admins: AdminRecord[]) {
  await mkdir(dataDirectory, { recursive: true });
  await writeFile(adminsFile, `${JSON.stringify(admins, null, 2)}\n`, "utf8");
}

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const derived = (await scrypt(password, salt, 64)) as Buffer;
  return `${salt}:${derived.toString("hex")}`;
}

async function verifyHash(password: string, encoded: string) {
  const [salt, storedHex] = encoded.split(":");
  if (!salt || !storedHex) return false;
  const derived = (await scrypt(password, salt, 64)) as Buffer;
  const stored = Buffer.from(storedHex, "hex");
  return stored.length === derived.length && timingSafeEqual(stored, derived);
}

async function allAdmins() {
  const stored = await readAdmins();
  const envEmail = process.env.ADMIN_EMAIL;
  const envPassword = process.env.ADMIN_PASSWORD;
  if (stored.length === 0 && envEmail && envPassword) {
    return [{ email: envEmail.toLowerCase(), password: envPassword, source: "env" as const }];
  }
  return stored.map((admin) => ({ ...admin, source: "stored" as const }));
}

export async function authenticateAdmin(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const admins = await allAdmins();
  const account = admins.find((admin) => admin.email === normalizedEmail);
  if (!account) return false;
  return "password" in account
    ? account.password === password
    : verifyHash(password, account.passwordHash);
}

function signSession(email: string) {
  const payload = Buffer.from(JSON.stringify({ email, expires: Date.now() + sessionMaxAge * 1000 })).toString("base64url");
  const signature = createHmac("sha256", sessionSecret()).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

function verifySession(value: string | undefined) {
  if (!value) return null;
  const [payload, signature] = value.split(".");
  if (!payload || !signature) return null;
  const expected = createHmac("sha256", sessionSecret()).update(payload).digest("base64url");
  if (signature.length !== expected.length || !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
  const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { email?: string; expires?: number };
  if (!parsed.email || !parsed.expires || parsed.expires < Date.now()) return null;
  return parsed.email;
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  return verifySession(cookieStore.get(sessionCookie)?.value);
}

export async function requireAdmin() {
  const email = await getAdminSession();
  if (!email) throw new Error("UNAUTHORIZED");
  return email;
}

export async function createAdminSession(email: string) {
  const cookieStore = await cookies();
  cookieStore.set(sessionCookie, signSession(email.toLowerCase()), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: sessionMaxAge,
    path: "/",
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(sessionCookie);
}

export async function changeAdminPassword(email: string, password: string) {
  const admins = await readAdmins();
  const next = admins.filter((admin) => admin.email !== email);
  next.push({ email, passwordHash: await hashPassword(password) });
  await writeAdmins(next);
}

export async function addAdmin(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const admins = await allAdmins();
  if (admins.some((admin) => admin.email === normalizedEmail)) {
    throw new Error("ADMIN_EXISTS");
  }
  const stored = (await readAdmins()).filter((admin) => admin.email !== normalizedEmail);
  if (stored.length === 0 && process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
    stored.push({
      email: process.env.ADMIN_EMAIL.toLowerCase(),
      passwordHash: await hashPassword(process.env.ADMIN_PASSWORD),
    });
  }
  stored.push({ email: normalizedEmail, passwordHash: await hashPassword(password) });
  await writeAdmins(stored);
}
