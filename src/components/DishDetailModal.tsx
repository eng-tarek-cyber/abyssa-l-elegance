import React from 'react';
import { MenuItem } from '../types';
import { X, Wine, Droplets, MapPin, Sparkles, Bookmark, Check } from 'lucide-react';

interface DishDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  lang: 'en' | 'ar';
  isSaved: boolean;
  onToggleSave: (item: MenuItem) => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  item,
  onClose,
  lang,
  isSaved,
  onToggleSave
}) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-white/20 relative shadow-2xl overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image Header */}
        <div className="relative h-64 sm:h-72">
          <img
            src={item.image}
            alt={item.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1321] via-[#0f1321]/40 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-2 mb-2">
              {item.isChefSignature && (
                <span className="px-3 py-1 rounded-full bg-[#0ea5e9] text-[#00344d] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Chef Signature</span>
                </span>
              )}
              <span className="px-3 py-1 rounded-full bg-white/10 text-[#89ceff] text-[10px] font-bold uppercase tracking-wider">
                {item.category}
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white">
              {lang === 'en' ? item.name : item.nameAr || item.name}
            </h2>
          </div>
        </div>

        {/* Body Details */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Price & Salinity */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <span className="text-xs text-slate-400 block uppercase tracking-wider">
                {lang === 'en' ? 'Prix Fixe A La Carte' : 'السعر الفردي'}
              </span>
              <span className="font-sans text-3xl font-extrabold text-[#4fdbc8]">
                ${item.price}
              </span>
            </div>

            {item.salinityRating && (
              <div className="text-right">
                <span className="text-xs text-slate-400 block uppercase tracking-wider">
                  {lang === 'en' ? 'Salinity Profile' : 'نسبة الملوحة'}
                </span>
                <div className="flex items-center gap-1 mt-1 justify-end">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <Droplets
                      key={level}
                      className={`w-4 h-4 ${
                        level <= item.salinityRating!
                          ? 'text-[#38bdf8] fill-[#38bdf8]'
                          : 'text-slate-700'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              {lang === 'en' ? 'Gastronomic Composition' : 'التكوين الطهي'}
            </h4>
            <p className="text-sm text-[#dfe1f6] leading-relaxed font-light">
              {lang === 'en' ? item.description : item.descriptionAr || item.description}
            </p>
          </div>

          {/* Origin & Dietary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-[#0a0d1c] border border-white/5">
            <div>
              <span className="text-[11px] text-slate-400 block font-medium flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#0ea5e9]" />
                {lang === 'en' ? 'Certified Origin:' : 'المصدر المعتمد:'}
              </span>
              <span className="text-xs font-bold text-white mt-1 block">
                {item.origin}
              </span>
            </div>

            <div>
              <span className="text-[11px] text-slate-400 block font-medium">
                {lang === 'en' ? 'Dietary Features:' : 'المميزات الغذائية:'}
              </span>
              <div className="flex flex-wrap gap-1 mt-1">
                {item.dietary.map((d) => (
                  <span
                    key={d}
                    className="px-2 py-0.5 rounded text-[10px] font-bold text-[#7bd0ff] bg-[#0ea5e9]/10"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sommelier Wine Pairing Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-[#171b2a] to-[#1b1f2e] border border-[#89ceff]/20 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#4fdbc8] uppercase tracking-wider">
              <Wine className="w-4 h-4 text-[#89ceff]" />
              <span>{lang === 'en' ? 'Sommelier Vintage Pairing' : 'اقتران النبيذ الموصى به'}</span>
            </div>
            <div className="font-serif text-lg font-bold text-white">
              {item.winePairing.name} ({item.winePairing.vintage})
            </div>
            <div className="text-xs text-[#89ceff]">
              {item.winePairing.region}
            </div>
            <p className="text-xs text-slate-300 italic font-light pt-1">
              "{item.winePairing.tastingNotes}"
            </p>
          </div>

          {/* Action */}
          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={() => onToggleSave(item)}
              className={`w-full py-3.5 rounded-xl text-xs font-bold tracking-wider uppercase transition flex items-center justify-center gap-2 ${
                isSaved
                  ? 'bg-[#14b8a6] text-[#003731]'
                  : 'bg-gradient-to-r from-[#0ea5e9] to-[#14b8a6] text-white shadow-lg'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>
                {isSaved
                  ? lang === 'en' ? 'Saved to Tasting List' : 'محفوظ في قائمة التذوق'
                  : lang === 'en' ? 'Save to My Tasting Experience' : 'إضافة إلى قائمة التذوق'}
              </span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
