const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const port = parseInt(process.env.PORT || "3000", 10);
const hostname = "0.0.0.0";

const app = next({
  dev: false,
  hostname,
  port,
});

const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = createServer(async (req, res) => {
      try {
        const parsedUrl = parse(req.url, true);
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
        console.warn(`[server] Port ${port} is already in use. Retrying in 2 seconds...`);
        setTimeout(() => {
          try {
            if (server && !server.listening) {
              server.listen(port, hostname);
            }
          } catch (retryErr) {
            console.error("[server] Retry failed:", retryErr.message);
          }
        }, 2000);
      } else {
        console.error("[server] Fatal error:", err);
      }
    });

    const shutdown = () => {
      console.log("[server] Received shutdown signal");
      if (server && server.listening) {
        server.close(() => {
          process.exit(0);
        });
      } else {
        process.exit(0);
      }
    };

    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown);

    server.listen(port, hostname, () => {
      console.log(`> PulzeTrend server listening on http://${hostname}:${port}`);
    });
  })
  .catch((err) => {
    console.error("[server] Startup failure:", err);
    process.exit(1);
  });
