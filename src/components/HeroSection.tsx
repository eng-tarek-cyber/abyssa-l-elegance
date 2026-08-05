import React, { useState } from 'react';
import { Award, Calendar, Users, Clock, Sparkles, ChevronDown, Compass } from 'lucide-react';

interface HeroSectionProps {
  lang: 'en' | 'ar';
  onQuickBook: (date: string, time: string, guests: number) => void;
  onExploreMenu: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ lang, onQuickBook, onExploreMenu }) => {
  const [date, setDate] = useState('2026-08-10');
  const [time, setTime] = useState('20:00');
  const [guests, setGuests] = useState(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onQuickBook(date, time, guests);
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background Hero Asset with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/abyssal_hero_banner_1785947563034.jpg"
          alt="Abyssal Elegance Fine Seafood"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 animate-pulse duration-[10000ms]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1321] via-[#0f1321]/80 to-[#0f1321]/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0ea5e9]/15 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Editorial Text */}
          <div className="lg:col-span-7 space-y-8">
            {/* Michelin Star & Luxury Eyebrow */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel border-[#89ceff]/20 bg-[#0ea5e9]/10">
              <Award className="w-4 h-4 text-[#4fdbc8] animate-spin-slow" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#89ceff]">
                {lang === 'en' ? '3 MICHELIN STARS 2026 • HADAL TRENCH DINING' : '٣ نجوم ميشلان ٢٠٢٦ • تجربة أعماق المحيط'}
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
              {lang === 'en' ? (
                <>
                  Where Deep Ocean Meets <span className="bg-gradient-to-r from-[#89ceff] via-[#4fdbc8] to-[#38bdf8] bg-clip-text text-transparent glow-text-primary">Culinary Artistry</span>
                </>
              ) : (
                <>
                  حيث يلتقي عمق المحيط <span className="bg-gradient-to-r from-[#89ceff] via-[#4fdbc8] to-[#38bdf8] bg-clip-text text-transparent">بروعة الفن الطهي</span>
                </>
              )}
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-[#bec8d2] max-w-2xl font-light leading-relaxed">
              {lang === 'en'
                ? 'Immerse your senses in rare wild abyssal catches, 12,000 cellar vintages, and a bioluminescent atmosphere crafted by 3-Michelin-star Master Chef Jean-Luc Laurent.'
                : 'انغمس في تجربة حسية استثنائية مع مأكولات سحيقة برية نادرة، وقبو نبيذ يضم ١٢,٠٠٠ زجاجة فاخرة، وأجواء توهج حيوي غامرة بإشراف الشيف العالمي جان لوك لوران.'}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreMenu}
                className="px-8 py-4 rounded-full text-sm font-bold tracking-wider uppercase text-white bg-gradient-to-r from-[#0ea5e9] to-[#14b8a6] hover:opacity-95 shadow-xl shadow-[#0ea5e9]/30 hover:shadow-[#14b8a6]/50 transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-3"
              >
                <span>{lang === 'en' ? 'Explore Tasting Odyssey' : 'استكشف قائمة التذوق'}</span>
                <Compass className="w-4 h-4 text-[#c9e6ff]" />
              </button>

              <a
                href="#sommelier"
                className="px-6 py-4 rounded-full text-sm font-semibold tracking-wider text-[#dfe1f6] glass-panel glass-panel-hover border-white/10 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#4fdbc8]" />
                <span>{lang === 'en' ? 'Consult AI Sommelier' : 'استشر المستشار الذكي'}</span>
              </a>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10 max-w-lg">
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-[#89ceff]">12,000+</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">
                  {lang === 'en' ? 'Cellar Vintages' : 'زجاجة فاخرة'}
                </div>
              </div>
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-[#4fdbc8]">3 Stars</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">
                  {lang === 'en' ? 'Michelin Guide' : 'دليل ميشلان'}
                </div>
              </div>
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-[#7bd0ff]">100%</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">
                  {lang === 'en' ? 'Wild Sustainable' : 'مستدام و بري'}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Table Reservation Widget */}
          <div className="lg:col-span-5">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border-white/10 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#0ea5e9]/10 rounded-full blur-3xl group-hover:bg-[#14b8a6]/20 transition-all duration-700" />
              
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div>
                  <h3 className="font-serif text-xl font-bold text-white">
                    {lang === 'en' ? 'Instant Table Booking' : 'حجز طاولة فورية'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {lang === 'en' ? 'Guarantee your abyssal dining experience' : 'ضمن مقعدك في أرقى تجربة طعام'}
                  </p>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-[#4fdbc8] animate-ping" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Date */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#bec8d2] mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#0ea5e9]" />
                    {lang === 'en' ? 'Preferred Date' : 'تاريخ الحجز'}
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#0a0d1c] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#0ea5e9] transition"
                    required
                  />
                </div>

                {/* Time & Guests */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#bec8d2] mb-1.5 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#14b8a6]" />
                      {lang === 'en' ? 'Seating Time' : 'وقت الجلسة'}
                    </label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-[#0a0d1c] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#14b8a6] transition"
                    >
                      <option value="18:00">18:00 - Sunset Slot</option>
                      <option value="19:30">19:30 - Prime Slot</option>
                      <option value="20:00">20:00 - Chef Service</option>
                      <option value="21:15">21:15 - Night Abyss</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#bec8d2] mb-1.5 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#7bd0ff]" />
                      {lang === 'en' ? 'Party Size' : 'عدد الضيوف'}
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full bg-[#0a0d1c] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#7bd0ff] transition"
                    >
                      <option value={1}>1 Guest</option>
                      <option value={2}>2 Guests (Couples)</option>
                      <option value={4}>4 Guests (VIP)</option>
                      <option value={6}>6 Guests (Private)</option>
                      <option value={8}>8+ Guests (Grand Room)</option>
                    </select>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-4 mt-2 rounded-xl text-xs font-bold tracking-widest uppercase text-white bg-gradient-to-r from-[#0ea5e9] via-[#04b4a2] to-[#14b8a6] hover:opacity-95 shadow-lg shadow-[#0ea5e9]/20 hover:shadow-[#14b8a6]/40 transition-all cursor-pointer"
                >
                  {lang === 'en' ? 'Check Availability & Reserve' : 'التحقق من التوفر والحجز'}
                </button>
              </form>

              <div className="mt-4 pt-4 border-t border-white/5 text-center">
                <p className="text-[11px] text-slate-400 italic">
                  {lang === 'en'
                    ? 'Smart confirmation via SMS & Email. Dress Code: Smart Elegant.'
                    : 'تأكيد فوري عبر الرسائل البريدية. زي المطعم: أنيق وفاخر.'}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
