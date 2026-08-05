import React from "react";
import { Image as ImageIcon, Sparkles } from "lucide-react";
import heroBanner from "../assets/images/abyssal_hero_banner_1785947563034.jpg";
import interiorImage from "../assets/images/abyssal_interior_ambiance_1785947579975.jpg";
interface GallerySectionProps {
  lang: "en" | "ar";
}

export const GallerySection: React.FC<GallerySectionProps> = ({ lang }) => {
  const photos = [
    {
      url: interiorImage,
      titleEn: "Hadal Chamber Interior",
      titleAr: "صالة خندق هادال",
      descEn: "Subterranean glass tables with live water features",
      descAr: "طاولات زجاجية زحفية مع نوارات مائية حية",
    },
    {
      url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
      titleEn: "Ocean View Lounge",
      titleAr: "صالة إطلالة المحيط",
      descEn: "Bioluminescent acoustic lighting & deep blue hues",
      descAr: "إضاءة توهج حيوي مع درجات الأزرق العميق",
    },
    {
      url: heroBanner,
      titleEn: "Artisanal Plating",
      titleAr: "الفن في التقديم",
      descEn: "Poached lobster & sea foam on volcanic slate",
      descAr: "استاكوزا مسلوقة ورغوة البحر على أحجار البركان",
    },
    {
      url: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80",
      titleEn: "Private Trench VIP Room",
      titleAr: "الغرفة الخاصة VIP",
      descEn: "Exclusive aquarium enclosure for private banquets",
      descAr: "جدار حوض أسماك حصري للمأدبات الخاصة",
    },
  ];

  return (
    <section id="gallery" className="py-20 relative bg-[#0a0d1c]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14b8a6]/10 border border-[#14b8a6]/20 text-[#4fdbc8] text-xs font-semibold tracking-widest uppercase mb-3">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>
              {lang === "en"
                ? "BIOLUMINESCENT ATMOSPHERE"
                : "معرض الأجواء والجماليات"}
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            {lang === "en" ? "The Ocean Sanctuary" : "ملاذ المحيط والجماليات"}
          </h2>
          <p className="mt-4 text-[#bec8d2] text-sm sm:text-base font-light">
            {lang === "en"
              ? "Step inside our subterranean sanctuary where architectural glass, fluid lighting, and culinary precision unite."
              : "خطوات في ملاذنا تحت الأرض حيث تتناغم الهندسة الزجاجية، والإضاءة السلسة، والدقة الطهوية."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {photos.map((p, idx) => (
            <div
              key={idx}
              className="group glass-panel rounded-3xl overflow-hidden border-white/10 relative h-80 sm:h-96 cursor-pointer"
            >
              <img
                src={p.url}
                alt={p.titleEn}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1321] via-[#0f1321]/30 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />

              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#4fdbc8] block mb-1">
                  Abyssal Architecture
                </span>
                <h3 className="font-serif text-2xl font-bold text-white">
                  {lang === "en" ? p.titleEn : p.titleAr}
                </h3>
                <p className="text-xs text-[#bec8d2] font-light mt-1">
                  {lang === "en" ? p.descEn : p.descAr}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
