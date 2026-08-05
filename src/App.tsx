import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MenuSection } from './components/MenuSection';
import { AISommelierSection } from './components/AISommelierSection';
import { ReservationSection } from './components/ReservationSection';
import { GallerySection } from './components/GallerySection';
import { DishDetailModal } from './components/DishDetailModal';
import { SavedTastingDrawer } from './components/SavedTastingDrawer';
import { Footer } from './components/Footer';
import { MENU_ITEMS } from './data/menuData';
import { MenuItem, ReservationRequest } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const [savedItems, setSavedItems] = useState<MenuItem[]>([]);
  const [selectedDishDetail, setSelectedDishDetail] = useState<MenuItem | null>(null);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [prefilledMenuTitle, setPrefilledMenuTitle] = useState<string>('');
  const [userReservations, setUserReservations] = useState<ReservationRequest[]>([]);

  const handleToggleSave = (item: MenuItem) => {
    if (savedItems.some((i) => i.id === item.id)) {
      setSavedItems(savedItems.filter((i) => i.id !== item.id));
    } else {
      setSavedItems([...savedItems, item]);
    }
  };

  const handleRemoveSavedItem = (id: string) => {
    setSavedItems(savedItems.filter((i) => i.id !== id));
  };

  const handleClearAllSaved = () => {
    setSavedItems([]);
  };

  const handleBookWithCustomMenu = (menuTitle: string) => {
    setPrefilledMenuTitle(menuTitle);
    setActiveSection('reserve');
    const el = document.getElementById('reserve');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleQuickBook = (date: string, time: string, guests: number) => {
    setActiveSection('reserve');
    const el = document.getElementById('reserve');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreMenu = () => {
    setActiveSection('menu');
    const el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleReservationCreated = (res: ReservationRequest) => {
    setUserReservations([res, ...userReservations]);
  };

  return (
    <div className={`min-h-screen bg-[#0f1321] text-[#dfe1f6] flex flex-col font-sans ${lang === 'ar' ? 'rtl' : 'ltr'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Navigation */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        lang={lang}
        setLang={setLang}
        savedItemsCount={savedItems.length}
        onOpenSaved={() => setIsSavedDrawerOpen(true)}
        onOpenReserveModal={() => {
          setActiveSection('reserve');
          const el = document.getElementById('reserve');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Sections */}
      <main className="flex-1">
        <HeroSection
          lang={lang}
          onQuickBook={handleQuickBook}
          onExploreMenu={handleExploreMenu}
        />

        <MenuSection
          items={MENU_ITEMS}
          lang={lang}
          onSelectItem={(item) => setSelectedDishDetail(item)}
          savedItemIds={savedItems.map((i) => i.id)}
          onToggleSave={handleToggleSave}
        />

        <AISommelierSection
          lang={lang}
          onBookWithMenu={handleBookWithCustomMenu}
        />

        <ReservationSection
          lang={lang}
          prefilledMenuTitle={prefilledMenuTitle}
          onReservationCreated={handleReservationCreated}
        />

        <GallerySection lang={lang} />
      </main>

      {/* Footer */}
      <Footer lang={lang} />

      {/* Dish Details Modal */}
      <DishDetailModal
        item={selectedDishDetail}
        onClose={() => setSelectedDishDetail(null)}
        lang={lang}
        isSaved={selectedDishDetail ? savedItems.some((i) => i.id === selectedDishDetail.id) : false}
        onToggleSave={handleToggleSave}
      />

      {/* Saved Tasting Drawer */}
      <SavedTastingDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedItems={savedItems}
        onRemoveItem={handleRemoveSavedItem}
        onClearAll={handleClearAllSaved}
        lang={lang}
        onProceedToReservation={() => {
          setActiveSection('reserve');
          const el = document.getElementById('reserve');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />
    </div>
  );
}
