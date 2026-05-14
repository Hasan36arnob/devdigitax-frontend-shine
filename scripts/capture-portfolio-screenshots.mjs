/**
 * Captures viewport screenshots of each portfolio `live` URL into src/assets/
 * so card images match the real homepage.
 *
 * Usage: npm run capture:portfolio
 * First time: npx playwright install chromium
 *
 * Options: CAPTURE_CONCURRENCY=2 (default 1), CAPTURE_SKIP=n, CAPTURE_LIMIT=n (max items)
 *          CAPTURE_ONLY=foo.png,bar.png (comma-separated filenames; only those targets)
 */
import { chromium } from "playwright";
import { mkdirSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const assetsDir = join(__dirname, "..", "src", "assets");

/** Output filename must match imports in src/data/portfolio.ts */
const targets = [
  { file: "pattyscheesecakes.png", url: "https://www.pattyscheesecakes.com/" },
  { file: "aascaterers.png", url: "https://aascaterers.com/" },
  { file: "sweetsandmeatsbbq.png", url: "https://sweetsandmeatsbbq.com/" },
  { file: "nayakratom.png", url: "https://nayakratom.com/" },
  { file: "healthyvibezcorp.png", url: "https://healthyvibezcorp.com/" },
  { file: "meaningfuleats.png", url: "https://meaningfuleats.com/" },
  { file: "lgeuae.png", url: "http://lgeuae.com/" },
  { file: "enrapturecosmetics.png", url: "https://enrapturecosmetics.co.uk/" },
  { file: "proedgedynamics.png", url: "https://proedgedynamics.com/" },
  { file: "simtechnologies.png", url: "https://simtechnologies.net/" },
  { file: "musemind.png", url: "https://musemind.agency/" },
  { file: "twilightstrading.png", url: "https://twilightstrading.com/" },
  { file: "worldlyship.png", url: "https://worldlyship.com/" },
  { file: "kakapk.png", url: "https://kaka.pk/" },
  { file: "dressengineer.png", url: "https://dressengineer.com/" },
  { file: "fisaplanettools.png", url: "https://fisaplanettools.com/" },
  { file: "supernaturalbotanical.png", url: "https://supernaturalbotanical.com/" },
  { file: "juliahrynkiw.png", url: "https://juliahrynkiw.com/" },
  { file: "purelyplantcare.png", url: "https://purelyplantcare.com/" },
  { file: "toplinerealty.png", url: "https://toplinerealty.in/" },
  { file: "boschpakistan.png", url: "https://boschpakistan.com/" },
  { file: "eleganzofusion.png", url: "https://eleganzofusion.com/" },
  { file: "naturapestcontrol.png", url: "https://naturapestcontrol.com/" },
  { file: "connorspestpros.png", url: "https://connorspestpros.com/" },
  { file: "cascaracapital.png", url: "https://cascaracapital.com/" },
  { file: "bozemanicedamremoval.png", url: "https://bozemanicedamremoval.com/" },
  { file: "cimacares.png", url: "https://cimacares.com/" },
  { file: "goorangepest.png", url: "https://www.goorangepest.com/" },
  { file: "leadingpurpose.png", url: "https://www.leadingpurpose.org/" },
  { file: "noraxx.png", url: "https://www.noraxx.ca/" },
  { file: "amazcart.png", url: "https://amazcart.ischooll.com/" },
  { file: "farmart.png", url: "https://farmart.botble.com/" },
  { file: "nazmart.png", url: "https://nazmart.net/" },
  { file: "omnimart.png", url: "https://omnimart.geniusdevs.com/" },
  { file: "zaika.png", url: "https://zaika.bytesed.com/land/" },
  { file: "marketbob.png", url: "https://demo.geniusocean.com/geniuscart-2024/" },
  { file: "pickbazar.png", url: "https://pickbazar.redq.io/" },
  { file: "fleecart.png", url: "https://demo.fleetcart.envaysoft.com/en" },
  { file: "grostore.png", url: "https://grostore.themetags.com/" },
  { file: "safecart.png", url: "https://safecart.bytesed.com/" },
  { file: "wowy.png", url: "https://wowy.botble.com/" },
  { file: "dealshop.png", url: "https://script.viserlab.com/dealshop" },
  { file: "shopking.png", url: "https://demo.shopking.dev/" },
  { file: "6valley.png", url: "https://6valley.app/" },
  { file: "livelycart.png", url: "https://livelycart-pro-demo.livelyworks.net/" },
  { file: "foodbank.png", url: "https://demo.food-bank.xyz/" },
  { file: "alasmart.png", url: "https://alasmart.mamunuiux.com/" },
  { file: "shopperz.png", url: "https://docs.shopperz.xyz/" },
  { file: "agriwealth.png", url: "https://agri-wealth.bugfinder.app/" },
  { file: "chawkbazar.png", url: "https://chawkbazar.redq.io/" },
  { file: "nest.png", url: "https://nest.botble.com/" },
  { file: "readyecommerce.png", url: "https://demo.readyecommerce.app/" },
  { file: "fluxstore.png", url: "https://fluxstore.app/" },
  { file: "ninico.png", url: "https://ninico.botble.com/" },
  { file: "vuexy.png", url: "https://pixinvent.com/vuexy-vuetify-vuejs-admin-template/" },
  { file: "apexa.png", url: "https://apexa.archielite.com/" },
];

const WIDTH = 1440;
const HEIGHT = 810;
const AFTER_LOAD_MS = 2800;
const NAV_TIMEOUT_MS = 65000;
const concurrency = Math.max(1, parseInt(process.env.CAPTURE_CONCURRENCY || "1", 10) || 1);
const skip = Math.max(0, parseInt(process.env.CAPTURE_SKIP || "0", 10) || 0);
const limitRaw = process.env.CAPTURE_LIMIT;
const limit =
  limitRaw !== undefined && limitRaw !== ""
    ? Math.max(0, parseInt(limitRaw, 10) || 0)
    : 0;

const onlyRaw = process.env.CAPTURE_ONLY?.trim();
const onlySet =
  onlyRaw && onlyRaw.length > 0
    ? new Set(
        onlyRaw
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      )
    : null;

const SCREENSHOT_TIMEOUT_MS = Math.max(
  30000,
  parseInt(process.env.CAPTURE_SCREENSHOT_TIMEOUT_MS || "120000", 10) || 120000,
);

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function captureOne(context, { file, url }) {
  const outPath = join(assetsDir, file);
  const page = await context.newPage();
  try {
    await page.setViewportSize({ width: WIDTH, height: HEIGHT });
    // Heavy demos sometimes hang on webfont loading during screenshot; block font files after paint.
    await page.route(/\.(woff2?|ttf|otf)$/i, (route) => route.abort());
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: NAV_TIMEOUT_MS });
    await sleep(AFTER_LOAD_MS);
    await page.screenshot({
      path: outPath,
      type: "png",
      fullPage: false,
      animations: "disabled",
      timeout: SCREENSHOT_TIMEOUT_MS,
    });
    console.log(`OK  ${file}`);
    return { file, ok: true };
  } catch (e) {
    console.error(`FAIL ${file} (${url}): ${e?.message || e}`);
    return { file, ok: false, error: String(e?.message || e) };
  } finally {
    await page.close();
  }
}

async function main() {
  if (!existsSync(assetsDir)) {
    mkdirSync(assetsDir, { recursive: true });
  }

  let slice = targets.slice(skip);
  if (limit > 0) slice = slice.slice(0, limit);
  if (onlySet) {
    slice = slice.filter((t) => onlySet.has(t.file));
    console.log(`CAPTURE_ONLY filter → ${slice.length} file(s)`);
  }
  console.log(`Capturing ${slice.length} screenshots (${WIDTH}x${HEIGHT}) → ${assetsDir}`);
  console.log(
    `Concurrency=${concurrency} skip=${skip}${limit > 0 ? ` limit=${limit}` : ""} screenshotTimeout=${SCREENSHOT_TIMEOUT_MS}ms\n`,
  );

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    ignoreHTTPSErrors: true,
    locale: "en-US",
  });

  const results = [];
  for (let i = 0; i < slice.length; i += concurrency) {
    const batch = slice.slice(i, i + concurrency);
    const batchResults = await Promise.all(batch.map((t) => captureOne(context, t)));
    results.push(...batchResults);
  }

  await browser.close();

  const failed = results.filter((r) => !r.ok);
  console.log(`\nDone: ${results.length - failed.length}/${results.length} succeeded`);
  if (failed.length) {
    console.log("Failed:", failed.map((f) => f.file).join(", "));
    process.exitCode = 1;
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
