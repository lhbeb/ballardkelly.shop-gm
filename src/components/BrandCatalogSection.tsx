import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const collectorBrandLogos = [
  {
    name: 'Upper Deck',
    src: '/logos/03-upper-deck.avif',
  },
  {
    name: 'Dragon Ball',
    src: '/logos/15-dragon-ball.avif',
  },
  {
    name: 'Magic: The Gathering',
    src: '/logos/17-magic-the-gathering.avif',
  },
  {
    name: 'Disney Lorcana',
    src: '/logos/18-disney-lorcana.avif',
  },
  {
    name: 'Star Wars',
    src: '/logos/20-star-wars.avif',
  },
  {
    name: 'NFL',
    src: '/logos/21-nfl.avif',
  },
  {
    name: 'NHL',
    src: '/logos/23-nhl.avif',
  },
  {
    name: 'MLB',
    src: '/logos/24-mlb.avif',
  },
  {
    name: 'UFC',
    src: '/logos/25-ufc.avif',
  },
  {
    name: 'WWE',
    src: '/logos/27-wwe.avif',
  },
] as const;

export default function BrandCatalogSection() {
  return (
    <section className="bg-white py-16 md:py-24" aria-labelledby="brand-catalog-title">
      <div className="container mx-auto px-4">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div className="text-center lg:text-left">
            <p className="mb-5 text-sm font-semibold uppercase text-[#6b7280]">
              Founded by Ballard Kelly Scott
            </p>
            <h2
              id="brand-catalog-title"
              className="text-3xl font-bold leading-tight text-[#262626] md:text-5xl"
            >
              Ballard Kelly &amp; the brands collectors trust.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-gray-600 md:text-lg lg:mx-0">
              Ballard Kelly was founded by Ballard Kelly Scott, an enthusiast collector of cards,
              collectibles, Topps releases, Pokemon cards, booster boxes, comics, figures, sports,
              entertainment, and hobby releases that make a collection feel personal.
            </p>
            <Link
              href="#collector-finds"
              className="mt-8 inline-flex h-[52px] items-center justify-center gap-2 rounded-md bg-[#1f5a46] px-7 text-sm font-bold uppercase text-[#f2f7f4] transition-colors hover:bg-[#102820] focus:outline-none focus:ring-2 focus:ring-[#1f5a46] focus:ring-offset-2"
            >
              Shop Collector Finds
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-[#1f5a46]/10 bg-[#f2f7f4] shadow-sm sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-5">
            {collectorBrandLogos.map((brand) => (
              <div
                key={brand.name}
                className="group relative flex min-h-32 items-center justify-center border-b border-r border-[#1f5a46]/10 bg-white p-5 transition-colors hover:bg-[#f7fbf8] sm:min-h-36"
              >
                <div className="relative h-16 w-full max-w-32 transition-transform duration-300 group-hover:scale-[1.04] sm:max-w-36">
                  <Image
                    src={brand.src}
                    alt={`${brand.name} logo`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1280px) 25vw, 160px"
                    className="object-contain"
                  />
                </div>
                <span className="sr-only">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
