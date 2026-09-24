import { Info, PackageCheck, SearchCheck, ShieldCheck } from 'lucide-react';

const equipmentRows = [
  {
    value: '100%',
    title: 'Practical Equipment',
    text: 'Find dependable tools for lawns, backyards, acreage, and farms.',
    icon: ShieldCheck,
  },
  {
    value: '100%',
    title: 'Clear Product Details',
    text: 'Review condition, specifications, included items, and compatibility before ordering.',
    icon: SearchCheck,
  },
  {
    value: 'Curated',
    title: 'Property-Care Essentials',
    text: 'Mowers, pressure washers, chainsaws, blowers, trimmers, log splitters, and more.',
    icon: PackageCheck,
  },
] as const;

export default function BuiltForCollectors() {
  return (
    <section className="bg-[#102820] py-16 text-[#f2f7f4] md:py-20" aria-labelledby="built-for-equipment-title">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#6ee7a8]">
              Ballard Kelly Standard
            </p>
            <h2
              id="built-for-collectors-title"
              className="mt-3 text-4xl font-black uppercase leading-none tracking-normal text-[#f2f7f4] md:text-6xl"
            >
              Built for{' '}
              <span className="text-[#6ee7a8]">
                Property Care
              </span>
            </h2>
          </div>

          <div className="border-y border-[#f2f7f4]/25">
            {equipmentRows.map((row, index) => {
              const Icon = row.icon;

              return (
                <div
                  key={row.title}
                  className={`grid gap-5 py-8 md:grid-cols-[190px_1fr] md:items-center md:gap-8 ${
                    index > 0 ? 'border-t border-[#f2f7f4]/25' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <Icon className="h-7 w-7 shrink-0 text-[#6ee7a8] md:hidden" aria-hidden="true" />
                    <div className="text-6xl font-black leading-none tracking-normal text-[#6ee7a8] md:text-7xl">
                      {row.value}
                    </div>
                  </div>
                  <div className="flex items-start gap-5">
                    <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[#6ee7a8]/35 bg-[#f2f7f4]/8 text-[#6ee7a8] md:flex">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="inline bg-[#0b1b16] px-1 text-3xl font-black leading-tight tracking-normal text-[#f2f7f4] md:text-4xl">
                        {row.title}
                      </h3>
                      <p className="mt-3 max-w-3xl text-lg leading-8 text-[#f2f7f4]/88 md:text-2xl">
                        {row.text}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex items-start gap-3 rounded-lg bg-[#f2f7f4] px-5 py-4 text-[#1f5a46] md:px-6">
            <Info className="mt-1 h-5 w-5 shrink-0 text-[#1f8f5f]" aria-hidden="true" />
            <p className="text-base leading-7 md:text-lg">
              Based on Ballard Kelly&apos;s equipment listing standards and product review process.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
