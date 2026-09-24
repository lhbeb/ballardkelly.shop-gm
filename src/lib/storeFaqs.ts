export interface StoreFaq {
  question: string;
  answer: string;
  linkHref?: string;
  linkLabel?: string;
}

export const STORE_FAQS: readonly StoreFaq[] = [
  {
    question: 'What collectibles does BallardKelly sell?',
    answer:
      'BallardKelly offers a changing selection of collectibles and hobby items. Available categories, themes, editions, and condition details are shown on each product page.',
  },
  {
    question: 'Are collectibles new or pre-owned?',
    answer:
      'Condition varies by item. Each product page identifies whether a collectible is new, used, vintage, sealed, open-box, or otherwise pre-owned, along with the available listing details.',
  },
  {
    question: 'What should I check before buying a collectible?',
    answer:
      'Review the item description, edition or model information, condition, dimensions, included pieces, photos, and any noted imperfections on the product page. If you need clarification, contact us before ordering.',
  },
  {
    question: 'Are accessories or original packaging included?',
    answer:
      'Included items vary by listing. Check the product description and photos for original packaging, certificates, inserts, accessories, display stands, or other pieces before completing your order.',
  },
  {
    question: 'Where do you ship and how long does delivery take?',
    answer:
      'BallardKelly offers free standard shipping across the United States. Orders are processed within 0–1 business day, with estimated delivery in 3–4 business days. Tracking is provided after an eligible order ships.',
    linkHref: '/shipping-policy',
    linkLabel: 'Read our Shipping Policy',
  },
  {
    question: 'How can I track my collectibles order?',
    answer:
      'When your order ships, tracking information is sent to the email address used during checkout. You can also use our Track Order page for updates.',
    linkHref: '/track',
    linkLabel: 'Track your order',
  },
  {
    question: 'What is your return policy for collectibles?',
    answer:
      'Eligible items may be returned within 30 calendar days of delivery. Return eligibility, condition requirements, postage responsibility, refund timing, and instructions are explained in our Return & Exchange Policy.',
    linkHref: '/return-policy',
    linkLabel: 'Read our Return & Exchange Policy',
  },
  {
    question: 'Can I arrange local pickup?',
    answer:
      'Local pickup is available only for eligible products and must be confirmed by our team. Wait for a pickup-ready confirmation before travelling to the pickup location.',
    linkHref: '/local-pickup',
    linkLabel: 'View the Local Pickup Guide',
  },
  {
    question: 'Can I change or cancel a collectibles order?',
    answer:
      'Contact us as soon as possible. We will try to help before fulfillment begins, but changes or cancellations cannot be guaranteed after an order enters processing or ships.',
  },
  {
    question: 'How can I contact BallardKelly about a collectible?',
    answer:
      'Use our contact form, email contact@BallardKelly.shop, or call +1 (308) 260-1935 during published support hours for product or order questions.',
    linkHref: '/contact',
    linkLabel: 'Contact our team',
  },
];
