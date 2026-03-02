import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";

const baseURL = process.env.BETTER_AUTH_URL ?? "http://localhost:3000";
const secret =
  process.env.BETTER_AUTH_SECRET ??
  (process.env.NODE_ENV === "production" ? undefined : "dev-only-secret-change-me");

if (!secret) {
  throw new Error("BETTER_AUTH_SECRET must be set in production");
}

export const auth = betterAuth({
  baseURL,
  secret,
  trustedOrigins: [baseURL],
  emailAndPassword: {
    enabled: true,
  },
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema,
  }),
  plugins: [nextCookies()],
});
