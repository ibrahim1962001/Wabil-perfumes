"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart, getCartLineDetails } from "@/components/CartProvider";
import { brand, formatPrice } from "@/lib/brand";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();
  const lines = getCartLineDetails(items);

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <p className="mb-4 text-6xl">🛒</p>
        <h1 className="mb-2 text-2xl font-bold">السلة فارغة</h1>
        <p className="mb-8 text-white/50">لم تضف أي منتجات بعد</p>
        <Link
          href="/shop"
          className="inline-block rounded-full bg-gold px-8 py-3 font-bold text-black"
        >
          تصفح المتجر
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="mb-8 text-3xl font-bold">سلة المشتريات</h1>

      <div className="space-y-4">
        {lines.map(
          (line) =>
            line && (
              <div
                key={`${line.productId}-${line.variantId}`}
                className="flex gap-4 rounded-2xl border border-white/10 bg-charcoal-light p-4"
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={line.product.images[0]}
                    alt={line.product.nameAr}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between sm:flex-row sm:items-center">
                  <div>
                    <h3 className="font-medium">{line.product.nameAr}</h3>
                    <p className="text-sm text-white/50">
                      {line.variant.size}
                    </p>
                    <p className="text-gold">{formatPrice(line.variant.price)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        updateQuantity(
                          line.productId,
                          line.variantId,
                          line.quantity - 1
                        )
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20"
                    >
                      −
                    </button>
                    <span className="w-8 text-center">{line.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(
                          line.productId,
                          line.variantId,
                          line.quantity + 1
                        )
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20"
                    >
                      +
                    </button>
                    <button
                      onClick={() =>
                        removeItem(line.productId, line.variantId)
                      }
                      className="mr-2 text-sm text-red-400 hover:underline"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              </div>
            )
        )}
      </div>

      <div className="mt-8 rounded-2xl border border-gold/20 bg-charcoal-light p-6">
        <p className="mb-4 rounded-xl border border-gold/30 bg-gold/10 px-4 py-3 text-sm text-gold">
          🎁 {brand.freeTesterPromo.subtitle}
        </p>
        <div className="mb-4 flex justify-between text-lg">
          <span>المجموع</span>
          <span className="font-bold text-gold">{formatPrice(subtotal)}</span>
        </div>
        <Link
          href="/checkout"
          className="block w-full rounded-full bg-gold py-3 text-center font-bold text-black transition hover:bg-gold-light"
        >
          إتمام الطلب
        </Link>
      </div>
    </div>
  );
}
