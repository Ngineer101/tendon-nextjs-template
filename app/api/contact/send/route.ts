import { NextResponse } from "next/server";
import { z } from "zod";
import { sendEmail } from "@/lib/tendon/email";

export const runtime = "nodejs";

const bodySchema = z
  .object({
    to: z.union([z.string().email(), z.array(z.string().email()).min(1)]),
    subject: z.string().min(1),
    html: z.string().min(1).optional(),
    text: z.string().min(1).optional(),
    from: z.string().min(1).optional(),
  })
  .refine((value) => Boolean(value.html || value.text), {
    message: "Either html or text is required",
  });

export async function POST(req: Request) {
  try {
    const body = bodySchema.parse(await req.json());
    const result = await sendEmail(body);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
