export type Gender = "رجالي" | "حريمي" | "يونيسكس";
export type Season = "صيفي" | "شتوي" | "طوال السنة";
export type ProductType = "perfume" | "musk" | "incense" | "prayer-beads" | "miswak" | "accessories";

export interface ProductVariant {
  id: string;
  size: string;
  price: number;
  stock: number;
  sku: string;
}

export interface FragranceNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface Product {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  category: ProductType;
  gender?: Gender;
  season?: Season;
  isNiche?: boolean;
  images: string[];
  variants: ProductVariant[];
  notes?: FragranceNotes;
  featured?: boolean;
  inStock: boolean;
  imageFit?: "cover" | "contain";
}

export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
}

export interface ShippingZone {
  id: number;
  nameAr: string;
  governorates: string[];
  price: number;
}

export interface Coupon {
  code: string;
  type: "percent" | "fixed";
  value: number;
  minOrder: number;
  expiresAt: string;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  governorate: string;
  address: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  paymentMethod: "cod" | "vodafone" | "instapay";
  status: "pending" | "confirmed" | "preparing" | "shipped" | "delivered" | "returned";
  createdAt: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
  source?: "seed" | "customer";
}
