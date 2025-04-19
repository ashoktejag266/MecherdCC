import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    allowedHosts: ["homelab-mc.njmj5w.easypanel.host", "0.0.0.0", "brilliant-light-production-0775.up.railway.app", "https://jubilant-elegance-production.up.railway.app"]
  }
})
