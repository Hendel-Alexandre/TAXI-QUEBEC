"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  History, 
  ArrowRight, 
  MapPin, 
  Car,
  X,
  Star,
  Clock,
  Navigation,
  MoreVertical,
  ChevronDown
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

type Ride = {
  id: string;
  pickup_address: string;
  dropoff_address: string;
  status: string;
  driver_name: string | null;
  vehicle_plate: string | null;
  created_at: string;
  estimated_price?: number;
  notes?: string | null;
};

type Rating = {
  ride_id: string;
  rating: number;
  comment: string | null;
};

export default function HistoryPage() {
  const [rides, setRides] = useState<Ride[]>([]);
  const [ratings, setRatings] = useState<Record<string, Rating>>({});
  const [loading, setLoading] = useState(true);
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [ratingRide, setRatingRide] = useState<Ride | null>(null);
  const [ratingValue, setRatingValue] = useState(5);
  const [ratingComment, setRatingComment] = useState('');
  const [submittingRating, setSubmittingRating] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const fetchRides = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/auth');
        return;
      }

      const { data: ridesData } = await supabase
        .from('rides')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (ridesData) setRides(ridesData);

      const { data: ratingsData } = await supabase
        .from('ride_ratings')
        .select('*')
        .eq('user_id', user.id);

      if (ratingsData) {
        const ratingsMap: Record<string, Rating> = {};
        ratingsData.forEach((r) => {
          ratingsMap[r.ride_id] = r;
        });
        setRatings(ratingsMap);
      }
    } catch (error) {
      console.error('Error fetching rides:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRides();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-50 text-green-700 border-green-100';
      case 'cancelled': return 'bg-red-50 text-red-700 border-red-100';
      case 'pending': return 'bg-yellow-50 text-yellow-700 border-yellow-100';
      case 'in_progress': return 'bg-blue-50 text-blue-700 border-blue-100';
      default: return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  const openRating = (ride: Ride) => {
    setRatingRide(ride);
    setRatingValue(5);
    setRatingComment('');
    setShowRatingModal(true);
  };

  const submitRating = async () => {
    if (!ratingRide) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    setSubmittingRating(true);

    await supabase.from('ride_ratings').insert({
      ride_id: ratingRide.id,
      user_id: user.id,
      rating: ratingValue,
      comment: ratingComment || null,
    });

    setRatings({
      ...ratings,
      [ratingRide.id]: {
        ride_id: ratingRide.id,
        rating: ratingValue,
        comment: ratingComment || null,
      },
    });

    setSubmittingRating(false);
    setShowRatingModal(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="py-8 max-w-4xl mx-auto space-y-6">
      <header className="flex items-center justify-between px-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Activité</h1>
          <p className="text-gray-500 text-sm font-medium">Historique de vos trajets</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm text-sm font-bold">
          {rides.length} Courses
        </div>
      </header>

      <div className="space-y-4">
        {rides.map((ride, index) => (
          <motion.div
            key={ride.id}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            className={`bg-white rounded-2xl border transition-all overflow-hidden ${
              selectedRide?.id === ride.id ? 'border-black shadow-md' : 'border-gray-100 hover:border-gray-200 shadow-sm'
            }`}
          >
            <div 
              className="p-5 cursor-pointer flex items-center justify-between"
              onClick={() => setSelectedRide(selectedRide?.id === ride.id ? null : ride)}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#F3F3F3] rounded-xl flex items-center justify-center group-hover:bg-black transition-colors">
                  <Car className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="font-bold text-black flex items-center gap-2">
                    {ride.dropoff_address.split(',')[0]}
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${selectedRide?.id === ride.id ? 'rotate-180' : ''}`} />
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500 font-medium uppercase tracking-tight">
                    <span>{new Date(ride.created_at).toLocaleDateString('fr-CA', { day: 'numeric', month: 'short' })}</span>
                    <span>•</span>
                    <span className={`px-2 py-0.5 rounded-full border ${getStatusColor(ride.status)}`}>
                      {ride.status === 'completed' ? 'Terminé' : ride.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-black">${ride.estimated_price || '15'}</p>
                {ratings[ride.id] && (
                  <div className="flex items-center gap-0.5 mt-1 justify-end">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className={`w-2.5 h-2.5 ${s <= ratings[ride.id].rating ? 'fill-black text-black' : 'text-gray-200'}`} />
                    ))}
                  </div>
                )}
              </div>
            </div>

            <AnimatePresence>
              {selectedRide?.id === ride.id && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="bg-[#FAFAFA] border-t border-gray-100 overflow-hidden"
                >
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center gap-1 mt-1">
                          <div className="w-2 h-2 rounded-full bg-black" />
                          <div className="w-0.5 h-8 bg-gray-200" />
                          <div className="w-2 h-2 bg-black" />
                        </div>
                        <div className="space-y-4">
                          <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Départ</p>
                            <p className="text-sm font-medium">{ride.pickup_address}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Arrivée</p>
                            <p className="text-sm font-medium">{ride.dropoff_address}</p>
                          </div>
                        </div>
                      </div>
                      {ride.driver_name && (
                        <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                           <div className="w-8 h-8 bg-white rounded-full border border-gray-100 flex items-center justify-center">
                             <Navigation className="w-4 h-4 text-gray-400" />
                           </div>
                           <p className="text-xs font-bold text-gray-500">
                             Chauffeur: <span className="text-black">{ride.driver_name}</span> {ride.vehicle_plate && `(${ride.vehicle_plate})`}
                           </p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col justify-center items-center text-center p-6 bg-white rounded-2xl border border-gray-100">
                      {ride.status === 'completed' && !ratings[ride.id] && (
                        <>
                          <Star className="w-8 h-8 text-yellow-400 mb-2" />
                          <h4 className="font-bold text-sm mb-1">Évaluer ce trajet</h4>
                          <p className="text-xs text-gray-500 mb-4">Votre avis aide à améliorer le service</p>
                          <button 
                            onClick={() => openRating(ride)}
                            className="bg-black text-white text-xs font-bold px-6 py-2 rounded-full hover:bg-gray-800 transition-colors"
                          >
                            Évaluer
                          </button>
                        </>
                      )}
                      {ratings[ride.id] && (
                        <>
                          <div className="flex items-center gap-1 mb-2">
                             {[1,2,3,4,5].map(s => <Star key={s} className={`w-5 h-5 ${s <= ratings[ride.id].rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />)}
                          </div>
                          <p className="text-xs font-bold text-black mb-1">Votre évaluation</p>
                          <p className="text-xs text-gray-500 italic">"{ratings[ride.id].comment || 'Pas de commentaire'}"</p>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}

        {rides.length === 0 && (
          <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-sm">
            <div className="w-16 h-16 bg-[#F3F3F3] rounded-full flex items-center justify-center mx-auto mb-6">
              <History className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Pas encore de courses</h3>
            <p className="text-gray-500 max-w-sm mx-auto mb-8">
              Vos trajets terminés apparaîtront ici.
            </p>
            <button 
              onClick={() => router.push('/dashboard')}
              className="bg-black text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors"
            >
              Commander maintenant
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showRatingModal && ratingRide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
            onClick={() => setShowRatingModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold tracking-tight text-black">Votre avis</h2>
                <button onClick={() => setShowRatingModal(false)} className="p-2 text-gray-400 hover:text-black">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRatingValue(star)}
                      className="p-1 transition-transform hover:scale-125"
                    >
                      <Star
                        className={`w-10 h-10 transition-all ${
                          star <= ratingValue ? 'text-black fill-black' : 'text-gray-200 hover:text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <textarea
                  value={ratingComment}
                  onChange={(e) => setRatingComment(e.target.value)}
                  className="w-full p-6 bg-[#F3F3F3] border-none rounded-2xl text-black placeholder:text-gray-500 focus:ring-2 focus:ring-black outline-none resize-none min-h-[120px]"
                  placeholder="Qu'est-ce qui vous a plu ?"
                />
              </div>

              <button
                onClick={submitRating}
                disabled={submittingRating}
                className="w-full bg-black text-white rounded-xl py-4 font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {submittingRating ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : 'Envoyer'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
