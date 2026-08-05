import React from 'react';
import { Compass, Award, MapPin, Phone, Mail, Clock, ShieldAlert } from 'lucide-react';

interface FooterProps {
  lang: 'en' | 'ar';
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  return (
    <footer className="bg-[#0a0d1c] border-t border-white/10 pt-16 pb-12 text-[#bec8d2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#0ea5e9] to-[#14b8a6] p-[1.5px] flex items-center justify-center shadow-lg">
                <div className="w-full h-full bg-[#0a0d1c] rounded-full flex items-center justify-center">
                  <Compass className="w-4 h-4 text-[#89ceff]" />
                </div>
              </div>
              <span className="font-serif text-xl font-bold text-white tracking-wider">
                ABYSSAL ELEGANCE
              </span>
            </div>
            <p className="text-xs text-slate-400 font-light leading-relaxed">
              {lang === 'en'
                ? 'A 3-Michelin-star deep ocean dining experience curated by Executive Chef Jean-Luc Laurent.'
                : 'تجربة طعام سحيقة في أعماق المحيط حائزة على ٣ نجوم ميشلان بإشراف الشيف جان لوك لوران.'}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0ea5e9]/10 border border-[#0ea5e9]/20 text-[#89ceff] text-[10px] font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-[#4fdbc8]" />
              <span>{lang === 'en' ? 'Michelin Guide 2026 Three Stars' : 'دليل ميشلان ٢٠٢٦ - ٣ نجوم'}</span>
            </div>
          </div>

          {/* Location & Contact */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              {lang === 'en' ? 'Sanctuary Address' : 'موقع المطعم'}
            </h4>
            <div className="text-xs space-y-2 font-light">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#0ea5e9] shrink-0 mt-0.5" />
                <span>Sub-Level 4, Hadal Trench Complex, Oceanic Boulevard</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#14b8a6] shrink-0" />
                <span>+1 (800) 888-ABYSS</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#7bd0ff] shrink-0" />
                <span>concierge@abyssalelegance.com</span>
              </p>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              {lang === 'en' ? 'Dining Hours' : 'ساعات العمل'}
            </h4>
            <div className="text-xs space-y-2 font-light">
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#4fdbc8] shrink-0" />
                <span>Tuesday - Sunday: 18:00 - 23:30</span>
              </p>
              <p className="text-[11px] text-slate-400">
                {lang === 'en' ? 'Closed Mondays for Deep Sea Harvesting' : 'مغلق أيام الاثنين لجني المحاصيل البحرية'}
              </p>
              <div className="pt-2 text-[11px] text-[#7bd0ff] flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Dress Code: Elegant Eveningwear</span>
              </div>
            </div>
          </div>

          {/* Curated Cellar & Awards */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              {lang === 'en' ? 'Accolades' : 'الجوائز والتكريم'}
            </h4>
            <ul className="text-xs space-y-1.5 font-light text-slate-400">
              <li>• World’s 50 Best Restaurants 2026 (#3)</li>
              <li>• Grand Sommelier Excellence Award</li>
              <li>• 100% Sustainable Oceanic Catch Certification</li>
              <li>• Architectural Digest Fine Dining Interior</li>
            </ul>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-light gap-4">
          <p>© 2026 Abyssal Elegance Fine Dining. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="#" className="hover:text-white transition">Press Kit</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
