import React from 'react';
import ResellerBrandNotice from '@/components/ResellerBrandNotice';

const TermsPage = () => {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-[#262626] mb-2">Cokaro Terms of Service</h1>
        <p className="text-gray-600 mb-8">Last Updated: {currentDate}</p>
        
        <div className="prose max-w-none text-gray-700 space-y-8">
          <p className="text-lg leading-relaxed">
            Welcome to Cokaro. Cokaro sells and resells outdoor power, lawn, backyard, home-care, and farm-care equipment through our website and marketplace. By accessing or using our website, marketplace, or services, you agree to be bound by these Terms of Service. Please read them carefully. If you do not agree, please discontinue using the site.
          </p>

          <ResellerBrandNotice compact />

          {/* Section 1: Overview */}
          <div>
            <h2 className="text-3xl font-bold text-[#262626] mt-10 mb-4">1. Overview</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cokaro operates as an independent seller, reseller, and curated marketplace for outdoor power and property-care equipment, with authorized reseller or supplier relationships only where expressly applicable.</li>
              <li>We source products through verified suppliers, auctions, private sellers, liquidators, wholesalers, marketplace partners, and other third-party suppliers.</li>
              <li>We also allow approved private sellers to list items on our platform after a full inspection by our team.</li>
              <li>Our catalog may include products bearing marks such as Briggs & Stratton, Craftsman, Cub Cadet, DEWALT, EGO, Greenworks, Honda, Husqvarna, and other product or model marks shown on product pages.</li>
              <li>All purchases made through Cokaro are processed under these Terms.</li>
            </ul>
          </div>

          {/* Section 2: Account Terms */}
          <div>
            <h2 className="text-3xl font-bold text-[#262626] mt-10 mb-4">2. Account Terms</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You must be 18 years or older to use this service.</li>
              <li>You must provide accurate and complete information during account creation.</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
              <li>You must notify us immediately of any unauthorized access or security concerns.</li>
            </ul>
          </div>

          {/* Section 3: Marketplace and Private Seller Terms */}
          <div>
            <h2 className="text-3xl font-bold text-[#262626] mt-10 mb-4">3. Marketplace and Private Seller Terms</h2>
            <p className="mb-4">
              Cokaro hosts a controlled marketplace where approved private sellers may offer products.
            </p>

            <h3 className="text-xl font-bold text-[#262626] mt-6 mb-3">3.1 Seller Onboarding Process</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Private sellers must be screened and approved before listing items.</li>
              <li>Sellers send their inventory to our warehouse, where it is condition-checked, tested where applicable, and reviewed for listing accuracy before any listing goes live.</li>
            </ul>

            <h3 className="text-xl font-bold text-[#262626] mt-6 mb-3">3.2 Fulfillment Process</h3>
            <p className="mb-2">When you purchase an item from a third-party seller:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>It is clearly indicated on the product page.</li>
              <li>The seller sends the item to our warehouse if it is not already stored with us.</li>
              <li>Our inspection team confirms the condition, functionality, and price accuracy.</li>
              <li>Only after passing inspection is the item shipped to the customer.</li>
            </ul>
            <p className="mb-4">
              Cokaro reserves the right to reject, refund, or cancel any order if the item fails inspection.
            </p>

            <h3 className="text-xl font-bold text-[#262626] mt-6 mb-3">3.3 Seller Responsibility</h3>
            <p className="mb-2">Sellers on the Cokaro platform are responsible for:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Lawful ownership and accurate representation of their products</li>
              <li>Providing accurate condition descriptions</li>
              <li>Meeting our quality and safety standards</li>
            </ul>
            <p>
              Cokaro is not responsible for inaccurate representations made by sellers, although we take all reasonable steps to verify product condition before shipment.
            </p>
          </div>

          {/* Section 4: Product Terms */}
          <div>
            <h2 className="text-3xl font-bold text-[#262626] mt-10 mb-4">4. Product Terms</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>We aim to provide accurate and detailed product descriptions.</li>
              <li>We sell and resell new, open-box, refurbished, and pre owned items, each clearly labeled.</li>
              <li>Product names, brand names, logos, and marks are used for identification of the products offered for sale.</li>
              <li>Unless expressly stated on a product page, Cokaro is not claiming manufacturer sponsorship, endorsement, or ownership of third-party marks.</li>
              <li>All used, open-box, or resale products are inspected prior to sale when they pass through our warehouse.</li>
              <li>Product availability is not guaranteed until an order is processed.</li>
              <li>Prices may change at any time due to market conditions and sourcing costs.</li>
              <li>We reserve the right to modify, limit, or discontinue any product or listing.</li>
            </ul>
          </div>

          {/* Section 5: Sourcing Transparency */}
          <div>
            <h2 className="text-3xl font-bold text-[#262626] mt-10 mb-4">5. Sourcing Transparency</h2>
            <p className="mb-4">
              By using our website, you acknowledge that Cokaro sources products through:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Online auctions and bidding platforms</li>
              <li>Private sellers and independent sourcers</li>
              <li>Authorized reseller or supplier relationships where applicable</li>
              <li>Liquidation and return departments of major retailers</li>
              <li>Garage sales, local auctions, and community sales</li>
              <li>Wholesalers and bulk suppliers</li>
            </ul>
            <p>
              These sourcing methods allow us to offer competitive pricing.
            </p>
            <p className="mt-2">
              You agree that cosmetic variations, packaging differences, or shelf pull characteristics may occur with certain items unless stated otherwise.
            </p>
          </div>

          {/* Section 6: Shipping Policy */}
          <div>
            <h2 className="text-3xl font-bold text-[#262626] mt-10 mb-4">6. Shipping Policy</h2>
            <p className="mb-4">
              Free standard shipping applies to all orders across the United States.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Standard order processing time is 1 business day.</li>
              <li>Domestic USA transit time is 1 to 3 business days after shipment.</li>
              <li>Total estimated domestic USA delivery time is 2 to 4 business days after order placement.</li>
              <li>All orders qualify for free standard shipping with no minimum spend required.</li>
              <li>Tracking information is sent to the customer via email once the order ships.</li>
            </ul>
            <p className="mt-4">
              Cokaro is not responsible for delays caused by carriers or incorrect shipping information provided by the customer.
            </p>
          </div>

          {/* Section 7: Payment Terms */}
          <div>
            <h2 className="text-3xl font-bold text-[#262626] mt-10 mb-4">7. Payment Terms</h2>
            <p className="mb-4">We accept the following payment methods:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Credit and debit cards (Visa, Mastercard, American Express, Discover)</li>
              <li>PayPal</li>
              <li>Apple Pay</li>
              <li>Google Pay</li>
            </ul>
            <p className="mt-4">
              All payments must be received in full before an order is processed.
            </p>
          </div>

          {/* Section 8: Returns and Customer Support */}
          <div>
            <h2 className="text-3xl font-bold text-[#262626] mt-10 mb-4">8. Returns and Customer Support</h2>
            <p className="mb-4">Your satisfaction is our priority.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>We offer a 30-day return policy for eligible items.</li>
              <li>Items must be returned in the same condition received.</li>
              <li>Refunds are issued after the item passes inspection at our warehouse.</li>
              <li>Exchanges are available when inventory permits.</li>
              <li>We work quickly to resolve any concerns, disputes, or issues.</li>
            </ul>
            <p className="mt-4">
              Marketplace seller products follow the same return process unless specifically stated otherwise.
            </p>
          </div>

          {/* Section 9: Limitation of Liability */}
          <div>
            <h2 className="text-3xl font-bold text-[#262626] mt-10 mb-4">9. Limitation of Liability</h2>
            <p className="mb-4">
              Cokaro is not liable for indirect, incidental, punitive, or consequential damages arising from your use of our services, products, or platform.
            </p>
            <p>
              However, we are committed to resolving legitimate customer concerns and will work with you to reach a fair and reasonable solution.
            </p>
          </div>

          {/* Section 10: Fraud Prevention and Compliance */}
          <div>
            <h2 className="text-3xl font-bold text-[#262626] mt-10 mb-4">10. Fraud Prevention and Compliance</h2>
            <p className="mb-4">
              Cokaro monitors orders for unusual activity to protect customers and sellers.
            </p>
            <p className="mb-4">
              We reserve the right to cancel or delay orders suspected of fraud or unauthorized use of payment methods.
            </p>
            <p>
              Creating false accounts, listing products fraudulently, or misrepresenting product ownership is strictly prohibited.
            </p>
          </div>

          {/* Section 11: Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-[#262626] mt-10 mb-4">11. Contact Information</h2>
            <p className="mb-4">
              If you have questions about these Terms of Service, please contact us.
            </p>
            <div className="bg-gray-50 rounded-lg p-6 space-y-3">
              <div>
                <div className="font-medium text-[#262626] mb-1">Phone:</div>
                <div className="text-gray-600">+1 (913) 593-7677</div>
              </div>
              <div>
                <div className="font-medium text-[#262626] mb-1">Email:</div>
                <div className="text-gray-600">contact@cokaro.com</div>
              </div>

              <div>
                <div className="font-medium text-[#262626] mb-1">Address:</div>
                <div className="text-gray-600">1239 N Washington Ave, Wichita, KS 67214, USA</div>
              </div>
              <div>
                <div className="font-medium text-[#262626] mb-1">Hours:</div>
                <div className="text-gray-600">Monday to Friday, 9:00 AM to 5:00 PM CT</div>
                <div className="text-gray-600">Saturday, 10:00 AM to 3:00 PM CT</div>
                <div className="text-gray-600">Sunday, Closed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage; 
