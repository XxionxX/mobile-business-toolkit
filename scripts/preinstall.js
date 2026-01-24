// scripts/preinstall.js
const userAgent = process.env.npm_config_user_agent || "";

// Allow pnpm only
if (!userAgent.includes("pnpm")) {
  console.error("\n❌ This project uses pnpm ONLY.\n");
  console.error("👉 Use: pnpm install\n");
  console.error(`Detected user agent: ${userAgent}\n`);
  process.exit(1);
}

console.log("✅ pnpm detected — continuing install.");
