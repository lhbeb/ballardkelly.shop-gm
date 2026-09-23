const fs = require('fs');
const path = require('path');

const SOURCE = 'https://mikescardsshop.shop';
const BUCKET = 'product-images';
const STATE_PATH = path.resolve('scratch/mikes-cards-import-state.json');
const REPORT_PATH = path.resolve('scratch/mikes-cards-import-report.jsonl');
const USER_AGENT = 'BallardKellyCatalogImporter/1.0';
const PRODUCT_CONCURRENCY = Number(process.env.IMPORT_CONCURRENCY || 4);
const IMAGE_CONCURRENCY = 3;
const REQUEST_TIMEOUT = 45000;

function loadEnv() {
  const env = {};
  for (const line of fs.readFileSync('.env.local', 'utf8').split(/\r?\n/)) {
    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (match) env[match[1]] = match[2].replace(/^['"]|['"]$/g, '').trim();
  }
  return env;
}
const env = loadEnv();
const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SERVICE_KEY) throw new Error('Missing Supabase environment variables.');

function sleep(ms) { return new Promise((resolve) => setTimeout(resolve, ms)); }
function extractLocs(xml) { return [...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/g)].map((m) => m[1].replace(/&amp;/g, '&').trim()); }
function slugify(value) { return String(value || '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 180) || 'product'; }
function sourceHandleFromUrl(url) { return new URL(url).pathname.split('/').filter(Boolean).pop(); }
function sourceProductUrl(handle) { return `${SOURCE}/products/${handle}`; }
function imageExt(url, contentType) {
  const ext = path.extname(new URL(url).pathname).toLowerCase();
  if (/^\.(jpe?g|png|webp|gif|avif|svg)$/.test(ext)) return ext;
  const match = String(contentType || '').match(/image\/(jpeg|jpg|png|webp|gif|avif|svg\+xml)/i);
  return match ? `.${match[1].replace('+xml', '')}` : '.jpg';
}
function conditionFor(product) {
  const text = `${product.title || ''} ${product.tags || ''} ${product.description || ''}`.toLowerCase();
  if (/graded|sealed|factory sealed|new in box|brand new|new condition/.test(text)) return 'New';
  if (/used|pre-owned|excellent condition|very good condition|good condition/.test(text)) return 'Used';
  return 'New';
}
function categoryFor(product) { return String(product.type || '').trim() || (Array.isArray(product.tags) && product.tags[0]) || 'Trading Cards'; }
function vendorFor(product) { return String(product.vendor || '').trim() || 'Ballard Kelly'; }
function htmlToText(html) {
  return String(html || '')
    .replace(/<li[^>]*>/gi, '\n• ')
    .replace(/<\/?(br|p|div|h[1-6]|tr|section|article|blockquote)[^>]*>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/\r/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n[ \t]+/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

async function request(url, options = {}, attempt = 1) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal, headers: { 'User-Agent': USER_AGENT, ...(options.headers || {}) } });
    if (!response.ok) throw new Error(`HTTP ${response.status} ${url}`);
    return response;
  } catch (error) {
    if (attempt < 4) { await sleep(700 * attempt); return request(url, options, attempt + 1); }
    throw error;
  } finally { clearTimeout(timer); }
}
async function getText(url) { return (await request(url)).text(); }
async function getJson(url) { return JSON.parse(await getText(url)); }

async function storageUpload(storagePath, buffer, contentType) {
  const response = await request(`${SUPABASE_URL}/storage/v1/object/${BUCKET}/${storagePath}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${SERVICE_KEY}`, apikey: SERVICE_KEY, 'Content-Type': contentType || 'application/octet-stream', 'x-upsert': 'true' },
    body: buffer,
  });
  await response.arrayBuffer();
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${storagePath}`;
}
async function uploadOneImage(handle, sourceUrl, index) {
  const normalizedUrl = sourceUrl.startsWith('//') ? `https:${sourceUrl}` : sourceUrl;
  const response = await request(normalizedUrl);
  const buffer = Buffer.from(await response.arrayBuffer());
  const ext = imageExt(normalizedUrl, response.headers.get('content-type'));
  const storagePath = `ballard-kelly/${slugify(handle)}/img${String(index + 1).padStart(3, '0')}${ext}`;
  return storageUpload(storagePath, buffer, response.headers.get('content-type'));
}
async function mapLimit(items, limit, worker) {
  const results = new Array(items.length);
  let cursor = 0;
  async function run() { while (true) { const index = cursor++; if (index >= items.length) return; results[index] = await worker(items[index], index); } }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, run));
  return results;
}

async function getProductUrls() {
  const index = await getText(`${SOURCE}/sitemap.xml`);
  const sitemapUrls = extractLocs(index).filter((url) => /sitemap_products_/.test(url));
  const productUrls = new Set();
  for (const sitemapUrl of sitemapUrls) {
    const urls = extractLocs(await getText(sitemapUrl)).filter((url) => /\/products\//.test(url));
    urls.forEach((url) => productUrls.add(url));
    console.log(`[sitemap] ${sitemapUrls.indexOf(sitemapUrl) + 1}/${sitemapUrls.length}: ${urls.length} products; ${productUrls.size} total`);
  }
  return [...productUrls];
}

function loadState() {
  try { return JSON.parse(fs.readFileSync(STATE_PATH, 'utf8')); } catch { return { completed: {}, failed: {} }; }
}
function saveState(state) { fs.mkdirSync(path.dirname(STATE_PATH), { recursive: true }); fs.writeFileSync(STATE_PATH, JSON.stringify(state)); }
function appendReport(row) { fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true }); fs.appendFileSync(REPORT_PATH, JSON.stringify(row) + '\n'); }

async function upsertProduct(product) {
  const handle = product.handle || slugify(product.title);
  const sourceUrl = sourceProductUrl(handle);
  const imageUrls = Array.isArray(product.images) ? product.images.filter(Boolean) : [];
  if (!imageUrls.length) throw new Error('No product images returned by source.');
  const uploadedImages = await mapLimit(imageUrls, IMAGE_CONCURRENCY, (url, index) => uploadOneImage(handle, url, index));
  const variant = Array.isArray(product.variants) && product.variants[0] ? product.variants[0] : {};
  const cents = Number(product.price ?? variant.price ?? 0);
  const payload = {
    id: `BALLARDKELLY-${product.id}`,
    slug: `ballard-kelly-${slugify(handle)}`,
    title: String(product.title || handle).trim(),
    description: htmlToText(product.description) || 'Product description unavailable.',
    price: Number.isFinite(cents) ? cents / 100 : 0,
    images: uploadedImages,
    condition: conditionFor(product),
    category: categoryFor(product),
    brand: 'ballardkelly',
    payee_email: String(env.ADMIN_EMAILS || '').split(',')[0].trim(),
    currency: 'USD',
    checkout_link: sourceUrl,
    rating: 0,
    review_count: 0,
    reviews: [],
    meta: { source: SOURCE, source_id: product.id, source_handle: handle, source_url: sourceUrl, source_vendor: product.vendor || null, vendor: 'ballardkelly', gmc_brand: 'ballardkelly', gmc_item_id: `BALLARDKELLY-${product.id}`, source_type: product.type || null, source_tags: product.tags || [], source_images: imageUrls, source_variants: product.variants || [], source_description_html: String(product.description || '') },
    in_stock: Boolean(product.available),
    is_featured: false,
  };
  const response = await request(`${SUPABASE_URL}/rest/v1/products?on_conflict=slug`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${SERVICE_KEY}`, apikey: SERVICE_KEY, 'Content-Type': 'application/json', Prefer: 'resolution=merge-duplicates,return=minimal' },
    body: JSON.stringify(payload),
  });
  await response.arrayBuffer();
  return { slug: payload.slug, title: payload.title, images: uploadedImages.length, id: payload.id };
}

async function main() {
  const limitArg = Number(process.argv.find((arg) => arg.startsWith('--limit='))?.split('=')[1] || 0);
  const urls = await getProductUrls();
  const selected = limitArg ? urls.slice(0, limitArg) : urls;
  const state = loadState();
  const pending = selected.filter((url) => !state.completed[url]);
  console.log(`[import] source products=${urls.length}; selected=${selected.length}; already complete=${selected.length - pending.length}; pending=${pending.length}; concurrency=${PRODUCT_CONCURRENCY}`);
  let done = selected.length - pending.length;
  let failures = 0;
  let cursor = 0;
  async function worker() {
    while (true) {
      const index = cursor++;
      if (index >= pending.length) return;
      const url = pending[index];
      const handle = sourceHandleFromUrl(url);
      try {
        const product = await getJson(`${SOURCE}/products/${handle}.js`);
        const result = await upsertProduct(product);
        state.completed[url] = { at: new Date().toISOString(), ...result };
        delete state.failed[url];
        done += 1;
        if (done % 10 === 0 || done === selected.length) { saveState(state); console.log(`[import] ${done}/${selected.length} ${result.title.slice(0, 80)}`); }
        appendReport({ ok: true, url, ...result });
      } catch (error) {
        failures += 1;
        state.failed[url] = { at: new Date().toISOString(), error: error.message };
        appendReport({ ok: false, url, error: error.message });
        console.error(`[failed] ${handle}: ${error.message}`);
        if (failures % 10 === 0) saveState(state);
      }
    }
  }
  await Promise.all(Array.from({ length: PRODUCT_CONCURRENCY }, worker));
  saveState(state);
  console.log(JSON.stringify({ complete: Object.keys(state.completed).length, failed: Object.keys(state.failed).length, selected: selected.length }, null, 2));
  if (failures) process.exitCode = 2;
}
main().catch((error) => { console.error(error.stack || error.message); process.exit(1); });
