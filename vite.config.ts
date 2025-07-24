import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Custom plugin to copy data directory
function copyDataPlugin() {
  return {
    name: 'copy-data',
    buildStart() {
      const srcDir = path.resolve(__dirname, 'client/src/data');
      const destDir = path.resolve(__dirname, 'dist/data');
      
      if (fs.existsSync(srcDir)) {
        fs.mkdirSync(destDir, { recursive: true });
        const files = fs.readdirSync(srcDir);
        files.forEach(file => {
          fs.copyFileSync(
            path.resolve(srcDir, file),
            path.resolve(destDir, file)
          );
        });
      }
    }
  };
}

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "robots.txt"],
      manifest: {
        name: "PulpE",
        short_name: "PulpE",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#16a34a",
        icons: [
          {
            src: "/favicon-192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/favicon-512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    }),
    copyDataPlugin()
  ],
  root: "client",
  build: {
    outDir: "../dist",
    emptyOutDir: true
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
      "@shared": path.resolve(__dirname, "shared")
    }
  }
});
