import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types/product';

interface CategoryRule {
  name: string;
  href: string;
  terms?: string[];
  category?: string;
}

interface CategoryTile {
  name: string;
  href: string;
  count: number;
  image: string;
}

const CATEGORY_RULES: CategoryRule[] = [
  {
    name: 'Lawn Mowers',
    href: '/search?category=Lawn%20Mowers',
    category: 'Lawn Mowers',
    terms: ['mower', 'mowers', 'mähroboter', 'maehroboter', 'automower', 'miimo', 'robocut'],
  },
  {
    name: 'Honda Mowers',
    href: '/search?query=Honda',
    terms: ['honda'],
  },
  {
    name: 'Husqvarna Outdoor Equipment',
    href: '/search?query=Husqvarna',
    terms: ['husqvarna'],
  },
  {
    name: 'Pressure Washers',
    href: '/search?category=Pressure%20Washers',
    category: 'Pressure Washers',
    terms: ['pressure washer', 'psi', 'gpm'],
  },
  {
    name: 'Chainsaws',
    href: '/search?query=Chainsaw',
    terms: ['chainsaw', 'chain saw'],
  },
  {
    name: 'Blowers & Trimmers',
    href: '/search?query=Blower%20Trimmer',
    terms: ['blower', 'trimmer', 'string trimmer'],
  },
];

interface PopularCategoriesProps {
  products: Product[];
}

function normalize(value?: string) {
  return value?.trim().toLowerCase() ?? '';
}

function productMatchesRule(product: Product, rule: CategoryRule) {
  const category = normalize(product.category);
  const title = normalize(product.title);
  const brand = normalize(product.brand);
  const description = normalize(product.description);
  const searchable = `${title} ${brand} ${category} ${description}`;
  const categoryMatch = rule.category ? category === normalize(rule.category) : false;
  const termMatch = rule.terms?.some((term) => searchable.includes(normalize(term))) ?? false;

  return categoryMatch || termMatch;
}

function buildCategoryTile(products: Product[], rule: CategoryRule): CategoryTile | null {
  const matchingProducts = products.filter(
    (product) =>
      product.published !== false &&
      product.inStock !== false &&
      product.slug &&
      product.images?.[0] &&
      productMatchesRule(product, rule),
  );

  if (matchingProducts.length === 0) {
    return null;
  }

  const image = matchingProducts.find((product) => product.images?.[0])?.images[0];

  if (!image) {
    return null;
  }

  return {
    name: rule.name,
    href: rule.href,
    count: matchingProducts.length,
    image,
  };
}

export default function PopularCategories({ products }: PopularCategoriesProps) {
  const categories = CATEGORY_RULES.map((rule) => buildCategoryTile(products, rule)).filter(
    (category): category is CategoryTile => Boolean(category),
  );

  if (categories.length === 0) return null;

  return (
    <section className="bg-[#f3f4f6] py-10 md:py-14" aria-labelledby="popular-categories-title">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 md:mb-8">
            <h2
              id="popular-categories-title"
              className="text-3xl font-bold text-[#1f5a46] md:text-4xl"
            >
              Explore Popular Categories
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="group relative overflow-hidden rounded-xl border border-[#1f5a46]/10 bg-white shadow-[0_12px_30px_rgba(10,48,117,0.06)] transition-colors duration-200 hover:border-[#1f5a46]/25"
                aria-label={`Shop ${category.name}`}
              >
                <div className="relative aspect-[1.08/1] overflow-hidden bg-white p-4">
                  <Image
                    src={category.image}
                    alt={`${category.name} collection`}
                    fill
                    sizes="(max-width: 639px) 44vw, (max-width: 1279px) 25vw, 14vw"
                    className="object-contain p-5 transition-transform duration-300 group-hover:scale-[1.04]"
                    unoptimized={category.image.startsWith('http')}
                  />
                </div>

                <div className="flex min-h-[76px] items-center bg-[#1f5a46] px-4 py-3 text-[#f2f7f4]">
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold leading-tight sm:text-base">
                      {category.name}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-[#f2f7f4]/75">
                      {category.count} {category.count === 1 ? 'item' : 'items'}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
