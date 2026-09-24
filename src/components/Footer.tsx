import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Instagram } from 'lucide-react';

const socialIconClass =
  'inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#5f8f7a]/60 text-[#f2f7f4] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#5f8f7a] hover:bg-[#5f8f7a] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1f5a46]';

const Footer = () => {
  return (
    <footer className="bg-[#1f5a46] text-[#f2f7f4]">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[1.5fr_0.9fr_0.75fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Image
                src="/logosvg.svg"
                alt="BallardKelly Logo"
                width={260}
                height={46}
                className="h-auto w-[6.5rem] brightness-0 invert sm:w-32"
              />
            </Link>
            <p className="mb-4 text-[#f2f7f4]">
              Ballard Kelly is a collector-run shop founded by Ballard Kelly Scott, built around trading cards, Topps finds, Pokemon cards, booster boxes, comics, figures, and collectible pieces with real hobby appeal.
            </p>
            <div className="space-y-2">
              <div className="flex items-center">
                <Phone className="h-5 w-5 shrink-0 text-[#5f8f7a] mr-2" />
                <a href="tel:+13082601935" className="hover:text-[#c8942f] transition-colors duration-300">
                  <span className="font-semibold">United States:</span> +1 (308) 260-1935
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-[#5f8f7a] mr-2" />
                <a href="mailto:contact@BallardKelly.shop" className="hover:text-[#c8942f] transition-colors duration-300">
                  contact@BallardKelly.shop
                </a>
              </div>

              <div className="flex items-start">
                <MapPin className="h-5 w-5 shrink-0 text-[#5f8f7a] mr-2 mt-1" />
                <div>
                  <span className="block font-semibold text-white">Address</span>
                  <span>823 Center Ave N, Curtis, NE 69025, United States</span>
                </div>
              </div>
              <div className="pt-2 flex gap-3">
                <a
                  href="https://www.instagram.com/ballardkelly_shop/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={socialIconClass}
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#f2f7f4] mb-4">Shop Collections</h3>
            <ul className="space-y-2">
              <li><Link href="/search" className="hover:text-[#c8942f] transition-colors duration-300">All Products</Link></li>
              <li><Link href="/search?category=Trading+Cards" className="hover:text-[#c8942f] transition-colors duration-300">Trading Cards</Link></li>
              <li><Link href="/search?query=Topps" className="hover:text-[#c8942f] transition-colors duration-300">Topps</Link></li>
              <li><Link href="/search?query=Pokemon" className="hover:text-[#c8942f] transition-colors duration-300">Pokemon Cards</Link></li>
              <li><Link href="/search?query=Booster+Box" className="hover:text-[#c8942f] transition-colors duration-300">Booster Boxes</Link></li>
              <li><Link href="/search?category=Collectibles" className="hover:text-[#c8942f] transition-colors duration-300">Collectibles</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#f2f7f4] mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-[#c8942f] transition-colors duration-300">Home</Link></li>
              <li><Link href="/#collector-finds" className="hover:text-[#c8942f] transition-colors duration-300">Collector Finds</Link></li>
              <li><Link href="/#featured" className="hover:text-[#c8942f] transition-colors duration-300">New Finds</Link></li>
              <li><Link href="/track" className="hover:text-[#c8942f] transition-colors duration-300">Track Order</Link></li>
              <li><Link href="/contact" className="hover:text-[#c8942f] transition-colors duration-300">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#f2f7f4] mb-4">Policies</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy-policy" className="hover:text-[#c8942f] transition-colors duration-300">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#c8942f] transition-colors duration-300">Terms of Service</Link></li>
              <li><Link href="/billing-policy" className="hover:text-[#c8942f] transition-colors duration-300">Billing Policy</Link></li>
              <li><Link href="/billing-term-and-condition" className="hover:text-[#c8942f] transition-colors duration-300">Billing Terms & Conditions</Link></li>
              <li><Link href="/return-policy" className="hover:text-[#c8942f] transition-colors duration-300">Refund & Return Policy</Link></li>
              <li><Link href="/shipping-policy" className="hover:text-[#c8942f] transition-colors duration-300">Shipping Policy</Link></li>
              <li><Link href="/warranty-replacement" className="hover:text-[#c8942f] transition-colors duration-300">Warranty & Replacement</Link></li>
              <li><Link href="/cookies" className="hover:text-[#c8942f] transition-colors duration-300">Cookies Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#f2f7f4] mb-4">Company & Help</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-[#c8942f] transition-colors duration-300">About Us</Link></li>
              <li><Link href="/frequently-asked-questions" className="hover:text-[#c8942f] transition-colors duration-300">FAQs</Link></li>
              <li><Link href="/local-pickup" className="hover:text-[#c8942f] transition-colors duration-300">Local Pickup Guide</Link></li>
              <li><Link href="/wholesale-policies" className="hover:text-[#c8942f] transition-colors duration-300">Wholesale Policies</Link></li>
              <li><Link href="/report-security-issues" className="hover:text-[#c8942f] transition-colors duration-300">Report Security Issues</Link></li>
              <li><Link href="/livechat" className="hover:text-[#c8942f] transition-colors duration-300">Live Chat</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#f2f7f4]/20 mt-12 pt-8">
          <div className="flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
            <p>© 2026 BallardKelly. All rights reserved.</p>
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:justify-end">
              {[
                { src: '/payment-logos/visa.svg', alt: 'Visa' },
                { src: '/payment-logos/mastercard.svg', alt: 'Mastercard' },
                { src: '/payment-logos/american-express.svg', alt: 'American Express' },
                { src: '/payment-logos/discover.svg', alt: 'Discover' },
                { src: '/payment-logos/maestro.svg', alt: 'Maestro' },
                { src: '/payment-logos/jcb.svg', alt: 'JCB' },
                { src: '/payment-logos/unionpay.svg', alt: 'UnionPay' },
                { src: '/payment-logos/diners.svg', alt: 'Diners Club' },
                { src: '/payment-logos/apple-pay.svg', alt: 'Apple Pay' },
                { src: '/payment-logos/google-pay.svg', alt: 'Google Pay' },
              ].map((logo) => (
                <span
                  key={logo.src}
                  className="flex h-9 min-w-[3.5rem] items-center justify-center rounded-md bg-white px-2"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={52}
                    height={32}
                    className="max-h-6 w-auto object-contain"
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
