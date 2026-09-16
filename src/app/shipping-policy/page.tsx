import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Shipping & Delivery | BallardKellyScott',
  description: 'BallardKellyScott Shipping & Delivery Policy. Free standard shipping across the United States with 1 business day processing and 1-3 business days in transit.',
};

export default function ShippingPolicyPage() {
  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://BallardKellyScott.shop/shipping-policy',
        'url': 'https://BallardKellyScott.shop/shipping-policy',
        'name': 'Shipping & Delivery | BallardKellyScott',
        'description':
          'BallardKellyScott Shipping & Delivery Policy: Free standard shipping across the United States with 1 business day processing and 1-3 business days in transit.',
      },
      {
        '@type': 'OfferShippingDetails',
        '@id': 'https://BallardKellyScott.shop/shipping-policy#shipping-us',
        'shippingDestination': {
          '@type': 'DefinedRegion',
          'addressCountry': 'US',
        },
        'shippingRate': {
          '@type': 'MonetaryAmount',
          'value': 0,
          'currency': 'USD',
        },
        'deliveryTime': {
          '@type': 'ShippingDeliveryTime',
          'handlingTime': {
            '@type': 'QuantitativeValue',
            'minValue': 1,
            'maxValue': 1,
            'unitCode': 'DAY',
          },
          'transitTime': {
            '@type': 'QuantitativeValue',
            'minValue': 1,
            'maxValue': 3,
            'unitCode': 'DAY',
          },
          'cutoffTime': '14:00:00-05:00',
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#F5F7FB] py-12 sm:py-16">
      {/* Schema.org OfferShippingDetails Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      <div className="container mx-auto max-w-4xl px-4">
        
        {/* Header Section */}
        <section className="mb-10 rounded-2xl bg-[#1f5a46] px-6 py-8 text-[#f2f7f4] sm:px-8 sm:py-10 shadow-lg">
          <h1 className="max-w-3xl text-3xl font-bold leading-tight sm:text-5xl">
            Shipping & Delivery
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-[#f2f7f4]/80 sm:text-lg">
            Review our shipping and delivery details, tracking information, and fulfillment policies.
          </p>
        </section>

        {/* Content Sections */}
        <div className="space-y-8">
          
          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-[#262626] mb-4">Where do we deliver?</h2>
            <p className="text-gray-600 leading-relaxed">
              We ship across the United States.
            </p>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-[#262626] mb-4">Shipping Cost</h2>
            <p className="text-gray-600 leading-relaxed">
              Enjoy <strong>Free Standard Shipping</strong> on all orders.
            </p>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-[#262626] mb-4">Delivery Details</h2>
            <ul className="list-disc pl-6 space-y-3 text-gray-600 leading-relaxed">
              <li><strong>Handling Time:</strong> 1 business day (Mon–Fri)</li>
              <li><strong>Transit Time:</strong> 1–3 business days (Mon–Fri)</li>
              <li><strong>Order Cut-off Time:</strong> 02:00 PM Central Time</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-[#262626] mb-4">Multiple Addresses</h2>
            <p className="text-gray-600 leading-relaxed">
              We do not support multiple shipping addresses in a single order. For multiple destinations, please place separate orders.
            </p>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-[#262626] mb-4">Order Status & Tracking</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Once shipped, you’ll receive an email with a tracking number. Please allow up to 48 hours for tracking updates.
            </p>
            <p className="text-gray-600 leading-relaxed">
              If your order hasn’t arrived within 20 days, email us at <a href="mailto:contact@BallardKellyScott.shop" className="text-[#1f5a46] hover:underline font-medium">contact@BallardKellyScott.shop</a> with your name and order number.
            </p>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-[#262626] mb-4">Returns & Exchanges</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              We accept eligible returns within 30 calendar days of delivery when the item is unused, in the condition received, and returned with original packaging where possible.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              If your item arrives damaged, email us with your order number and a photo. We’ll do our best to resolve it.
            </p>
            <p className="text-gray-600 leading-relaxed">
              For full details, visit our <Link href="/return-policy" className="text-[#1f5a46] hover:underline font-medium">Return Policy</Link>.
            </p>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-[#262626] mb-4">Customer Support</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Our support team is available during published business hours and will respond as soon as possible.
            </p>
            <div className="space-y-4 text-gray-600">
              <p>
                <strong>📍 Address:</strong>{' '}
                <a href="https://maps.google.com/?q=1239+N+Washington+Ave,+Wichita,+KS+67214,+USA" target="_blank" rel="noopener noreferrer" className="text-[#1f5a46] hover:underline">
                  1239 N Washington Ave, Wichita, KS 67214, USA
                </a>
              </p>
              <p>
                <strong>✆ Phone:</strong> +1 (913) 593-7677
              </p>
              <p>
                <strong>✉ Email:</strong>{' '}
                <a href="mailto:contact@BallardKellyScott.shop" className="text-[#1f5a46] hover:underline">
                  contact@BallardKellyScott.shop
                </a>
              </p>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
