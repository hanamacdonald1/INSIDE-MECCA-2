import { spawn } from "node:child_process";

// When npm run dev is invoked with --port 3000, npm may forward arguments.
// Spawn Next.js dev server explicitly on port 3000, binding to 0.0.0.0.
const child = spawn("npx", ["next", "dev", "-p", "3000", "-H", "0.0.0.0"], {
  stdio: "inherit",
  shell: true,
});

child.on("exit", (code) => {
  process.exit(code ?? 0);
});
