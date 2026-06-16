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
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">المتجر</h1>
        <p className="text-white/50">
          {menCount} عطر رجالي · {womenCount} عطر حريمي · 7 أحجام متاحة
        </p>
        <p className="mt-2 text-sm text-white/40">{brand.policies.preOrder}</p>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {categoryFilters.map((f) => (
          <a
            key={f.value}
            href={`/shop?category=${f.value}${gender !== "الكل" ? `&gender=${gender}` : ""}`}
            className={`rounded-full px-4 py-2 text-sm transition ${
              isActiveCategory(f.value)
                ? "bg-gold text-black"
                : "border border-white/10 text-white/70 hover:border-gold/40"
            }`}
          >
            {f.label}
          </a>
        ))}
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {genderFilters.map((g) => (
          <a
            key={g.value}
            href={`/shop?category=${category}${g.value !== "الكل" ? `&gender=${g.value}` : ""}`}
            className={`rounded-full px-3 py-1.5 text-xs transition ${
              gender === g.value
                ? "bg-white/10 text-gold"
                : "text-white/50 hover:text-gold"
            }`}
          >
            {g.label}
          </a>
        ))}
      </div>

      <p className="mb-6 rounded-xl border border-gold/20 bg-gold/5 px-4 py-3 text-sm text-gold">
        من 25 ج.م (رول 6 مل) — إلى 400 ج.م (100 مل) · توصيل مجاني في القاهرة 📌
      </p>

      {filtered.length === 0 ? (
        <p className="py-20 text-center text-white/50">لا توجد منتجات</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
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
