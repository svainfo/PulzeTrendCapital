/**
 * PulzeTrend Capital — Production Server
 *
 * Hostinger spawns multiple worker processes simultaneously. This server handles
 * that gracefully: if port 3000 is already bound by another worker, this instance
 * exits cleanly (code 0) rather than crashing with ERR_SERVER_NOT_RUNNING.
 *
 * An uncaughtException guard also silences Next.js 15's internal worker cleanup
 * error (ERR_SERVER_NOT_RUNNING) that occurs when the App Router tears down its
 * own internal IPC servers during graceful shutdown.
 */

"use strict";

const { createServer } = require("http");
const next = require("next");

const port = parseInt(process.env.PORT || "3000", 10);
const hostname = process.env.HOSTNAME || "0.0.0.0";

// ─── Suppress Next.js internal cleanup errors ────────────────────────────────
// Next.js 15 App Router spawns internal worker processes. When they shut down,
// they sometimes call server.close() on already-closed sockets, throwing
// ERR_SERVER_NOT_RUNNING. This is benign — we swallow it and stay alive.
process.on("uncaughtException", (err) => {
  if (
    err.code === "ERR_SERVER_NOT_RUNNING" ||
    err.message === "Server is not running."
  ) {
    console.warn(
      "[server] Suppressed ERR_SERVER_NOT_RUNNING from Next.js internal worker cleanup"
    );
    return; // Do NOT exit — the main HTTP server is still healthy
  }
  console.error("[server] Uncaught fatal exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error("[server] Unhandled rejection:", reason);
  // Don't exit — log and continue
});
// ─────────────────────────────────────────────────────────────────────────────

const app = next({ dev: false, hostname, port });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = createServer(async (req, res) => {
      try {
        // Use legacy url.parse to get a UrlWithParsedQuery that Next.js expects.
        // The WHATWG URL API would require a base URL which corrupts path-only routing.
        // eslint-disable-next-line n/no-deprecated-api
        const parsedUrl = require("url").parse(req.url, true);
        await handle(req, res, parsedUrl);
      } catch (err) {
        console.error("[server] Request error:", req.url, err);
        if (!res.headersSent) {
          res.statusCode = 500;
          res.end("Internal Server Error");
        }
      }
    });

    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        // Another worker is already serving on this port.
        // Exit cleanly so the process manager doesn't see a crash.
        console.log(
          `[server] Port ${port} already in use — another worker is running. Exiting cleanly.`
        );
        process.exit(0);
      } else {
        console.error("[server] Fatal server error:", err);
        process.exit(1);
      }
    });

    // ── Graceful shutdown ────────────────────────────────────────────────────
    const shutdown = (signal) => {
      console.log(`[server] ${signal} received — shutting down`);
      if (server && server.listening) {
        server.close(() => {
          console.log("[server] HTTP server closed");
          process.exit(0);
        });
        // Force-exit after 10 s if connections don't drain
        setTimeout(() => process.exit(0), 10_000).unref();
      } else {
        process.exit(0);
      }
    };

    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));
    // ────────────────────────────────────────────────────────────────────────

    server.listen(port, hostname, () => {
      console.log(
        `> PulzeTrend Capital server ready on http://${hostname}:${port}`
      );
    });
  })
  .catch((err) => {
    console.error("[server] Failed to prepare Next.js app:", err);
    process.exit(1);
  });
