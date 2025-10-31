import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const api = axios.create({ baseURL, timeout: 10000 });

export type ExperienceListItem = {
  id: string;
  title: string;
  description: string;
  location: string;
  priceCents: number;
  coverImageUrl: string;
  rating: number;
};

export type SlotAvailability = {
  id: string;
  startTime: string;
  endTime: string;
  capacity: number;
  booked: number;
  available: number;
};

export type ExperienceDetails = {
  id: string;
  title: string;
  description: string;
  experienceDetails: string;
  location: string;
  priceCents: number;
  coverImageUrl: string;
  galleryImageUrls: string[];
  rating: number;
  slots: SlotAvailability[];
};

export async function fetchExperiences() {
  const res = await api.get<ExperienceListItem[]>('/experiences');
  return res.data;
}

export async function fetchExperience(id: string) {
  const res = await api.get<ExperienceDetails>(`/experiences/${id}`);
  return res.data;
}

export async function validatePromo(code: string) {
  const res = await api.post(`/promo/validate`, { code });
  return res.data as { valid: boolean; type?: 'PERCENT' | 'FLAT'; amountCents?: number; percent?: number };
}

export async function createBooking(input: { experienceId: string; slotId: string; name: string; email: string; promoCode?: string; }) {
  const res = await api.post(`/bookings`, input);
  return res.data as { id: string; message: string };
}

export function formatCents(cents: number) {
  return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(cents / 100);
}


