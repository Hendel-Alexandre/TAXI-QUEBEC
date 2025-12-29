"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Car, 
  MapPin, 
  Clock, 
  ChevronRight,
  Search,
  Navigation,
  History,
  TrendingUp,
  Map as MapIcon,
  User,
  HelpCircle
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Ride = {
  id: string;
  pickup_address: string;
  dropoff_address: string;
  status: string;
  driver_name: string | null;
  vehicle_plate: string | null;
  driver_phone: string | null;
  created_at: string;
  estimated_price?: number;
};

type Profile = {
  name: string;
  email: string;
  phone: string | null;
};

export default function DashboardPage() {
  const [activeRide, setActiveRide] = useState<Ride | null>(null);
  const [recentRides, setRecentRides] = useState<Ride[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          router.push('/auth');
          return;
        }

        const { data: profileData } = await supabase
          .from('profiles')
          .select('name, email, phone')
          .eq('id', user.id)
          .single();
        
        if (profileData) setProfile(profileData);

        const { data: activeRideData } = await supabase
          .from('rides')
          .select('*')
          .eq('user_id', user.id)
          .in('status', ['pending', 'confirmed', 'in_progress'])
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();
        
        if (activeRideData) setActiveRide(activeRideData);

        const { data: recentRidesData } = await supabase
          .from('rides')
          .select('*')
          .eq('user_id', user.id)
          .eq('status', 'completed')
          .order('created_at', { ascending: false })
          .limit(3);
        
        if (recentRidesData) setRecentRides(recentRidesData || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const channel = supabase
      .channel('ride-updates')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'rides' },
        () => {
          fetchData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="py-6 space-y-6">
      {/* Search Header */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold mb-4 tracking-tight">Bonjour, {profile?.name?.split(' ')[0] || 'Utilisateur'}</h1>
        <div 
          onClick={() => router.push('/dashboard/history')}
          className="relative flex items-center bg-[#F3F3F3] hover:bg-[#EEEEEE] transition-colors rounded-xl px-4 py-4 cursor-pointer group"
        >
          <Search className="w-5 h-5 text-gray-500 mr-3" />
          <span className="text-gray-500 font-medium">Où allez-vous ?</span>
          <div className="ml-auto flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-sm">
             <Clock className="w-4 h-4 text-black" />
             <span className="text-xs font-bold text-black">Maintenant</span>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Actions */}
        <div className="lg:col-span-8 space-y-6">
          {/* Active Ride Card */}
          {activeRide && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black text-white rounded-2xl p-6 shadow-xl relative overflow-hidden"
            >
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Course en cours</p>
                  </div>
                  <h3 className="text-xl font-bold mb-1">{activeRide.driver_name || 'Votre chauffeur arrive'}</h3>
                  <p className="text-sm text-gray-400">{activeRide.pickup_address.split(',')[0]} → {activeRide.dropoff_address.split(',')[0]}</p>
                </div>
                <button className="bg-white text-black px-6 py-3 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors">
                  Voir sur la carte
                </button>
              </div>
              <Navigation className="absolute -right-8 -bottom-8 w-32 h-32 text-white/5 rotate-12" />
            </motion.div>
          )}

          {/* Quick Links Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Courses', icon: Car, href: '/dashboard/history', color: 'bg-blue-50 text-blue-600' },
              { label: 'Favoris', icon: MapPin, href: '/dashboard/addresses', color: 'bg-purple-50 text-purple-600' },
              { label: 'Profil', icon: User, href: '/dashboard/profile', color: 'bg-orange-50 text-orange-600' },
              { label: 'Aide', icon: HelpCircle, href: '/dashboard/help', color: 'bg-green-50 text-green-600' }
            ].map((item, i) => (
              <Link 
                key={i} 
                href={item.href}
                className="bg-white p-4 rounded-2xl border border-gray-100 hover:border-black transition-all group"
              >
                <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold block">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Featured Content / Map Preview */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="p-6 flex items-center justify-between border-b border-gray-50">
              <h3 className="font-bold text-lg">Zones populaires</h3>
              <button className="text-sm font-bold text-gray-500 flex items-center gap-1 hover:text-black">
                Voir tout <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="aspect-[21/9] relative bg-gray-100">
               <div className="absolute inset-0 opacity-40 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-71.2082,46.8139,12,0/1200x600?access_token=pk.eyJ1IjoiZGV2LW9yY2hpZHMiLCJhIjoiY203cmFycXN5MDAybTJycTJ3eG45dDhhciJ9.N0Lw_N0_N0Lw_N0_N0Lw_N')] bg-cover bg-center" />
               <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent" />
               
               <div className="absolute bottom-6 left-6 right-6">
                 <div className="bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                        <MapIcon className="w-5 h-5 text-white" />
                     </div>
                     <div>
                       <p className="text-xs font-bold text-gray-500 uppercase tracking-tight">Affluence actuelle</p>
                       <p className="text-sm font-bold">Centre-Ville de Québec</p>
                     </div>
                   </div>
                   <div className="flex items-center gap-1 text-green-600 font-bold text-sm">
                     <TrendingUp className="w-4 h-4" />
                     <span>Normal</span>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-6">
            {/* Profile Quick Look */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200">
                  <span className="text-lg font-bold">{profile?.name?.charAt(0) || 'U'}</span>
                </div>
                <div>
                  <h4 className="font-bold text-black">{profile?.name || 'Utilisateur'}</h4>
                  <p className="text-xs text-gray-500">{profile?.email}</p>
                </div>
              </div>
            </div>

          {/* Recent Trips List */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="p-4 border-b border-gray-50">
              <h3 className="font-bold text-sm uppercase tracking-wider text-gray-500">Courses récentes</h3>
            </div>
            <div className="divide-y divide-gray-50">
              {recentRides.length > 0 ? (
                recentRides.map((ride) => (
                  <div key={ride.id} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-[#F3F3F3] rounded-lg flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                        <History className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate">{ride.dropoff_address.split(',')[0]}</p>
                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tight">
                          {new Date(ride.created_at).toLocaleDateString('fr-CA', { day: 'numeric', month: 'short' })}
                        </p>
                      </div>
                      <span className="text-sm font-bold text-black">${ride.estimated_price || '15'}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <p className="text-sm text-gray-400 font-medium">Aucune course</p>
                </div>
              )}
            </div>
            <Link 
              href="/dashboard/history"
              className="block p-4 text-center text-sm font-bold hover:bg-gray-50 transition-colors border-t border-gray-50"
            >
              Tout voir
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
