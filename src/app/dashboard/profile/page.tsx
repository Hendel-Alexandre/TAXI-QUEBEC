"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Accessibility,
  Save,
  Check,
  MessageSquare,
    Camera,
    Bell,
    ChevronRight
  } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

type Profile = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  default_pickup_address: string | null;
  accessibility_wheelchair: boolean;
  accessibility_visual: boolean;
  accessibility_hearing: boolean;
  driver_notes: string | null;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    default_pickup_address: '',
    accessibility_wheelchair: false,
    accessibility_visual: false,
    accessibility_hearing: false,
    driver_notes: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          router.push('/auth');
          return;
        }

        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (data) {
          setProfile(data);
          setFormData({
            name: data.name || '',
            email: data.email || '',
            phone: data.phone || '',
            default_pickup_address: data.default_pickup_address || '',
            accessibility_wheelchair: data.accessibility_wheelchair || false,
            accessibility_visual: data.accessibility_visual || false,
            accessibility_hearing: data.accessibility_hearing || false,
            driver_notes: data.driver_notes || '',
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [supabase, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setSaving(true);
    const { error } = await supabase
      .from('profiles')
      .update({
        name: formData.name,
        phone: formData.phone,
        default_pickup_address: formData.default_pickup_address || null,
        accessibility_wheelchair: formData.accessibility_wheelchair,
        accessibility_visual: formData.accessibility_visual,
        accessibility_hearing: formData.accessibility_hearing,
        driver_notes: formData.driver_notes || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', profile.id);

    setSaving(false);
    if (!error) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="py-8 max-w-5xl mx-auto space-y-8">
      <header className="px-2">
        <h1 className="text-3xl font-bold tracking-tight text-black">Compte</h1>
        <p className="text-gray-500 text-sm font-medium">Gérez vos informations et préférences</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Profile Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm text-center">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="w-full h-full rounded-full bg-[#F3F3F3] border border-gray-100 flex items-center justify-center text-3xl font-bold text-black">
                {formData.name.charAt(0) || 'U'}
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <Camera className="w-4 h-4" />
              </button>
            </div>
              <h2 className="text-xl font-bold text-black">{formData.name}</h2>
              <p className="text-sm text-gray-500 mb-6">{formData.email}</p>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
               <div className="p-4 border-b border-gray-50">
                 <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Paramètres</h3>
               </div>
               <div className="divide-y divide-gray-50">
                  <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                     <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-gray-400" />
                        <span className="text-sm font-bold text-black">Notifications</span>
                     </div>
                     <ChevronRight className="w-4 h-4 text-gray-300" />
                  </button>
               </div>
            </div>
        </div>

        {/* Form Content */}
        <div className="lg:col-span-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-black mb-8">Informations personnelles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Nom complet</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-4 bg-[#F3F3F3] border-none rounded-xl text-black outline-none focus:ring-2 focus:ring-black transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Téléphone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-4 bg-[#F3F3F3] border-none rounded-xl text-black outline-none focus:ring-2 focus:ring-black transition-all"
                    placeholder="+1 (418) 000-0000"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Adresse par défaut</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.default_pickup_address}
                      onChange={(e) => setFormData({ ...formData, default_pickup_address: e.target.value })}
                      className="w-full p-4 pl-12 bg-[#F3F3F3] border-none rounded-xl text-black outline-none focus:ring-2 focus:ring-black transition-all"
                      placeholder="Saisissez votre adresse habituelle"
                    />
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-black mb-8 flex items-center gap-2">
                <Accessibility className="w-5 h-5" />
                Accessibilité & Notes
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                 {[
                   { id: 'accessibility_wheelchair', label: 'Fauteuil roulant' },
                   { id: 'accessibility_visual', label: 'Déficience visuelle' },
                   { id: 'accessibility_hearing', label: 'Déficience auditive' }
                 ].map((item) => (
                   <button
                     key={item.id}
                     type="button"
                     onClick={() => setFormData({ ...formData, [item.id]: !formData[item.id as keyof typeof formData] })}
                     className={`p-4 rounded-xl border transition-all text-xs font-bold flex items-center justify-between ${
                       formData[item.id as keyof typeof formData]
                         ? 'bg-black border-black text-white'
                         : 'bg-[#F3F3F3] border-transparent text-gray-500 hover:border-gray-200'
                     }`}
                   >
                     {item.label}
                     {formData[item.id as keyof typeof formData] && <Check className="w-3 h-3" />}
                   </button>
                 ))}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                   <MessageSquare className="w-4 h-4" />
                   Notes pour les chauffeurs
                </label>
                <textarea
                  value={formData.driver_notes}
                  onChange={(e) => setFormData({ ...formData, driver_notes: e.target.value })}
                  className="w-full p-4 bg-[#F3F3F3] border-none rounded-xl text-black outline-none focus:ring-2 focus:ring-black transition-all min-h-[100px] resize-none text-sm"
                  placeholder="Ex: Entrez par la porte de garage..."
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full py-5 bg-black hover:bg-gray-800 text-white rounded-2xl font-bold transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {saving ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : saved ? (
                <>
                  <Check className="w-6 h-6" />
                  Modifications enregistrées
                </>
              ) : (
                <>
                  <Save className="w-6 h-6" />
                  Mettre à jour le profil
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
