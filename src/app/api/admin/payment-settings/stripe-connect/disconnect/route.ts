import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getAdminAuthFromRequest } from '@/lib/admin-request-auth';
import { supabaseAdmin } from '@/lib/supabase/server';
import {
  deactivateStripeConnectionByAccountId,
  getStripeConnectConfiguration,
  STRIPE_CONNECT_PROVIDER,
} from '@/lib/stripe-connect';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const auth = await getAdminAuthFromRequest(request);
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized: Admin access required.' }, { status: 401 });
  }

  const configuration = getStripeConnectConfiguration();
  if (!configuration) {
    return NextResponse.json({ error: 'Stripe Connect is not configured.' }, { status: 503 });
  }

  const { data, error } = await supabaseAdmin
    .from('payment_settings')
    .select('publishable_key')
    .eq('provider', STRIPE_CONNECT_PROVIDER)
    .eq('is_active', true)
    .maybeSingle();

  if (error) {
    console.error('[Stripe Connect] Failed to read connection:', error);
    return NextResponse.json({ error: 'Could not read the Stripe connection.' }, { status: 500 });
  }
  if (!data?.publishable_key) {
    return NextResponse.json({ error: 'No connected Stripe account was found.' }, { status: 404 });
  }

  try {
    const stripe = new Stripe(configuration.platformSecretKey, {
      apiVersion: '2026-01-28.clover' as any,
    });
    await stripe.oauth.deauthorize({
      client_id: configuration.clientId,
      stripe_user_id: data.publishable_key,
    });
    await deactivateStripeConnectionByAccountId(data.publishable_key);

    return NextResponse.json({
      success: true,
      message: `Stripe account ${data.publishable_key} was disconnected.`,
    });
  } catch (disconnectError) {
    console.error('[Stripe Connect] Disconnect failed:', disconnectError);
    return NextResponse.json(
      { error: 'Stripe could not disconnect this account. Try again from Payment Settings.' },
      { status: 502 },
    );
  }
}
