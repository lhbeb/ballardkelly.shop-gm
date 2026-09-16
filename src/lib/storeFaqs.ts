export interface StoreFaq {
  question: string;
  answer: string;
  linkHref?: string;
  linkLabel?: string;
}

export const STORE_FAQS: readonly StoreFaq[] = [
  {
    question: 'What products does BallardKellyScott sell?',
    answer:
      'BallardKellyScott sells and resells outdoor power and property-care equipment for homes, backyards, acreage, and farms, including lawn mowers, pressure washers, chainsaws, blowers, trimmers, log splitters, and related essentials from product marks such as Briggs & Stratton, Craftsman, Cub Cadet, DEWALT, EGO, Greenworks, Honda, and Husqvarna.',
  },
  {
    question: 'Is BallardKellyScott affiliated with the brands shown?',
    answer:
      'BallardKellyScott is an independent ecommerce seller and reseller. Some listings may come through authorized reseller or supplier relationships where applicable; others come through verified resale, supplier, marketplace, auction, liquidation, overstock, or private seller channels. Brand and model names are used to identify products and remain the property of their respective owners.',
  },
  {
    question: 'How does BallardKellyScott review products before sale?',
    answer:
      'Products handled through our warehouse are reviewed for listing accuracy, condition, and function where applicable before fulfillment. The product page shows the available condition and listing details before you order.',
  },
  {
    question: 'Are your products new or pre-owned?',
    answer:
      'Product condition varies by item. The exact condition is displayed on each product page so you can review it before adding the item to your cart.',
  },
  {
    question: 'How do I place an order?',
    answer:
      'Choose a product, add it to your cart, and continue to checkout. Review the product, delivery address, total price, and available payment instructions before completing your order.',
  },
  {
    question: 'Where do you ship and how long does delivery take?',
    answer:
      'BallardKellyScott currently offers free standard shipping across the United States. Orders are processed within 1 business day, transit time is 1-3 business days, and tracking is provided after an eligible order is dispatched.',
    linkHref: '/shipping-policy',
    linkLabel: 'Read our Shipping Policy',
  },
  {
    question: 'How can I track my order?',
    answer:
      'When your order ships, we send tracking information to the email address used during checkout. You can also use our Track Order page for updates.',
    linkHref: '/track',
    linkLabel: 'Track your order',
  },
  {
    question: 'What is your return policy?',
    answer:
      'Eligible items may be returned within 30 calendar days of delivery. Return eligibility, required condition, postage responsibility, refund timing, and step-by-step instructions are explained in our Return & Exchange Policy.',
    linkHref: '/return-policy',
    linkLabel: 'Read our Return & Exchange Policy',
  },
  {
    question: 'Can I exchange an item?',
    answer:
      'Exchanges are accepted for eligible items when replacement inventory is available. Contact our support team within 30 days of delivery before sending anything back.',
  },
  {
    question: 'Is local pickup available?',
    answer:
      'Local pickup is available only for eligible products and must be confirmed by our team. Please wait for a pickup-ready confirmation before travelling to the pickup location.',
    linkHref: '/local-pickup',
    linkLabel: 'View the Local Pickup Guide',
  },
  {
    question: 'Can I change or cancel an order?',
    answer:
      'Contact us as soon as possible. We will try to help before fulfillment begins, but changes or cancellations cannot be guaranteed after an order has entered processing or shipped.',
  },
  {
    question: 'How can I contact BallardKellyScott?',
    answer:
      'You can use our contact form, email contact@BallardKellyScott.shop, or call +1 (913) 593-7677 during published support hours.',
    linkHref: '/contact',
    linkLabel: 'Contact our team',
  },
];
