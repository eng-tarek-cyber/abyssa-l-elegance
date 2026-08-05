import React, { useState, useEffect } from 'react';
import { Compass, Sparkles, Calendar, Utensils, Image as ImageIcon, Globe, Bookmark, Menu as MenuIcon, X } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  lang: 'en' | 'ar';
  setLang: (lang: 'en' | 'ar') => void;
  savedItemsCount: number;
  onOpenSaved: () => void;
  onOpenReserveModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  setActiveSection,
  lang,
  setLang,
  savedItemsCount,
  onOpenSaved,
  onOpenReserveModal
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'menu', label: lang === 'en' ? 'Culinary Menu' : 'قائمة المأكولات', icon: Utensils },
    { id: 'sommelier', label: lang === 'en' ? 'AI Sommelier' : 'المستشار الذكي', icon: Sparkles },
    { id: 'reserve', label: lang === 'en' ? 'Reservations' : 'الحجوزات', icon: Calendar },
    { id: 'gallery', label: lang === 'en' ? 'Ocean Atmosphere' : 'أجواء الأعماق', icon: ImageIcon }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0f1321]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3'
          : 'bg-gradient-to-b from-[#0f1321]/90 via-[#0f1321]/50 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => setActiveSection('hero')}
          className="flex items-center gap-3 group text-left cursor-pointer"
        >
          <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-[#0ea5e9] to-[#14b8a6] p-[1.5px] flex items-center justify-center shadow-lg shadow-[#0ea5e9]/20 group-hover:shadow-[#14b8a6]/40 transition-all">
            <div className="w-full h-full bg-[#0a0d1c] rounded-full flex items-center justify-center">
              <Compass className="w-5 h-5 text-[#89ceff] group-hover:rotate-45 transition-transform duration-500" />
            </div>
          </div>
          <div>
            <span className="font-serif text-xl font-bold tracking-wider text-white block">
              ABYSSAL
            </span>
            <span className="text-[10px] tracking-[0.25em] text-[#89ceff] uppercase font-semibold block -mt-1">
              {lang === 'en' ? 'Elegance Fine Dining' : 'مطعم المأكولات الفاخرة'}
            </span>
          </div>
        </button>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 glass-panel rounded-full px-4 py-1.5 border-white/10">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  const el = document.getElementById(item.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#0ea5e9]/20 to-[#14b8a6]/20 text-[#89ceff] border border-[#89ceff]/30 shadow-sm'
                    : 'text-[#bec8d2] hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#89ceff]' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#bec8d2] bg-white/5 hover:bg-white/10 border border-white/10 transition"
            title="Toggle Language"
          >
            <Globe className="w-3.5 h-3.5 text-[#4fdbc8]" />
            <span className="uppercase tracking-wider">{lang === 'en' ? 'العربية' : 'EN'}</span>
          </button>

          {/* Saved Items / Cart */}
          <button
            onClick={onOpenSaved}
            className="relative p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition"
            aria-label="Tasting Experience List"
          >
            <Bookmark className="w-4 h-4 text-[#89ceff]" />
            {savedItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#14b8a6] text-[#003731] font-bold text-[10px] rounded-full flex items-center justify-center animate-pulse">
                {savedItemsCount}
              </span>
            )}
          </button>

          {/* Primary CTA */}
          <button
            onClick={onOpenReserveModal}
            className="px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase text-white bg-gradient-to-r from-[#0ea5e9] via-[#04b4a2] to-[#14b8a6] hover:opacity-95 shadow-lg shadow-[#0ea5e9]/25 hover:shadow-[#14b8a6]/40 transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            {lang === 'en' ? 'Reserve Table' : 'حجز طاولة'}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="p-2 rounded-lg bg-white/5 text-xs text-[#bec8d2]"
          >
            {lang === 'en' ? 'AR' : 'EN'}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white glass-panel rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden glass-panel border-t border-white/10 px-4 py-6 mt-3 space-y-4 animate-fadeIn">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setMobileMenuOpen(false);
                  const el = document.getElementById(item.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#dfe1f6] hover:bg-white/10"
              >
                <Icon className="w-4 h-4 text-[#89ceff]" />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-2 border-t border-white/10 flex flex-col gap-3">
            <button
              onClick={() => {
                onOpenSaved();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 text-sm text-[#89ceff]"
            >
              <span className="flex items-center gap-2">
                <Bookmark className="w-4 h-4" />
                {lang === 'en' ? 'Saved Tasting List' : 'قائمة التذوق المحفوظة'}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#14b8a6] text-black font-bold text-xs">
                {savedItemsCount}
              </span>
            </button>

            <button
              onClick={() => {
                onOpenReserveModal();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-full text-xs font-bold tracking-wider uppercase text-white bg-gradient-to-r from-[#0ea5e9] to-[#14b8a6] shadow-lg shadow-[#0ea5e9]/20"
            >
              {lang === 'en' ? 'Book a Table' : 'احجز طاولتك الآن'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
