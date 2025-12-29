"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { IconMenu, IconX, IconGlobe, IconUser } from "@tabler/icons-react";
import { useLanguage } from "@/lib/language-context";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: "/" },
    { name: t.nav.book, href: "/contact-us" },
    { name: t.nav.contact, href: "/contact" },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fr' : 'en');
  };

  return (
    <header
      className={`fixed left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 w-[95%] max-w-[1360px] ${
        scrolled ? "top-2 bg-primary/95 backdrop-blur-md h-[80px] rounded-[20px]" : "top-4 bg-[#3b66d4] h-[91px] rounded-[20px]"
      }`}
    >
      <div className="container mx-auto h-full px-5 md:px-12.5 flex items-center justify-between max-w-[1360px]">
        <div className="flex-shrink-0">
          <a href="/" className="block relative w-[120px] h-[60px]">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/taxi-quebec-logo-removebg-preview-1-1766792742115.png?width=8000&height=8000&resize=contain"
              alt="Taxi Québec Logo"
              width={120}
              height={60}
              priority
              className="object-contain brightness-0 invert"
            />
          </a>
        </div>

        <nav className="hidden lg:flex items-center gap-[40px]">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[#e6e9f4] text-[18px] font-medium font-sans hover:text-white transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-[#e6e9f4] hover:text-white transition-colors text-[16px] font-medium uppercase"
          >
            <IconGlobe size={20} />
            {language}
          </button>
          
          <a
            href="/auth"
            className="flex items-center gap-2 text-[#e6e9f4] hover:text-white transition-colors text-[16px] font-medium"
          >
            <IconUser size={20} />
            {t.nav.myAccount}
          </a>
          
          <a
            href="/contact-us"
            className="bg-[#e6e9f4] text-primary px-[24px] py-[14px] rounded-[16px] text-[18px] font-semibold hover:bg-white transition-all duration-300 inline-block"
          >
            {t.nav.cta}
          </a>
        </div>

        <div className="flex items-center gap-4 lg:hidden">
          <button
            onClick={toggleLanguage}
            className="text-[#e6e9f4] p-2 flex items-center gap-1 uppercase font-bold text-sm"
          >
            <IconGlobe size={24} />
            {language}
          </button>
          <button
            className="text-[#e6e9f4] p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <IconX size={32} /> : <IconMenu size={32} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-primary border-t border-white/10 shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col p-6 gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[#e6e9f4] text-[20px] font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a
              href="/auth"
              className="text-[#e6e9f4] text-[20px] font-medium flex items-center gap-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <IconUser size={24} />
              {t.nav.myAccount}
            </a>
            <a
              href="/contact-us"
              className="bg-[#e6e9f4] text-primary w-full text-center py-4 rounded-[16px] text-[18px] font-bold mt-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.nav.cta}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navigation;
