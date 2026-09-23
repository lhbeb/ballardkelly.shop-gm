import React from 'react';
import Image from 'next/image';
import { Instagram, ExternalLink } from 'lucide-react';

const InstagramSection: React.FC = () => {
  return (
    <section className="py-8 bg-white border-t border-gray-100">
      <div className="w-full px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-6">
              {/* Profile Info */}
              <div className="flex items-center space-x-4">
                {/* Profile Picture */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-tr from-[#1f5a46] via-[#5f8f7a] to-[#c8942f] rounded-full p-0.5 flex-shrink-0">
                  <div className="w-full h-full bg-white rounded-full overflow-hidden p-2">
                    <Image
                      src="/logosvg.svg"
                      alt="Ballard Kelly profile"
                      width={80}
                      height={80}
                      className="object-contain w-full h-full"
                    />
                  </div>
                </div>

                {/* Profile Details */}
                <div className="flex-grow">
                  <h3 className="font-bold text-[#262626] text-lg sm:text-xl mb-1">@ballardkelly.shop</h3>
                  <p className="text-gray-600 text-sm sm:text-base mb-2">Ballard Kelly</p>

                  {/* Statistics */}
                  <div className="flex items-center space-x-4 sm:space-x-6 text-sm">
                    <div className="text-center">
                      <div className="font-bold text-[#262626]">8</div>
                      <div className="text-gray-500 text-xs">posts</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-[#262626]">1,423</div>
                      <div className="text-gray-500 text-xs">followers</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-[#262626]">10</div>
                      <div className="text-gray-500 text-xs">following</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Follow Us Button */}
              <div className="flex-shrink-0">
                <a
                  href="https://www.instagram.com/ballardkelly_shop/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-[#1f5a46] hover:bg-[#174434] text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <Instagram className="h-5 w-5 mr-2" />
                  <span className="hidden sm:inline">Follow Us</span>
                  <span className="sm:hidden">Follow</span>
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;
