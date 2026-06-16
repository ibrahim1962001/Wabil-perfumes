import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import PromoBanner from "@/components/PromoBanner";
import MuskOudPromo from "@/components/MuskOudPromo";
import ServicesInfo from "@/components/ServicesInfo";
import HeroVideo from "@/components/HeroVideo";
import AnimateIn from "@/components/AnimateIn";
import ReviewsSection from "@/components/ReviewsSection";
import { brand } from "@/lib/brand";
import { getFeaturedProducts } from "@/lib/products";

export default function HomePage() {
  const featured = getFeaturedProducts().slice(0, 8);

  return (
    <>
      <section className="relative w-full overflow-hidden bg-charcoal-dark">
        <div className="relative aspect-[3/4] w-full max-h-[70vh] sm:aspect-video sm:max-h-[75vh] lg:aspect-[16/9] lg:min-h-[420px]">
          <HeroVideo />
        </div>
      </section>

      <section className="relative border-b border-white/5 bg-charcoal-dark bg-gradient-radial-gold">
        <div className="container-main py-8 sm:py-12 lg:py-14">
          <AnimateIn className="text-center">
            <p className="mb-2 font-display text-xs tracking-[0.25em] text-gold sm:text-sm sm:tracking-[0.3em]">
              W A B I L &nbsp; P E R F U M E S
            </p>
            <h1 className="mb-3 text-2xl font-bold sm:text-4xl lg:text-5xl">
              <span className="text-gradient-gold">{brand.nameAr}</span>
            </h1>
            <p className="mb-2 text-base text-white/70 sm:text-lg">
              {brand.pronunciation}
            </p>
            <p className="mx-auto mb-2 max-w-2xl text-body">{brand.bio[2]}</p>
            <p className="mb-6 text-sm text-gold/90 sm:text-base">
              {brand.slogan} ♥
            </p>
          </AnimateIn>

          <AnimateIn delay={150} className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
            <Link href="/shop" className="btn-primary w-full sm:w-auto">
              تصفح العطور
            </Link>
            <Link
              href="/shop?gender=رجالي"
              className="btn-outline w-full sm:w-auto"
            >
              رجالي
            </Link>
            <Link
              href="/shop?gender=حريمي"
              className="btn-ghost w-full sm:w-auto"
            >
              حريمي
            </Link>
          </AnimateIn>

          <AnimateIn delay={250} className="mt-6 flex justify-center">
            <p className="badge-gold max-w-md text-center leading-relaxed">
              🎁 {brand.freeTesterPromo.subtitle}
            </p>
          </AnimateIn>
        </div>
      </section>

      <section className="container-main section-padding">
        <AnimateIn>
          <MuskOudPromo />
        </AnimateIn>
      </section>

      <section className="container-main pb-8 sm:pb-12">
        <AnimateIn>
          <h2 className="heading-section mb-4 text-center sm:mb-6">
            تصفح حسب القسم
          </h2>
        </AnimateIn>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {brand.categories.map((cat, i) => (
            <AnimateIn key={cat.slug} delay={i * 80}>
              <Link
                href={`/shop?category=${cat.slug}`}
                className="card-hover flex min-h-[100px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-charcoal-light p-4 text-center sm:min-h-[120px] sm:p-5"
              >
                <span className="mb-2 text-2xl sm:text-3xl">{cat.icon}</span>
                <span className="text-xs font-medium text-white sm:text-sm">
                  {cat.nameAr}
                </span>
              </Link>
            </AnimateIn>
          ))}
        </div>
      </section>

      <section className="container-main section-padding pt-0">
        <AnimateIn>
          <ServicesInfo />
        </AnimateIn>
      </section>

      <section className="container-main pb-8 sm:pb-12">
        <AnimateIn>
          <PromoBanner />
        </AnimateIn>
      </section>

      <section className="border-y border-white/5 bg-charcoal-light/30 py-10 sm:py-14">
        <div className="container-main">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {[
              { title: "مواد طبية 100%", desc: "خامات آمنة ومعتمدة", icon: "💎" },
              { title: "زيوت فرنسية", desc: "مطابقة للأوريجنال", icon: "🇫🇷" },
              { title: "فوحان 6 ساعات", desc: "ثبات مدى الحياة", icon: "✨" },
              { title: "توصيل مجاني", desc: brand.policies.cairoShipping, icon: "🚚" },
            ].map((item, i) => (
              <AnimateIn key={item.title} delay={i * 100}>
                <div className="glass-card card-hover p-4 text-center sm:p-5">
                  <span className="mb-2 block text-2xl sm:text-3xl">
                    {item.icon}
                  </span>
                  <h3 className="mb-1 text-sm font-bold text-gold sm:text-base">
                    {item.title}
                  </h3>
                  <p className="text-[11px] leading-relaxed text-white/55 sm:text-xs">
                    {item.desc}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      <section className="container-main section-padding">
        <AnimateIn className="mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="heading-section">الأكثر طلباً</h2>
            <p className="mt-1 text-xs text-white/50 sm:text-sm">
              يارا كاندي · سوفاج · وان مليون · اسكاندل
            </p>
          </div>
          <Link
            href="/shop"
            className="text-sm text-gold transition hover:underline"
          >
            عرض الكل ←
          </Link>
        </AnimateIn>
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {featured.map((product, i) => (
            <AnimateIn key={product.id} delay={(i % 4) * 80}>
              <ProductCard product={product} />
            </AnimateIn>
          ))}
        </div>
      </section>

      <ReviewsSection />
    </>
  );
}
