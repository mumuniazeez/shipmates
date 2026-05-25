import { defineConfig } from "@hey-api/openapi-ts";
import "dotenv/config";

export default defineConfig({
  input: `${process.env.VITE_API_URL}/docs-json`,
  output: "./app/api",
  plugins: [
    "@hey-api/typescript",
    { name: "@hey-api/client-fetch", runtimeConfigPath: "./app/hey-api" },
    { name: "@hey-api/transformers", dates: true, bigInt: true },
    {
      operations: {
        container: "class",
        strategy: "byTags",
        containerName: { casing: "camelCase" },
      },
      name: "@hey-api/sdk",
      auth: true,
      transformer: true,
    },
  ],
});
