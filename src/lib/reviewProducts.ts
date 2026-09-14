import type { Product } from '@/types/product';

/**
 * Review products - these are products that have reviews but are no longer available
 * They should show as "sold out" or "offer expired" on their product pages
 */
export const reviewProducts: Record<string, Product> = {
};

/**
 * Check if a product slug belongs to a review product
 */
export function isReviewProduct(slug: string): boolean {
  return slug in reviewProducts;
}

/**
 * Get a review product by slug
 */
export function getReviewProduct(slug: string): Product | null {
  return reviewProducts[slug] || null;
}

