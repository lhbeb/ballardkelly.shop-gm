import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Billing Policy | BallardKelly',
  description: 'Billing policy and order limitations for BallardKelly.',
};

export default function BillingPolicyPage() {
  return (
    <main className="min-h-screen bg-[#F5F7FB] py-12 sm:py-16">
      <div className="container mx-auto max-w-4xl px-4">
        
        {/* Header Section */}
        <section className="mb-10 rounded-2xl bg-[#1f5a46] px-6 py-8 text-[#f2f7f4] sm:px-8 sm:py-10 shadow-lg">
          <h1 className="max-w-3xl text-3xl font-bold leading-tight sm:text-5xl">
            Billing Policy
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-[#f2f7f4]/80 sm:text-lg">
            Information regarding our order limitations and cancellation policies.
          </p>
        </section>

        {/* Content Sections */}
        <div className="space-y-8">
          
          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-[#262626] mb-4">Order Refusals and Limitations</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              We reserve the right to refuse any order you place with us. At our sole discretion, we may limit or cancel quantities purchased per person, per household, or per order. These restrictions may apply to orders associated with the same customer account, the same credit card, and/or orders using the same billing and/or shipping address.
            </p>
            <p className="text-gray-600 leading-relaxed">
              If we make a change to or cancel an order, we may attempt to notify you via the e-mail address provided at the time the order was made.
            </p>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-[#262626] mb-4">Contact Information</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              If you have any questions about this policy, please reach out to us:
            </p>
            <div className="space-y-4 text-gray-600">
              <p>
                <strong>📍 Address:</strong>{' '}
                <a href="https://maps.google.com/?q=823+Center+Ave+N,+Curtis,+NE+69025,+United+States" target="_blank" rel="noopener noreferrer" className="text-[#1f5a46] hover:underline">
                  823 Center Ave N, Curtis, NE 69025, United States
                </a>
              </p>
              <p>
                <strong>✆ Phone:</strong> +1 (308) 260-1935
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
