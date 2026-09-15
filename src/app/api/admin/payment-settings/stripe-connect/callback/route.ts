import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import {
  decodeStripeConnectState,
  getPaymentSettingsUrl,
  getStripeConnectConfiguration,
  saveStripeConnection,
  STRIPE_CONNECT_STATE_COOKIE,
} from '@/lib/stripe-connect';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function redirectAndClearState(request: NextRequest, url: URL) {
  const response = NextResponse.redirect(url);
  response.cookies.set(STRIPE_CONNECT_STATE_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/api/admin/payment-settings/stripe-connect',
  });
  return response;
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams;
  const returnedState = query.get('state') || '';
  const storedState = decodeStripeConnectState(
    request.cookies.get(STRIPE_CONNECT_STATE_COOKIE)?.value,
  );

  if (!storedState || !returnedState || returnedState !== storedState.state) {
    return redirectAndClearState(
      request,
      getPaymentSettingsUrl(request, 'error', 'invalid_state'),
    );
  }

  if (query.get('error') === 'access_denied') {
    return redirectAndClearState(request, getPaymentSettingsUrl(request, 'cancelled'));
  }

  const code = query.get('code');
  const configuration = getStripeConnectConfiguration();
  if (!code || !configuration) {
    return redirectAndClearState(
      request,
      getPaymentSettingsUrl(request, 'error', 'missing_configuration'),
    );
  }

  try {
    const platformStripe = new Stripe(configuration.platformSecretKey, {
      apiVersion: '2026-01-28.clover' as any,
    });
    const token = await platformStripe.oauth.token({
      grant_type: 'authorization_code',
      code,
    });

    if (!token.access_token || !token.stripe_publishable_key || !token.stripe_user_id) {
      throw new Error('Stripe returned an incomplete OAuth response.');
    }

    const connectedStripe = new Stripe(token.access_token, {
      apiVersion: '2026-01-28.clover' as any,
    });
    const account = await connectedStripe.accounts.retrieve();
    if (account.id !== token.stripe_user_id) {
      throw new Error('Connected account identity did not match the OAuth response.');
    }

    await saveStripeConnection({
      accountId: token.stripe_user_id,
      accessToken: token.access_token,
      publishableKey: token.stripe_publishable_key,
      refreshToken: token.refresh_token || '',
      mode: token.livemode ? 'live' : 'test',
      email: account.email || '',
      updatedBy: storedState.email,
    });

    return redirectAndClearState(request, getPaymentSettingsUrl(request, 'connected'));
  } catch (error) {
    console.error('[Stripe Connect] OAuth callback failed:', error);
    return redirectAndClearState(
      request,
      getPaymentSettingsUrl(request, 'error', 'oauth_failed'),
    );
  }
}
