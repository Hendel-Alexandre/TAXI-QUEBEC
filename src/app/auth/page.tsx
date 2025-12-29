"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { User, Building2, Lock, ArrowRight, Mail, Phone, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

type AuthMode = 'select' | 'login' | 'register';

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>('select');
  const [showOrgModal, setShowOrgModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const supabase = createClient();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      window.location.href = '/dashboard';
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          phone: formData.phone,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'Erreur lors de la création du compte');
        setIsLoading(false);
        return;
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (signInError) {
        setError(signInError.message);
        setIsLoading(false);
        return;
      }

      router.push('/dashboard');
    } catch {
      setError('Une erreur est survenue');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f4ff] via-white to-[#e8efff] flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-primary/10 border border-white/50 p-8">
          <div className="flex justify-center mb-8">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/taxi-quebec-logo-removebg-preview-1-1766792742115.png?width=8000&height=8000&resize=contain"
              alt="Taxi Québec"
              width={140}
              height={70}
              className="object-contain"
            />
          </div>

          {mode === 'select' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
                Bienvenue
              </h1>
              <p className="text-center text-gray-500 mb-8">
                Sélectionnez votre type de portail
              </p>

              <button
                onClick={() => setMode('login')}
                className="w-full bg-primary hover:bg-primary/90 text-white rounded-2xl p-5 flex items-center justify-between transition-all duration-300 group shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <User className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-lg">Portail Client</div>
                    <div className="text-white/70 text-sm">Réservez et suivez vos courses</div>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setShowOrgModal(true)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-400 rounded-2xl p-5 flex items-center justify-between transition-all duration-300 cursor-not-allowed"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-lg flex items-center gap-2">
                      Portail Organisation
                      <Lock className="w-4 h-4" />
                    </div>
                    <div className="text-gray-400 text-sm">Bientôt disponible</div>
                  </div>
                </div>
              </button>
            </motion.div>
          )}

          {mode === 'login' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <button
                onClick={() => setMode('select')}
                className="flex items-center gap-2 text-gray-500 hover:text-primary mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Retour
              </button>

              <h1 className="text-2xl font-bold text-gray-900 mb-2">Connexion</h1>
              <p className="text-gray-500 mb-6">Accédez à votre espace client</p>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Adresse courriel"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-xl focus:border-primary focus:bg-white transition-all outline-none"
                    required
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Mot de passe"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-12 py-4 bg-gray-50 border-2 border-transparent rounded-xl focus:border-primary focus:bg-white transition-all outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {error && (
                  <p className="text-red-500 text-sm text-center">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-4 font-semibold transition-all shadow-lg shadow-primary/20 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Connexion...' : 'Se connecter'}
                </button>
              </form>

              <p className="text-center text-gray-500 mt-6">
                Pas encore de compte?{' '}
                <button
                  onClick={() => setMode('register')}
                  className="text-primary font-semibold hover:underline"
                >
                  Créer un compte
                </button>
              </p>
            </motion.div>
          )}

          {mode === 'register' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <button
                onClick={() => setMode('login')}
                className="flex items-center gap-2 text-gray-500 hover:text-primary mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Retour
              </button>

              <h1 className="text-2xl font-bold text-gray-900 mb-2">Créer un compte</h1>
              <p className="text-gray-500 mb-6">Rejoignez Taxi Québec</p>

              <form onSubmit={handleRegister} className="space-y-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Nom complet"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-xl focus:border-primary focus:bg-white transition-all outline-none"
                    required
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Adresse courriel"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-xl focus:border-primary focus:bg-white transition-all outline-none"
                    required
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Numéro de téléphone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-xl focus:border-primary focus:bg-white transition-all outline-none"
                    required
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Mot de passe"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-12 py-4 bg-gray-50 border-2 border-transparent rounded-xl focus:border-primary focus:bg-white transition-all outline-none"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {error && (
                  <p className="text-red-500 text-sm text-center">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-4 font-semibold transition-all shadow-lg shadow-primary/20 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Création...' : 'Créer mon compte'}
                </button>
              </form>

              <p className="text-center text-gray-500 mt-6">
                Déjà un compte?{' '}
                <button
                  onClick={() => setMode('login')}
                  className="text-primary font-semibold hover:underline"
                >
                  Se connecter
                </button>
              </p>
            </motion.div>
          )}
        </div>

        <p className="text-center text-gray-400 text-sm mt-6">
          © {new Date().getFullYear()} Taxi Québec. Tous droits réservés.
        </p>
      </motion.div>

      {showOrgModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowOrgModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-8 max-w-sm w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Bientôt disponible</h2>
            <p className="text-gray-500 mb-6">
              Le portail organisation sera disponible prochainement. Contactez notre répartition pour plus d&apos;informations.
            </p>
            <a
              href="tel:+14185251212"
              className="block w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-3 font-semibold transition-all"
            >
              Appeler la répartition
            </a>
            <button
              onClick={() => setShowOrgModal(false)}
              className="mt-3 w-full text-gray-500 hover:text-gray-700 py-2"
            >
              Fermer
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
