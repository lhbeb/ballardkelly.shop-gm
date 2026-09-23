import type { Metadata } from 'next';
import Link from 'next/link';
import ResellerBrandNotice from '@/components/ResellerBrandNotice';
import {
  RotateCcw,
  RefreshCw,
  Clock,
  CreditCard,
  Building2,
  Mail,
  Phone,
  PackageCheck,
  FileText,
  HelpCircle,
  Banknote,
  Inbox,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Return & Exchange Policy | BallardKelly',
  description:
    'BallardKelly Return & Exchange Policy for resold and sourced lawn, outdoor power, home-care, backyard, and farm-care equipment. We accept returns for both defective and non-defective products within 30 days.',
};

export default function ReturnPolicyPage() {
  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@type': 'OnlineStore',
    '@id': 'https://BallardKelly.shop/#organization',
    'name': 'BallardKelly',
    'url': 'https://BallardKelly.shop',
    'hasMerchantReturnPolicy': {
      '@type': 'MerchantReturnPolicy',
      'name': 'BallardKelly Return & Exchange Policy',
      'merchantReturnLink': 'https://BallardKelly.shop/return-policy',
      'applicableCountry': 'US',
      'returnPolicyCategory': 'https://schema.org/MerchantReturnFiniteReturnWindow',
      'merchantReturnDays': 30,
      'returnMethod': 'https://schema.org/ReturnByMail',
      'returnFees': 'https://schema.org/FreeReturn',
      'returnLabelSource': 'https://schema.org/ReturnLabelDownloadAndPrint',
      'restockingFee': 0,
      'refundType': 'https://schema.org/FullRefund',
      'itemCondition': 'https://schema.org/NewCondition',
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      <div className="container mx-auto px-4 max-w-4xl">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#12382f] tracking-tight">
            Return & Exchange Policy
          </h1>
          <p className="text-gray-600 mt-3 text-base sm:text-lg max-w-2xl">
            We want you to understand the return process before you buy, whether you choose a mower, pressure washer, chainsaw, blower, trimmer, log splitter, or another product for home, backyard, acreage, or farm care. If something isn&apos;t right, this page explains how returns and exchanges are handled.
          </p>
        </div>

        {/* Quick Summary */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 mb-10">
          <h2 className="text-lg font-bold text-[#12382f] mb-5">Quick Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-100">
              <RotateCcw className="w-5 h-5 text-[#12382f] flex-shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500">Returns</span>
                <span className="text-sm font-bold text-gray-900">Defective & Non-Defective</span>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-100">
              <RefreshCw className="w-5 h-5 text-[#12382f] flex-shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500">Exchanges</span>
                <span className="text-sm font-bold text-gray-900">Yes, Accepted</span>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-100">
              <Clock className="w-5 h-5 text-[#12382f] flex-shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500">Return Window</span>
                <span className="text-sm font-bold text-gray-900">30 Days</span>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-100">
              <Inbox className="w-5 h-5 text-[#12382f] flex-shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500">Return Method</span>
                <span className="text-sm font-bold text-gray-900">By Mail</span>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-100">
              <Banknote className="w-5 h-5 text-[#12382f] flex-shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500">Restocking Fee</span>
                <span className="text-sm font-bold text-gray-900">None ($0.00)</span>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-100">
              <CreditCard className="w-5 h-5 text-[#12382f] flex-shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500">Refund Time</span>
                <span className="text-sm font-bold text-gray-900">5 Business Days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Full Policy Details */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-10 space-y-10 text-gray-700">

          {/* Introduction */}
          <p className="text-lg leading-relaxed text-gray-800">
            At <strong className="text-[#12382f]">BallardKelly</strong>, we sell and resell outdoor power and property-care equipment. This policy explains the return window, item-condition requirements, refund timing, and how to contact us before sending an item back.
          </p>

          <ResellerBrandNotice compact />

          {/* 1. Returns */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <RotateCcw className="w-6 h-6 text-[#12382f]" />
              <h2 className="text-2xl font-bold text-[#12382f]">1. Returns</h2>
            </div>
            <p>We accept returns for <strong>both defective and non-defective products</strong>:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200">
                <h3 className="font-bold text-emerald-900 text-base mb-1">Defective & Damaged Items</h3>
                <p className="text-sm text-emerald-800">
                  If your order arrives damaged, defective, or incorrect, we provide a prepaid shipping label after the return request is approved.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200">
                <h3 className="font-bold text-emerald-950 text-base mb-1">Change of Mind</h3>
                <p className="text-sm text-emerald-900">
                  Changed your mind or ordered the wrong item? You can request a return within 30 days. Approved returns receive a prepaid label and are refunded for the eligible item price after inspection.
                </p>
              </div>
            </div>
          </div>

          {/* 2. Exchanges */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <RefreshCw className="w-6 h-6 text-[#12382f]" />
              <h2 className="text-2xl font-bold text-[#12382f]">2. Exchanges</h2>
            </div>
            <p><strong>Yes, we accept exchanges.</strong> If you&apos;d like a different size, colour, or model:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Contact us within <strong>30 days</strong> of receiving your delivery.</li>
              <li>Use the return label included in your package to send the original item back.</li>
              <li>Once received, your replacement will be dispatched right away.</li>
            </ul>
          </div>

          {/* 3. Return Window & Conditions */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-[#12382f]" />
              <h2 className="text-2xl font-bold text-[#12382f]">3. 30-Day Return Window</h2>
            </div>
            <p>You have <strong>30 calendar days</strong> from the date of delivery to return or exchange your item.</p>
            <p className="font-semibold text-gray-900">Your item should be:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>In new, unused condition with original tags and packaging where possible.</li>
              <li>Accompanied by proof of purchase (order number or confirmation email).</li>
              <li>Free from post-delivery damage caused after receipt.</li>
            </ul>
          </div>

          {/* 4. How to Return by Mail */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <PackageCheck className="w-6 h-6 text-[#12382f]" />
              <h2 className="text-2xl font-bold text-[#12382f]">4. How to Return</h2>
            </div>
            <p>All returns are handled <strong>by mail</strong>. Here&apos;s how it works:</p>
            <ol className="list-decimal pl-6 space-y-3">
              <li>
                <strong>Contact us</strong> at <a href="mailto:contact@BallardKelly.shop" className="text-emerald-700 hover:underline font-semibold">contact@BallardKelly.shop</a> or call <span className="font-semibold">+1 (913) 593-7677</span>.
              </li>
              <li>
                <strong>Get your return label</strong>. We&apos;ll email you a prepaid label after approving your return request.
              </li>
              <li>
                <strong>Ship it back</strong> securely. Return postage is free for all eligible US returns, including defective items and change-of-mind returns.
              </li>
              <li>
                <strong>Get your refund</strong>. Once inspected, your refund is processed within 5 business days.
              </li>
            </ol>
          </div>

          {/* 5. Restocking Fee */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <Banknote className="w-6 h-6 text-[#12382f]" />
              <h2 className="text-2xl font-bold text-[#12382f]">5. No Restocking Fee</h2>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
              <p className="font-medium text-gray-800">
                We do <strong>not</strong> charge any restocking, handling, or processing fees. Approved refunds are issued for the eligible purchased item price.
              </p>
            </div>
          </div>

          {/* 6. Refund Processing */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-[#12382f]" />
              <h2 className="text-2xl font-bold text-[#12382f]">6. Refund Processing</h2>
            </div>
            <p>Refunds are credited to your original payment method (Visa, MasterCard, PayPal, Apple Pay, etc.).</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Inspection:</strong> 1–2 business days after we receive your return.</li>
              <li><strong>Refund issued:</strong> Within <strong>5 business days</strong> of approval.</li>
            </ul>
          </div>

          {/* 7. Marketplace Sellers */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-[#12382f]" />
              <h2 className="text-2xl font-bold text-[#12382f]">7. Marketplace Seller Items</h2>
            </div>
            <p>
              Products from our verified marketplace partners, supplier channels, and authorized reseller relationships where applicable follow the same 30-day return process unless a listing states otherwise. All returns are shipped to our central warehouse for inspection, so the experience is consistent regardless of the seller or source.
            </p>
          </div>

          {/* 8. Contact */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-[#12382f]" />
              <h2 className="text-2xl font-bold text-[#12382f]">8. Need Help?</h2>
            </div>
            <p>Our team is here to assist you with any return or exchange:</p>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-bold text-[#12382f]">
                  <Phone className="w-5 h-5 text-[#12382f]" />
                  <span>Phone</span>
                </div>
                <div className="text-sm text-gray-600 pl-7 space-y-1">
                  <div>+1 (913) 593-7677</div>
                </div>

                <div className="flex items-center gap-2 font-bold text-[#12382f] pt-2">
                  <Mail className="w-5 h-5 text-[#12382f]" />
                  <span>Email</span>
                </div>
                <div className="text-sm text-gray-600 pl-7">
                  <a href="mailto:contact@BallardKelly.shop" className="text-emerald-700 hover:underline font-semibold">contact@BallardKelly.shop</a>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 font-bold text-[#12382f]">
                  <Building2 className="w-5 h-5 text-[#12382f]" />
                  <span>Our Addresses</span>
                </div>
                <div className="text-sm text-gray-600 pl-7 space-y-2">

                  <div>
                    <strong className="text-gray-900 block">Address:</strong>
                    1239 N Washington Ave, Wichita, KS 67214, USA
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Promise Footer */}
          <div className="bg-gradient-to-r from-[#12382f] to-[#276955] text-white p-6 sm:p-8 rounded-xl shadow-md mt-8">
            <h3 className="text-xl font-bold mb-2">Our Promise</h3>
            <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
              We stand behind every product we sell. If something isn&apos;t right with your order, we&apos;ll listen, help, and make it right as quickly as possible.
            </p>
            <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-gray-300">Have a question about your order?</span>
              <Link
                href="/contact"
                className="inline-flex items-center px-4 py-2 rounded-lg bg-white text-[#12382f] font-bold text-sm hover:bg-gray-100 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
