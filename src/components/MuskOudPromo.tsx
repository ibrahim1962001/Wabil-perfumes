import Image from "next/image";
import Link from "next/link";
import { brand, whatsappLink } from "@/lib/brand";
import { MUSK_OUD_SIZE_VARIANTS } from "@/lib/products";

export default function MuskOudPromo() {
  return (
    <section className="overflow-hidden rounded-2xl border border-gold/30 bg-charcoal-light">
      <div className="grid lg:grid-cols-2">
        <div className="relative aspect-[4/3] min-h-[260px] lg:aspect-auto lg:min-h-[420px]">
          <Image
            src="/images/products/musk-oud-offer.png"
            alt="عرض المسك والعود الخام"
            fill
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 50vw"
          />
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-8">
          <span className="mb-2 inline-block w-fit rounded-full bg-gold/20 px-3 py-1 text-xs font-bold text-gold">
            عرض حصري ❤️
          </span>
          <h2 className="mb-3 text-2xl font-bold text-white">
            {brand.muskOudPromo.title}
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-white/70">
            {brand.muskOudPromo.subtitle}
          </p>

          <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {MUSK_OUD_SIZE_VARIANTS.map((v) => (
              <div
                key={v.size}
                className="rounded-lg border border-white/10 bg-charcoal-dark/60 px-3 py-2 text-center"
              >
                <p className="text-xs text-white/60">{v.size}</p>
                <p className="font-bold text-gold">{v.price} ج.م</p>
              </div>
            ))}
          </div>

          <p className="mb-4 text-xs text-white/50">
            {brand.policies.cairoShipping} · {brand.paymentMethods.join(" · ")}
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/products/musk-oud-offer"
              className="rounded-full bg-gold px-6 py-3 text-sm font-bold text-black transition hover:bg-gold-light"
            >
              اطلبه دلوقتي 👀
            </Link>
            <a
              href={whatsappLink(brand.muskOudPromo.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-gold/40 px-6 py-3 text-sm text-gold transition hover:bg-gold/10"
            >
              اسألنا على واتساب ✨
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
