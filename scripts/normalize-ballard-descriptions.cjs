const fs = require('fs');
const path = require('path');

const STATE_PATH = path.resolve('scratch/ballard-description-normalize-state.json');
const REPORT_MD_PATH = path.resolve('scratch/ballard-description-cleanup-report.md');
const REPORT_JSON_PATH = path.resolve('scratch/ballard-description-cleanup-report.json');

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

function decodeEntities(input) {
  let text = String(input || '');
  const named = {
    amp: '&',
    apos: "'",
    copy: '(c)',
    gt: '>',
    lt: '<',
    nbsp: ' ',
    quot: '"',
    reg: '(R)',
    trade: '(TM)',
  };

  for (let pass = 0; pass < 4; pass += 1) {
    const next = text
      .replace(/&([a-z]+);/gi, (match, entity) => named[entity.toLowerCase()] ?? match)
      .replace(/&#(\d+);/g, (_, code) => {
        try {
          return String.fromCodePoint(Number(code));
        } catch {
          return '';
        }
      })
      .replace(/&#x([0-9a-f]+);/gi, (_, code) => {
        try {
          return String.fromCodePoint(parseInt(code, 16));
        } catch {
          return '';
        }
      });

    if (next === text) break;
    text = next;
  }

  return text;
}

function stripHtmlToText(value) {
  return decodeEntities(value)
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<li\b[^>]*>/gi, '\n- ')
    .replace(/<\/li>/gi, '')
    .replace(/<\/?(br|p|div|h[1-6]|tr|section|article|blockquote|ul|ol|table|tbody|thead)[^>]*>/gi, '\n')
    .replace(/<td\b[^>]*>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\r/g, '')
    .replace(/\t/g, ' ')
    .replace(/[ \u00a0]+/g, ' ')
    .replace(/ *\n */g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function makeDescriptionRicher(text, product) {
  let cleaned = stripHtmlToText(text)
    .replace(/^details\s*/i, '')
    .replace(/(^|\n)\s*[•-]\s*card text:\s*/gi, '$1')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  if (!cleaned) {
    cleaned = product.title || 'Collector item from Ballard Kelly.';
  }

  const title = String(product.title || '').trim();
  if (title && !cleaned.toLowerCase().includes(title.toLowerCase().slice(0, 40))) {
    cleaned = `${title}\n\n${cleaned}`;
  }

  return cleaned
    .replace(/[ ]+\./g, '.')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function hasHtmlArtifacts(value) {
  const text = String(value || '');
  return /<[^>]+>|&lt;\/?[a-z][^&]*&gt;|&amp;lt;|&nbsp;|&amp;nbsp;|<br\s*\/?\s*>|(^|\n)\s*[•-]\s*card text:/i.test(text);
}

async function request(url, options = {}, attempt = 1) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30000);
  try {
    const r = await fetch(url, {
      ...options,
      headers: {
        apikey: key,
        authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      signal: controller.signal,
    });
    if (!r.ok) throw new Error(`${r.status} ${await r.text()}`);
    return r;
  } catch (e) {
    if (attempt < 4) {
      await new Promise((resolve) => setTimeout(resolve, attempt * 700));
      return request(url, options, attempt + 1);
    }
    throw e;
  } finally {
    clearTimeout(timer);
  }
}

function truncate(value, length = 900) {
  const text = String(value || '').trim();
  return text.length > length ? `${text.slice(0, length - 1)}...` : text;
}

function writeReports({ scanned, changedRows, allProducts }) {
  fs.mkdirSync(path.dirname(REPORT_MD_PATH), { recursive: true });

  const productList = allProducts
    .map((product, index) => `${index + 1}. ${product.title || '(Untitled)'} — \`${product.slug}\``)
    .join('\n');

  const changedList = changedRows.length
    ? changedRows
      .map((product, index) => {
        return [
          `### ${index + 1}. ${product.title}`,
          `- Slug: \`${product.slug}\``,
          `- Before: ${truncate(product.before, 420).replace(/\n/g, ' ')}`,
          `- After: ${truncate(product.after, 700).replace(/\n/g, ' ')}`,
        ].join('\n');
      })
      .join('\n\n')
    : 'No descriptions needed HTML cleanup.';

  const markdown = [
    '# Ballard Kelly Description Cleanup Report',
    '',
    `Generated: ${new Date().toISOString()}`,
    `Products scanned: ${scanned}`,
    `Descriptions updated: ${changedRows.length}`,
    '',
    '## Products Updated',
    '',
    changedList,
    '',
    '## Full Ballard Kelly Product List',
    '',
    productList,
    '',
  ].join('\n');

  fs.writeFileSync(REPORT_MD_PATH, markdown);
  fs.writeFileSync(
    REPORT_JSON_PATH,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        scanned,
        changed: changedRows.length,
        updatedProducts: changedRows,
        allProducts,
      },
      null,
      2,
    ),
  );
}

async function main() {
  let offset = 0;
  const pageSize = 1000;
  let scanned = 0;
  const changedRows = [];
  const allProducts = [];

  while (true) {
    const query = [
      'select=slug,title,description,brand,category,updated_at',
      'slug=like.ballard-kelly-*',
      'order=created_at.desc,slug.asc',
      `limit=${pageSize}`,
      `offset=${offset}`,
    ].join('&');
    const r = await request(`${base}/rest/v1/products?${query}`);
    const rows = await r.json();
    if (!rows.length) break;

    for (const row of rows) {
      scanned += 1;
      allProducts.push({
        slug: row.slug,
        title: row.title,
        brand: row.brand,
        category: row.category,
      });

      const before = String(row.description || '');
      const after = makeDescriptionRicher(before, row);
      const needsCleanup = hasHtmlArtifacts(before);

      if (!needsCleanup || !after || before === after) continue;

      await request(`${base}/rest/v1/products?slug=eq.${encodeURIComponent(row.slug)}`, {
        method: 'PATCH',
        headers: { Prefer: 'return=minimal' },
        body: JSON.stringify({
          description: after,
          updated_at: new Date().toISOString(),
        }),
      });

      changedRows.push({
        slug: row.slug,
        title: row.title,
        before,
        after,
      });

      if (changedRows.length % 25 === 0) {
        console.log(`[normalize] changed=${changedRows.length} scanned=${scanned}`);
      }
    }

    offset += rows.length;
    console.log(`[normalize] page scanned=${rows.length}; total scanned=${scanned}; changed=${changedRows.length}`);
    if (rows.length < pageSize) break;
  }

  writeReports({ scanned, changedRows, allProducts });
  fs.writeFileSync(
    STATE_PATH,
    JSON.stringify(
      {
        scanned,
        changed: changedRows.length,
        completedAt: new Date().toISOString(),
        report: REPORT_MD_PATH,
      },
      null,
      2,
    ),
  );
  console.log(JSON.stringify({ scanned, changed: changedRows.length, report: REPORT_MD_PATH }));
}

main().catch((e) => {
  console.error(e.stack || e.message);
  process.exit(1);
});
