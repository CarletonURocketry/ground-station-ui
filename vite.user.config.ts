import path from "path";
import cesium from "vite-plugin-cesium";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
export default defineConfig({
  server: {
    port: 5174,
    strictPort: true,
  },
  plugins: [react(), tailwindcss(), cesium()],
  define: {
    IS_ADMIN: "false",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
