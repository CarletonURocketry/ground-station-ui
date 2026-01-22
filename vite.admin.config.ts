import path from "path";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  server: {
    port: 5173,
    strictPort: true,
  },
  plugins: [tailwindcss()],
  define: {
    IS_ADMIN: "true",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
