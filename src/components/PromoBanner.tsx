import Link from "next/link";
import { brand } from "@/lib/brand";

export default function PromoBanner() {
  return (
    <div className="card-hover relative overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-l from-gold/15 via-charcoal-light to-charcoal p-5 sm:p-8">
      <div className="relative z-10">
        <span className="badge-gold mb-3 bg-gold text-black">
          عروض وخصومات
        </span>
        <h2 className="heading-section mb-2">
          {brand.promotion.title}
        </h2>
        <p className="mb-2 max-w-xl text-body">
          {brand.promotion.description}
        </p>
        <p className="mb-5 text-sm text-gold/90">{brand.slogan} ♥</p>
        <Link href="/shop" className="btn-primary">
          تسوق الآن
        </Link>
      </div>
      <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 animate-float rounded-full bg-gold/10 blur-3xl" />
    </div>
  );
}
