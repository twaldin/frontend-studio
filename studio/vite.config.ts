import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";
import { studioState } from "./scripts/state-plugin.ts";

// Review from another machine: STUDIO_HOST is the address to bind (a LAN or
// tailnet IP, or 0.0.0.0), STUDIO_ALLOWED_HOSTS the comma-separated hostnames
// the reviewer types (Vite rejects unknown Host headers; bare IPs pass).
const allowedHosts = process.env.STUDIO_ALLOWED_HOSTS?.split(",").map((h) => h.trim()).filter(Boolean);

export default defineConfig({
  plugins: [react(), tailwindcss(), studioState(fileURLToPath(new URL("./.studio/state.json", import.meta.url)))],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  server: {
    port: 5199,
    strictPort: true,
    host: process.env.STUDIO_HOST || "127.0.0.1",
    ...(allowedHosts?.length ? { allowedHosts } : {}),
    // The skill library lives under a dot-directory, where native file events do not arrive.
    watch: { usePolling: true, interval: 400, ignored: ["**/.studio/**", "**/capture/**", "**/export/**"] },
  },
});
