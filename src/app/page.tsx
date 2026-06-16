import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import PromoBanner from "@/components/PromoBanner";
import FreeTesterPromo from "@/components/FreeTesterPromo";
import MuskOudPromo from "@/components/MuskOudPromo";
import ServicesInfo from "@/components/ServicesInfo";
import HeroVideo from "@/components/HeroVideo";
import { brand } from "@/lib/brand";
import { getFeaturedProducts } from "@/lib/products";

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <>
      <section className="w-full overflow-hidden bg-charcoal-dark">
        <div className="relative aspect-[16/9] w-full max-h-[75vh] min-h-[280px] sm:min-h-[380px] lg:min-h-[460px]">
          <HeroVideo />
        </div>
      </section>

      <section className="border-b border-white/5 bg-charcoal-dark">
        <div className="mx-auto max-w-7xl px-4 py-8 text-center sm:px-6 sm:py-10">
          <p className="mb-2 font-display text-sm tracking-[0.3em] text-gold">
            W A B I L &nbsp; P E R F U M E S
          </p>
          <h1 className="mb-3 text-3xl font-bold sm:text-4xl lg:text-5xl">
            <span className="text-gradient-gold">{brand.nameAr}</span>
          </h1>
          <p className="mb-2 text-lg text-white/70">{brand.pronunciation}</p>
          <p className="mx-auto mb-2 max-w-2xl text-sm text-white/50 sm:text-base">
            {brand.bio[2]}
          </p>
          <p className="mb-6 text-gold/90">{brand.slogan} ♥</p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <Link
              href="/shop"
              className="rounded-full bg-gold px-8 py-3 text-sm font-bold text-black transition hover:bg-gold-light sm:text-base"
            >
              تصفح العطور
            </Link>
            <Link
              href="/shop?gender=رجالي"
              className="rounded-full border border-gold/40 px-6 py-3 text-sm text-gold transition hover:bg-gold/10 sm:px-8 sm:text-base"
            >
              رجالي
            </Link>
            <Link
              href="/shop?gender=حريمي"
              className="rounded-full border border-white/20 px-6 py-3 text-sm text-white/80 transition hover:border-gold/40 sm:px-8 sm:text-base"
            >
              حريمي
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <MuskOudPromo />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <FreeTesterPromo />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {brand.categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop?category=${cat.slug}`}
              className="rounded-2xl border border-white/10 bg-charcoal-light p-5 text-center transition hover:border-gold/40"
            >
              <span className="mb-2 block text-2xl">{cat.icon}</span>
              <span className="text-sm font-medium text-white">{cat.nameAr}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <ServicesInfo />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <PromoBanner />
      </section>

      <section className="border-y border-white/5 bg-charcoal-light/40 py-12">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4 sm:px-6">
          {[
            { title: "مواد طبية 100%", desc: "خامات آمنة ومعتمدة", icon: "💎" },
            { title: "زيوت فرنسية", desc: "مطابقة للأوريجنال تماماً", icon: "🇫🇷" },
            { title: "فوحان 6 ساعات", desc: "ثبات مدى الحياة", icon: "✨" },
            { title: "توصيل مجاني", desc: brand.policies.cairoShipping, icon: "🚚" },
          ].map((item) => (
            <div key={item.title} className="text-center">
              <span className="mb-2 block text-3xl">{item.icon}</span>
              <h3 className="mb-1 font-bold text-gold">{item.title}</h3>
              <p className="text-xs text-white/60">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">الأكثر طلباً</h2>
            <p className="text-white/50">يارا كاندي · سوفاج · وان مليون · اسكاندل</p>
          </div>
          <Link href="/shop" className="text-sm text-gold hover:underline">
            عرض الكل ←
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6">
        <p className="mb-2 text-gold">
          {brand.stats.rating}% توصية — {brand.stats.reviews} آراء
        </p>
        <p className="mb-1 text-3xl font-bold">{brand.stats.followers}+</p>
        <p className="text-white/50">متابع على فيسبوك</p>
      </section>
    </>
  );
}
