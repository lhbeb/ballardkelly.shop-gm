import 'server-only';

import type { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { invalidateStripeConfigCache } from '@/lib/supabase/payment-settings';

export const STRIPE_CONNECT_STATE_COOKIE = 'cokaro_stripe_connect_state';
export const STRIPE_CONNECT_PROVIDER = 'stripe-connect';

export interface StripeConnectConfiguration {
  clientId: string;
  platformSecretKey: string;
}

interface StripeConnectionInput {
  accountId: string;
  accessToken: string;
  publishableKey: string;
  refreshToken: string;
  mode: 'live' | 'test';
  email: string;
  updatedBy: string;
}

export function getStripeConnectConfiguration(): StripeConnectConfiguration | null {
  const clientId = process.env.STRIPE_CONNECT_CLIENT_ID?.trim() || '';
  const platformSecretKey = (
    process.env.STRIPE_CONNECT_SECRET_KEY || process.env.STRIPE_SECRET_KEY || ''
  ).trim();

  if (!clientId || !platformSecretKey) return null;
  return { clientId, platformSecretKey };
}

function getConfiguredOrigin(request: NextRequest): string {
  if (process.env.NODE_ENV !== 'production') return request.nextUrl.origin;

  const configuredUrl = process.env.APP_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL;
  if (configuredUrl) {
    try {
      return new URL(configuredUrl).origin;
    } catch {
      // Fall through to the request origin.
    }
  }

  return request.nextUrl.origin;
}

export function getStripeConnectCallbackUrl(request: NextRequest): string {
  const configured = process.env.STRIPE_CONNECT_REDIRECT_URI?.trim();
  if (configured) return configured;
  return `${getConfiguredOrigin(request)}/api/admin/payment-settings/stripe-connect/callback`;
}

export function getPaymentSettingsUrl(
  request: NextRequest,
  status: 'connected' | 'cancelled' | 'disconnected' | 'error',
  reason?: string,
): URL {
  const url = new URL('/admin/payment-settings', getConfiguredOrigin(request));
  url.searchParams.set('stripe_connect', status);
  if (reason) url.searchParams.set('reason', reason);
  return url;
}

export function encodeStripeConnectState(state: string, email: string): string {
  return Buffer.from(JSON.stringify({ state, email }), 'utf8').toString('base64url');
}

export function decodeStripeConnectState(
  value: string | undefined,
): { state: string; email: string } | null {
  if (!value) return null;

  try {
    const parsed = JSON.parse(Buffer.from(value, 'base64url').toString('utf8')) as {
      state?: unknown;
      email?: unknown;
    };
    if (typeof parsed.state !== 'string' || typeof parsed.email !== 'string') return null;
    return { state: parsed.state, email: parsed.email };
  } catch {
    return null;
  }
}

async function saveProviderRow(
  provider: string,
  payload: Record<string, unknown>,
): Promise<void> {
  const { data: existing, error: readError } = await supabaseAdmin
    .from('payment_settings')
    .select('id')
    .eq('provider', provider)
    .maybeSingle();

  if (readError) throw readError;

  const result = existing
    ? await supabaseAdmin.from('payment_settings').update(payload).eq('provider', provider)
    : await supabaseAdmin.from('payment_settings').insert({ provider, ...payload });

  if (result.error) throw result.error;
}

export async function saveStripeConnection(input: StripeConnectionInput): Promise<void> {
  await saveProviderRow(STRIPE_CONNECT_PROVIDER, {
    publishable_key: input.accountId,
    secret_key: input.refreshToken || 'oauth-refresh-token-not-issued',
    payee_email: input.email,
    mode: input.mode,
    is_active: true,
    updated_by: input.updatedBy,
  });

  try {
    await saveProviderRow('stripe', {
      publishable_key: input.publishableKey,
      secret_key: input.accessToken,
      mode: input.mode,
      is_active: true,
      updated_by: input.updatedBy,
    });
  } catch (error) {
    await supabaseAdmin
      .from('payment_settings')
      .update({ is_active: false })
      .eq('provider', STRIPE_CONNECT_PROVIDER);
    throw error;
  }

  invalidateStripeConfigCache();
}

export async function deactivateStripeConnectionByAccountId(accountId: string): Promise<void> {
  const { data } = await supabaseAdmin
    .from('payment_settings')
    .select('publishable_key')
    .eq('provider', STRIPE_CONNECT_PROVIDER)
    .eq('is_active', true)
    .maybeSingle();

  if (!data || data.publishable_key !== accountId) return;

  await Promise.all([
    supabaseAdmin
      .from('payment_settings')
      .update({ is_active: false })
      .eq('provider', STRIPE_CONNECT_PROVIDER),
    supabaseAdmin
      .from('payment_settings')
      .update({ is_active: false })
      .eq('provider', 'stripe'),
  ]);
  invalidateStripeConfigCache();
}
