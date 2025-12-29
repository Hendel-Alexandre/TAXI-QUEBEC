"use client";

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/lib/language-context';

export default function CarRentals() {
  const { t } = useLanguage();

  const fleetData = [
    {
      id: 'standard-sedan',
      title: t.carRentals.sedan,
      description: t.carRentals.sedanDesc,
      image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f83ba8d-f0a0-4809-ab5a-731f63b1a4df-rido-template-framer-website/assets/images/L1609GPPmv386CJ9Fk4v03Vmw-5.png',
      alt: 'White sedan isometric view'
    },
    {
      id: 'executive-suv',
      title: t.carRentals.suv,
      description: t.carRentals.suvDesc,
      image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f83ba8d-f0a0-4809-ab5a-731f63b1a4df-rido-template-framer-website/assets/images/u2NBVQDvo9VEI2Rp8xQuKKeLKw-6.png',
      alt: 'White SUV isometric view'
    },
    {
      id: 'family-van',
      title: t.carRentals.van,
      description: t.carRentals.vanDesc,
      image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f83ba8d-f0a0-4809-ab5a-731f63b1a4df-rido-template-framer-website/assets/images/n29hj9GG3eNGlrdys29z2zooI-7.png',
      alt: 'White van isometric view'
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-5">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <span className="text-[#4d4d4d] text-sm font-medium mb-3 block">
                {t.carRentals.badge}
              </span>
              <h2 className="text-[#1a1a1a] text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
                {t.carRentals.title}
              </h2>
            </div>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {fleetData.map((car) => (
              <div 
                key={car.id} 
                className="group bg-muted rounded-[24px] overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg"
              >
              <div className="relative pt-12 px-8 flex justify-center items-center h-[260px]">
                <div className="relative w-full h-full flex justify-center items-center">
                  <Image
                    src={car.image}
                    alt={car.alt}
                    width={320}
                    height={200}
                    className="object-contain transform transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                </div>
              </div>

              <div className="p-8 pt-4 flex flex-col flex-grow">
                <h5 className="text-[#1a1a1a] text-xl font-bold mb-2">
                  {car.title}
                </h5>
                <p className="text-[#4d4d4d] text-sm">
                  {car.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
