/**
 * PulzeTrend Capital — Production Server
 *
 * Key insight: Next.js 15 App Router spawns child worker processes via
 * child_process.fork(). Monkey-patches in the parent process are NOT inherited
 * by children. The ERR_SERVER_NOT_RUNNING crash originates in the CHILD worker.
 *
 * Solution: Set NODE_OPTIONS=--require ./preload.js BEFORE loading Next.js.
 * Child processes spawned by Next.js inherit process.env, so they also get
 * the preload patch applied before any Next.js code runs.
 */

"use strict";

const path = require("path");

// ─── 1. Inject preload.js into ALL processes via NODE_OPTIONS ────────────────
// This is the critical fix: ensures child workers also have the patch.
const preloadPath = path.resolve(__dirname, "preload.js");
const existingOpts = process.env.NODE_OPTIONS || "";
if (!existingOpts.includes("preload.js")) {
  process.env.NODE_OPTIONS = `--require ${preloadPath} ${existingOpts}`.trim();
}

// Apply the patch in the current (parent) process too
require(preloadPath);

// ─── 2. Start Next.js production server ──────────────────────────────────────
const { startServer } = require("next/dist/server/lib/start-server");

const port = parseInt(process.env.PORT || "3000", 10);
const hostname = process.env.HOSTNAME || "0.0.0.0";

console.log(`[server] Starting PulzeTrend Capital on ${hostname}:${port}`);
console.log(`[server] NODE_OPTIONS: ${process.env.NODE_OPTIONS}`);

startServer({
  dir: __dirname,
  isDev: false,
  hostname,
  port,
  allowRetry: false,
  keepAliveTimeout: 5000,
}).catch((err) => {
  if (
    err.code === "EADDRINUSE" ||
    (err.message && err.message.includes("address already in use"))
  ) {
    console.log(
      `[server] Port ${port} in use — another worker is running. Exiting cleanly.`
    );
    process.exit(0);
  } else {
    console.error("[server] Fatal startup error:", err);
    process.exit(1);
  }
});
