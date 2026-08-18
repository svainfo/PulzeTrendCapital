/**
 * PulzeTrend Capital — Production Server
 *
 * Next.js 15 App Router spawns an internal worker child-process. On some Linux
 * environments (including Hostinger), that worker's shutdown code calls
 * server.close() on an already-closed socket, which throws ERR_SERVER_NOT_RUNNING.
 * Next.js catches that error internally and calls process.exit(1), killing the
 * whole server.
 *
 * Fixes applied here:
 *  1. Intercept process.exit() BEFORE next is loaded so we can suppress
 *     unexpected non-zero exits triggered by Next.js worker cleanup.
 *  2. Catch uncaughtException / unhandledRejection to keep the process alive.
 *  3. Delegate everything else to next's own production server (start-server)
 *     which has the best built-in worker lifecycle management.
 */

"use strict";

const net = require("net");

// ─── 1. Monkey-patch net.Server.prototype.close ──────────────────────────────
// Prevent "Error: Server is not running" from being thrown when Next.js
// (or its workers, via IPC) calls close() on an already-closed socket.
const _originalClose = net.Server.prototype.close;
net.Server.prototype.close = function patchedClose(callback) {
  if (!this.listening) {
    if (typeof callback === "function") callback();
    return this;
  }
  return _originalClose.call(this, callback);
};

// ─── 2. Intercept process.exit() ─────────────────────────────────────────────
// next/dist/server internals call process.exit(1) when a worker crashes.
// We suppress non-zero exits that originate from Next.js shutdown code.
const _originalExit = process.exit.bind(process);
process.exit = function interceptedExit(code) {
  if (code !== 0 && code !== undefined) {
    const stack = new Error("exit-intercept").stack || "";
    // Only suppress exits that come from Next.js internal cleanup code
    if (
      stack.includes("next/dist") ||
      stack.includes("next\\dist") ||
      stack.includes("start-server") ||
      stack.includes("router-server")
    ) {
      console.warn(
        `[server] Suppressed Next.js internal process.exit(${code}) — keeping server alive`
      );
      return;
    }
  }
  _originalExit(code);
};

// ─── 3. Global error guards ───────────────────────────────────────────────────
process.on("uncaughtException", (err) => {
  if (
    err.code === "ERR_SERVER_NOT_RUNNING" ||
    err.message === "Server is not running."
  ) {
    console.warn(
      "[server] Suppressed ERR_SERVER_NOT_RUNNING from Next.js internal cleanup"
    );
    return;
  }
  console.error("[server] Uncaught exception:", err);
  // Don't exit — log and continue so the server stays up
});

process.on("unhandledRejection", (reason) => {
  console.error("[server] Unhandled rejection:", reason);
});

// ─── 4. Start Next.js production server ──────────────────────────────────────
// Use Next.js's own start-server module which has the best built-in handling
// for the App Router worker lifecycle.
const { startServer } = require("next/dist/server/lib/start-server");

const port = parseInt(process.env.PORT || "3000", 10);
const hostname = process.env.HOSTNAME || "0.0.0.0";

startServer({
  dir: __dirname,
  isDev: false,
  hostname,
  port,
  allowRetry: false,
  keepAliveTimeout: 5000,
})
  .then((server) => {
    // Graceful shutdown
    const shutdown = (signal) => {
      console.log(`[server] ${signal} — shutting down`);
      server
        .close()
        .then(() => _originalExit(0))
        .catch(() => _originalExit(0));
      setTimeout(() => _originalExit(0), 10_000).unref();
    };
    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));
  })
  .catch((err) => {
    if (
      err.code === "EADDRINUSE" ||
      err.message?.includes("address already in use")
    ) {
      console.log(
        `[server] Port ${port} in use — another worker is running. Exiting cleanly.`
      );
      _originalExit(0);
    } else {
      console.error("[server] Fatal startup error:", err);
      _originalExit(1);
    }
  });
