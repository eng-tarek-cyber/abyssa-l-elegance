import React from 'react';
import { MenuItem } from '../types';
import { X, Trash2, Calendar, Sparkles, Wine, ArrowRight } from 'lucide-react';

interface SavedTastingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedItems: MenuItem[];
  onRemoveItem: (id: string) => void;
  onClearAll: () => void;
  lang: 'en' | 'ar';
  onProceedToReservation: () => void;
}

export const SavedTastingDrawer: React.FC<SavedTastingDrawerProps> = ({
  isOpen,
  onClose,
  savedItems,
  onRemoveItem,
  onClearAll,
  lang,
  onProceedToReservation
}) => {
  if (!isOpen) return null;

  const totalPrice = savedItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="glass-panel w-full max-w-md h-full border-l border-white/20 flex flex-col justify-between p-6 sm:p-8 relative shadow-2xl">
        
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#89ceff]" />
              <h3 className="font-serif text-xl font-bold text-white">
                {lang === 'en' ? 'Saved Tasting Journey' : 'قائمة التذوق المحفوظة'}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs text-slate-400 mt-2 font-light">
            {lang === 'en'
              ? 'Your curated selection of abyssal dishes and cellar vintages.'
              : 'مجموعتك المختارة من الأطباق السحيقة والأصناف النادرة.'}
          </p>
        </div>

        {/* List Items */}
        <div className="flex-1 overflow-y-auto my-6 space-y-4 pr-1">
          {savedItems.length === 0 ? (
            <div className="text-center py-12 text-slate-400 space-y-2">
              <p className="font-serif text-base">
                {lang === 'en' ? 'Your tasting list is currently empty.' : 'قائمة التذوق فارغة حالياً.'}
              </p>
              <p className="text-xs text-slate-500">
                {lang === 'en'
                  ? 'Click the bookmark icon on any dish to curate your experience.'
                  : 'انقر على أيقونة الحفظ على أي طبق لإضافته هنا.'}
              </p>
            </div>
          ) : (
            savedItems.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-[#0a0d1c] border border-white/5 flex items-center justify-between gap-3 group"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 rounded-xl object-cover"
                />
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif text-sm font-bold text-white truncate">
                    {lang === 'en' ? item.name : item.nameAr || item.name}
                  </h4>
                  <div className="text-xs text-[#4fdbc8] font-bold mt-0.5">
                    ${item.price}
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Wine className="w-3 h-3 text-[#38bdf8]" />
                    <span className="truncate">{item.winePairing.name}</span>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-white/5 transition"
                  title="Remove Item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Proceed */}
        {savedItems.length > 0 && (
          <div className="pt-4 border-t border-white/10 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">{lang === 'en' ? 'Estimated Prix-Fixe Per Person:' : 'تقدير التكلفة للشخص:'}</span>
              <span className="font-serif text-2xl font-bold text-[#89ceff]">
                ${totalPrice}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onClearAll}
                className="px-4 py-3 rounded-xl bg-white/5 text-xs text-slate-400 hover:text-white hover:bg-white/10 transition"
              >
                {lang === 'en' ? 'Clear All' : 'مسح الكل'}
              </button>

              <button
                onClick={() => {
                  onClose();
                  onProceedToReservation();
                }}
                className="flex-1 py-3.5 rounded-full text-xs font-bold tracking-wider uppercase text-white bg-gradient-to-r from-[#0ea5e9] to-[#14b8a6] hover:opacity-95 shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{lang === 'en' ? 'Reserve With This List' : 'احجز بهذه القائمة'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
