import React, { useState } from 'react';
import { SEATING_AREAS } from '../data/menuData';
import { ReservationRequest, SeatingArea } from '../types';
import { Calendar, Clock, Users, ShieldCheck, CheckCircle, Compass, Check, ArrowRight } from 'lucide-react';

interface ReservationSectionProps {
  lang: 'en' | 'ar';
  prefilledMenuTitle?: string;
  onReservationCreated: (res: ReservationRequest) => void;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({
  lang,
  prefilledMenuTitle,
  onReservationCreated
}) => {
  const [seatingArea, setSeatingArea] = useState<SeatingArea>('Ocean View Lounge');
  const [date, setDate] = useState('2026-08-10');
  const [time, setTime] = useState('20:00');
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState(
    prefilledMenuTitle ? `Requested Menu: ${prefilledMenuTitle}` : ''
  );
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState<ReservationRequest | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !date || !time) return;

    setLoading(true);
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          date,
          time,
          guests,
          seatingArea,
          specialRequests
        })
      });
      const data = await res.json();
      if (data.success && data.reservation) {
        setConfirmation(data.reservation);
        onReservationCreated(data.reservation);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="reserve" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0ea5e9]/10 border border-[#0ea5e9]/20 text-[#89ceff] text-xs font-semibold tracking-widest uppercase mb-3">
            <Calendar className="w-3.5 h-3.5 text-[#4fdbc8]" />
            <span>{lang === 'en' ? 'TABLE RESERVATIONS' : 'حجز الطاولات الفاخرة'}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            {lang === 'en' ? 'Reserve Your Sanctuary' : 'احجز طاولتك في المحيط السحيق'}
          </h2>
          <p className="mt-4 text-[#bec8d2] text-sm sm:text-base font-light">
            {lang === 'en'
              ? 'Select your preferred seating atmosphere and date to secure your 3-Michelin-star culinary journey.'
              : 'اختر الجو المفصل لطاولتك وتاريخ الحجز لتأمين مكانك في تجربة ميشلان الاستثنائية.'}
          </p>
        </div>

        {confirmation ? (
          /* Confirmation State */
          <div className="max-w-2xl mx-auto glass-panel rounded-3xl p-8 sm:p-10 border-[#4fdbc8]/30 text-center space-y-6 animate-fadeIn relative">
            <div className="w-16 h-16 rounded-full bg-[#14b8a6]/20 border border-[#14b8a6] flex items-center justify-center mx-auto text-[#4fdbc8]">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#89ceff]">
                {lang === 'en' ? 'RESERVATION CONFIRMED' : 'تم تأكيد الحجز بنجاح'}
              </span>
              <h3 className="font-serif text-3xl font-bold text-white mt-2">
                {lang === 'en' ? 'Welcome to Abyssal Elegance' : 'مرحباً بك في أبيسال إليجانس'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {lang === 'en' ? `Reference ID: ${confirmation.id}` : `رقم المرجع: ${confirmation.id}`}
              </p>
            </div>

            <div className="bg-[#0a0d1c] p-6 rounded-2xl border border-white/5 space-y-3 text-left">
              <div className="flex justify-between text-xs py-1 border-b border-white/5">
                <span className="text-slate-400">{lang === 'en' ? 'Guest Name:' : 'اسم الضيف:'}</span>
                <span className="font-bold text-white">{confirmation.name}</span>
              </div>
              <div className="flex justify-between text-xs py-1 border-b border-white/5">
                <span className="text-slate-400">{lang === 'en' ? 'Seating Area:' : 'منطقة الجلوس:'}</span>
                <span className="font-bold text-[#89ceff]">{confirmation.seatingArea}</span>
              </div>
              <div className="flex justify-between text-xs py-1 border-b border-white/5">
                <span className="text-slate-400">{lang === 'en' ? 'Date & Time:' : 'التاريخ والوقت:'}</span>
                <span className="font-bold text-[#4fdbc8]">{confirmation.date} at {confirmation.time}</span>
              </div>
              <div className="flex justify-between text-xs py-1 border-b border-white/5">
                <span className="text-slate-400">{lang === 'en' ? 'Party Size:' : 'عدد الحضور:'}</span>
                <span className="font-bold text-white">{confirmation.guests} Guests</span>
              </div>
              {confirmation.specialRequests && (
                <div className="flex justify-between text-xs py-1">
                  <span className="text-slate-400">{lang === 'en' ? 'Requests:' : 'ملاحظات:'}</span>
                  <span className="font-medium text-slate-300 italic">{confirmation.specialRequests}</span>
                </div>
              )}
            </div>

            <p className="text-xs text-slate-400 italic">
              {lang === 'en'
                ? 'A detailed digital invitation has been dispatched to your email address.'
                : 'تم إرسال دعوة رقمية تفصيلية إلى بريدك الإلكتروني.'}
            </p>

            <button
              onClick={() => setConfirmation(null)}
              className="px-8 py-3 rounded-full text-xs font-bold tracking-wider uppercase text-white bg-gradient-to-r from-[#0ea5e9] to-[#14b8a6] shadow-lg"
            >
              {lang === 'en' ? 'Make Another Reservation' : 'إجراء حجز آخر'}
            </button>
          </div>
        ) : (
          /* Form State */
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Step 1: Seating Atmosphere Cards */}
            <div>
              <h3 className="font-serif text-xl font-bold text-white mb-4">
                1. {lang === 'en' ? 'Select Seating Atmosphere' : 'اختر أجواء الطاولة'}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {SEATING_AREAS.map((area) => {
                  const selected = seatingArea === area.id;
                  return (
                    <div
                      key={area.id}
                      onClick={() => setSeatingArea(area.id as SeatingArea)}
                      className={`glass-panel glass-panel-hover rounded-2xl overflow-hidden cursor-pointer transition border flex flex-col justify-between ${
                        selected
                          ? 'border-[#0ea5e9] ring-2 ring-[#0ea5e9]/50 shadow-xl'
                          : 'border-white/10'
                      }`}
                    >
                      <div className="relative h-40">
                        <img
                          src={area.image}
                          alt={area.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1321] via-transparent to-transparent" />
                        {selected && (
                          <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#14b8a6] text-black flex items-center justify-center font-bold">
                            <Check className="w-4 h-4" />
                          </div>
                        )}
                      </div>

                      <div className="p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-serif text-base font-bold text-white">
                            {lang === 'en' ? area.name : area.nameAr}
                          </h4>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed font-light">
                          {area.description}
                        </p>
                        <div className="pt-2 flex items-center justify-between text-[10px] text-[#7bd0ff] font-semibold border-t border-white/5">
                          <span>{area.capacity}</span>
                          <span>{area.vibe}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Date, Time, Guests & Contact Form */}
            <div className="glass-panel rounded-3xl p-6 sm:p-10 border-white/10 space-y-8">
              <h3 className="font-serif text-xl font-bold text-white">
                2. {lang === 'en' ? 'Reservation Details & Guest Profile' : 'تفاصيل الحجز والبيانات'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#bec8d2] mb-2 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#0ea5e9]" />
                    {lang === 'en' ? 'Date' : 'التاريخ'}
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#0a0d1c] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#0ea5e9]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#bec8d2] mb-2 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#14b8a6]" />
                    {lang === 'en' ? 'Seating Slot' : 'الوقت'}
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-[#0a0d1c] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#14b8a6]"
                  >
                    <option value="18:00">18:00 (Sunset First Service)</option>
                    <option value="19:30">19:30 (Prime Hadal Service)</option>
                    <option value="20:00">20:00 (Sommelier Signature Service)</option>
                    <option value="21:15">21:15 (Late Abyss Service)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#bec8d2] mb-2 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-[#7bd0ff]" />
                    {lang === 'en' ? 'Guests' : 'الضيوف'}
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full bg-[#0a0d1c] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#7bd0ff]"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((g) => (
                      <option key={g} value={g}>
                        {g} {g === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Guest Personal Information */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-white/5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#bec8d2] mb-2">
                    {lang === 'en' ? 'Full Name' : 'الاسم الكامل'} *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Lord Eleanor Vance"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#0a0d1c] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#0ea5e9]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#bec8d2] mb-2">
                    {lang === 'en' ? 'Email Address' : 'البريد الإلكتروني'} *
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. vance@luxury.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#0a0d1c] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#0ea5e9]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#bec8d2] mb-2">
                    {lang === 'en' ? 'Phone Number' : 'رقم الهاتف'}
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 019-2831"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#0a0d1c] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#0ea5e9]"
                  />
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#bec8d2] mb-2">
                  {lang === 'en' ? 'Special Notes, Anniversaries or Allergies' : 'ملاحظات خاصة، المناسبات أو الحساسية'}
                </label>
                <textarea
                  rows={3}
                  placeholder={
                    lang === 'en'
                      ? 'e.g. Celebrating 10th anniversary, window view preferred, shellfish allergy for 1 guest...'
                      : 'مثال: الاحتفال بذكرى زواج، تفضيل طاولة بجانب الحوض...'
                  }
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full bg-[#0a0d1c] border border-white/10 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-[#0ea5e9]"
                />
              </div>

              {/* Confirm Booking CTA */}
              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-10 py-4 rounded-full text-xs font-bold tracking-widest uppercase text-white bg-gradient-to-r from-[#0ea5e9] via-[#04b4a2] to-[#14b8a6] hover:opacity-95 shadow-xl shadow-[#0ea5e9]/25 transition cursor-pointer flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span>{lang === 'en' ? 'Confirming Reservation...' : 'جاري تأكيد الحجز...'}</span>
                  ) : (
                    <>
                      <span>{lang === 'en' ? 'Confirm Sanctuary Reservation' : 'تأكيد الحجز النهائي'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
