"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  Clock, 
  Car, 
  ChevronRight, 
  ChevronLeft,
  X,
  CreditCard,
  History,
  Info,
  CheckCircle2,
  Navigation
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { calculateFare, PRICE_DISCLAIMER_FR } from '@/lib/fare-utils';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import BookingMap from './booking-map';

const AddressSearch = dynamic(() => import('@/components/ui/address-search'), {
  ssr: false,
  loading: () => <div className="h-[52px] bg-gray-100 animate-pulse rounded-xl" />
});

type Step = 'search' | 'selection' | 'confirmation' | 'booked';

export default function BookingInterface() {
  const [step, setStep] = useState<Step>('search');
  const [pickup, setPickup] = useState<{ address: string; lng: number; lat: number } | null>(null);
  const [dropoff, setDropoff] = useState<{ address: string; lng: number; lat: number } | null>(null);
  const [route, setRoute] = useState<any>(null);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [selectedCar, setSelectedCar] = useState('standard');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  
  const supabase = createClient();
  const router = useRouter();
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, [supabase]);

  useEffect(() => {
    if (pickup && dropoff) {
      fetchRoute();
    } else {
      setRoute(null);
      setDistance(0);
      setDuration(0);
    }
  }, [pickup, dropoff]);

  const fetchRoute = async () => {
    if (!pickup || !dropoff) return;
    
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${pickup.lng},${pickup.lat};${dropoff.lng},${dropoff.lat}?geometries=geojson&access_token=${mapboxToken}`
      );
      const data = await response.json();
      
      if (data.routes && data.routes[0]) {
        setRoute(data.routes[0].geometry);
        setDistance(data.routes[0].distance / 1000); // meters to km
        setDuration(data.routes[0].duration / 60); // seconds to minutes
        setStep('selection');
      }
    } catch (err) {
      console.error('Error fetching route:', err);
      setError('Impossible de calculer l\'itinéraire.');
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!user || !pickup || !dropoff) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('rides')
        .insert({
          user_id: user.id,
          pickup_address: pickup.address,
          dropoff_address: dropoff.address,
          pickup_lng: pickup.lng,
          pickup_lat: pickup.lat,
          dropoff_lng: dropoff.lng,
          dropoff_lat: dropoff.lat,
          estimated_price: calculateFare(distance).total,
          status: 'pending',
          vehicle_type: selectedCar
        });
      
      if (error) throw error;
      setStep('booked');
    } catch (err) {
      console.error('Error creating ride:', err);
      setError('Erreur lors de la réservation.');
    } finally {
      setLoading(false);
    }
  };

  const fareEstimate = calculateFare(distance);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-100 font-sans">
      {/* Background Map */}
      <div className="absolute inset-0 z-0">
        <BookingMap 
          pickup={pickup ? { lng: pickup.lng, lat: pickup.lat } : undefined}
          dropoff={dropoff ? { lng: dropoff.lng, lat: dropoff.lat } : undefined}
          route={route}
        />
      </div>

      {/* Top Header Overlay */}
      <div className="absolute top-0 left-0 right-0 p-6 z-20 pointer-events-none">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="pointer-events-auto bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-white/20">
            <Navigation className="w-6 h-6 text-black rotate-45" />
          </div>
          
          {step !== 'search' && (
            <button 
              onClick={() => {
                setStep('search');
                setDropoff(null);
                setRoute(null);
              }}
              className="pointer-events-auto bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-white/20 hover:bg-gray-50"
            >
              <X className="w-6 h-6 text-black" />
            </button>
          )}
        </div>
      </div>

      {/* Floating UI Panel */}
      <div className="absolute inset-x-0 bottom-0 lg:bottom-12 flex justify-center p-4 sm:p-6 z-30 pointer-events-none">
        <div className="w-full max-w-md pointer-events-auto">
          <AnimatePresence mode="wait">
            {step === 'search' && (
              <motion.div
                key="search"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="bg-white rounded-[2.5rem] shadow-2xl p-6 sm:p-8 space-y-6 border border-gray-100"
              >
                <div className="space-y-2">
                  <h1 className="text-3xl font-black italic tracking-tighter uppercase text-black">Où allez-vous ?</h1>
                  <p className="text-gray-500 font-medium text-sm">Entrez votre destination pour commencer.</p>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute left-[18px] top-6 bottom-6 w-0.5 bg-gray-100" />
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 relative">
                        <div className="w-3 h-3 rounded-full bg-green-500 ring-4 ring-green-50 z-10" />
                        <div className="flex-1">
                          <AddressSearch 
                            accessToken={mapboxToken || ''} 
                            placeholder="Point de départ"
                            onSelect={(addr, coords) => coords && setPickup({ address: addr, ...coords })}
                            defaultValue={pickup?.address}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-4 relative">
                        <div className="w-3 h-3 bg-black z-10" />
                        <div className="flex-1">
                          <AddressSearch 
                            accessToken={mapboxToken || ''} 
                            placeholder="Destination"
                            onSelect={(addr, coords) => coords && setDropoff({ address: addr, ...coords })}
                            defaultValue={dropoff?.address}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 py-2 overflow-x-auto no-scrollbar">
                  {['Maison', 'Bureau', 'Aéroport'].map((fav) => (
                    <button key={fav} className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-100 hover:border-black transition-all shrink-0">
                      <History className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-xs font-bold text-gray-700">{fav}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 'selection' && (
              <motion.div
                key="selection"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 flex flex-col"
              >
                <div className="p-6 sm:p-8 border-b border-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <button onClick={() => setStep('search')} className="p-2 hover:bg-gray-100 rounded-full">
                      <ChevronLeft className="w-5 h-5 text-gray-400" />
                    </button>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Choix du véhicule</span>
                    <div className="w-9" />
                  </div>

                  <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-tight">Destination</p>
                      <p className="text-sm font-bold truncate text-black">{dropoff?.address.split(',')[0]}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-tight">Distance</p>
                      <p className="text-sm font-bold text-black">{distance.toFixed(1)} km</p>
                    </div>
                  </div>
                </div>

                <div className="max-h-64 overflow-y-auto p-4 sm:p-6 space-y-3">
                  {[
                    { id: 'standard', name: 'Standard', desc: 'Taxi régulier, 4 places', icon: Car, time: '2 min' },
                    { id: 'van', name: 'Van / XL', desc: 'Plus d\'espace, 6 places', icon: Car, time: '5 min' }
                  ].map((car) => (
                    <button
                      key={car.id}
                      onClick={() => setSelectedCar(car.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-[1.5rem] border-2 transition-all ${
                        selectedCar === car.id ? 'bg-black text-white border-black' : 'bg-white border-gray-50 hover:border-gray-200'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedCar === car.id ? 'bg-white/10' : 'bg-gray-100'}`}>
                        <car.icon className={`w-6 h-6 ${selectedCar === car.id ? 'text-white' : 'text-black'}`} />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2">
                          <span className="font-bold uppercase italic tracking-tighter">{car.name}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${selectedCar === car.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
                            {car.time}
                          </span>
                        </div>
                        <p className={`text-[11px] font-medium ${selectedCar === car.id ? 'text-white/60' : 'text-gray-400'}`}>{car.desc}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg italic tracking-tighter">
                          ${calculateFare(distance).total.toFixed(2)}
                        </p>
                        <p className="text-[10px] font-black uppercase tracking-tighter text-gray-400">Prix estimé</p>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="p-6 sm:p-8 pt-0 space-y-4">
                  <div className="flex items-start gap-3 bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                    <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <p className="text-[10px] font-medium text-blue-800 leading-relaxed">
                      {PRICE_DISCLAIMER_FR}
                    </p>
                  </div>

                  <Button 
                    onClick={() => setStep('confirmation')}
                    className="w-full h-16 bg-black hover:bg-gray-900 text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3"
                  >
                    Réserver maintenant <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 'confirmation' && (
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-[2.5rem] shadow-2xl p-6 sm:p-8 space-y-6 border border-gray-100"
              >
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-black italic tracking-tighter uppercase">Confirmer le trajet</h2>
                  <p className="text-gray-500 font-medium text-sm">Prêt à partir ? Vérifiez les détails.</p>
                </div>

                <div className="bg-gray-50 rounded-3xl p-5 space-y-4 border border-gray-100">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200/50">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Estimation</span>
                    <span className="text-xl font-black italic tracking-tighter text-black">${fareEstimate.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200/50">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Paiement</span>
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-black" />
                      <span className="text-sm font-bold">Visa •• 42</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Véhicule</span>
                    <span className="text-sm font-bold uppercase italic tracking-tighter">{selectedCar === 'standard' ? 'Standard' : 'Van XL'}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    variant="ghost" 
                    onClick={() => setStep('selection')} 
                    className="flex-1 h-14 rounded-2xl text-xs font-bold text-gray-400 uppercase hover:bg-gray-50"
                  >
                    Retour
                  </Button>
                  <Button 
                    onClick={handleBooking}
                    disabled={loading}
                    className="flex-[2] bg-black hover:bg-gray-900 text-white h-14 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all"
                  >
                    {loading ? 'Chargement...' : 'Confirmer'}
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 'booked' && (
              <motion.div
                key="booked"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-[2.5rem] shadow-2xl p-8 sm:p-10 space-y-8 border border-gray-100 text-center"
              >
                <div className="relative">
                  <div className="w-24 h-24 bg-green-500 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-100 animate-bounce">
                    <CheckCircle2 className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute top-0 right-1/4 w-4 h-4 bg-green-200 rounded-full animate-ping" />
                </div>

                <div className="space-y-3">
                  <h2 className="text-3xl font-black italic tracking-tighter uppercase text-black">C'est en route !</h2>
                  <p className="text-gray-500 font-medium leading-relaxed">
                    Votre chauffeur a été notifié. <br />Vous recevrez un SMS dès qu'il arrive.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 flex items-center justify-between">
                  <div className="text-left">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Arrivée estimée</p>
                    <p className="text-2xl font-black italic tracking-tighter text-black">4 min</p>
                  </div>
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-black" />
                  </div>
                </div>

                <Button 
                  onClick={() => router.push('/dashboard/history')}
                  className="w-full h-16 bg-black hover:bg-gray-900 text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl active:scale-95 transition-all"
                >
                  Suivre ma course
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
