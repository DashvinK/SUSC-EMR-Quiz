import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// Local-dev bridge for the Vercel serverless function.
// Vite's dev server doesn't serve `/api/*`, so in production `api/submit-result.js`
// runs on Vercel but locally it 404s. This plugin mounts the same handler as dev
// middleware (loading vars from .env.local) so the full submit flow is testable
// with `npm run dev`. In production Vercel ignores this and runs the function itself.
function devApiPlugin(mode) {
  const env = loadEnv(mode, process.cwd(), "");
  const KEYS = [
    "GOOGLE_SERVICE_ACCOUNT_EMAIL",
    "GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY",
    "GOOGLE_SHEET_ID",
    "GOOGLE_SHEET_TAB",
  ];

  return {
    name: "dev-api",
    apply: "serve", // dev only
    configureServer(server) {
      // Surface .env.local values to the handler via process.env.
      for (const k of KEYS) {
        if (env[k] && !process.env[k]) process.env[k] = env[k];
      }

      server.middlewares.use("/api/submit-result", async (req, res, next) => {
        if (req.method !== "POST") return next();

        const send = (code, obj) => {
          res.statusCode = code;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(obj));
        };

        // Read + parse the JSON body from the raw stream.
        try {
          const chunks = [];
          for await (const chunk of req) chunks.push(chunk);
          const raw = Buffer.concat(chunks).toString("utf8");
          req.body = raw ? JSON.parse(raw) : {};
        } catch {
          return send(400, { error: "Invalid JSON body" });
        }

        // Minimal Express-like response shim the handler expects.
        res.status = (code) => {
          res.statusCode = code;
          return res;
        };
        res.json = (obj) => {
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(obj));
          return res;
        };

        try {
          const { default: handler } = await import("./api/submit-result.js");
          await handler(req, res);
        } catch (err) {
          server.config.logger.error(`[dev-api] ${err?.message || err}`);
          if (!res.writableEnded) send(500, { error: "dev api error" });
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), devApiPlugin(mode)],
}));
