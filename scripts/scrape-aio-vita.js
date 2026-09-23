const path = require('path');
const crypto = require('crypto');
const cheerio = require('cheerio');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const SOURCE_ORIGIN = 'https://aio-vita.com';
const SITEMAP_INDEX = `${SOURCE_ORIGIN}/wp-sitemap.xml`;
const STORAGE_BUCKET = 'product-images';
const USER_AGENT = 'BallardKellyCatalogImporter/1.0 (+catalog migration)';
const DEFAULT_CONCURRENCY = 4;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL (or SUPABASE_URL) and SUPABASE_SERVICE_ROLE_KEY.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

function parseArgs(argv) {
  const options = { dryRun: false, limit: Infinity, concurrency: DEFAULT_CONCURRENCY, only: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--dry-run') options.dryRun = true;
    if (arg === '--limit') options.limit = Number(argv[++i]);
    if (arg === '--concurrency') options.concurrency = Number(argv[++i]);
    if (arg === '--only') options.only.push(slugify(argv[++i] || ''));
  }
  if (!Number.isFinite(options.limit) || options.limit < 1) options.limit = Infinity;
  if (!Number.isInteger(options.concurrency) || options.concurrency < 1 || options.concurrency > 8) {
    throw new Error('--concurrency must be an integer from 1 to 8.');
  }
  return options;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithRetry(url, { binary = false, attempts = 4 } = {}) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: {
          'user-agent': USER_AGENT,
          accept: binary ? 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8' : 'text/html,application/xml;q=0.9,*/*;q=0.8',
          'accept-language': 'en-US,en;q=0.8,de;q=0.7',
        },
        redirect: 'follow',
        signal: AbortSignal.timeout(30_000),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      if (binary) {
        const contentType = (response.headers.get('content-type') || '').split(';')[0].trim().toLowerCase();
        if (!contentType.startsWith('image/')) {
          throw new Error(`Expected an image but received ${contentType || 'an unknown content type'}`);
        }
        return { buffer: Buffer.from(await response.arrayBuffer()), contentType };
      }
      return await response.text();
    } catch (error) {
      lastError = error;
      if (attempt < attempts) await sleep(400 * (2 ** (attempt - 1)));
    }
  }
  throw new Error(`Failed to fetch ${url}: ${lastError?.message || lastError}`);
}

function absoluteUrl(value, baseUrl) {
  if (!value) return null;
  try {
    const url = new URL(value, baseUrl);
    return ['http:', 'https:'].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}

function compactText($element) {
  return $element.text().replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();
}

function slugify(value) {
  return value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/ß/g, 'ss')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 100);
}

function parseMoney(value) {
  if (value === null || value === undefined) return null;
  let normalized = String(value).replace(/[^\d,.-]/g, '');
  if (!normalized) return null;
  const lastComma = normalized.lastIndexOf(',');
  const lastDot = normalized.lastIndexOf('.');
  normalized = lastComma > lastDot
    ? normalized.replace(/\./g, '').replace(',', '.')
    : normalized.replace(/,/g, '');
  const amount = Number.parseFloat(normalized);
  return Number.isFinite(amount) ? amount : null;
}

function findProductJsonLd($) {
  for (const element of $('script[type="application/ld+json"]').toArray()) {
    try {
      const parsed = JSON.parse($(element).text());
      const candidates = Array.isArray(parsed) ? parsed
        : parsed['@graph'] && Array.isArray(parsed['@graph']) ? parsed['@graph'] : [parsed];
      const product = candidates.find((item) => item && item['@type'] === 'Product');
      if (product) return product;
    } catch {
      // Ignore unrelated malformed structured data.
    }
  }
  return {};
}

async function discoverProductUrls() {
  const indexXml = await fetchWithRetry(SITEMAP_INDEX);
  const $index = cheerio.load(indexXml, { xmlMode: true });
  const productSitemaps = $index('sitemap > loc').map((_, element) => $index(element).text().trim()).get()
    .filter((url) => /wp-sitemap-posts-product-\d+\.xml(?:\?.*)?$/.test(url));
  if (productSitemaps.length === 0) throw new Error('No product sitemaps were found.');

  const pages = await Promise.all(productSitemaps.map((url) => fetchWithRetry(url)));
  const urls = pages.flatMap((xml) => {
    const $ = cheerio.load(xml, { xmlMode: true });
    return $('url > loc').map((_, element) => $(element).text().trim()).get();
  });
  return [...new Set(urls.filter((url) => url.startsWith(`${SOURCE_ORIGIN}/produkt/`)))];
}

function extractProduct(html, url) {
  const $ = cheerio.load(html);
  const jsonLd = findProductJsonLd($);
  const title = compactText($('h1.product_title').first()) || String(jsonLd.name || '').trim();
  const sourceSlug = decodeURIComponent(new URL(url).pathname.split('/').filter(Boolean).pop() || '');
  const slug = slugify(sourceSlug || title);
  const offer = Array.isArray(jsonLd.offers) ? jsonLd.offers[0] : (jsonLd.offers || {});
  const currentPrice = parseMoney(offer.price ?? offer.priceSpecification?.[0]?.price
    ?? $('.summary .price ins .woocommerce-Price-amount').first().text()
    ?? $('.summary .price .woocommerce-Price-amount').first().text());
  const regularPrice = parseMoney($('.summary .price del .woocommerce-Price-amount').first().text());
  const currency = String(offer.priceCurrency || 'EUR').toUpperCase();

  const descriptionParts = [
    compactText($('.woocommerce-product-details__short-description').first()),
    compactText($('#tab-description .wc-tab-inner').first()),
    String(jsonLd.description || '').replace(/&(?:amp;)?(?:lt|gt);/g, ' ').replace(/\s+/g, ' ').trim(),
  ].filter(Boolean);
  const description = [...new Set(descriptionParts)].join('\n\n');

  const galleryImages = [];
  $('.woocommerce-product-gallery__image').each((_, element) => {
    const $figure = $(element);
    const candidate = $figure.find('a[href]').first().attr('href')
      || $figure.find('img').first().attr('data-large_image')
      || $figure.find('img').first().attr('data-src')
      || $figure.find('img').first().attr('src');
    const resolved = absoluteUrl(candidate, url);
    if (resolved && !/placeholder/i.test(resolved)) galleryImages.push(resolved);
  });
  if (galleryImages.length === 0) {
    const fallbackImages = Array.isArray(jsonLd.image)
      ? jsonLd.image : [jsonLd.image || $('meta[property="og:image"]').attr('content')];
    fallbackImages.forEach((image) => {
      const resolved = absoluteUrl(image, url);
      if (resolved && !/placeholder/i.test(resolved)) galleryImages.push(resolved);
    });
  }

  const images = [...new Set(galleryImages)];
  const category = compactText($('.product_meta .posted_in a').first()) || 'Lawn & Garden';
  const sku = compactText($('.product_meta .sku').first()) || String(jsonLd.sku || '').trim();
  const availability = String(offer.availability || '').toLowerCase();

  if (!title || !slug) throw new Error('Missing title or slug');
  if (currentPrice === null || currentPrice < 0) throw new Error('Missing or invalid price');
  return {
    url, slug, title, description: description || title, price: currentPrice,
    originalPrice: regularPrice && regularPrice > currentPrice ? regularPrice : null,
    currency, category, sku, brand: 'AiO Vitamins',
    inStock: !availability.includes('outofstock'), imageUrls: images,
  };
}

function extensionFor(contentType, imageUrl) {
  const known = {
    'image/avif': 'avif', 'image/gif': 'gif', 'image/jpeg': 'jpg', 'image/png': 'png',
    'image/svg+xml': 'svg', 'image/webp': 'webp',
  };
  if (known[contentType]) return known[contentType];
  const urlExtension = path.extname(new URL(imageUrl).pathname).replace('.', '').toLowerCase();
  return /^[a-z0-9]{2,5}$/.test(urlExtension) ? urlExtension : 'jpg';
}

async function downloadAndUploadImage(product, imageUrl, index) {
  const { buffer, contentType } = await fetchWithRetry(imageUrl, { binary: true });
  const hash = crypto.createHash('sha256').update(buffer).digest('hex').slice(0, 12);
  const extension = extensionFor(contentType, imageUrl);
  const storagePath = `aio-vita/${product.slug}/${String(index + 1).padStart(2, '0')}-${hash}.${extension}`;
  const { error } = await supabase.storage.from(STORAGE_BUCKET).upload(storagePath, buffer, {
    contentType, cacheControl: '31536000', upsert: true,
  });
  if (error) throw new Error(`Storage upload failed (${storagePath}): ${error.message}`);
  return supabase.storage.from(STORAGE_BUCKET).getPublicUrl(storagePath).data.publicUrl;
}

function mapCategory(sourceCategory) {
  const value = sourceCategory.toLocaleLowerCase('de');
  if (/rasenm|mähroboter|traktor|lawn/.test(value)) return 'Lawn Mowers';
  if (/kettens|motorsäge|chainsaw|werkzeug/.test(value)) return 'Power Equipment';
  if (/kaffee|coffee|espresso/.test(value)) return 'Kitchen Appliances';
  if (/kamin|holz|brennstoff|brikett|pellet/.test(value)) return 'Firewood & Heating';
  if (/pool|schwimm/.test(value)) return 'Swimming Pools';
  if (/häcksler|bläser|blower|laubsauger/.test(value)) return 'Blowers';
  if (/hochdruck|pressure/.test(value)) return 'Pressure Washers';
  if (/container/.test(value)) return 'Hardware';
  return sourceCategory || 'Lawn & Garden';
}

function buildRecord(product, uploadedImages) {
  const hasImages = uploadedImages.length > 0;
  return {
    id: product.slug, slug: product.slug, title: product.title, description: product.description,
    price: product.price, original_price: product.originalPrice, images: uploadedImages,
    condition: 'Brand New', category: mapCategory(product.category), brand: product.brand,
    payee_email: '', checkout_link: product.url, checkout_flow: 'paypal-invoice',
    currency: product.currency, rating: 0, review_count: 0, reviews: [],
    in_stock: product.inStock, is_featured: false, listed_by: 'mehdi', collections: [], published: hasImages,
    meta: {
      source_domain: 'aio-vita.com', source_url: product.url, source_category: product.category,
      source_sku: product.sku || null, source_image_count: product.imageUrls.length,
      imported_at: new Date().toISOString(), gmc_enabled: false, gmc_condition: 'new',
      gmc_identifier_exists: product.sku ? 'yes' : 'no', published: hasImages,
      original_price: product.originalPrice,
    },
  };
}

async function importProduct(url, options) {
  const product = extractProduct(await fetchWithRetry(url), url);
  if (options.dryRun) return { product, uploadedImages: product.imageUrls };

  const uploadedImages = [];
  for (let index = 0; index < product.imageUrls.length; index += 1) {
    uploadedImages.push(await downloadAndUploadImage(product, product.imageUrls[index], index));
  }
  const record = buildRecord(product, uploadedImages);
  let { error } = await supabase.from('products').upsert(record, { onConflict: 'slug' });
  if (error?.code === '23505' && /products_pkey/.test(error.message)) {
    ({ error } = await supabase.from('products').upsert(record, { onConflict: 'id' }));
  }
  if (error) throw new Error(`Database upsert failed: ${error.message}`);
  return { product, uploadedImages };
}

async function runPool(items, concurrency, worker) {
  let nextIndex = 0;
  const results = new Array(items.length);
  async function consume() {
    while (true) {
      const index = nextIndex;
      nextIndex += 1;
      if (index >= items.length) return;
      results[index] = await worker(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, consume));
  return results;
}

async function verifyImport(expectedUrls) {
  const expectedSlugs = new Set(expectedUrls.map((url) => slugify(
    decodeURIComponent(new URL(url).pathname.split('/').filter(Boolean).pop()),
  )));
  const { data, error } = await supabase.from('products').select('slug,images,meta');
  if (error) throw new Error(`Verification query failed: ${error.message}`);

  const rows = (data || []).filter((row) => expectedSlugs.has(row.slug) && row.meta?.source_domain === 'aio-vita.com');
  const missing = [...expectedSlugs].filter((slug) => !rows.some((row) => row.slug === slug));
  const imageMismatches = rows.filter((row) => !Array.isArray(row.images)
    || row.images.length !== Number(row.meta?.source_image_count))
    .map((row) => ({ slug: row.slug, expected: row.meta?.source_image_count, actual: row.images?.length || 0 }));
  const remoteImageCount = rows.reduce((sum, row) => sum + (Array.isArray(row.images) ? row.images.length : 0), 0);
  return { verifiedProducts: rows.length, remoteImageCount, missing, imageMismatches };
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  console.log('Discovering AiO Vita products...');
  const discoveredUrls = await discoverProductUrls();
  const selectedUrls = options.only.length
    ? discoveredUrls.filter((url) => options.only.includes(slugify(decodeURIComponent(new URL(url).pathname.split('/').filter(Boolean).pop()))))
    : discoveredUrls;
  const urls = selectedUrls.slice(0, options.limit);
  if (options.only.length && urls.length !== options.only.length) {
    const found = new Set(urls.map((url) => slugify(decodeURIComponent(new URL(url).pathname.split('/').filter(Boolean).pop()))));
    throw new Error(`Requested slugs not found in sitemap: ${options.only.filter((slug) => !found.has(slug)).join(', ')}`);
  }
  console.log(`Discovered ${discoveredUrls.length} product URLs; processing ${urls.length}${options.dryRun ? ' (dry run)' : ''}.`);

  let completed = 0;
  let totalImages = 0;
  const failures = [];
  await runPool(urls, options.concurrency, async (url, index) => {
    try {
      const result = await importProduct(url, options);
      completed += 1;
      totalImages += result.uploadedImages.length;
      console.log(`[${completed + failures.length}/${urls.length}] ${result.product.slug}: ${result.uploadedImages.length} images`);
      return result;
    } catch (error) {
      failures.push({ url, error: error.message || String(error) });
      console.error(`[${index + 1}/${urls.length}] FAILED ${url}: ${error.message || error}`);
      return null;
    }
  });

  const report = {
    source: SOURCE_ORIGIN, discoveredProducts: discoveredUrls.length, attemptedProducts: urls.length,
    importedProducts: completed, importedImages: totalImages, failedProducts: failures.length, failures,
    verification: options.dryRun ? null : await verifyImport(urls), finishedAt: new Date().toISOString(),
  };
  console.log(`IMPORT_REPORT ${JSON.stringify(report)}`);
  if (failures.length > 0 || report.verification?.missing.length || report.verification?.imageMismatches.length) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error.stack || error.message || error);
  process.exit(1);
});
