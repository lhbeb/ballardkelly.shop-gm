import { Star, Info } from 'lucide-react';

const comparisonRows = [
  {
    label: 'Authentic Cards',
    ballardKelly: 'Collector reviewed',
    others: 'Not always',
  },
  {
    label: 'Careful Packaging',
    ballardKelly: 'Protected for transit',
    others: 'Varies',
  },
  {
    label: 'Collector-Focused Service',
    ballardKelly: 'Built for the hobby',
    others: 'Often generic',
  },
  {
    label: 'Clean Product Descriptions',
    ballardKelly: 'Plain text details',
    others: 'Can be messy',
  },
  {
    label: 'Fast Shipping',
    ballardKelly: 'Clear order flow',
    others: 'Varies',
  },
] as const;

export default function CollectorChoiceComparison() {
  return (
    <section className="bg-[#edf1f4] py-16 md:py-20" aria-labelledby="collector-choice-title">
      <div className="container mx-auto px-4">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.45fr] lg:items-start">
          <div className="text-center lg:pt-8 lg:text-left">
            <p className="mb-4 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-[#1f5a46]">
              <Star className="h-5 w-5 fill-[#1f5a46]" aria-hidden="true" />
              Why collectors choose
            </p>
            <h2
              id="collector-choice-title"
              className="text-4xl font-black uppercase leading-none tracking-normal text-[#111827] md:text-6xl"
            >
              Ballard{' '}
              <span className="bg-gradient-to-r from-[#2f73df] to-[#79c7bd] bg-clip-text text-transparent">
                Kelly
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-[#2f3843] lg:mx-0">
              Quality cards, trusted service, and a collection experience you can feel confident
              about from product page to delivery.
            </p>
          </div>

          <div className="relative overflow-x-auto pb-2">
            <div className="grid min-w-[720px] grid-cols-[1.18fr_0.86fr_0.86fr] items-stretch">
              <div className="border-y border-[#111827]/15 py-5" aria-hidden="true" />
              <div className="rounded-t-xl bg-gradient-to-br from-[#111b25] to-[#5aa2ff] px-6 py-6 text-center shadow-[0_24px_60px_rgba(22,78,155,0.32)]">
                <div className="text-2xl font-black uppercase text-white">Ballard Kelly</div>
              </div>
              <div className="border-y border-[#111827]/15 py-5 text-center">
                <div className="text-2xl font-black uppercase text-[#111827]">Other Sellers</div>
              </div>

              {comparisonRows.map((row, index) => (
                <div key={row.label} className="contents">
                  <div
                    className={`border-b border-[#111827]/15 py-5 pr-5 text-xl font-medium tracking-[0.05em] text-[#111827] ${
                      index === 0 ? 'border-t' : ''
                    }`}
                  >
                    {row.label}
                  </div>
                  <div
                    className={`flex items-center justify-center bg-gradient-to-br from-[#111b25] to-[#5aa2ff] px-6 py-5 text-center text-lg font-bold text-white ${
                      index === comparisonRows.length - 1 ? 'rounded-b-xl' : ''
                    }`}
                  >
                    {row.ballardKelly}
                  </div>
                  <div
                    className={`border-b border-[#111827]/15 py-5 pl-5 text-center text-lg font-medium text-[#111827] ${
                      index === 0 ? 'border-t' : ''
                    }`}
                  >
                    {row.others}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-8 flex max-w-7xl items-start gap-3 rounded-lg bg-white px-5 py-4 text-[#5b6470] shadow-sm md:px-6">
          <Info className="mt-1 h-5 w-5 shrink-0 text-[#4d9fe0]" aria-hidden="true" />
          <p className="text-base leading-7">
            Based on Ballard Kelly&apos;s collector-first listing standards, packaging care, and
            current product review process.
          </p>
        </div>
      </div>
    </section>
  );
}
