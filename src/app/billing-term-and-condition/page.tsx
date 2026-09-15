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
              Cokaro.com uses Secure Sockets Layer (SSL) technology to provide you with the safest, most secure shopping experience possible. SSL technology enables encryption (scrambling) of sensitive information, including passwords and MasterCard numbers, during your online transactions. All of the forms on our site are secured with SSL technology, ensuring your personal information stays safe and out of malicious hands.
            </p>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-[#262626] mb-4">PCI Compliant</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              The Payment Card Industry Data Security Standard (PCI DSS) is an information security standard for organizations that handle MasterCard and revolving credit information. Defined by the Payment Card Industry Security Standards Council, the standard was created to increase controls around MasterCard data to reduce fraud via its exposure.
            </p>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-[#262626] mb-4">Payment Terms and Conditions</h2>
            <ul className="list-disc pl-6 space-y-3 text-gray-600 leading-relaxed">
              <li>We currently accept all major credit cards, including Visa, MasterCard, Discover, and more.</li>
              <li>All prices and figures are listed in USD.</li>
              <li>
                Additional charges apply: Shipping is calculated at checkout. Please read our{' '}
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
              Yes, Cokaro.com is certified Level 1 PCI DSS compliant.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              We are committed to your online security and have invested significant time and resources to certify our solution as PCI compliant. From annual on-site assessments to continuous risk management, we work diligently to ensure our platform remains secure.
            </p>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-[#262626] mb-4">Your Payment Information</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Your MasterCard number is not accessible to us. Once your purchase is completed, we only have access to your billing information, shipping information, order details, and the last 4 digits of your MasterCard number.
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
