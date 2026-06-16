import type { Review } from "./types";

const STORAGE_KEY = "wabil-reviews";

export const SEED_REVIEWS: Review[] = [
  {
    id: "seed-1",
    name: "محمد ع.",
    rating: 5,
    comment: "جربت سوفاج ووان مليون — مطابقين للأوريجنال تماماً والثبات فوق 6 ساعات. توصيل سريع في المرج.",
    createdAt: "2026-05-10T10:00:00.000Z",
    source: "seed",
  },
  {
    id: "seed-2",
    name: "سارة م.",
    rating: 5,
    comment: "يارا كاندي تحفة فعلاً! ريحتها فاكهية وحلوة وباقية طول اليوم. هطلب تاني إن شاء الله.",
    createdAt: "2026-05-18T14:30:00.000Z",
    source: "seed",
  },
  {
    id: "seed-3",
    name: "أحمد ك.",
    rating: 5,
    comment: "بلو دي شانيل برفيوم من أحسن حاجة جربتها. الأسعار خيالية مقارنة بالسوق.",
    createdAt: "2026-05-22T09:15:00.000Z",
    source: "seed",
  },
  {
    id: "seed-4",
    name: "نورا ح.",
    rating: 5,
    comment: "التيستر المجاني مع الأوردر فكرة حلوة جداً — جربت قبل ما أشتري الحجم الكبير.",
    createdAt: "2026-06-01T16:00:00.000Z",
    source: "seed",
  },
  {
    id: "seed-5",
    name: "كريم س.",
    rating: 5,
    comment: "عرض المسك والعود خام بجودة عالية. التعامل محترم والتوصيل مجاني في القاهرة.",
    createdAt: "2026-06-08T11:45:00.000Z",
    source: "seed",
  },
];

export function getCustomerReviews(): Review[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as Review[];
  } catch {
    return [];
  }
}

export function saveCustomerReview(
  data: Omit<Review, "id" | "createdAt" | "source">
): Review {
  const review: Review = {
    ...data,
    id: `rev-${Date.now()}`,
    createdAt: new Date().toISOString(),
    source: "customer",
  };
  const existing = getCustomerReviews();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([review, ...existing]));
  return review;
}

export function getAllReviews(): Review[] {
  const customer = getCustomerReviews();
  return [...customer, ...SEED_REVIEWS];
}

export function getAverageRating(reviews: Review[]): number {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

export function formatReviewDate(iso: string): string {
  return new Date(iso).toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
