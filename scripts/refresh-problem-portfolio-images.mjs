/**
 * Refreshes selected portfolio PNGs:
 * - If job.forceStock: curated Unsplash image (objects / food / tech / landscape only — no people).
 * - Else: try og:image → premium homepage screenshot → Unsplash fallback.
 *
 * Optional: ONLY=shopperz.png,amazcart.png (comma-separated basenames)
 *
 * Run: npm run capture:portfolio:fix-listed
 */
import { chromium } from "playwright";
import { mkdirSync, existsSync, writeFileSync, mkdtempSync, rmSync } from "fs";
import { tmpdir } from "os";
import { dirname, join } from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const assetsDir = join(__dirname, "..", "src", "assets");

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

/** Unsplash — scenes/objects only (no people). Used for demos + when forceStock is set. */
const STOCK = {
  aascaterers: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=1600&q=80",
  healthyvibezcorp: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1600&q=80",
  lgeuae: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1600&q=80",
  simtechnologies: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80",
  boschpakistan: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1600&q=80",
  eleganzofusion: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=1600&q=80",
  bozemanicedamremoval: "https://images.unsplash.com/photo-1483664852095-d6cc6870702d?w=1600&q=80",
  amazcart: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=1600&q=80",
  vuexy: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1600&q=80",
  shopperz: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&q=80",
  zaika: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1600&q=80",
  safecart: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1600&q=80",
  apexa: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80",
};

/**
 * @typedef {{ file: string; url: string; altUrl?: string; stockKey: keyof typeof STOCK; forceStock?: boolean }} Job
 */

/** @type {Job[]} */
const jobs = [
  { file: "aascaterers.png", url: "https://aascaterers.com/", stockKey: "aascaterers", forceStock: true },
  { file: "healthyvibezcorp.png", url: "https://healthyvibezcorp.com/", stockKey: "healthyvibezcorp", forceStock: true },
  { file: "lgeuae.png", url: "https://lgeuae.com/", altUrl: "http://lgeuae.com/", stockKey: "lgeuae", forceStock: true },
  { file: "simtechnologies.png", url: "https://simtechnologies.net/", stockKey: "simtechnologies", forceStock: true },
  { file: "boschpakistan.png", url: "https://boschpakistan.com/", stockKey: "boschpakistan", forceStock: true },
  { file: "eleganzofusion.png", url: "https://eleganzofusion.com/", stockKey: "eleganzofusion", forceStock: true },
  { file: "bozemanicedamremoval.png", url: "https://bozemanicedamremoval.com/", stockKey: "bozemanicedamremoval", forceStock: true },
  { file: "amazcart.png", url: "https://amazcart.ischooll.com/", stockKey: "amazcart", forceStock: true },
  { file: "vuexy.png", url: "https://pixinvent.com/vuexy-vuetify-vuejs-admin-template/", stockKey: "vuexy", forceStock: true },
  { file: "shopperz.png", url: "https://docs.shopperz.xyz/", stockKey: "shopperz", forceStock: true },
  { file: "zaika.png", url: "https://zaika.bytesed.com/land/", stockKey: "zaika", forceStock: true },
  { file: "safecart.png", url: "https://safecart.bytesed.com/", stockKey: "safecart", forceStock: true },
  { file: "apexa.png", url: "https://apexa.archielite.com/", stockKey: "apexa", forceStock: true },
];

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function extractOgImages(html, baseHref) {
  const found = [];
  const reList = [
    /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/gi,
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/gi,
    /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/gi,
    /<meta[^>]+name=["']twitter:image:src["'][^>]+content=["']([^"']+)["']/gi,
  ];
  for (const re of reList) {
    let m;
    while ((m = re.exec(html))) found.push(m[1].trim());
  }
  const uniq = [...new Set(found)];
  return uniq
    .map((u) => {
      try {
        return new URL(u, baseHref).href;
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}

async function fetchHtml(primary, alt) {
  for (const url of [primary, alt].filter(Boolean)) {
    try {
      const res = await fetch(url, {
        redirect: "follow",
        headers: { "User-Agent": UA, Accept: "text/html,application/xhtml+xml" },
        signal: AbortSignal.timeout(25000),
      });
      if (!res.ok) continue;
      const html = await res.text();
      return { html, finalUrl: res.url || url };
    } catch {
      /* try next */
    }
  }
  return null;
}

async function fetchImageBuffer(imageUrl) {
  const res = await fetch(imageUrl, {
    headers: { "User-Agent": UA, Accept: "image/*,*/*" },
    signal: AbortSignal.timeout(35000),
  });
  if (!res.ok) return null;
  const ct = res.headers.get("content-type") || "";
  if (!ct.includes("image") && !imageUrl.match(/\.(png|jpe?g|webp|gif)(\?|$)/i)) return null;
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 2000) return null;
  return { buf, contentType: ct.includes("png") ? "image/png" : "image/jpeg" };
}

async function saveBufferAsCardPng(context, buf, contentType, outPath) {
  const page = await context.newPage();
  const tmpDir = mkdtempSync(join(tmpdir(), "pfimg-"));
  try {
    const ext = contentType.includes("png") ? "png" : "jpg";
    const tmpFile = join(tmpDir, `src.${ext}`);
    writeFileSync(tmpFile, buf);
    await page.setViewportSize({ width: 1440, height: 810 });
    await page.goto(pathToFileURL(tmpFile).href, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page
      .waitForFunction(
        () => {
          const img = document.querySelector("img");
          return img && img.complete && img.naturalWidth > 20;
        },
        { timeout: 15000 },
      )
      .catch(() => {});
    await page.screenshot({
      path: outPath,
      type: "png",
      fullPage: false,
      animations: "disabled",
      timeout: 120000,
    });
  } finally {
    await page.close();
    try {
      rmSync(tmpDir, { recursive: true, force: true });
    } catch {
      /* ignore */
    }
  }
}

async function tryOgThenStock(context, pageUrl, altUrl, outPath, stockUrl, forceStock) {
  if (forceStock) {
    const stock = await fetchImageBuffer(stockUrl);
    if (!stock) throw new Error("stock fetch failed");
    await saveBufferAsCardPng(context, stock.buf, stock.contentType, outPath);
    return "stock";
  }

  const fetched = await fetchHtml(pageUrl, altUrl);
  if (fetched) {
    const imgs = extractOgImages(fetched.html, fetched.finalUrl);
    for (const imgUrl of imgs.slice(0, 3)) {
      try {
        const img = await fetchImageBuffer(imgUrl);
        if (img) {
          await saveBufferAsCardPng(context, img.buf, img.contentType, outPath);
          return "og:image";
        }
      } catch {
        /* next */
      }
    }
  }

  try {
    await premiumScreenshot(context, pageUrl, altUrl, outPath);
    return "screenshot";
  } catch {
    /* fall through */
  }

  const stock = await fetchImageBuffer(stockUrl);
  if (!stock) throw new Error("stock fetch failed");
  await saveBufferAsCardPng(context, stock.buf, stock.contentType, outPath);
  return "stock";
}

async function premiumScreenshot(context, primary, alt, outPath) {
  const page = await context.newPage();
  try {
    await page.setViewportSize({ width: 1680, height: 945 });
    let lastErr;
    for (const url of [primary, alt].filter(Boolean)) {
      try {
        await page.goto(url, { waitUntil: "load", timeout: 90000 });
        await sleep(5200);
        await page.evaluate(() => {
          window.scrollTo(0, 0);
          document.querySelectorAll('[class*="cookie" i],[id*="cookie" i],[class*="consent" i]').forEach((el) => {
            try {
              el.remove();
            } catch {
              /* */
            }
          });
        });
        await page.setViewportSize({ width: 1440, height: 810 });
        await sleep(600);
        await page.screenshot({
          path: outPath,
          type: "png",
          fullPage: false,
          animations: "disabled",
          timeout: 120000,
        });
        return;
      } catch (e) {
        lastErr = e;
      }
    }
    throw lastErr || new Error("goto failed");
  } finally {
    await page.close();
  }
}

async function main() {
  if (!existsSync(assetsDir)) mkdirSync(assetsDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: UA,
    ignoreHTTPSErrors: true,
    locale: "en-US",
    viewport: { width: 1440, height: 810 },
  });

  const only = process.env.ONLY?.split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const runJobs = only?.length ? jobs.filter((j) => only.includes(j.file)) : jobs;

  const summary = [];
  for (const job of runJobs) {
    const outPath = join(assetsDir, job.file);
    const stockUrl = STOCK[job.stockKey];
    process.stdout.write(`${job.file} … `);
    try {
      const mode = await tryOgThenStock(
        context,
        job.url,
        job.altUrl,
        outPath,
        stockUrl,
        Boolean(job.forceStock),
      );
      console.log(mode);
      summary.push({ file: job.file, ok: true, mode });
    } catch (e) {
      console.log(`FAIL (${e?.message || e})`);
      summary.push({ file: job.file, ok: false });
    }
  }

  await browser.close();
  const bad = summary.filter((s) => !s.ok);
  if (bad.length) {
    console.error("\nFailed:", bad.map((b) => b.file).join(", "));
    process.exitCode = 1;
  } else {
    console.log("\nAll refreshed.");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
