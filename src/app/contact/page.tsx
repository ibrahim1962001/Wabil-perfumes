import { brand, whatsappLink } from "@/lib/brand";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="mb-2 text-3xl font-bold">تواصل معنا</h1>
      <p className="mb-10 text-white/50">
        نسعد بخدمتك — تواصل معنا بأي طريقة تناسبك
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        {[
          {
            title: "موبايل / واتساب",
            value: brand.contact.phone,
            href: whatsappLink("مرحباً، عايز أستفسر"),
            icon: "📱",
          },
          {
            title: "إيميل",
            value: brand.contact.email,
            href: `mailto:${brand.contact.email}`,
            icon: "✉️",
          },
          {
            title: "فيسبوك",
            value: "Wabil perfumes وابل للعطور",
            href: brand.contact.facebook,
            icon: "📘",
          },
          {
            title: "إنستجرام",
            value: `@${brand.contact.instagram}`,
            href: `https://instagram.com/${brand.contact.instagram}`,
            icon: "📸",
          },
        ].map((item) => (
          <a
            key={item.title}
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="rounded-2xl border border-white/10 bg-charcoal-light p-6 transition hover:border-gold/40"
          >
            <span className="mb-3 block text-3xl">{item.icon}</span>
            <h3 className="mb-1 font-bold text-gold">{item.title}</h3>
            <p className="text-white/70">{item.value}</p>
          </a>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-white/10 bg-charcoal-light p-6">
        <h3 className="mb-2 font-bold">العنوان</h3>
        <p className="text-white/70">
          {brand.location.area}، {brand.location.governorate}، {brand.location.country}
        </p>
        <p className="mt-4 text-sm text-white/40">
          {brand.policies.preOrder}
        </p>
        <p className="mt-2 text-sm text-gold/80">
          {brand.policies.cairoShipping}
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-gold/20 bg-gold/5 p-6">
        <h3 className="mb-2 font-bold text-gold">↩️ ضمان الاسترجاع</h3>
        <p className="text-sm leading-relaxed text-white/70">
          {brand.policies.returnPolicy}
        </p>
      </div>
    </div>
  );
}
