const fs = require('fs');
function loadEnv() {
  const env = {};
  for (const line of fs.readFileSync('.env.local', 'utf8').split(/\r?\n/)) {
    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (match) env[match[1]] = match[2].replace(/^['"]|['"]$/g, '').trim();
  }
  return env;
}
const env = loadEnv();
const base = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.SUPABASE_SERVICE_ROLE_KEY;
const headers = { apikey: key, authorization: `Bearer ${key}`, 'Content-Type': 'application/json' };
function itemId(product) {
  const sourceId = product.meta?.source_id || product.meta?.sourceId;
  if (sourceId !== undefined && sourceId !== null && String(sourceId).trim()) return `BALLARDKELLY-${String(sourceId).trim()}`;
  const existing = String(product.id || '').replace(/^BALLARD-KELLY-/i, '').replace(/^BALLARDKELLY-/i, '');
  return `BALLARDKELLY-${existing || product.slug}`.replace(/[^A-Za-z0-9_-]/g, '-').slice(0, 50);
}
async function request(url, options = {}, attempt = 1) {
  const controller = new AbortController(); const timer = setTimeout(() => controller.abort(), 30000);
  try {
    const r = await fetch(url, { ...options, headers: { ...headers, ...(options.headers || {}) }, signal: controller.signal });
    if (!r.ok) throw new Error(`${r.status} ${await r.text()}`);
    return r;
  } catch (e) { if (attempt < 4) { await new Promise(r => setTimeout(r, attempt * 700)); return request(url, options, attempt + 1); } throw e; }
  finally { clearTimeout(timer); }
}
async function main() {
  const products = [];
  for (let offset = 0; ; offset += 1000) {
    const r = await request(`${base}/rest/v1/products?select=id,slug,brand,meta&limit=1000&offset=${offset}`);
    const page = await r.json(); products.push(...page); if (page.length < 1000) break;
  }
  let changed = 0;
  for (const product of products) {
    const id = itemId(product);
    const meta = { ...(product.meta || {}), gmc_item_id: id, vendor: 'ballardkelly', gmc_brand: 'ballardkelly' };
    if (product.id === id && product.brand === 'ballardkelly' && product.meta?.gmc_item_id === id && product.meta?.vendor === 'ballardkelly') continue;
    await request(`${base}/rest/v1/products?slug=eq.${encodeURIComponent(product.slug)}`, { method: 'PATCH', headers: { Prefer: 'return=minimal' }, body: JSON.stringify({ id, brand: 'ballardkelly', meta }) });
    changed += 1;
    if (changed % 25 === 0) console.log(`[normalize] ${changed}/${products.length}`);
  }
  const verify = await request(`${base}/rest/v1/products?select=id,slug,brand,meta&limit=1000`);
  const rows = await verify.json();
  const invalid = rows.filter(p => p.brand !== 'ballardkelly' || !/^BALLARDKELLY-/.test(p.id) || p.meta?.gmc_item_id !== p.id);
  console.log(JSON.stringify({ scanned: products.length, changed, verified: rows.length, invalid: invalid.length, sample: rows.slice(0, 3).map(p => ({ id:p.id, brand:p.brand, gmc_item_id:p.meta?.gmc_item_id })) }, null, 2));
  if (invalid.length) process.exitCode = 2;
}
main().catch(e => { console.error(e.stack || e.message); process.exit(1); });
