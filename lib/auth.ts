import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "salvatore-admin-session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

function getSessionSecret(): Uint8Array | null {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    return null;
  }
  return new TextEncoder().encode(secret);
}

export function verifyAdminCredentials(username: string, password: string): boolean {
  const adminUser = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminUser || !adminPassword) {
    return false;
  }

  return username === adminUser && password === adminPassword;
}

export async function createSession(): Promise<string | null> {
  const secret = getSessionSecret();
  if (!secret) {
    return null;
  }

  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(secret);
}

export async function verifySession(token: string | undefined): Promise<boolean> {
  if (!token) {
    return false;
  }

  const secret = getSessionSecret();
  if (!secret) {
    return false;
  }

  try {
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  return verifySession(token);
}

export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/admin",
    maxAge: SESSION_MAX_AGE,
  };
}
