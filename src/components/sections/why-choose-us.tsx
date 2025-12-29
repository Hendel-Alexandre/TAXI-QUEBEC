"use client";

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/lib/language-context';
import { motion, useReducedMotion } from 'framer-motion';

const WhyChooseUs = () => {
    const { t } = useLanguage();
    const shouldReduceMotion = useReducedMotion();

    // Animation settings for a "Luxury/Professional" feel
    const animationSettings = (duration: number, xRange: number[], yRange: number[]) => ({
        animate: shouldReduceMotion ? {} : {
            x: xRange,
            y: yRange,
            rotate: [0, 0.5, 0], // Very subtle tilt to simulate road surface
        },
        transition: {
            duration: duration,
            repeat: Infinity,
            repeatType: "mirror" as const,
            ease: "easeInOut",
        }
    });

    return (
      <section className="w-full bg-white py-[60px] md:py-[100px] lg:py-[140px] px-5 sm:px-10">
        <div className="container mx-auto max-w-[1280px]">
          {/* Added relative and overflow-hidden to ensure cars stay in bounds */}
          <div className="relative w-full bg-[#3b66d4] rounded-[24px] overflow-hidden min-h-[460px] md:min-h-[500px] flex flex-col md:flex-row items-center p-8 md:p-16 lg:p-20 shadow-2xl">
            
            <div className="relative z-10 w-full md:w-1/2 flex flex-col items-start gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-yellow-400 text-sm md:text-base font-black italic uppercase tracking-widest">
                  {t.whyChooseUs.badge}
                </span>
                <h2 className="text-white text-3xl md:text-4xl lg:text-[48px] font-black italic tracking-tighter leading-[1.1] max-w-[480px] uppercase">
                  {t.whyChooseUs.title}
                </h2>
              </div>
              
              <div className="flex flex-wrap items-center gap-6 mt-2">
                {[
                  { icon: "bTOROwAiEgAXOzoDblKJnU5eTM-9.svg", label: t.whyChooseUs.safe },
                  { icon: "TKqUHVJrUzMiYf8kuMvKRGEEJ9w-10.svg", label: t.whyChooseUs.payments },
                  { icon: "8W4poMSOPIrD1QByExb8OHSCvk-11.svg", label: t.whyChooseUs.availability }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-4 h-4 relative">
                      <Image 
                        src={`https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f83ba8d-f0a0-4809-ab5a-731f63b1a4df-rido-template-framer-website/assets/svgs/${item.icon}`}
                        alt={item.label}
                        fill
                        className="object-contain brightness-0 invert"
                      />
                    </div>
                    <span className="text-white text-[14px] md:text-[15px] font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative w-full md:w-1/2 h-[300px] md:h-full flex items-center justify-end mt-12 md:mt-0">
              <div className="relative w-full max-w-[500px] h-full flex items-center justify-center pointer-events-none">
                
                {/* White Car - Top Left - Faster and slightly more drift */}
                <motion.div 
                  {...animationSettings(8, [-15, 15], [-8, 8])}
                  className="absolute top-[10%] left-[5%] md:left-[10%] w-[55%] md:w-[60%] aspect-[484/348] z-10"
                >
                  <Image 
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f83ba8d-f0a0-4809-ab5a-731f63b1a4df-rido-template-framer-website/assets/images/McqHJQ30EVGG5zjtxjnm43714vs-3.png"
                    alt="3D White Car"
                    fill
                    className="object-contain"
                    priority
                  />
                </motion.div>
                
                {/* Black Car - Bottom Right - Slower for parallax depth */}
                <motion.div 
                  {...animationSettings(12, [20, -10], [5, -5])}
                  className="absolute bottom-[10%] right-0 w-[55%] md:w-[60%] aspect-[484/348] z-20"
                >
                  <Image 
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f83ba8d-f0a0-4809-ab5a-731f63b1a4df-rido-template-framer-website/assets/images/lOEJyirFcRcmpXOQqisihG3eXc-4.png"
                    alt="3D Black Car"
                    fill
                    className="object-contain"
                    priority
                  />
                </motion.div>

              </div>
            </div>
            
            {/* Soft decorative glow */}
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
          </div>
        </div>
      </section>
    );
};

export default WhyChooseUs;