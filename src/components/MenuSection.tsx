import React, { useState, useMemo } from 'react';
import { MenuItem, CourseCategory } from '../types';
import { Search, Sparkles, Bookmark, Eye, Droplets, Wine, Check } from 'lucide-react';

interface MenuSectionProps {
  items: MenuItem[];
  lang: 'en' | 'ar';
  onSelectItem: (item: MenuItem) => void;
  savedItemIds: string[];
  onToggleSave: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  items,
  lang,
  onSelectItem,
  savedItemIds,
  onToggleSave
}) => {
  const [activeCategory, setActiveCategory] = useState<CourseCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [chefOnly, setChefOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');

  const categories: { id: CourseCategory; labelEn: string; labelAr: string }[] = [
    { id: 'all', labelEn: 'All Offerings', labelAr: 'جميع الأصناف' },
    { id: 'raw-bar', labelEn: 'Amuse & Raw Bar', labelAr: 'المقبلات والبار الخام' },
    { id: 'entrees', labelEn: 'Deep Trench Entrées', labelAr: 'الأطباق الرئيسية' },
    { id: 'cellar', labelEn: 'Cellar & Vintages', labelAr: 'قبو النبيذ والمشروبات' },
    { id: 'desserts', labelEn: 'Luminescent Desserts', labelAr: 'الحلويات المتوهجة' },
    { id: 'tasting', labelEn: 'Tasting Odyssey', labelAr: 'رحلة التذوق الكاملة' }
  ];

  const dietaryOptions = ['GF', 'DF', 'Raw', 'Sustainable', 'Nut-Free'];

  const toggleDietary = (tag: string) => {
    if (selectedDietary.includes(tag)) {
      setSelectedDietary(selectedDietary.filter((t) => t !== tag));
    } else {
      setSelectedDietary([...selectedDietary, tag]);
    }
  };

  const filteredItems = useMemo(() => {
    return items
      .filter((item) => {
        if (activeCategory !== 'all' && item.category !== activeCategory) return false;
        if (chefOnly && !item.isChefSignature) return false;
        if (selectedDietary.length > 0) {
          const hasAllDietary = selectedDietary.every((d) => item.dietary.includes(d as any));
          if (!hasAllDietary) return false;
        }
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchName = item.name.toLowerCase().includes(query) || (item.nameAr && item.nameAr.includes(query));
          const matchDesc = item.description.toLowerCase().includes(query);
          const matchOrigin = item.origin.toLowerCase().includes(query);
          if (!matchName && !matchDesc && !matchOrigin) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        return 0;
      });
  }, [items, activeCategory, searchQuery, selectedDietary, chefOnly, sortBy]);

  return (
    <section id="menu" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0ea5e9]/10 border border-[#0ea5e9]/20 text-[#89ceff] text-xs font-semibold tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#4fdbc8]" />
            <span>{lang === 'en' ? 'MICHELIN GASTRONOMY' : 'مأكولات ميشلان السحيقة'}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            {lang === 'en' ? 'The Culinary Odyssey' : 'رحلة الطهي في أعماق المحيط'}
          </h2>
          <p className="mt-4 text-[#bec8d2] text-sm sm:text-base font-light">
            {lang === 'en'
              ? 'Each creation is an tribute to the ocean depths, combining wild sustainable catches, artisanal minerals, and rare global vintages.'
              : 'كل طبق هو لوحة فنية تحتفي بأعماق المحيط، تجمع بين الصيد البري المستدام، والمعادن البحرية، والأصناف النادرة.'}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-[#0ea5e9] to-[#14b8a6] text-white shadow-lg shadow-[#0ea5e9]/25 scale-105'
                  : 'glass-panel text-[#bec8d2] hover:text-white hover:bg-white/10 border-white/10'
              }`}
            >
              {lang === 'en' ? cat.labelEn : cat.labelAr}
            </button>
          ))}
        </div>

        {/* Filters & Search Toolbar */}
        <div className="glass-panel rounded-2xl p-4 sm:p-6 mb-10 border-white/10 flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Search Bar */}
          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={lang === 'en' ? 'Search ingredients, wines, origins...' : 'ابحث عن المكونات، المصدر...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0a0d1c] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#0ea5e9] transition"
            />
          </div>

          {/* Dietary Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider mr-1">
              {lang === 'en' ? 'Dietary:' : 'التغذية:'}
            </span>
            {dietaryOptions.map((tag) => {
              const selected = selectedDietary.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleDietary(tag)}
                  className={`px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide transition ${
                    selected
                      ? 'bg-[#14b8a6] text-[#003731] font-bold'
                      : 'bg-white/5 text-[#bec8d2] hover:bg-white/10 border border-white/5'
                  }`}
                >
                  {tag}
                </button>
              );
            })}

            {/* Chef Signature Toggle */}
            <button
              onClick={() => setChefOnly(!chefOnly)}
              className={`px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide flex items-center gap-1.5 transition ${
                chefOnly
                  ? 'bg-[#0ea5e9] text-[#00344d] font-bold'
                  : 'bg-white/5 text-[#89ceff] hover:bg-white/10 border border-white/5'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>{lang === 'en' ? 'Chef Signature' : 'توقيع الشيف'}</span>
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 w-full lg:w-auto justify-end">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              {lang === 'en' ? 'Sort:' : 'ترتيب:'}
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#0a0d1c] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#0ea5e9]"
            >
              <option value="default">{lang === 'en' ? 'Featured Curation' : 'المختارة أولاً'}</option>
              <option value="price-asc">{lang === 'en' ? 'Price: Low to High' : 'السعر: من الأقل للأعلى'}</option>
              <option value="price-desc">{lang === 'en' ? 'Price: High to Low' : 'السعر: من الأعلى للأقل'}</option>
            </select>
          </div>

        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 glass-panel rounded-3xl border-white/10">
            <p className="text-slate-400 font-serif text-lg">
              {lang === 'en' ? 'No culinary items match your refined query.' : 'لم نجد أصنافاً تطابق هذا البحث.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDietary([]);
                setChefOnly(false);
                setActiveCategory('all');
              }}
              className="mt-4 px-5 py-2 rounded-full bg-white/10 text-xs text-[#89ceff] hover:bg-white/20 transition"
            >
              {lang === 'en' ? 'Reset All Filters' : 'إعادة ضبط التصفية'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => {
              const isSaved = savedItemIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  className="glass-panel glass-panel-hover rounded-3xl overflow-hidden border-white/10 flex flex-col group relative"
                >
                  {/* Image Container with Dark Wash */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f1321] via-[#0f1321]/30 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      {item.isChefSignature ? (
                        <span className="px-3 py-1 rounded-full bg-[#0ea5e9]/90 backdrop-blur-md text-[#00344d] font-bold text-[10px] tracking-wider uppercase flex items-center gap-1 shadow-md">
                          <Sparkles className="w-3 h-3 text-white" />
                          <span>{lang === 'en' ? "Chef's Signature" : 'طبق الشيف المميز'}</span>
                        </span>
                      ) : (
                        <span />
                      )}

                      {/* Bookmark Action */}
                      <button
                        onClick={() => onToggleSave(item)}
                        className={`p-2 rounded-full backdrop-blur-md transition ${
                          isSaved
                            ? 'bg-[#14b8a6] text-[#003731]'
                            : 'bg-[#0f1321]/60 text-white hover:bg-[#0f1321]'
                        }`}
                        title="Add to Tasting List"
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Salinity Rating */}
                    {item.salinityRating && (
                      <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full text-[11px] text-[#7bd0ff]">
                        <Droplets className="w-3 h-3 text-[#38bdf8]" />
                        <span>Salinity: {item.salinityRating}/5</span>
                      </div>
                    )}
                  </div>

                  {/* Content Container */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Price & Name */}
                      <div className="flex items-baseline justify-between gap-3 mb-2">
                        <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#89ceff] transition-colors">
                          {lang === 'en' ? item.name : item.nameAr || item.name}
                        </h3>
                        <span className="font-sans text-xl font-extrabold text-[#4fdbc8]">
                          ${item.price}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-[#bec8d2] line-clamp-2 leading-relaxed font-light">
                        {lang === 'en' ? item.description : item.descriptionAr || item.description}
                      </p>

                      {/* Origin & Dietary */}
                      <div className="mt-3 flex flex-wrap items-center gap-1.5">
                        {item.dietary.map((d) => (
                          <span
                            key={d}
                            className="px-2 py-0.5 rounded text-[10px] font-bold uppercase text-[#7bd0ff] bg-[#0ea5e9]/10 border border-[#0ea5e9]/20"
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Wine Pairing Snippet */}
                    <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Wine className="w-3.5 h-3.5 text-[#4fdbc8]" />
                        <span className="truncate max-w-[180px]">{item.winePairing.name}</span>
                      </div>

                      <button
                        onClick={() => onSelectItem(item)}
                        className="flex items-center gap-1 text-xs font-bold text-[#89ceff] hover:text-white transition cursor-pointer"
                      >
                        <span>{lang === 'en' ? 'Details' : 'التفاصيل'}</span>
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
