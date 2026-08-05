import { MenuItem } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'dish-1',
    name: 'Kumbaja Oyster & Sea Foam Caviar',
    nameAr: 'محار كومباجا مع رغوة البحر والكافيار',
    category: 'raw-bar',
    price: 68,
    description: 'Freshly harvested abyssal oysters topped with finger lime spheres, oscietra royal caviar, and sea salt fog.',
    descriptionAr: 'محار سحيق طازج يعلوه كرات الليمون الأصبعي وكافيار أوسيترا الملكي ورذاذ ملح البحر.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    isChefSignature: true,
    salinityRating: 5,
    origin: 'Pristine Arctic Waters, Norway',
    dietary: ['GF', 'DF', 'Raw', 'Sustainable'],
    winePairing: {
      name: "Chablis Grand Cru 'Les Clos'",
      vintage: '2021',
      region: 'Domaine Drouhin, Burgundy',
      tastingNotes: 'Razor-sharp salinity with white peach undertones that complement oyster creaminess.'
    }
  },
  {
    id: 'dish-2',
    name: 'Bluefin Tuna Tartare & Truffle Pearls',
    nameAr: 'تارتار التونة ذات الزعنفة الزرقاء مع لؤلؤ الكمأة',
    category: 'raw-bar',
    price: 85,
    description: 'Wild sustainably-caught Otoro tuna, avocado emulsion, black truffle spheres, and crispy lotus root chips.',
    descriptionAr: 'تونة أوتورو برية مصادة بأسلوب مستدام مع مستحلب الأفوكادو وكرات الكمأة السوداء وشيبس اللوتس المقرمش.',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    isChefSignature: true,
    salinityRating: 3,
    origin: 'Tsukiji Deep Sea Reserve, Japan',
    dietary: ['GF', 'Raw', 'Nut-Free'],
    winePairing: {
      name: 'Puligny-Montrachet 1er Cru',
      vintage: '2019',
      region: 'Domaine Leflaive, France',
      tastingNotes: 'Silky toasted hazelnut aromas grounding rich tuna umami.'
    }
  },
  {
    id: 'dish-3',
    name: 'Butter-Poached Lobster & Saffron Foam',
    nameAr: 'استاكوزا مسلوقة بالزبده مع رغوة الزعفران',
    category: 'entrees',
    price: 140,
    description: 'Maine lobster tail slow-poached in seaweed-infused cultured butter, sweet corn velouté, and Kashmiri saffron emulsion.',
    descriptionAr: 'ذيل استاكوزا مين مسلوق ببطء في زبدة مطعمة بالأعشاب البحرية، فلوتيه الذرة الحلوة مع مستحلب زعفران كشميري.',
    image: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?auto=format&fit=crop&w=800&q=80',
    isChefSignature: true,
    salinityRating: 2,
    origin: 'Deep Bay Atlantic, Maine',
    dietary: ['GF', 'Nut-Free'],
    winePairing: {
      name: 'Meursault-Charmes 1er Cru',
      vintage: '2020',
      region: 'Domaine Roulot, Burgundy',
      tastingNotes: 'Opulent buttery mouthfeel echoing poached sweet lobster flesh.'
    }
  },
  {
    id: 'dish-4',
    name: 'Pan-Seared Chilean Sea Bass',
    nameAr: 'سمك السي باس التشيلي المحمر',
    category: 'entrees',
    price: 125,
    description: 'Crispy skin Chilean Sea Bass over squid ink risotto, dashi consommé broth, and sea asparagus.',
    descriptionAr: 'سمك السي باس التشيلي ذو الجلد المقرمش فوق ريزوتو حبر الحبار، مرق الدواشي والهليون البحري.',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
    isChefSignature: false,
    salinityRating: 4,
    origin: 'Southern Deep Pacific',
    dietary: ['GF', 'DF', 'Sustainable'],
    winePairing: {
      name: 'Pinot Noir Reserve',
      vintage: '2018',
      region: 'Domaine Serene, Willamette Valley',
      tastingNotes: 'Bright cranberry notes cutting through squid ink richness.'
    }
  },
  {
    id: 'dish-5',
    name: 'Royal King Crab Leg & Black Garlic Crisp',
    nameAr: 'ساق سلطعون الملك الملكي مع مقرمش الثوم الأسود',
    category: 'entrees',
    price: 165,
    description: 'Charred Alaskan King Crab leg brushed with black garlic glaze, sea urchin emulsion, and kelp dust.',
    descriptionAr: 'ساق سلطعون الملك الألاسكي المشوي بالثوم الأسود، ومستحلب قنفذ البحر مع غبار العشب البحري.',
    image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=800&q=80',
    isChefSignature: true,
    salinityRating: 3,
    origin: 'Bering Sea Deep Trenches',
    dietary: ['GF', 'DF'],
    winePairing: {
      name: 'Etna Bianco Superiore',
      vintage: '2020',
      region: 'Pietradolce, Sicily',
      tastingNotes: 'Volcanic smoke nuances highlighting charred garlic notes.'
    }
  },
  {
    id: 'dish-6',
    name: 'Krug Grande Cuvée 170th Edition',
    nameAr: 'شامبانيا كروج جراند كوفيه الاصدار 170',
    category: 'cellar',
    price: 480,
    description: 'A blend of 195 wines from 12 different years. Notes of gingerbread, hazelnut, and candied citrus fruit.',
    descriptionAr: 'مزيج من 195 نبيذًا ممتازًا من 12 سنة مختلفة. نكهات الزنجبيل والبندق والفواكه السكرية.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
    isChefSignature: false,
    origin: 'Reims, Champagne, France',
    dietary: ['GF', 'DF', 'Sustainable'],
    winePairing: {
      name: 'House Signature Pair',
      vintage: 'N/V',
      region: 'Champagne, France',
      tastingNotes: 'The absolute pinnacle pairing for raw oysters and caviar.'
    }
  },
  {
    id: 'dish-7',
    name: 'Dassai 23 Migaki Soshizuku Sake',
    nameAr: 'ساكي داساي 23 الفاخر',
    category: 'cellar',
    price: 320,
    description: 'Ultra-premium Junmai Daiginjo polished down to 23% of the rice grain. Delicate white blossom and melon aroma.',
    descriptionAr: 'ساكي ياباني فاخر جداً مصقول حتى 23% من حبة الأرز. عبق زهر الأبيض الشفاف والشمام.',
    image: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=800&q=80',
    isChefSignature: false,
    origin: 'Yamaguchi Prefecture, Japan',
    dietary: ['GF', 'DF', 'Sustainable'],
    winePairing: {
      name: 'Artisanal Sake Pairing',
      vintage: 'Current Release',
      region: 'Yamaguchi, Japan',
      tastingNotes: 'Matches delicate tuna tartare and uni without overwhelming.'
    }
  },
  {
    id: 'dish-8',
    name: 'Bioluminescent Yuzu Sphere',
    nameAr: 'كرة اليوزو المتوهجة مع شيربيت الأعشاب',
    category: 'desserts',
    price: 42,
    description: 'Sugar glass sphere encasing yuzu curd, mint sea sorbet, dark Valrhona chocolate soil, and edible luminescent shimmer.',
    descriptionAr: 'كرة من سكر الزجاج تحتوي على خثرة اليوزو وسوربيه النعناع البحري وتربة شوكولاتة فالرونا مع لمعان حيوي مأكول.',
    image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=80',
    isChefSignature: true,
    salinityRating: 1,
    origin: 'Chef Patissier Specialty',
    dietary: ['GF', 'Nut-Free'],
    winePairing: {
      name: "Château d'Yquem Premier Cru",
      vintage: '2015',
      region: 'Sauternes, Bordeaux',
      tastingNotes: 'Honeyed apricot sweetness that mirrors citrus yuzu tartness.'
    }
  },
  {
    id: 'dish-9',
    name: 'Matcha Sea Salt Soufflé & Pearl Ice Cream',
    nameAr: 'سوفليه الشاي الأخضر بملح البحر مع آيس كريم اللؤلؤ',
    category: 'desserts',
    price: 38,
    description: 'Warm ceremonial grade Uji matcha soufflé served with smoked sea salt, vanilla bean gelato, and caramelized isomalt pearls.',
    descriptionAr: 'سوفليه ماتشا أوجي احتفالي دافئ يقدم مع ملح البحر المدخن وجيلاتو الفانيليا ولآلئ الآيزومالت المكرملة.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    isChefSignature: false,
    salinityRating: 2,
    origin: 'Uji, Kyoto & Madagascar',
    dietary: ['Nut-Free'],
    winePairing: {
      name: 'Tokaji Aszú 5 Puttonyos',
      vintage: '2017',
      region: 'Disznókő, Hungary',
      tastingNotes: 'Exotic dried fig notes balancing matcha herbal bitterness.'
    }
  },
  {
    id: 'dish-10',
    name: 'The Abyssal Trench 7-Course Grand Odyssey',
    nameAr: 'رحلة الأكواب الـ 7 في الخندق السحيق',
    category: 'tasting',
    price: 295,
    description: 'Our signature full-spectrum tasting menu exploring ocean depth progression from coastal shallows to the Hadal Trench.',
    descriptionAr: 'قائمة التذوق الشاملة الخاصة بنا التي تستكشف التدرج الأعماقي من الشواطئ الساحلية إلى خندق هادال السحيق.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    isChefSignature: true,
    salinityRating: 4,
    origin: 'Curated Daily by Executive Chef Jean-Luc Laurent',
    dietary: ['GF', 'Sustainable'],
    winePairing: {
      name: 'Sommelier Grand Pairing Flight (7 Glasses)',
      vintage: 'Curated Vintages',
      region: 'Global Fine Cellar',
      tastingNotes: 'Complete custom flight of rare wines and vintage sakes tailored to each course.'
    }
  }
];

export const SEATING_AREAS = [
  {
    id: 'Ocean View Lounge',
    name: 'Ocean View Lounge',
    nameAr: 'صالة إطلالة المحيط',
    description: 'Panoramic floor-to-ceiling underwater views with gentle bioluminescent acoustics.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    capacity: '2 - 6 Guests',
    vibe: 'Romantic & Serene'
  },
  {
    id: 'Deep Trench Private Room',
    name: 'Deep Trench Private Room',
    nameAr: 'الغرفة الخاصة السحيقة',
    description: 'Secluded subterranean chamber featuring a private aquarium waterwall & dedicated sommelier.',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
    capacity: '4 - 12 Guests',
    vibe: 'Ultra-Exclusive & VIP'
  },
  {
    id: 'Bioluminescent Bar',
    name: 'Bioluminescent Bar',
    nameAr: 'بار التوهج الحيوي',
    description: 'Backlit resin counter with rare spirits, craft oyster shooters, and mixology artistry.',
    image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80',
    capacity: '1 - 4 Guests',
    vibe: 'Vibrant & Modern'
  },
  {
    id: "Chef's Counter",
    name: "Chef's Counter",
    nameAr: 'طاولة الشيف المباشرة',
    description: 'Front-row seat to culinary performance art with live preparation by Master Chef Jean-Luc.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    capacity: '1 - 2 Guests',
    vibe: 'Immersive Culinary Art'
  }
];
