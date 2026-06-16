import type { Gender, Product, ProductType, ProductVariant } from "./types";

export const SIZE_VARIANTS: Omit<ProductVariant, "id" | "sku">[] = [
  { size: "6 مل (رول)", price: 25, stock: 100 },
  { size: "8 مل (رول)", price: 30, stock: 100 },
  { size: "18 مل", price: 60, stock: 80 },
  { size: "20 مل", price: 75, stock: 80 },
  { size: "30 مل", price: 100, stock: 60 },
  { size: "50 مل", price: 200, stock: 50 },
  { size: "100 مل", price: 400, stock: 40 },
];

export const PERFUME_DESCRIPTION =
  "مواد طبية 100% ✨ زيوت خام مستوردة بفضل الله من فرنسا من أجود الزيوت العالمية، مطابقة للبرفان الأوريجنال تماماً. فوحان 6 ساعات وثبات مدى الحياة ✨";

const PERFUME_IMAGE = "/images/hero-perfume.png";

function makeVariants(prefix: string): ProductVariant[] {
  const sizes = ["6r", "8r", "18", "20", "30", "50", "100"];
  return SIZE_VARIANTS.map((v, i) => ({
    ...v,
    id: `${prefix}-${sizes[i]}`,
    sku: `${prefix.toUpperCase()}-${sizes[i]}`,
  }));
}

function makePerfume(
  id: string,
  slug: string,
  nameAr: string,
  nameEn: string,
  gender: Gender,
  category: ProductType = "perfume",
  featured = false
): Product {
  return {
    id,
    slug,
    nameAr,
    nameEn,
    descriptionAr: PERFUME_DESCRIPTION,
    category,
    gender,
    season: "طوال السنة",
    isNiche: true,
    images: [PERFUME_IMAGE],
    variants: makeVariants(id),
    featured,
    inStock: true,
  };
}

const menPerfumes: [string, string, string, string, boolean?, ProductType?][] = [
  ["m01", "acqua-di-gio", "اكوا دي جي", "Acqua di Gio"],
  ["m02", "stronger-with-you", "استرونج ويز يوو", "Stronger With You"],
  ["m03", "lacoste-white", "لاكوست وايت", "Lacoste Blanc"],
  ["m04", "lacoste-essential", "لاكوست استنشال", "Lacoste Essential"],
  ["m05", "bleu-de-chanel", "بلو دي شانيل", "Bleu de Chanel", true],
  ["m06", "sauvage", "سوفاج", "Sauvage", true],
  ["m07", "one-million", "وان مليون", "One Million", true],
  ["m08", "bmw", "BMW", "BMW"],
  ["m09", "invictus", "إنفيكتوس", "Invictus"],
  ["m10", "black-lexus", "بلاك ليكزيس", "Black Lexus"],
  ["m11", "black-xs", "بلاك اكس اس", "Black XS"],
  ["m12", "212-men", "212", "212 Men"],
  ["m13", "baccarat-rouge", "بكرات روج", "Baccarat Rouge 540", true],
  ["m14", "musk-ajaybi", "مسك عجايبي", "Musk Ajaybi", false, "musk"],
  ["m15", "white-musk", "مسك ابيض", "White Musk", false, "musk"],
  ["m16", "white-oud", "عود ابيض", "White Oud", false, "musk"],
  ["m17", "moudawi-oud", "عود مضاوي", "Moudawi Oud", false, "musk"],
  ["m18", "bianco-latte", "بيانكو لاتيه", "Bianco Latte"],
  ["m19", "ultra-male", "الترا ميل", "Ultra Male"],
];

const womenPerfumes: [string, string, string, string, boolean?][] = [
  ["w01", "burberry-her", "بيربيري هير", "Burberry Her"],
  ["w02", "crazy-love", "كريزي لاف", "Crazy Love"],
  ["w03", "scandal", "اسكاندل", "Scandal", true],
  ["w04", "yara-candy", "يارا كاندل", "Yara Candy", true],
  ["w05", "organza", "اورجانزا", "Organza"],
  ["w06", "ehsas-g", "احساس جي", "Ehsas G"],
  ["w07", "tendra", "تندرا", "Tendra"],
];

const perfumeProducts: Product[] = [
  ...menPerfumes.map(([id, slug, ar, en, featured, cat]) =>
    makePerfume(id, slug, ar, en, "رجالي", cat ?? "perfume", !!featured)
  ),
  ...womenPerfumes.map(([id, slug, ar, en, featured]) =>
    makePerfume(id, slug, ar, en, "حريمي", "perfume", !!featured)
  ),
];

const otherProducts: Product[] = [
  {
    id: "p4",
    slug: "tybah-sewak",
    nameAr: "سواك طيبة",
    nameEn: "Tybah Sewak",
    descriptionAr: "سواك طبيعي معبأ بعناية. أجمل هدية لكل أفراد الأسرة.",
    category: "miswak",
    images: ["/images/products/tybah-sewak.jpg"],
    variants: [{ id: "p4-1", size: "علبة", price: 45, stock: 30, sku: "SWK-TYB" }],
    inStock: true,
  },
  {
    id: "p5",
    slug: "miswak-madina",
    nameAr: "سواك المدينة",
    nameEn: "Miswak Madina",
    descriptionAr: "سواك المدينة المنورة الأصلي. عبوة فاخرة بعدة قطع.",
    category: "miswak",
    images: ["/images/products/miswak-madina.jpg"],
    variants: [{ id: "p5-1", size: "علبة", price: 40, stock: 25, sku: "SWK-MDN" }],
    inStock: true,
  },
  {
    id: "p6",
    slug: "digital-tasbih-ring",
    nameAr: "خاتم التسبيح الإلكتروني",
    nameEn: "Digital Tasbih Ring",
    descriptionAr: "خاتم تسبيح رقمي بعدة ألوان. مزخرف وعادي.",
    category: "prayer-beads",
    images: ["/images/products/tasbih-ring.jpg"],
    variants: [
      { id: "p6-std", size: "عادي", price: 25, stock: 40, sku: "TSB-STD" },
      { id: "p6-dec", size: "مزخرف", price: 35, stock: 20, sku: "TSB-DEC" },
    ],
    inStock: true,
  },
];

export const products: Product[] = [...perfumeProducts, ...otherProducts];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string) {
  if (category === "all") return products;
  if (category === "perfumes") return products.filter((p) => p.category === "perfume");
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}

export function getMenPerfumes() {
  return products.filter((p) => p.gender === "رجالي");
}

export function getWomenPerfumes() {
  return products.filter((p) => p.gender === "حريمي");
}
