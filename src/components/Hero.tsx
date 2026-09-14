import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types/product';

interface HeroProps {
  products?: Product[];
}

interface HeroTile {
  label: string;
  productTitle: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  image: string;
  alt: string;
}

function normalize(value?: string) {
  return value?.trim().toLowerCase() ?? '';
}

function findProduct(
  products: Product[],
  category: string,
  titleTerms: string[] = [],
  excludedSlugs: Set<string> = new Set(),
) {
  const categoryProducts = products.filter(
    (product) =>
      normalize(product.category) === normalize(category) &&
      product.images?.[0] &&
      product.slug &&
      product.published !== false &&
      product.inStock !== false &&
      !excludedSlugs.has(product.slug),
  );

  if (titleTerms.length === 0) {
    return categoryProducts[0];
  }

  return (
    categoryProducts.find((product) => {
      const title = normalize(product.title);
      return titleTerms.some((term) => title.includes(normalize(term)));
    }) ?? categoryProducts[0]
  );
}

function productHref(product: Product) {
  return `/products/${product.slug}`;
}

function createTile(
  product: Product | undefined,
  label: string,
  title: string,
  description: string,
): HeroTile | null {
  if (!product?.images?.[0] || !product.slug) {
    return null;
  }

  return {
    label,
    productTitle: product.title,
    title,
    description,
    cta: 'View Product',
    href: productHref(product),
    image: product.images[0],
    alt: product.title,
  };
}

export default function Hero({ products = [] }: HeroProps) {
  const usedSlugs = new Set<string>();

  const lawnMower = findProduct(products, 'Lawn Mowers', ['honda', 'craftsman', 'cub cadet', 'ego', 'mower']);
  if (lawnMower?.slug) usedSlugs.add(lawnMower.slug);

  const pressureWasher = findProduct(products, 'Pressure Washers', ['pressure washer']);
  if (pressureWasher?.slug) usedSlugs.add(pressureWasher.slug);

  const chainsaw = findProduct(products, 'Outdoor Power Equipment', ['chainsaw']);
  if (chainsaw?.slug) usedSlugs.add(chainsaw.slug);

  const blowerOrTrimmer = findProduct(
    products,
    'Outdoor Power Equipment',
    ['blower', 'trimmer', 'splitter'],
    usedSlugs,
  );

  const tiles = [
    createTile(
      lawnMower,
      'Lawn Mowers',
      'Mowers for Home, Backyard, and Farm Care',
      'Shop riding, self-propelled, walk-behind, and zero-turn mower options from the Cokaro catalog.',
    ),
    createTile(
      pressureWasher,
      'Pressure Washers',
      'Pressure Washers for Tough Cleanup',
      'Clean driveways, decks, tools, equipment, siding, and outdoor work areas.',
    ),
    createTile(
      chainsaw,
      'Outdoor Power Equipment',
      'Chainsaws & Wood Care',
      'Power saws and outdoor equipment for tree work, firewood, and property upkeep.',
    ),
    createTile(
      blowerOrTrimmer,
      'Outdoor Power Equipment',
      'Blowers, Trimmers & Yard Tools',
      'Equipment for clearing, trimming, and keeping outdoor spaces under control.',
    ),
  ].filter((tile): tile is HeroTile => Boolean(tile));

  if (tiles.length === 0) {
    return null;
  }

  const [mainTile, secondaryTile, ...smallTiles] = tiles;

  return (
    <section className="bg-gray-100 py-6 md:py-8" aria-labelledby="home-hero-title">
      <div className="container mx-auto px-4">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[1.05fr_1fr]">
          <Link
            href={mainTile.href}
            className="group relative min-h-[440px] overflow-hidden rounded-xl bg-[#0a3075] shadow-sm md:min-h-[520px]"
          >
            <Image
              src={mainTile.image}
              alt={mainTile.alt}
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              unoptimized={mainTile.image.startsWith('http')}
            />
            <div className="absolute inset-0 bg-[#0a0f32]/45" aria-hidden="true" />
            <div className="absolute left-5 right-5 top-8 max-w-[620px] rounded-xl bg-[#0a0f32]/70 p-6 text-white md:left-10 md:right-auto md:top-10 md:p-8">
              <p className="text-sm font-semibold text-[#F0F6FF]/80">{mainTile.label}</p>
              <p className="mt-2 line-clamp-2 text-sm font-medium text-[#F0F6FF]/80">
                Featured product: {mainTile.productTitle}
              </p>
              <h1
                id="home-hero-title"
                className="mt-3 text-3xl font-bold leading-tight text-white md:text-5xl"
              >
                {mainTile.title}
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-[#F0F6FF]/90 md:text-lg">
                {mainTile.description}
              </p>
              <span className="mt-6 inline-flex items-center justify-center rounded-lg bg-[#0a3075] px-6 py-3 text-sm font-bold text-[#F0F6FF] transition-colors group-hover:bg-[#08255f]">
                {mainTile.cta}
              </span>
            </div>
          </Link>

          {(secondaryTile || smallTiles.length > 0) && (
            <div className="grid gap-4">
              {secondaryTile && (
                <Link
                  href={secondaryTile.href}
                  className="group grid min-h-[260px] overflow-hidden rounded-xl bg-white shadow-sm md:grid-cols-[0.9fr_1.1fr]"
                >
                  <div className="flex flex-col justify-center p-6 md:p-10">
                    <p className="text-sm font-semibold text-[#0a3075]">{secondaryTile.label}</p>
                    <p className="mt-2 line-clamp-2 text-sm font-medium text-gray-500">
                      Featured product: {secondaryTile.productTitle}
                    </p>
                    <h2 className="mt-3 text-3xl font-bold leading-tight text-[#262626] md:text-4xl">
                      {secondaryTile.title}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-gray-600 md:text-base">
                      {secondaryTile.description}
                    </p>
                    <span className="mt-6 inline-flex w-fit items-center rounded-lg bg-[#0a3075] px-6 py-3 text-sm font-bold text-[#F0F6FF] transition-colors group-hover:bg-[#0a0f32]">
                      {secondaryTile.cta}
                    </span>
                  </div>
                  <div className="relative min-h-[220px] bg-white md:min-h-full">
                    <Image
                      src={secondaryTile.image}
                      alt={secondaryTile.alt}
                      fill
                      sizes="(max-width: 1023px) 100vw, 35vw"
                      className="object-contain p-6 transition-transform duration-500 group-hover:scale-[1.04]"
                      unoptimized={secondaryTile.image.startsWith('http')}
                    />
                  </div>
                </Link>
              )}

              {smallTiles.length > 0 && (
                <div className="grid gap-4 md:grid-cols-2">
                  {smallTiles.map((tile) => (
                    <Link
                      key={tile.href}
                      href={tile.href}
                      className="group grid min-h-[210px] grid-cols-[1fr_0.9fr] overflow-hidden rounded-xl bg-white shadow-sm"
                    >
                      <div className="flex flex-col justify-center p-5 md:p-6">
                        <p className="text-sm font-semibold text-[#0a3075]">{tile.label}</p>
                        <p className="mt-2 line-clamp-2 text-sm font-medium text-gray-500">
                          Featured product: {tile.productTitle}
                        </p>
                        <h2 className="mt-2 text-2xl font-bold leading-tight text-[#262626]">
                          {tile.title}
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-gray-600">{tile.description}</p>
                        <span className="mt-4 text-sm font-bold text-[#0a3075] group-hover:text-[#0a0f32]">
                          {tile.cta}
                        </span>
                      </div>
                      <div className="relative bg-white">
                        <Image
                          src={tile.image}
                          alt={tile.alt}
                          fill
                          sizes="(max-width: 767px) 45vw, 20vw"
                          className="object-contain p-4 transition-transform duration-500 group-hover:scale-[1.05]"
                          unoptimized={tile.image.startsWith('http')}
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
