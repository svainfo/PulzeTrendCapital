#!/usr/bin/env node
/**
 * PulzeTrend Capital — Server Entry Point
 *
 * This file serves as the "Application startup file" for Hostinger's panel.
 * It injects preload.js via NODE_OPTIONS and then runs `next start`.
 *
 * The preload.js patches net.Server.prototype.close to prevent the
 * "Error: Server is not running" crash in Next.js 15 App Router workers.
 */

"use strict";

const path = require("path");
const { spawn } = require("child_process");

console.log("==========================================================");
console.log("  PULZETREND CAPITAL — server.js starting");
console.log("  __dirname:", __dirname);
console.log("  cwd:", process.cwd());
console.log("==========================================================");

// ─── Ensure correct working directory ─────────────────────────────────────────
process.chdir(__dirname);

// ─── Set NODE_OPTIONS so ALL processes get the crash-prevention patch ──────────
const preloadPath = path.resolve(__dirname, "preload.js");
const existingOpts = process.env.NODE_OPTIONS || "";
if (!existingOpts.includes("preload.js")) {
  process.env.NODE_OPTIONS = `--require ${preloadPath} ${existingOpts}`.trim();
}
console.log("[server] NODE_OPTIONS:", process.env.NODE_OPTIONS);

// ─── Check if .next/ exists; if not, build ────────────────────────────────────
const fs = require("fs");
const dotNextPath = path.join(__dirname, ".next");
const buildIdPath = path.join(dotNextPath, "BUILD_ID");

if (!fs.existsSync(buildIdPath)) {
  console.log("[server] .next/BUILD_ID not found — running next build...");
  try {
    require("child_process").execSync("npx next build", {
      stdio: "inherit",
      cwd: __dirname,
      env: process.env,
    });
    console.log("[server] Build completed");
  } catch (err) {
    console.error("[server] Build FAILED:", err.message);
    process.exit(1);
  }
}

// ─── List chunk files for diagnostic ──────────────────────────────────────────
const chunksDir = path.join(dotNextPath, "static", "chunks");
if (fs.existsSync(chunksDir)) {
  const files = fs.readdirSync(chunksDir).filter((f) => f.endsWith(".js"));
  console.log(`[server] .next/static/chunks/ has ${files.length} JS files`);
  files.forEach((f) => console.log(`[server]   ${f}`));
} else {
  console.error("[server] .next/static/chunks/ MISSING!");
}

// ─── Spawn `next start` as a child process ────────────────────────────────────
// Using spawn instead of require() to ensure `next start` runs properly
// with its own CLI setup (static file serving, route handlers, etc.)
const nextBin = path.resolve(
  __dirname,
  "node_modules",
  ".bin",
  process.platform === "win32" ? "next.cmd" : "next"
);

const port = process.env.PORT || "3000";

console.log(`[server] Spawning: ${nextBin} start -H 0.0.0.0 -p ${port}`);

const child = spawn(nextBin, ["start", "-H", "0.0.0.0", "-p", port], {
  stdio: "inherit",
  cwd: __dirname,
  env: process.env,
  shell: process.platform === "win32",
});

child.on("error", (err) => {
  console.error("[server] Failed to spawn next start:", err);
  process.exit(1);
});

child.on("exit", (code, signal) => {
  console.log(`[server] next start exited: code=${code} signal=${signal}`);
  process.exit(code || 0);
});

// Forward signals to child
process.on("SIGTERM", () => {
  console.log("[server] SIGTERM received, forwarding to child");
  child.kill("SIGTERM");
});
process.on("SIGINT", () => {
  console.log("[server] SIGINT received, forwarding to child");
  child.kill("SIGINT");
});
