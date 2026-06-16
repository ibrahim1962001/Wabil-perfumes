import Image from "next/image";
import { brand, whatsappLink } from "@/lib/brand";
import { SIZE_VARIANTS } from "@/lib/products";

export default function FreeTesterPromo() {
  return (
    <section className="overflow-hidden rounded-2xl border border-gold/30 bg-charcoal-light">
      <div className="grid lg:grid-cols-2">
        <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[420px]">
          <Image
            src="/images/free-tester-promo.png"
            alt="تيستر 5 مل مجاني"
            fill
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-charcoal-light/80 to-transparent lg:hidden" />
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-8">
          <span className="mb-3 inline-block w-fit rounded-full bg-red-600 px-4 py-1 text-sm font-bold text-white">
            🔥 {brand.freeTesterPromo.title}
          </span>
          <h2 className="mb-3 text-xl font-bold leading-snug text-gold sm:text-2xl">
            {brand.freeTesterPromo.subtitle}
          </h2>
          <p className="mb-4 text-sm text-white/60">
            مجرد خدمة تسويقية بسيطة ❤️‍🔥 — إزاي؟ بسيطة جداً ✨
          </p>

          <ol className="mb-6 space-y-2">
            {brand.freeTesterPromo.steps.map((step, i) => (
              <li
                key={step}
                className="flex items-start gap-2 text-sm text-white/80"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/20 text-xs font-bold text-gold">
                  {i + 1}
                </span>
                <span>✅ {step}</span>
              </li>
            ))}
          </ol>

          <p className="mb-4 text-sm text-white/50">
            وعلى طول هيتجهزلك أوردرك 🚀
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href={whatsappLink(brand.freeTesterPromo.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white transition hover:opacity-90"
            >
              ابعت «تمام» على واتساب
            </a>
            <a
              href={brand.contact.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-gold/40 px-6 py-3 text-sm text-gold transition hover:bg-gold/10"
            >
              فولو الصفحة
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-charcoal-dark/60 px-6 py-5 sm:px-8">
        <p className="mb-3 text-center text-sm font-bold text-gold">
          🥇 متاح تركيب — الأسعار المحدثة
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {SIZE_VARIANTS.map((v) => (
            <span
              key={v.size}
              className="rounded-lg border border-white/10 bg-charcoal-light px-3 py-1.5 text-xs text-white/80"
            >
              {v.size}: <strong className="text-gold">{v.price} ج.م</strong>
            </span>
          ))}
          <span className="rounded-lg border border-gold/40 bg-gold/10 px-3 py-1.5 text-xs text-gold">
            5 مل (تيستر): مجاناً 🎁
          </span>
        </div>
      </div>
    </section>
  );
}
