import vinext from "vinext";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vinext()],
  server: {
    allowedHosts: [".tendon.dev", ".vercel.app", ".vercel.run"],
  },
});
