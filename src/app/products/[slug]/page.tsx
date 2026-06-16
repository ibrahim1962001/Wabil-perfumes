"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useCart } from "@/components/CartProvider";
import { getProductBySlug } from "@/lib/products";
import { formatPrice } from "@/lib/brand";

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);
  const defaultVariantId =
    product?.variants.find((v) => v.size.includes("50"))?.id ??
    product?.variants[0]?.id ??
    "";
  const { addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(defaultVariantId);
  const [added, setAdded] = useState(false);

  if (!product) notFound();

  const variant =
    product.variants.find((v) => v.id === selectedVariant) ??
    product.variants[0];

  const handleAdd = () => {
    addItem(product.id, variant.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="container-main section-padding">
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
        <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-charcoal lg:max-w-none">
          <Image
            src={product.images[0]}
            alt={product.nameAr}
            fill
            className={product.imageFit === "contain" ? "object-contain bg-white" : "object-cover"}
            priority
            sizes="(max-width:1024px) 100vw, 50vw"
          />
        </div>

        <div>
          <nav className="mb-4 text-sm text-white/40">
            <Link href="/shop" className="hover:text-gold">
              المتجر
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white/70">{product.nameAr}</span>
          </nav>

          <h1 className="mb-2 text-xl font-bold sm:text-2xl lg:text-3xl">
            {product.nameAr}
          </h1>
          <p className="mb-4 text-white/50">{product.nameEn}</p>

          <div className="mb-4 flex flex-wrap gap-2">
            {product.gender && (
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs">
                {product.gender}
              </span>
            )}
            {product.season && (
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs">
                {product.season}
              </span>
            )}
            {product.isNiche && (
              <span className="rounded-full bg-gold/20 px-3 py-1 text-xs text-gold">
                نيش / بدائل عالمية
              </span>
            )}
          </div>

          <p className="mb-6 leading-relaxed text-white/70">
            {product.descriptionAr}
          </p>

          <div className="mb-6">
            <p className="mb-2 text-sm text-white/50">اختر الحجم</p>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v.id)}
                  className={`min-h-[52px] rounded-xl border px-3 py-2.5 text-sm transition-all duration-300 sm:px-4 sm:py-3 ${
                    selectedVariant === v.id
                      ? "border-gold bg-gold/10 text-gold"
                      : "border-white/10 hover:border-gold/40"
                  }`}
                >
                  <span className="block font-medium">{v.size}</span>
                  <span className="text-xs opacity-70">
                    {formatPrice(v.price)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <p className="mb-6 text-2xl font-bold text-gold sm:text-3xl">
            {formatPrice(variant.price)}
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleAdd}
              disabled={!product.inStock}
              className="btn-primary flex-1 disabled:opacity-50"
            >
              {added ? "✓ تمت الإضافة" : "أضف للسلة"}
            </button>
            <Link href="/cart" className="btn-outline px-6 sm:px-8">
              السلة
            </Link>
          </div>

          {product.notes ? (
            <div className="mt-10 rounded-2xl border border-white/10 bg-charcoal-light p-6">
              <h3 className="mb-4 font-bold text-gold">الهرم العطري</h3>
              <div className="grid gap-4 sm:grid-cols-3">
                {(
                  [
                    ["الافتتاحية", product.notes.top],
                    ["القلب", product.notes.heart],
                    ["القاعدة", product.notes.base],
                  ] as const
                ).map(([label, notes]) => (
                  <div key={label}>
                    <p className="mb-1 text-sm text-gold">{label}</p>
                    <p className="text-sm text-white/70">{notes.join(" · ")}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border border-white/10 bg-charcoal-light p-6">
              <h3 className="mb-4 font-bold text-gold">مميزات المنتج</h3>
              <ul className="grid gap-2 text-sm text-white/70 sm:grid-cols-2">
                <li>✓ مواد طبية 100%</li>
                <li>✓ زيوت خام مستوردة من فرنسا</li>
                <li>✓ مطابق للأوريجنال تماماً</li>
                <li>✓ فوحان 6 ساعات</li>
                <li>✓ ثبات مدى الحياة</li>
                <li>✓ تركيب متاح بكل الأحجام</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
