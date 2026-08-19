/**
 * PM2 Ecosystem Configuration for PulzeTrend Capital
 *
 * Configures the crash-prevention preload via node_args AND NODE_OPTIONS,
 * ensuring the patch reaches both the main process and Next.js's internal
 * child worker processes.
 */

const path = require("path");
const preloadPath = path.resolve(__dirname, "preload.js");

module.exports = {
  apps: [
    {
      name: "pulzetrend-capital",
      script: "server.js",

      // ── Critical: 1 instance, fork mode ────────────────────────────────
      instances: 1,
      exec_mode: "fork",

      // ── Inject preload.js into the main process via node args ──────────
      node_args: `--require ${preloadPath}`,

      // ── Environment ─────────────────────────────────────────────────────
      // NODE_OPTIONS ensures child processes (Next.js workers) also get
      // the preload patch. child_process.fork() inherits process.env.
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        NODE_OPTIONS: `--require ${preloadPath}`,
      },

      // ── Restart behaviour ───────────────────────────────────────────────
      autorestart: true,
      max_restarts: 10,
      min_uptime: "5s",
      restart_delay: 2000,

      // ── Memory guard ────────────────────────────────────────────────────
      max_memory_restart: "512M",

      // ── Logging ─────────────────────────────────────────────────────────
      error_file: "./logs/pm2-error.log",
      out_file: "./logs/pm2-out.log",
      merge_logs: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",

      // ── Graceful shutdown ──────────────────────────────────────────────
      kill_timeout: 5000,
      listen_timeout: 10000,
    },
  ],
};
