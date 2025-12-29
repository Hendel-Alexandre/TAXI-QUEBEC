"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { 
  IconCar, IconUser, IconUsers, 
  IconCalendar, IconClock, IconCheck, IconChevronRight,
  IconPlane, IconTool, IconWheelchair, IconBox, IconBolt
} from '@tabler/icons-react';
import { useLanguage } from '@/lib/language-context';
import { useBooking } from '@/hooks/use-booking';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from '@/lib/utils';

const AddressSearch = dynamic(() => import('@/components/ui/address-search'), {
  ssr: false,
  loading: () => <div className="h-[52px] bg-gray-100 animate-pulse rounded-xl" />
});

const BookingDialog: React.FC = () => {
  const { t } = useLanguage();
  const { isOpen, close, initialData } = useBooking();
  
  const [isBooked, setIsBooked] = useState(false);
  const [pickupAddress, setPickupAddress] = useState('');
  const [dropoffAddress, setDropoffAddress] = useState('');
  const [selectedService, setSelectedService] = useState('taxi');
  const [selectedCar, setSelectedCar] = useState('standard');
  const [bookingDate, setBookingDate] = useState(new Date().toISOString().split('T')[0]);
  const [bookingTime, setBookingTime] = useState('12:00');
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (initialData?.pickupAddress) {
      setPickupAddress(initialData.pickupAddress);
    }
  }, [initialData]);

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || 'pk.eyJ1Ijoibm90aXF3ZWIiLCJhIjoiY21qbmh0cHpjMjMxMDNlcHVtYTRwbnh0ZSJ9.iO05cR0OUNaiA4sG7ghvuQ';

  const services = [
    { id: 'taxi', name: t.services.immediateTaxi, icon: <IconBolt size={20} /> },
    { id: 'airport', name: t.services.airport, icon: <IconPlane size={20} /> },
    { id: 'assistance', name: "ASSISTANCE ROUTIÈRE", icon: <IconTool size={20} /> },
    { id: 'adapted', name: t.services.specialized, icon: <IconWheelchair size={20} /> },
    { id: 'delivery', name: t.services.delivery, icon: <IconBox size={20} /> },
  ];

  const carOptions = [
    { id: 'standard', name: t.hero.carOptions.standard, icon: <IconCar size={24} />, capacity: 4 },
    { id: 'comfort', name: t.hero.carOptions.comfort, icon: <IconUser size={24} />, capacity: 4 },
    { id: 'van', name: t.hero.carOptions.van, icon: <IconUsers size={24} />, capacity: 6 },
  ];

  const handleConfirmInfo = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
    setTimeout(() => {
      setIsBooked(false);
      close();
      setStep(1);
    }, 5000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="sm:max-w-[480px] p-0 bg-white text-slate-900 rounded-[2rem] border-none shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {isBooked ? (
          <div className="py-20 text-center space-y-4 animate-in zoom-in duration-300 px-6">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <IconCheck size={40} strokeWidth={3} />
            </div>
            <h3 className="text-2xl font-black italic tracking-tighter uppercase">{t.hero.modal.success}</h3>
            <p className="text-slate-500 font-medium">Nous vous contacterons dans quelques minutes.</p>
          </div>
        ) : (
          <div className="flex flex-col overflow-hidden">
            {/* Header with brand color */}
            <div className="bg-[#3b66d4] p-6 text-white shrink-0">
                <DialogTitle className="text-xl font-black italic tracking-tighter uppercase leading-none">{t.hero.modal.title}</DialogTitle>
                <p className="text-blue-100 text-[10px] font-bold uppercase tracking-widest mt-2 opacity-80">Configuration du trajet</p>
            </div>

            <div className="p-6 md:p-8 space-y-6 overflow-y-auto">
              {step === 1 ? (
                <>
                  {/* Service Type Selection */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Type de service</span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {services.map((service) => (
                        <button
                          key={service.id}
                          onClick={() => setSelectedService(service.id)}
                          className={cn(
                            "flex flex-col items-center justify-center p-3 rounded-xl transition-all border-2 gap-2 text-center",
                            selectedService === service.id 
                              ? "bg-blue-50 border-[#3b66d4] text-[#3b66d4]" 
                              : "bg-white border-slate-50 hover:border-slate-200 text-slate-500"
                          )}
                        >
                          <div className={cn("p-2 rounded-lg", selectedService === service.id ? "bg-[#3b66d4] text-white" : "bg-slate-100")}>
                            {service.icon}
                          </div>
                          <span className="text-[9px] font-black uppercase tracking-tighter leading-tight h-6 flex items-center">
                            {service.name.split(' — ')[0]}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Route Inputs */}
                  <div className="relative">
                    <div className="absolute left-[13px] top-6 bottom-6 w-0.5 bg-slate-100 z-0" />
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 relative z-10">
                        <div className="w-3 h-3 rounded-full bg-[#3b66d4] ring-4 ring-blue-50" />
                        <div className="flex-1">
                          <AddressSearch 
                            accessToken={mapboxToken} 
                            placeholder={t.hero.pickupPlaceholder}
                            onSelect={(address) => setPickupAddress(address)}
                            defaultValue={pickupAddress}
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-4 relative z-10">
                        <div className="w-3 h-3 bg-slate-900" />
                        <div className="flex-1 min-w-0">
                          <AddressSearch 
                            accessToken={mapboxToken} 
                            placeholder={t.hero.dropoffPlaceholder}
                            onSelect={(address) => setDropoffAddress(address)}
                            defaultValue={dropoffAddress}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Car selection refined - NO $ signs */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Choix du véhicule</span>
                    <div className="grid grid-cols-1 gap-2">
                      {carOptions.map((car) => (
                        <button
                          key={car.id}
                          onClick={() => setSelectedCar(car.id)}
                          className={cn(
                            "flex items-center justify-between p-3 rounded-xl transition-all border-2",
                            selectedCar === car.id ? "bg-blue-50 border-[#3b66d4]" : "bg-white border-slate-50 hover:border-slate-200"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <div className={cn("p-2 rounded-lg", selectedCar === car.id ? "bg-[#3b66d4] text-white" : "bg-slate-100 text-slate-500")}>
                              {car.icon}
                            </div>
                            <div className="text-left">
                              <div className="font-bold text-sm uppercase italic tracking-tighter">{car.name}</div>
                              <div className="text-[10px] text-slate-500 font-bold flex items-center gap-1">
                                <IconUsers size={12} /> {car.capacity} places
                              </div>
                            </div>
                          </div>
                          {selectedCar === car.id && (
                            <div className="w-5 h-5 bg-[#3b66d4] rounded-full flex items-center justify-center text-white">
                              <IconCheck size={12} strokeWidth={4} />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Date</Label>
                      <div className="relative">
                        <IconCalendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10" />
                        <Input type="date" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} className="pl-9 h-11 rounded-xl bg-slate-50 border-none text-xs font-bold" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Heure</Label>
                      <div className="relative">
                        <IconClock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10" />
                        <Input type="time" value={bookingTime} onChange={(e) => setBookingTime(e.target.value)} className="pl-9 h-11 rounded-xl bg-slate-50 border-none text-xs font-bold" />
                      </div>
                    </div>
                  </div>

                  <Button 
                    disabled={!pickupAddress || !dropoffAddress}
                    onClick={() => setStep(2)}
                    className="w-full bg-[#3b66d4] hover:bg-blue-700 text-white h-14 rounded-xl font-bold uppercase tracking-widest active:scale-95 transition-all flex items-center justify-center gap-2 mt-4 shadow-lg shadow-blue-200"
                  >
                    Suivant <IconChevronRight size={18} />
                  </Button>
                </>
              ) : (
                <form onSubmit={handleConfirmInfo} className="space-y-6 animate-in slide-in-from-right duration-300">
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-3">
                    <div className="flex justify-between items-center text-[11px] font-bold">
                      <span className="text-slate-400 uppercase tracking-widest">Service</span>
                      <span className="bg-[#3b66d4] text-white px-3 py-1 rounded-full text-[9px] uppercase italic tracking-tighter">
                        {services.find(s => s.id === selectedService)?.name.split(' — ')[0]}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] font-bold">
                      <span className="text-slate-400 uppercase tracking-widest">Véhicule</span>
                      <span className="text-slate-700 uppercase italic tracking-tighter">{carOptions.find(c => c.id === selectedCar)?.name}</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] font-bold">
                      <span className="text-slate-400 uppercase tracking-widest">Planifié pour</span>
                      <span className="text-slate-700 font-black">{bookingDate} @ {bookingTime}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">{t.hero.modal.name}</Label>
                      <Input required placeholder="Jean Dupont" className="h-12 rounded-xl bg-slate-50 border-none text-xs font-bold focus:ring-2 ring-blue-100" />
                    </div>
                    <div className="grid gap-2">
                      <Label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">{t.hero.modal.phone}</Label>
                      <Input type="tel" required placeholder="(418) 000-0000" className="h-12 rounded-xl bg-slate-50 border-none text-xs font-bold focus:ring-2 ring-blue-100" />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button type="button" variant="ghost" onClick={() => setStep(1)} className="flex-1 h-14 rounded-xl text-xs font-bold text-slate-400 uppercase hover:bg-slate-50">Retour</Button>
                    <Button type="submit" className="flex-[2] bg-slate-900 hover:bg-black text-white h-14 rounded-xl font-bold uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all">
                      Confirmer la réservation
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
