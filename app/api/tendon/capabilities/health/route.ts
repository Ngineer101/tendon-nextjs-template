import { NextResponse } from "next/server";
import { tendonCapabilitiesRequest } from "@/lib/tendon/capabilities";

export const runtime = "nodejs";

type CapabilitiesHealthResponse = {
  ok: true;
  appId: string;
  projectName: string;
  storage: {
    enabled: boolean;
    status: "ready" | "failed" | "provisioning";
    provider: "r2";
    bucketName: string;
  } | null;
  email: {
    enabled: boolean;
    status: "ready" | "failed" | "provisioning";
    provider: "resend";
    fromEmail: string;
    domain: string | null;
    domainStatus: "unverified" | "pending" | "verified" | "failed" | null;
  } | null;
};

export async function GET() {
  try {
    const health = await tendonCapabilitiesRequest<CapabilitiesHealthResponse>({
      path: "/api/capabilities/health",
      method: "GET",
    });

    return NextResponse.json(health);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
