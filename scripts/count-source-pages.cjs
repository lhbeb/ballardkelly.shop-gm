const base = 'https://mikescardsshop.shop/collections/all/products.json?limit=250&page=';
(async () => {
  const all = new Set();
  for (let page = 1; page <= 20; page += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 30000);
    try {
      const response = await fetch(base + page, { headers: { 'User-Agent': 'Mozilla/5.0' }, signal: controller.signal });
      const json = await response.json();
      const products = Array.isArray(json.products) ? json.products : [];
      products.forEach((p) => all.add(String(p.id)));
      console.log(JSON.stringify({ page, status: response.status, count: products.length, unique: all.size }));
      if (products.length < 250) break;
    } finally {
      clearTimeout(timer);
    }
  }
})().catch((error) => { console.error(error.name + ': ' + error.message); process.exit(1); });
