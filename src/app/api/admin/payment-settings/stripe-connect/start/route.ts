import { randomBytes } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getAdminAuthFromRequest } from '@/lib/admin-request-auth';
import {
  encodeStripeConnectState,
  getStripeConnectCallbackUrl,
  getStripeConnectConfiguration,
  STRIPE_CONNECT_STATE_COOKIE,
} from '@/lib/stripe-connect';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const auth = await getAdminAuthFromRequest(request);
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized: Admin access required.' }, { status: 401 });
  }

  const configuration = getStripeConnectConfiguration();
  if (!configuration) {
    return NextResponse.json(
      { error: 'Stripe Connect is not configured. Add STRIPE_CONNECT_CLIENT_ID and a platform secret key.' },
      { status: 503 },
    );
  }

  const state = randomBytes(32).toString('hex');
  const callbackUrl = getStripeConnectCallbackUrl(request);
  const stripe = new Stripe(configuration.platformSecretKey, {
    apiVersion: '2026-01-28.clover' as any,
  });
  const authorizationUrl = stripe.oauth.authorizeUrl({
    response_type: 'code',
    client_id: configuration.clientId,
    scope: 'read_write',
    redirect_uri: callbackUrl,
    state,
    stripe_landing: 'login',
    always_prompt: true,
    stripe_user: {
      url: request.nextUrl.origin,
      physical_product: 'true',
      product_description: 'Outdoor power equipment sold through Cokaro.',
    },
  });

  const response = NextResponse.json({ url: authorizationUrl });
  response.cookies.set(
    STRIPE_CONNECT_STATE_COOKIE,
    encodeStripeConnectState(state, auth.email),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 10 * 60,
      path: '/api/admin/payment-settings/stripe-connect',
    },
  );
  return response;
}
