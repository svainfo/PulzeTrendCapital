const { cp, mkdir } = require("fs/promises");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const STANDALONE = path.join(ROOT, ".next", "standalone");

async function main() {
  console.log("📦 Copying static assets to standalone directory...");

  // Copy .next/static → .next/standalone/.next/static
  await mkdir(path.join(STANDALONE, ".next", "static"), { recursive: true });
  await cp(
    path.join(ROOT, ".next", "static"),
    path.join(STANDALONE, ".next", "static"),
    { recursive: true, force: true }
  );
  console.log("  ✓ .next/static copied");

  // Copy public/ → .next/standalone/public
  await mkdir(path.join(STANDALONE, "public"), { recursive: true });
  await cp(
    path.join(ROOT, "public"),
    path.join(STANDALONE, "public"),
    { recursive: true, force: true }
  );
  console.log("  ✓ public/ copied");

  console.log("✅ Standalone build ready!");
}

main().catch((err) => {
  console.error("❌ Copy failed:", err);
  process.exit(1);
});
