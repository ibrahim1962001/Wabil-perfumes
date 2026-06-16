export const brand = {
  nameAr: "وابل للعطور",
  nameEn: "Wabil Perfumes",
  pronunciation: "وٌأّبًلَ",
  tagline: "عطر يترك أثر",
  taglineEn: "MADE WITH ORGANIC INGREDIENTS. FEEL THE GOODNESS OF NATURE WITH OUR PRODUCTS.",
  slogan: "وليه تشتري الغالي لما ممكن الغالي يرخصلك",
  bio: [
    "(وٌأّبًلَ) للعطور",
    "تركيب جميع انواع العطور (رجالي/حريمي) بجوده عاليه",
    "مواد طبية 100% — زيوت خام مستوردة من فرنسا مطابقة للأوريجنال تماماً",
    "فوحان 6 ساعات وثبات مدى الحياة ✨",
  ],
  services: [
    "تركيب مخصص",
    "طلب مسبق",
    "خامات للتعتيق بالكميات",
    "بامبات زجاج وتيسترات 10 مل",
    "استرجاع واستبدال",
  ],
  businessModel:
    "تركيب عطور بزيوت خام مستوردة من فرنسا — مطابقة للأوريجنال — أسعار مش موجودة في مصر كلها",
  policies: {
    preOrder: "الأوردرات بطلب مسبق 📩 — للطلب والحجز يرجى الإرسال خاص",
    cairoShipping: "التوصيل مجاني لأي مكان في القاهرة 📌",
    returnPolicy:
      "لو معجبكش البرفان هترجعه عادي جداً وهتاخد فلوسك تاني — وهفضل معاك لغاية ما نلاقي حاجة كويسة وهتعجبك إن شاء الله 🤍",
    rawMaterials: "الخامات المتاحة بالكميات للتعتيق ✨",
    accessories: "البامبات الزجاج الرائعة وتيسترات 10 مللي بسعر خيالي ❤️‍🔥",
  },
  location: {
    area: "المرج",
    city: "القاهرة",
    governorate: "محافظة القاهرة",
    country: "مصر",
  },
  contact: {
    phone: "01020103153",
    phoneAlt: "01008657085",
    email: "blalosama368@gmail.com",
    instagram: "cap_belalosama",
    facebook:
      "https://www.facebook.com/people/Wabil-perfumes-%D9%88%D8%A7%D8%A8%D9%84-%D9%84%D9%84%D8%B9%D8%B7%D9%88%D8%B1/61562720740266/",
  },
  stats: {
    followers: 513,
    rating: 100,
    reviews: 9,
  },
  colors: {
    primary: "#000000",
    accent: "#C9A227",
    background: "#1A1A1A",
  },
  categories: [
    { slug: "perfumes", nameAr: "عطور", nameEn: "Perfumes", icon: "✨" },
    { slug: "musk", nameAr: "مسك وعود", nameEn: "Musk & Oud", icon: "🌙" },
    { slug: "miswak", nameAr: "سواك", nameEn: "Miswak", icon: "🌿" },
    { slug: "prayer-beads", nameAr: "سبح", nameEn: "Prayer Beads", icon: "📿" },
  ],
  freeTesterPromo: {
    title: "هدية مع كل طلب 🎁",
    subtitle: "تيستر 5 مللي من أي عطر تحبه — هنركبه ليك وهو هدية مننا مع كل أوردر ✨",
  },
  muskOudPromo: {
    title: "عرض المسك والعود الخام 🌙",
    subtitle:
      "من #وابل_للعطور — استخدم كل يوم نوع جديد ❤✨ أدخل اسألنا دلوقتي عن عرض المسك والعود ومتنساش تسأل عن باقي العروض وعرض الشحن المجاني 🏷",
    whatsappMessage:
      "مرحباً ✨ عايز أستفسر عن عرض المسك والعود الخام وباقي العروض وعرض الشحن المجاني",
  },
  paymentMethods: [
    "الدفع عند الاستلام (Cash)",
    "فودافون كاش",
    "Instapay",
  ],
  promotion: {
    title: "أسعار مش موجودة في مصر كلها 🙏🏻",
    description: "توصيل مجاني في القاهرة — أوردرات بطلب مسبق",
    minOrder: 1000,
  },
  freeShippingThreshold: 1000,
  freeCairoGovernorates: ["القاهرة"],
  shippingNote: "توصيل مجاني لأي مكان في القاهرة — وباقي المحافظات باتفاق أو فوق 1000 ج.م",
} as const;

export function whatsappLink(message?: string) {
  const phone = brand.contact.phone.replace(/\D/g, "");
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/20${phone.slice(1)}${text}`;
}

export function formatPrice(amount: number) {
  return `${amount.toLocaleString("ar-EG")} ج.م`;
}
