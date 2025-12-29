"use client";

import React from 'react';
import Image from 'next/image';
import { IconStarFilled } from '@tabler/icons-react';

const ReviewsSection = () => {
  const reviews = [
    {
      id: 1,
      text: "Great experience! Booking was seamless, the driver arrived on time, and the car was spotless. I’ll definitely ride with Taxi-Quebec again!",
      author: "Michael Carter",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f83ba8d-f0a0-4809-ab5a-731f63b1a4df-rido-template-framer-website/assets/images/7waeSbtJpIfuwzQqwqmSkzCYQk-9.webp",
    },
    {
      id: 2,
      text: "Perfect ride! A punctual and reliable driver, clean vehicle, and smooth trip. I’ll ride with Taxi-Quebec again unhesitatingly!",
      author: "Sarah Lenor",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f83ba8d-f0a0-4809-ab5a-731f63b1a4df-rido-template-framer-website/assets/images/kUA6fJsMOrZyjImaWzxmcpr6kk-10.webp",
    },
    {
      id: 3,
      text: "Fantastic ride! The driver was polite, the trip was comfortable, and everything went smoothly. I would highly recommend Taxi-Quebec!",
      author: "Mike Thompson",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f83ba8d-f0a0-4809-ab5a-731f63b1a4df-rido-template-framer-website/assets/images/JjWWJ468LEdG3RbvDyGaM0ijg-11.webp",
    },
  ];

  const logos = [
    { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f83ba8d-f0a0-4809-ab5a-731f63b1a4df-rido-template-framer-website/assets/svgs/n952dEMweFu0sHMteZxj8N9ezEk-15.svg", alt: "Logoipsum 1" },
    { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f83ba8d-f0a0-4809-ab5a-731f63b1a4df-rido-template-framer-website/assets/svgs/TQJ2TADoLq88gMFcVWjWxHxv80-16.svg", alt: "Logoipsum 2" },
    { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f83ba8d-f0a0-4809-ab5a-731f63b1a4df-rido-template-framer-website/assets/svgs/wnlZgzIXO8DJLvOlBg8TQ5T43g-17.svg", alt: "Logoipsum 3" },
    { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f83ba8d-f0a0-4809-ab5a-731f63b1a4df-rido-template-framer-website/assets/svgs/ArOdy8YCxPwsiQKpBXXlIU1hrU-18.svg", alt: "Logoipsum 4" },
    { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2f83ba8d-f0a0-4809-ab5a-731f63b1a4df-rido-template-framer-website/assets/svgs/t4XbzdY2zlvkyyFlCmU2pH0QA-19.svg", alt: "Logoipsum 5" },
  ];

  return (
    <section className="bg-mint-gradient py-20 px-5 md:px-10 lg:px-20 overflow-hidden">
      <div className="max-w-[1280px] mx-auto">
        {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="flex flex-col gap-4">
              <span className="text-[#4D4D4D] text-lg font-medium">Customer reviews</span>
              <h2 className="text-[#1A1A1A] text-4xl md:text-5xl font-semibold tracking-tight">
                Why people trust Taxi-Quebec.
              </h2>
            </div>
            <a
              href="/reviews"
              className="inline-flex items-center justify-center bg-primary text-secondary px-8 py-4 rounded-[1rem] font-medium text-lg hover:opacity-90 transition-opacity w-fit"
            >
              Read more
            </a>
          </div>
  
          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-secondary rounded-[1.5rem] p-8 flex flex-col justify-between h-full min-h-[320px]"
              >
                <div>
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <IconStarFilled
                          key={i}
                          className="w-5 h-5 text-primary"
                        />
                      ))}
                    </div>
                  <p className="text-primary text-lg leading-relaxed mb-8">
                    {review.text}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={review.image}
                      alt={review.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-primary font-semibold text-lg">
                    {review.author}
                  </span>
                </div>
              </div>
            ))}
          </div>
  
          {/* Statistics and Marquee Section */}
          <div className="flex flex-col items-center">
              <div className="flex flex-col items-center gap-3 mb-12">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <IconStarFilled
                      key={i}
                      className="w-4 h-4 text-primary"
                    />
                  ))}
                </div>
              <p className="text-[#4D4D4D] font-medium">
                More than 5M+ satisfied clients
              </p>
            </div>

          {/* Logo Marquee */}
          <div className="w-full relative flex overflow-x-hidden">
            <div className="flex animate-infinite-scroll whitespace-nowrap py-4 items-center">
              {/* First set of logos */}
              {logos.map((logo, index) => (
                <div key={index} className="mx-8 md:mx-12 flex-shrink-0 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-8 w-auto object-contain"
                  />
                </div>
              ))}
              {/* Duplicate set for seamless looping */}
              {logos.map((logo, index) => (
                <div key={`dup-${index}`} className="mx-8 md:mx-12 flex-shrink-0 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-8 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;