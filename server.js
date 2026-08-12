const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const path = require("path");
const fs = require("fs");

// Explicit MIME type map — never rely on the host's server for these
const MIME_TYPES = {
  ".css":    "text/css; charset=utf-8",
  ".js":     "application/javascript; charset=utf-8",
  ".mjs":    "application/javascript; charset=utf-8",
  ".json":   "application/json; charset=utf-8",
  ".svg":    "image/svg+xml",
  ".png":    "image/png",
  ".jpg":    "image/jpeg",
  ".jpeg":   "image/jpeg",
  ".webp":   "image/webp",
  ".avif":   "image/avif",
  ".gif":    "image/gif",
  ".ico":    "image/x-icon",
  ".woff":   "font/woff",
  ".woff2":  "font/woff2",
  ".ttf":    "font/ttf",
  ".otf":    "font/otf",
  ".eot":    "application/vnd.ms-fontobject",
  ".map":    "application/json",
  ".txt":    "text/plain; charset=utf-8",
  ".xml":    "application/xml",
};

const port     = parseInt(process.env.PORT || "3000", 10);
const dev      = process.env.NODE_ENV !== "production";
const STATIC   = path.join(process.cwd(), ".next", "static");
const PUBLIC   = path.join(process.cwd(), "public");

const app    = next({ dev });
const handle = app.getRequestHandler();

/**
 * Serve a file from disk, setting Content-Type ourselves.
 * Returns true if served, false if file not found.
 */
async function serveFile(filePath, res, opts = {}) {
  try {
    const stat = await fs.promises.stat(filePath);
    if (!stat.isFile()) return false;

    const ext      = path.extname(filePath).toLowerCase();
    const mimeType = MIME_TYPES[ext] || "application/octet-stream";

    res.writeHead(200, {
      "Content-Type":  mimeType,
      "Cache-Control": opts.immutable
        ? "public, max-age=31536000, immutable"
        : "public, max-age=0, must-revalidate",
      "Content-Length": stat.size,
    });

    fs.createReadStream(filePath).pipe(res);
    return true;
  } catch {
    return false;
  }
}

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      const { pathname } = parsedUrl;

      // ── /_next/static/** ───────────────────────────────────────────
      // Serve directly from disk with explicit MIME types — bypasses
      // any proxy that would return wrong Content-Type for these files.
      if (pathname.startsWith("/_next/static/")) {
        const relPath  = pathname.replace("/_next/static/", "");
        const filePath = path.join(STATIC, relPath);
        const served   = await serveFile(filePath, res, { immutable: true });
        if (served) return;
      }

      // ── Public files (favicon, robots.txt, images, etc.) ──────────
      if (!pathname.startsWith("/_next/") && pathname !== "/") {
        const filePath = path.join(PUBLIC, pathname);
        const served   = await serveFile(filePath, res, { immutable: false });
        if (served) return;
      }

      // ── Everything else → Next.js handler ─────────────────────────
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error("[server] Error:", req.url, err.message);
      if (!res.headersSent) {
        res.writeHead(500);
        res.end("Internal Server Error");
      }
    }
  }).listen(port, "0.0.0.0", (err) => {
    if (err) throw err;
    console.log(`> Ready on http://0.0.0.0:${port}`);
    console.log(`> NODE_ENV: ${process.env.NODE_ENV || "development"}`);
  });
});
