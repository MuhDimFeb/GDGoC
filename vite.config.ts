import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The dev proxy is only used when VITE_API_URL=/api (see README → "CORS").
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": { target: "https://gdgoc-ugm-api.vercel.app", changeOrigin: true },
    },
  },
});
