import "server-only";

type CapabilityRequestOptions = {
  path: string;
  method?: "GET" | "POST";
  body?: unknown;
};

function requireEnv(name: "TENDON_CAPABILITIES_BASE_URL" | "TENDON_APP_ID" | "TENDON_RUNTIME_TOKEN") {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`${name} is required to use Tendon capabilities`);
  }

  return value;
}

export async function tendonCapabilitiesRequest<T>(options: CapabilityRequestOptions): Promise<T> {
  const baseUrl = requireEnv("TENDON_CAPABILITIES_BASE_URL").replace(/\/+$/, "");
  const appId = requireEnv("TENDON_APP_ID");
  const runtimeToken = requireEnv("TENDON_RUNTIME_TOKEN");

  const response = await fetch(`${baseUrl}${options.path}`, {
    method: options.method ?? "POST",
    headers: {
      authorization: `Bearer ${runtimeToken}`,
      "x-tendon-app-id": appId,
      ...(options.body ? { "content-type": "application/json" } : {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
    cache: "no-store",
  });

  const payload = (await response.json().catch(() => null)) as { error?: string } | null;
  if (!response.ok) {
    throw new Error(payload?.error || `Capabilities API request failed (${response.status})`);
  }

  return payload as T;
}
