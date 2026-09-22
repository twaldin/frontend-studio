import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  server: {
    port: 5199,
    strictPort: true,
    host: "127.0.0.1",
    // The skill library lives under a dot-directory, where native file events do not arrive.
    watch: { usePolling: true, interval: 400 },
  },
});
