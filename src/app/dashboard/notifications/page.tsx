"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  Car, 
  CheckCircle2, 
  Clock, 
  UserCheck,
  MapPin,
  Check,
  Search,
  MoreVertical,
  X,
  Navigation,
  ChevronRight
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

type Notification = {
  id: string;
  type: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
  ride_id: string | null;
};

const notificationIcons: Record<string, React.ReactNode> = {
  ride_confirmed: <CheckCircle2 className="w-5 h-5" />,
  driver_assigned: <UserCheck className="w-5 h-5" />,
  taxi_on_way: <Car className="w-5 h-5" />,
  ride_completed: <MapPin className="w-5 h-5" />,
  default: <Bell className="w-5 h-5" />,
};

const notificationColors: Record<string, string> = {
  ride_confirmed: 'bg-blue-50 text-blue-600 border-blue-100',
  driver_assigned: 'bg-green-50 text-green-600 border-green-100',
  taxi_on_way: 'bg-yellow-50 text-yellow-600 border-yellow-100',
  ride_completed: 'bg-purple-50 text-purple-600 border-purple-100',
  default: 'bg-gray-50 text-gray-400 border-gray-100',
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const router = useRouter();

  const fetchNotifications = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/auth');
        return;
      }

      const { data } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (data) setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();

    const channel = supabase
      .channel('notifications-updates')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'notifications' },
        () => {
          fetchNotifications();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const markAsRead = async (id: string) => {
    await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', id);
    
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, is_read: true } : n
    ));
  };

  const markAllAsRead = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', user.id)
      .eq('is_read', false);
    
    setNotifications(notifications.map(n => ({ ...n, is_read: true })));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'À l\'instant';
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    if (days < 7) return `${days}j`;
    return date.toLocaleDateString('fr-CA', { day: 'numeric', month: 'short' });
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="py-8 max-w-4xl mx-auto space-y-8">
      <header className="flex items-center justify-between px-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-black">Alertes</h1>
          <p className="text-gray-500 text-sm font-medium">
            {unreadCount > 0 
              ? `Vous avez ${unreadCount} message${unreadCount > 1 ? 's' : ''} non lu${unreadCount > 1 ? 's' : ''}`
              : 'Aucun nouveau message'
            }
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="bg-black text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors"
          >
            Tout marquer lu
          </button>
        )}
      </header>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-50">
          {notifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.03 }}
              onClick={() => !notification.is_read && markAsRead(notification.id)}
              className={`p-5 flex items-start gap-4 hover:bg-gray-50 transition-colors cursor-pointer group ${!notification.is_read ? 'bg-blue-50/30' : ''}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${notificationColors[notification.type] || notificationColors.default} flex-shrink-0`}>
                {notificationIcons[notification.type] || notificationIcons.default}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className={`font-bold text-sm ${!notification.is_read ? 'text-black' : 'text-gray-600'}`}>
                    {notification.title}
                  </h3>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatDate(notification.created_at)}
                  </span>
                </div>
                <p className={`text-sm leading-relaxed ${!notification.is_read ? 'text-gray-600' : 'text-gray-400'}`}>
                  {notification.message}
                </p>
                {!notification.is_read && (
                   <div className="mt-2 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-black rounded-full" />
                      <span className="text-[10px] font-bold text-black uppercase tracking-widest">Nouveau</span>
                   </div>
                )}
              </div>
              
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight className="w-5 h-5 text-gray-300" />
              </div>
            </motion.div>
          ))}

          {notifications.length === 0 && (
            <div className="p-16 text-center">
              <div className="w-16 h-16 bg-[#F3F3F3] rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="font-bold text-lg mb-1">Aucune alerte</h3>
              <p className="text-gray-500 text-sm max-w-[240px] mx-auto">
                Vos notifications apparaîtront ici.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
