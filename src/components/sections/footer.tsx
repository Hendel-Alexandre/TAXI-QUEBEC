"use client";

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/lib/language-context';
import { useBooking } from '@/hooks/use-booking';
import { 
  IconPhone, IconBrandFacebook, IconBrandInstagram, 
  IconBrandYoutube, IconChevronRight, IconArrowUpRight,
  IconMapPin, IconMail
} from '@tabler/icons-react';
import { cn } from '@/lib/utils';

const Footer = () => {
    const { t } = useLanguage();
    const { open } = useBooking();

    const footerLinks = [
        {
            title: t.footer.aboutUs,
            links: [
                { name: t.footer.aboutUs, href: "/about-us" },
                { name: t.footer.pricing, href: "/pricing" },
                { name: t.footer.reviews, href: "/reviews" },
            ]
        },
        {
            title: t.footer.services,
            links: [
                { name: t.services.immediateTaxi, href: "/services#taxi" },
                { name: t.services.airport, href: "/services#airport" },
                { name: t.services.specialized, href: "/services#specialized" },
            ]
        },
        {
            title: "Support",
            links: [
                { name: "Chauffeurs", href: "/drivers" },
                { name: "Contact", href: "/contact-us" },
                { name: "FAQ", href: "/faq" },
            ]
        }
    ];

    return (
        <footer className="w-full bg-[#0f172a] text-white pt-20 pb-10 overflow-hidden relative">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -mr-64 -mt-64 z-0" />
            
            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
                    
                    {/* Brand Section */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="space-y-4">
                            <div className="relative w-[120px] h-[60px]">
                                <Image
                                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/taxi-quebec-logo-removebg-preview-1-1766792742115.png?width=8000&height=8000&resize=contain"
                                    alt="Taxi Québec Logo"
                                    width={120}
                                    height={60}
                                    className="object-contain brightness-0 invert"
                                />
                            </div>
                            <p className="text-slate-400 max-w-sm text-sm leading-relaxed font-medium">
                                {t.footer.headline}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => open()}
                                className="inline-flex h-14 items-center justify-center rounded-2xl bg-[#3b66d4] px-8 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-blue-700 active:scale-95 shadow-xl shadow-blue-900/20 gap-2 group"
                            >
                                Réserver maintenant <IconChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            
                            <a
                                href="tel:+14184764442"
                                className="inline-flex h-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10 px-8 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-white/10 active:scale-95 gap-3"
                            >
                                <IconPhone size={18} className="text-yellow-400" />
                                (418) 476-4442
                            </a>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-4 pt-4">
                            {[
                                { icon: <IconBrandFacebook size={20} />, href: "https://facebook.com" },
                                { icon: <IconBrandInstagram size={20} />, href: "https://instagram.com" },
                                { icon: <IconBrandYoutube size={20} />, href: "https://youtube.com" }
                            ].map((social, i) => (
                                <a 
                                    key={i} 
                                    href={social.href} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-10">
                        {footerLinks.map((group, i) => (
                            <div key={i} className="space-y-6">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">{group.title}</h4>
                                <ul className="space-y-4">
                                    {group.links.map((link, j) => (
                                        <li key={j}>
                                            <a 
                                                href={link.href} 
                                                className="text-sm font-bold text-slate-300 hover:text-yellow-400 transition-colors flex items-center group gap-1"
                                            >
                                                {link.name}
                                                <IconArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 -translate-y-1 translate-x-1 transition-all" />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                        <span>{t.footer.rights}</span>
                    </div>
                    
                    <div className="flex gap-8 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                        <a href="/privacy" className="hover:text-white transition-colors">Confidentialité</a>
                        <a href="/terms" className="hover:text-white transition-colors">Conditions</a>
                        <a href="/cookies" className="hover:text-white transition-colors">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
