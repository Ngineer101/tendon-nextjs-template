import "server-only";
import { tendonCapabilitiesRequest } from "@/lib/tendon/capabilities";

export type SendEmailInput = {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;
};

export type SendEmailOutput = {
  ok: true;
  id: string | null;
};

export async function sendEmail(input: SendEmailInput): Promise<SendEmailOutput> {
  return tendonCapabilitiesRequest<SendEmailOutput>({
    path: "/api/capabilities/email/send",
    method: "POST",
    body: input,
  });
}
