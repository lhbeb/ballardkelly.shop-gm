const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
(async () => {
  const c = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth:{autoRefreshToken:false,persistSession:false} });
  const { data, error, count } = await c.from('products').select('id,slug,title,brand', { count:'exact' }).limit(12);
  if (error) throw error;
  console.log(JSON.stringify({ count, sample:data }, null, 2));
})().catch(e => { console.error(e.message); process.exit(1); });
