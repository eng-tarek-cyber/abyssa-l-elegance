export type CourseCategory = 'all' | 'raw-bar' | 'entrees' | 'cellar' | 'desserts' | 'tasting';

export type SeatingArea = 'Ocean View Lounge' | 'Deep Trench Private Room' | 'Bioluminescent Bar' | 'Chef\'s Counter';

export interface WinePairing {
  name: string;
  vintage: string;
  region: string;
  tastingNotes: string;
}

export interface MenuItem {
  id: string;
  name: string;
  nameAr?: string;
  category: CourseCategory;
  price: number;
  description: string;
  descriptionAr?: string;
  image: string;
  isChefSignature?: boolean;
  salinityRating?: number; // 1-5 scale
  origin: string;
  dietary: ('GF' | 'DF' | 'Raw' | 'Sustainable' | 'Nut-Free')[];
  winePairing: WinePairing;
  calories?: number;
}

export interface ReservationRequest {
  id?: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seatingArea: SeatingArea;
  specialRequests?: string;
}

export interface AISommelierCourse {
  course: string;
  dish: string;
  pairing: string;
  notes: string;
}

export interface AISommelierResponse {
  title: string;
  sommelierNote: string;
  courses: AISommelierCourse[];
}
