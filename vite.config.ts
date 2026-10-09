import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode, isSsrBuild }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: isSsrBuild
          ? undefined
          : {
              "react-vendor": ["react", "react-dom", "react-router-dom"],
              "ui-vendor": [
                "@radix-ui/react-dialog",
                "@radix-ui/react-dropdown-menu",
                "@radix-ui/react-slot",
              ],
            },
      },
    },
    copyPublicDir: !isSsrBuild,
    cssCodeSplit: true,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: mode === "production",
        passes: 2, // Multiple passes for better compression
      },
      format: {
        comments: false, // Remove comments
      },
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Enable source maps only in development
    sourcemap: mode === "development",
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
  },
}));
