import React, { useState } from 'react';
import { Sparkles, Wine, Compass, Check, RefreshCw, Send, Bookmark } from 'lucide-react';
import { AISommelierResponse } from '../types';

interface AISommelierSectionProps {
  lang: 'en' | 'ar';
  onBookWithMenu: (title: string) => void;
}

export const AISommelierSection: React.FC<AISommelierSectionProps> = ({ lang, onBookWithMenu }) => {
  const [mood, setMood] = useState('Exquisite Oceanic Luxury');
  const [dietary, setDietary] = useState('None');
  const [courseCount, setCourseCount] = useState(5);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AISommelierResponse | null>(null);
  const [savedMenu, setSavedMenu] = useState(false);

  const moods = [
    { id: 'Exquisite Oceanic Luxury', labelEn: 'Deep Ocean Luxury', labelAr: 'فخامة المحيط السحيق' },
    { id: 'Smoky & Volcanic Mineral', labelEn: 'Smoky & Mineral', labelAr: 'مدخن ومعدني بركاني' },
    { id: 'Fresh & Citrus Saline', labelEn: 'Fresh & Crisp Saline', labelAr: 'منعش وحامضي مالح' },
    { id: 'Rich & Creamy Umami', labelEn: 'Rich & Creamy Umami', labelAr: 'غني وكريمي أومامي' }
  ];

  const dietaryOptions = ['None', 'Gluten-Free', 'Dairy-Free', 'No Shellfish', 'Nut-Free'];

  const handleConsult = async () => {
    setLoading(true);
    setSavedMenu(false);
    try {
      const res = await fetch('/api/ai-sommelier', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mood,
          dietaryRestrictions: dietary,
          courseCount
        })
      });
      const data = await res.json();
      if (data.recommendation) {
        setResult(data.recommendation);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="sommelier" className="py-20 relative bg-[#171b2a]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Form: Preferences */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14b8a6]/10 border border-[#14b8a6]/30 text-[#4fdbc8] text-xs font-semibold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'AI SOMMELIER CURATOR' : 'المستشار الذكي للمأكولات والنبيذ'}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
              {lang === 'en' ? 'Tailor Your Abyssal Journey' : 'صمم رحلة التذوق الخاصة بك'}
            </h2>

            <p className="text-sm text-[#bec8d2] font-light leading-relaxed">
              {lang === 'en'
                ? 'Select your flavor profile and course count. Our AI Master Sommelier will craft a bespoke Michelin-grade pairing flight.'
                : 'اختر نكهتك المفضلة وعدد الأطباق. سيقوم مستشارنا الذكي بابتكار قائمة طعام ونبيذ مخصصة على مستوى ميشلان.'}
            </p>

            <div className="glass-panel rounded-3xl p-6 border-white/10 space-y-5">
              {/* Mood Selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#bec8d2] mb-2">
                  {lang === 'en' ? 'Flavor Vibe / Mood' : 'طابع النكهات والأجواء'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {moods.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMood(m.id)}
                      className={`p-3 rounded-xl text-xs font-medium text-left transition ${
                        mood === m.id
                          ? 'bg-[#0ea5e9] text-[#00344d] font-bold shadow-md'
                          : 'bg-[#0a0d1c] text-[#bec8d2] hover:bg-white/5 border border-white/5'
                      }`}
                    >
                      {lang === 'en' ? m.labelEn : m.labelAr}
                    </button>
                  ))}
                </div>
              </div>

              {/* Course Count Slider */}
              <div>
                <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-[#bec8d2] mb-2">
                  <span>{lang === 'en' ? 'Course Count:' : 'عدد الأطباق:'}</span>
                  <span className="text-[#89ceff] font-bold">{courseCount} Courses</span>
                </div>
                <div className="flex gap-3">
                  {[3, 5, 7].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setCourseCount(num)}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition ${
                        courseCount === num
                          ? 'bg-[#14b8a6] text-[#003731] shadow-md'
                          : 'bg-[#0a0d1c] text-white border border-white/5 hover:bg-white/5'
                      }`}
                    >
                      {num} {lang === 'en' ? 'Courses' : 'أطباق'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dietary Restriction */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#bec8d2] mb-2">
                  {lang === 'en' ? 'Dietary Preference' : 'القيود الغذائية'}
                </label>
                <select
                  value={dietary}
                  onChange={(e) => setDietary(e.target.value)}
                  className="w-full bg-[#0a0d1c] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#14b8a6]"
                >
                  {dietaryOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Action Button */}
              <button
                onClick={handleConsult}
                disabled={loading}
                className="w-full py-4 rounded-xl text-xs font-bold tracking-widest uppercase text-white bg-gradient-to-r from-[#0ea5e9] via-[#04b4a2] to-[#14b8a6] hover:opacity-95 shadow-xl shadow-[#0ea5e9]/20 transition cursor-pointer flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-[#c9e6ff]" />
                    <span>{lang === 'en' ? 'Curating Sommelier Flight...' : 'جاري إعداد القائمة...'}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#c9e6ff]" />
                    <span>{lang === 'en' ? 'Generate Custom Menu Flight' : 'ابتكر القائمة المخصصة'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Display: Curated Menu Flight */}
          <div className="lg:col-span-7">
            {result ? (
              <div className="glass-panel rounded-3xl p-6 sm:p-8 border-[#89ceff]/20 space-y-6 relative overflow-hidden animate-fadeIn">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#0ea5e9]/10 rounded-full blur-3xl" />
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#4fdbc8]">
                      {lang === 'en' ? 'BESPOKE PAIRING Odyssey' : 'رحلة طعام ونبيذ مخصصة'}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-white mt-1">
                      {result.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSavedMenu(true)}
                      className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 transition ${
                        savedMenu
                          ? 'bg-[#14b8a6] text-[#003731]'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>{savedMenu ? (lang === 'en' ? 'Saved' : 'تم الحفظ') : (lang === 'en' ? 'Save Journey' : 'حفظ الرحلة')}</span>
                    </button>
                  </div>
                </div>

                {/* Sommelier Note */}
                <div className="p-4 rounded-2xl bg-[#0ea5e9]/10 border border-[#0ea5e9]/20 text-xs text-[#89ceff] italic flex items-start gap-3">
                  <Wine className="w-5 h-5 text-[#4fdbc8] shrink-0 mt-0.5" />
                  <p>"{result.sommelierNote}"</p>
                </div>

                {/* Courses Stack */}
                <div className="space-y-4">
                  {result.courses.map((c, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-[#0a0d1c] border border-white/5 space-y-2 hover:border-[#89ceff]/30 transition"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-[#4fdbc8] uppercase tracking-wider">
                        <span>{c.course}</span>
                      </div>
                      <div className="font-serif text-lg font-bold text-white">
                        {c.dish}
                      </div>
                      <div className="text-xs text-[#89ceff] flex items-center gap-1.5 font-medium">
                        <Wine className="w-3.5 h-3.5 text-[#38bdf8]" />
                        <span>Pairing: {c.pairing}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-light italic">
                        {c.notes}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Bottom CTA */}
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs text-slate-400">
                    {lang === 'en'
                      ? 'Reserve a table with this bespoke menu flight'
                      : 'احجز طاولتك مع هذه القائمة الخاصة'}
                  </span>
                  <button
                    onClick={() => onBookWithMenu(result.title)}
                    className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-bold tracking-wider uppercase text-white bg-gradient-to-r from-[#0ea5e9] to-[#14b8a6] shadow-lg hover:shadow-[#0ea5e9]/40 transition"
                  >
                    {lang === 'en' ? 'Book Table With This Menu' : 'حجز طاولة مع هذه القائمة'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[420px] glass-panel rounded-3xl p-8 border-white/10 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#0ea5e9]/10 flex items-center justify-center border border-[#0ea5e9]/20">
                  <Compass className="w-8 h-8 text-[#89ceff]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-white">
                  {lang === 'en' ? 'Your Tailored Flight Awaits' : 'قائمتك المخصصة بانتظارك'}
                </h3>
                <p className="text-xs text-slate-400 max-w-sm">
                  {lang === 'en'
                    ? 'Configure your preferences on the left and click "Generate Custom Menu Flight" to consult our AI Master Sommelier.'
                    : 'اختر تفضيلاتك من اليسار وانقر على "ابتكر القائمة المخصصة" لاستشارة خبير النبيذ الذكي.'}
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
