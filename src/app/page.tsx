import React, { Suspense } from 'react';
import Hero from '@/components/Hero';
import SameDayShipping from '@/components/SameDayShipping';
import ProductGrid from '@/components/ProductGrid';
import HomeReviews from '@/components/HomeReviews';
import CategorySection from '@/components/CategorySection';
import PopularCategories from '@/components/PopularCategories';
import BrandCatalogSection from '@/components/BrandCatalogSection';
import BuiltForCollectors from '@/components/BuiltForCollectors';
import CollectorChoiceComparison from '@/components/CollectorChoiceComparison';
import { getFeaturedProducts, getProducts } from '@/lib/data';
import { homeReviews, homeReviewsStats } from '@/lib/homeReviews';
import ScrollToTop from '@/components/ScrollToTop';
import { FEATURED_PRODUCT_LIMIT } from '@/config/products';
import type { Product } from '@/types/product';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const COLLECTIBLES_TERMS = [
  'trading card',
  'collectible',
  'comic',
  'figure',
  'pokemon',
  'sports card',
  'action figure',
  'memorabilia',
];

function normalizeCatalogText(value?: string) {
  return value?.trim().toLowerCase() ?? '';
}

function isCollectibleProduct(product: Product) {
  const category = normalizeCatalogText(product.category);
  const searchable = `${normalizeCatalogText(product.title)} ${normalizeCatalogText(product.brand)} ${category}`;

  return (
    product.published !== false &&
    product.inStock !== false &&
    Boolean(product.slug) &&
    Boolean(product.images?.[0]) &&
    COLLECTIBLES_TERMS.some((term) => searchable.includes(term))
  );
}

export default async function HomePage() {
  try {
    const [featuredProducts, products] = await Promise.all([
      getFeaturedProducts(),
      getProducts(),
    ]);

    const collectibleProducts = products.filter(isCollectibleProduct);

    const smallToolProducts = products.filter((product) =>
      product.collections?.includes('power-tools') &&
      product.category.trim().toLowerCase() === 'hardware'
    );

  return (
    <>
      <Suspense fallback={null}>
        <ScrollToTop />
      </Suspense>
      <Hero products={products} />

      <CategorySection
        products={featuredProducts}
        maxDisplay={FEATURED_PRODUCT_LIMIT}
        shuffleForVisitor
        visitorShuffleKey="home-featured"
      />

      <SameDayShipping />

      <BrandCatalogSection />

      <BuiltForCollectors />

      <CollectorChoiceComparison />

      {collectibleProducts.length > 0 && (
        <Suspense fallback={null}>
          <ProductGrid
            products={collectibleProducts}
            sectionId="trading-cards-collectibles-comics-figures"
            title=""
            editorialCard={{
              title: 'Trading Cards, Topps, Pokemon & Collectibles',
              description:
                'Explore collector-led finds from Ballard Kelly: trading cards, Topps releases, Pokemon cards, booster boxes, comics, figures, and unique collectibles.',
            }}
            randomizeForVisitor
            visitorShuffleKey="home-collector-finds"
          />
        </Suspense>
      )}

      <PopularCategories products={products} />

      {smallToolProducts.length > 0 && (
        <Suspense fallback={null}>
          <ProductGrid
            products={smallToolProducts}
            sectionId="durable-tools"
            title="More to Discover for Collectors"
            randomizeForVisitor
            visitorShuffleKey="home-durable-tools"
          />
        </Suspense>
      )}

      <HomeReviews
        reviews={homeReviews}
        averageRating={homeReviewsStats.averageRating}
        totalReviews={homeReviewsStats.totalReviews}
      />
    </>
  );
  } catch (error) {
    console.error('Error loading homepage:', error);
    return (
      <>
        <Hero />
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-[#262626] mb-4">Unable to load products</h2>
          <p className="text-gray-600">Please refresh the page or try again later.</p>
        </div>
      </>
    );
  }
}
