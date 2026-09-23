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
const headers = { apikey: key, authorization: `Bearer ${key}` };
async function main() {
  const filter = 'slug=not.like.ballard-kelly-*';
  const before = await fetch(`${base}/rest/v1/products?select=id&${filter}`, { headers: { ...headers, Prefer: 'count=exact' } });
  if (!before.ok) throw new Error(`Count failed: ${before.status} ${await before.text()}`);
  const beforeCount = Number((before.headers.get('content-range') || '0/0').split('/')[1] || 0);
  const response = await fetch(`${base}/rest/v1/products?${filter}`, {
    method: 'DELETE',
    headers: { ...headers, Prefer: 'return=representation,count=exact' },
  });
  const body = await response.text();
  if (!response.ok) throw new Error(`Delete failed: ${response.status} ${body}`);
  let deleted = [];
  try { deleted = JSON.parse(body); } catch {}
  const after = await fetch(`${base}/rest/v1/products?select=id&${filter}`, { headers: { ...headers, Prefer: 'count=exact' } });
  const afterCount = Number((after.headers.get('content-range') || '0/0').split('/')[1] || 0);
  console.log(JSON.stringify({ filter, beforeCount, deletedCount: Array.isArray(deleted) ? deleted.length : null, afterCount }, null, 2));
  if (afterCount !== 0) process.exitCode = 2;
}
main().catch((error) => { console.error(error.stack || error.message); process.exit(1); });
