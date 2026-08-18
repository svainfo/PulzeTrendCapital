/**
 * PM2 Ecosystem Configuration for PulzeTrend Capital
 *
 * Hostinger's Node.js hosting uses PM2 as the process manager. Without this
 * file, Hostinger's default PM2 config spawns 2 workers simultaneously — both
 * try to bind port 3000, causing an EADDRINUSE crash loop every ~2 seconds.
 *
 * This config forces exactly 1 process in fork mode to prevent that conflict.
 */
module.exports = {
  apps: [
    {
      name: "pulzetrend-capital",
      script: "server.js",

      // ── Critical: 1 instance, fork mode ────────────────────────────────
      // cluster mode = multiple workers sharing a port (broken on Hostinger)
      // fork mode    = single process, owns port 3000 exclusively
      instances: 1,
      exec_mode: "fork",

      // ── Environment ─────────────────────────────────────────────────────
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },

      // ── Restart behaviour ───────────────────────────────────────────────
      // Only restart on non-zero exit. Our server.js exits with code 0 when
      // another worker already holds the port — so no restart loop.
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

      // ── Graceful shutdown ────────────────────────────────────────────────
      kill_timeout: 5000,
      listen_timeout: 10000,
    },
  ],
};
