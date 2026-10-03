// End-to-end check: gold bar reacts to "Book a call", and the assessment runs to a result (dry-run address).
// Usage: node flow.mjs <base-url>   -> writes shots/bars-*.png and shots/assess-result.png
import { chromium } from "playwright";
import { mkdirSync } from "fs";
mkdirSync("shots", { recursive: true });
const B = (process.argv[2] || "http://localhost:3100").replace(/\/$/, "");
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errs = []; page.on("pageerror", (e) => errs.push(e.message));
await page.goto(B + "/", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
const box = await page.locator("section canvas").nth(1).boundingBox();
const clip = { x: 0, y: Math.max(0, box.y - 120), width: 1440, height: box.height + 120 };
await page.setViewportSize({ width: 1440, height: Math.ceil(box.y + box.height) });
await page.screenshot({ path: "shots/bars-idle.png", clip });
await page.hover("[data-outlier-cta]"); await page.waitForTimeout(800);
await page.screenshot({ path: "shots/bars-hover.png", clip });
// assessment
await page.goto(B + "/start", { waitUntil: "networkidle" });
const pick = async (label) => { await page.getByRole("radio", { name: label }).click(); await page.waitForTimeout(600); };
await pick("Advisory or consulting"); await pick("50 to 100");
await page.getByRole("checkbox", { name: "Proposals and pricing" }).click();
await page.getByRole("checkbox", { name: "Client onboarding" }).click();
await page.getByRole("button", { name: "OK" }).click(); await page.waitForTimeout(600);
await pick("5 to 10 hours"); await pick("Several tools that do not talk to each other");
await pick("Protect and improve margin"); await pick("Partner or owner"); await pick("Within three months");
await page.fill("#f-name", "QA Tester"); await page.fill("#f-email", "qa@theoutlier.test"); await page.fill("#f-company", "QA Firm");
await page.getByRole("button", { name: "Show my result" }).click();
await page.waitForSelector("text=Three things to look at first", { timeout: 15000 });
await page.waitForTimeout(1600);
await page.screenshot({ path: "shots/assess-result.png", fullPage: false });
console.log(errs.length ? "FAIL page errors: " + errs.join(" | ") : "PASS: bars + assessment flow");
if (errs.length) process.exitCode = 1;
await browser.close();
