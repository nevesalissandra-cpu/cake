export interface CakeItem {
  id: string;
  name: string;
  category: 'festivos' | 'vulcao' | 'naked' | 'especiais';
  tag: string;
  shortDesc: string;
  fullDesc: string;
  price: number;
  weight: string;
  servings: string;
  image: string;
  highlights: string[];
  ingredients: string[];
  isPopular?: boolean;
}

export interface BatterOption {
  id: string;
  name: string;
  description: string;
  color: string;
}

export interface FillingOption {
  id: string;
  name: string;
  description: string;
  priceExtra: number;
  color: string;
}

export interface FrostingOption {
  id: string;
  name: string;
  description: string;
  priceExtra: number;
  texture: string;
}

export interface SizeOption {
  id: string;
  name: string;
  weight: string;
  servings: string;
  basePrice: number;
  diameter: string;
}

export interface ExtraOption {
  id: string;
  name: string;
  price: number;
}

export interface CustomCakeConfig {
  batterId: string;
  fillingId: string;
  secondaryFillingId?: string;
  frostingId: string;
  sizeId: string;
  extras: string[];
  customMessage?: string;
}

export interface OrderItem {
  id: string;
  title: string;
  details: string;
  price: number;
  quantity: number;
  isCustom?: boolean;
  image?: string;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  event: string;
  comment: string;
  rating: number;
  avatar: string;
  date: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
