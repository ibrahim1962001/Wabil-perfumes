"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import ProductCard from "@/components/ProductCard";
import { brand } from "@/lib/brand";
import { products } from "@/lib/products";

const categoryFilters = [
  { value: "all", label: "الكل" },
  { value: "perfumes", label: "عطور" },
  { value: "musk", label: "مسك وعود" },
  { value: "miswak", label: "سواك" },
  { value: "prayer-beads", label: "سبح" },
];

const genderFilters = [
  { value: "الكل", label: "الكل" },
  { value: "رجالي", label: "رجالي" },
  { value: "حريمي", label: "حريمي" },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? "all";
  const gender = searchParams.get("gender") ?? "الكل";

  const filtered = products.filter((p) => {
    const catMatch =
      category === "all" ||
      (category === "perfumes" && p.category === "perfume") ||
      p.category === category;
    const genderMatch = gender === "الكل" || p.gender === gender;
    return catMatch && genderMatch;
  });

  const isActiveCategory = (value: string) => {
    if (value === "all") return category === "all";
    if (value === "perfumes") return category === "perfumes";
    return category === value;
  };

  const menCount = products.filter((p) => p.gender === "رجالي").length;
  const womenCount = products.filter((p) => p.gender === "حريمي").length;

  return (
    <div className="container-main section-padding">
      <div className="mb-6 sm:mb-8">
        <h1 className="heading-section mb-2">المتجر</h1>
        <p className="text-body">
          {menCount} عطر رجالي · {womenCount} عطر حريمي · 7 أحجام متاحة
        </p>
        <p className="mt-2 text-xs text-white/40 sm:text-sm">
          {brand.policies.preOrder}
        </p>
      </div>

      <div className="sticky top-[65px] z-30 -mx-4 mb-5 border-b border-white/5 bg-charcoal-dark/95 px-4 py-3 backdrop-blur-md sm:static sm:mx-0 sm:mb-6 sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none">
        <div className="mb-3 flex gap-2 overflow-x-auto pb-1 scrollbar-none sm:flex-wrap sm:overflow-visible">
        {categoryFilters.map((f) => (
          <a
            key={f.value}
            href={`/shop?category=${f.value}${gender !== "الكل" ? `&gender=${gender}` : ""}`}
            className={`shrink-0 rounded-full px-4 py-2.5 text-sm transition-all duration-300 sm:py-2 ${
              isActiveCategory(f.value)
                ? "bg-gold text-black"
                : "border border-white/10 text-white/70 hover:border-gold/40"
            }`}
          >
            {f.label}
          </a>
        ))}
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none sm:flex-wrap sm:overflow-visible">
        {genderFilters.map((g) => (
          <a
            key={g.value}
            href={`/shop?category=${category}${g.value !== "الكل" ? `&gender=${g.value}` : ""}`}
            className={`shrink-0 rounded-full px-3 py-2 text-xs transition-all duration-300 sm:py-1.5 ${
              gender === g.value
                ? "bg-white/10 text-gold"
                : "text-white/50 hover:text-gold"
            }`}
          >
            {g.label}
          </a>
        ))}
        </div>
      </div>

      <p className="mb-4 rounded-xl border border-gold/30 bg-gold/5 px-4 py-3 text-xs text-gold sm:mb-6 sm:text-sm">
        🎁 {brand.freeTesterPromo.subtitle}
      </p>

      <p className="mb-4 rounded-xl border border-gold/20 bg-gold/5 px-4 py-3 text-xs text-gold sm:mb-6 sm:text-sm">
        {category === "musk"
          ? "عرض المسك والعود: من 30 ج.م (6 مل) — إلى 500 ج.م (100 مل) · توصيل مجاني في القاهرة 📌"
          : "من 25 ج.م (رول 6 مل) — إلى 400 ج.م (100 مل) · توصيل مجاني في القاهرة 📌"}
      </p>

      {filtered.length === 0 ? (
        <p className="py-20 text-center text-white/50">لا توجد منتجات</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">جاري التحميل...</div>}>
      <ShopContent />
    </Suspense>
  );
}
