import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Report Security Issues | BallardKellyScott',
  description: 'Report security vulnerabilities and issues on BallardKellyScott.',
};

export default function ReportSecurityIssuesPage() {
  return (
    <main className="min-h-screen bg-[#F5F7FB] py-12 sm:py-16">
      <div className="container mx-auto max-w-4xl px-4">
        
        {/* Header Section */}
        <section className="mb-10 rounded-2xl bg-[#1f5a46] px-6 py-8 text-[#f2f7f4] sm:px-8 sm:py-10 shadow-lg">
          <h1 className="max-w-3xl text-3xl font-bold leading-tight sm:text-5xl">
            Report Security Issues
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-[#f2f7f4]/80 sm:text-lg">
            If you’ve found a security vulnerability on BallardKellyScott.shop, we encourage you to contact us immediately. We review all legitimate reports and aim to resolve issues quickly. Before reporting, please review this document — including our fundamentals, bounty program, reward guidelines, and non-reportable issues.
          </p>
        </section>

        {/* Content Sections */}
        <div className="space-y-8">
          
          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-[#262626] mb-4">Fundamentals</h2>
            <p className="text-gray-600 mb-4">
              If you follow the principles below when reporting a security issue to BallardKellyScott.shop, we will not initiate legal action or enforcement investigations against you in response to your report.
            </p>
            <p className="text-gray-600 mb-4 font-semibold">We ask that:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>You give us reasonable time to review and fix the issue before disclosing it publicly or sharing it with others.</li>
              <li>You do not interact with or access private accounts without the account owner&apos;s consent.</li>
              <li>You make a good-faith effort to avoid privacy violations, service disruptions, or data destruction.</li>
              <li>You do not exploit the issue for any reason, including to demonstrate further risks or access sensitive data.</li>
              <li>You comply with all applicable laws and regulations.</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-[#262626] mb-4">Bounty Program</h2>
            <p className="text-gray-600 mb-4">
              We recognize and reward security researchers who help protect our platform by reporting vulnerabilities. Bounties are awarded at BallardKellyScott.shop&apos;s discretion, based on risk, impact, and report quality.
            </p>
            <p className="text-gray-600 mb-4 font-semibold">To potentially qualify for a bounty, you must:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Follow the fundamentals listed above.</li>
              <li>Report a valid security bug that poses a risk to privacy or security.</li>
              <li>Submit your report through our security center — please do not contact employees directly.</li>
              <li>Disclose any accidental privacy violations or disruptions in your report.</li>
              <li>Understand that while we investigate all valid reports, priority is based on risk. A response may take some time.</li>
              <li>Agree that we reserve the right to publish submitted reports.</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-[#262626] mb-4">Rewards</h2>
            <p className="text-gray-600 mb-4">
              Rewards are based on the impact and severity of the vulnerability. Please provide detailed and reproducible steps in your report. If the issue cannot be reproduced, it is not eligible for a bounty.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
              <li>The first valid report of an issue receives the bounty.</li>
              <li>Multiple bugs caused by a single underlying issue are treated as one report.</li>
              <li>We assess rewards based on impact, exploitability, and report quality.</li>
            </ul>

            <h3 className="text-xl font-bold text-[#262626] mt-8 mb-4">The following are our current maximum reward amounts by severity:</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-bold text-red-600">Critical Severity – $200</h4>
                <p className="text-gray-600 mb-2">Includes major issues like:</p>
                <ul className="list-disc pl-6 text-gray-600">
                  <li>Remote Code Execution</li>
                  <li>Remote Shell or Command Execution</li>
                  <li>Vertical Authentication Bypass</li>
                  <li>SQL Injection that leaks targeted data</li>
                  <li>Full account access</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-bold text-amber-700">High Severity – $100</h4>
                <p className="text-gray-600 mb-2">Includes issues such as:</p>
                <ul className="list-disc pl-6 text-gray-600">
                  <li>Lateral authentication bypass</li>
                  <li>Disclosure of sensitive internal data</li>
                  <li>Stored XSS affecting other users</li>
                  <li>Local file inclusion</li>
                  <li>Insecure handling of authentication cookies</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-bold text-amber-700">Medium Severity – $50</h4>
                <p className="text-gray-600 mb-2">Examples include:</p>
                <ul className="list-disc pl-6 text-gray-600">
                  <li>Logic or business process flaws</li>
                  <li>Insecure object references</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-bold text-green-600">Low Severity – Recognition Only</h4>
                <p className="text-gray-600 mb-2">Examples include:</p>
                <ul className="list-disc pl-6 text-gray-600">
                  <li>Open redirects</li>
                  <li>Reflected XSS</li>
                  <li>Low-sensitivity information leaks</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-[#262626] mb-4">Contact Information</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                <strong>📍 Address:</strong> <a href="https://maps.google.com/?q=1239+N+Washington+Ave,+Wichita,+KS+67214,+USA" target="_blank" rel="noopener noreferrer" className="text-[#1f5a46] hover:underline">1239 N Washington Ave, Wichita, KS 67214, USA</a>
              </p>
              <p>
                <strong>✆ Phone:</strong> +1 (913) 593-7677
              </p>
              <p>
                <strong>✉ Email:</strong> <a href="mailto:contact@BallardKellyScott.shop" className="text-[#1f5a46] hover:underline">contact@BallardKellyScott.shop</a>
              </p>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
