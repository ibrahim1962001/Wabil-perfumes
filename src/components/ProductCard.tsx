import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/brand";

export default function ProductCard({ product }: { product: Product }) {
  const minPrice = Math.min(...product.variants.map((v) => v.price));

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-charcoal-light transition hover:border-gold/40 hover:shadow-lg hover:shadow-gold/5"
    >
      <div className="relative aspect-square overflow-hidden bg-charcoal">
        <Image
          src={product.images[0]}
          alt={product.nameAr}
          fill
          className={`${product.imageFit === "contain" ? "object-contain bg-white" : "object-cover"} transition duration-500 group-hover:scale-105`}
          sizes="(max-width:768px) 50vw, 25vw"
        />
        {!product.inStock && (
          <span className="absolute left-3 top-3 rounded-full bg-red-900/80 px-3 py-1 text-xs text-white">
            نفذت الكمية
          </span>
        )}
        {product.featured && (
          <span className="absolute right-3 top-3 rounded-full bg-gold/90 px-3 py-1 text-xs font-medium text-black">
            مميز
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="mb-1 font-medium text-white group-hover:text-gold">
          {product.nameAr}
        </h3>
        <p className="mb-2 text-xs text-white/50">{product.nameEn}</p>
        <div className="flex items-center justify-between">
          <span className="text-gold">من {formatPrice(minPrice)}</span>
          {product.gender && (
            <span className="text-xs text-white/40">{product.gender}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
