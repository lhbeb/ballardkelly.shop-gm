import { NextResponse } from 'next/server';
import { getAllProducts } from '@/lib/data';
import { formatValidSku, mapConditionToGmc } from '@/lib/conditions';
import { isGmcFeedEligibleProduct } from '@/lib/gmc';
import { enrichGmcDescription } from '@/lib/gmc-description';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const BASE_URL = 'https://cokaro.com';

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  try {
    const feedMarket = 'us';

    // Merchant Center review is configured for the US store experience. Do not advertise
    // international shipping in the feed unless those policies and account settings are updated.

    let products: any[] = [];
    try {
      products = await getAllProducts();
    } catch (e) {
      console.error('Error fetching products for Google feed:', e);
    }

    const itemsXml = products
      .filter(isGmcFeedEligibleProduct)
      .filter((p) => {
        // If a product has a specific target market, only include it in that market's feed
        if (p.meta?.targetMarket) {
          return p.meta.targetMarket.toLowerCase() === feedMarket;
        }
        return true; // Otherwise, global product goes to all feeds
      })
      .filter((p) => (p.currency || 'USD').toUpperCase() === 'USD')
      .map((p) => {
        const sku = formatValidSku(p);
        const title = escapeXml(p.title || 'Product');
        const description = escapeXml(enrichGmcDescription(p));
        const link = `${BASE_URL}/products/${p.slug}`;
        
        const itemPrice = Number(p.price || 0);
        const itemCurrency = (p.currency || 'USD').toUpperCase();

        const priceStr = `${itemPrice.toFixed(2)} ${itemCurrency}`;
        const availability = p.inStock === false ? 'out_of_stock' : 'in_stock';
        const condition = mapConditionToGmc(p.condition);
        const brand = escapeXml(p.brand || 'Unbranded');
        const category = escapeXml(p.category || 'General Store');

        let imageLink = '';
        if (p.images && p.images.length > 0) {
          try {
            imageLink = new URL(p.images[0], BASE_URL).toString();
          } catch {
            imageLink = p.images[0];
          }
        }
        imageLink = escapeXml(imageLink);

        const additionalImageTags = Array.isArray(p.images) && p.images.length > 1
          ? p.images.slice(1, 11).map((imgUrl: string) => {
              let fullUrl = imgUrl;
              try { fullUrl = new URL(imgUrl, BASE_URL).toString(); } catch {}
              return `\n      <g:additional_image_link>${escapeXml(fullUrl)}</g:additional_image_link>`;
            }).join('')
          : '';

        const gtin = escapeXml(p.gtin || p.meta?.gtin || p.meta?.upc || p.meta?.ean || p.meta?.barcode || '');
        const mpn = escapeXml(p.mpn || p.meta?.mpn || '');
        const hasIdentifier = Boolean(gtin || mpn);

        const identifierTags = hasIdentifier
          ? `${gtin ? `\n      <g:gtin>${gtin}</g:gtin>` : ''}${mpn ? `\n      <g:mpn>${mpn}</g:mpn>` : ''}\n      <g:identifier_exists>yes</g:identifier_exists>`
          : `\n      <g:identifier_exists>no</g:identifier_exists>`;

        const shippingTags = `
      <g:shipping>
        <g:country>US</g:country>
        <g:service>Standard Shipping</g:service>
        <g:price>0.00 ${itemCurrency}</g:price>
        <g:min_handling_time>1</g:min_handling_time>
        <g:max_handling_time>1</g:max_handling_time>
        <g:min_transit_time>3</g:min_transit_time>
        <g:max_transit_time>4</g:max_transit_time>
      </g:shipping>`;
        
        const gmcCategory = p.meta?.gmc_category ? `\n      <g:google_product_category>${escapeXml(p.meta.gmc_category)}</g:google_product_category>` : '';
        const gmcAgeGroup = p.meta?.gmc_age_group ? `\n      <g:age_group>${escapeXml(p.meta.gmc_age_group)}</g:age_group>` : '';
        const gmcColor = p.meta?.gmc_color ? `\n      <g:color>${escapeXml(p.meta.gmc_color)}</g:color>` : '';
        const gmcGender = p.meta?.gmc_gender ? `\n      <g:gender>${escapeXml(p.meta.gmc_gender)}</g:gender>` : '';
        const gmcSize = p.meta?.gmc_size ? `\n      <g:size>${escapeXml(p.meta.gmc_size)}</g:size>` : '';

        return `
    <item>
      <g:id>${sku}</g:id>
      <title>${title}</title>
      <description>${description}</description>
      <link>${link}</link>
      <g:image_link>${imageLink}</g:image_link>${additionalImageTags}
      <g:price>${priceStr}</g:price>
      <g:availability>${availability}</g:availability>
      <g:condition>${condition}</g:condition>
      <g:brand>${brand}</g:brand>
      <g:product_type>${category}</g:product_type>${gmcCategory}${gmcAgeGroup}${gmcColor}${gmcGender}${gmcSize}${identifierTags}${shippingTags}
    </item>`;
      })
      .join('');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Cokaro Google Merchant Center Feed</title>
    <link>${BASE_URL}</link>
    <description>US product feed for Cokaro outdoor power equipment</description>
    ${itemsXml}
  </channel>
</rss>`;

    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('Error generating GMC feed:', error);
    return new NextResponse('Error generating feed', { status: 500 });
  }
}
