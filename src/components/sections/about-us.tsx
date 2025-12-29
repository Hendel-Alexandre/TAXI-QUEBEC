"use client";

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/lib/language-context';

const AboutUs = () => {
    const { t } = useLanguage();

    return (
      <section 
        className="bg-secondary py-[120px] md:py-[160px] px-5 md:px-[50px] overflow-hidden" 
      >
        <div className="max-w-[1360px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20">
            <div className="max-w-[720px]">
              <h2 className="text-[48px] md:text-[54px] font-semibold leading-[1.1] text-[#1A1A1A] tracking-[-0.02em] mb-6">
                {t.aboutUs.title}
              </h2>
              <p className="text-[18px] leading-[1.6] text-[#4D4D4D]">
                {t.aboutUs.description}
              </p>
            </div>
            <div className="flex-shrink-0">
              <a 
                href="/about-us" 
                className="inline-flex items-center justify-center bg-primary text-secondary px-8 py-4 rounded-[12px] font-medium text-[18px] transition-transform hover:scale-105 active:scale-95"
              >
                {t.aboutUs.cta}
              </a>
            </div>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-10 rounded-[24px] shadow-[0px_10px_30px_rgba(0,0,0,0.02)] flex flex-col h-full border border-gray-100">
              <div className="w-[68px] h-[68px] bg-muted rounded-[16px] flex items-center justify-center mb-8">
                <Image 
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f83ba8d-f0a0-4809-ab5a-731f63b1a4df-rido-template-framer-website/assets/svgs/JX6R4dXxwA7l4btductCUgdlJw-5.svg" 
                  alt="Benefit Icon" 
                  width={34} 
                  height={34}
                  className="w-[34px] h-[34px]"
                />
              </div>
              <div>
                <h4 className="text-[24px] font-semibold text-[#1A1A1A] mb-4">
                  {t.aboutUs.bookingTitle}
                </h4>
                <p className="text-[16px] leading-[1.6] text-[#4D4D4D]">
                  {t.aboutUs.bookingDesc}
                </p>
              </div>
            </div>
  
            <div className="bg-white p-10 rounded-[24px] shadow-[0px_10px_30px_rgba(0,0,0,0.02)] flex flex-col h-full border border-gray-100">
              <div className="w-[68px] h-[68px] bg-muted rounded-[16px] flex items-center justify-center mb-8">
                <Image 
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f83ba8d-f0a0-4809-ab5a-731f63b1a4df-rido-template-framer-website/assets/svgs/Fy3Zsb7NKst0Ih9SEy1RTRmRPn0-6.svg" 
                  alt="Person Icon" 
                  width={34} 
                  height={34}
                  className="w-[34px] h-[34px]"
                />
              </div>
              <div>
                <h4 className="text-[24px] font-semibold text-[#1A1A1A] mb-4">
                  {t.aboutUs.trackingTitle}
                </h4>
                <p className="text-[16px] leading-[1.6] text-[#4D4D4D]">
                  {t.aboutUs.trackingDesc}
                </p>
              </div>
            </div>
  
            <div className="bg-white p-10 rounded-[24px] shadow-[0px_10px_30px_rgba(0,0,0,0.02)] flex flex-col h-full border border-gray-100">
              <div className="w-[68px] h-[68px] bg-muted rounded-[16px] flex items-center justify-center mb-8">
                <Image 
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f83ba8d-f0a0-4809-ab5a-731f63b1a4df-rido-template-framer-website/assets/svgs/rfvte13A1oJB4YlOGKG8lpIVob0-7.svg" 
                  alt="Statistics Icon" 
                  width={34} 
                  height={34}
                  className="w-[34px] h-[34px]"
                />
              </div>
              <div>
                <h4 className="text-[24px] font-semibold text-[#1A1A1A] mb-4">
                  {t.aboutUs.driversTitle}
                </h4>
                <p className="text-[16px] leading-[1.6] text-[#4D4D4D]">
                  {t.aboutUs.driversDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
};

export default AboutUs;
