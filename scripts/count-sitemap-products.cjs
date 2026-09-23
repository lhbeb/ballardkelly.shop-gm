const base = 'https://mikescardsshop.shop';
const extractLocs = (xml) => [...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/g)].map((m) => m[1].replace(/&amp;/g, '&').trim());
async function get(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30000);
  try { const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, signal: controller.signal }); if (!r.ok) throw new Error(`${r.status} ${url}`); return await r.text(); }
  finally { clearTimeout(timer); }
}
(async () => {
  const index = await get(`${base}/sitemap.xml`);
  const maps = extractLocs(index).filter((u) => /sitemap_products_/.test(u));
  const urls = new Set();
  for (const map of maps) {
    const xml = await get(map);
    extractLocs(xml).filter((u) => /\/products\//.test(u)).forEach((u) => urls.add(u));
    console.log(JSON.stringify({ sitemap: map.split('/').pop(), products: extractLocs(xml).filter((u) => /\/products\//.test(u)).length, total: urls.size }));
  }
  console.log(JSON.stringify({ sitemaps: maps.length, products: urls.size }));
})().catch((e) => { console.error(e.name + ': ' + e.message); process.exit(1); });
