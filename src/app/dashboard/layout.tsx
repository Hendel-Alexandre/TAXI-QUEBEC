"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  MapPin, 
  Bell, 
  History, 
  User, 
  HelpCircle, 
  LogOut,
  Menu,
  X,
  Navigation
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const navItems = [
    { href: '/dashboard', icon: Home, label: 'Accueil' },
    { href: '/dashboard/history', icon: History, label: 'Courses' },
    { href: '/dashboard/addresses', icon: MapPin, label: 'Favoris' },
    { href: '/dashboard/notifications', icon: Bell, label: 'Alertes' },
    { href: '/dashboard/profile', icon: User, label: 'Profil' },
    { href: '/dashboard/help', icon: HelpCircle, label: 'Aide' },
  ];
  
  export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);
    const [unreadCount, setUnreadCount] = useState(0);
    const supabase = createClient();
  
    useEffect(() => {
      const getUser = async () => {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (authUser) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('name, email')
            .eq('id', authUser.id)
            .single();
          
          if (profile) {
            setUser(profile);
          } else {
            setUser({ email: authUser.email });
          }
  
          const { count } = await supabase
            .from('notifications')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', authUser.id)
            .eq('is_read', false);
          
          setUnreadCount(count || 0);
        }
      };
      getUser();
    }, [supabase]);
  
    const handleLogout = async () => {
      await supabase.auth.signOut();
      router.push('/auth');
    };
  
      return (
        <div className="min-h-screen bg-[#F6F6F6] text-black font-sans selection:bg-black/10">
          {/* Slim Desktop Sidebar */}
          <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-20 bg-white border-r border-gray-200 flex-col items-center py-8 z-50">
            <div className="mb-10">
              <Link href="/dashboard" className="w-12 h-12 bg-black rounded-xl flex items-center justify-center shadow-sm hover:scale-105 transition-transform">
                <Navigation className="w-6 h-6 text-white rotate-45" />
              </Link>
            </div>
    
            <nav className="flex-1 flex flex-col gap-6">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'bg-black text-white'
                        : 'text-gray-400 hover:text-black hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.5]'}`} />
                    
                    {/* Tooltip */}
                    <div className="absolute left-16 px-3 py-1 bg-black text-white text-xs font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-xl">
                      {item.label}
                    </div>
    
                    {item.href === '/dashboard/notifications' && unreadCount > 0 && (
                      <span className="absolute top-2 right-2 w-2 h-2 bg-black rounded-full border-2 border-white" />
                    )}
    
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute -left-4 w-1 h-8 bg-black rounded-r-full"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
    
            <div className="mt-auto flex flex-col gap-6 items-center">
              <button
                onClick={handleLogout}
                className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-100 rounded-xl transition-all"
              >
                <LogOut className="w-6 h-6" />
              </button>
              <Link href="/dashboard/profile" className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 hover:border-black transition-colors">
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <span className="text-xs font-bold text-black">{user?.name?.charAt(0) || 'U'}</span>
                </div>
              </Link>
            </div>
          </aside>
    
          {/* Mobile Header */}
          <header className="lg:hidden fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-b border-gray-100 z-50 px-4 py-4 flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                <Navigation className="w-5 h-5 text-white rotate-45" />
              </div>
              <span className="font-bold text-lg tracking-tight text-black">Taxi Québec</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-black"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </header>
    
          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                  onClick={() => setMobileMenuOpen(false)}
                />
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  className="lg:hidden fixed right-0 top-0 bottom-0 w-80 bg-white z-50 shadow-2xl p-6"
                >
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-xl font-bold text-black">Menu</span>
                    <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-gray-400">
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    {navItems.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all ${
                            isActive
                              ? 'bg-black text-white'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <item.icon className="w-6 h-6" />
                          <span className="font-medium">{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
    
                  <div className="absolute bottom-10 left-6 right-6 pt-6 border-t border-gray-100">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-4 px-4 py-4 w-full text-gray-400 hover:text-black transition-colors"
                    >
                      <LogOut className="w-6 h-6" />
                      <span className="font-medium">Déconnexion</span>
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
    
          {/* Mobile Bottom Nav */}
          <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-100 z-40 pb-safe shadow-[0_-1px_10px_rgba(0,0,0,0.05)]">
            <div className="flex items-center justify-around py-3">
              {navItems.slice(0, 4).map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex flex-col items-center gap-1 px-4 transition-all ${
                      isActive ? 'text-black' : 'text-gray-400'
                    }`}
                  >
                    <item.icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.5]'}`} />
                  </Link>
                );
              })}
            </div>
          </nav>
    
          <main className="lg:ml-20 pt-20 lg:pt-0 pb-24 lg:pb-0 min-h-screen">
            <div className="max-w-[1600px] mx-auto min-h-screen px-4 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      );
  }

