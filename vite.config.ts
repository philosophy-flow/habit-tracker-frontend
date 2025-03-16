import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "node:fs";
import path from "node:path";

const isDev = process.env.NODE_ENV !== "production";

export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: isDev
        ? {
              https: {
                  key: fs.readFileSync(
                      path.resolve(process.cwd(), "localhost-key.pem")
                  ),
                  cert: fs.readFileSync(
                      path.resolve(process.cwd(), "localhost.pem")
                  ),
              },
              port: 3000,
          }
        : undefined,
});
