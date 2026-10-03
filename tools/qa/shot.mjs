// Usage: node shot.mjs <url> <out-prefix> [widths=1440,390] [full=1] [hover=selector]
import { chromium } from "playwright";
import { mkdirSync } from "fs";
import { dirname } from "path";
const [url, out, widthsArg = "1440,390", full = "1", hover] = process.argv.slice(2);
mkdirSync(dirname(out), { recursive: true });
const browser = await chromium.launch();
for (const w of widthsArg.split(",").map(Number)) {
  const page = await browser.newPage({ viewport: { width: w, height: w > 800 ? 900 : 844 }, deviceScaleFactor: 1 });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  if (full === "1") {
    // scroll through so whileInView reveals fire
    const h = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < h; y += 500) { await page.evaluate((yy) => window.scrollTo(0, yy), y); await page.waitForTimeout(120); }
    await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(800);
  } else await page.waitForTimeout(2500);
  if (hover) { await page.hover(hover); await page.waitForTimeout(900); }
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  await page.screenshot({ path: `${out}-${w}.png`, fullPage: full === "1" });
  console.log(`${w}px overflow=${overflow}px errors=${errors.length}${errors.length ? "\n  " + errors.slice(0, 5).join("\n  ") : ""}`);
  await page.close();
}
await browser.close();
