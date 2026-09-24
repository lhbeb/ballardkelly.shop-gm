"use client";

import { Instagram } from 'lucide-react';
import { usePathname } from 'next/navigation';

const LEGAL_PAGE_PATHS = new Set([
  '/about',
  '/cookies',
  '/frequently-asked-questions',
  '/local-pickup',
  '/privacy-policy',
  '/return-policy',
  '/shipping-policy',
  '/terms',
]);

const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/ballardkelly_shop/',
    className: 'bg-[#1f5a46] text-white hover:bg-[#174434]',
    icon: <Instagram className="h-4 w-4" aria-hidden="true" />,
  },
];

function shouldShowSocialRail(pathname: string | null) {
  if (!pathname || pathname.startsWith('/checkout') || pathname.startsWith('/admin')) {
    return false;
  }

  return pathname === '/' || pathname.startsWith('/products/') || LEGAL_PAGE_PATHS.has(pathname);
}

export default function FixedSocialRail() {
  const pathname = usePathname();

  if (!shouldShowSocialRail(pathname)) {
    return null;
  }

  return (
    <nav
      aria-label="BallardKelly social media"
      className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 overflow-hidden rounded-l-md shadow-[0_12px_30px_rgba(10,48,117,0.18)] md:block"
    >
      <div className="flex flex-col">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Follow BallardKelly on ${link.name}`}
            className={`flex h-11 w-11 items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1f5a46] ${link.className}`}
          >
            {link.icon}
          </a>
        ))}
      </div>
    </nav>
  );
}
