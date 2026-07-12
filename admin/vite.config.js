import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  css: {
    // إجبار الأداة على استخدام البناء القديم والمستقر
    transformer: "postcss",
  },
  build: {
    // استخدام esbuild لضغط الـ CSS بدلاً من lightningcss المزعج
    cssMinify: "esbuild",
    minify: "esbuild",
  },
});
