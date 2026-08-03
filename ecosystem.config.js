module.exports = {
  apps: [
    {
      name: "pulzetrend",
      script: "node_modules\\.bin\\next",
      args: "start",
      cwd: "C:\\websites\\pulzetrend",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        NEXT_TELEMETRY_DISABLED: "1",
      },
      // Auto-restart on crash
      watch: false,
      max_memory_restart: "500M",
      restart_delay: 3000,
      max_restarts: 10,
    },
  ],
};
