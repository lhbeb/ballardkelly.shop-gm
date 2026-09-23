const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
(async () => {
  for (const url of [
    'https://mikescardsshop.shop/collections/all/products.json?limit=250&page=1',
    'https://mikescardsshop.shop/collections/all/products.json?limit=250&page=2',
    'https://mikescardsshop.shop/collections/products.json?limit=250&page=1'
  ]) {
    const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const j = await r.json();
    console.log(url, r.status, Array.isArray(j.products) ? j.products.length : 'no products');
  }
  const c = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth:{autoRefreshToken:false,persistSession:false} });
  const { data, error, count } = await c.from('products').select('id,slug,title,brand,images', { count:'exact' }).limit(10);
  if (error) throw error;
  console.log(JSON.stringify({count, sample:data}, null, 2));
})().catch(e => { console.error(e.message); process.exit(1); });

