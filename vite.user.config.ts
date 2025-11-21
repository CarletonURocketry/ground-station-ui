import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  server: {
    port: 5174,
    strictPort: true,
  },
  plugins: [tailwindcss()],
  define: {
    IS_ADMIN: "false",
  },
});
