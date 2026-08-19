/**
 * PulzeTrend Capital — Production Server
 *
 * Explicitly serves /_next/static/* from .next/static/ with correct MIME types.
 * Includes diagnostic logging to debug file-not-found issues on Hostinger.
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

// ─── Diagnostic: Check .next directory status ─────────────────────────────────
console.log("[server] __dirname:", __dirname);
console.log("[server] cwd:", process.cwd());

const dotNextPath = path.join(__dirname, ".next");
const staticPath = path.join(dotNextPath, "static");
const chunksPath = path.join(staticPath, "chunks");

if (fs.existsSync(dotNextPath)) {
  console.log("[server] .next/ EXISTS");
  const buildIdPath = path.join(dotNextPath, "BUILD_ID");
  if (fs.existsSync(buildIdPath)) {
    console.log("[server] BUILD_ID:", fs.readFileSync(buildIdPath, "utf8").trim());
  } else {
    console.log("[server] BUILD_ID: NOT FOUND — build may not have completed!");
  }
} else {
  console.error("[server] .next/ DOES NOT EXIST — no build output found!");
  console.error("[server] Running 'next build' now...");
  try {
    require("child_process").execSync("npx next build", {
      stdio: "inherit",
      cwd: __dirname,
      env: process.env,
    });
    console.log("[server] Build completed successfully");
  } catch (err) {
    console.error("[server] Build FAILED:", err.message);
    process.exit(1);
  }
}

if (fs.existsSync(staticPath)) {
  console.log("[server] .next/static/ EXISTS");
} else {
  console.error("[server] .next/static/ DOES NOT EXIST!");
}

if (fs.existsSync(chunksPath)) {
  const chunkFiles = fs.readdirSync(chunksPath);
  console.log(`[server] .next/static/chunks/ has ${chunkFiles.length} files:`);
  chunkFiles.forEach((f) => console.log(`[server]   ${f}`));
} else {
  console.error("[server] .next/static/chunks/ DOES NOT EXIST!");
}

// Also check for app/ subdirectory under chunks
const appChunksPath = path.join(chunksPath, "app");
if (fs.existsSync(appChunksPath)) {
  const appFiles = fs.readdirSync(appChunksPath);
  console.log(`[server] .next/static/chunks/app/ has ${appFiles.length} files:`);
  appFiles.forEach((f) => console.log(`[server]   ${f}`));
}

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
      const url = req.url || "/";
      const urlPath = url.split("?")[0];

      // ── Explicitly serve /_next/static/* from .next/static/* ──────────
      if (urlPath.startsWith("/_next/static/")) {
        const relativePath = urlPath.slice("/_next/static/".length);
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
          // Log the miss so we can debug
          console.warn(`[server] STATIC FILE NOT FOUND: ${filePath}`);
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

      // ── Let Next.js handle everything else ───────────────────────────
      handle(req, res);
    });

    server.listen(port, hostname, () => {
      console.log(`> PulzeTrend Capital ready on http://${hostname}:${port}`);
    });

    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.log(`[server] Port ${port} in use — exiting cleanly.`);
        process.exit(0);
      }
      console.error("[server] Server error:", err);
    });

    // Graceful shutdown
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
