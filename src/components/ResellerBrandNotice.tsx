const catalogMarks =
  'Briggs & Stratton, Craftsman, Cub Cadet, DEWALT, EGO, Greenworks, Honda, Husqvarna, and other product or model marks shown in our catalog';

interface ResellerBrandNoticeProps {
  compact?: boolean;
}

export default function ResellerBrandNotice({ compact = false }: ResellerBrandNoticeProps) {
  return (
    <section className={`${compact ? 'rounded-xl p-5' : 'rounded-2xl p-6 sm:p-8'} border border-[#0a3075]/10 bg-white shadow-sm`}>
      <h2 className={`${compact ? 'text-lg' : 'text-2xl'} font-bold text-[#262626]`}>
        Independent Reseller & Brand Marks Notice
      </h2>
      <p className="mt-3 text-sm leading-7 text-gray-600 sm:text-base">
        Cokaro is an independent ecommerce seller and reseller of outdoor power, lawn, backyard, home-care, and farm-care equipment. Some listings may come through authorized reseller or supplier relationships where applicable; others may come through verified resale, marketplace partner, private seller, auction, wholesale, liquidation, or overstock channels.
      </p>
      <p className="mt-3 text-sm leading-7 text-gray-600 sm:text-base">
        Product names, brand names, logos, and marks including {catalogMarks} are used only to identify the products offered for sale. Each mark remains the property of its respective owner, and use of those marks does not imply manufacturer affiliation, sponsorship, or endorsement unless Cokaro expressly states that relationship for a specific listing.
      </p>
    </section>
  );
}
