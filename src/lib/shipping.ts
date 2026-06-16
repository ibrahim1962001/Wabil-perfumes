import type { ShippingZone } from "./types";
import { brand } from "./brand";

export const shippingZones: ShippingZone[] = [
  {
    id: 1,
    nameAr: "المنطقة الأولى - القاهرة والجيزة",
    governorates: ["القاهرة", "الجيزة"],
    price: 40,
  },
  {
    id: 2,
    nameAr: "المنطقة الثانية - الدلتا والقناة والإسكندرية",
    governorates: [
      "الإسكندرية",
      "البحيرة",
      "كفر الشيخ",
      "الدقهلية",
      "الشرقية",
      "القليوبية",
      "المنوفية",
      "الغربية",
      "دمياط",
      "بورسعيد",
      "الإسماعيلية",
      "السويس",
    ],
    price: 60,
  },
  {
    id: 3,
    nameAr: "المنطقة الثالثة - الصعيد ومحافظات الحدود",
    governorates: [
      "الفيوم",
      "بني سويف",
      "المنيا",
      "أسيوط",
      "سوهاج",
      "قنا",
      "الأقصر",
      "أسوان",
      "البحر الأحمر",
      "الوادي الجديد",
      "مطروح",
      "شمال سيناء",
      "جنوب سيناء",
    ],
    price: 80,
  },
];

export const allGovernorates = shippingZones.flatMap((z) => z.governorates);

export function getShippingPrice(governorate: string, subtotal: number): number {
  if (brand.freeCairoGovernorates.includes(governorate as "القاهرة")) return 0;
  if (subtotal >= brand.freeShippingThreshold) return 0;
  const zone = shippingZones.find((z) => z.governorates.includes(governorate));
  return zone?.price ?? 80;
}

export const coupons = [
  {
    code: "WABIL10",
    type: "percent" as const,
    value: 10,
    minOrder: 300,
    expiresAt: "2026-12-31",
  },
];

export function validateCoupon(code: string, subtotal: number) {
  const coupon = coupons.find((c) => c.code.toUpperCase() === code.toUpperCase());
  if (!coupon) return { valid: false, discount: 0, message: "كود الخصم غير صالح" };
  if (subtotal < coupon.minOrder)
    return {
      valid: false,
      discount: 0,
      message: `الحد الأدنى للطلب ${coupon.minOrder} ج.م`,
    };
  const discount =
    coupon.type === "percent"
      ? Math.round(subtotal * (coupon.value / 100))
      : coupon.value;
  return { valid: true, discount, message: "تم تطبيق الخصم" };
}
