/**
 * Chromium through Playwright for the audit and capture scripts. Uses the
 * studio's own Playwright when installed; otherwise provisions a pinned copy
 * through `bun x` into a temporary module graph. Prefers the system Chrome
 * channel and falls back to Playwright's Chromium.
 */
import { cp, mkdir, mkdtemp, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";

const PLAYWRIGHT_VERSION = "1.49.1";

async function playwrightModule(): Promise<{ path: string; runtimeDir?: string }> {
  try {
    return { path: Bun.resolveSync("playwright", import.meta.dir) };
  } catch {
    // `bun pm` needs a package.json, so run from the studio whatever the caller's cwd.
    const install = Bun.spawnSync(["bun", "x", `playwright@${PLAYWRIGHT_VERSION}`, "--version"], { cwd: import.meta.dir });
    if (install.exitCode !== 0) throw new Error(`Could not provision Playwright: ${new TextDecoder().decode(install.stderr)}`);
    const cacheLookup = Bun.spawnSync(["bun", "pm", "cache"], { cwd: import.meta.dir });
    if (cacheLookup.exitCode !== 0) throw new Error("Could not locate Bun's package cache");
    const cacheDir = new TextDecoder().decode(cacheLookup.stdout).trim().split("\n").at(-1)!;
    const cacheEntries = await readdir(cacheDir);
    const packageDir = cacheEntries.find((entry) => entry.startsWith(`playwright@${PLAYWRIGHT_VERSION}`));
    const coreDir = cacheEntries.find((entry) => entry.startsWith(`playwright-core@${PLAYWRIGHT_VERSION}`));
    if (!packageDir || !coreDir) throw new Error(`Playwright ${PLAYWRIGHT_VERSION} was provisioned but not found in Bun's cache`);

    const runtimeDir = await mkdtemp(resolve(tmpdir(), "frontend-studio-playwright-"));
    const modulesDir = resolve(runtimeDir, "node_modules");
    await mkdir(modulesDir);
    await cp(resolve(cacheDir, packageDir), resolve(modulesDir, "playwright"), { recursive: true });
    await cp(resolve(cacheDir, coreDir), resolve(modulesDir, "playwright-core"), { recursive: true });
    return { path: resolve(modulesDir, "playwright", "index.mjs"), runtimeDir };
  }
}

/** A headless Chromium; `close` also removes a provisioned Playwright copy. */
export async function launchChromium() {
  const { path, runtimeDir } = await playwrightModule();
  // Runtime-selected: the studio's install or the temporary copy above, so a static import can't name it.
  const { chromium } = await import(path);
  let browser;
  try {
    browser = await chromium.launch({ headless: true, channel: "chrome" });
  } catch {
    browser = await chromium.launch({ headless: true });
  }
  const close = async () => {
    await browser.close();
    if (runtimeDir) await rm(runtimeDir, { recursive: true, force: true });
  };
  return { browser, close };
}
