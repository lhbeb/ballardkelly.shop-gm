import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Warranty & Replacement Policy | BallardKelly',
  description: 'Warranty and replacement policies for BallardKelly products.',
};

export default function WarrantyReplacementPage() {
  return (
    <main className="min-h-screen bg-[#F5F7FB] py-12 sm:py-16">
      <div className="container mx-auto max-w-4xl px-4">
        
        {/* Header Section */}
        <section className="mb-10 rounded-2xl bg-[#1f5a46] px-6 py-8 text-[#f2f7f4] sm:px-8 sm:py-10 shadow-lg">
          <h1 className="max-w-3xl text-3xl font-bold leading-tight sm:text-5xl">
            Warranty & Replacement Policy
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-[#f2f7f4]/80 sm:text-lg">
            Review our warranty coverage and replacement product policy to understand your rights as a consumer.
          </p>
        </section>

        {/* Content Sections */}
        <div className="space-y-8">
          
          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-[#262626] mb-4">Replacement Product Policy</h2>
            <p className="text-gray-600 leading-relaxed">
              If the consumer is entitled to a replacement product, BallardKelly must provide a product that is identical or of similar value. If this product is not available, BallardKelly can choose to either provide a refund or repair the product within a reasonable time. Refund and repair rights apply to the replacement product in the same way as the original product.
            </p>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-[#262626] mb-4">Warranty</h2>
            <p className="text-gray-600 leading-relaxed">
              Warranty coverage varies by product, source, condition, and manufacturer policy. If a product includes a specific BallardKelly, seller, or manufacturer warranty, the available warranty details will be stated on the product page or order communication. This page does not create a blanket warranty for every item in the catalog.
            </p>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-[#262626] mb-4">Customer Support</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Our customer support team is available during published business hours. You can contact us by email, phone, or the contact form, and we will respond as soon as possible.
            </p>
            <p className="text-gray-600 leading-relaxed">
              At BallardKelly, we aim to provide clear product details, transparent condition information, and a consistent support process for the lawn, outdoor power, backyard, and property-care equipment in our catalog.
            </p>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-[#262626] mb-4">Questions and Contact Information</h2>
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
                <a href="mailto:contact@BallardKelly.shop" className="text-[#1f5a46] hover:underline">
                  contact@BallardKelly.shop
                </a>
              </p>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
