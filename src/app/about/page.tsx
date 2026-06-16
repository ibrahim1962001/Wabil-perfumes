import Image from "next/image";
import { brand } from "@/lib/brand";
import { SIZE_VARIANTS } from "@/lib/products";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="mb-10 text-center">
        <Image
          src="/images/logo.jpg"
          alt={brand.nameAr}
          width={120}
          height={120}
          className="mx-auto mb-6 rounded-full border-2 border-gold/40"
        />
        <h1 className="mb-2 text-3xl font-bold">من نحن</h1>
        <p className="font-display tracking-widest text-gold">W A B I L</p>
      </div>

      <div className="space-y-5 text-center leading-relaxed text-white/70">
        {brand.bio.map((line, i) => (
          <p key={i} className={i === 0 ? "text-xl text-gold" : ""}>
            {line}
          </p>
        ))}
        <p className="text-lg text-gold">{brand.slogan} ♥</p>
      </div>

      <div className="mt-12 rounded-2xl border border-gold/20 bg-charcoal-light p-6">
        <h3 className="mb-4 text-center font-bold text-gold">الأحجام والأسعار</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {SIZE_VARIANTS.map((v) => (
            <div
              key={v.size}
              className="rounded-xl border border-white/10 bg-charcoal-dark p-3 text-center"
            >
              <p className="text-sm text-white/80">{v.size}</p>
              <p className="font-bold text-gold">{v.price} ج.م</p>
            </div>
          ))}
          <div className="rounded-xl border border-gold/30 bg-gold/10 p-3 text-center">
            <p className="text-sm text-white/80">5 مل (تيستر)</p>
            <p className="font-bold text-gold">مجاناً 🎁</p>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-white/50">
          {brand.freeTesterPromo.subtitle}
        </p>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-charcoal-light p-6">
          <h3 className="mb-3 font-bold text-gold">لماذا وابل؟</h3>
          <ul className="space-y-2 text-sm text-white/60">
            <li>✓ مواد طبية 100%</li>
            <li>✓ زيوت خام مستوردة من فرنسا</li>
            <li>✓ مطابقة للبرفان الأوريجنال تماماً</li>
            <li>✓ فوحان 6 ساعات وثبات مدى الحياة</li>
            <li>✓ أسعار مش موجودة في مصر كلها</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-white/10 bg-charcoal-light p-6">
          <h3 className="mb-3 font-bold text-gold">خدماتنا</h3>
          <ul className="space-y-2 text-sm text-white/60">
            {brand.services.map((s) => (
              <li key={s}>✓ {s}</li>
            ))}
            <li>✓ {brand.policies.cairoShipping}</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-gold/20 bg-gold/5 p-6">
        <h3 className="mb-2 font-bold text-gold">↩️ ضمان الاسترجاع</h3>
        <p className="text-sm leading-relaxed text-white/70">
          {brand.policies.returnPolicy}
        </p>
      </div>

      <div className="mt-10 rounded-2xl border border-gold/20 bg-gold/5 p-8 text-center">
        <p className="text-2xl font-bold text-gold">«{brand.tagline}»</p>
        <p className="mt-2 text-white/50">
          {brand.location.area}، {brand.location.city} — {brand.location.country}
        </p>
      </div>
    </div>
  );
}
