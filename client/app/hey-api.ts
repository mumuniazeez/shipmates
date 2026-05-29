import { createClient } from "./api/client";
import { createConfig } from "./api/client";
import type { CreateClientConfig } from "./api/client.gen";
import type { ClientOptions } from "./api/types.gen";

if (typeof window === "undefined") {
  // @ts-ignore
  import(/* @vite-ignore */ "dotenv/config").catch(() => {});
}

const BASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
  (typeof process !== "undefined" ? process.env.VITE_API_URL : undefined);

/**
 * Default client config used by the auto-generated client.
 * This version doesn't have access to cookies (for client-side use).
 * For server-side loaders, use createApiClient() instead.
 */
export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  // Auth is empty here - for authenticated requests in loaders, use createApiClient()
  auth: "",
});

/**
 * Create an API client instance with an optional auth token.
 * Use this in loaders/actions to create a client with the token from cookies.
 *
 * @example
 * ```ts
 * export async function loader({ request }: Route.LoaderArgs) {
 *   const token = getAuthToken(request);
 *   const client = createApiClient(token);
 *   const result = await campaigns.findAllCampaigns({ client });
 *   return result.data;
 * }
 * ```
 */
export function createApiClient(authToken?: string | null) {
  const config = createConfig<ClientOptions>({ baseUrl: BASE_URL });
  return createClient({
    ...config,
    auth: authToken || "",
  });
}
