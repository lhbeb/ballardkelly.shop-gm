import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const brandLogos = [
  {
    name: 'Briggs & Stratton',
    src: '/logos/briggs-stratton-vector-logo.png',
  },
  {
    name: 'Craftsman',
    src: '/logos/Craftsman_logo.svg.webp',
  },
  {
    name: 'Cub Cadet',
    src: '/logos/cubcadet logo.png',
  },
  {
    name: 'DeWalt',
    src: '/logos/DeWalt_Logo.svg.webp',
  },
  {
    name: 'EGO',
    src: '/logos/ego-logo.png',
  },
  {
    name: 'Greenworks',
    src: '/logos/greenworks_logo.png',
  },
  {
    name: 'Honda',
    src: '/logos/hondalogo.png',
  },
  {
    name: 'Husqvarna',
    src: '/logos/Husqvarna-logo-png.png',
  },
] as const;

export default function BrandCatalogSection() {
  return (
    <section className="bg-white py-16 md:py-24" aria-labelledby="brand-catalog-title">
      <div className="container mx-auto px-4">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div className="text-center lg:text-left">
            <p className="mb-5 text-sm font-semibold uppercase text-[#6b7280]">
              Cokaro Outdoor Equipment
            </p>
            <h2
              id="brand-catalog-title"
              className="text-3xl font-bold leading-tight text-[#262626] md:text-5xl"
            >
              Cokaro &amp; the Brands in Our Catalog
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-gray-600 md:text-lg lg:mx-0">
              Cokaro sells and resells lawn mowers, pressure washers, generators, and outdoor
              power equipment for home, backyard, acreage, and farm care. Brand names and logos
              help identify the products offered in our catalog; each mark remains the property
              of its respective owner.
            </p>
            <Link
              href="#outdoor-power-equipment"
              className="mt-8 inline-flex h-[52px] items-center justify-center gap-2 rounded-md bg-[#0a3075] px-7 text-sm font-bold uppercase text-[#F0F6FF] transition-colors hover:bg-[#0a0f32] focus:outline-none focus:ring-2 focus:ring-[#0a3075] focus:ring-offset-2"
            >
              Shop Equipment
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-2 border-l border-t border-[#0a3075]/10 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {brandLogos.map((brand) => (
              <div
                key={brand.name}
                className="flex min-h-32 items-center justify-center border-b border-r border-[#0a3075]/10 bg-white p-6 sm:min-h-36"
              >
                <div className="relative h-16 w-full max-w-40">
                  <Image
                    src={brand.src}
                    alt={`${brand.name} logo`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 180px"
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
