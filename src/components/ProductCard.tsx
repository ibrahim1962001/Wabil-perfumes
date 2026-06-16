import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/brand";

export default function ProductCard({ product }: { product: Product }) {
  const minPrice = Math.min(...product.variants.map((v) => v.price));

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group card-hover overflow-hidden rounded-2xl border border-white/10 bg-charcoal-light"
    >
      <div className="relative aspect-square overflow-hidden bg-charcoal">
        <Image
          src={product.images[0]}
          alt={product.nameAr}
          fill
          className={`${product.imageFit === "contain" ? "object-contain bg-white" : "object-cover"} transition-transform duration-500 ease-out group-hover:scale-105`}
          sizes="(max-width:640px) 45vw, (max-width:1024px) 33vw, 25vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal-dark/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {!product.inStock && (
          <span className="absolute left-2 top-2 rounded-full bg-red-900/90 px-2.5 py-1 text-[10px] text-white sm:left-3 sm:top-3 sm:px-3 sm:text-xs">
            نفذت الكمية
          </span>
        )}
        {product.featured && (
          <span className="absolute right-2 top-2 rounded-full bg-gold px-2.5 py-1 text-[10px] font-bold text-black sm:right-3 sm:top-3 sm:px-3 sm:text-xs">
            مميز
          </span>
        )}
      </div>
      <div className="p-3 sm:p-4">
        <h3 className="mb-0.5 line-clamp-2 text-sm font-medium leading-snug text-white transition-colors group-hover:text-gold sm:mb-1 sm:text-base">
          {product.nameAr}
        </h3>
        <p className="mb-2 truncate text-[11px] text-white/45 sm:text-xs">
          {product.nameEn}
        </p>
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-semibold text-gold sm:text-base">
            من {formatPrice(minPrice)}
          </span>
          {product.gender && (
            <span className="shrink-0 rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-white/50 sm:text-xs">
              {product.gender}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
