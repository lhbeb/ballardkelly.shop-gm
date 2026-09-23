import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import AboutNotifier from '@/components/AboutNotifier';
import ResellerBrandNotice from '@/components/ResellerBrandNotice';
import {
  BadgeCheck,
  Boxes,
  CheckCircle2,
  Clock,
  Heart,
  Mail,
  MapPin,
  Package,
  Phone,
  SearchCheck,
  Shield,
  Sparkles,
  Star,
  Target,
  Users,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Ballard Kelly | Collector-Run Card & Collectibles Shop',
  description:
    'Learn about Ballard Kelly, a collector-run shop founded by Ballard Kelly Scott for trading cards, Topps finds, Pokemon cards, booster boxes, comics, figures, and collectibles.',
};

export default function AboutPage() {
  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': 'https://BallardKelly.shop/about#webpage',
        url: 'https://BallardKelly.shop/about',
        name: 'About Ballard Kelly',
        description:
          'Ballard Kelly is a collector-run ecommerce shop founded by Ballard Kelly Scott for trading cards, Topps finds, Pokemon cards, booster boxes, comics, figures, and collectibles.',
        mainEntity: {
          '@id': 'https://BallardKelly.shop/#organization',
        },
      },
      {
        '@type': 'OnlineStore',
        '@id': 'https://BallardKelly.shop/#organization',
        name: 'Ballard Kelly',
        alternateName: 'BallardKelly',
        url: 'https://BallardKelly.shop',
        description:
          'Collector-run ecommerce shop for trading cards, Topps finds, Pokemon cards, booster boxes, comics, figures, and collectible goods.',
        email: 'contact@BallardKelly.shop',
        telephone: ['+1 (913) 593-7677'],
        address: {
          '@type': 'PostalAddress',
          streetAddress: '1239 N Washington Ave',
          addressLocality: 'Wichita',
          addressRegion: 'KS',
          postalCode: '67214',
          addressCountry: 'US',
        },
        founder: {
          '@type': 'Person',
          name: 'Ballard Kelly Scott',
        },
      },
    ],
  };

  const differenceCards = [
    {
      title: 'Collector Taste',
      text: 'The catalog favors cards, sealed product, comics, figures, and collectibles with real hobby interest.',
      icon: Star,
    },
    {
      title: 'Useful Details',
      text: 'Listings are written to help customers understand condition, category, and what they are buying.',
      icon: Package,
    },
    {
      title: 'Fair Value',
      text: 'Pricing is reviewed against current market signals so collectors can shop with context.',
      icon: CheckCircle2,
    },
    {
      title: 'Buyer Trust',
      text: 'We keep support reachable and order expectations clear from checkout through delivery.',
      icon: Shield,
    },
  ] as const;

  return (
    <div className="min-h-screen flex flex-col bg-[#f2f7f4]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      <AboutNotifier />

      <div className="bg-[#102820] text-[#f2f7f4] py-16">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#f1cf74]">
            Cards, boxes, comics, figures, collectibles
          </p>
          <h1 className="text-4xl font-bold leading-tight md:text-6xl">About Ballard Kelly</h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#f2f7f4]/85 md:text-xl">
            Ballard Kelly is a shop founded by Ballard Kelly Scott, an enthusiast collector with a
            soft spot for trading cards, Topps releases, Pokemon cards, sealed booster boxes,
            comics, figures, memorabilia, and the unexpected finds that make collecting fun.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl py-12">
        <div className="mb-12">
          <ResellerBrandNotice />
        </div>

        <section className="mb-12 grid gap-5 md:grid-cols-3">
          {[
            {
              icon: BadgeCheck,
              title: 'Collector Led',
              text: 'Inventory is chosen with hobby instincts, not generic marketplace filler.',
            },
            {
              icon: Boxes,
              title: 'Cards & Sealed Finds',
              text: 'Topps, Pokemon cards, booster boxes, sports cards, and card lots sit at the center.',
            },
            {
              icon: SearchCheck,
              title: 'Checked Listings',
              text: 'Photos, condition notes, and product details are reviewed before products go live.',
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-xl border border-[#1f5a46]/10 bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-[#1f5a46] text-[#f2f7f4]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h2 className="text-xl font-bold text-[#262626]">{item.title}</h2>
                <p className="mt-3 leading-7 text-gray-700">{item.text}</p>
              </div>
            );
          })}
        </section>

        <section className="mb-12 rounded-2xl border border-[#1f5a46]/10 bg-white p-8 shadow-sm">
          <div className="grid gap-8 md:grid-cols-[220px_minmax(0,1fr)] md:items-start">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#1f5a46] text-white">
                <Sparkles className="h-6 w-6" />
              </div>
              <h2 className="mt-4 text-2xl font-bold text-[#262626]">What We Sell</h2>
            </div>
            <div className="space-y-4 text-base leading-7 text-gray-700">
              <p>
                The Ballard Kelly catalog is built for collectors who like variety: trading cards,
                Topps sets and singles, Pokemon cards, sealed booster boxes, comics, figures,
                memorabilia, display pieces, and limited-run hobby finds.
              </p>
              <p>
                Some items are modern. Some are nostalgic. Some are practical collection builders,
                and some are the kind of oddball listing that only makes sense when you love the
                hunt.
              </p>
              <Link href="/search" className="inline-flex font-semibold text-[#1f5a46] hover:text-[#102820] hover:underline">
                Browse the current catalog
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-12 rounded-2xl bg-[#1f5a46] p-8 text-[#f2f7f4] shadow-sm md:p-10">
          <div className="mx-auto max-w-3xl text-center">
            <Target className="mx-auto mb-5 h-10 w-10 text-[#f1cf74]" />
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <p className="mt-5 text-lg leading-8 text-[#f2f7f4]/85">
              To make collecting feel personal again by offering cards and collectibles that are
              clearly presented, fairly priced, and selected by someone who understands why a
              box, card, issue, or figure can matter to a collector.
            </p>
          </div>
        </section>

        <section className="mb-12 rounded-2xl border border-[#1f5a46]/10 bg-white p-8 shadow-sm">
          <div className="mb-8 flex items-center gap-4">
            <div className="rounded-xl bg-[#f1cf74] p-3 text-[#1f5a46]">
              <Heart className="h-7 w-7" />
            </div>
            <h2 className="text-3xl font-bold text-[#262626]">What Makes Ballard Kelly Different</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {differenceCards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className="rounded-xl border border-[#1f5a46]/10 bg-[#f2f7f4] p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <Icon className="h-6 w-6 text-[#1f5a46]" />
                    <h3 className="text-xl font-bold text-[#262626]">{card.title}</h3>
                  </div>
                  <p className="leading-7 text-gray-700">{card.text}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mb-12 rounded-2xl border border-[#1f5a46]/10 bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center gap-4">
            <div className="rounded-xl bg-[#1f5a46]/10 p-3 text-[#1f5a46]">
              <Users className="h-7 w-7" />
            </div>
            <h2 className="text-3xl font-bold text-[#262626]">How We Source</h2>
          </div>
          <div className="space-y-4 leading-7 text-gray-700">
            <p>
              Ballard Kelly sources through a mix of collector networks, verified resale channels,
              private sellers, wholesalers, auctions, liquidation opportunities, and supplier
              relationships where they apply.
            </p>
            <p>
              That mix lets the shop carry new arrivals, sealed product, collection builders, and
              unexpected collectible pieces without pretending every listing came from the same
              shelf.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-[#1f5a46]/10 bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center gap-4">
            <div className="rounded-xl bg-[#1f5a46]/10 p-3 text-[#1f5a46]">
              <Phone className="h-7 w-7" />
            </div>
            <h2 className="text-2xl font-bold text-[#262626]">Contact Information</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-xl border border-[#1f5a46]/10 bg-[#f2f7f4] p-6">
              <div className="mb-3 flex items-center gap-3">
                <MapPin className="h-5 w-5 text-[#1f5a46]" />
                <div className="font-medium text-[#262626]">Address</div>
              </div>
              <div className="ml-8 text-gray-600">1239 N Washington Ave, Wichita, KS 67214, USA</div>
            </div>
            <div className="rounded-xl border border-[#1f5a46]/10 bg-[#f2f7f4] p-6">
              <div className="mb-3 flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#1f5a46]" />
                <div className="font-medium text-[#262626]">Phone</div>
              </div>
              <a href="tel:+1 (913) 593-7677" className="ml-8 text-gray-600 hover:text-[#1f5a46]">
                +1 (913) 593-7677
              </a>
            </div>
            <div className="rounded-xl border border-[#1f5a46]/10 bg-[#f2f7f4] p-6">
              <div className="mb-3 flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#1f5a46]" />
                <div className="font-medium text-[#262626]">Email</div>
              </div>
              <div className="ml-8 text-gray-600">contact@BallardKelly.shop</div>
            </div>
            <div className="rounded-xl border border-[#1f5a46]/10 bg-[#f2f7f4] p-6">
              <div className="mb-3 flex items-center gap-3">
                <Clock className="h-5 w-5 text-[#1f5a46]" />
                <div className="font-medium text-[#262626]">Business Hours</div>
              </div>
              <div className="ml-8 space-y-1 text-gray-600">
                <div>Monday to Friday, 9:00 AM to 5:00 PM CT</div>
                <div>Saturday, 10:00 AM to 3:00 PM CT</div>
                <div>Sunday, Closed</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
