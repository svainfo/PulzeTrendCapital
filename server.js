/**
 * PulzeTrend Capital — Production Server
 *
 * This server does two things:
 *  1. Sets NODE_OPTIONS to preload our net.Server.close patch into EVERY
 *     Node.js process (including Next.js 15's internal child workers)
 *  2. Runs `next start` via the official CLI entry point
 *
 * Why NODE_OPTIONS?
 *   Next.js 15 App Router spawns child worker processes via child_process.fork().
 *   Monkey-patches in the parent process are NOT inherited. The crash
 *   (ERR_SERVER_NOT_RUNNING) originates in the CHILD worker. NODE_OPTIONS
 *   with --require is the only way to inject code into forked processes
 *   because they inherit process.env automatically.
 *
 * Why `next start` CLI instead of `startServer` API?
 *   The CLI is the officially supported entry point. It handles static file
 *   serving, BUILD_ID validation, route setup, and worker lifecycle correctly.
 *   The internal `startServer` API is undocumented and may not set up all
 *   middleware (like static file serving for /_next/static/*).
 */

"use strict";

const path = require("path");

// ─── 1. Inject preload.js into ALL Node.js processes ─────────────────────────
const preloadPath = path.resolve(__dirname, "preload.js");
const existingOpts = process.env.NODE_OPTIONS || "";
if (!existingOpts.includes("preload.js")) {
  process.env.NODE_OPTIONS = `--require ${preloadPath} ${existingOpts}`.trim();
}

// Apply the patch in the current (parent) process too
require(preloadPath);

// ─── 2. Run `next start` via the official CLI ─────────────────────────────────
const port = process.env.PORT || "3000";
const hostname = "0.0.0.0";

console.log(`[server] Starting PulzeTrend Capital on ${hostname}:${port}`);
console.log(`[server] NODE_OPTIONS: ${process.env.NODE_OPTIONS}`);

// Set process.argv as if we ran: next start -H 0.0.0.0 -p 3000
process.argv = [process.execPath, "next", "start", "-H", hostname, "-p", port];

// Load and execute the Next.js CLI — this never returns
require("next/dist/bin/next");
