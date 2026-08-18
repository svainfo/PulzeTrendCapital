/**
 * preload.js — Loaded via NODE_OPTIONS --require BEFORE any Next.js code runs.
 *
 * This must be inherited by ALL processes, including Next.js 15 App Router's
 * internal child workers (spawned via child_process.fork). That's why it's
 * loaded via NODE_OPTIONS rather than a manual require() — child processes
 * inherit process.env.NODE_OPTIONS automatically.
 *
 * The patch prevents "Error: Server is not running" (ERR_SERVER_NOT_RUNNING)
 * which occurs when Next.js's internal worker cleanup calls server.close()
 * on a socket that was never started or was already closed.
 */

"use strict";

const net = require("net");
const _originalClose = net.Server.prototype.close;

net.Server.prototype.close = function patchedClose(callback) {
  if (!this.listening) {
    // Server is already closed or was never started — silently no-op
    if (typeof callback === "function") {
      process.nextTick(callback);
    }
    return this;
  }
  return _originalClose.call(this, callback);
};

// Safety net: suppress any ERR_SERVER_NOT_RUNNING that slips through
process.on("uncaughtException", (err) => {
  if (
    err.code === "ERR_SERVER_NOT_RUNNING" ||
    err.message === "Server is not running."
  ) {
    return; // Benign — suppress and continue
  }
  // For all other errors: log but don't crash
  console.error("[preload] Uncaught exception:", err);
});

process.on("unhandledRejection", (reason) => {
  console.error("[preload] Unhandled rejection:", reason);
});
