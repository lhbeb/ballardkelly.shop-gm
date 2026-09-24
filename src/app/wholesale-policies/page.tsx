import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Wholesale Policies | BallardKelly',
  description: 'Wholesale policies, eligibility, pricing, and terms for BallardKelly resellers.',
};

export default function WholesalePoliciesPage() {
  return (
    <main className="min-h-screen bg-[#F5F7FB] py-12 sm:py-16">
      <div className="container mx-auto max-w-4xl px-4">
        
        {/* Header Section */}
        <section className="mb-10 rounded-2xl bg-[#1f5a46] px-6 py-8 text-[#f2f7f4] sm:px-8 sm:py-10 shadow-lg">
          <h1 className="max-w-3xl text-3xl font-bold leading-tight sm:text-5xl">
            Wholesale Policies
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-[#f2f7f4]/80 sm:text-lg">
            Review our wholesale policies, eligibility requirements, and terms for purchasing items in bulk.
          </p>
        </section>

        {/* Content Sections */}
        <div className="space-y-8">
          
          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-[#262626] mb-4">Eligibility for Wholesale Account</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              You (“the retailer”) must have a physical shop, with or without an online website, OR be an online only seller with an established following to be eligible for a wholesale account and remain a reseller of our goods. Selling on third-party websites (Etsy, eBay, Amazon) and purchasing items for personal use is strictly prohibited.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              ALL buyers are reviewed and vetted to ensure fit and to confirm that your shop is a legitimate business. BallardKelly reserves the right to deny applications that may not be appropriate due to fit or decline orders for any reason after approval.
            </p>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-[#262626] mb-4">Invoice</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              BallardKelly is happy to offer an invoice for payment (in USD). Please{' '}
              <a href="mailto:contact@BallardKelly.shop" className="text-[#1f5a46] hover:underline font-medium">contact us</a>
              {' '}to place your order.
            </p>
            <p className="text-gray-600 leading-relaxed font-semibold">
              By making wholesale purchases from BallardKelly, retailers agree to these policies.
            </p>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-[#262626] mb-4">Pricing</h2>
            <p className="text-gray-600 leading-relaxed">
              All pricing shown on our site is in US dollars. Prices are only available to qualified retailers who plan to resell the items on their website or in-store. Promotional or volume orders do not qualify for wholesale pricing but would qualify for a discount. Please inquire.
            </p>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-[#262626] mb-4">Additional Discounts</h2>
            <p className="text-gray-600 leading-relaxed">
              Since retailers receive a very significant discount, wholesale pricing does not qualify for additional discounts unless offered during a promotion or high-volume orders are placed, and pricing is mutually agreed upon under contract. Orders that have additional discount codes applied at checkout will be canceled.
            </p>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-[#262626] mb-4">Payment Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              All orders must be paid upfront prior to shipment.
            </p>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-[#262626] mb-4">Shipping</h2>
            <p className="text-gray-600 leading-relaxed">
              We ship all items from our warehouse in Texas, United States. All import duties are the responsibility of the retailer and are not included in the shipping costs.
            </p>
            
            <h3 className="text-lg font-bold text-[#262626] mt-6 mb-2">FREE SHIPPING</h3>
            <p className="text-gray-600 leading-relaxed">
              Qualify for free shipping on all products purchased on our website.
            </p>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-[#262626] mb-4">Fulfillment</h2>
            <p className="text-gray-600 leading-relaxed">
              Once payment has been received, orders take between 0-1 business days to fulfill unless otherwise notified.
            </p>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-[#262626] mb-4">Selling in Bulk to B2B Accounts</h2>
            <p className="text-gray-600 leading-relaxed">
              We accept bulk selling to B2B accounts or other wholesalers.
            </p>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-[#262626] mb-4">Return Protocol</h2>
            <p className="text-gray-600 leading-relaxed">
              If you have ordered through BallardKelly, please follow our return protocol and{' '}
              <a href="mailto:contact@BallardKelly.shop" className="text-[#1f5a46] hover:underline font-medium">contact us</a>
              {' '}for the next steps.
            </p>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-[#262626] mb-4">Damaged Items</h2>
            <p className="text-gray-600 leading-relaxed">
              All items are quality checked before they are shipped. Please inspect all shipments immediately upon arrival and{' '}
              <a href="mailto:contact@BallardKelly.shop" className="text-[#1f5a46] hover:underline font-medium">contact us</a>
              {' '}within 5 days of receiving the order to discuss any potential issues.
            </p>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-[#262626] mb-4">Customer Support</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We are always here to help. If you have any questions or need assistance, feel free to reach out:
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
