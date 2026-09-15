import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Billing Terms and Conditions | Cokaro',
  description: 'Billing terms, conditions, and payment security information for Cokaro.',
};

export default function BillingTermsPage() {
  return (
    <main className="min-h-screen bg-[#F5F7FB] py-12 sm:py-16">
      <div className="container mx-auto max-w-4xl px-4">
        
        {/* Header Section */}
        <section className="mb-10 rounded-2xl bg-[#0a3075] px-6 py-8 text-[#F0F6FF] sm:px-8 sm:py-10 shadow-lg">
          <h1 className="max-w-3xl text-3xl font-bold leading-tight sm:text-5xl">
            Billing Terms and Conditions
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-[#F0F6FF]/80 sm:text-lg">
            Information regarding our payment terms, PCI compliance, and how we protect your payment information.
          </p>
        </section>

        {/* Content Sections */}
        <div className="space-y-8">
          
          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-[#262626] mb-4">Secure Sockets Layer (128 Bit SSL Security)</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Cokaro.com uses Secure Sockets Layer (SSL) technology to help protect information submitted during online transactions. Payment details are processed by third-party payment providers, and we do not intentionally collect or store full card numbers on our own servers.
            </p>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-[#262626] mb-4">PCI Compliant</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              The Payment Card Industry Data Security Standard (PCI DSS) is an information security standard for organizations that handle payment card data. Cokaro uses third-party payment providers for checkout so card details are handled through payment systems built for secure processing.
            </p>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-[#262626] mb-4">Payment Terms and Conditions</h2>
            <ul className="list-disc pl-6 space-y-3 text-gray-600 leading-relaxed">
              <li>Available payment methods are shown during checkout and may include credit card, debit card, PayPal, Apple Pay, Google Pay, or other supported payment options depending on the product and checkout provider.</li>
              <li>All prices and figures are listed in USD.</li>
              <li>
                Free standard shipping is currently offered for US orders unless a product page or checkout page clearly states otherwise. Please read our{' '}
                <Link href="/shipping-policy" className="text-[#0a3075] hover:underline font-medium">
                  Shipping Policy
                </Link>{' '}
                for more information.
              </li>
              <li>We do not collect or store any payment information provided by customers.</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-[#262626] mb-4">Is Cokaro.com PCI Compliant?</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Cokaro uses payment providers and checkout services that are responsible for secure payment processing and PCI-controlled card handling.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              We are committed to keeping checkout secure by using SSL on our website and routing payment details through third-party payment systems rather than storing full card numbers ourselves.
            </p>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-[#262626] mb-4">Your Payment Information</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Full card numbers are not stored by Cokaro. After an order is placed, we may have access to order details, billing details, shipping details, payment status, and limited payment references supplied by the payment provider.
            </p>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-[#262626] mb-4">Privacy Policy</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Cokaro.com values your privacy as much as you do! We do not rent, sell, or share your personal information with anyone. Our{' '}
              <Link href="/privacy-policy" className="text-[#0a3075] hover:underline font-medium">
                Privacy Policy
              </Link>{' '}
              details how your personal information is collected and used.
            </p>
            <p className="text-gray-600 font-semibold mt-6 text-lg">
              Thank you for shopping with confidence!
            </p>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-[#262626] mb-4">Contact Information</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                <strong>📍 Address:</strong>{' '}
                <a href="https://maps.google.com/?q=1239+N+Washington+Ave,+Wichita,+KS+67214,+USA" target="_blank" rel="noopener noreferrer" className="text-[#0a3075] hover:underline">
                  1239 N Washington Ave, Wichita, KS 67214, USA
                </a>
              </p>
              <p>
                <strong>✆ Phone:</strong> +1 (913) 593-7677
              </p>
              <p>
                <strong>✉ Email:</strong>{' '}
                <a href="mailto:contact@cokaro.com" className="text-[#0a3075] hover:underline">
                  contact@cokaro.com
                </a>
              </p>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
