/**
 * PulzeTrend Capital — Production Server
 *
 * This server explicitly handles /_next/static/* requests by reading files
 * directly from .next/static/ with correct MIME types. This bypasses both:
 *   - Next.js's internal static file middleware (which may fail to locate files)
 *   - Hostinger's LiteSpeed proxy (which may intercept static file requests)
 *
 * All other requests are handled by Next.js's standard request handler.
 */

"use strict";

const path = require("path");
const fs = require("fs");
const http = require("http");

// ─── Ensure correct working directory ─────────────────────────────────────────
process.chdir(__dirname);

// ─── Inject preload.js into ALL Node.js processes ─────────────────────────────
const preloadPath = path.resolve(__dirname, "preload.js");
const existingOpts = process.env.NODE_OPTIONS || "";
if (!existingOpts.includes("preload.js")) {
  process.env.NODE_OPTIONS = `--require ${preloadPath} ${existingOpts}`.trim();
}
require(preloadPath);

// ─── MIME type map for static assets ──────────────────────────────────────────
const MIME_TYPES = {
  ".js": "application/javascript; charset=UTF-8",
  ".mjs": "application/javascript; charset=UTF-8",
  ".css": "text/css; charset=UTF-8",
  ".json": "application/json; charset=UTF-8",
  ".map": "application/json",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
};

// ─── Start Next.js ───────────────────────────────────────────────────────────
const next = require("next");

const port = parseInt(process.env.PORT || "3000", 10);
const hostname = "0.0.0.0";

const app = next({ dev: false, dir: __dirname });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = http.createServer((req, res) => {
      // ── Explicitly serve /_next/static/* from .next/static/* ──────────
      // This is the critical fix: map URL path /_next/static/... to the
      // filesystem path .next/static/... and serve with correct MIME types.
      const url = req.url || "/";
      const urlPath = url.split("?")[0]; // Strip query string

      if (urlPath.startsWith("/_next/static/")) {
        const relativePath = urlPath.slice("/_next/static/".length);
        // Prevent directory traversal
        const safePath = path.normalize(relativePath).replace(/^(\.\.(\/|\\|$))+/, "");
        const filePath = path.join(__dirname, ".next", "static", safePath);

        try {
          const stat = fs.statSync(filePath);
          if (stat.isFile()) {
            const ext = path.extname(filePath).toLowerCase();
            const contentType = MIME_TYPES[ext] || "application/octet-stream";

            res.writeHead(200, {
              "Content-Type": contentType,
              "Content-Length": stat.size,
              "Cache-Control": "public, max-age=31536000, immutable",
              "X-Content-Type-Options": "nosniff",
            });
            fs.createReadStream(filePath).pipe(res);
            return;
          }
        } catch {
          // File not found — fall through to Next.js handler
        }
      }

      // ── Serve /public files (favicon, icons, etc.) ───────────────────
      if (
        urlPath === "/favicon.ico" ||
        urlPath.startsWith("/icon-") ||
        urlPath === "/manifest.json"
      ) {
        const publicFile = path.join(__dirname, "public", urlPath);
        try {
          const stat = fs.statSync(publicFile);
          if (stat.isFile()) {
            const ext = path.extname(publicFile).toLowerCase();
            const contentType = MIME_TYPES[ext] || "application/octet-stream";
            res.writeHead(200, {
              "Content-Type": contentType,
              "Content-Length": stat.size,
              "Cache-Control": "public, max-age=86400",
            });
            fs.createReadStream(publicFile).pipe(res);
            return;
          }
        } catch {
          // Fall through to Next.js
        }
      }

      // ── Let Next.js handle everything else (pages, API routes, etc.) ─
      handle(req, res);
    });

    server.listen(port, hostname, () => {
      console.log(`> PulzeTrend Capital ready on http://${hostname}:${port}`);
    });

    // ── EADDRINUSE: another worker already has the port ────────────────
    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.log(`[server] Port ${port} in use — exiting cleanly.`);
        process.exit(0);
      }
      console.error("[server] Server error:", err);
    });

    // ── Graceful shutdown ──────────────────────────────────────────────
    const shutdown = (signal) => {
      console.log(`[server] ${signal} — shutting down`);
      if (server.listening) {
        server.close(() => process.exit(0));
      } else {
        process.exit(0);
      }
      setTimeout(() => process.exit(0), 10000).unref();
    };
    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));
  })
  .catch((err) => {
    console.error("[server] Fatal startup error:", err);
    process.exit(1);
  });
