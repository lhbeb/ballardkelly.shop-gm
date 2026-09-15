import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import AboutNotifier from '@/components/AboutNotifier';
import ResellerBrandNotice from '@/components/ResellerBrandNotice';
import {
  Users,
  Shield,
  Heart,
  Zap,
  CheckCircle2,
  Award,
  Target,
  Sparkles,
  Package,
  Eye,
  DollarSign,
  Leaf,
  Headphones,
  MapPin,
  Phone,
  Mail,
  Clock,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Cokaro',
  description:
    'Learn about Cokaro, a US-based seller and reseller of lawn mowers, pressure washers, chainsaws, blowers, trimmers, and outdoor power equipment for home, backyard, acreage, and farm care.',
};

export default function AboutPage() {
  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': 'https://cokaro.com/about#webpage',
        'url': 'https://cokaro.com/about',
        'name': 'About Cokaro',
        'description':
          'Cokaro is an ecommerce seller and reseller serving customers across the United States with outdoor power equipment for home, backyard, acreage, and farm care.',
        'mainEntity': {
          '@id': 'https://cokaro.com/#organization',
        },
      },
      {
        '@type': 'OnlineStore',
        '@id': 'https://cokaro.com/#organization',
        'name': 'Cokaro',
        'url': 'https://cokaro.com',
        'description':
          'Ecommerce seller and reseller serving the United States with lawn mowers, pressure washers, chainsaws, blowers, trimmers, and outdoor power equipment.',
        'email': 'contact@cokaro.com',
        'telephone': ['+19129231747'],
        'address': {
          '@type': 'PostalAddress',
            'streetAddress': '1239 N Washington Ave',
            'addressLocality': 'Wichita',
            'addressRegion': 'KS',
            'postalCode': '67214',
            'addressCountry': 'US',
        },
        'contactPoint': [
          {
            '@type': 'ContactPoint',
            'telephone': '+19129231747',
            'contactType': 'customer service',
            'areaServed': 'US',
            'availableLanguage': ['en'],
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F0F6FF]">
      {/* Schema.org AboutPage & OnlineStore Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      <AboutNotifier />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0a3075] to-[#0a3075] text-[#F0F6FF] py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-5xl font-bold mb-6">About Cokaro</h1>
          <p className="text-xl text-[#F0F6FF]/85 leading-relaxed max-w-3xl mx-auto">
            Welcome to Cokaro, a US-based seller and reseller of outdoor power equipment for the places you maintain every week: your home, backyard, acreage, workshop, and farm. We help customers find reliable lawn mowers, pressure washers, chainsaws, blowers, trimmers, and related equipment at fair and transparent prices.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl py-12">
        <div className="mb-12">
          <ResellerBrandNotice />
        </div>

        {/* US Presence */}
        <section className="mb-12 border-y border-[#0a3075]/15 py-9">
          <div className="grid gap-8 md:grid-cols-[220px_minmax(0,1fr)] md:items-start">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#0a3075] text-white">
                <MapPin className="h-6 w-6" />
              </div>
              <h2 className="mt-4 text-2xl font-bold text-[#262626]">Proudly US-based</h2>
            </div>
            <div className="space-y-4 text-base leading-7 text-gray-700">
              <p>
                Cokaro operates out of Wichita, Kansas, serving customers across the United States. Our central warehouse and fulfillment operations are designed to get your order to you fast.
              </p>
              <p>
                Eligible products can be collected locally from our Delaware location. Our team confirms the available pickup address and collection time for each order before you travel.
              </p>
              <Link href="/local-pickup" className="inline-flex font-semibold text-[#0a3075] hover:text-[#0a0f32] hover:underline">
                View the local pickup guide
              </Link>
            </div>
          </div>
        </section>

        {/* How We Source Responsibly */}
        <div className="bg-white rounded-2xl shadow-lg border border-[#0a3075]/10 p-8 mb-12">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-[#262626]">How We Source Responsibly</h2>
          </div>
          <p className="text-gray-700 mb-8 text-lg">
            Our business model is based on legitimate resale, authorized reseller or supplier relationships only where they apply, smart sourcing, and efficient fulfillment. We purchase differently from traditional stores, then inspect, verify, and present each product clearly before it is offered for sale.
          </p>

          <div className="space-y-6">
            <div className="bg-[#F0F6FF] rounded-xl p-6 border border-[#0a3075]/10 border-l-4 border-l-[#0a3075]">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-[#0a3075] text-[#F0F6FF] rounded-full flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#262626] mb-2">We source equipment through auctions and verified resale channels</h3>
                  <p className="text-gray-700">
                    Our sourcing team participates in high volume auctions and resale channels across multiple platforms. By buying carefully and in bulk, we secure lower costs on equipment for homes, backyards, acreage, and farm work.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#F0F6FF] rounded-xl p-6 border border-[#0a3075]/10 border-l-4 border-l-[#0a3075]">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-[#0a3075] text-[#F0F6FF] rounded-full flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#262626] mb-2">We negotiate with sellers and suppliers</h3>
                  <p className="text-gray-700">
                    Our team works with approved private sellers, marketplace partners, wholesalers, liquidators, and supplier channels. That mix helps us carry a practical range of lawn mowers, pressure washers, chainsaws, blowers, trimmers, and other outdoor power equipment.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#F0F6FF] rounded-xl p-6 border border-[#0a3075]/10 border-l-4 border-l-[#0a3075]">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-[#0a3075] text-[#F0F6FF] rounded-full flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#262626] mb-2">We partner with the return and liquidation departments of major retailers</h3>
                  <p className="text-gray-700 mb-2">
                    When possible, we obtain bulk lots from retailer and supplier programs. These lots may include overstock, open box items, shelf pulls, refurbished pieces, and customer returns.
                  </p>
                  <p className="text-gray-700">
                    Every product is carefully inspected, tested, cleaned, or refurbished before being listed.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#F0F6FF] rounded-xl p-6 border border-[#0a3075]/10 border-l-4 border-l-[#0a3075]">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-[#0a3075] text-[#F0F6FF] rounded-full flex items-center justify-center font-bold text-lg">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#262626] mb-2">We hunt for deals locally</h3>
                  <p className="text-gray-700">
                    Our team regularly visits community auctions, garage sales, estate sales, local wholesalers, and liquidation centers. This allows us to discover unique finds and high value items that are often unavailable in traditional stores.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#F0F6FF] rounded-xl p-6 border border-[#0a3075]/10 border-l-4 border-l-[#0a3075]">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-[#0a3075] text-[#F0F6FF] rounded-full flex items-center justify-center font-bold text-lg">
                  5
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#262626] mb-2">Fair pricing keeps our store competitive</h3>
                  <p className="text-gray-700">
                    Instead of adding heavy markups, we focus on fair margins and fast turnover. This approach keeps our prices consistent, honest, and genuinely competitive.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Private Sellers Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-[#0a3075]/10 p-8 mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-[#0a3075]/10 rounded-xl">
              <Users className="h-8 w-8 text-[#0a3075]" />
            </div>
            <h2 className="text-3xl font-bold text-[#262626]">A New Addition to Our Model: Approved Private Sellers</h2>
          </div>
          <p className="text-gray-700 mb-4 text-lg">
            Over the past three years, we have expanded our sourcing model by partnering with a network of private sellers who share the same dedication to quality and fairness as our in-house team.
          </p>
          <p className="text-gray-700 mb-6">
            These private sellers find, source, and curate their own products, then ship their items to our warehouse. Once the items arrive, our inspection team performs a full evaluation, which includes:
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-[#F0F6FF] rounded-lg p-4 border border-[#0a3075]/10">
              <CheckCircle2 className="h-6 w-6 text-[#0a3075] mb-2" />
              <p className="text-gray-700 font-medium">checking condition and listing accuracy</p>
            </div>
            <div className="bg-[#F0F6FF] rounded-lg p-4 border border-[#0a3075]/10">
              <Zap className="h-6 w-6 text-[#0a3075] mb-2" />
              <p className="text-gray-700 font-medium">testing function where applicable</p>
            </div>
            <div className="bg-[#F0F6FF] rounded-lg p-4 border border-[#0a3075]/10">
              <DollarSign className="h-6 w-6 text-[#0a3075] mb-2" />
              <p className="text-gray-700 font-medium">reviewing price against current market data</p>
            </div>
          </div>

          <p className="text-gray-700 mb-6 bg-[#F0F6FF] rounded-lg p-4 border border-[#0a3075]/10">
            Only after the inspection is complete does the item become available for purchase.
          </p>

          <div className="bg-[#F0F6FF] rounded-lg p-6 border border-[#0a3075]/10">
            <h3 className="text-xl font-bold text-[#262626] mb-3 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#0a3075]" />
              How it works for customers
            </h3>
            <p className="text-gray-700 mb-3">
              When you purchase from a private seller on our platform, it is clearly stated on the product page. The seller sends the item to us first, we inspect it, and only then do we ship it to you.
            </p>
            <p className="text-gray-700 mb-3">
              This process protects buyers and helps each product, whether sold by us or by an approved partner, meet the same listing and fulfillment standards.
            </p>
            <p className="text-gray-700">
              Private sellers benefit by earning their own fair profits, while customers benefit from greater variety and consistent quality control.
            </p>
          </div>
        </div>

        {/* Our Mission */}
        <div className="bg-gradient-to-r from-[#0a3075] to-[#0a3075] rounded-2xl shadow-lg p-10 mb-12 text-[#F0F6FF] text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#f5970c]/15 rounded-full mb-6">
            <Target className="h-8 w-8" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-xl text-[#F0F6FF]/85 mb-4">
            To give homeowners, property owners, contractors, and farm operators access to quality outdoor and power equipment at honest prices.
          </p>
          <p className="text-lg text-[#F0F6FF]/85">
            Whether you need a ride mower, walk-behind mower, pressure washer, chainsaw, leaf blower, trimmer, or other equipment for your land and buildings, you should not have to pay more than necessary.
          </p>
        </div>

        {/* What Makes Us Different */}
        <div className="bg-white rounded-2xl shadow-lg border border-[#0a3075]/10 p-8 mb-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-[#f5970c] rounded-xl">
              <Sparkles className="h-8 w-8 text-[#0a3075]" />
            </div>
            <h2 className="text-3xl font-bold text-[#262626]">What Makes Us Different</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#F0F6FF] rounded-xl p-6 border border-[#0a3075]/10">
              <div className="flex items-center gap-3 mb-3">
                <Package className="h-6 w-6 text-[#0a3075]" />
                <h3 className="text-xl font-bold text-[#262626]">Curated Inventory</h3>
              </div>
              <p className="text-gray-700">Every product is carefully inspected and verified before it is shipped to the customer.</p>
            </div>

            <div className="bg-[#F0F6FF] rounded-xl p-6 border border-[#0a3075]/10">
              <div className="flex items-center gap-3 mb-3">
                <Eye className="h-6 w-6 text-[#0a3075]" />
                <h3 className="text-xl font-bold text-[#262626]">Transparent Product Details</h3>
              </div>
              <p className="text-gray-700">We clearly list whether an item is new, open box, refurbished, or pre owned. Customers always know what they are buying.</p>
            </div>

            <div className="bg-[#F0F6FF] rounded-xl p-6 border border-[#0a3075]/10">
              <div className="flex items-center gap-3 mb-3">
                <DollarSign className="h-6 w-6 text-[#0a3075]" />
                <h3 className="text-xl font-bold text-[#262626]">Real Value</h3>
              </div>
              <p className="text-gray-700">We compare listings against current market pricing so customers can judge the value clearly before they buy.</p>
            </div>

            <div className="bg-[#F0F6FF] rounded-xl p-6 border border-[#0a3075]/10">
              <div className="flex items-center gap-3 mb-3">
                <Headphones className="h-6 w-6 text-[#0a3075]" />
                <h3 className="text-xl font-bold text-[#262626]">Customer Focus</h3>
              </div>
              <p className="text-gray-700">We offer free standard shipping within the United States, with 1 business day processing, 1-3 business days in transit, a 30 day return policy, and reliable human support.</p>
            </div>

            <div className="bg-[#F0F6FF] rounded-xl p-6 border border-[#0a3075]/10 md:col-span-2">
              <div className="flex items-center gap-3 mb-3">
                <Leaf className="h-6 w-6 text-[#0a3075]" />
                <h3 className="text-xl font-bold text-[#262626]">Sustainable Shopping</h3>
              </div>
              <p className="text-gray-700">By reselling returns, overstock, and refurbished goods, you help reduce waste and support a more sustainable buying cycle.</p>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="bg-white rounded-2xl shadow-lg border border-[#0a3075]/10 p-8 mb-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-[#f5970c] rounded-xl">
              <Heart className="h-8 w-8 text-[#0a3075]" />
            </div>
            <h2 className="text-3xl font-bold text-[#262626]">Our Values</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#F0F6FF] rounded-xl p-6 text-center border border-[#0a3075]/10">
              <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-[#f5970c]">
                <Shield className="h-8 w-8 text-[#0a3075]" />
              </div>
              <h3 className="font-bold text-[#262626] text-lg">Integrity</h3>
            </div>
            <div className="bg-[#F0F6FF] rounded-xl p-6 text-center border border-[#0a3075]/10">
              <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-[#f5970c]">
                <Award className="h-8 w-8 text-[#0a3075]" />
              </div>
              <h3 className="font-bold text-[#262626] text-lg">Quality</h3>
            </div>
            <div className="bg-[#F0F6FF] rounded-xl p-6 text-center border border-[#0a3075]/10">
              <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-[#f5970c]">
                <Users className="h-8 w-8 text-[#0a3075]" />
              </div>
              <h3 className="font-bold text-[#262626] text-lg">Customer Trust</h3>
            </div>
            <div className="bg-[#F0F6FF] rounded-xl p-6 text-center border border-[#0a3075]/10">
              <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-[#f5970c]">
                <Zap className="h-8 w-8 text-[#0a3075]" />
              </div>
              <h3 className="font-bold text-[#262626] text-lg">Innovation and continuous improvement</h3>
            </div>
          </div>
        </div>

        {/* Customer Expectations */}
        <div className="bg-gradient-to-r from-[#0a3075] to-[#0a3075] rounded-2xl shadow-lg p-10 mb-12 text-[#F0F6FF]">
          <h3 className="text-3xl font-bold mb-8 text-center">What Customers Can Expect</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-[#F0F6FF]/10 backdrop-blur-sm rounded-xl border border-[#F0F6FF]/20">
              <div className="text-4xl font-bold mb-2">US</div>
              <div className="text-[#F0F6FF]/80 text-sm">dispatch support</div>
            </div>
            <div className="text-center p-6 bg-[#F0F6FF]/10 backdrop-blur-sm rounded-xl border border-[#F0F6FF]/20">
              <div className="text-4xl font-bold mb-2">Curated</div>
              <div className="text-[#F0F6FF]/80 text-sm">equipment selection</div>
            </div>
            <div className="text-center p-6 bg-[#F0F6FF]/10 backdrop-blur-sm rounded-xl border border-[#F0F6FF]/20">
              <div className="text-4xl font-bold mb-2">30-day</div>
              <div className="text-[#F0F6FF]/80 text-sm">return window</div>
            </div>
            <div className="text-center p-6 bg-[#F0F6FF]/10 backdrop-blur-sm rounded-xl border border-[#F0F6FF]/20">
              <div className="text-4xl font-bold mb-2">Human</div>
              <div className="text-[#F0F6FF]/80 text-sm">customer support</div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-2xl shadow-lg border border-[#0a3075]/10 p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-[#0a3075]/10 rounded-xl">
              <Phone className="h-8 w-8 text-[#0a3075]" />
            </div>
            <h3 className="text-2xl font-bold text-[#262626]">Contact Information</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-[#F0F6FF] rounded-xl p-6 border border-[#0a3075]/10">
              <div className="flex items-center gap-3 mb-3">
                <MapPin className="h-5 w-5 text-[#0a3075]" />
                <div className="font-medium text-[#262626]">Address</div>
              </div>
              <div className="text-gray-600 ml-8">1239 N Washington Ave, Wichita, KS 67214, USA</div>
            </div>
            <div className="bg-[#F0F6FF] rounded-xl p-6 border border-[#0a3075]/10">
              <div className="flex items-center gap-3 mb-3">
                <Phone className="h-5 w-5 text-[#0a3075]" />
                <div className="font-medium text-[#262626]">Phone</div>
              </div>
              <div className="ml-8 space-y-3 text-gray-600">
                <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-1">
                  <a href="tel:+19129231747" className="whitespace-nowrap hover:text-[#0a3075] transition-colors">
                    +19129231747
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-[#F0F6FF] rounded-xl p-6 border border-[#0a3075]/10">
              <div className="flex items-center gap-3 mb-3">
                <Mail className="h-5 w-5 text-[#0a3075]" />
                <div className="font-medium text-[#262626]">Email:</div>
              </div>
              <div className="text-gray-600 ml-8">contact@cokaro.com</div>
            </div>
            <div className="bg-[#F0F6FF] rounded-xl p-6 border border-[#0a3075]/10">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="h-5 w-5 text-[#0a3075]" />
                <div className="font-medium text-[#262626]">Business Hours:</div>
              </div>
              <div className="text-gray-600 ml-8 space-y-1">
                <div>Monday to Friday, 9:00 AM to 5:00 PM EST</div>
                <div>Saturday, 10:00 AM to 3:00 PM EST</div>
                <div>Sunday, Closed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
