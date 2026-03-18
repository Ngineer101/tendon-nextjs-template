import { NextResponse } from "next/server";
import { z } from "zod";
import { createSignedUploadUrl } from "@/lib/tendon/storage";

export const runtime = "nodejs";

const bodySchema = z.object({
  path: z.string().min(1),
  contentType: z.string().min(1).optional(),
  sizeBytes: z.number().int().positive().optional(),
});

export async function POST(req: Request) {
  try {
    const body = bodySchema.parse(await req.json());
    const result = await createSignedUploadUrl(body);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
