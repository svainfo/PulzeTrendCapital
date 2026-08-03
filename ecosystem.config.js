module.exports = {
  apps: [
    {
      name: "pulzetrend",
      // Use the actual Next.js JS entry point — works on Windows & Linux
      script: "node_modules/next/dist/bin/next",
      args: "start",
      interpreter: "node",
      cwd: "C:\\websites\\pulzetrend",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        NEXT_TELEMETRY_DISABLED: "1",
      },
      watch: false,
      max_memory_restart: "500M",
      restart_delay: 3000,
      max_restarts: 10,
    },
  ],
};
