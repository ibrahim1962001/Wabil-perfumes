import Image from "next/image";
import { brand, whatsappLink } from "@/lib/brand";

export default function ServicesInfo() {
  const items = [
    {
      icon: "🧪",
      title: "خامات للتعتيق",
      desc: brand.policies.rawMaterials,
    },
    {
      icon: "📩",
      title: "طلب مسبق",
      desc: brand.policies.preOrder,
    },
    {
      icon: "🚚",
      title: "توصيل مجاني",
      desc: brand.policies.cairoShipping,
    },
    {
      icon: "↩️",
      title: "ضمان الاسترجاع",
      desc: brand.policies.returnPolicy,
    },
  ];

  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-charcoal-light">
      <div className="grid lg:grid-cols-2">
        <div className="relative aspect-square min-h-[280px] lg:aspect-auto lg:min-h-[400px]">
          <Image
            src="/images/glass-pumps.png"
            alt="بامبات زجاج وتيسترات"
            fill
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 50vw"
          />
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-8">
          <span className="mb-2 inline-block w-fit rounded-full bg-gold/20 px-3 py-1 text-xs font-bold text-gold">
            متاح الآن ❤️‍🔥
          </span>
          <h2 className="mb-3 text-2xl font-bold text-white">
            {brand.policies.accessories}
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-white/60">
            {brand.businessModel}
          </p>

          <div className="mb-6 space-y-4">
            {items.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-white/10 bg-charcoal-dark/60 p-4"
              >
                <p className="mb-1 font-bold text-gold">
                  {item.icon} {item.title}
                </p>
                <p className="text-sm text-white/70">{item.desc}</p>
              </div>
            ))}
          </div>

          <a
            href={whatsappLink("مرحباً، عايز أحجز أوردر / أستفسر عن البامبات والخامات")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-fit rounded-full bg-gold px-8 py-3 text-sm font-bold text-black transition hover:bg-gold-light"
          >
            احجز الآن — واتساب 📩
          </a>
        </div>
      </div>
    </section>
  );
}
