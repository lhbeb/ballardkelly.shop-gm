const fs = require('fs');
const env = {};
for (const line of fs.readFileSync('.env.local', 'utf8').split(/\r?\n/)) {
  const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
  if (m) env[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
}
(async () => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);
  try {
    const r = await fetch(`${env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/products?select=id,slug,title,brand&limit=12`, { headers: { apikey: env.SUPABASE_SERVICE_ROLE_KEY, authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}` }, signal: controller.signal });
    const text = await r.text();
    console.log(r.status, text.slice(0, 5000));
  } finally { clearTimeout(timer); }
})().catch(e => { console.error(e.name + ': ' + e.message); process.exit(1); });
