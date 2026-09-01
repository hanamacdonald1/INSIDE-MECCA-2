import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

// Always launch the Next.js version installed by this project. Using npx here can
// download a newer binary that is incompatible with the local Next.js modules.
const nextCli = fileURLToPath(new URL("./node_modules/next/dist/bin/next", import.meta.url));
const child = spawn(process.execPath, [nextCli, "dev", "-p", "3000", "-H", "0.0.0.0"], {
  stdio: "inherit",
  shell: false,
});

child.on("exit", (code) => {
  process.exit(code ?? 0);
});
