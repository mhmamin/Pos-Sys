import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // إجبار الفيت على تخطي وتجاوز استدعاء axios الخارجي وعدم فحصه أثناء البناء
      external: ["axios", "/vercel/path0/front/src/api/axios.js"],
    },
  },
});
