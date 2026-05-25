import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";
import { defineConfig, searchForWorkspaceRoot } from "vite";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter()],
  server: {
    fs: {
      allow: [
        // Search up from the current directory until it finds the root
        searchForWorkspaceRoot(process.cwd()),
        // Explicitly allow everything inside node_modules
        resolve(__dirname, "node_modules"),
      ],
    },
  },
  resolve: {
    tsconfigPaths: true,
  },
});
