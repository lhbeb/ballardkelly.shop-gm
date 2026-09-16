import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, HelpCircle, Plus } from 'lucide-react';
import { STORE_FAQS } from '@/lib/storeFaqs';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | BallardKellyScott',
  description:
    'Find answers about BallardKellyScott resold and sourced outdoor power equipment, product marks, ordering, shipping, returns, tracking, local pickup, and customer support.',
  alternates: {
    canonical: 'https://BallardKellyScott.shop/frequently-asked-questions',
  },
};

export default function FrequentlyAskedQuestionsPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: STORE_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-[#f3f4f6]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="bg-[#1f5a46] px-4 py-14 text-[#f2f7f4] sm:py-20">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#c8942f] text-[#1f5a46]">
            <HelpCircle className="h-6 w-6" aria-hidden="true" />
          </div>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#f2f7f4]/75 sm:text-lg">
            Straightforward answers about shopping for BallardKellyScott equipment, product marks, delivery, returns, pickup, and support.
          </p>
        </div>
      </section>

      <section className="px-4 py-12 sm:py-16" aria-label="Frequently asked questions">
        <div className="container mx-auto max-w-4xl">
          <div className="divide-y divide-[#1f5a46]/10 border-y border-[#1f5a46]/10 bg-white px-5 sm:px-8">
            {STORE_FAQS.map((faq) => (
              <details key={faq.question} className="group py-1">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-left text-base font-bold text-[#1f5a46] marker:content-none sm:py-6 sm:text-lg">
                  <span>{faq.question}</span>
                  <Plus
                    className="h-5 w-5 shrink-0 text-[#c8942f] transition-transform duration-200 group-open:rotate-45"
                    aria-hidden="true"
                  />
                </summary>
                <div className="max-w-3xl pb-6 pr-8 text-sm leading-7 text-gray-600 sm:text-base">
                  <p>{faq.answer}</p>
                  {faq.linkHref && faq.linkLabel && (
                    <Link
                      href={faq.linkHref}
                      className="mt-3 inline-flex items-center gap-1.5 font-semibold text-[#1f5a46] underline decoration-[#c8942f] decoration-2 underline-offset-4"
                    >
                      {faq.linkLabel}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </details>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-2xl bg-[#1f5a46] p-6 text-[#f2f7f4] sm:flex-row sm:items-center sm:p-8">
            <div>
              <h2 className="text-xl font-bold sm:text-2xl">Still need help?</h2>
              <p className="mt-2 text-sm text-[#f2f7f4]/70 sm:text-base">
                Send us your question and our support team will assist you.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#c8942f] px-5 py-3 text-sm font-bold text-[#1f5a46] transition-colors hover:bg-[#d9aa46]"
            >
              Contact Us
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
