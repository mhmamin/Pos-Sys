import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ["axios", "/vercel/path0/front/src/api/axios.js"],
    },
  },
});
