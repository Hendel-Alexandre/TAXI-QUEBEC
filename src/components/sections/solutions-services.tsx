"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  IconBriefcase, 
  IconAccessible, 
  IconCalendar, 
  IconPlane 
} from '@tabler/icons-react';

/**
 * SolutionsServicesSection
 * Reconstruit selon le design de l'image avec vidéo intégrée.
 */
const SolutionsServicesSection = () => {
  const videoUrl = "https://pub-3e21382aae8a467b9aa834e295a744cd.r2.dev/4404160-uhd_3840_2160_24fps.mp4";

  const solutions = [
    {
      title: "Service de Taxi Général",
      description: "Que vous ayez besoin d'un trajet en ville ou vers l'aéroport, Taxi Nomade vous assure un service professionnel et ponctuel.",
      icon: <IconPlane size={28} strokeWidth={1.5} className="text-slate-700" />
    },
    {
      title: "Service de Taxi Corporatif",
      description: "Les professionnels occupés comptent sur nous pour arriver à l'heure. Taxi Nomade propose des solutions de transport d'affaires confortables et ponctuelles.",
      icon: <IconBriefcase size={28} strokeWidth={1.5} className="text-slate-700" />
    },
      {
        title: "Service de Taxi Adapté",
        description: "Nous offrons des taxis accessibles pour les personnes à mobilité réduite. Nos véhicules sont équipés pour un transport sûr et confortable.",
        icon: <IconAccessible size={28} strokeWidth={1.5} className="text-slate-700" />
      }
  ];

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <div className="relative w-full aspect-square lg:aspect-[4/5] overflow-hidden rounded-br-2xl shadow-2xl">
            <div className="absolute inset-0 z-10 pointer-events-none rounded-tl-[100px] md:rounded-tl-[200px] border-l-[1px] border-t-[1px] border-white/10" />
            
            <video 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="absolute inset-0 w-full h-full object-cover rounded-tl-[100px] md:rounded-tl-[200px]"
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
          </div>

          <div className="flex flex-col space-y-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                Nos Solutions
              </h2>
            </div>

            <div className="space-y-8">
              {solutions.map((item, index) => (
                <div key={index} className="flex items-start gap-6 group">
                  <div className="shrink-0 mt-1 p-2 bg-slate-50 rounded-lg group-hover:bg-[#3b66d4]/10 transition-colors">
                    {item.icon}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm md:text-base text-slate-500 leading-relaxed max-w-md">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Button 
                className="w-full md:w-auto bg-[#3b66d4] hover:bg-blue-700 text-white font-bold h-14 px-10 rounded-xl text-base shadow-lg shadow-blue-900/20 active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                <IconCalendar size={20} />
                Réservez Votre Trajet Dès Maintenant
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SolutionsServicesSection;
