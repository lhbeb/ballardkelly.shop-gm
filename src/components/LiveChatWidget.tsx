"use client";

import { usePathname } from 'next/navigation';
import Script from 'next/script';

const LIVECHAT_SCRIPT_SRC = "https://chatapppay-rust.vercel.app/livechat.js";

export default function LiveChatWidget() {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');
  const isCheckoutRoute = pathname?.startsWith('/checkout');

  if (isAdminRoute || isCheckoutRoute) {
    return null;
  }

  return (
    <Script
      id="live-chat-script"
      src={LIVECHAT_SCRIPT_SRC}
      strategy="lazyOnload"
      data-color="#1f5a46"
      data-position="bottom-right"
      data-button-size="60"
      data-label="Chat with us"
    />
  );
}
