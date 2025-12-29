"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HelpCircle, 
  Phone, 
  MessageSquare, 
  ChevronDown, 
  ChevronUp,
  Send,
  AlertTriangle,
  Clock,
  CheckCircle2,
  X,
  Search,
  MessageCircle,
  PhoneCall,
  ArrowRight
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

type Ride = {
  id: string;
  pickup_address: string;
  dropoff_address: string;
  created_at: string;
};

const faqItems = [
  {
    question: "Comment puis-je réserver un taxi?",
    answer: "Vous pouvez réserver un taxi en appelant notre répartition au (418) 525-1212. Nos agents sont disponibles 24h/24, 7j/7 pour prendre votre réservation."
  },
  {
    question: "Quels modes de paiement acceptez-vous?",
    answer: "Nous acceptons les paiements en espèces et par carte de débit/crédit directement dans le véhicule. Le paiement se fait à la fin de la course."
  },
  {
    question: "Puis-je réserver un taxi à l'avance?",
    answer: "Oui, vous pouvez réserver un taxi jusqu'à 7 jours à l'avance. Appelez notre répartition et précisez la date et l'heure souhaitées pour la prise en charge."
  },
  {
    question: "Comment annuler une réservation?",
    answer: "Pour annuler une réservation, appelez notre répartition au (418) 525-1212 le plus tôt possible. Des frais d'annulation peuvent s'appliquer si le taxi est déjà en route."
  },
  {
    question: "Offrez-vous des véhicules accessibles?",
    answer: "Oui, nous disposons de véhicules adaptés pour les personnes à mobilité réduite. Mentionnez vos besoins lors de la réservation pour nous assurer de vous envoyer le véhicule approprié."
  },
  {
    question: "Puis-je transporter des animaux?",
    answer: "Les petits animaux de compagnie en cage sont généralement acceptés. Pour les chiens guides, ils sont toujours les bienvenus. Veuillez informer notre répartition lors de la réservation."
  }
];

export default function HelpPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [rides, setRides] = useState<Ride[]>([]);
  const [selectedRideId, setSelectedRideId] = useState('');
  const [reportSubject, setReportSubject] = useState('');
  const [reportDescription, setReportDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const fetchRecentRides = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          router.push('/auth');
          return;
        }

        const { data } = await supabase
          .from('rides')
          .select('id, pickup_address, dropoff_address, created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(10);

        if (data) setRides(data);
      } catch (error) {
        console.error('Error fetching help data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentRides();
  }, [supabase, router]);

  const handleSubmitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    setSubmitting(true);

    await supabase.from('support_tickets').insert({
      user_id: user.id,
      ride_id: selectedRideId || null,
      subject: reportSubject,
      description: reportDescription,
    });

    setSubmitting(false);
    setSubmitted(true);
    setTimeout(() => {
      setShowReportModal(false);
      setSubmitted(false);
      setSelectedRideId('');
      setReportSubject('');
      setReportDescription('');
    }, 2000);
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
        <h1 className="text-3xl font-bold tracking-tight text-black">Aide</h1>
        <p className="text-gray-500 text-sm font-medium">Comment pouvons-nous vous aider aujourd'hui ?</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-black text-white rounded-3xl p-8 shadow-xl relative overflow-hidden group">
          <div className="relative z-10 space-y-6">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">Répartition 24/7</h2>
              <p className="text-gray-400 text-sm mb-6">Pour une assistance immédiate ou une réservation par téléphone.</p>
              <a
                href="tel:+14185251212"
                className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-bold text-sm hover:bg-gray-100 transition-all"
              >
                (418) 525-1212
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
          <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-black mb-2">Signaler un problème</h2>
            <p className="text-gray-500 text-sm mb-6">Objet perdu ou problème lors d'une course ? Ouvrez un ticket.</p>
            <button
              onClick={() => setShowReportModal(true)}
              className="inline-flex items-center gap-2 bg-[#F3F3F3] hover:bg-[#EEEEEE] text-black px-6 py-3 rounded-xl font-bold text-sm transition-all"
            >
              Ouvrir un ticket
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <h2 className="font-bold text-black flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            Questions fréquentes
          </h2>
        </div>
        <div className="divide-y divide-gray-50">
          {faqItems.map((item, index) => (
            <div key={index} className="group">
              <button
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-50 transition-all"
              >
                <span className="font-bold text-sm text-black">{item.question}</span>
                <div className={`transition-transform duration-300 ${expandedFaq === index ? 'rotate-180' : ''}`}>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </button>
              <AnimatePresence>
                {expandedFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-sm text-gray-500 leading-relaxed">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showReportModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
            onClick={() => setShowReportModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-black mb-2">Message envoyé</h2>
                  <p className="text-gray-500 text-sm">Nous reviendrons vers vous très rapidement.</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold tracking-tight text-black">Support</h2>
                    <button onClick={() => setShowReportModal(false)} className="p-2 text-gray-400 hover:text-black">
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <form onSubmit={handleSubmitReport} className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Course concernée</label>
                      <select
                        value={selectedRideId}
                        onChange={(e) => setSelectedRideId(e.target.value)}
                        className="w-full p-4 bg-[#F3F3F3] border-none rounded-xl text-black outline-none focus:ring-2 focus:ring-black transition-all appearance-none cursor-pointer text-sm"
                      >
                        <option value="">Sélectionner une course</option>
                        {rides.map((ride) => (
                          <option key={ride.id} value={ride.id}>
                            {new Date(ride.created_at).toLocaleDateString('fr-CA')} - {ride.pickup_address.split(',')[0]}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Sujet</label>
                      <input
                        type="text"
                        value={reportSubject}
                        onChange={(e) => setReportSubject(e.target.value)}
                        className="w-full p-4 bg-[#F3F3F3] border-none rounded-xl text-black outline-none focus:ring-2 focus:ring-black transition-all text-sm"
                        placeholder="Ex: Objet perdu, Facturation..."
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Description</label>
                      <textarea
                        value={reportDescription}
                        onChange={(e) => setReportDescription(e.target.value)}
                        className="w-full p-4 bg-[#F3F3F3] border-none rounded-xl text-black outline-none focus:ring-2 focus:ring-black transition-all min-h-[120px] resize-none text-sm"
                        placeholder="Détails de votre demande..."
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-black hover:bg-gray-800 text-white rounded-xl py-4 font-bold transition-all flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Envoyer
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
