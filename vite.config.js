/* global process */
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory
  const env = loadEnv(mode, process.cwd(), "");

  return {
    root: "client",
    plugins: [react()],
    server: {
      host: "0.0.0.0",
      port: 3000,
      proxy: {
        "/api": {
          target:
            process.env.NODE_ENV === "production"
              ? "/"
              : `http://localhost:${env.PORT || 8080}`,
          changeOrigin: true,
        },
      },
      allowedHosts: ["quiknotes.onrender.com"],
    },
    define: {
      // Make env variables available in client code
      "process.env": {},
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./client/src", import.meta.url)),
      },
    },
  };
});
