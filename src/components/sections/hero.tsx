"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { IconPhone, IconAlertCircle } from '@tabler/icons-react';
import { useLanguage } from '@/lib/language-context';
import { useBooking } from '@/hooks/use-booking';

const AddressSearch = dynamic(() => import('@/components/ui/address-search'), {
  ssr: false,
  loading: () => <div className="h-[52px] bg-gray-100 animate-pulse rounded-xl" />
});

const HeroSection: React.FC = () => {
    const { t } = useLanguage();
    const { open } = useBooking();
    const [pickupAddress, setPickupAddress] = useState('');
    const [error, setError] = useState<string | null>(null);

    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || 'pk.eyJ1Ijoibm90aXF3ZWIiLCJhIjoiY21qbmh0cHpjMjMxMDNlcHVtYTRwbnh0ZSJ9.iO05cR0OUNaiA4sG7ghvuQ';

    const handleInitialReserve = () => {
      if (!pickupAddress) return;
      const normalized = pickupAddress.toLowerCase();
      const isQuebec = normalized.includes('québec') || normalized.includes('quebec') || normalized.includes('lévis') || normalized.includes('levis');
      
      if (!isQuebec) {
        setError(t.hero.outsideQuebecError);
        setTimeout(() => setError(null), 5000);
        return;
      }
      setError(null);
      open({ pickupAddress });
    };

    return (
      <section className="relative w-full text-white min-h-[80vh] flex items-center pt-28 pb-12 lg:pt-36 lg:pb-24 overflow-hidden">
        {/* Background Video with Darker Overlay */}
        <div className="absolute inset-0 z-0">
            <video autoPlay muted loop playsInline className="w-full h-full object-cover">
              <source src="https://pub-3e21382aae8a467b9aa834e295a744cd.r2.dev/4K%20Taxi%20_%20Driving%20_%20Emergency%20Vehicle%20_%20Pov%20_%20Free%20Stock%20Video%20Footage.mp4" type="video/mp4" />
            </video>
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
              <div className="lg:col-span-8 flex flex-col space-y-7">
                
                <div className="space-y-4">
                  {/* Title using Praga-Style Branding */}
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-black italic tracking-tighter uppercase leading-[0.9] drop-shadow-xl">
                    {t.hero.title}
                  </h1>
                  
                  <p className="text-sm md:text-base text-white/80 max-w-xl leading-relaxed font-medium">
                    {t.hero.description}
                  </p>
                </div>

                  {/* Call Direct - Unified Yellow/Blue Style */}
                  <div className="flex">
                      <a 
                        href="tel:+14184764442" 
                        className="flex items-center gap-4 bg-yellow-400 hover:bg-yellow-300 text-blue-900 px-5 py-3 rounded-2xl shadow-xl transition-all active:scale-95 border-b-4 border-yellow-600/30 group"
                      >
                        <div className="bg-blue-900 p-2 rounded-xl text-white group-hover:rotate-12 transition-transform">
                          <IconPhone size={22} strokeWidth={2.5} fill="currentColor" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black uppercase tracking-widest leading-none mb-1 opacity-80">{t.hero.callDirect}</span>
                          <span className="text-xl md:text-2xl font-black leading-none tracking-tight">(418) 476-4442</span>
                        </div>
                      </a>
                  </div>

                {/* Search Bar - App-like look */}
                <div className="bg-white/95 backdrop-blur-md p-2 rounded-2xl shadow-2xl w-full max-w-xl border border-white/20">
                  <div className="flex flex-col md:flex-row gap-2 relative">
                    <div className="flex-1">
                      <AddressSearch 
                        accessToken={mapboxToken} 
                        placeholder={t.hero.pickupPlaceholder}
                        onSelect={(address) => setPickupAddress(address)}
                      />
                      {error && (
                        <div className="absolute top-full left-0 right-0 mt-3 bg-red-50 text-red-600 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg border border-red-100">
                          <IconAlertCircle size={16} />
                          {error}
                        </div>
                      )}
                    </div>
                    
                    <Button 
                      onClick={handleInitialReserve}
                      disabled={!pickupAddress}
                      className="bg-[#3b66d4] hover:bg-blue-700 text-white h-[52px] px-8 rounded-xl text-sm font-bold shadow-lg shadow-blue-500/30 transition-all shrink-0 active:scale-95"
                    >
                      {t.hero.bookButton}
                    </Button>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </section>
    );
};

export default HeroSection;
