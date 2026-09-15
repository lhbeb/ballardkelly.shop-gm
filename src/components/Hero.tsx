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

function findProductByTerms(
  products: Product[],
  titleTerms: string[],
  excludedSlugs: Set<string> = new Set(),
) {
  return products.find((product) => {
    const searchable = `${normalize(product.title)} ${normalize(product.brand)} ${normalize(product.category)}`;

    return (
      product.images?.[0] &&
      product.slug &&
      product.published !== false &&
      product.inStock !== false &&
      !excludedSlugs.has(product.slug) &&
      titleTerms.some((term) => searchable.includes(normalize(term)))
    );
  });
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

  const chainsaw =
    findProduct(products, 'Outdoor Power Equipment', ['chainsaw'], usedSlugs) ??
    findProductByTerms(products, ['chainsaw', 'chain saw'], usedSlugs);
  if (chainsaw?.slug) usedSlugs.add(chainsaw.slug);

  const blowerOrTrimmer =
    findProduct(
      products,
      'Outdoor Power Equipment',
      ['blower', 'trimmer', 'splitter'],
      usedSlugs,
    ) ?? findProductByTerms(products, ['blower', 'trimmer', 'splitter'], usedSlugs);

  const tiles = [
    createTile(
      lawnMower,
      'Lawn Mowers',
      'Mowers for Home and Farm Care',
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
      normalize(chainsaw?.category) === 'outdoor power equipment' ? 'Outdoor Power Equipment' : 'Mower Options',
      normalize(chainsaw?.category) === 'outdoor power equipment'
        ? 'Chainsaws & Wood Care'
        : 'Practical Mowers',
      normalize(chainsaw?.category) === 'outdoor power equipment'
        ? 'Power saws and outdoor equipment for tree work, firewood, and property upkeep.'
        : 'Reliable mower listings selected from the current Cokaro catalog.',
    ),
    createTile(
      blowerOrTrimmer,
      normalize(blowerOrTrimmer?.category) === 'outdoor power equipment' ? 'Outdoor Power Equipment' : 'Mower Options',
      normalize(blowerOrTrimmer?.category) === 'outdoor power equipment'
        ? 'Blowers, Trimmers & Yard Tools'
        : 'Compact Mowers',
      normalize(blowerOrTrimmer?.category) === 'outdoor power equipment'
        ? 'Equipment for clearing, trimming, and keeping outdoor spaces under control.'
        : 'Compact mower choices for everyday residential lawn upkeep.',
    ),
  ].filter((tile): tile is HeroTile => Boolean(tile));

  if (tiles.length === 0) {
    return null;
  }

  const [mainTile, secondaryTile, ...smallTiles] = tiles;
  const hasSideTiles = Boolean(secondaryTile || smallTiles.length > 0);

  return (
    <section className="bg-gray-100 py-3 md:py-4" aria-labelledby="home-hero-title">
      <div className="container mx-auto px-4">
        <div className={`grid w-full gap-3 ${hasSideTiles ? 'lg:grid-cols-[1.08fr_1fr]' : ''}`}>
          <Link
            href={mainTile.href}
            className={`group relative min-h-[230px] overflow-hidden rounded-xl bg-[#0a3075] shadow-sm sm:min-h-[280px] ${hasSideTiles ? 'lg:min-h-[392px]' : 'lg:min-h-[330px]'}`}
          >
            <Image
              src={mainTile.image}
              alt={mainTile.alt}
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              unoptimized={mainTile.image.startsWith('http')}
            />
            <div className="absolute inset-0 bg-[#0a0f32]/25 md:bg-gradient-to-r md:from-[#0a0f32]/38 md:via-[#0a0f32]/12 md:to-transparent" aria-hidden="true" />
            <div className="absolute bottom-3 left-3 right-3 max-w-none rounded-xl bg-[#0a0f32]/62 p-4 text-white sm:bottom-5 sm:left-5 sm:right-5 md:bottom-8 md:left-8 md:right-auto md:max-w-[520px] md:bg-[#0a0f32]/42 md:p-6">
              <p className="text-sm font-semibold text-[#F0F6FF]/85">{mainTile.label}</p>
              <h1
                id="home-hero-title"
                className="mt-2 text-2xl font-bold leading-tight text-white sm:text-3xl md:text-[2.45rem]"
              >
                {mainTile.title}
              </h1>
              <span className="mt-3 inline-flex items-center justify-center rounded-lg bg-[#0a3075] px-4 py-2 text-xs font-bold text-[#F0F6FF] transition-colors group-hover:bg-[#08255f] sm:px-5 sm:py-2.5 sm:text-sm">
                {mainTile.cta}
              </span>
            </div>
          </Link>

          {(secondaryTile || smallTiles.length > 0) && (
            <div className="hidden gap-3 lg:grid">
              {secondaryTile && (
                <Link
                  href={secondaryTile.href}
                  className="group grid min-h-[210px] overflow-hidden rounded-xl bg-white shadow-sm md:grid-cols-[0.72fr_1.28fr]"
                >
                  <div className="flex flex-col justify-center p-5">
                    <p className="text-sm font-semibold text-[#0a3075]">{secondaryTile.label}</p>
                    <h2 className="mt-3 text-2xl font-bold leading-tight text-[#262626] md:text-[1.9rem]">
                      {secondaryTile.title}
                    </h2>
                    <span className="mt-3 inline-flex w-fit items-center rounded-lg bg-[#0a3075] px-5 py-2.5 text-sm font-bold text-[#F0F6FF] transition-colors group-hover:bg-[#0a0f32]">
                      {secondaryTile.cta}
                    </span>
                  </div>
                  <div className="relative min-h-[190px] bg-white md:min-h-full">
                    <Image
                      src={secondaryTile.image}
                      alt={secondaryTile.alt}
                      fill
                      sizes="(max-width: 1023px) 100vw, 35vw"
                      className="object-contain p-2 transition-transform duration-500 group-hover:scale-[1.04]"
                      unoptimized={secondaryTile.image.startsWith('http')}
                    />
                  </div>
                </Link>
              )}

              {smallTiles.length > 0 && (
                <div className="grid gap-3 md:grid-cols-2">
                  {smallTiles.map((tile) => (
                    <Link
                      key={tile.href}
                      href={tile.href}
                      className="group grid min-h-[169px] grid-cols-[0.82fr_1.18fr] overflow-hidden rounded-xl bg-white shadow-sm"
                    >
                      <div className="flex flex-col justify-center p-4">
                        <p className="text-sm font-semibold text-[#0a3075]">{tile.label}</p>
                        <h2 className="mt-2 line-clamp-2 text-xl font-bold leading-tight text-[#262626]">
                          {tile.title}
                        </h2>
                      </div>
                      <div className="relative bg-white">
                        <Image
                          src={tile.image}
                          alt={tile.alt}
                          fill
                          sizes="(max-width: 767px) 45vw, 20vw"
                          className="object-contain p-2 transition-transform duration-500 group-hover:scale-[1.05]"
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
