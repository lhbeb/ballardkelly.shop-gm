/**
 * Market / Region configuration for per-product targeting.
 * Stored as meta.targetMarket on the product.
 */

export type MarketKey = 'us' | 'uk' | 'eu' | 'ca' | 'au';

export interface MarketConfig {
  label: string;
  flag: string;
  currencyCode: string;
  currencySymbol: string;
  locale: string;
  shipsFrom: string;
  shipsFromFlag: string;
  deliveryDaysMin: number;
  deliveryDaysMax: number;
  freeShippingText: string;
  returnsText: string;
  faqShippingAnswer: string;
  faqFreeShippingAnswer: string;
}

export const MARKETS: Record<MarketKey, MarketConfig> = {
  us: {
    label: 'United States',
    flag: '🇺🇸',
    currencyCode: 'USD',
    currencySymbol: '$',
    locale: 'en-US',
    shipsFrom: 'United States',
    shipsFromFlag: '🇺🇸',
    deliveryDaysMin: 4,
    deliveryDaysMax: 5,
    freeShippingText: 'Free standard shipping',
    returnsText: '30-day returns',
    faqShippingAnswer:
      'Orders are processed within 1 business day. Transit time is 3-4 business days, making the total estimated delivery time 4-5 business days.',
    faqFreeShippingAnswer:
      'Yes, standard shipping is free across the United States. If faster delivery is available, you\'ll see those options at checkout.',
  },
  uk: {
    label: 'United Kingdom',
    flag: '🇬🇧',
    currencyCode: 'GBP',
    currencySymbol: '£',
    locale: 'en-GB',
    shipsFrom: 'United States',
    shipsFromFlag: '🇺🇸',
    deliveryDaysMin: 4,
    deliveryDaysMax: 5,
    freeShippingText: 'Free delivery to United Kingdom',
    returnsText: '30-day returns',
    faqShippingAnswer:
      'Orders are processed within 1 business day at our US facility. Transit time is 3-4 business days, making the total estimated delivery time to the UK 4-5 business days.',
    faqFreeShippingAnswer:
      'Yes, standard delivery is free across the United Kingdom. If express delivery is available for a product, you\'ll see those options at checkout.',
  },
  eu: {
    label: 'European Union',
    flag: '🇪🇺',
    currencyCode: 'EUR',
    currencySymbol: '€',
    locale: 'de-DE',
    shipsFrom: 'United States',
    shipsFromFlag: '🇺🇸',
    deliveryDaysMin: 4,
    deliveryDaysMax: 5,
    freeShippingText: 'Free delivery across Europe',
    returnsText: '30-day returns',
    faqShippingAnswer:
      'Orders to the European Union are processed within 1 business day at our US facility. Transit time is 3-4 business days, making the total estimated delivery time 4-5 business days depending on your country.',
    faqFreeShippingAnswer:
      'Yes, standard delivery is free across the European Union. Express options may be available at checkout.',
  },
  ca: {
    label: 'Canada',
    flag: '🇨🇦',
    currencyCode: 'CAD',
    currencySymbol: 'CA$',
    locale: 'en-CA',
    shipsFrom: 'United States',
    shipsFromFlag: '🇺🇸',
    deliveryDaysMin: 4,
    deliveryDaysMax: 5,
    freeShippingText: 'Free standard shipping across Canada',
    returnsText: '30-day returns',
    faqShippingAnswer:
      'Orders to Canada are processed within 1 business day at our US facility. Transit time is 3-4 business days, making the total estimated delivery time 4-5 business days.',
    faqFreeShippingAnswer:
      'Yes, standard shipping is free across Canada. Faster delivery options may be available at checkout.',
  },
  au: {
    label: 'Australia',
    flag: '🇦🇺',
    currencyCode: 'AUD',
    currencySymbol: 'A$',
    locale: 'en-AU',
    shipsFrom: 'United States',
    shipsFromFlag: '🇺🇸',
    deliveryDaysMin: 4,
    deliveryDaysMax: 5,
    freeShippingText: 'Free standard shipping across Australia',
    returnsText: '30-day returns',
    faqShippingAnswer:
      'Orders to Australia are processed within 1 business day at our US facility. Transit time is 3-4 business days, making the total estimated delivery time 4-5 business days.',
    faqFreeShippingAnswer:
      'Yes, standard shipping is free across Australia. Express options may be available at checkout.',
  },
};

/** Default fallback market */
export const DEFAULT_MARKET: MarketConfig = MARKETS.us;

/**
 * Get market config for a given key, falling back to US default.
 */
export function getMarket(key?: string | null): MarketConfig {
  if (!key || key === 'us') return DEFAULT_MARKET;
  return DEFAULT_MARKET;
}

/**
 * Format a price using the market's locale and currency symbol.
 * Uses same-number approach: price entered IS the target-currency price.
 */
export function formatMarketPrice(price: number, market: MarketConfig): string {
  const formatted = new Intl.NumberFormat(market.locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
  return `${market.currencySymbol}${formatted}`;
}

/**
 * Get estimated delivery date range string for a market.
 */
export function getDeliveryRange(market: MarketConfig): string {
  const today = new Date();
  const start = new Date(today);
  const end = new Date(today);
  start.setDate(today.getDate() + market.deliveryDaysMin);
  end.setDate(today.getDate() + market.deliveryDaysMax);

  const locale = market.locale;
  if (start.getMonth() === end.getMonth()) {
    return `${start.getDate()}–${end.getDate()} ${start.toLocaleString(locale, { month: 'long' })}`;
  }
  return `${start.getDate()} ${start.toLocaleString(locale, { month: 'long' })} – ${end.getDate()} ${end.toLocaleString(locale, { month: 'long' })}`;
}

export const MARKET_OPTIONS = [
  { value: '', label: 'United States (Default - USD)' },
  { value: 'us', label: 'United States (USD)' },
] as const;

/** Auto-currency mapping for each market */
export const MARKET_CURRENCY_MAP: Record<string, string> = {
  us: 'USD',
  uk: 'GBP',
  eu: 'EUR',
  ca: 'USD', // CAD not in currency selector, fall back to USD display
  au: 'USD', // AUD not in currency selector, fall back to USD display
};
