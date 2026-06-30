import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://192.168.213.49:8000",
        changeOrigin: true,
      },
      "/health": {
        target: "http://192.168.213.49:8000",
        changeOrigin: true,
      },
      "/database": {
        target: "http://192.168.213.49:8000",
        changeOrigin: true,
      },
    },
  },
});