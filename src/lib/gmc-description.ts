type GmcDescriptionProduct = {
  title?: string | null;
  description?: string | null;
  condition?: string | null;
  category?: string | null;
};

const UNSUPPORTED_PROMO_PHRASES: Array<[RegExp, string]> = [
  [/\b100%\s+(?:genuine|authentic|guaranteed|risk[-\s]?free)\b/gi, 'listed'],
  [/\bworks perfectly\b/gi, 'has been reviewed for basic function'],
  [/\bperfect condition\b/gi, 'the listed condition'],
  [/\bguaranteed best price\b/gi, 'current listed price'],
  [/\bofficial authorized\b/gi, 'authorized where applicable'],
];

function normalizeWhitespace(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

function removeUnsupportedPromoPhrases(value: string): string {
  return UNSUPPORTED_PROMO_PHRASES.reduce(
    (current, [pattern, replacement]) =>
      current.replace(pattern, replacement).replace(/\s{2,}/g, ' '),
    value,
  ).trim();
}

function ensureSentence(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return '';
  return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
}

export function enrichGmcDescription(product: GmcDescriptionProduct): string {
  const sourceDescription = product.description || product.title || 'Outdoor power equipment sold by Cokaro.';
  const cleanedDescription = ensureSentence(
    normalizeWhitespace(removeUnsupportedPromoPhrases(String(sourceDescription))),
  );

  const details: string[] = [];

  if (product.condition) {
    details.push(`Condition: ${normalizeWhitespace(product.condition)}.`);
  }

  if (product.category) {
    details.push(`Category: ${normalizeWhitespace(product.category)}.`);
  }

  details.push('Sold by Cokaro, an independent ecommerce seller and reseller.');
  details.push('Brand and model names are used only to identify the listed product.');

  return normalizeWhitespace([cleanedDescription, ...details].filter(Boolean).join(' '));
}
