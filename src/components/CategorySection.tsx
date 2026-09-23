"use client";

import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import type { Product } from '@/types/product';
import { createVisitorRotationSeed, selectRotatedProducts } from '@/utils/visitorProductRotation';

interface CategorySectionProps {
  products: Product[];
  maxDisplay?: number;
  shuffleForVisitor?: boolean;
  visitorShuffleKey?: string;
}

const CategorySection: React.FC<CategorySectionProps> = ({
  products,
  maxDisplay = 8,
  shuffleForVisitor = false,
  visitorShuffleKey = 'home-power-tools',
}) => {
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>(() =>
    products.slice(0, maxDisplay),
  );

  useEffect(() => {
    if (!products || products.length === 0) {
      setDisplayedProducts([]);
      return;
    }

    if (!shuffleForVisitor) {
      setDisplayedProducts(products.slice(0, maxDisplay));
      return;
    }

    const seed = createVisitorRotationSeed(visitorShuffleKey);
    setDisplayedProducts(selectRotatedProducts(products, seed, maxDisplay));
  }, [products, shuffleForVisitor, visitorShuffleKey, maxDisplay]);

  if (!displayedProducts || displayedProducts.length === 0) {
    return null;
  }

  return (
    <section id="collector-finds" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                cardBackground="bg-[#dde9e1] ring-1 ring-[#bfd3c7]"
                imageBackground="bg-white"
                showFullImage
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
