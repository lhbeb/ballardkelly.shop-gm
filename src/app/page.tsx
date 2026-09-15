import React, { Suspense } from 'react';
import Hero from '@/components/Hero';
import SameDayShipping from '@/components/SameDayShipping';
import ProductGrid from '@/components/ProductGrid';
import HomeReviews from '@/components/HomeReviews';
import CategorySection from '@/components/CategorySection';
import PopularCategories from '@/components/PopularCategories';
import BrandCatalogSection from '@/components/BrandCatalogSection';
import { getFeaturedProducts, getProducts } from '@/lib/data';
import { homeReviews, homeReviewsStats } from '@/lib/homeReviews';
import ScrollToTop from '@/components/ScrollToTop';
import { FEATURED_PRODUCT_LIMIT } from '@/config/products';
import type { Product } from '@/types/product';

const OUTDOOR_EQUIPMENT_CATEGORIES = new Set([
  'lawn mowers',
  'pressure washers',
  'outdoor power equipment',
]);

const OUTDOOR_EQUIPMENT_TERMS = [
  'mower',
  'mowers',
  'mähroboter',
  'maehroboter',
  'automower',
  'miimo',
  'robocut',
  'pressure washer',
  'chainsaw',
  'chain saw',
  'blower',
  'trimmer',
  'generator',
];

function normalizeCatalogText(value?: string) {
  return value?.trim().toLowerCase() ?? '';
}

function isOutdoorCareProduct(product: Product) {
  const category = normalizeCatalogText(product.category);
  const searchable = `${normalizeCatalogText(product.title)} ${normalizeCatalogText(product.brand)} ${category}`;

  return (
    product.published !== false &&
    product.inStock !== false &&
    Boolean(product.slug) &&
    Boolean(product.images?.[0]) &&
    (OUTDOOR_EQUIPMENT_CATEGORIES.has(category) ||
      OUTDOOR_EQUIPMENT_TERMS.some((term) => searchable.includes(term)))
  );
}

export default async function HomePage() {
  try {
    const [featuredProducts, products] = await Promise.all([
      getFeaturedProducts(),
      getProducts(),
    ]);

    const outdoorCareProducts = products.filter(isOutdoorCareProduct);

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
        title="Featured Equipment"
        subtitle="Resold and sourced equipment for lawns, backyards, workshops, acreage, and farm upkeep."
        maxDisplay={FEATURED_PRODUCT_LIMIT}
        shuffleForVisitor
        visitorShuffleKey="home-featured"
      />

      <SameDayShipping />

      <BrandCatalogSection />

      {outdoorCareProducts.length > 0 && (
        <Suspense fallback={null}>
          <ProductGrid
            products={outdoorCareProducts}
            sectionId="lawn-garden-equipment"
            title=""
            editorialCard={{
              title: 'Equipment for Lawn, Backyard, and Farm Care',
              description:
                'Cokaro sells and resells lawn mowers, pressure washers, chainsaws, blowers, trimmers, generators, and outdoor power equipment for routine yard care, backyard upkeep, acreage, and farm maintenance.',
            }}
            randomizeForVisitor
            visitorShuffleKey="home-outdoor-care"
          />
        </Suspense>
      )}

      <PopularCategories products={products} />

      {smallToolProducts.length > 0 && (
        <Suspense fallback={null}>
          <ProductGrid
            products={smallToolProducts}
            sectionId="durable-tools"
            title="Equipment for Home, Backyard, and Farm Work"
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
