# Stripe Connect setup for Cokaro

Cokaro Payment Settings supports Stripe OAuth for an existing Standard Stripe account. After authorization, the connected account's publishable key and OAuth access token become the active credentials used by the existing embedded Stripe Checkout flow.

## Stripe dashboard

1. Open the Stripe account that owns the Cokaro Connect platform.
2. Enable Connect and OAuth onboarding for Standard accounts.
3. Add this live redirect URI exactly:

   `https://cokaro.com/api/admin/payment-settings/stripe-connect/callback`

4. Copy the platform OAuth client ID. It starts with `ca_`.

## Environment variables

Add these variables to the Cokaro deployment:

```env
STRIPE_CONNECT_CLIENT_ID=ca_...
STRIPE_CONNECT_SECRET_KEY=sk_live_...
STRIPE_CONNECT_REDIRECT_URI=https://cokaro.com/api/admin/payment-settings/stripe-connect/callback
```

`STRIPE_CONNECT_SECRET_KEY` must belong to the same Stripe platform and mode as the client ID. When it is omitted, Cokaro falls back to `STRIPE_SECRET_KEY` as the platform key.

For local or sandbox testing, use the platform's test client ID and test secret. The callback defaults to the current localhost origin outside production unless `STRIPE_CONNECT_REDIRECT_URI` is set.

## Webhooks

Configure a Stripe webhook endpoint for events on connected accounts:

`https://cokaro.com/api/webhooks/stripe`

Store that endpoint's signing secret in `STRIPE_WEBHOOK_SECRET`. Subscribe to the Checkout Session, Payment Intent, and `account.application.deauthorized` events handled by the route.

## Connect the account

1. Deploy the environment variables.
2. Open **Admin > Payment Settings**.
3. Select **Connect with Stripe**.
4. Sign in to the Stripe account that should receive Cokaro payments and approve access.
5. Confirm that Payment Settings displays the `acct_` identifier, live/test mode, and charge status.

Manual API-key entry remains available as a fallback. Saving manual keys deactivates the OAuth connection marker so the admin status always reflects the credentials currently used by checkout.
