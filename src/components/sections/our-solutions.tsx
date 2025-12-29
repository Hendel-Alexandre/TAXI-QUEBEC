"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  IconBriefcase, 
  IconAccessible, 
  IconCalendar, 
  IconPlane,
  IconCar,
  IconTool,
  IconBox,
  IconChevronDown
} from '@tabler/icons-react';

/**
 * OurSolutions
 * Reconstruit selon le design de l'image avec vidéo intégrée.
 */
const OurSolutions = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const videoUrl = "https://pub-3e21382aae8a467b9aa834e295a744cd.r2.dev/4404160-uhd_3840_2160_24fps.mp4";

  const solutions = [
    {
      title: "Service de Taxi Général",
      description: "Trajets locaux ou longue distance, réservations immédiates ou planifiées. Taxi Québec vous accompagne 24/7 avec des chauffeurs professionnels et ponctuels.",
      icon: <IconCar size={24} strokeWidth={1.5} className="text-slate-700" />
    },
    {
      title: "Transport Corporatif & Événementiel",
      description: "Solutions de transport pour entreprises, employés et événements. Facturation corporative, confort et fiabilité au rendez-vous.",
      icon: <IconBriefcase size={24} strokeWidth={1.5} className="text-slate-700" />
    },
    {
      title: "Transport Adapté & Thérapeutique",
      description: "Vans accessibles avec rampe et arrimage sécurisé pour les personnes à mobilité réduite. Transport médical et thérapeutique offert avec accompagnement humain.",
      icon: <IconAccessible size={24} strokeWidth={1.5} className="text-slate-700" />
    },
    {
      title: "Transferts & Navettes Aéroport",
      description: "Transferts aéroportuaires et navettes 24/7 vers et depuis Québec et les environs. Ponctualité et tranquillité d’esprit garanties.",
      icon: <IconPlane size={24} strokeWidth={1.5} className="text-slate-700" />
    },
    {
      title: "Dépannage & Assistance Routière",
      description: "Survoltage de batterie, déverrouillage de portières, clés perdues et assistance rapide, quand vous en avez besoin.",
      icon: <IconTool size={24} strokeWidth={1.5} className="text-slate-700" />
    },
    {
      title: "Livraison & Services Spéciaux",
      description: "Livraison urgente de documents, colis ou pièces, raccompagnement sécuritaire et aide pour commissions quotidiennes.",
      icon: <IconBox size={24} strokeWidth={1.5} className="text-slate-700" />
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          <div className="lg:col-span-5 relative w-full aspect-square lg:aspect-[4/5] overflow-hidden rounded-br-2xl shadow-2xl order-2 lg:order-1">
            <div className="absolute inset-0 z-10 pointer-events-none rounded-tl-[100px] md:rounded-tl-[150px] border-l-[1px] border-t-[1px] border-white/10" />
            
            <video 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="absolute inset-0 w-full h-full object-cover rounded-tl-[100px] md:rounded-tl-[150px]"
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
          </div>

          <div className="lg:col-span-7 flex flex-col space-y-6 lg:space-y-8 order-1 lg:order-2">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                Nos Solutions de Transport
              </h2>
              <p className="text-slate-500 mt-2 text-sm md:text-base">
                Découvrez notre gamme complète de services adaptés à tous vos besoins.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 md:gap-y-8">
              {solutions.map((item, index) => {
                const isOpen = openIndex === index;
                
                return (
                  <div 
                    key={index} 
                    className="flex flex-col md:flex-row items-start gap-4 group cursor-pointer md:cursor-default"
                    onClick={() => {
                      if (window.innerWidth < 768) {
                        setOpenIndex(isOpen ? null : index);
                      }
                    }}
                  >
                    <div className="flex items-start gap-4 w-full">
                      <div className="shrink-0 p-2 bg-slate-50 rounded-lg group-hover:bg-[#3b66d4]/10 transition-colors">
                        {item.icon}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between w-full">
                          <h3 className="text-[15px] font-bold text-slate-900 tracking-tight leading-tight">
                            {item.title}
                          </h3>
                          {/* Arrow only on mobile */}
                          <div className="md:hidden">
                            <motion.div
                              animate={{ rotate: isOpen ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                              className="text-slate-400"
                            >
                              <IconChevronDown size={18} />
                            </motion.div>
                          </div>
                        </div>
                        
                        {/* Description - Desktop always shows, Mobile follows state */}
                        <div className="hidden md:block">
                          <p className="text-xs text-slate-500 leading-snug">
                            {item.description}
                          </p>
                        </div>
                        
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="md:hidden overflow-hidden"
                            >
                              <p className="text-xs text-slate-500 leading-snug py-1">
                                {item.description}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>


          </div>

        </div>
      </div>
    </section>
  );
};

export default OurSolutions;
