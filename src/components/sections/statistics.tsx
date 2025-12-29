import React from 'react';
import Image from 'next/image';

const StatisticsSection = () => {
  const stats = [
    {
      number: "60K+",
      label: "Rides completed monthly",
    },
    {
      number: "98%",
      label: "Customer satisfaction rate",
    },
    {
      number: "15+",
      label: "Cities served and growing",
    },
    {
      number: "4K+",
      label: "Active drivers on the road",
    },
  ];

  return (
    <section className="relative w-full min-h-[600px] flex items-center overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f83ba8d-f0a0-4809-ab5a-731f63b1a4df-rido-template-framer-website/assets/images/fbZxhdlAF6v05fOj0ha19BXQBAw-2.jpg"
          alt="Taxi background"
          fill
          className="object-cover object-center scale-105"
          priority
        />
          {/* Dark Green Gradient Overlay */}
          <div 
            className="absolute inset-0 bg-primary/70"
            style={{
              background: 'linear-gradient(rgba(0, 71, 255, 0.75), rgba(0, 71, 255, 0.55))'
            }}
          />
        </div>
  
        {/* Content Container */}
        <div className="container relative z-10 py-24 md:py-32 flex flex-col items-center">
          {/* Header Text */}
          <div className="w-full max-w-2xl ml-auto text-right mb-20 md:mb-32">
            <h2 className="text-white text-3xl md:text-[54px] font-semibold leading-tight mb-6">
              Built for the city.<br />
              Designed for you.
            </h2>
            <p className="text-white/80 text-lg md:text-xl max-w-md ml-auto">
              Whether rushing to a meeting or heading out, Taxi-Quebec is always here to move you forward.
            </p>
          </div>
  
          {/* Divider Line */}
          <div className="w-full h-[1px] bg-white/20 mb-12" />
  
          {/* Statistics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 w-full">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-start gap-6">
                {/* Green Accent Indicator */}
                <div className="w-3 h-3 bg-secondary rounded-sm" />
              
              <div className="flex flex-col">
                <span className="text-white text-5xl md:text-6xl font-bold tracking-tight mb-3">
                  {stat.number}
                </span>
                <span className="text-white/70 text-base md:text-lg font-medium">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;