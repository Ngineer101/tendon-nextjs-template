import "server-only";
import { tendonCapabilitiesRequest } from "@/lib/tendon/capabilities";

export type CreateUploadUrlInput = {
  path: string;
  contentType?: string;
  sizeBytes?: number;
};

export type CreateUploadUrlOutput = {
  objectKey: string;
  uploadUrl: string;
  expiresInSeconds: number;
  requiredHeaders: Record<string, string>;
};

export type CreateDownloadUrlInput = {
  path: string;
};

export type CreateDownloadUrlOutput = {
  objectKey: string;
  downloadUrl: string;
  expiresInSeconds: number;
};

export type DeleteObjectInput = {
  path: string;
};

export async function createSignedUploadUrl(
  input: CreateUploadUrlInput,
): Promise<CreateUploadUrlOutput> {
  return tendonCapabilitiesRequest<CreateUploadUrlOutput>({
    path: "/api/capabilities/storage/upload-url",
    method: "POST",
    body: input,
  });
}

export async function createSignedDownloadUrl(
  input: CreateDownloadUrlInput,
): Promise<CreateDownloadUrlOutput> {
  return tendonCapabilitiesRequest<CreateDownloadUrlOutput>({
    path: "/api/capabilities/storage/download-url",
    method: "POST",
    body: input,
  });
}

export async function deleteStoredObject(input: DeleteObjectInput): Promise<{ ok: true; objectKey: string }> {
  return tendonCapabilitiesRequest<{ ok: true; objectKey: string }>({
    path: "/api/capabilities/storage/delete",
    method: "POST",
    body: input,
  });
}
