import { Info, PackageCheck, SearchCheck, ShieldCheck } from 'lucide-react';

const collectorRows = [
  {
    value: '100%',
    title: 'Authentic Cards',
    text: 'Shop with confidence from a collector-focused store.',
    icon: ShieldCheck,
  },
  {
    value: '100%',
    title: 'Collector Focused',
    text: 'Built around the hobby Ballard Kelly Scott loves.',
    icon: SearchCheck,
  },
  {
    value: 'Curated',
    title: 'Fresh Finds',
    text: 'Cards, booster boxes, comics, figures, and collectibles selected for real hobby appeal.',
    icon: PackageCheck,
  },
] as const;

export default function BuiltForCollectors() {
  return (
    <section className="bg-[#101010] py-16 text-white md:py-20" aria-labelledby="built-for-collectors-title">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-white/55">
              Ballard Kelly Standard
            </p>
            <h2
              id="built-for-collectors-title"
              className="mt-3 text-4xl font-black uppercase leading-none tracking-normal text-white md:text-6xl"
            >
              Built for{' '}
              <span className="bg-gradient-to-r from-[#3478f6] to-[#8fd4c5] bg-clip-text text-transparent">
                Collectors
              </span>
            </h2>
          </div>

          <div className="border-y border-white/35">
            {collectorRows.map((row, index) => {
              const Icon = row.icon;

              return (
                <div
                  key={row.title}
                  className={`grid gap-5 py-8 md:grid-cols-[190px_1fr] md:items-center md:gap-8 ${
                    index > 0 ? 'border-t border-white/35' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <Icon className="h-7 w-7 shrink-0 text-[#8fd4c5] md:hidden" aria-hidden="true" />
                    <div className="bg-gradient-to-r from-[#3478f6] to-[#8fd4c5] bg-clip-text text-6xl font-black leading-none tracking-normal text-transparent md:text-7xl">
                      {row.value}
                    </div>
                  </div>
                  <div className="flex items-start gap-5">
                    <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-[#8fd4c5] md:flex">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="inline bg-black px-1 text-3xl font-black leading-tight tracking-normal text-white md:text-4xl">
                        {row.title}
                      </h3>
                      <p className="mt-3 max-w-3xl text-lg leading-8 text-white/88 md:text-2xl">
                        {row.text}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex items-start gap-3 rounded-lg bg-white px-5 py-4 text-[#5b6470] md:px-6">
            <Info className="mt-1 h-5 w-5 shrink-0 text-[#4d9fe0]" aria-hidden="true" />
            <p className="text-base leading-7 md:text-lg">
              Based on Ballard Kelly&apos;s collector-first listing standards and product review process.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
