import Link from "next/link";
import { brand } from "@/lib/brand";

export default function PromoBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-l from-gold/20 via-charcoal-light to-charcoal p-6 sm:p-8">
      <div className="relative z-10">
        <span className="mb-2 inline-block rounded-full bg-gold px-3 py-1 text-xs font-bold text-black">
          عروض وخصومات
        </span>
        <h2 className="mb-2 text-xl font-bold text-white sm:text-2xl">
          {brand.promotion.title}
        </h2>
        <p className="mb-2 max-w-xl text-sm text-white/70">
          {brand.promotion.description}
        </p>
        <p className="mb-4 text-sm text-gold/90">{brand.slogan} ♥</p>
        <Link
          href="/shop"
          className="inline-block rounded-full bg-gold px-6 py-2.5 text-sm font-bold text-black transition hover:bg-gold-light"
        >
          تسوق الآن
        </Link>
      </div>
      <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-gold/10 blur-3xl" />
    </div>
  );
}
