import type { Gender, Product, ProductType, ProductVariant } from "./types";

export const SIZE_VARIANTS: Omit<ProductVariant, "id" | "sku">[] = [
  { size: "6 مل (رول)", price: 25, stock: 100 },
  { size: "8 مل (رول)", price: 35, stock: 100 },
  { size: "18 مل", price: 60, stock: 80 },
  { size: "20 مل", price: 75, stock: 80 },
  { size: "30 مل", price: 100, stock: 60 },
  { size: "50 مل", price: 200, stock: 50 },
  { size: "100 مل", price: 400, stock: 40 },
];

export const MUSK_OUD_SIZE_VARIANTS: Omit<ProductVariant, "id" | "sku">[] = [
  { size: "6 مل", price: 30, stock: 100 },
  { size: "8 مل", price: 40, stock: 100 },
  { size: "18 مل", price: 90, stock: 80 },
  { size: "20 مل", price: 100, stock: 80 },
  { size: "30 مل", price: 150, stock: 60 },
  { size: "50 مل", price: 250, stock: 50 },
  { size: "100 مل", price: 500, stock: 40 },
];

export const PERFUME_DESCRIPTION =
  "مواد طبية 100% ✨ زيوت خام مستوردة بفضل الله من فرنسا من أجود الزيوت العالمية، مطابقة للبرفان الأوريجنال تماماً. فوحان 6 ساعات وثبات مدى الحياة ✨";

const PERFUME_IMAGE = "/images/hero-perfume.png";

const MUSK_OUD_DESCRIPTION =
  "عرض المسك والعود الخام من وابل للعطور — استخدم كل يوم نوع جديد ❤✨ خامات أصلية فاخرة، تركيب متاح بكل الأحجام. وليه تشتري الغالي لما ممكن الغالي يرخصلك ♥";

function makeVariants(
  prefix: string,
  sizes: Omit<ProductVariant, "id" | "sku">[] = SIZE_VARIANTS
): ProductVariant[] {
  const sizeKeys = ["6r", "8r", "18", "20", "30", "50", "100"];
  return sizes.map((v, i) => ({
    ...v,
    id: `${prefix}-${sizeKeys[i]}`,
    sku: `${prefix.toUpperCase()}-${sizeKeys[i]}`,
  }));
}

function makeMuskOudVariants(prefix: string): ProductVariant[] {
  return makeVariants(prefix, MUSK_OUD_SIZE_VARIANTS);
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

function makeMuskOud(
  id: string,
  slug: string,
  nameAr: string,
  nameEn: string,
  featured = false,
  image?: string
): Product {
  return {
    id,
    slug,
    nameAr,
    nameEn,
    descriptionAr: MUSK_OUD_DESCRIPTION,
    category: "musk",
    gender: "يونيسكس",
    season: "طوال السنة",
    images: [image ?? "/images/products/musk-oud-offer.png"],
    variants: makeMuskOudVariants(id),
    featured,
    inStock: true,
    imageFit: "cover",
  };
}

const menPerfumes: [string, string, string, string, boolean?, ProductType?][] = [
  ["m01", "acqua-di-gio", "اكوا دي جي", "Acqua di Gio"],
  ["m02", "stronger-with-you", "استرونج ويز يوو", "Stronger With You"],
  ["m03", "lacoste-white", "لاكوست وايت", "Lacoste Blanc"],
  ["m04", "lacoste-essential", "لاكوست استنشال", "Lacoste Essential"],
  ["m06", "sauvage", "سوفاج", "Sauvage", true],
  ["m07", "one-million", "وان مليون", "One Million", true],
  ["m08", "bmw", "BMW", "BMW"],
  ["m09", "invictus", "إنفيكتوس", "Invictus"],
  ["m12", "212-men", "212", "212 Men"],
  ["m13", "baccarat-rouge", "بكرات روج", "Baccarat Rouge 540", true],
  ["m18", "bianco-latte", "بيانكو لاتيه", "Bianco Latte"],
  ["m19", "ultra-male", "الترا ميل", "Ultra Male"],
];

const womenPerfumes: [string, string, string, string, boolean?][] = [
  ["w01", "burberry-her", "بيربيري هير", "Burberry Her"],
  ["w02", "crazy-love", "كريزي لاف", "Crazy Love"],
  ["w03", "scandal", "اسكاندل", "Scandal", true],
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
  {
    id: "w04",
    slug: "yara-candy",
    nameAr: "يارا كاندي 🍓",
    nameEn: "Yara Candy",
    descriptionAr:
      "عطر يارا كاندي للنساء — فخامة وأناقة غير مسبوقة في عالم العطور. عطر زهري فاكهي. مواد طبية 100%، زيوت خام مستوردة من فرنسا، مطابق للأوريجنال تماماً. فوحان 6 ساعات وثبات مدى الحياة ✨",
    category: "perfume",
    gender: "حريمي",
    season: "طوال السنة",
    isNiche: true,
    images: ["/images/products/yara-candy.png"],
    variants: makeVariants("w04"),
    notes: {
      top: ["كاندي فراولة 🍓", "اليوسفي الأخضر 🍏"],
      heart: ["فانيليا", "زهري"],
      base: ["مسك أبيض", "خشب الصندل"],
    },
    featured: true,
    inStock: true,
    imageFit: "contain",
  },
  {
    id: "m05",
    slug: "bleu-de-chanel",
    nameAr: "بلو دي شانيل برفيوم 💙",
    nameEn: "Bleu de Chanel Parfum",
    descriptionAr:
      "عطر بلو دي شانيل برفيوم من شانيل 💙 — ظهر في 2018، عطر خشبي أروماتيك للرجال. الشكل الأكثر تركيزاً من إصدار البرفيوم، يتسم بالقوة والجودة ويعكس روح التصميم. يعتمد على النكهة الخشبية العميقة لأخشاب الأرز والصندل. عطر غير متوقع وجريء — عنوان الفخامة والأناقة! واضح وحسي للغاية، للرجل الواثق صاحب الشخصية المتألقة ⭐️",
    category: "perfume",
    gender: "رجالي",
    season: "طوال السنة",
    isNiche: true,
    images: ["/images/products/bleu-de-chanel.png"],
    variants: makeMuskOudVariants("m05"),
    notes: {
      top: ["ليمون", "نعناع", "بخور"],
      heart: ["جريجفر", "جنكير", "فلفل وردي"],
      base: ["أرز", "صندل", "عرعر", "برغموت"],
    },
    featured: true,
    inStock: true,
    imageFit: "contain",
  },
  {
    id: "m11",
    slug: "black-xs",
    nameAr: "بلاك اكس اس ليكزيس 🖤",
    nameEn: "Black XS L'Excès",
    descriptionAr:
      "عطر بلاك اكس اس ليكزيس الرجالي 🖤 — من العطور التي ستدمن اقتناءَها سريعاً؛ وذلك بسبب اتجاهه المنعش المميز. مواد طبية 100%، زيوت خام مستوردة من فرنسا، مطابق للأوريجنال تماماً. فوحان 6 ساعات وثبات مدى الحياة ✨",
    category: "perfume",
    gender: "رجالي",
    season: "طوال السنة",
    isNiche: true,
    images: ["/images/products/black-xs.png"],
    variants: makeMuskOudVariants("m11"),
    notes: {
      top: ["ليمون", "لافندر"],
      heart: ["نسيم البحر", "كابريول"],
      base: ["باتشولي", "عنبر"],
    },
    featured: true,
    inStock: true,
    imageFit: "contain",
  },
];

const muskOudProducts: Product[] = [
  {
    id: "m00",
    slug: "musk-oud-offer",
    nameAr: "عرض المسك والعود الخام",
    nameEn: "Musk & Raw Oud Offer",
    descriptionAr: MUSK_OUD_DESCRIPTION,
    category: "musk",
    gender: "يونيسكس",
    season: "طوال السنة",
    images: ["/images/products/musk-oud-offer.png"],
    variants: makeMuskOudVariants("m00"),
    notes: {
      top: ["مسك أبيض", "مسك عجايبي"],
      heart: ["عود خام", "عود أبيض"],
      base: ["عود مضاوي", "خامات مركزة"],
    },
    featured: true,
    inStock: true,
    imageFit: "cover",
  },
  makeMuskOud("m14", "musk-ajaybi", "مسك عجايبي", "Musk Ajaybi"),
  makeMuskOud("m15", "white-musk", "مسك ابيض", "White Musk"),
  makeMuskOud("m16", "white-oud", "عود ابيض", "White Oud"),
  makeMuskOud("m17", "moudawi-oud", "عود مضاوي", "Moudawi Oud"),
];

const otherProducts: Product[] = [
  {
    id: "p4",
    slug: "tybah-sewak",
    nameAr: "سواك طيبة",
    nameEn: "Tybah Sewak",
    descriptionAr: "سواك طبيعي 100% — معبأ بعناية ومحكم التغليف. أجمل هدية لكل أفراد الأسرة. سعر المسواك 25 جنيه بأذن الله.",
    category: "miswak",
    images: ["/images/products/tybah-sewak.png"],
    variants: [{ id: "p4-1", size: "علبة", price: 25, stock: 30, sku: "SWK-TYB" }],
    inStock: true,
    imageFit: "contain",
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

export const products: Product[] = [...perfumeProducts, ...muskOudProducts, ...otherProducts];

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
