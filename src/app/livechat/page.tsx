'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Zap, HeartHandshake, MessageCircle, ArrowLeft, Clock } from 'lucide-react';

export default function LiveChatPage() {
  const [siteUrl, setSiteUrl] = useState('');
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSiteUrl(window.location.origin);
    }
  }, []);

  const chatSrc = `https://chatapppay-rust.vercel.app/livechat?color=%23090A28&siteUrl=${encodeURIComponent(siteUrl || 'https://BallardKellyScott.shop')}`;

  const features = [
    {
      icon: <Zap className="h-5 w-5" />,
      title: 'Instant Responses',
      desc: 'Connect with a live agent in seconds — no waiting on hold.',
    },
    {
      icon: <ShieldCheck className="h-5 w-5" />,
      title: 'Safe & Secure',
      desc: 'All conversations are encrypted and your data is never shared.',
    },
    {
      icon: <HeartHandshake className="h-5 w-5" />,
      title: 'Expert Support',
      desc: 'Our team is trained to help with orders, returns, and product questions.',
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: 'Available Daily',
      desc: 'Support available Monday-Friday 9 AM-5 PM and Saturday 10 AM-3 PM CT.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 py-4 px-4">
        <div className="container mx-auto max-w-6xl flex items-center gap-3">
          <Link
            href="/contact"
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#12382f] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Contact
          </Link>
          <span className="text-gray-300">|</span>
          <span className="text-sm text-gray-400">Live Chat</span>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">

          <div className="lg:col-span-2 flex flex-col gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#12382f]/10 rounded-full mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-xs font-semibold text-[#12382f] tracking-wide uppercase">Live Support Online</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#12382f] leading-tight mb-3">
                Talk to a Real Person, Right Now
              </h1>
              <p className="text-gray-500 text-base leading-relaxed">
                Have a question about your order, a product, or anything else? Start a chat and
                we will get back to you in seconds.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {features.map((f) => (
                <div key={f.title} className="flex items-start gap-3 bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                  <div className="flex-shrink-0 w-9 h-9 bg-[#12382f]/10 rounded-lg flex items-center justify-center text-[#12382f]">
                    {f.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#12382f]">{f.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#12382f] rounded-2xl p-5 text-white">
              <p className="text-sm font-semibold mb-1">Prefer email instead?</p>
              <p className="text-xs text-white/70 mb-3">
                Send us a message at contact@BallardKellyScott.shop and we will reply within 24 hours.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white/15 hover:bg-white/25 transition-colors px-3 py-1.5 rounded-lg"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                Open contact form
              </Link>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col"
              style={{ minHeight: 600, height: '75svh', maxHeight: 750 }}
            >
              <div className="flex items-center gap-3 px-5 py-4 bg-[#12382f]">
                <div className="flex items-center justify-center w-9 h-9 bg-white/15 rounded-full flex-shrink-0">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white leading-tight">BallardKellyScott Support</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-xs text-white/70">Typically replies in a few minutes</span>
                  </div>
                </div>
              </div>

              {!iframeLoaded && (
                <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8">
                  <div className="w-14 h-14 bg-[#12382f]/10 rounded-full flex items-center justify-center animate-pulse">
                    <MessageCircle className="h-7 w-7 text-[#12382f]/40" />
                  </div>
                  <div className="space-y-2 text-center">
                    <div className="h-3 w-32 bg-gray-100 rounded-full mx-auto animate-pulse" />
                    <div className="h-3 w-24 bg-gray-100 rounded-full mx-auto animate-pulse" />
                  </div>
                </div>
              )}

              {siteUrl && (
                <iframe
                  src={chatSrc}
                  title="BallardKellyScott Live Chat Support"
                  className={`w-full flex-1 border-none block transition-opacity duration-500 ${iframeLoaded ? 'opacity-100' : 'opacity-0 h-0'}`}
                  allow="clipboard-write; camera; microphone"
                  onLoad={() => setIframeLoaded(true)}
                />
              )}
            </div>
            <p className="mt-3 text-center text-xs text-gray-400">
              Your conversation is private and secure.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
