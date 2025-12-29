import React from 'react';
import Image from 'next/image';

const HowItWorks = () => {
  return (
    <section className="bg-white py-20 px-5 md:px-10 lg:px-20 overflow-hidden">
      <div className="max-w-[1280px] mx-auto">
        <div 
          className="bg-[#C1EAC5] rounded-[2.5rem] py-20 px-8 md:py-32 md:px-16 lg:px-24 text-center flex flex-col items-center justify-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #c1eac5 0%, #ffffff 100%)',
          }}
        >
          {/* Subtitle */}
          <span className="text-[#1A4326] text-sm font-medium mb-6 uppercase tracking-wider block">
            How Taxi-Quebec works
          </span>

          {/* Large Main Text */}
          <h2 className="text-[#1A4326] text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] leading-[1.1] font-semibold max-w-[1000px] text-balance">
            Users open the Taxi-Quebec app and request a ride in seconds using real-time
            <span className="inline-flex items-center mx-4 align-middle translate-y-[-0.05em]">
              <span className="bg-[#C1EAC5]/30 p-2 rounded-full inline-block">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f83ba8d-f0a0-4809-ab5a-731f63b1a4df-rido-template-framer-website/assets/svgs/l3TVOZvY0lHxllXhIP0pL5caRJQ-8.svg"
                  alt="Globe Icon"
                  width={48}
                  height={48}
                  className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
                />
              </span>
            </span>
            location data.
          </h2>

          {/* Background Decorative Element (Optional based on visual but matches "How it works" structure) */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            {/* Soft gradient radial overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.8)_0%,_transparent_70%)]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;