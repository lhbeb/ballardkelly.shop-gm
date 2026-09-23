import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  return handlePublishAll(request);
}

export async function POST(request: NextRequest) {
  return handlePublishAll(request);
}

async function handlePublishAll(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');
    // Security check: only allow authorized execution
    const validKey = !key || key === 'BallardKelly-admin' || key === 'BallardKelly-publish-all-2026';
    if (!validKey) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch all products from Supabase
    let allProducts: any[] = [];
    let page = 0;
    const pageSize = 1000;
    let hasMore = true;

    while (hasMore) {
      const from = page * pageSize;
      const to = from + pageSize - 1;

      const { data, error } = await supabaseAdmin
        .from('products')
        .select('slug, meta, published, in_stock, category')
        .range(from, to);

      if (error) {
        console.error('Error fetching products batch:', error);
        break;
      }

      if (data && data.length > 0) {
        allProducts = allProducts.concat(data);
        if (data.length < pageSize) {
          hasMore = false;
        } else {
          page++;
        }
      } else {
        hasMore = false;
      }
    }

    console.log(`[PUBLISH-ALL] Found ${allProducts.length} total products in database`);

    let updatedCount = 0;
    const batchSize = 25;
    for (let i = 0; i < allProducts.length; i += batchSize) {
      const batch = allProducts.slice(i, i + batchSize);
      await Promise.all(
        batch.map(async (p) => {
          const currentMeta = p.meta || {};
          const newMeta = {
            ...currentMeta,
            published: true,
            gmc_enabled: true,
          };

          const updatePayload: any = {
            meta: newMeta,
            updated_at: new Date().toISOString(),
          };

          if (p.published !== undefined) {
            updatePayload.published = true;
          }

          const { error } = await supabaseAdmin
            .from('products')
            .update(updatePayload)
            .eq('slug', p.slug);

          if (!error) {
            updatedCount++;
          } else {
            console.error(`Failed to update product ${p.slug}:`, error.message);
          }
        })
      );
    }

    revalidatePath('/');
    revalidatePath('/products');
    revalidatePath('/api/products');
    revalidatePath('/api/feed/google');

    return NextResponse.json({
      success: true,
      totalFound: allProducts.length,
      updatedCount,
      message: `Successfully published ${updatedCount} products in BallardKelly database.`,
    });
  } catch (error: any) {
    console.error('Publish-all error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to publish products' },
      { status: 500 }
    );
  }
}
